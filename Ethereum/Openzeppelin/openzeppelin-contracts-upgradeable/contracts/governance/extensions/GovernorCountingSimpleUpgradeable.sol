// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.4.0) (governance/extensions/GovernorCountingSimple.sol)

pragma solidity ^0.8.24;

import {IGovernor} from "@openzeppelin/contracts/governance/IGovernor.sol";
import {GovernorUpgradeable} from "../GovernorUpgradeable.sol";
import {Initializable} from "../../proxy/utils/Initializable.sol";

/**
 * @dev Extension of {Governor} for simple, 3 options, vote counting.
 */
abstract contract GovernorCountingSimpleUpgradeable is Initializable, GovernorUpgradeable {
    /**
     * @dev Supported vote types. Matches Governor Bravo ordering.
     */
    enum VoteType {
        Against,
        For,
        Abstain
    }

    struct ProposalVote {
        uint256 againstVotes;
        uint256 forVotes;
        uint256 abstainVotes;
        mapping(address voter => bool) hasVoted;
    }

    /// @custom:storage-location erc7201:openzeppelin.storage.GovernorCountingSimple
    struct GovernorCountingSimpleStorage {
        mapping(uint256 proposalId => ProposalVote) _proposalVotes;
    }

    // keccak256(abi.encode(uint256(keccak256("openzeppelin.storage.GovernorCountingSimple")) - 1)) & ~bytes32(uint256(0xff))
    bytes32 private constant GovernorCountingSimpleStorageLocation = 0xa1cefa0f43667ef127a258e673c94202a79b656e62899531c4376d87a7f39800;

    function _getGovernorCountingSimpleStorage() private pure returns (GovernorCountingSimpleStorage storage $) {
        assembly {
            $.slot := GovernorCountingSimpleStorageLocation
        }
    }

    function __GovernorCountingSimple_init() internal onlyInitializing {
    }

    function __GovernorCountingSimple_init_unchained() internal onlyInitializing {
    }
    /// @inheritdoc IGovernor
    // solhint-disable-next-line func-name-mixedcase
    function COUNTING_MODE() public pure virtual override returns (string memory) {
        return "support=bravo&quorum=for,abstain";
    }

    /// @inheritdoc IGovernor
    function hasVoted(uint256 proposalId, address account) public view virtual override returns (bool) {
        GovernorCountingSimpleStorage storage $ = _getGovernorCountingSimpleStorage();
        return $._proposalVotes[proposalId].hasVoted[account];
    }

    /**
     * @dev Accessor to the internal vote counts.
     */
    function proposalVotes(
        uint256 proposalId
    ) public view virtual returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes) {
        GovernorCountingSimpleStorage storage $ = _getGovernorCountingSimpleStorage();
        ProposalVote storage proposalVote = $._proposalVotes[proposalId];
        return (proposalVote.againstVotes, proposalVote.forVotes, proposalVote.abstainVotes);
    }

    /// @inheritdoc GovernorUpgradeable
    function _quorumReached(uint256 proposalId) internal view virtual override returns (bool) {
        GovernorCountingSimpleStorage storage $ = _getGovernorCountingSimpleStorage();
        ProposalVote storage proposalVote = $._proposalVotes[proposalId];

        return quorum(proposalSnapshot(proposalId)) <= proposalVote.forVotes + proposalVote.abstainVotes;
    }

    /**
     * @dev See {Governor-_voteSucceeded}. In this module, the forVotes must be strictly over the againstVotes.
     */
    function _voteSucceeded(uint256 proposalId) internal view virtual override returns (bool) {
        GovernorCountingSimpleStorage storage $ = _getGovernorCountingSimpleStorage();
        ProposalVote storage proposalVote = $._proposalVotes[proposalId];

        return proposalVote.forVotes > proposalVote.againstVotes;
    }

    /**
     * @dev See {Governor-_countVote}. In this module, the support follows the `VoteType` enum (from Governor Bravo).
     */
    function _countVote(
        uint256 proposalId,
        address account,
        uint8 support,
        uint256 totalWeight,
        bytes memory // params
    ) internal virtual override returns (uint256) {
        GovernorCountingSimpleStorage storage $ = _getGovernorCountingSimpleStorage();
        ProposalVote storage proposalVote = $._proposalVotes[proposalId];

        if (proposalVote.hasVoted[account]) {
            revert GovernorAlreadyCastVote(account);
        }
        proposalVote.hasVoted[account] = true;

        if (support == uint8(VoteType.Against)) {
            proposalVote.againstVotes += totalWeight;
        } else if (support == uint8(VoteType.For)) {
            proposalVote.forVotes += totalWeight;
        } else if (support == uint8(VoteType.Abstain)) {
            proposalVote.abstainVotes += totalWeight;
        } else {
            revert GovernorInvalidVoteType();
        }

        return totalWeight;
    }
}
