// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

// We keep these imports and a dummy contract just to we can run the test suite after transpilation.

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Arrays} from "@openzeppelin/contracts/utils/Arrays.sol";
import {AuthorityUtils} from "@openzeppelin/contracts/access/manager/AuthorityUtils.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import {Blockhash} from "@openzeppelin/contracts/utils/Blockhash.sol";
import {Bytes} from "@openzeppelin/contracts/utils/Bytes.sol";
import {CAIP2} from "@openzeppelin/contracts/utils/CAIP2.sol";
import {CAIP10} from "@openzeppelin/contracts/utils/CAIP10.sol";
import {Checkpoints} from "@openzeppelin/contracts/utils/structs/Checkpoints.sol";
import {CircularBuffer} from "@openzeppelin/contracts/utils/structs/CircularBuffer.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {DoubleEndedQueue} from "@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {EIP7702Utils} from "@openzeppelin/contracts/account/utils/EIP7702Utils.sol";
import {EnumerableMap} from "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {ERC165Upgradeable} from "../utils/introspection/ERC165Upgradeable.sol";
import {ERC165Checker} from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import {ERC721HolderUpgradeable} from "../token/ERC721/utils/ERC721HolderUpgradeable.sol";
import {ERC1155HolderUpgradeable} from "../token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import {ERC1967Utils} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Utils.sol";
import {ERC4337Utils} from "@openzeppelin/contracts/account/utils/draft-ERC4337Utils.sol";
import {ERC7579Utils} from "@openzeppelin/contracts/account/utils/draft-ERC7579Utils.sol";
import {ERC7913P256Verifier} from "@openzeppelin/contracts/utils/cryptography/verifiers/ERC7913P256Verifier.sol";
import {ERC7913RSAVerifier} from "@openzeppelin/contracts/utils/cryptography/verifiers/ERC7913RSAVerifier.sol";
import {Heap} from "@openzeppelin/contracts/utils/structs/Heap.sol";
import {InteroperableAddress} from "@openzeppelin/contracts/utils/draft-InteroperableAddress.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import {NoncesUpgradeable} from "../utils/NoncesUpgradeable.sol";
import {NoncesKeyedUpgradeable} from "../utils/NoncesKeyedUpgradeable.sol";
import {P256} from "@openzeppelin/contracts/utils/cryptography/P256.sol";
import {Packing} from "@openzeppelin/contracts/utils/Packing.sol";
import {Panic} from "@openzeppelin/contracts/utils/Panic.sol";
import {RSA} from "@openzeppelin/contracts/utils/cryptography/RSA.sol";
import {SafeCast} from "@openzeppelin/contracts/utils/math/SafeCast.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ShortStrings} from "@openzeppelin/contracts/utils/ShortStrings.sol";
import {SignatureChecker} from "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import {SignedMath} from "@openzeppelin/contracts/utils/math/SignedMath.sol";
import {StorageSlot} from "@openzeppelin/contracts/utils/StorageSlot.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Memory} from "@openzeppelin/contracts/utils/Memory.sol";
import {Time} from "@openzeppelin/contracts/utils/types/Time.sol";
import {Initializable} from "../proxy/utils/Initializable.sol";

contract Dummy1234Upgradeable is Initializable {    function __Dummy1234_init() internal onlyInitializing {
    }

    function __Dummy1234_init_unchained() internal onlyInitializing {
    }
}
