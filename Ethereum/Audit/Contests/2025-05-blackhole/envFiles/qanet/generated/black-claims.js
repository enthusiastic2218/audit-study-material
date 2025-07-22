const blackClaimsVersion = "v222";

const blackClaimsAddress = "0xBaA7E2385cCa371E5614831A9450F75018a8A540";

const blackClaimsAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "treasury_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "__ve",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "staker",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rewards",
        "type": "uint256"
      }
    ],
    "name": "StakedRewards",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      }
    ],
    "name": "TreasurySet",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_PERIOD",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_ve",
    "outputs": [
      {
        "internalType": "contract IVotingEscrow",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "percent",
        "type": "uint256"
      }
    ],
    "name": "claimAndStakeReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "claimed_rewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "claim_duration_",
        "type": "uint256"
      }
    ],
    "name": "extendClaimDuration",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "claim_duration_",
        "type": "uint256"
      }
    ],
    "name": "finalize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getClaimableReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_reward",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isSeasonClaimingActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "_active",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isSeasonClaimingEnded",
    "outputs": [
      {
        "internalType": "bool",
        "name": "_ended",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isSeasonFinalized",
    "outputs": [
      {
        "internalType": "bool",
        "name": "_finalized",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenAddress_",
        "type": "address"
      }
    ],
    "name": "recoverERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "players_",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "rewards_",
        "type": "uint256[]"
      }
    ],
    "name": "reportRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "revokeUnclaimedReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "season",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "start_time",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reward_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "remaining_reward_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "claim_end_time",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "season_rewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "secondOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "setOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "setOwner2",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "treasury_",
        "type": "address"
      }
    ],
    "name": "setTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "start_time_",
        "type": "uint256"
      }
    ],
    "name": "startSeason",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "start_time",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reward_amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "remaining_reward_amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "claim_end_time",
            "type": "uint256"
          }
        ],
        "internalType": "struct IBlackClaims.Season",
        "name": "season_",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

module.exports = {blackClaimsAddress, blackClaimsAbi, blackClaimsVersion};