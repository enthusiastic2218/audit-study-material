const { ethers, entrypoint } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

const { getDomain, PackedUserOperation } = require('@openzeppelin/contracts/test/helpers/eip712');
const { ERC4337Helper } = require('@openzeppelin/contracts/test/helpers/erc4337');

const { shouldBehaveLikeAccountCore, shouldBehaveLikeAccountHolder } = require('./Account.behavior');
const { shouldBehaveLikeERC1271 } = require('../utils/cryptography/ERC1271.behavior');
const { shouldBehaveLikeERC7821 } = require('./extensions/ERC7821.behavior');

async function fixture() {
  // EOAs and environment
  const [beneficiary, other] = await ethers.getSigners();
  const target = await ethers.deployContract('CallReceiverMock');

  // ERC-4337 signer
  const signer = ethers.Wallet.createRandom();

  // ERC-4337 account
  const helper = new ERC4337Helper();
  const mock = await helper.newAccount('$AccountECDSAMock', ['AccountECDSA', '1', signer]);

  // ERC-4337 Entrypoint domain
  const entrypointDomain = await getDomain(entrypoint.v08);

  // domain cannot be fetched using getDomain(mock) before the mock is deployed
  const domain = {
    name: 'AccountECDSA',
    version: '1',
    chainId: entrypointDomain.chainId,
    verifyingContract: mock.address,
  };

  const signUserOp = userOp =>
    signer
      .signTypedData(entrypointDomain, { PackedUserOperation }, userOp.packed)
      .then(signature => Object.assign(userOp, { signature }));

  return { helper, mock, domain, signer, target, beneficiary, other, signUserOp };
}

describe('AccountECDSA', function () {
  beforeEach(async function () {
    Object.assign(this, await loadFixture(fixture));
  });

  shouldBehaveLikeAccountCore();
  shouldBehaveLikeAccountHolder();
  shouldBehaveLikeERC1271({ erc7739: true });
  shouldBehaveLikeERC7821();
});
