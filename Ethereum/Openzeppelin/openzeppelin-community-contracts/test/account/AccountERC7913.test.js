const { ethers, entrypoint } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

const { getDomain, PackedUserOperation } = require('@openzeppelin/contracts/test/helpers/eip712');
const { ERC4337Helper } = require('@openzeppelin/contracts/test/helpers/erc4337');
const {
  NonNativeSigner,
  P256SigningKey,
  RSASHA256SigningKey,
} = require('@openzeppelin/contracts/test/helpers/signers');
const { ZKEmailSigningKey, WebAuthnSigningKey } = require('../helpers/signers');

const { shouldBehaveLikeAccountCore, shouldBehaveLikeAccountHolder } = require('./Account.behavior');
const { shouldBehaveLikeERC1271 } = require('../utils/cryptography/ERC1271.behavior');
const { shouldBehaveLikeERC7821 } = require('./extensions/ERC7821.behavior');

// Prepare signer in advance (RSA are long to initialize)
const signerECDSA = ethers.Wallet.createRandom();
const signerP256 = new NonNativeSigner(P256SigningKey.random());
const signerRSA = new NonNativeSigner(RSASHA256SigningKey.random());
const signerWebAuthn = new NonNativeSigner(WebAuthnSigningKey.random());

// Constants for ZKEmail
const accountSalt = '0x046582bce36cdd0a8953b9d40b8f20d58302bacf3bcecffeb6741c98a52725e2'; // keccak256("test@example.com")
const selector = '12345';
const domainName = 'gmail.com';
const publicKeyHash = '0x0ea9c777dc7110e5a9e89b13f0cfc540e3845ba120b2b6dc24024d61488d4788';
const emailNullifier = '0x00a83fce3d4b1c9ef0f600644c1ecc6c8115b57b1596e0e3295e2c5105fbfd8a';
const templateId = ethers.solidityPackedKeccak256(['string', 'uint256'], ['TEST', 0n]);

// Minimal fixture common to the different signer verifiers
async function fixture() {
  // EOAs and environment
  const [admin, beneficiary, other] = await ethers.getSigners();
  const target = await ethers.deployContract('CallReceiverMock');

  // DKIM Registry for ZKEmail
  const dkim = await ethers.deployContract('ECDSAOwnedDKIMRegistry');
  await dkim.initialize(admin, admin);
  await dkim
    .SET_PREFIX()
    .then(prefix => dkim.computeSignedMsg(prefix, domainName, publicKeyHash))
    .then(message => admin.signMessage(message))
    .then(signature => dkim.setDKIMPublicKeyHash(selector, domainName, publicKeyHash, signature));

  // ZKEmail Verifier
  const zkEmailVerifier = await ethers.deployContract('ZKEmailVerifierMock');

  // ERC-7913 verifiers
  const verifierP256 = await ethers.deployContract('ERC7913P256Verifier');
  const verifierRSA = await ethers.deployContract('ERC7913RSAVerifier');
  const verifierWebAuthn = await ethers.deployContract('ERC7913WebAuthnVerifier');
  const verifierZKEmail = await ethers.deployContract('$ERC7913ZKEmailVerifier');

  // ERC-4337 env
  const helper = new ERC4337Helper();
  await helper.wait();
  const entrypointDomain = await getDomain(entrypoint.v08);
  const domain = { name: 'AccountERC7913', version: '1', chainId: entrypointDomain.chainId }; // Missing verifyingContract,

  const makeMock = signer =>
    helper.newAccount('$AccountERC7913Mock', ['AccountERC7913', '1', signer]).then(mock => {
      domain.verifyingContract = mock.address;
      return mock;
    });

  const signUserOp = function (userOp) {
    return this.signer
      .signTypedData(entrypointDomain, { PackedUserOperation }, userOp.packed)
      .then(signature => Object.assign(userOp, { signature }));
  };

  return {
    helper,
    verifierP256,
    verifierRSA,
    verifierWebAuthn,
    verifierZKEmail,
    dkim,
    zkEmailVerifier,
    domain,
    target,
    beneficiary,
    other,
    makeMock,
    signUserOp,
  };
}

describe('AccountERC7913', function () {
  beforeEach(async function () {
    Object.assign(this, await loadFixture(fixture));
  });

  // Using ECDSA key as verifier
  describe('ECDSA key', function () {
    beforeEach(async function () {
      this.signer = signerECDSA;
      this.mock = await this.makeMock(this.signer.address);
    });

    shouldBehaveLikeAccountCore();
    shouldBehaveLikeAccountHolder();
    shouldBehaveLikeERC1271({ erc7739: true });
    shouldBehaveLikeERC7821();
  });

  // Using P256 key with an ERC-7913 verifier
  describe('P256 key', function () {
    beforeEach(async function () {
      this.signer = signerP256;
      this.mock = await this.makeMock(
        ethers.concat([
          this.verifierP256.target,
          this.signer.signingKey.publicKey.qx,
          this.signer.signingKey.publicKey.qy,
        ]),
      );
    });

    shouldBehaveLikeAccountCore();
    shouldBehaveLikeAccountHolder();
    shouldBehaveLikeERC1271({ erc7739: true });
    shouldBehaveLikeERC7821();
  });

  // Using RSA key with an ERC-7913 verifier
  describe('RSA key', function () {
    beforeEach(async function () {
      this.signer = signerRSA;
      this.mock = await this.makeMock(
        ethers.concat([
          this.verifierRSA.target,
          ethers.AbiCoder.defaultAbiCoder().encode(
            ['bytes', 'bytes'],
            [this.signer.signingKey.publicKey.e, this.signer.signingKey.publicKey.n],
          ),
        ]),
      );
    });

    shouldBehaveLikeAccountCore();
    shouldBehaveLikeAccountHolder();
    shouldBehaveLikeERC1271({ erc7739: true });
    shouldBehaveLikeERC7821();
  });

  // Using WebAuthn key with an ERC-7913 verifier
  describe('WebAuthn key', function () {
    beforeEach(async function () {
      this.signer = signerWebAuthn;
      this.mock = await this.makeMock(
        ethers.concat([
          this.verifierWebAuthn.target,
          this.signer.signingKey.publicKey.qx,
          this.signer.signingKey.publicKey.qy,
        ]),
      );
    });

    shouldBehaveLikeAccountCore();
    shouldBehaveLikeAccountHolder();
    shouldBehaveLikeERC1271({ erc7739: true });
    shouldBehaveLikeERC7821();
  });

  // Using ZKEmail with an ERC-7913 verifier
  describe('ZKEmail', function () {
    beforeEach(async function () {
      // Create ZKEmail signer
      this.signer = new NonNativeSigner(
        new ZKEmailSigningKey(domainName, publicKeyHash, emailNullifier, accountSalt, templateId),
      );

      // Create account with ZKEmail verifier
      this.mock = await this.makeMock(
        ethers.concat([
          this.verifierZKEmail.target,
          ethers.AbiCoder.defaultAbiCoder().encode(
            ['address', 'bytes32', 'address', 'uint256'],
            [this.dkim.target, accountSalt, this.zkEmailVerifier.target, templateId],
          ),
        ]),
      );

      // Override the signUserOp function to use the ZKEmail signer
      this.signUserOp = async userOp => {
        const hash = await userOp.hash();
        return Object.assign(userOp, { signature: this.signer.signingKey.sign(hash).serialized });
      };
    });

    shouldBehaveLikeAccountCore();
    shouldBehaveLikeAccountHolder();
    shouldBehaveLikeERC1271({ erc7739: true });
    shouldBehaveLikeERC7821();
  });
});
