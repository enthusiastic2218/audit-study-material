# Report


## Gas Optimizations


| |Issue|Instances|
|-|:-|:-:|
| [GAS-1](#GAS-1) | Don't use `_msgSender()` if not supporting EIP-2771 | 14 |
| [GAS-2](#GAS-2) | `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings) | 84 |
| [GAS-3](#GAS-3) | Use assembly to check for `address(0)` | 161 |
| [GAS-4](#GAS-4) | `array[index] += amount` is cheaper than `array[index] = array[index] + amount` (or related variants) | 5 |
| [GAS-5](#GAS-5) | Comparing to a Boolean constant | 8 |
| [GAS-6](#GAS-6) | Using bools for storage incurs overhead | 34 |
| [GAS-7](#GAS-7) | Cache array length outside of loop | 57 |
| [GAS-8](#GAS-8) | State variables should be cached in stack variables rather than re-reading them from storage | 72 |
| [GAS-9](#GAS-9) | Use calldata instead of memory for function arguments that do not get mutated | 77 |
| [GAS-10](#GAS-10) | For Operations that will not overflow, you could use unchecked | 1233 |
| [GAS-11](#GAS-11) | Use Custom Errors instead of Revert Strings to save Gas | 385 |
| [GAS-12](#GAS-12) | Avoid contract existence checks by using low level calls | 57 |
| [GAS-13](#GAS-13) | Stack variable used as a cheaper cache for a state variable is only used once | 6 |
| [GAS-14](#GAS-14) | State variables only set in the constructor should be declared `immutable` | 68 |
| [GAS-15](#GAS-15) | Functions guaranteed to revert when called by normal users can be marked `payable` | 128 |
| [GAS-16](#GAS-16) | `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`) | 170 |
| [GAS-17](#GAS-17) | Using `private` rather than `public` for constants, saves gas | 32 |
| [GAS-18](#GAS-18) | Use shift right/left instead of division/multiplication if possible | 20 |
| [GAS-19](#GAS-19) | Splitting require() statements that use && saves gas | 48 |
| [GAS-20](#GAS-20) | Superfluous event fields | 6 |
| [GAS-21](#GAS-21) | `uint256` to `bool` `mapping`: Utilizing Bitmaps to dramatically save on Gas | 2 |
| [GAS-22](#GAS-22) | Increments/decrements can be unchecked in for-loops | 93 |
| [GAS-23](#GAS-23) | Use != 0 instead of > 0 for unsigned integer comparison | 145 |
| [GAS-24](#GAS-24) | `internal` functions not called by the contract should be removed | 28 |
| [GAS-25](#GAS-25) | WETH address definition can be use directly | 1 |
### <a name="GAS-1"></a>[GAS-1] Don't use `_msgSender()` if not supporting EIP-2771
Use `msg.sender` if the code does not implement [EIP-2771 trusted forwarder](https://eips.ethereum.org/EIPS/eip-2771) support

*Instances (14)*:
```solidity
File: ./contracts/BlackGovernor.sol

73:         address proposer = _msgSender();

```

```solidity
File: ./contracts/governance/Governor.sol

74:         require(_msgSender() == _executor(), "Governor: onlyGovernance");

269:             getVotes(_msgSender(), block.number - 1) >= proposalThreshold(),

286:         proposal.proposer = _msgSender();

292:             _msgSender(),

433:         address voter = _msgSender();

445:         address voter = _msgSender();

458:         address voter = _msgSender();

```

```solidity
File: ./contracts/governance/L2Governor.sol

70:         require(_msgSender() == _executor(), "Governor: onlyGovernance");

261:             getVotes(_msgSender(), block.number - 1) >= proposalThreshold(),

283:             _msgSender(),

424:         address voter = _msgSender();

436:         address voter = _msgSender();

449:         address voter = _msgSender();

```

### <a name="GAS-2"></a>[GAS-2] `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)
This saves **16 gas per instance.**

*Instances (84)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

114:             votingBalance += IVotingEscrow(votingEscrow).balanceOfNFT(locks[i].tokenId);

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

177:             totalVotingPower+=avms[i].getTotalVotingPower();

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

299:         communityVaultAccruedFeeToken0 += communityFeePending0;

300:         communityVaultAccruedFeeToken1 += communityFeePending1;

```

```solidity
File: ./contracts/Black.sol

47:         totalSupply += _amount;

49:             balanceOf[_to] += _amount;

58:             balanceOf[_to] += _value;

```

```solidity
File: ./contracts/BlackClaims.sol

171:             _increase += rewards_[i];

172:             _decrease += season_rewards[players_[i]];

176:         _season.reward_amount += _increase;

214:             _season.remaining_reward_amount += forfeit_amount;

```

```solidity
File: ./contracts/Bribes.sol

125:                 reward += (cp0.balanceOf * tokenRewardsPerEpoch[_rewardToken][_currTs]) / _supply;

126:                 _currTs += WEEK;

214:         totalSupply += amount;

215:         balanceOf[tokenId] += amount;

299:         tokenRewardsPerEpoch[_rewardsToken][epochStart] += reward;

```

```solidity
File: ./contracts/GaugeManager.sol

298:             index += _ratio;

420:                     claimable[_gauge] += _share;

```

```solidity
File: ./contracts/GaugeV2.sol

179:         if(genesisPool != address(0)) balance += IGenesisPool(genesisPool).balanceOf(account);

```

```solidity
File: ./contracts/GenesisPool.sol

110:                 incentives[_token] += _amount;

148:         totalDeposits += _amount;

151:         allocationInfo.allocatedFundingAmount += _amount;

326:         if(account == genesisInfo.tokenOwner) balance += (liquidity - _depositerLiquidity - tokenOwnerUnstaked);

338:                 tokenOwnerUnstaked += gaugeTokenAmount;

```

```solidity
File: ./contracts/Pair.sol

181:             index0 += _ratio;

207:             index1 += _ratio;

228:                 claimable0[recipient] += _share;

232:                 claimable1[recipient] += _share;

251:             reserve0CumulativeLast += _reserve0 * timeElapsed;

252:             reserve1CumulativeLast += _reserve1 * timeElapsed;

277:             reserve0Cumulative += _reserve0 * timeElapsed;

278:             reserve1Cumulative += _reserve1 * timeElapsed;

301:             priceAverageCumulative += _prices[i];

319:         for (; i < length; i+=window) {

495:         totalSupply += amount;

496:         balanceOf[dst] += amount;

564:         balanceOf[dst] += amount;

```

```solidity
File: ./contracts/PairFees.sol

40:             toStake0 += amount;

44:             toStake1 += amount;

```

```solidity
File: ./contracts/RewardsDistributor.sol

89:                     tokens_per_week[this_week] += to_distribute;

91:                     tokens_per_week[this_week] += to_distribute * (block.timestamp - t) / since_last;

96:                     tokens_per_week[this_week] += to_distribute;

98:                     tokens_per_week[this_week] += to_distribute * (next_week - t) / since_last;

152:             to_distribute += balance_of * tokens_per_week[week_cursor] / supply;

153:             week_cursor += WEEK;

185:             to_distribute += balance_of * tokens_per_week[week_cursor] / supply;

186:             week_cursor += WEEK;

238:                 total += amount;

```

```solidity
File: ./contracts/RouterV2.sol

247:         pairSwapMetaData.balanceA += (amountIn - (amountIn * IPairFactory(factory).getFee(pair, pairSwapMetaData.stable) / 10000));

```

```solidity
File: ./contracts/VoterV3.sol

163:                 _totalWeight += _votes;

219:             if(gaugeManager.isGaugeAliveForPool(_poolVote[i])) _totalVoteWeight += _weights[i];

232:                 weights[_pool] += _poolWeight;

241:                 _usedWeight += _poolWeight;

246:         totalWeight += _usedWeight;

```

```solidity
File: ./contracts/VotingEscrow.sol

477:         ownerToNFTokenCount[_to] += 1;

673:                 t_i += WEEK;

681:                 last_point.slope += d_slope;

693:                 _epoch += 1;

709:             last_point.slope += (u_new.slope - u_old.slope);

710:             last_point.bias += (u_new.bias - u_old.bias);

731:                 old_dslope += u_old.slope;

776:             _locked.amount += int128(int256(_value + calculate_sm_nft_bonus(_value)));

778:             _locked.amount += int128(int256(_value));

823:         if (_locked.isSMNFT) smNFTBalance += _value;

824:         else if (_locked.isPermanent) permanentLockBalance += _value;

853:             smNFTBalance += _value;

886:         if (_locked.isSMNFT) smNFTBalance += _value;

887:         else if (_locked.isPermanent) permanentLockBalance += _value;

926:         smNFTBalance += _amount;

975:         permanentLockBalance += _amount;

1110:                 smNFTBalance += value0;

1119:                 permanentLockBalance += value0;

```

```solidity
File: ./contracts/WAVAX.sol

27:         balanceOf[msg.sender] += msg.value;

74:         balanceOf[to]   += value;

```

```solidity
File: ./contracts/governance/Governor.sol

716:             proposalvote.againstVotes += weight;

718:             proposalvote.forVotes += weight;

720:             proposalvote.abstainVotes += weight;

```

```solidity
File: ./contracts/governance/L2GovernorCountingSimple.sol

105:             proposalvote.againstVotes += weight;

107:             proposalvote.forVotes += weight;

109:             proposalvote.abstainVotes += weight;

```

```solidity
File: ./contracts/libraries/Math.sol

30:                 x += 1;

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

121:             block_time += (d_t * (_block - point_0.blk)) / d_block;

193:             t_i += WEEK;

204:             last_point.slope += d_slope;

```

### <a name="GAS-3"></a>[GAS-3] Use assembly to check for `address(0)`
*Saves 6 gas per instance*

*Instances (161)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

205:         if(address(_account) == address(0)){

323:             if(address(_gauge) != address(0)){

324:                 if(_account != address(0)){

351:         _pairInfo.claimable0 = _type == false || _account == address(0) ? 0 : ipair.claimable0(_account);

358:         _pairInfo.claimable1 = _type == false || _account == address(0) ? 0 : ipair.claimable1(_account);

369:         _pairInfo.account_lp_balance = _account == address(0) ? 0 : IERC20(_pair).balanceOf(_account);

370:         _pairInfo.account_token0_balance = _account == address(0) ? 0 : IERC20(token_0).balanceOf(_account);

371:         _pairInfo.account_token1_balance = _account == address(0) ? 0 : IERC20(token_1).balanceOf(_account);

374:         _pairInfo.account_staked_unlock = _account != address(0) && address(_gauge) != address(0) ? _gauge.maturityTime(_account) : 0;

395:             if(address(_gaugeAddress) != address(0)){

448:         require(_owner != address(0), 'zeroAddr');

456:         require(_voter != address(0), 'zeroAddr');

470:         require(_gaugeManager != address(0), 'zeroAddr');

509:             if(algebraPoolAPIStorage.pairToDeployer(algebraFactory.allPairs(i)) == address(0))continue;

529:                 if(algebraPoolAPIStorage.pairToDeployer(algebraFactory.allPairs(i - totBasicPairs)) == address(0))continue;

550:                     if(algebraPoolAPIStorage.pairToDeployer(algebraFactory.allPairs(j - totBasicPairs)) == address(0))continue;

599:                 if(algebraPoolAPIStorage.pairToDeployer(pairMidCL) == address(0))continue;

602:                 if(swapRouteHelperData._pairMid != address(0)){

```

```solidity
File: ./contracts/APIHelper/GenesisPoolAPI.sol

50:         if(genesisPool == address(0)) return genesisData;

71:         userDeposit = _user != address(0) ? IGenesisPool(genesisPool).userDeposits(_user) : 0;

114:             userDeposit = _user != address(0) ? IGenesisPool(genesisPool).userDeposits(_user) : 0;

146:                 if(genesisPoolsPerToken[j] == address(0)) continue;

154:                 userDeposit = _user != address(0) ? genesisPool.userDeposits(_user) : 0;

172:                 if(genesisPoolsPerToken[j] == address(0)) continue;

180:                 userDeposit = _user != address(0) ? genesisPool.userDeposits(_user) : 0;

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

166:         require(_owner != address(0), 'zeroAddr');

172:         require(_voter != address(0), 'zeroAddr');

181:         require(_gaugeManager != address(0), 'zeroAddr');

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

60:         if(_user == address(0)) return amounts;

64:             amounts[i] = tokenAddresses[i] != address(0) ? IERC20(tokenAddresses[i]).balanceOf(_user) : 0;

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

26:         require(token0 != address(0), 'TradeHelper: ZERO_ADDRESS');

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

155:             if(_owner != address(0)){

167:         uint256 totNFTs = (_user != address(0)) ? ve.balanceOf(_user) : 0;

210:         if(_owner == address(0)){

277:         if(_user == address(0)){

331:         if (_gauge == address(0)) {

338:         uint256 totBribeTokens = (external_bribe == address(0)) ? 0 : IBribeAPI(external_bribe).rewardsListLength();

412:         require(_owner != address(0), 'ZA');

425:         require(msg.sender == owner && _avm!=address(0));

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

171:             if(_owner != address(0)){

183:         uint256 totNFTs = (_user != address(0)) ? ve.balanceOf(_user) : 0;

226:         if(_owner == address(0)){

243:             if(_votedPair == address(0)){

293:         if(_user == address(0)){

368:         if (_gauge == address(0)) {

375:         uint256 totBribeTokens = (external_bribe == address(0)) ? 0 : IBribeAPI(external_bribe).rewardsListLength();

449:         require(_owner != address(0), 'ZA');

462:         require(msg.sender == owner && _avm!=address(0));

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

226:             uint256 _dibsFeeToken0 = (dibs != address(0)) ? (claimed0 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

227:             uint256 _dibsFeeToken1 = (dibs != address(0)) ? (claimed1 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

286:         uint256 _dibsFeeToken0 = (dibs != address(0)) ? (totalFeeToken0 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

287:         uint256 _dibsFeeToken1 = (dibs != address(0)) ? (totalFeeToken1 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

129:         require(_dibs != address(0));

```

```solidity
File: ./contracts/BlackClaims.sol

242:         require(tokenAddress_ != address(0));

248:         require(_owner != address(0));

252:         require(_owner != address(0));

```

```solidity
File: ./contracts/Bribes.sol

63:         require(_bribeFactory != address(0) && _voter != address(0) && _gaugeManager != address(0) && _owner != address(0), "ZA");

72:         require(minter != address(0), "ZA");

327:         require(_Voter != address(0), "ZA");

333:         require(_gaugeManager != address(0));

339:         require(_minter != address(0), "ZA");

345:         require(_avm!=address(0), "ZA");

352:         require(_owner != address(0), "ZA");

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

64:         require(account != address(0), "zero address");

71:         require(account != address(0), "zero address");

180:         require(_newRecipient != address(0), "zero address");

185:         require(_newManager != address(0), "zero address");

194:         require(_algebraFarmingProxyPluginFactory != address(0), "zero address");

199:         require(_algebraFactory != address(0), "zero address");

204:         require(_algebraPluginFactory != address(0), "zero address");

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

176:         require(token != address(0), "ZA");

```

```solidity
File: ./contracts/GaugeManager.sol

107:         require(_bribeFactory != address(0), "ZA");

115:         require(_permissionRegistry != address(0), "ZA");

122:         require(_voter != address(0), "ZA");

128:         require(_genesisManager != address(0), "ZA");

139:         require(_blackGovernor != address(0), "ZA");

189:         require(_factory != address(0), "ZA");

190:         require(_gaugeFactory != address(0), "ZA");

211:         require(tokenA != address(0) && tokenB != address(0), "!TOKENS");

521:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId) || (address(avm)!= address(0) && avm.getOriginalOwner(_tokenId) == msg.sender), "NAO");

541:         require(_minter != address(0), "ZA");

```

```solidity
File: ./contracts/GaugeV2.sol

70:         if (account != address(0)) {

126:         require(_distribution != address(0), "ZA");

179:         if(genesisPool != address(0)) balance += IGenesisPool(genesisPool).balanceOf(account);

222:         require(_tokenOwner != address(0), "ZA");

252:         if (address(gaugeRewarder) != address(0)) {

280:         if (address(gaugeRewarder) != address(0)) {

296:         if(genesisPool != address(0)) IGenesisPool(genesisPool).deductAllAmount(msg.sender);

315:         if(genesisPool != address(0)) gensisBalance = IGenesisPool(genesisPool).balanceOf(msg.sender);

321:         if(genesisPool != address(0)){

342:         if (gaugeRewarder != address(0)) {

356:         if (gaugeRewarder != address(0)) {

```

```solidity
File: ./contracts/GenesisPool.sol

105:             if(_token != address(0) && _amount > 0 && (_token == genesisInfo.nativeToken || tokenHandler.isConnector(_token))){

396:         require(_auction != address(0), "ZA");

```

```solidity
File: ./contracts/GenesisPoolManager.sol

113:         if (pairAddress != address(0)) {

124:         if(genesisPool == address(0))

127:         require(genesisPool != address(0), "ZA");

131:         auction = auction == address(0) ? auctionFactory.auctions(0) : auction;

140:         require(nativeToken != address(0), "ZA");

142:         require(genesisPool != address(0), 'ZA');

149:         require(nativeToken != address(0), "ZA");

151:         require(genesisPool != address(0), 'ZA');

157:         if (pairAddress == address(0)) {

173:         require(genesisPool != address(0), "ZA");

270:         require(_genesisPool != address(0), "ZA");

283:         require(_epochController != address(0), "ZA");

300:         require(_nativeToken != address(0), "ZA");

302:         require(genesisPool != address(0), "ZA");

307:         require(_nativeToken != address(0), "ZA");

309:         require(genesisPool != address(0), "ZA");

314:         require(_router == address(0), "ZA");

```

```solidity
File: ./contracts/MinterUpgradeable.sol

112:         require(__gaugeManager != address(0));

161:         if (block.timestamp >= _period + WEEK && _initializer == address(0)) { // only trigger if new week

214:         return (block.timestamp >= _period + WEEK && _initializer == address(0));

```

```solidity
File: ./contracts/Pair.sol

166:         uint256 _referralFee = (_dibs != address(0)) ? (amount * _maxRef / 10000) : 0;

191:         uint256 _referralFee = (_dibs != address(0)) ? (amount * _maxRef / 10000) : 0;

533:         require(recoveredAddress != address(0) && recoveredAddress == owner, 'ISIG');

```

```solidity
File: ./contracts/PermissionsRegistry.sol

237:         require(_new != address(0), "addr0");

249:         require(_new != address(0), "addr 0");

260:         require(_new != address(0), "addr0");

```

```solidity
File: ./contracts/RewardsDistributor.sol

207:                 if (address(avm) != address(0) && avm.tokenIdToAVMId(_tokenId) != 0) {

260:         require(_token != address(0));

266:         require(_avm != address(0), "ZA");

```

```solidity
File: ./contracts/RouterV2.sol

165:         require(token0 != address(0) && token0 != token1, 'IA');

206:         if (pair == address(0)) {

297:         if (_pair != address(0)) {

327:         if (_pair == address(0)) {

351:         if (_pair == address(0)) {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

22:         require(_voterV3 != address(0), "Voter cannot be zero");

23:         require(_avm != address(0), "AVM cannot be zero");

52:             require(_poolAddresses[i] != address(0), "Zero address not allowed");

69:         require(_avm != address(0), "ZA");

76:         require(_executor!=address(0), "ZA"); 

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

20:         require(_avm != address(0), "AVM address cannot be zero");

56:         require(_avm != address(0), "ZA");

67:         require(_executor != address(0), "ZA");

```

```solidity
File: ./contracts/TokenHandler.sol

46:         require(_permissionRegistry != address(0), "addr0");

```

```solidity
File: ./contracts/VotingEscrow.sol

178:         require(idToOwner[_tokenId] != address(0), "DNE");

257:         require(owner != address(0), "ZA");

288:         if (idToApprovals[_tokenId] != address(0)) {

471:         assert(idToOwner[_tokenId] == address(0));

488:         assert(_to != address(0));

1223:         return current == address(0) ? delegator : current;

1312:         if (delegatee == address(0)) delegatee = msg.sender;

1325:         require(delegatee != address(0), "ZA");

1344:             signatory != address(0),

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

31:         require(_auction != address(0), 'addr0');

41:         require(_auction != address(0), 'addr0');

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

114:         require(_genesisManager != address(0), "ZA");

115:         require(_gauge != address(0), "ZA");

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

57:         require(nativeToken != address(0), "ZA"); 

58:         require(getGenesisPool(nativeToken) == address(0), "!ZA");

```

```solidity
File: ./contracts/factories/PairFactory.sol

78:         require(_feehandler != address(0), "ZA");

83:         require(_dibs != address(0), "ZA");

131:         require(_pairAddress != address(0) && isPair[_pairAddress], "INVP");

142:         require(token0 != address(0), "ZA"); // Pair: ZERO_ADDRESS

143:         require(getPair[token0][token1][stable] == address(0), "!ZA");

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

18:         require(_pairFactory != address(0) , 'addr0');

27:         require(_gaugeFactory != address(0) , 'addr0');

36:         require(_pairFactory != address(0), 'addr0');

48:         require(_gaugeFactory != address(0) , 'addr0');

```

### <a name="GAS-4"></a>[GAS-4] `array[index] += amount` is cheaper than `array[index] = array[index] + amount` (or related variants)
When updating a value in an array with arithmetic, using `array[index] += amount` is cheaper than `array[index] = array[index] + amount`.

This is because you avoid an additional `mload` when the array is stored in memory, and an `sload` when the array is stored in storage.

This can be applied for any arithmetic operation including `+=`, `-=`,`/=`,`*=`,`^=`,`&=`, `%=`, `<<=`,`>>=`, and `>>>=`.

This optimization can be particularly significant if the pattern occurs during a loop.

*Saves 28 gas for a storage array, 38 for a memory array*

*Instances (5)*:
```solidity
File: ./contracts/GaugeV2.sol

250:         _balances[account] = _balances[account] + amount;

320:         _balances[msg.sender] = _balances[msg.sender] - gaugeDeduction;

```

```solidity
File: ./contracts/GenesisPool.sol

147:         userDeposits[spender] = userDeposits[spender] + _amount;

```

```solidity
File: ./contracts/VotingEscrow.sol

1076:         attachments[_tokenId] = attachments[_tokenId] + 1;

1081:         attachments[_tokenId] = attachments[_tokenId] - 1;

```

### <a name="GAS-5"></a>[GAS-5] Comparing to a Boolean constant
Comparing to a constant (`true` or `false`) is a bit more expensive than directly checking the returned boolean value.

Consider using `if(directValue)` instead of `if(directValue == true)` and `if(!directValue)` instead of `if(directValue == false)`

*Instances (8)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

92:         require(emergency == false, "emergency");

97:         require(emergency == false, "emergency");

104:         require(emergency == true,"emergency");

152:         uint256 amountRequested = isBonusReward == false ? reward: bonusReward;

153:         farmingCenter.claimReward(isBonusReward == false ? rewardTokenAdd : bonusRewardTokenAdd , owner, amountRequested);

```

```solidity
File: ./contracts/GaugeV2.sol

93:         require(emergency == false, "EMER");

145:         require(emergency == false, "EMER");

152:         require(emergency == true,"EMER");

```

### <a name="GAS-6"></a>[GAS-6] Using bools for storage incurs overhead
Use uint256(1) and uint256(2) for true/false to avoid a Gwarmaccess (100 gas), and to avoid Gsset (20000 gas) when changing from ‘false’ to ‘true’, after having been ‘true’ in the past. See [source](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/58f635312aa21f947cae5f8578638a85aa2519f5/contracts/security/ReentrancyGuard.sol#L23-L27).

*Instances (34)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

50:     bool public emergency;

51:     bool public immutable isForPair;

```

```solidity
File: ./contracts/Black.sol

16:     bool public initialMinted;

```

```solidity
File: ./contracts/Bribes.sol

56:     mapping(address => bool) internal isBribeToken;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

29:     mapping(address => bool) public authorizedAccounts;

```

```solidity
File: ./contracts/GaugeManager.sol

57:     mapping(address => bool) public isGauge;                    // gauge    => boolean [is a gauge?]

58:     mapping(address => bool) public isCLGauge;

59:     mapping(address => bool) public isAlive;                    // gauge    => boolean [is the gauge alive?]

```

```solidity
File: ./contracts/GaugeV2.sol

28:     bool public immutable isForPair;

29:     bool public emergency;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

51:     mapping(address => mapping(address => bool)) public whiteListedTokensToUser; 

55:     mapping(address => bool) internal isNativeToken;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

21:     bool public isFirstMint;

52:     mapping(uint256 => bool) public proposals;

```

```solidity
File: ./contracts/Pair.sol

21:     bool public immutable stable;

```

```solidity
File: ./contracts/PermissionsRegistry.sol

20:     mapping(bytes => mapping(address => bool)) public hasRole;

21:     mapping(bytes => bool) internal _checkRole;

```

```solidity
File: ./contracts/Thenian.sol

29:     mapping(address => bool) public firstMint;

```

```solidity
File: ./contracts/TokenHandler.sol

9:     mapping(address => bool) public isWhitelisted;             

10:     mapping(uint256 => bool) public isWhitelistedNFT;

11:     mapping(address => bool) public isConnector;

```

```solidity
File: ./contracts/VotingEscrow.sol

89:     mapping(bytes4 => bool) internal supportedInterfaces;

227:     mapping(address => mapping(address => bool)) internal ownerToOperators;

566:     mapping(address => bool) public canSplit;

1052:     mapping(uint => bool) public voted;

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

10:     mapping(address => bool) public isAuction;

```

```solidity
File: ./contracts/factories/PairFactory.sol

12:     bool public isPaused;

27:     mapping(address => mapping(address => mapping(bool => address))) public getPair;

29:     mapping(address => bool) public isPair; 

32:     mapping(address => bool) public isGenesis; 

```

```solidity
File: ./contracts/governance/Governor.sol

640:         mapping(address => bool) hasVoted;

```

```solidity
File: ./contracts/governance/L2GovernorCountingSimple.sol

29:         mapping(address => bool) hasVoted;

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

7:         mapping(address => bool) isFactory;

8:         mapping(address => bool) isGaugeFactory;

```

### <a name="GAS-7"></a>[GAS-7] Cache array length outside of loop
If not cached, the solidity compiler will always read the length of the array during each iteration. That is, if it is a storage array, this is an extra sload operation (100 additional extra gas for each iteration except for the first) and if it is a memory array, this is an extra mload operation (3 additional gas for each iteration except for the first).

*Instances (57)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

113:         for(uint i=0; i<locks.length; i++) {

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

109:         for (uint256 i = 0; i < avms.length; i++) {

176:         for(uint i=0; i<avms.length; i++) {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

104:         for ( i ; i < _gauges.length; i++){

111:         for ( i ; i < _gauges.length; i++){

119:         for ( i ; i < _gauges.length; i++){

```

```solidity
File: ./contracts/BlackClaims.sol

170:         for (uint256 i = 0; i < players_.length; i++) {

```

```solidity
File: ./contracts/GaugeManager.sol

159:         for(i; i < _pool.length; i++){

363:         for (uint256 x = 0; x < _gauges.length; x++) {

507:         for (uint256 i = 0; i < _gauges.length; i++) {

514:         for (uint256 i = 0; i < _nftIds.length; i++) {

522:         for (uint256 i = 0; i < _bribes.length; i++) {

```

```solidity
File: ./contracts/GlobalRouter.sol

178:         for (uint i = 0; i < routes.length; i++) {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

92:             for (uint i = 0; i < claimants.length; i++) {

```

```solidity
File: ./contracts/Pair.sol

300:         for (uint i = 0; i < _prices.length; i++) {

```

```solidity
File: ./contracts/PermissionsRegistry.sol

97:         for(uint i = 0; i < _roles.length; i++){

108:         for(uint i = 0; i < rta.length; i++){

111:             for(uint k = 0; k < __roles.length; k++){

148:         for(uint i = 0; i < rta.length; i++){

156:         for(uint i = 0; i < atr.length; i++){

178:         for(uint i = 0; i < _roles.length; i++){

203:         for(i; i < _temp.length; i++){

```

```solidity
File: ./contracts/RewardsDistributor.sol

225:         for (uint i = 0; i < _tokenIds.length; i++) {

```

```solidity
File: ./contracts/RouterV2.sol

265:         for (uint i = 0; i < routes.length; i++) {

500:         for (uint i = 0; i < routes.length; i++) {

706:         for (uint i; i < routes.length; i++) {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

51:         for (uint256 i = 0; i < _poolAddresses.length; i++) {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

49:         for (uint256 i = 0; i < _weights.length; i++) {

```

```solidity
File: ./contracts/TokenHandler.sol

54:         for(i = 0; i < _tokens.length; i++){

74:         for(i = 0; i < _token.length; i++){

113:         for(i = 0; i < _tokens.length; i++){

```

```solidity
File: ./contracts/VotingEscrow.sol

1238:         for (uint i = 0; i < _tokenIds.length; i++) {

1254:         for (uint i = 0; i < _tokenIds.length; i++) {

1272:         for (uint i = 0; i < _tokenIds.length; i++) {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

113:         for(i; i < defaultRewardToken.length; i++){

138:         for ( i ; i < _token.length; i++){

146:         for ( i ; i < __bribes.length; i++){

156:         for ( i ; i < __bribes.length; i++){

158:             for(k = 0; k < _token.length; k++){

168:         for(i; i< _bribe.length; i++){

176:         for(i; i<_bribe.length; i++){

184:         for(i; i< _bribe.length; i++){

192:         for(i; i< _bribe.length; i++){

203:         for(i; i< _bribe.length; i++){

214:         for(i; i< _bribe.length; i++){

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

69:         for ( i ; i < _gauges.length; i++){

76:         for ( i ; i < _gauges.length; i++){

84:         for ( i ; i < _gauges.length; i++){

92:         for ( i ; i < _gauges.length; i++){

99:         for ( i ; i < _gauges.length; i++){

108:         for ( i ; i < _gauges.length; i++){

```

```solidity
File: ./contracts/governance/Governor.sol

343:         for (uint256 i = 0; i < targets.length; ++i) {

360:             for (uint256 i = 0; i < targets.length; ++i) {

```

```solidity
File: ./contracts/governance/L2Governor.sol

334:         for (uint256 i = 0; i < targets.length; ++i) {

351:             for (uint256 i = 0; i < targets.length; ++i) {

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

101:                     for (uint i = 0; i < dstRepOld.length; i++) {

176:                     for (uint i = 0; i < dstRepOld.length; i++) {

```

### <a name="GAS-8"></a>[GAS-8] State variables should be cached in stack variables rather than re-reading them from storage
The instances below point to the second+ access of a state variable within a function. Caching of a state variable replaces each Gwarmaccess (100 gas) with a much cheaper stack read. Other less obvious fixes/optimizations include having local memory caches of state variable structs, or having local caches of state variable contracts/addresses.

*Saves 100 gas per instance*

*Instances (72)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

366:         _pairInfo.emissions_token_decimals = IERC20(underlyingToken).decimals();			    

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

127:             amountIn = amountInNoFees * 10000 / (10000 - PairFactory(factory).getFee(pair, true));

141:             amountIn = (amountOut * reserveIn / (reserveOut - amountOut)) * 10000 / (10000 - PairFactory(factory).getFee(pair,false));

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

346:                 poolAddress = IGaugeManager(gaugeManager).poolForGauge(gaugeFactory.gauges(i));

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

166:             rewardRate = (reward + leftover) / DURATION;

168:         _periodFinish = block.timestamp + DURATION;

225:             address dibs = IGaugeFactoryCL(factory).dibs();

244:                 IERC20(_token0).safeApprove(internal_bribe, _fees0);

245:                 IBribe(internal_bribe).notifyRewardAmount(_token0, _fees0);

248:                 IERC20(_token1).safeApprove(internal_bribe, 0);

249:                 IERC20(_token1).safeApprove(internal_bribe, _fees1);

250:                 IBribe(internal_bribe).notifyRewardAmount(_token1, _fees1);

285:         address dibs = IGaugeFactoryCL(factory).dibs();

```

```solidity
File: ./contracts/Bribes.sol

251:             supplyCheckpoints[_nCheckPoints] = SupplyCheckpoint(_timestamp, totalSupply);

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

92:         IAlgebraCustomPoolEntryPoint(entryPoint).setTickSpacing(

104:             algebraFeeShare

117:         IAlgebraCustomPoolEntryPoint(entryPoint).setPlugin(

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

97:         uint256 lpSupply = IERC20(IGauge(GAUGE).TOKEN()).balanceOf(GAUGE);

138:         require(IERC20(rewardToken).balanceOf(address(this)) >= amount, "!ENOUGH");

151:             uint256 lpSupply = IERC20(IGauge(GAUGE).TOKEN()).balanceOf(GAUGE);

```

```solidity
File: ./contracts/GaugeManager.sol

208:         require(ITokenHandler(tokenHandler).isWhitelisted(tokenA) && ITokenHandler(tokenHandler).isWhitelisted(tokenB), "!WHITELISTED");

209:         require(ITokenHandler(tokenHandler).isConnector(tokenA) || ITokenHandler(tokenHandler).isConnector(tokenB), "!CONNECTOR");

219:             _gauge = IGaugeFactoryCL(_gaugeFactory).createGauge(base, _ve, _pool, address(this), _internal_bribe, _external_bribe, isPair, farmingParam, bonusRewardToken);

219:             _gauge = IGaugeFactoryCL(_gaugeFactory).createGauge(base, _ve, _pool, address(this), _internal_bribe, _external_bribe, isPair, farmingParam, bonusRewardToken);

224:         IERC20(base).approve(_gauge, type(uint256).max);

261:         _external_bribe = IBribeFactory(bribefactory).createBribe(_owner, tokenA, tokenB, _extrenalType);

301:         emit NotifyReward(msg.sender, base, amount);

386:                         IGaugeCL(_gauge).notifyRewardAmount(base, _claimable);

426:             supplyIndex[_gauge] = index; // new users are set to the default global state

```

```solidity
File: ./contracts/GaugeV2.sol

253:             IRewarder(gaugeRewarder).onReward(account, account, _balanceOf(account));

281:             IRewarder(gaugeRewarder).onReward(msg.sender, msg.sender,_balanceOf(msg.sender));

322:             IGenesisPool(genesisPool).deductAmount(msg.sender, genesisDeduction);

391:             rewardRate = (reward + leftover) / DURATION;

402:         _periodFinish = block.timestamp + DURATION;

426:                 IERC20(_token0).safeApprove(internal_bribe, _fees0);

427:                 IBribe(internal_bribe).notifyRewardAmount(_token0, _fees0);

430:                 IERC20(_token1).safeApprove(internal_bribe, 0);

431:                 IERC20(_token1).safeApprove(internal_bribe, _fees1);

432:                 IBribe(internal_bribe).notifyRewardAmount(_token1, _fees1);

```

```solidity
File: ./contracts/GenesisPool.sol

228:         IGauge(liquidityPoolInfo.gaugeAddress).depositsForGenesis(genesisInfo.tokenOwner, block.timestamp + maturityTime, liquidity);

```

```solidity
File: ./contracts/MinterUpgradeable.sol

127:         uint _smNFTBalance = IVotingEscrow(_ve).smNFTBalance();

128:         uint _superMassiveBonus = IVotingEscrow(_ve).calculate_sm_nft_bonus(_smNFTBalance);

```

```solidity
File: ./contracts/Pair.sol

165:         uint256 _maxRef = PairFactory(factory).getReferralFee(address(this));

172:         uint256 _stakingNftFee =  amount * PairFactory(factory).stakingNFTFee() / 10000;

174:         _safeTransfer(token0, fees, amount); // transfer the fees out to PairFees

190:         uint256 _maxRef = PairFactory(factory).getReferralFee(address(this));

197:         uint256 _stakingNftFee =  amount * PairFactory(factory).stakingNFTFee() / 10000;

199:         _safeTransfer(token1, fees, amount); // transfer the fees out to PairFees

235:             supplyIndex0[recipient] = index0; // new users are set to the default global state

236:             supplyIndex1[recipient] = index1;

404:         if (amount0In > 0) _update0(amount0In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token0 and move them out of pool

405:         if (amount1In > 0) _update1(amount1In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token1 and move them out of pool

405:         if (amount1In > 0) _update1(amount1In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token1 and move them out of pool

```

```solidity
File: ./contracts/RewardsDistributor.sol

153:             week_cursor += WEEK;

186:             week_cursor += WEEK;

203:             IVotingEscrow.LockedBalance memory _locked = IVotingEscrow(voting_escrow).locked(_tokenId);

206:                 address _nftOwner = IVotingEscrow(voting_escrow).ownerOf(_tokenId);

212:                 IVotingEscrow(voting_escrow).deposit_for(_tokenId, amount);

```

```solidity
File: ./contracts/RouterV2.sol

196:         if (IBaseV1Factory(factory).isPair(pairStable) && !IBaseV1Factory(factory).isGenesis(pairStable)) {

200:         if (IBaseV1Factory(factory).isPair(pairVolatile) && !IBaseV1Factory(factory).isGenesis(pairVolatile)) {

352:             _pair = IBaseV1Factory(factory).createPair(tokenA, tokenB, stable);

409:         address pair = pairFor(token, address(wETH), stable);

503:                     IERC20(routes[i].from).approve(swapRouter, amounts[i]);

517:                 amounts[i+1] = ISwapRouter(swapRouter).exactInputSingle(inputParams);

557:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

581:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

596:             if (IERC20(address(wETH)).allowance(address(this), swapRouter) < amounts[0]) {

597:                 IERC20(address(wETH)).approve(swapRouter, amounts[0]);

621:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

783:         uint amountOut = erc20(address(wETH)).balanceOf(address(this));

```

```solidity
File: ./contracts/VotingEscrow.sol

634:                 u_new.slope = new_locked.amount / iMAXTIME;

719:             last_point.smNFTBonus = calculate_sm_nft_bonus(smNFTBalance);

```

### <a name="GAS-9"></a>[GAS-9] Use calldata instead of memory for function arguments that do not get mutated
When a function with a `memory` array is called externally, the `abi.decode()` step has to use a for-loop to copy each index of the `calldata` to the `memory` index. Each iteration of this for-loop costs at least 60 gas (i.e. `60 * <mem_array>.length`). Using `calldata` directly bypasses this loop. 

If the array is passed to an `internal` function which passes the array to another internal function where the array is modified and therefore `memory` is used in the `external` call, it's still more gas-efficient to use `calldata` when the `external` function uses modifiers, since the modifiers may prevent the internal functions from being called. Structs have the same overhead as an array of length one. 

 *Saves 60 gas per instance*

*Instances (77)*:
```solidity
File: ./contracts/APIHelper/RewardAPI.sol

57:     function getExpectedClaimForNextEpoch(uint tokenId, address[] memory pairs) external view returns(Rewards[] memory){

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

56:     function getTokenBalances(address _user, address[] memory tokenAddresses) external view returns (uint256[] memory amounts){

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

72:     function getAmountsOut(uint amountIn, route[] memory routes) public view returns (uint[] memory amounts) {

151:     function getAmountsIn(uint amountOut, route[] memory routes) public view returns (uint[] memory amounts) {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

60:                         IGaugeManager.FarmingParam memory farmingParam, address _bonusRewardToken) external returns (address) {

102:     function activateEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

109:     function stopEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

116:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {

```

```solidity
File: ./contracts/BlackGovernor.sol

68:         address[] memory targets,

69:         uint256[] memory values,

70:         bytes[] memory calldatas,

96:         address[] memory targets,

97:         uint256[] memory values,

98:         bytes[] memory calldatas,

99:         string memory description

```

```solidity
File: ./contracts/Bribes.sol

272:     function getReward(uint256 tokenId, address[] memory tokens) external nonReentrant  {

```

```solidity
File: ./contracts/GaugeManager.sol

151:     function createGauges(address[] memory _pool, uint256[] memory _gaugeTypes) external nonReentrant returns(address[] memory, address[] memory, address[] memory)  {

361:     function distribute(address[] memory _gauges) external nonReentrant {

506:     function claimRewards(address[] memory _gauges) external {

513:     function claimRewards(address _gauge, uint256[] memory _nftIds, bool isBonusReward) external {

520:     function claimBribes(address[] memory _bribes, address[][] memory _tokens, uint256 _tokenId) external {

```

```solidity
File: ./contracts/GlobalRouter.sol

19:     function getAmountsOut(uint amountIn, Route[] memory routes) external view returns (uint[] memory amounts);

204:     function exactInput(IRouterV3.ExactInputParams memory params)

260:     function getAmountsOut(uint amountIn, ITradeHelper.Route[] memory routes) external view returns (uint[] memory amounts){

```

```solidity
File: ./contracts/MinterUpgradeable.sol

84:         address[] memory claimants,

85:         uint[] memory amounts,

```

```solidity
File: ./contracts/PermissionsRegistry.sol

83:     function addRole(string memory role) external onlyBlackMultisig {

93:     function removeRole(string memory role) external onlyBlackMultisig {

124:     function setRoleFor(address c, string memory role) external onlyBlackMultisig {

140:     function removeRoleFrom(address c, string memory role) external onlyBlackMultisig {

195:     function roleToAddresses(string memory role) external view returns(address[] memory _addresses){

215:     function helper_stringToBytes(string memory _input) public pure returns(bytes memory){

220:     function helper_bytesToString(bytes memory _input) public pure returns(string memory){

```

```solidity
File: ./contracts/RewardsDistributor.sol

219:     function claim_many(uint[] memory _tokenIds) external returns (bool) {

```

```solidity
File: ./contracts/RouterV2.sol

258:     function getAmountsOut(uint amountIn, route[] memory routes) public returns (uint[] memory amounts) {

630:         uint[] memory amounts,

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

46:     function setTopNPools(address[] memory _poolAddresses) external onlyExecutor {

```

```solidity
File: ./contracts/TokenHandler.sol

52:     function whitelistTokens(address[] memory _tokens) external GovernanceOrGenesisManager {

72:     function blacklistTokens(address[] memory _token) external GovernanceOrGenesisManager {

111:     function whitelistConnectors(address[] memory _tokens) external Governance {

```

```solidity
File: ./contracts/VotingEscrow.sol

410:         bytes memory _data

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

67:     function activateEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

74:     function stopEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

81:     function setRewarderPid( address[] memory _gauges, uint[] memory _pids) external onlyAllowed {

89:     function setGaugeRewarder( address[] memory _gauges, address[] memory _rewarder) external onlyAllowed {

97:     function setDistribution(address[] memory _gauges,  address distro) external onlyAllowed {

105:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {

```

```solidity
File: ./contracts/governance/Governor.sol

143:         address[] memory targets,

144:         uint256[] memory values,

145:         bytes[] memory calldatas,

309:         address[] memory targets,

310:         uint256[] memory values,

311:         bytes[] memory calldatas,

424:         bytes memory params

456:         bytes memory params

488:         bytes memory params,

585:         bytes memory

598:         bytes memory

609:         uint256[] memory,

610:         uint256[] memory,

611:         bytes memory

```

```solidity
File: ./contracts/interfaces/IAlgebraEternalFarmingCustom.sol

8:     IncentiveKey memory key,

9:     IAlgebraEternalFarming.IncentiveParams memory params,

14:   function deactivateIncentive(IncentiveKey memory key, address deployer) external;

16:   function getRewardInfo(IncentiveKey memory key, uint256 tokenId) external view returns (uint256 reward, uint256 bonusReward);

```

```solidity
File: ./contracts/interfaces/IBribe.sol

7:     function getRewardForAddress(address _owner, address[] memory tokens) external;

10:     function getReward(uint tokenId, address[] memory tokens) external;

```

```solidity
File: ./contracts/interfaces/IBribeDistribution.sol

7:     function getRewardForOwner(uint tokenId, address[] memory tokens) external;

```

```solidity
File: ./contracts/interfaces/IBribeFactory.sol

5:     function createInternalBribe(address[] memory) external returns (address);

6:     function createExternalBribe(address[] memory) external returns (address);

7:     function createBribe(address _owner,address _token0,address _token1, string memory _type) external returns (address);

```

```solidity
File: ./contracts/interfaces/IBribeFull.sol

10:     function getRewardForOwner(uint tokenId, address[] memory tokens) external;

```

```solidity
File: ./contracts/interfaces/IGauge.sol

6:     function getReward(address account, address[] memory tokens) external;

```

```solidity
File: ./contracts/interfaces/IGaugeAPI.sol

6:     function getReward(address account, address[] memory tokens) external;

```

```solidity
File: ./contracts/interfaces/IGaugeDistribution.sol

6:     function getReward(address account, address[] memory tokens) external;

```

```solidity
File: ./contracts/interfaces/IGaugeFactoryCL.sol

7:     function createGauge(address _rewardToken,address _ve,address _token,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, IGaugeManager.FarmingParam memory farmingParam, address bonusRewardToken) external returns (address) ;

```

```solidity
File: ./contracts/interfaces/IPermissionsRegistry.sol

7:     function hasRole(bytes memory role, address caller) external view returns(bool);

```

### <a name="GAS-10"></a>[GAS-10] For Operations that will not overflow, you could use unchecked

*Instances (1233)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

4: import "../interfaces/IVotingEscrow.sol";

5: import "./interfaces/IAutoVotingEscrow.sol";

6: import "../interfaces/IRewardsDistributor.sol";

7: import "./interfaces/IAutoVotingEscrowManager.sol";

8: import {BlackTimeLibrary} from "../libraries/BlackTimeLibrary.sol";

10: import "../interfaces/IVoter.sol";

20:     mapping(uint256 => uint256) public tokenIdIndex; // tokenId => index in `locks`

44:         uint256 lastIndex = locks.length - 1;

73:         require(start + length <= locks.length, "Out of bounds");

77:         for (uint256 i = start; i < start + length; i++) {

87:         require(start + length <= locks.length, "Out of bounds");

89:         for (uint256 i = start; i < start + length; i++) {

113:         for(uint i=0; i<locks.length; i++) {

114:             votingBalance += IVotingEscrow(votingEscrow).balanceOfNFT(locks[i].tokenId);

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

4: import "./AutoVotingEscrow.sol";

5: import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

7: import "../interfaces/IVotingEscrow.sol";

8: import "./interfaces/IAutoVotingEscrow.sol";

9: import "../interfaces/ITopNPoolsStrategy.sol";

10: import "../interfaces/IVoteWeightStrategy.sol";

11: import "../interfaces/IVoter.sol";

12: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

13: import {IAutoVotingEscrowManager} from "./interfaces/IAutoVotingEscrowManager.sol";

24:     uint256 public constant MAX_TOP_N = 100; // can be changed but has to be assigned on the instantiation

56:         minBalanceForAutovoting = 10*1e18; // decimals in black

64:         require(uint256(int256(votingEscrow.locked(tokenId).amount)) >= minBalanceForAutovoting, "IB"); // to be changed to an >= instaed of a >

73:             nextAvailableAVMIndex++;

84:         target.acceptLock(msg.sender, tokenId); // insert to token Ids here

85:         tokenIdToAVMId[tokenId] = nextAvailableAVMIndex + 1;

90:         require(avmIdxOneBased > 0 && avmIdxOneBased - 1 < avms.length, "out of range"); // is this necessary

92:         IAutoVotingEscrow avm = avms[avmIdxOneBased - 1];

96:         avm.releaseLock(tokenId); // replace with last element and pop here 

97:         IVoter(voter).reset(tokenId); // wrote it here as the autovoting escrow itself isnt upgradeable

103:         if ((!avm.isFull()) && (avmIdxOneBased - 1 < nextAvailableAVMIndex)) {

104:             nextAvailableAVMIndex = avmIdxOneBased - 1;

109:         for (uint256 i = 0; i < avms.length; i++) {

131:             avms[avmIndex].voteLocks(localStart, localEnd - localStart);

133:             avms[avmIndex].resetLocks(localStart, localEnd - localStart);

171:         return voteWeightStrategy.getVoteWeights(); // need to change interface

176:         for(uint i=0; i<avms.length; i++) {

177:             totalVotingPower+=avms[i].getTotalVotingPower();

194:     function setOriginalOwner(uint256 _tokenId, address _user) external onlyVotingEscrow {} // implement this

198:         require(avmIdxOneBased > 0 && avmIdxOneBased - 1 < avms.length, "out of range");

200:         IAutoVotingEscrow avm = avms[avmIdxOneBased - 1];

```

```solidity
File: ./contracts/AVM/interfaces/IAutoVotingEscrowManager.sol

4: import "./IAutoVotingEscrow.sol";

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

3: import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

4: import "@openzeppelin/contracts/access/Ownable.sol";

5: import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

6: import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

7: import '@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol';

9: import '../interfaces/IAlgebraEternalFarmingCustom.sol';

11: import '../interfaces/IAlgebraCustomCommunityVault.sol';

12: import '../interfaces/IGaugeFactoryCL.sol';

13: import '../interfaces/IGaugeManager.sol';

14: import '@cryptoalgebra/integral-periphery/contracts/interfaces/INonfungiblePositionManager.sol';

15: import '@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalFarming.sol';

16: import '@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalVirtualPool.sol';

17: import '@cryptoalgebra/integral-farming/contracts/interfaces/IFarmingCenter.sol';

18: import '@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol';

19: import '@cryptoalgebra/integral-core/contracts/interfaces/IERC20Minimal.sol';

21: import '../interfaces/IBribe.sol';

22: import {BlackTimeLibrary} from "../libraries/BlackTimeLibrary.sol";

23: import {IncentiveId} from '@cryptoalgebra/integral-farming/contracts/libraries/IncentiveId.sol';

67:         rewardToken = IERC20(_rewardToken);     // main reward

69:         VE = _ve;                               // vested

72:         DISTRIBUTION = _distribution;           // distro address (GaugeManager)

75:         internal_bribe = _internal_bribe;       // lp fees goes here

76:         external_bribe = _external_bribe;       // bribe fees goes here

162:             rewardRate = reward / DURATION;

164:             uint256 remaining = _periodFinish - block.timestamp;

165:             uint256 leftover = remaining * rewardRate;

166:             rewardRate = (reward + leftover) / DURATION;

168:         _periodFinish = block.timestamp + DURATION;

226:             uint256 _dibsFeeToken0 = (dibs != address(0)) ? (claimed0 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

227:             uint256 _dibsFeeToken1 = (dibs != address(0)) ? (claimed1 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

230:                 _safeTransfer(_token0, dibs, _dibsFeeToken0); // Transfer dibs fees

231:                 claimed0 -= _dibsFeeToken0;

235:                 _safeTransfer(_token1, dibs, _dibsFeeToken1); // Transfer dibs fees

236:                 claimed1 -= _dibsFeeToken1;

258:         return rewardRate * DURATION;

281:         totalFeeToken0 = gaugeAccruedFeeToken0 + communityVaultAccruedFeeToken0;

282:         totalFeeToken1 = gaugeAccruedFeeToken1 + communityVaultAccruedFeeToken1;

286:         uint256 _dibsFeeToken0 = (dibs != address(0)) ? (totalFeeToken0 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

287:         uint256 _dibsFeeToken1 = (dibs != address(0)) ? (totalFeeToken1 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

289:         totalFeeToken0 -= _dibsFeeToken0;

290:         totalFeeToken1 -= _dibsFeeToken1;

299:         communityVaultAccruedFeeToken0 += communityFeePending0;

300:         communityVaultAccruedFeeToken1 += communityFeePending1;

303:         uint256 algebraFeeToken0 = communityVaultAccruedFeeToken0 * algebraFee / ALGEBRA_FEE_DENOMINATOR;

304:         uint256 algebraFeeToken1 = communityVaultAccruedFeeToken1 * algebraFee / ALGEBRA_FEE_DENOMINATOR;

305:         communityVaultAccruedFeeToken0 -= algebraFeeToken0;

306:         communityVaultAccruedFeeToken1 -= algebraFeeToken1;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

5: import '../interfaces/IPermissionsRegistry.sol';

6: import '../interfaces/IGaugeFactoryCL.sol';

7: import './GaugeCL.sol';

8: import '../interfaces/IAlgebraEternalFarmingCustom.sol';

9: import '../interfaces/IAlgebraPoolAPIStorage.sol';

10: import '@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalFarming.sol';

11: import '@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol';

12: import '@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol';

13: import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

14: import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

15: import {BlackTimeLibrary} from "../libraries/BlackTimeLibrary.sol";

33:     address public dibs; // referral fee handler

34:     uint256 public dibsPercentage; // 0%

39:         __Ownable_init();   //after deploy ownership to multisig

41:         dibsPercentage = 0; // 0%

74:         uint256 remainingTimeInCurrentEpoch = BlackTimeLibrary.epochNext(block.timestamp) - block.timestamp;

76:         uint128 rewardRate = uint128(reward/remainingTimeInCurrentEpoch);

104:         for ( i ; i < _gauges.length; i++){

111:         for ( i ; i < _gauges.length; i++){

119:         for ( i ; i < _gauges.length; i++){

```

```solidity
File: ./contracts/Black.sol

4: import "./interfaces/IBlack.sol";

37:         _mint(_recipient, 500 * 1e6 * 1e18);

47:         totalSupply += _amount;

49:             balanceOf[_to] += _amount;

56:         balanceOf[_from] -= _value;

58:             balanceOf[_to] += _value;

71:             allowance[_from][msg.sender] -= _value;

90:             allowance[_from][msg.sender] -= _value;

97:         totalSupply -= _amount;

98:         balanceOf[_from] -= _amount;

```

```solidity
File: ./contracts/BlackClaims.sol

6: import {IERC20} from "./interfaces/IERC20.sol";

7: import {IBlackClaims} from "./interfaces/IBlackClaims.sol";

8: import {IVotingEscrow} from "./interfaces/IVotingEscrow.sol";

9: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

117:         _season.remaining_reward_amount -= uint128(_remaining_reward_amount);

137:         _season.claim_end_time = block.timestamp + claim_duration_;

149:         _season.claim_end_time = _season.claim_end_time + claim_duration_;

170:         for (uint256 i = 0; i < players_.length; i++) {

171:             _increase += rewards_[i];

172:             _decrease += season_rewards[players_[i]];

176:         _season.reward_amount += _increase;

177:         _season.reward_amount -= _decrease;

193:         _season.remaining_reward_amount -= _reward;

211:             uint256 credit_amount = (_reward * 100)/110;

212:             uint256 forfeit_amount = _reward - credit_amount;

214:             _season.remaining_reward_amount += forfeit_amount;

216:             staked_reward = (credit_amount * percent)/100;

217:             uint256 claimed_reward = credit_amount - staked_reward;

231:         _reward = season_rewards[userAddress] - claimed_rewards[userAddress];

```

```solidity
File: ./contracts/BlackGovernor.sol

4: import {IGovernor} from "@openzeppelin/contracts/governance/IGovernor.sol";

5: import {IBlackHoleVotes} from "./interfaces/IBlackHoleVotes.sol";

6: import {L2Governor, L2GovernorCountingSimple, L2GovernorVotes, L2GovernorVotesQuorumFraction} from "./governance/Governor.sol";

7: import {IMinter} from "./interfaces/IMinter.sol";

16:     uint256 public constant MAX_PROPOSAL_NUMERATOR = 100; // max 10%

18:     uint256 public proposalNumerator = 2; // start at 0.02%

27:         L2GovernorVotesQuorumFraction(4) // 4%

34:         return 2 minutes; // 1 block

59:             (token.getPastTotalSupply(block.timestamp) * proposalNumerator) /

92:         return (token.getsmNFTPastTotalSupply() * quorumNumerator()) / quorumDenominator();

```

```solidity
File: ./contracts/Bribes.sol

4: import "./interfaces/IMinter.sol";

5: import "./interfaces/IVoter.sol";

6: import "./interfaces/IGaugeManager.sol";

7: import "./interfaces/IVotingEscrow.sol";

8: import "./interfaces/ITokenHandler.sol";

9: import {IAutomatedVotingManager} from "./interfaces/IAutomatedVotingManager.sol";

10: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

11: import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

12: import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

13: import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

14: import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

33:     mapping(address => mapping(uint256 => uint256)) public tokenRewardsPerEpoch; // token -> startTimestamp -> rewardBalance

40:     address public avm; // does it need to be immutable?

106:         uint256 _currTs = BlackTimeLibrary.epochStart(lastEarn[_rewardToken][tokenId]); // take epoch last claimed in as starting point

115:         uint256 numEpochs = (BlackTimeLibrary.epochStart(block.timestamp) - _currTs) / WEEK;

118:             for (uint256 i = 0; i < numEpochs; i++) {

120:                 _index = getPriorBalanceIndex(tokenId, _currTs + WEEK - 1);

124:                 _supply = Math.max(supplyCheckpoints[getPriorSupplyIndex(_currTs + WEEK - 1)].supply, 1);

125:                 reward += (cp0.balanceOf * tokenRewardsPerEpoch[_rewardToken][_currTs]) / _supply;

126:                 _currTs += WEEK;

140:         if (checkpoints[tokenId][nCheckpoints - 1].timestamp <= timestamp) {

141:             return (nCheckpoints - 1);

150:         uint256 upper = nCheckpoints - 1;

152:             uint256 center = upper - (upper - lower) / 2; // ceil, avoiding overflow

159:                 upper = center - 1;

172:         if (supplyCheckpoints[nCheckpoints - 1].timestamp <= timestamp) {

173:             return (nCheckpoints - 1);

182:         uint256 upper = nCheckpoints - 1;

184:             uint256 center = upper - (upper - lower) / 2; // ceil, avoiding overflow

191:                 upper = center - 1;

214:         totalSupply += amount;

215:         balanceOf[tokenId] += amount;

229:             BlackTimeLibrary.epochStart(checkpoints[tokenId][_nCheckPoints - 1].timestamp) ==

232:             checkpoints[tokenId][_nCheckPoints - 1] = Checkpoint(_timestamp, balance);

235:             numCheckpoints[tokenId] = _nCheckPoints + 1;

246:             BlackTimeLibrary.epochStart(supplyCheckpoints[_nCheckPoints - 1].timestamp) ==

249:             supplyCheckpoints[_nCheckPoints - 1] = SupplyCheckpoint(_timestamp, totalSupply);

252:             supplyNumCheckpoints = _nCheckPoints + 1;

262:             totalSupply -= amount;

263:             balanceOf[tokenId] -= amount;

279:         for (uint256 i = 0; i < _length; i++) {

299:         tokenRewardsPerEpoch[_rewardsToken][epochStart] += reward;

309:         uint256 _startTimestamp = IMinter(minter).active_period() + WEEK;

311:         tokenRewardsPerEpoch[tokenAddress][_startTimestamp] = _lastReward - tokenAmount;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

4: import "@cryptoalgebra/integral-periphery/contracts/interfaces/IAlgebraCustomPoolEntryPoint.sol";

5: import "@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol";

6: import "@cryptoalgebra/integral-core/contracts/interfaces/vault/IAlgebraCommunityVault.sol";

7: import "./interfaces/IAlgebraPoolAPIStorage.sol";

8: import "./interfaces/IAlgebraFarmingProxyPluginFactory.sol";

9: import "./interfaces/IAlgebraCustomVaultPoolEntryPoint.sol";

10: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/CustomToken.sol

5: import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

6: import "@openzeppelin/contracts/access/Ownable.sol";

22:         _initialSupply = initialSupply_ * 10 ** decimals();

```

```solidity
File: ./contracts/Fan.sol

5: import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

6: import "@openzeppelin/contracts/access/Ownable.sol";

10:     uint256 private constant _initialSupply = 1000000 * 10 ** 18; // 1,000,000 tokens with 18 decimals

```

```solidity
File: ./contracts/FixedAuction.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

6: import  "./interfaces/IAuction.sol";

7: import "./interfaces/IGenesisPoolBase.sol";

8: import "./interfaces/IGenesisPool.sol";

27:         return (depositAmount * tokenAllocation.proposedNativeAmount) / tokenAllocation.proposedFundingAmount;

33:         return (depositAmount * tokenAllocation.proposedFundingAmount) / tokenAllocation.proposedNativeAmount;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

4: import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

5: import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

6: import "@openzeppelin/contracts/access/Ownable.sol";

7: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

80:         user.rewardDebt = (userBalance * (pool.accRewardPerShare) / ACC_TOKEN_PRECISION);

104:                 _tempTimestamp = pool.lastRewardTime > lastDistributedTime ?  0 : lastDistributedTime - pool.lastRewardTime;

106:                 _tempTimestamp = block.timestamp - pool.lastRewardTime;

109:             uint256 reward = time * (rewardPerSecond);

110:             accRewardPerShare = accRewardPerShare + ( reward * (ACC_TOKEN_PRECISION) / lpSupply );

113:         pending =  (user.amount * (accRewardPerShare) / ACC_TOKEN_PRECISION)  - (user.rewardDebt);

131:             uint256 timeLeft = lastDistributedTime - (block.timestamp);

132:             notDistributed = rewardPerSecond * (timeLeft);

136:         amount = amount + (notDistributed);

137:         uint256 _rewardPerSecond = amount / (distributePeriod);

141:         lastDistributedTime = block.timestamp + (distributePeriod);

157:                     _tempTimestamp = pool.lastRewardTime > lastDistributedTime ?  0 : lastDistributedTime - (pool.lastRewardTime);

159:                     _tempTimestamp = block.timestamp - (pool.lastRewardTime);

163:                 uint256 reward = time * (rewardPerSecond);

164:                 pool.accRewardPerShare = pool.accRewardPerShare + ( reward * (ACC_TOKEN_PRECISION) / (lpSupply) );

183:             uint timeleft = lastDistributedTime - block.timestamp;

184:             uint notDistributed = rewardPerSecond * timeleft;

186:             rewardPerSecond = (notDistributed - amount) / timeleft;

```

```solidity
File: ./contracts/GaugeManager.sol

4: import './libraries/Math.sol';

5: import './interfaces/IVoter.sol';

6: import './interfaces/ITokenHandler.sol';

7: import './interfaces/IERC20.sol';

8: import './interfaces/IPairInfo.sol';

9: import './interfaces/IPairFactory.sol';

10: import './interfaces/IVotingEscrow.sol';

11: import './interfaces/IPermissionsRegistry.sol';

12: import './interfaces/IGaugeFactoryCL.sol';

13: import './interfaces/IGaugeManager.sol';

14: import './AVM/interfaces/IAutoVotingEscrowManager.sol';

15: import './interfaces/IBribe.sol';

16: import './interfaces/IBribeFactory.sol';

17: import './interfaces/IGauge.sol';

18: import './interfaces/IMinter.sol';

19: import './interfaces/IGaugeCL.sol';

20: import './interfaces/IBribe.sol';

21: import './interfaces/IGaugeFactory.sol';

22: import {VoterFactoryLib} from "./libraries/VoterFactoryLib.sol";

23: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

24: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

25: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

26: import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

27: import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

28: import '@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraPool.sol';

29: import '@cryptoalgebra/integral-core/contracts/interfaces/vault/IAlgebraCommunityVault.sol';

30: import '@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalFarming.sol';

31: import '@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol';

42:     mapping(address => uint256) internal supplyIndex;              // gauge    => index

43:     mapping(address => uint256) public claimable;                  // gauge    => claimable $the

44:     mapping(address => address) public gauges;                  // pool     => gauge

45:     mapping(address => uint256) public gaugesDistributionTimestmap;// gauge    => last Distribution Time

46:     mapping(address => address) public poolForGauge;            // gauge    => pool    

47:     mapping(address => address) public internal_bribes;         // gauge    => internal bribe (only fees)

48:     mapping(address => address) public external_bribes;         // gauge    => external bribe (real bribes)

57:     mapping(address => bool) public isGauge;                    // gauge    => boolean [is a gauge?]

59:     mapping(address => bool) public isAlive;                    // gauge    => boolean [is the gauge alive?]

144:     --------------------------------------------------------------------------------

145:     --------------------------------------------------------------------------------

147:     --------------------------------------------------------------------------------

148:     --------------------------------------------------------------------------------

149:     ----------------------------------------------------------------------------- */

159:         for(i; i < _pool.length; i++){

241:         supplyIndex[_gauge] = index; // new gauges are set to the default global state

272:         for (uint i = 0; i < 20; i++) {

273:             str[2 + i * 2] = alphabet[uint8(value[i] >> 4)];

274:             str[3 + i * 2] = alphabet[uint8(value[i] & 0x0f)];

296:         if(totalWeight > 0) _ratio = amount * 1e18 / Math.max(totalWeight, 1);     // 1e18 adjustment is removed during claim

298:             index += _ratio;

307:         for (i; i < poolsLength; i++) {

314:         for (uint256 x = _start; x < _finish; x++) {

347:         for (x; x < stop; x++) {

354:         for (uint256 x = _start; x < _finish; x++) {

363:         for (uint256 x = 0; x < _gauges.length; x++) {

374:             _updateForAfterDistribution(_gauge); // should set claimable to 0 if killed

396:     --------------------------------------------------------------------------------

397:     --------------------------------------------------------------------------------

399:     --------------------------------------------------------------------------------

400:     --------------------------------------------------------------------------------

401:     ----------------------------------------------------------------------------- */

413:             uint256 _index = index; // get global index0 for accumulated distro

415:             supplyIndex[_gauge] = _index; // update _gauge current position to global position

416:             uint256 _delta = _index - _supplyIndex; // see if there is any difference that need to be accrued

418:                 uint256 _share = _supplied * _delta / 1e18; // add accrued difference for each supplied token

420:                     claimable[_gauge] += _share;

422:                     IERC20Upgradeable(base).safeTransfer(minter, _share); // send rewards back to Minter so they're not stuck in GaugeManager

426:             supplyIndex[_gauge] = index; // new users are set to the default global state

431:     --------------------------------------------------------------------------------

432:     --------------------------------------------------------------------------------

434:     --------------------------------------------------------------------------------

435:     --------------------------------------------------------------------------------

436:     ----------------------------------------------------------------------------- */

507:         for (uint256 i = 0; i < _gauges.length; i++) {

514:         for (uint256 i = 0; i < _nftIds.length; i++) {

522:         for (uint256 i = 0; i < _bribes.length; i++) {

```

```solidity
File: ./contracts/GaugeV2.sol

4: import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

5: import "@openzeppelin/contracts/access/Ownable.sol";

6: import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

7: import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

9: import './interfaces/IPair.sol';

10: import './interfaces/IBribe.sol';

11: import "./libraries/Math.sol";

12: import './interfaces/IGenesisPool.sol';

13: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

98:         rewardToken = IERC20(_rewardToken);     // main reward

99:         VE = _ve;                               // vested

100:         TOKEN = IERC20(_token);                 // underlying (LP)

101:         DISTRIBUTION = _distribution;           // distro address (GaugeManager)

104:         internal_bribe = _internal_bribe;       // lp fees goes here

105:         external_bribe = _external_bribe;       // bribe fees goes here

109:         isForPair = _isForPair;                 // pair boolean, if false no claim_fees

111:         emergency = false;                      // emergency flag

117:     --------------------------------------------------------------------------------

118:     --------------------------------------------------------------------------------

120:     --------------------------------------------------------------------------------

121:     --------------------------------------------------------------------------------

122:     ----------------------------------------------------------------------------- */

160:     --------------------------------------------------------------------------------

161:     --------------------------------------------------------------------------------

163:     --------------------------------------------------------------------------------

164:     --------------------------------------------------------------------------------

165:     ----------------------------------------------------------------------------- */

179:         if(genesisPool != address(0)) balance += IGenesisPool(genesisPool).balanceOf(account);

193:             return rewardPerTokenStored + (lastTimeRewardApplicable() - lastUpdateTime) * rewardRate * 1e18 / _totalSupply; 

199:         return rewards[account] + _balanceOf(account) * (rewardPerToken() - userRewardPerTokenPaid[account]) / 1e18;  

204:         return rewardRate * DURATION;

214:     --------------------------------------------------------------------------------

215:     --------------------------------------------------------------------------------

217:     --------------------------------------------------------------------------------

218:     --------------------------------------------------------------------------------

219:     ----------------------------------------------------------------------------- */

230:         _totalSupply = _totalSupply + _totalAmount;

250:         _balances[account] = _balances[account] + amount;

251:         _totalSupply = _totalSupply + amount;

277:         _totalSupply = _totalSupply - amount;

293:         _totalSupply = _totalSupply - _amount;

305:         _totalSupply = _totalSupply - _amount;

318:         uint256 gaugeDeduction =  _amount - genesisDeduction;

320:         _balances[msg.sender] = _balances[msg.sender] - gaugeDeduction;

369:     --------------------------------------------------------------------------------

370:     --------------------------------------------------------------------------------

372:     --------------------------------------------------------------------------------

373:     --------------------------------------------------------------------------------

374:     ----------------------------------------------------------------------------- */

387:             rewardRate = reward / DURATION;

389:             uint256 remaining = _periodFinish - block.timestamp;

390:             uint256 leftover = remaining * rewardRate;

391:             rewardRate = (reward + leftover) / DURATION;

399:         require(rewardRate <= balance / DURATION, "REWARD_HIGH");

402:         _periodFinish = block.timestamp + DURATION;

```

```solidity
File: ./contracts/GenesisPool.sol

4: import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

5: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

6: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

8: import "./interfaces/IGenesisPool.sol";

9: import "./interfaces/IGenesisPoolBase.sol";

10: import "./interfaces/ITokenHandler.sol";

11: import "./interfaces/IAuction.sol";

12: import "./interfaces/IBribe.sol";

13: import "./interfaces/IRouter.sol";

14: import "./interfaces/IGauge.sol";

102:         for(i = 0; i < _incentivesCnt; i++){

110:                 incentives[_token] += _amount;

135:         uint256 _fundingLeft = allocationInfo.proposedFundingAmount - allocationInfo.allocatedFundingAmount;

136:         uint256 _maxFundingLeft = _getFundingTokenAmount(allocationInfo.proposedNativeAmount - allocationInfo.allocatedNativeAmount);

147:         userDeposits[spender] = userDeposits[spender] + _amount;

148:         totalDeposits += _amount;

151:         allocationInfo.allocatedFundingAmount += _amount;

164:         uint _endTime = genesisInfo.startTime + genesisInfo.duration;

165:         uint256 targetNativeAmount = (allocationInfo.proposedNativeAmount * genesisInfo.threshold) / 10000; // threshold is 100 * of original to support 2 deciamls

175:         uint256 _endTime = genesisInfo.startTime + genesisInfo.duration;    

176:         uint256 targetNativeAmount = (allocationInfo.proposedNativeAmount * genesisInfo.threshold) / 10000; // threshold is 100 * of original to support 2 deciamls

189:         for(i = 0; i < _incentivesCnt; i++){

207:             allocationInfo.refundableNativeAmount = allocationInfo.proposedNativeAmount - allocationInfo.allocatedNativeAmount;

225:         (, , uint _liquidity) = IRouter(_router).addLiquidity(genesisInfo.nativeToken, genesisInfo.fundingToken, genesisInfo.stable, nativeDesired, fundingDesired, 0, 0, address(this), block.timestamp + 100);

228:         IGauge(liquidityPoolInfo.gaugeAddress).depositsForGenesis(genesisInfo.tokenOwner, block.timestamp + maturityTime, liquidity);

301:             for(i = 0; i < incentivesCnt; i++){

315:         for(i = 0; i < _incentivesCnt; i++){

324:         uint256 _depositerLiquidity = liquidity / 2;

325:         uint256 balance = (_depositerLiquidity * userDeposits[account]) / totalDeposits;

326:         if(account == genesisInfo.tokenOwner) balance += (liquidity - _depositerLiquidity - tokenOwnerUnstaked);

331:         uint256 _depositerLiquidity = liquidity / 2;

332:         uint256 userAmount = (totalDeposits * gaugeTokenAmount) / _depositerLiquidity; 

335:             uint256 pendingOwnerStaked = liquidity - _depositerLiquidity - tokenOwnerUnstaked;

338:                 tokenOwnerUnstaked += gaugeTokenAmount;

341:                 tokenOwnerUnstaked = liquidity - _depositerLiquidity;

342:                 userAmount -= (totalDeposits * pendingOwnerStaked) / _depositerLiquidity;

345:         userDeposits[account] -= userAmount;

349:         uint256 _depositerLiquidity = liquidity / 2;

350:         if(account == genesisInfo.tokenOwner) tokenOwnerUnstaked = liquidity - _depositerLiquidity;

381:         for(i = 0; i < incentivesCnt; i++){

407:         require(_startTime + genesisInfo.duration - BlackTimeLibrary.NO_GENESIS_DEPOSIT_WINDOW > block.timestamp, "TIME");

```

```solidity
File: ./contracts/GenesisPoolManager.sol

4: import "@openzeppelin/contracts/access/Ownable.sol";

5: import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

7: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

9: import "./interfaces/IGenesisPoolManager.sol";

10: import "./interfaces/IGaugeManager.sol";

11: import "./interfaces/IGenesisPoolBase.sol";

12: import "./interfaces/IGauge.sol";

14: import "./interfaces/ITokenHandler.sol";

15: import "./interfaces/IPermissionsRegistry.sol";

16: import "./interfaces/IGenesisPoolFactory.sol";

17: import './interfaces/IGenesisPool.sol';

18: import './interfaces/IAuctionFactory.sol';

19: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

47:     uint public pre_epoch_period; // 2 : 30 of every thursday

83:         MIN_DURATION = 2 * BlackTimeLibrary.WEEK;

84:         MIN_THRESHOLD = 50 * 10 ** 2; 

92:         return block.timestamp >= _period + WEEK;

154:         require(genesisInfo.startTime + genesisInfo.duration - BlackTimeLibrary.NO_GENESIS_DEPOSIT_WINDOW > block.timestamp, "TIME");

166:         liveNativeTokensIndex[nativeToken] = liveNativeTokens.length; // becuase default valie is 0, so starting with 1

196:         for(i = _proposedTokensCnt; i > 0; i--){

197:             nativeToken = liveNativeTokens[i-1];

231:         if (block.timestamp >= _period + WEEK) { 

239:             for(i = _proposedTokensCnt; i > 0; i--){

240:                 nativeToken = liveNativeTokens[i-1];

262:             address replacingAddress = liveNativeTokens[length - 1];

263:             liveNativeTokens[index - 1] = replacingAddress;

```

```solidity
File: ./contracts/GlobalRouter.sol

4: import "@openzeppelin/contracts/utils/math/SafeMath.sol";

5: import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

6: import "@openzeppelin/contracts/access/Ownable.sol";

7: import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

8: import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

67:             uint x = y / 2 + 1;

70:                 x = (y / x + x) / 2;

77:         require((z = x - y) <= x, 'Math: Sub-underflow');

178:         for (uint i = 0; i < routes.length; i++) {

180:             uint amountOut = amounts[i + 1];

182:             address to = i < routes.length - 1 ? tradeHelper.pairFor(routes[i+1].from, routes[i+1].to, routes[i+1].stable) : _to;

196:         require(amounts[amounts.length - 1] >= amountOutMin, 'BaseV1Router: INSUFFICIENT_OUTPUT_AMOUNT');

210:         address payer = msg.sender; // msg.sender pays for the first hop

218:                 hasMultiplePools ? address(this) : params.recipient, // for intermediate swaps, this contract custodies

221:                     path: params.path.getFirstPool(), // only the first pool in the path is necessary

228:                 payer = address(this); // at this point, the caller has paid

236:         require(amountOut >= params.amountOutMinimum, 'Too little received');*/

246:     -------------------------------

248:     -------------------------------

249:     ---------------------------- */

275:     -------------------------------

277:     -------------------------------

278:     ---------------------------- */

```

```solidity
File: ./contracts/MinterUpgradeable.sol

4: import "./libraries/Math.sol";

5: import "./interfaces/IMinter.sol";

6: import "./interfaces/IRewardsDistributor.sol";

7: import "./interfaces/IBlack.sol";

8: import "./interfaces/IGaugeManager.sol";

9: import "./interfaces/IVotingEscrow.sol";

11: import { IBlackGovernor } from "./interfaces/IBlackGovernor.sol";

13: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

14: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

23:     uint public teamRate;  //EMISSION that goes to protocol

24:     uint public constant MAX_TEAM_RATE = 500; // 5%

25:     uint256 public constant TAIL_START = 8_969_150 * 1e18; //TAIL EMISSIONS 

27:     uint256 public constant NUDGE = 1; //delta added in tail emissions rate after voting

28:     uint256 public constant MAXIMUM_TAIL_RATE = 100; //maximum tail emissions rate after voting

29:     uint256 public constant MINIMUM_TAIL_RATE = 1; //maximum tail emissions rate after voting

31:     uint256 public constant WEEKLY_DECAY = 9_900; //for epoch 15 to 66 growth

32:     uint256 public constant WEEKLY_GROWTH = 10_300; //for epoch 1 to 14 growth

33:     uint256 public constant PROPOSAL_INCREASE = 10_100; // 1% increment after the 67th epoch based on proposal

34:     uint256 public constant PROPOSAL_DECREASE = 9_900; // 1% increment after the 67th epoch based on proposal

36:     uint public WEEK; // allows minting once per week (reset every Thursday 00:00 UTC)

37:     uint public weekly; // represents a starting weekly emission of 2.6M BLACK (BLACK has 18 decimals)

59:         address __gaugeManager, // distribution system

60:         address __ve, // the ve(3,3) system that will be locked into

61:         address __rewards_distributor // the distribution system that ensures users aren't diluted

68:         teamRate = 500; // 500 bps = 5%

76:         active_period = ((block.timestamp + (2 * WEEK)) / WEEK) * WEEK;

77:         weekly = 10_000_000 * 1e18; // represents a starting weekly emission of 10M BLACK (BLACK has 18 decimals)

86:         uint max // sum amounts / max = % ownership of top protocols, so if initial 20m is distributed, and target is 25% protocol ownership, then max - 4 x 20m = 80m

92:             for (uint i = 0; i < claimants.length; i++) {

98:         active_period = ((block.timestamp) / WEEK) * WEEK; // allow minter.update_period() to mint new emissions THIS Thursday

130:         uint veBlackSupply = _veTotal + _smNFTBalance +_superMassiveBonus;

131:         uint blackSupply = _blackTotal + _superMassiveBonus;

132:         uint circulatingBlack = blackSupply - veBlackSupply;

134:         uint256 rebaseAmount = ((_weeklyMint * circulatingBlack) / blackSupply) * (circulatingBlack) / (2 * blackSupply);

161:         if (block.timestamp >= _period + WEEK && _initializer == address(0)) { // only trigger if new week

162:             epochCount++;

163:             _period = (block.timestamp / WEEK) * WEEK;

170:                 _emission = (_weekly * tailEmissionRate) / MAX_BPS;

175:                     _weekly = (_weekly * WEEKLY_GROWTH) / MAX_BPS;

177:                     _weekly = (_weekly * WEEKLY_DECAY) / MAX_BPS;

186:             uint _teamEmissions = _emission * teamRate / MAX_BPS;

188:             uint _gauge = _emission - _rebase - _teamEmissions;

192:                 _black.mint(address(this), _emission - _balanceOf);

198:             _rewards_distributor.checkpoint_token(); // checkpoint token balance that was just minted in rewards distributor

209:         return _black.totalSupply() - _black.balanceOf(address(_ve)) - _black.balanceOf(address(burnTokenAddress));

214:         return (block.timestamp >= _period + WEEK && _initializer == address(0));

218:         return(block.timestamp / WEEK) * WEEK;

```

```solidity
File: ./contracts/Pair.sol

4: import './libraries/Math.sol';

5: import './interfaces/IERC20.sol';

6: import './interfaces/IPair.sol';

7: import './interfaces/IDibs.sol';

8: import './interfaces/IPairCallee.sol';

9: import './factories/PairFactory.sol';

10: import './PairFees.sol';

33:     uint internal constant MINIMUM_LIQUIDITY = 10**3;

97:             name = string(abi.encodePacked("StableV1 AMM - ", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

98:             symbol = string(abi.encodePacked("sAMM-", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

100:             name = string(abi.encodePacked("VolatileV1 AMM - ", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

101:             symbol = string(abi.encodePacked("vAMM-", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

104:         decimals0 = 10**IERC20(_token0).decimals();

105:         decimals1 = 10**IERC20(_token1).decimals();

124:         return observations[observations.length-1];

166:         uint256 _referralFee = (_dibs != address(0)) ? (amount * _maxRef / 10000) : 0;

168:             _safeTransfer(token0, _dibs, _referralFee); // Transfer referral fees

169:             amount -= _referralFee;

172:         uint256 _stakingNftFee =  amount * PairFactory(factory).stakingNFTFee() / 10000;

174:         _safeTransfer(token0, fees, amount); // transfer the fees out to PairFees

178:         amount -= _stakingNftFee;

179:         uint256 _ratio = amount * 1e18 / totalSupply; // 1e18 adjustment is removed during claim

181:             index0 += _ratio;

183:         emit Fees(msg.sender, amount+_stakingNftFee+_referralFee, 0);

191:         uint256 _referralFee = (_dibs != address(0)) ? (amount * _maxRef / 10000) : 0;

193:              _safeTransfer(token1, _dibs, _referralFee); // transfer the fees out to PairFees

194:             amount -= _referralFee;

197:         uint256 _stakingNftFee =  amount * PairFactory(factory).stakingNFTFee() / 10000;

199:         _safeTransfer(token1, fees, amount); // transfer the fees out to PairFees

202:         amount -= _stakingNftFee;

204:         uint256 _ratio = amount * 1e18 / totalSupply;

207:             index1 += _ratio;

210:         emit Fees(msg.sender, 0,  amount+_stakingNftFee+_referralFee);

216:         uint _supplied = balanceOf[recipient]; // get LP balance of `recipient`

218:             uint _supplyIndex0 = supplyIndex0[recipient]; // get last adjusted index0 for recipient

220:             uint _index0 = index0; // get global index0 for accumulated fees

222:             supplyIndex0[recipient] = _index0; // update user current position to global position

224:             uint _delta0 = _index0 - _supplyIndex0; // see if there is any difference that need to be accrued

225:             uint _delta1 = _index1 - _supplyIndex1;

227:                 uint _share = _supplied * _delta0 / 1e18; // add accrued difference for each supplied token

228:                 claimable0[recipient] += _share;

231:                 uint _share = _supplied * _delta1 / 1e18;

232:                 claimable1[recipient] += _share;

235:             supplyIndex0[recipient] = index0; // new users are set to the default global state

249:         uint timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired

251:             reserve0CumulativeLast += _reserve0 * timeElapsed;

252:             reserve1CumulativeLast += _reserve1 * timeElapsed;

256:         timeElapsed = blockTimestamp - _point.timestamp; // compare the last observation with current timestamp, if greater than 30 minutes, record a new event

276:             uint timeElapsed = blockTimestamp - _blockTimestampLast;

277:             reserve0Cumulative += _reserve0 * timeElapsed;

278:             reserve1Cumulative += _reserve1 * timeElapsed;

287:             _observation = observations[observations.length-2];

290:         uint timeElapsed = block.timestamp - _observation.timestamp;

291:         uint _reserve0 = (reserve0Cumulative - _observation.reserve0Cumulative) / timeElapsed;

292:         uint _reserve1 = (reserve1Cumulative - _observation.reserve1Cumulative) / timeElapsed;

300:         for (uint i = 0; i < _prices.length; i++) {

301:             priceAverageCumulative += _prices[i];

303:         return priceAverageCumulative / granularity;

314:         uint length = observations.length-1;

315:         uint i = length - (points * window);

319:         for (; i < length; i+=window) {

320:             nextIndex = i + window;

321:             uint timeElapsed = observations[nextIndex].timestamp - observations[i].timestamp;

322:             uint _reserve0 = (observations[nextIndex].reserve0Cumulative - observations[i].reserve0Cumulative) / timeElapsed;

323:             uint _reserve1 = (observations[nextIndex].reserve1Cumulative - observations[i].reserve1Cumulative) / timeElapsed;

327:                 index = index + 1;

339:         uint _amount0 = _balance0 - _reserve0;

340:         uint _amount1 = _balance1 - _reserve1;

342:         uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee

344:             liquidity = Math.sqrt(_amount0 * _amount1) - MINIMUM_LIQUIDITY;

345:             _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens

347:             liquidity = Math.min(_amount0 * _totalSupply / _reserve0, _amount1 * _totalSupply / _reserve1);

349:         require(liquidity > 0, 'ILM'); // Pair: INSUFFICIENT_LIQUIDITY_MINTED

365:         uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee

366:         amount0 = _liquidity * _balance0 / _totalSupply; // using balances ensures pro-rata distribution

367:         amount1 = _liquidity * _balance1 / _totalSupply; // using balances ensures pro-rata distribution

368:         require(amount0 > 0 && amount1 > 0, 'ILB'); // Pair: INSUFFICIENT_LIQUIDITY_BURNED

382:         require(amount0Out > 0 || amount1Out > 0, 'IOA'); // Pair: INSUFFICIENT_OUTPUT_AMOUNT

384:         require(amount0Out < _reserve0 && amount1Out < _reserve1, 'IL'); // Pair: INSUFFICIENT_LIQUIDITY

388:         { // scope for _token{0,1}, avoids stack too deep errors

390:         require(to != _token0 && to != _token1, 'IT'); // Pair: INVALID_TO

391:         if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens

392:         if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens

393:         if (data.length > 0) IPairCallee(to).hook(msg.sender, amount0Out, amount1Out, data); // callback, used for flash loans

398:         uint amount0In = _balance0 > _reserve0 - amount0Out ? _balance0 - (_reserve0 - amount0Out) : 0;

399:         uint amount1In = _balance1 > _reserve1 - amount1Out ? _balance1 - (_reserve1 - amount1Out) : 0;

400:         require(amount0In > 0 || amount1In > 0, 'IIA'); // Pair: INSUFFICIENT_INPUT_AMOUNT

402:         { // scope for reserve{0,1}Adjusted, avoids stack too deep errors

404:         if (amount0In > 0) _update0(amount0In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token0 and move them out of pool

405:         if (amount1In > 0) _update1(amount1In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token1 and move them out of pool

406:         _balance0 = IERC20(_token0).balanceOf(address(this)); // since we removed tokens, we need to reconfirm balances, can also simply use previous balance - amountIn/ 10000, but doing balanceOf again as safety check

409:         require(_k(_balance0, _balance1) >= _k(_reserve0, _reserve1), 'K'); // Pair: K

419:         _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)) - (reserve0));

420:         _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)) - (reserve1));

429:         return x0*(y*y/1e18*y/1e18)/1e18+(x0*x0/1e18*x0/1e18)*y/1e18;

433:         return 3*x0*(y*y/1e18)/1e18+(x0*x0/1e18*x0/1e18);

437:         for (uint i = 0; i < 255; i++) {

441:                 uint dy = (xy - k)*1e18/_d(x0, y);

442:                 y = y + dy;

444:                 uint dy = (k - xy)*1e18/_d(x0, y);

445:                 y = y - dy;

448:                 if (y - y_prev <= 1) {

452:                 if (y_prev - y <= 1) {

462:         amountIn -= amountIn * PairFactory(factory).getFee(address(this), stable) / 10000; // remove fee from amount received

469:             _reserve0 = _reserve0 * 1e18 / decimals0;

470:             _reserve1 = _reserve1 * 1e18 / decimals1;

472:             amountIn = tokenIn == token0 ? amountIn * 1e18 / decimals0 : amountIn * 1e18 / decimals1;

473:             uint y = reserveB - _get_y(amountIn+reserveA, xy, reserveB);

474:             return y * (tokenIn == token0 ? decimals1 : decimals0) / 1e18;

477:             return amountIn * reserveB / (reserveA + amountIn);

483:             uint _x = x * 1e18 / decimals0;

484:             uint _y = y * 1e18 / decimals1;

485:             uint _a = (_x * _y) / 1e18;

486:             uint _b = ((_x * _x) / 1e18 + (_y * _y) / 1e18);

487:             return _a * _b / 1e18;  // x3y+y3x >= k

489:             return x * y; // xy >= k

494:         _updateFor(dst); // balances must be updated on mint/burn/transfer

495:         totalSupply += amount;

496:         balanceOf[dst] += amount;

502:         totalSupply -= amount;

503:         balanceOf[dst] -= amount;

529:                 keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))

549:             uint newAllowance = spenderAllowance - amount;

560:         _updateFor(src); // update fee position for src

561:         _updateFor(dst); // update fee position for dst

563:         balanceOf[src] -= amount;

564:         balanceOf[dst] += amount;

```

```solidity
File: ./contracts/PairFees.sol

4: import './interfaces/IERC20.sol';

9:     address internal immutable pair; // The pair it is bonded to

10:     address internal immutable token0; // token0 of pair, saved localy and statically for gas optimization

11:     address internal immutable token1; // Token1 of pair, saved localy and statically for gas optimization

40:             toStake0 += amount;

44:             toStake1 += amount;

```

```solidity
File: ./contracts/PairGenerator.sol

4: import './Pair.sol';

5: import './interfaces/IPairGenerator.sol';

19:         bytes32 salt = keccak256(abi.encodePacked(token0, token1, stable)); // notice salt includes stable as well, 3 parameters

```

```solidity
File: ./contracts/PermissionsRegistry.sol

76:     --------------------------------------------------------------------------------

78:     --------------------------------------------------------------------------------

79:     ----------------------------------------------------------------------------- */

97:         for(uint i = 0; i < _roles.length; i++){

99:                 _roles[i] = _roles[_roles.length -1];

108:         for(uint i = 0; i < rta.length; i++){

111:             for(uint k = 0; k < __roles.length; k++){

113:                     _addressToRoles[rta[i]][k] = _roles[_roles.length -1];

148:         for(uint i = 0; i < rta.length; i++){

150:                 rta[i] = rta[rta.length -1];

156:         for(uint i = 0; i < atr.length; i++){

158:                 atr[i] = atr[atr.length -1];

178:         for(uint i = 0; i < _roles.length; i++){

203:         for(i; i < _temp.length; i++){

227:     --------------------------------------------------------------------------------

229:     --------------------------------------------------------------------------------

230:     ----------------------------------------------------------------------------- */

```

```solidity
File: ./contracts/RewardsDistributor.sol

4: import './libraries/Math.sol';

5: import './interfaces/IERC20.sol';

6: import './interfaces/IRewardsDistributor.sol';

7: import './AVM/interfaces/IAutoVotingEscrowManager.sol';

8: import './interfaces/IVotingEscrow.sol';

9: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

53:         uint _t = block.timestamp / WEEK * WEEK;

60:         depositor = msg.sender; //0x86069feb223ee303085a1a505892c9d4bdbee996

71:         return block.timestamp / WEEK * WEEK;

76:         uint to_distribute = token_balance - token_last_balance;

80:         uint since_last = block.timestamp - t;

82:         uint this_week = t / WEEK * WEEK;

85:         for (uint i = 0; i < 20; i++) {

86:             next_week = this_week + WEEK;

89:                     tokens_per_week[this_week] += to_distribute;

91:                     tokens_per_week[this_week] += to_distribute * (block.timestamp - t) / since_last;

96:                     tokens_per_week[this_week] += to_distribute;

98:                     tokens_per_week[this_week] += to_distribute * (next_week - t) / since_last;

115:         for (uint i = 0; i < 128; i++) {

117:             uint _mid = (_min + _max + 2) / 2;

122:                 _max = _mid -1;

139:             week_cursor = user_point.ts / WEEK * WEEK;

147:         for (uint i = 0; i < 50; i++) {

149:             uint balance_of = IVotingEscrow(ve).balanceOfNFTAt(_tokenId, week_cursor + WEEK - 1);

150:             supply = IVotingEscrow(ve).totalSupplyAtT(week_cursor + WEEK - 1);

152:             to_distribute += balance_of * tokens_per_week[week_cursor] / supply;

153:             week_cursor += WEEK;

173:             week_cursor = user_point.ts / WEEK * WEEK;

180:         for (uint i = 0; i < 50; i++) {

182:             uint balance_of = IVotingEscrow(ve).balanceOfNFTAt(_tokenId, week_cursor + WEEK - 1);

183:             supply = IVotingEscrow(ve).totalSupplyAtT(week_cursor + WEEK - 1);

185:             to_distribute += balance_of * tokens_per_week[week_cursor] / supply;

186:             week_cursor += WEEK;

193:         uint _last_token_time = last_token_time / WEEK * WEEK;

199:         _last_token_time = _last_token_time / WEEK * WEEK;

214:             token_last_balance -= amount;

221:         _last_token_time = _last_token_time / WEEK * WEEK;

225:         for (uint i = 0; i < _tokenIds.length; i++) {

238:                 total += amount;

242:             token_last_balance -= total;

```

```solidity
File: ./contracts/RouterV2.sol

13: import './interfaces/IAlgebraCLFactory.sol';

14: import './interfaces/IAlgebraPoolAPIStorage.sol';

16: import '@cryptoalgebra/integral-periphery/contracts/interfaces/IQuoterV2.sol';

17: import '@cryptoalgebra/integral-periphery/contracts/interfaces/ISwapRouter.sol';

19: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

21: import './interfaces/IERC20.sol';

22: import './interfaces/IPair.sol';

67:             uint x = y / 2 + 1;

70:                 x = (y / x + x) / 2;

77:         require((z = x - y) <= x);

121:     uint internal constant MINIMUM_LIQUIDITY = 10**3;

148:         assert(msg.sender == address(wETH)); // only accept ETH via fallback from the WETH contract

153:             uint _x = x * 1e18 / decimals0;

154:             uint _y = y * 1e18 / decimals1;

155:             uint _a = (_x * _y) / 1e18;

156:             uint _b = ((_x * _x) / 1e18 + (_y * _y) / 1e18);

157:             return _a * _b / 1e18;  // x3y+y3x >= k

159:             return x * y; // xy >= k

177:         amountB = amountA * reserveB / reserveA;

247:         pairSwapMetaData.balanceA += (amountIn - (amountIn * IPairFactory(factory).getFee(pair, pairSwapMetaData.stable) / 10000));

248:         pairSwapMetaData.balanceB -= amountOut;

260:         amounts = new uint[](routes.length+1);

265:         for (uint i = 0; i < routes.length; i++) {

276:                 (amounts[i+1], , , , , )

281:                     amounts[i+1] = IBaseV1Pair(routes[i].pair).getAmountOut(amounts[i], routes[i].from);

303:             liquidity = Math.sqrt(amountA * amountB) - MINIMUM_LIQUIDITY;

309:                 liquidity = Math.min(amountA * _totalSupply / reserveA, amountB * _totalSupply / reserveB);

313:                 liquidity = Math.min(amountA * _totalSupply / reserveA, amountB * _totalSupply / reserveB);

334:         amountA = liquidity * reserveA / _totalSupply; // using balances ensures pro-rata distribution

335:         amountB = liquidity * reserveB / _totalSupply; // using balances ensures pro-rata distribution

415:         if (msg.value > amountETH) _safeTransferETH(msg.sender, msg.value - amountETH);

430:         require(IBaseV1Pair(pair).transferFrom(msg.sender, pair, liquidity), "ITFM"); // send liquidity to pair

500:         for (uint i = 0; i < routes.length; i++) {

511:                     deadline: block.timestamp + 600,

517:                 amounts[i+1] = ISwapRouter(swapRouter).exactInputSingle(inputParams);

521:                 uint amountOut = amounts[i + 1];

548:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

571:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

590:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

608:         require(routes[routes.length - 1].to == address(wETH), 'INP');

610:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

625:         wETH.withdraw(amounts[amounts.length - 1]);

626:         _safeTransferETH(to, amounts[amounts.length - 1]);

706:         for (uint i; i < routes.length; i++) {

712:             { // scope to avoid stack too deep errors

719:             address to = i < routes.length - 1 ? pairFor(routes[i+1].from, routes[i+1].to, routes[i+1].stable) : _to;

739:         uint balanceBefore = erc20(routes[routes.length - 1].to).balanceOf(to);

742:             erc20(routes[routes.length - 1].to).balanceOf(to).sub(balanceBefore) >= amountOutMin,

760:         uint balanceBefore = erc20(routes[routes.length - 1].to).balanceOf(to);

763:             erc20(routes[routes.length - 1].to).balanceOf(to).sub(balanceBefore) >= amountOutMin,

778:         require(routes[routes.length - 1].to == address(wETH), 'INP');

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

4: import "./interfaces/IVoter.sol";

5: import "./interfaces/ITopNPoolsStrategy.sol";

6: import "@openzeppelin/contracts/access/Ownable.sol";

7: import {IAutoVotingEscrowManager} from "./AVM/interfaces/IAutoVotingEscrowManager.sol";

51:         for (uint256 i = 0; i < _poolAddresses.length; i++) {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

4: import "./interfaces/IVoteWeightStrategy.sol";

5: import "@openzeppelin/contracts/access/Ownable.sol";

6: import {IAutoVotingEscrowManager} from "./AVM/interfaces/IAutoVotingEscrowManager.sol";

49:         for (uint256 i = 0; i < _weights.length; i++) {

```

```solidity
File: ./contracts/Thenian.sol

4: import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

5: import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

6: import "@openzeppelin/contracts/access/Ownable.sol";

7: import "@openzeppelin/contracts/utils/math/SafeMath.sol";

8: import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

63:         for (uint256 i = 0; i < _amount; i++) {

101:             for (uint256 index; index < tokenCount; index++) {

118:         require(block.timestamp < SALE_START_TIMESTAMP + 1 days, "First round has ended.");

132:         require(block.timestamp >= SALE_START_TIMESTAMP + 1 days, "Second round has not started yet.");

133:         require(block.timestamp < SALE_START_TIMESTAMP + 2 days, "Second round has ended.");

147:         require(block.timestamp >= SALE_START_TIMESTAMP + 2 days, "Public Sale has not started yet.");

148:         require(block.timestamp < SALE_START_TIMESTAMP + 5 days, "Sale is over.");

160:         for (uint256 i = 0; i < amount; i++) {

```

```solidity
File: ./contracts/TokenHandler.sol

4: import './interfaces/ITokenHandler.sol';

5: import './interfaces/IPermissionsRegistry.sol';

12:     mapping(address => uint256) public tokenVolatilityBucket; // Mapping of token to volatility bucket ID

13:     mapping(uint256 => string) public bucketType; // Mapping of token to volatility bucket ID

54:         for(i = 0; i < _tokens.length; i++){

74:         for(i = 0; i < _token.length; i++){

90:         for (i = 0; i < length; i++) {

92:                 whiteListed[i] = whiteListed[length - 1]; 

113:         for(i = 0; i < _tokens.length; i++){

139:         for (i = 0; i < length; i++) {

141:                 connectors[i] = connectors[length - 1]; 

151:         require(bucketId <= volatilityBucketCount + 1);

152:         if(bucketId == volatilityBucketCount + 1) volatilityBucketCount++;

158:         return bucketType[bucketId]; // Retrieve bucket type by ID

163:         tokenVolatilityBucket[_token] = bucketId; // Update the token's volatility bucket

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

4: import {Base64} from "./libraries/Base64.sol";

5: import {IVeArtProxy} from "./interfaces/IVeArtProxy.sol";

7: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

29:             digits++;

30:             temp /= 10;

34:             digits -= 1;

35:             buffer[digits] = bytes1(uint8(48 + uint(value % 10)));

36:             value /= 10;

42:         output = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

43:         output = string(abi.encodePacked(output, "token ", toString(_tokenId), '</text><text x="10" y="40" class="base">'));

44:         output = string(abi.encodePacked(output, "balanceOf ", toString(_balanceOf), '</text><text x="10" y="60" class="base">'));

45:         output = string(abi.encodePacked(output, "locked_end ", toString(_locked_end), '</text><text x="10" y="80" class="base">'));

46:         output = string(abi.encodePacked(output, "isSMNFT ", isSMNFT?"true":"false", '</text><text x="10" y="100" class="base">'));

47:         output = string(abi.encodePacked(output, "value ", toString(_value), '</text></svg>'));

49:         string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "lock #', toString(_tokenId), '", "description": "Black locks, can be used to boost gauge yields, vote on token emission, and receive bribes", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));

50:         output = string(abi.encodePacked('data:application/json;base64,', json));

```

```solidity
File: ./contracts/VoterV3.sol

4: import './libraries/Math.sol';

5: import './interfaces/IBribe.sol';

6: import './interfaces/IERC20.sol';

7: import './interfaces/IPairInfo.sol';

8: import './interfaces/IPairFactory.sol';

9: import './interfaces/IVotingEscrow.sol';

10: import './interfaces/IGaugeManager.sol';

11: import './interfaces/IPermissionsRegistry.sol';

12: import "./AVM/interfaces/IAutoVotingEscrowManager.sol";

13: import './interfaces/ITokenHandler.sol';

14: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

15: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

16: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

17: import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

18: import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

23:     address public _ve;                                         // the ve token that governs these contracts

25:     address internal base;                                      // $the token

26:     address public permissionRegistry;                          // registry to check accesses

27:     address[] public pools;                                     // all pools viable for incentives

35:     mapping(uint256 => mapping(address => uint256)) public votes;  // nft      => pool     => votes

36:     mapping(uint256 => address[]) public poolVote;                 // nft      => pools

42:     mapping(uint256 => uint256) public lastVoted;                     // nft      => timestamp of last vote (this is shifted to thursday of that epoc)

43:     mapping(uint256 => uint256) public lastVotedTimestamp;            // nft      => timestamp of last vote

71:     --------------------------------------------------------------------------------

72:     --------------------------------------------------------------------------------

74:     --------------------------------------------------------------------------------

75:     --------------------------------------------------------------------------------

76:     ----------------------------------------------------------------------------- */

94:     --------------------------------------------------------------------------------

95:     --------------------------------------------------------------------------------

97:     --------------------------------------------------------------------------------

98:     --------------------------------------------------------------------------------

99:     ----------------------------------------------------------------------------- */

129:     --------------------------------------------------------------------------------

130:     --------------------------------------------------------------------------------

132:     --------------------------------------------------------------------------------

133:     --------------------------------------------------------------------------------

134:     ----------------------------------------------------------------------------- */

149:         for (uint256 i = 0; i < _poolVoteCnt; i ++) {

154:                 weights[_pool] -= _votes;

156:                 votes[_tokenId][_pool] -= _votes;

163:                 _totalWeight += _votes;

168:         totalWeight -= _totalWeight;

184:         for (uint256 i = 0; i < _poolCnt; i ++) {

206:         lastVoted[_tokenId] = BlackTimeLibrary.epochStart(block.timestamp) + 1;

217:         for (uint i = 0; i < _poolCnt; i++) {

219:             if(gaugeManager.isGaugeAliveForPool(_poolVote[i])) _totalVoteWeight += _weights[i];

222:         for (uint256 i = 0; i < _poolCnt; i++) {

226:                 uint256 _poolWeight = _weights[i] * _weight / _totalVoteWeight;

232:                 weights[_pool] += _poolWeight;

241:                 _usedWeight += _poolWeight;

246:         totalWeight += _usedWeight;

259:     --------------------------------------------------------------------------------

260:     --------------------------------------------------------------------------------

262:     --------------------------------------------------------------------------------

263:     --------------------------------------------------------------------------------

264:     ----------------------------------------------------------------------------- */

```

```solidity
File: ./contracts/VotingEscrow.sol

4: import {IERC721, IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

5: import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

6: import {IERC20} from "./interfaces/IERC20.sol";

7: import "./interfaces/IBlack.sol";

8: import {IBlackHoleVotes} from "./interfaces/IBlackHoleVotes.sol";

9: import {IVeArtProxy} from "./interfaces/IVeArtProxy.sol";

10: import {IVotingEscrow} from "./interfaces/IVotingEscrow.sol";

11: import {IVoter} from "./interfaces/IVoter.sol";

12: import {IAutomatedVotingManager} from "./interfaces/IAutomatedVotingManager.sol";

13: import {BlackTimeLibrary} from "./libraries/BlackTimeLibrary.sol";

14: import {VotingDelegationLib} from "./libraries/VotingDelegationLib.sol";

15: import {VotingBalanceLogic} from "./libraries/VotingBalanceLogic.sol";

185:                       ERC721 BALANCE/OWNER STORAGE

443:                         INTERNAL MINT/BURN LOGIC

477:         ownerToNFTokenCount[_to] += 1;

502:         uint current_count = _balance(_from) - 1;

537:         ownerToNFTokenCount[_from] -= 1;

564:     mapping(uint => int128) public slope_changes; // time -> signed slope change

621:                 u_new.smNFTBonus = uint(int256(new_locked.amount)) - u_new.smNFT;

630:                 u_old.slope = old_locked.amount / iMAXTIME;

631:                 u_old.bias = u_old.slope * int128(int256(old_locked.end - block.timestamp));

634:                 u_new.slope = new_locked.amount / iMAXTIME;

635:                 u_new.bias = u_new.slope * int128(int256(new_locked.end - block.timestamp));

660:         uint block_slope = 0; // dblock/dt

662:             block_slope = (MULTIPLIER * (block.number - last_point.blk)) / (block.timestamp - last_point.ts);

669:             uint t_i = (last_checkpoint / WEEK) * WEEK;

670:             for (uint i = 0; i < 255; ++i) {

673:                 t_i += WEEK;

680:                 last_point.bias -= last_point.slope * int128(int256(t_i - last_checkpoint));

681:                 last_point.slope += d_slope;

692:                 last_point.blk = initial_last_point.blk + (block_slope * (t_i - initial_last_point.ts)) / MULTIPLIER;

693:                 _epoch += 1;

709:             last_point.slope += (u_new.slope - u_old.slope);

710:             last_point.bias += (u_new.bias - u_old.bias);

731:                 old_dslope += u_old.slope;

733:                     old_dslope -= u_new.slope; // It was a new deposit, not extension

740:                     new_dslope -= u_new.slope; // old slope disappeared at this point

746:             uint user_epoch = votingBalanceLogicData.user_point_epoch[_tokenId] + 1;

771:         supply = supply_before + _value;

776:             _locked.amount += int128(int256(_value + calculate_sm_nft_bonus(_value)));

778:             _locked.amount += int128(int256(_value));

803:         emit Supply(supply_before, supply_before + _value);

819:         require(_value > 0, "ZV"); // dev: need non-zero value

823:         if (_locked.isSMNFT) smNFTBalance += _value;

824:         else if (_locked.isPermanent) permanentLockBalance += _value;

838:         uint unlock_time = (block.timestamp + _lock_duration) / WEEK * WEEK; // Locktime is rounded down to weeks

840:         require(_value > 0, "ZV"); // dev: need non-zero value

841:         require(unlock_time > block.timestamp && (unlock_time <= block.timestamp + MAXTIME), 'IUT');

843:         ++tokenId;

853:             smNFTBalance += _value;

882:         assert(_value > 0); // dev: need non-zero value

886:         if (_locked.isSMNFT) smNFTBalance += _value;

887:         else if (_locked.isPermanent) permanentLockBalance += _value;

904:         uint unlock_time = (block.timestamp + _lock_duration) / WEEK * WEEK; // Locktime is rounded down to weeks

907:         require((isSMNFT || unlock_time > _locked.end) && (unlock_time <= block.timestamp + MAXTIME), 'IUT'); // IUT -> invalid unlock time

926:         smNFTBalance += _amount;

929:         _locked.amount = int128(int256(_value + calculate_sm_nft_bonus(_value)));

949:         supply = supply_before - value;

962:         emit Supply(supply_before, supply_before - value);

975:         permanentLockBalance += _amount;

995:         permanentLockBalance -= _amount;

996:         _newLocked.end = ((block.timestamp + MAXTIME) / WEEK) * WEEK;

1076:         attachments[_tokenId] = attachments[_tokenId] + 1;

1081:         attachments[_tokenId] = attachments[_tokenId] - 1;

1109:                 newLockedTo.amount = _locked1.amount + _locked0.amount + int128(int256(calculate_sm_nft_bonus(value0)));

1110:                 smNFTBalance += value0;

1114:                 newLockedTo.amount = _locked1.amount + _locked0.amount;

1117:             newLockedTo.amount = _locked1.amount + _locked0.amount;

1118:             if (!_locked0.isPermanent) {  // Only add if source wasn't already permanent

1119:                 permanentLockBalance += value0;

1122:             newLockedTo.amount = _locked1.amount + _locked0.amount;

1160:             int128(int256(_amount + calculate_sm_nft_bonus(_amount))) : 

1170:         newLocked.amount -= _splitAmount;

1189:         _tokenId = ++tokenId;

1236:         uint[] storage _tokenIds = cpData.checkpoints[account][nCheckpoints - 1].tokenIds;

1238:         for (uint i = 0; i < _tokenIds.length; i++) {

1240:             votes = votes + VotingBalanceLogic.balanceOfNFT(tId, block.timestamp, votingBalanceLogicData);

1254:         for (uint i = 0; i < _tokenIds.length; i++) {

1257:             votes = votes + VotingBalanceLogic.balanceOfNFT(tId, timestamp,  votingBalanceLogicData);

1272:         for (uint i = 0; i < _tokenIds.length; i++) {

1276:             votes = votes + VotingBalanceLogic.balanceOfNFT(tId, timestamp, votingBalanceLogicData);

1348:             nonce == nonces[signatory]++,

1365:         return (SMNFT_BONUS * amount) / PRECISISON;

1369:         return (amount * PRECISISON) / (SMNFT_BONUS + PRECISISON);

```

```solidity
File: ./contracts/WAVAX.sol

27:         balanceOf[msg.sender] += msg.value;

35:         balanceOf[msg.sender] -= wad;

69:                 allowance[from][msg.sender] = allowed - value;

73:         balanceOf[from] -= value;

74:         balanceOf[to]   += value;

```

```solidity
File: ./contracts/chainlink/AutomationCompatible.sol

4: import "./AutomationBase.sol";

5: import "./AutomationCompatibleInterface.sol";

```

```solidity
File: ./contracts/chainlink/EpochController.sol

4: import "../chainlink/AutomationCompatibleInterface.sol";

5: import "../interfaces/IMinter.sol";

6: import "../interfaces/IGaugeManager.sol";

7: import "../interfaces/IGenesisPoolManager.sol";

8: import "../interfaces/IPermissionsRegistry.sol";

9: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

10: import "@openzeppelin/contracts/utils/Strings.sol";

33:     function checkUpkeep(bytes memory /*checkdata*/) public view override returns (bool upkeepNeeded, bytes memory /*performData*/) {

38:     function checkUpPrekeep(bytes memory /*checkdata*/) public view override returns (bool preUpkeepNeeded, bytes memory /*performData*/) {

43:     function performUpkeep(bytes calldata /*performData*/) external override {

56:     function performPreUpkeep(bytes calldata /*performData*/) external override {

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

5: import '../interfaces/IAuctionFactory.sol';

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

4: import "../Bribes.sol";

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

7: import '../interfaces/IPermissionsRegistry.sol';

38:         __Ownable_init();   //after deploy ownership to multisig

48:         defaultRewardToken.push(address(0x68b8220c62513493777563943037Ea919ba0b24C)); // BLACK address

71:     --------------------------------------------------------------------------------

72:     --------------------------------------------------------------------------------

74:     --------------------------------------------------------------------------------

75:     --------------------------------------------------------------------------------

76:     ----------------------------------------------------------------------------- */

113:         for(i; i < defaultRewardToken.length; i++){

115:                 defaultRewardToken[i] = defaultRewardToken[defaultRewardToken.length -1];

123:     --------------------------------------------------------------------------------

124:     --------------------------------------------------------------------------------

126:     --------------------------------------------------------------------------------

127:     --------------------------------------------------------------------------------

128:     ----------------------------------------------------------------------------- */

138:         for ( i ; i < _token.length; i++){

146:         for ( i ; i < __bribes.length; i++){

156:         for ( i ; i < __bribes.length; i++){

158:             for(k = 0; k < _token.length; k++){

168:         for(i; i< _bribe.length; i++){

176:         for(i; i<_bribe.length; i++){

184:         for(i; i< _bribe.length; i++){

192:         for(i; i< _bribe.length; i++){

203:         for(i; i< _bribe.length; i++){

214:         for(i; i< _bribe.length; i++){

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

5: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

6: import '../interfaces/IPermissionsRegistry.sol';

7: import '../interfaces/IGaugeFactory.sol';

8: import '../GaugeV2.sol';

31:         __Ownable_init();   //after deploy ownership to multisig

69:         for ( i ; i < _gauges.length; i++){

76:         for ( i ; i < _gauges.length; i++){

84:         for ( i ; i < _gauges.length; i++){

92:         for ( i ; i < _gauges.length; i++){

99:         for ( i ; i < _gauges.length; i++){

108:         for ( i ; i < _gauges.length; i++){

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

5: import '../interfaces/IGenesisPoolFactory.sol';

6: import '../GenesisPool.sol';

7: import '../interfaces/IGenesisPool.sol';

8: import '../interfaces/ITokenHandler.sol';

47:         for (i = 0; i < length; i++) {

80:         if(IGenesisPool(pools[length - 1]).poolStatus() != IGenesisPoolBase.PoolStatus.NOT_QUALIFIED)

82:             return pools[length - 1];

```

```solidity
File: ./contracts/factories/PairFactory.sol

4: import '../interfaces/IPairFactory.sol';

5: import '../interfaces/IPair.sol';

6: import '../interfaces/IPairGenerator.sol';

8: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

17:     uint256 public MAX_REFERRAL_FEE; // 12%

18:     uint256 public constant MAX_FEE = 25; // 0.25%

22:     address public dibs; // referral fee handler

23:     address public stakingFeeHandler; // staking fee handler

47:         stableFee = 4; // 0.04%

48:         volatileFee = 18; // 0.18%

49:         stakingNFTFee = 0; // 0% of stable/volatileFee, we can change it later if needed

50:         MAX_REFERRAL_FEE = 0; // 0%

140:         require(tokenA != tokenB, "IA"); // Pair: IDENTICAL_ADDRESSES

142:         require(token0 != address(0), "ZA"); // Pair: ZERO_ADDRESS

146:         getPair[tokenB][tokenA][stable] = pair; // Store in reverse direction

```

```solidity
File: ./contracts/governance/Governor.sol

4: import "@openzeppelin/contracts/utils/math/SafeCast.sol";

5: import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

6: import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

7: import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

8: import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

9: import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

10: import "@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol";

11: import "@openzeppelin/contracts/utils/Address.sol";

12: import "@openzeppelin/contracts/utils/Context.sol";

13: import "@openzeppelin/contracts/utils/Timers.sol";

14: import "@openzeppelin/contracts/governance/IGovernor.sol";

15: import {IBlackHoleVotes} from "../interfaces/IBlackHoleVotes.sol";

16: import {BlackTimeLibrary} from "../libraries/BlackTimeLibrary.sol";

269:             getVotes(_msgSender(), block.number - 1) >= proposalThreshold(),

281:         uint64 start = block.timestamp.toUint64() + votingDelay().toUint64();

282:         uint64 deadline = start + votingPeriod().toUint64();

336:         uint256, /* proposalId */

340:         bytes32 /*descriptionHash*/

343:         for (uint256 i = 0; i < targets.length; ++i) {

353:         uint256, /* proposalId */

355:         uint256[] memory, /* values */

357:         bytes32 /*descriptionHash*/

360:             for (uint256 i = 0; i < targets.length; ++i) {

372:         uint256, /* proposalId */

373:         address[] memory, /* targets */

374:         uint256[] memory, /* values */

375:         bytes[] memory, /* calldatas */

376:         bytes32 /*descriptionHash*/

683:         return quorum(proposalSnapshot(proposalId)) <= proposalvote.forVotes + proposalvote.abstainVotes;

708:         bytes memory // params

716:             proposalvote.againstVotes += weight;

718:             proposalvote.forVotes += weight;

720:             proposalvote.abstainVotes += weight;

749:         bytes memory /*params*/

799:         return (token.getsmNFTPastTotalSupply() * quorumNumerator()) / quorumDenominator();

```

```solidity
File: ./contracts/governance/L2Governor.sol

6: import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

7: import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

8: import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

9: import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

10: import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

11: import "@openzeppelin/contracts/utils/math/SafeCast.sol";

12: import "@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol";

13: import "@openzeppelin/contracts/utils/Address.sol";

14: import "@openzeppelin/contracts/utils/Context.sol";

15: import "@openzeppelin/contracts/utils/Timers.sol";

16: import "@openzeppelin/contracts/governance/IGovernor.sol";

17: import {BlackTimeLibrary} from "../libraries/BlackTimeLibrary.sol";

261:             getVotes(_msgSender(), block.number - 1) >= proposalThreshold(),

265:         bytes32 epochStart = bytes32(BlackTimeLibrary.epochStart(block.timestamp) + (1 weeks));

275:         uint64 start = block.timestamp.toUint64() + votingDelay().toUint64();

276:         uint64 deadline = start + votingPeriod().toUint64();

327:         uint256, /* proposalId */

331:         bytes32 /*descriptionHash*/

334:         for (uint256 i = 0; i < targets.length; ++i) {

344:         uint256, /* proposalId */

346:         uint256[] memory, /* values */

348:         bytes32 /*descriptionHash*/

351:             for (uint256 i = 0; i < targets.length; ++i) {

363:         uint256, /* proposalId */

364:         address[] memory, /* targets */

365:         uint256[] memory, /* values */

366:         bytes[] memory, /* calldatas */

367:         bytes32 /*descriptionHash*/

```

```solidity
File: ./contracts/governance/L2GovernorCountingSimple.sol

6: import {L2Governor} from "contracts/governance/L2Governor.sol";

72:         return quorum(proposalSnapshot(proposalId)) <= proposalvote.forVotes + proposalvote.abstainVotes;

97:         bytes memory // params

105:             proposalvote.againstVotes += weight;

107:             proposalvote.forVotes += weight;

109:             proposalvote.abstainVotes += weight;

```

```solidity
File: ./contracts/governance/L2GovernorVotes.sol

6: import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";

7: import {L2Governor} from "contracts/governance/L2Governor.sol";

29:         bytes memory /*params*/

```

```solidity
File: ./contracts/governance/L2GovernorVotesQuorumFraction.sol

6: import {L2GovernorVotes} from "contracts/governance/L2GovernorVotes.sol";

50:         return (token.getPastTotalSupply(blockTimestamp) * quorumNumerator()) / quorumDenominator();

```

```solidity
File: ./contracts/interfaces/IAlgebraCLFactory.sol

6: import { IAlgebraFactory } from '@cryptoalgebra/integral-core/contracts/interfaces/IAlgebraFactory.sol';

```

```solidity
File: ./contracts/interfaces/IAlgebraCustomCommunityVault.sol

6: import { IAlgebraCommunityVault } from '@cryptoalgebra/integral-core/contracts/interfaces/vault/IAlgebraCommunityVault.sol';

```

```solidity
File: ./contracts/interfaces/IAlgebraEternalFarmingCustom.sol

3: import '@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol';

4: import '@cryptoalgebra/integral-farming/contracts/interfaces/IAlgebraEternalFarming.sol';

```

```solidity
File: ./contracts/interfaces/IBlackClaims.sol

13:         uint256 claim_end_time;   //Last time claim is available

```

```solidity
File: ./contracts/interfaces/IBlackHoleVotes.sol

6: import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";

```

```solidity
File: ./contracts/interfaces/IBlackholePairApiV2.sol

8:         address pair_address; 			// pair contract address

9:         string symbol; 				    // pair symbol

10:         string name;                    // pair name

11:         uint decimals; 			        // pair decimals

12:         bool stable; 				    // pair pool type (stable = false, means it's a variable type of pool)

13:         uint total_supply; 			    // pair tokens supply

16:         address token0; 				// pair 1st token address

17:         string token0_symbol; 			// pair 1st token symbol

18:         uint token0_decimals; 		    // pair 1st token decimals

19:         uint reserve0; 			        // pair 1st token reserves (nr. of tokens in the contract)

20:         uint claimable0;                // claimable 1st token from fees (for unstaked positions)

22:         address token1; 				// pair 2nd token address

23:         string token1_symbol;           // pair 2nd token symbol

24:         uint token1_decimals;    		// pair 2nd token decimals

25:         uint reserve1; 			        // pair 2nd token reserves (nr. of tokens in the contract)

26:         uint claimable1; 			    // claimable 2nd token from fees (for unstaked positions)

29:         address gauge; 				    // pair gauge address

30:         uint gauge_total_supply; 		// pair staked tokens (less/eq than/to pair total supply)

31:         uint emissions; 			    // pair emissions (per second)

32:         address emissions_token; 		// pair emissions token address

33:         uint emissions_token_decimals; 	// pair emissions token decimals

36:         uint account_lp_balance; 		// account LP tokens balance

37:         uint account_token0_balance; 	// account 1st token balance

38:         uint account_token1_balance; 	// account 2nd token balance

39:         uint account_gauge_balance;     // account pair staked in gauge balance

40:         uint account_gauge_earned; 		// account earned emissions for this pair

46:         uint staked_token0_fees;      // staked token 0 fees accumulated till now

47:         uint staked_token1_fees;      // staked token 1 fees accumulated till now

```

```solidity
File: ./contracts/interfaces/IGaugeCL.sol

2: import '@cryptoalgebra/integral-farming/contracts/base/IncentiveKey.sol';

```

```solidity
File: ./contracts/interfaces/IGaugeFactoryCL.sol

4: import "./IGaugeManager.sol";

```

```solidity
File: ./contracts/interfaces/IGenesisPool.sol

4: import "./IGenesisPoolBase.sol";

```

```solidity
File: ./contracts/interfaces/IGenesisPoolBase.sol

25:         uint256 threshold; // multiplied by 100 to support 2 decimals

```

```solidity
File: ./contracts/interfaces/IVoteWeightStrategy.sol

4: import "../libraries/PoolsAndRewardsLibrary.sol";

```

```solidity
File: ./contracts/interfaces/IVotingEscrow.sol

8:         int128 slope; // # -dweight / dt

10:         uint256 blk; // block

```

```solidity
File: ./contracts/libraries/Base64.sol

9:     bytes internal constant TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

17:         uint encodedLen = 4 * ((len + 2) / 3);

20:         bytes memory result = new bytes(encodedLen + 32);

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

8:     uint256 internal constant MAX_LOCK_DURATION = 86400 * 365 * 4;

9:     uint256 internal constant GENESIS_STAKING_MATURITY_TIME = 2 * 86400;

15:             return timestamp - (timestamp % WEEK);

22:             return timestamp - (timestamp % WEEK) + WEEK;

29:             return timestamp - (timestamp % WEEK) + NO_VOTING_WINDOW;

36:             return timestamp - (timestamp % WEEK) + WEEK - NO_VOTING_WINDOW;

50:             return (duration / WEEK) * WEEK;

57:             return  endTime - WEEK <= timestamp && timestamp < endTime;

64:             return  epochStart(timestamp) - NO_GENESIS_DEPOSIT_WINDOW;

71:             return  epochNext(timestamp) - NO_GENESIS_DEPOSIT_WINDOW;

```

```solidity
File: ./contracts/libraries/Math.sol

14:             uint x = y / 2 + 1;

17:                 x = (y / x + x) / 2;

27:             uint256 z = 3 * x * (x + 1) + 1;

28:             if (n / y >= z) {

29:                 n -= y * z;

30:                 x += 1;

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

6:     int256 constant private _INT256_MIN = -2**255;

26:         require(!(a == -1 && b == _INT256_MIN), "SignedSafeMath: multiplication overflow");

28:         int256 c = a * b;

29:         require(c / a == b, "SignedSafeMath: multiplication overflow");

48:         require(!(b == -1 && a == _INT256_MIN), "SignedSafeMath: division overflow");

50:         int256 c = a / b;

66:         int256 c = a - b;

83:         int256 c = a + b;

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

4: import {IVotingEscrow} from "../interfaces/IVotingEscrow.sol";

5: import {BlackTimeLibrary} from "./BlackTimeLibrary.sol";

12:         mapping(uint => IVotingEscrow.Point[1000000000]) user_point_history; // user -> Point[user_epoch]

30:                 return last_point.smNFT + last_point.smNFTBonus;

36:                 last_point.bias -= last_point.slope * int128(int256(_t) - int256(last_point.ts));

54:             uint center = upper - (upper - lower) / 2; // ceil, avoiding overflow

61:                 upper = center - 1;

84:         for (uint i = 0; i < 128; ++i) {

89:             uint _mid = (_min + _max + 1) / 2;

93:                 _max = _mid - 1;

103:             return upoint.smNFT + upoint.smNFTBonus;

112:             IVotingEscrow.Point memory point_1 = VotingBalanceLogicData.point_history[_epoch + 1];

113:             d_block = point_1.blk - point_0.blk;

114:             d_t = point_1.ts - point_0.ts;

116:             d_block = block.number - point_0.blk;

117:             d_t = block.timestamp - point_0.ts;

121:             block_time += (d_t * (_block - point_0.blk)) / d_block;

124:         upoint.bias -= upoint.slope * int128(int256(block_time - upoint.ts));

142:             IVotingEscrow.Point memory point_next = VotingBalanceLogicData.point_history[target_epoch + 1];

144:                 dt = ((_block - point.blk) * (point_next.ts - point.ts)) / (point_next.blk - point.blk);

148:                 dt = ((_block - point.blk) * (block.timestamp - point.ts)) / (block.number - point.blk);

152:         return _supply_at(point, point.ts + dt, slope_changes);

167:         for (uint i = 0; i < 128; ++i) {

172:             uint _mid = (_min + _max + 1) / 2;

176:                 _max = _mid - 1;

191:         uint t_i = (last_point.ts / WEEK) * WEEK;

192:         for (uint i = 0; i < 255; ++i) {

193:             t_i += WEEK;

200:             last_point.bias -= last_point.slope * int128(int256(t_i - last_point.ts));

204:             last_point.slope += d_slope;

211:         return uint(uint128(last_point.bias)) + last_point.permanent + last_point.smNFT + last_point.smNFTBonus;

220:             uint center = upper - (upper - lower) / 2; // ceil, avoiding overflow

227:                 upper = center - 1;

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

27:     uint public constant MAX_DELEGATES = 1024; // avoid too much gas

39:         if (n > 0 && self.checkpoints[account][n - 1].timestamp == currentTimestamp) {

40:             return n - 1;

57:                     ? self.checkpoints[srcRep][srcRepNum - 1].tokenIds

60:                 bool _isCheckpointInNewBlock = (srcRepNum > 0) ? (nextSrcRepNum != srcRepNum - 1) : true;

72:                         i++;

75:                             srcRepNew[i] = srcRepNew[length -1];

77:                             length--;

79:                             i++;

83:                 self.numCheckpoints[srcRep] = nextSrcRepNum + 1;   

89:                     ? self.checkpoints[dstRep][dstRepNum - 1].tokenIds

92:                 bool _isCheckpointInNewBlock = (dstRepNum > 0) ? (nextDstRepNum != dstRepNum - 1) : true;

97:                     dstRepOld.length + 1 <= MAX_DELEGATES,

101:                     for (uint i = 0; i < dstRepOld.length; i++) {

107:                 self.numCheckpoints[dstRep] = nextDstRepNum + 1;

129:                     ? _self.checkpoints[_srcRep][srcRepNum - 1].tokenIds

132:                 bool _isCheckpointInNewBlock = (srcRepNum > 0) ? (nextSrcRepNum != srcRepNum - 1) : true;

145:                         i++;

148:                             srcRepNew[i] = srcRepNew[length -1];

150:                             length--;

152:                             i++;

156:                 _self.numCheckpoints[_srcRep] = nextSrcRepNum + 1;

163:                     ? _self.checkpoints[_dstRep][dstRepNum - 1].tokenIds

166:                 bool _isCheckpointInNewBlock = (dstRepNum > 0) ? (nextDstRepNum != dstRepNum - 1) : true;

172:                     dstRepOld.length + ownerTokenCount <= MAX_DELEGATES,

176:                     for (uint i = 0; i < dstRepOld.length; i++) {

182:                 for (uint i = 0; i < ownerTokenCount; i++) {

186:                 _self.numCheckpoints[_dstRep] = nextDstRepNum + 1;   

197:         if (data.checkpoints[account][nCheckpoints - 1].timestamp <= timestamp) {

198:             return (nCheckpoints - 1);

207:         uint32 upper = nCheckpoints - 1;

209:             uint32 center = upper - (upper - lower) / 2; // ceil, avoiding overflow

216:                 upper = center - 1;

```

### <a name="GAS-11"></a>[GAS-11] Use Custom Errors instead of Revert Strings to save Gas
Custom errors are available from solidity version 0.8.4. Custom errors save [**~50 gas**](https://gist.github.com/IllIllI000/ad1bd0d29a0101b25e57c293b4b0c746) each time they're hit by [avoiding having to allocate and store the revert string](https://blog.soliditylang.org/2021/04/21/custom-errors/#errors-in-depth). Not defining the strings also save deployment gas

Additionally, custom errors can be used inside and outside of contracts (including interfaces and libraries).

Source: <https://blog.soliditylang.org/2021/04/21/custom-errors/>:

> Starting from [Solidity v0.8.4](https://github.com/ethereum/solidity/releases/tag/v0.8.4), there is a convenient and gas-efficient way to explain to users why an operation failed through the use of custom errors. Until now, you could already use strings to give more information about failures (e.g., `revert("Insufficient funds.");`), but they are rather expensive, especially when it comes to deploy cost, and it is difficult to use dynamic information in them.

Consider replacing **all revert strings** with custom errors in the solution, and particularly those that have multiple occurrences:

*Instances (385)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

23:         require(msg.sender == manager, "Only manager");

35:         require(locks.length < MAX_LOCKS, "AVM full");

41:         require(!BlackTimeLibrary.isLastHour(block.timestamp), "Cannot disable in last hour before voting");

60:         require(index < locks.length, "Token not found");

73:         require(start + length <= locks.length, "Out of bounds");

87:         require(start + length <= locks.length, "Out of bounds");

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

36:         require(index < avms.length, "Invalid AVM index");

46:         require(msg.sender == executor, "Only executor");

62:         require(votingEscrow.isApprovedOrOwner(msg.sender, tokenId), "NAO");

63:         require(!BlackTimeLibrary.isLastHour(block.timestamp), "LH");

64:         require(uint256(int256(votingEscrow.locked(tokenId).amount)) >= minBalanceForAutovoting, "IB"); // to be changed to an >= instaed of a >

90:         require(avmIdxOneBased > 0 && avmIdxOneBased - 1 < avms.length, "out of range"); // is this necessary

91:         require(!BlackTimeLibrary.isLastHour(block.timestamp), "LH");

93:         require(avm.lockOwner(tokenId) == msg.sender, "Not owner");

114:         revert("AVM not found");

123:         require(avmIndex < avms.length, "Invalid AVM index");

124:         require(localEnd > localStart, "Invalid range");

125:         require(BlackTimeLibrary.isLastHour(block.timestamp), "!LH");

128:         require(localEnd <= avmLockCount, "End exceeds available locks");

142:         require(_voter != address(0), "ZA");

148:         require(msg.sender == executor || msg.sender == owner(), "NA");

149:         require(_executor != address(0), "ZA");

154:         require(strategy != address(0), "ZA");

159:         require(strategy != address(0), "ZA");

164:         require(address(topPoolsStrategy) != address(0), "No pool strategy set");

170:         require(address(voteWeightStrategy) != address(0), "No weight strategy set");

183:         require(_topN > 0 && _topN < MAX_TOP_N, "invalid value");

198:         require(avmIdxOneBased > 0 && avmIdxOneBased - 1 < avms.length, "out of range");

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

87:         require(msg.sender == DISTRIBUTION, "Caller is not RewardsDistribution contract");

92:         require(emergency == false, "emergency");

97:         require(emergency == false, "emergency");

104:         require(emergency == true,"emergency");

159:         require(token == address(rewardToken), "not rew token");

263:         require(_int >= address(0), "zero");

```

```solidity
File: ./contracts/BlackClaims.sol

77:         require(start_time_ > 0, "CANNOT START AT 0");

78:         require(season.start_time==0, "SEASON ALREADY STARTED");

111:         require(_season.start_time > 0, "SEASON NOT FOUND");

112:         require(isSeasonClaimingEnded(), "SEASON_CLAIM_NOT_ENDED");

113:         require(_remaining_reward_amount > 0, "ZERO_REMAINING_AMOUNT");

116:         require(transfer_success, "FAILED TRANSFER");

128:         require(_season.start_time > 0, "SEASON NOT FOUND");

129:         require(!isSeasonFinalized(), "SEASON_FINALIZED");

130:         require(_season.reward_amount>0, "NO REWARD AMOUNT");

131:         require(claim_duration_ >= 1 days && claim_duration_ < 1000 days, "CLAIM DURATION OUT OF BOUNDS");

134:         require(transfer_success, "FAILED TRANSFER");

146:         require(_season.start_time > 0, "SEASON NOT FOUND");

147:         require(isSeasonFinalized(), "SEASON_NOT_FINALIZED");

148:         require(_season.reward_amount>0, "NO REWARD AMOUNT");

161:         require(players_.length == rewards_.length, "ARRAYS  MISMATCH");

164:         require(_season.start_time > 0, "SEASON NOT FOUND");

165:         require(!isSeasonFinalized(), "SEASON FINALIZED");

185:         require(claimed_rewards[msg.sender] == 0, "REWARD CLAIMED");

188:         require(isSeasonClaimingActive(), "SEASON_CLAIM_ENDED");

191:         require(_reward > 0, "MUST HAVE A NON ZERO REWARD");

203:         require(percent>=50&&percent<=100, "Percent out of bounds");

219:             require(transfer_success, "FAILED TRANSFER");

```

```solidity
File: ./contracts/BlackGovernor.sol

42:         require(msg.sender == team, "not team");

47:         require(msg.sender == team, "not team");

48:         require(numerator <= MAX_PROPOSAL_NUMERATOR, "numerator too high");

102:         require(targets.length == 1, "GovernorSimple: only one target allowed");

103:         require(address(targets[0]) == minter, "GovernorSimple: only minter allowed");

104:         require(calldatas.length == 1, "GovernorSimple: only one calldata allowed");

105:         require(bytes4(calldatas[0]) == IMinter.nudge.selector, "GovernorSimple: only nudge allowed");

```

```solidity
File: ./contracts/Bribes.sol

63:         require(_bribeFactory != address(0) && _voter != address(0) && _gaugeManager != address(0) && _owner != address(0), "ZA");

72:         require(minter != address(0), "ZA");

212:         require(amount > 0, "ZV");

213:         require(msg.sender == voter, "NA");

259:         require(amount > 0, "ZV");

260:         require(msg.sender == voter, "NA");

277:         require(msg.sender == gaugeManager, "NA");

290:         require(_isRewardToken(_rewardsToken), "!VERIFIED");

307:         require(tokenAmount <= IERC20(tokenAddress).balanceOf(address(this)), "TOO_MUCH");

320:         require(tokenAmount <= IERC20(tokenAddress).balanceOf(address(this)), "TOO_MUCH");

327:         require(_Voter != address(0), "ZA");

339:         require(_minter != address(0), "ZA");

345:         require(_avm!=address(0), "ZA");

352:         require(_owner != address(0), "ZA");

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

64:         require(account != address(0), "zero address");

65:         require(!authorizedAccounts[account], "already authorized");

71:         require(account != address(0), "zero address");

72:         require(authorizedAccounts[account], "!authorized");

131:         require(msg.sender == entryPoint, "Only entryPoint");

180:         require(_newRecipient != address(0), "zero address");

185:         require(_newManager != address(0), "zero address");

194:         require(_algebraFarmingProxyPluginFactory != address(0), "zero address");

199:         require(_algebraFactory != address(0), "zero address");

204:         require(_algebraPluginFactory != address(0), "zero address");

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

118:         require(msg.sender == GAUGE,"!GAUGE");

128:         require(IERC20(rewardToken).balanceOf(address(this)) >= amount, "!ENOUGH");

138:         require(IERC20(rewardToken).balanceOf(address(this)) >= amount, "!ENOUGH");

175:         require(amount > 0, "ZV");

176:         require(token != address(0), "ZA");

178:         require(balance >= amount, "!ENOUGH");

```

```solidity
File: ./contracts/GaugeManager.sol

106:         require(_bribeFactory.code.length > 0, "CODELEN");

107:         require(_bribeFactory != address(0), "ZA");

114:         require(_permissionRegistry.code.length > 0, "CODELEN");

115:         require(_permissionRegistry != address(0), "ZA");

121:         require(_voter.code.length > 0, "CODELEN");

122:         require(_voter != address(0), "ZA");

128:         require(_genesisManager != address(0), "ZA");

129:         require(_genesisManager.code.length > 0, "CODELEN");

139:         require(_blackGovernor != address(0), "ZA");

152:         require(_pool.length == _gaugeTypes.length, "MISMATCH_LEN");

153:         require(_pool.length <= 10, "MAXVAL");

182:         require(_gaugeType < _factoriesData.pairFactories.length, "GAUGETYPE");

183:         require(gauges[_pool] == address(0x0), "DNE");

184:         require(_pool.code.length > 0, "CODELEN");

189:         require(_factory != address(0), "ZA");

190:         require(_gaugeFactory != address(0), "ZA");

208:         require(ITokenHandler(tokenHandler).isWhitelisted(tokenA) && ITokenHandler(tokenHandler).isWhitelisted(tokenB), "!WHITELISTED");

209:         require(ITokenHandler(tokenHandler).isConnector(tokenA) || ITokenHandler(tokenHandler).isConnector(tokenB), "!CONNECTOR");

210:         require(isPair, "!POOL");

211:         require(tokenA != address(0) && tokenB != address(0), "!TOKENS");

291:         require(msg.sender == minter, "NA");

442:         require(isAlive[_gauge], "DEAD");

462:         require(!isAlive[_gauge], "ALIVE");

475:         require(isGauge[_gauge], "!GAUGE");

476:         require(_gauge.code.length > 0, "CODELEN");

483:         require(isGauge[_gauge], "!GAUGE");

489:         require(isGauge[_gauge], "!GAUGE");

494:         require(_internal.code.length > 0, "CODELEN");

500:         require(_external.code.length > 0, "CODELEN");

521:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId) || (address(avm)!= address(0) && avm.getOriginalOwner(_tokenId) == msg.sender), "NAO");

541:         require(_minter != address(0), "ZA");

542:         require(_minter.code.length > 0, "CODELEN");

```

```solidity
File: ./contracts/GaugeV2.sol

78:         require(msg.sender == DISTRIBUTION, "NA");

83:         require(msg.sender == genesisPool, "NA");

88:         require(msg.sender == genesisManager, "NA");

93:         require(emergency == false, "EMER");

126:         require(_distribution != address(0), "ZA");

127:         require(_distribution != DISTRIBUTION, "SAME_ADDR");

133:         require(_gaugeRewarder != gaugeRewarder, "SAME_ADDR");

140:         require(_int >= address(0), "ZA");

145:         require(emergency == false, "EMER");

152:         require(emergency == true,"EMER");

222:         require(_tokenOwner != address(0), "ZA");

223:         require(_totalAmount > 0, "ZV");

248:         require(amount > 0, "ZV");

273:         require(amount > 0, "ZV");

274:         require(_balanceOf(msg.sender) > 0, "ZV");

275:         require(block.timestamp >= maturityTime[msg.sender], "!MATURE");

290:         require(emergency, "EMER");

292:         require(_amount > 0, "ZV");

304:         require(emergency, "EMER");

383:         require(token == address(rewardToken), "IA");

399:         require(rewardRate <= balance / DURATION, "REWARD_HIGH");

```

```solidity
File: ./contracts/GenesisPool.sol

93:         require(_sender == genesisInfo.tokenOwner, "NA");

94:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED || poolStatus == PoolStatus.PRE_LISTING, "INS");

95:         require(_incentivesToken.length > 0, "ZV");

96:         require(_incentivesToken.length == _incentivesAmount.length, "MISMATCH_LEN");

118:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED || poolStatus == PoolStatus.PRE_LISTING, "INS");

125:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED, "INS");

132:         require(poolStatus == PoolStatus.PRE_LISTING || poolStatus == PoolStatus.PRE_LAUNCH, "INS");

133:         require(block.timestamp >= genesisInfo.startTime, "INS");

139:         require(_amount > 0, "ZV");

273:         require(poolStatus == PoolStatus.NOT_QUALIFIED || poolStatus == PoolStatus.PARTIALLY_LAUNCHED, "INS");

274:         require(msg.sender == genesisInfo.tokenOwner, "NA");

285:         require(poolStatus == PoolStatus.NOT_QUALIFIED, "INS");

308:         require(poolStatus == PoolStatus.NOT_QUALIFIED, "INS");

309:         require(msg.sender == genesisInfo.tokenOwner, "NA");

396:         require(_auction != address(0), "ZA");

397:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED, "INS");

407:         require(_startTime + genesisInfo.duration - BlackTimeLibrary.NO_GENESIS_DEPOSIT_WINDOW > block.timestamp, "TIME");

```

```solidity
File: ./contracts/GenesisPoolManager.sol

102:         require(whiteListedTokensToUser[nativeToken][_sender] || _checkGovernance(), "!WHITELIST");

103:         require(nativeToken == genesisPoolInfo.nativeToken, "IA");

104:         require(_sender == genesisPoolInfo.tokenOwner, "NA");

105:         require(allocationInfo.proposedNativeAmount > 0, "ZV");

106:         require(allocationInfo.proposedFundingAmount > 0, "ZV");

109:         require(tokenHandler.isConnector(_fundingToken), "!CONN");

114:             require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");

115:             require(IERC20(_fundingToken).balanceOf(pairAddress) == 0, "!ZV");

118:         require(genesisPoolInfo.duration >= MIN_DURATION && genesisPoolInfo.threshold >= MIN_THRESHOLD && genesisPoolInfo.startPrice > 0, "INV_GENESIS");

119:         require(genesisPoolInfo.supplyPercent > 0 && genesisPoolInfo.supplyPercent <= 10000, "INV"); 

121:         require(genesisPoolInfo.nativeToken == nativeToken, "MISMATCH");

127:         require(genesisPool != address(0), "ZA");

140:         require(nativeToken != address(0), "ZA");

149:         require(nativeToken != address(0), "ZA");

154:         require(genesisInfo.startTime + genesisInfo.duration - BlackTimeLibrary.NO_GENESIS_DEPOSIT_WINDOW > block.timestamp, "TIME");

160:             require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");

161:             require(IERC20(genesisInfo.fundingToken).balanceOf(pairAddress) == 0, "!ZV");

172:         require(amount > 0, "ZV");

173:         require(genesisPool != address(0), "ZA");

188:         require(epochController == msg.sender, "NA");

228:         require(epochController == msg.sender, "NA");

270:         require(_genesisPool != address(0), "ZA");

283:         require(_epochController != address(0), "ZA");

300:         require(_nativeToken != address(0), "ZA");

302:         require(genesisPool != address(0), "ZA");

307:         require(_nativeToken != address(0), "ZA");

309:         require(genesisPool != address(0), "ZA");

314:         require(_router == address(0), "ZA");

```

```solidity
File: ./contracts/MinterUpgradeable.sol

107:         require(msg.sender == pendingTeam, "not pending team");

113:         require(msg.sender == team, "not team");

118:         require(msg.sender == team, "not team");

119:         require(_teamRate <= MAX_TEAM_RATE, "rate too high");

```

```solidity
File: ./contracts/Pair.sol

113:         require(_unlocked == 1, "LOCKED");

381:         require(!PairFactory(factory).isPaused(), "PAUSED");

570:         require(token.code.length > 0, "CODELEN");

572:         require(success && (data.length == 0 || abi.decode(data, (bool))), "IST");

576:         require(token.code.length > 0, "CODELEN");

577:         require((value == 0) || (IERC20(token).allowance(address(this), spender) == 0),"INAP");

579:         require(success && (data.length == 0 || abi.decode(data, (bool))), "ISA");

```

```solidity
File: ./contracts/PermissionsRegistry.sol

71:         require(msg.sender == blackMultisig, "!blackMultisig");

236:         require(msg.sender == emergencyCouncil || msg.sender == blackMultisig, "not allowed");

237:         require(_new != address(0), "addr0");

238:         require(_new != emergencyCouncil, "same emergencyCouncil");

248:         require(msg.sender == blackTeamMultisig, "not allowed");

249:         require(_new != address(0), "addr 0");

250:         require(_new != blackTeamMultisig, "same multisig");

259:         require(msg.sender == blackMultisig, "not allowed");

260:         require(_new != address(0), "addr0");

261:         require(_new != blackMultisig, "same multisig");

```

```solidity
File: ./contracts/RewardsDistributor.sol

62:         require(IERC20(_token).approve(_voting_escrow, type(uint).max), "approval failed");

266:         require(_avm != address(0), "ZA");

```

```solidity
File: ./contracts/RouterV2.sol

348:         require(amountADesired >= amountAMin && amountBDesired >= amountBMin, "DLMA");

367:         require(amountA >= amountAMin && amountB >= amountBMin, "IAA");

384:         require(!(IBaseV1Factory(factory).isGenesis(pair) && IBaseV1Pair(pair).totalSupply() == 0), "NA");

430:         require(IBaseV1Pair(pair).transferFrom(msg.sender, pair, liquidity), "ITFM"); // send liquidity to pair

646:         require(token.code.length > 0, "CODELEN");

649:         require(success && (data.length == 0 || abi.decode(data, (bool))), "IST");

653:         require(token.code.length > 0, "CODELEN");

656:         require(success && (data.length == 0 || abi.decode(data, (bool))), "ISTF");

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

22:         require(_voterV3 != address(0), "Voter cannot be zero");

23:         require(_avm != address(0), "AVM cannot be zero");

31:         require(msg.sender == address(avm), "Only AVM can call");

36:         require(msg.sender == executor, "Only AVM can call");

41:         require(msg.sender == owner() || msg.sender == executor, "Unauthorized");

47:         require(_poolAddresses.length <= topN, "Exceeds topN");

52:             require(_poolAddresses[i] != address(0), "Zero address not allowed");

69:         require(_avm != address(0), "ZA");

76:         require(_executor!=address(0), "ZA"); 

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

20:         require(_avm != address(0), "AVM address cannot be zero");

27:         require(msg.sender == address(avm), "Only AVM can call");

32:         require(msg.sender == executor, "Only executor can call");

37:         require(msg.sender == owner() || msg.sender == executor, "Unauthorized");

46:         require(_weights.length <= topN, "Vote weight array exceeds topN");

56:         require(_avm != address(0), "ZA");

67:         require(_executor != address(0), "ZA");

```

```solidity
File: ./contracts/Thenian.sol

45:         require(withdrawMultiSig, "Withdraw Failed.");

60:         require(_to != address(0), "Invalid address to reserve.");

61:         require(reservedAmount.add(_amount) <= MAX_RESERVE, "Invalid amount");

117:         require(block.timestamp >= SALE_START_TIMESTAMP, "Sale has not started yet.");

118:         require(block.timestamp < SALE_START_TIMESTAMP + 1 days, "First round has ended.");

119:         require(verifyLeaf(proof, msg.sender), "Not whitelisted.");

120:         require(NFT_PRICE == msg.value, "BNB value sent is not correct.");

121:         require(!firstMint[msg.sender], "Already minted!");

132:         require(block.timestamp >= SALE_START_TIMESTAMP + 1 days, "Second round has not started yet.");

133:         require(block.timestamp < SALE_START_TIMESTAMP + 2 days, "Second round has ended.");

134:         require(verifyLeaf(proof, msg.sender), "Not whitelisted.");

135:         require(NFT_PRICE.mul(amount) == msg.value, "BNB value sent is not correct");

136:         require(secondMint[msg.sender].add(amount) <= MAX_PER_MINT, "Can only mint 10 in the second round");

147:         require(block.timestamp >= SALE_START_TIMESTAMP + 2 days, "Public Sale has not started yet.");

148:         require(block.timestamp < SALE_START_TIMESTAMP + 5 days, "Sale is over.");

149:         require(amount <= MAX_PER_MINT, "Can only mint 10 NFTs at a time");

150:         require(balanceOf(msg.sender).add(amount) <= 15, "Can only mint 15 NFTs per wallet");

151:         require(NFT_PRICE.mul(amount) == msg.value, "BNB value sent is not correct");

158:         require(totalSupply().add(amount) <= MAX_SUPPLY, "Mint would exceed max supply.");

```

```solidity
File: ./contracts/TokenHandler.sol

45:         require(_permissionRegistry.code.length > 0, "!contract");

46:         require(_permissionRegistry != address(0), "addr0");

64:         require(!isWhitelisted[_token], "in");

65:         require(_token.code.length > 0, "!contract");

84:         require(isWhitelisted[_token], "out");

85:         require(_token.code.length > 0, "!contract");

123:         require(isWhitelisted[_token], "out");

124:         require(!isConnector[_token], "connector");

125:         require(_token.code.length > 0, "!contract");

132:         require(isWhitelisted[_token], "out");

133:         require(isConnector[_token], "not connector");

134:         require(_token.code.length > 0, "!contract");

162:         require(isWhitelisted[_token], "!whitelisted");

168:         require(isWhitelisted[_token], "!whitelisted");

```

```solidity
File: ./contracts/VoterV3.sol

106:         require(_epochOwner != address(0), "ZA");

113:         require(_permissionRegistry.code.length > 0, "CODELEN");

114:         require(_permissionRegistry != address(0), "ZA");

139:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId), "NAO");

177:             revert("DW");

179:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId) || msg.sender == _ve, "NAO||VE");

198:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId), "NAO");

199:         require(_poolVote.length == _weights.length, "MISMATCH_LEN");

200:         require(_poolVote.length <= maxVotingNum, "EXCEEDS");

203:             revert("AVM_W");

228:                 require(votes[_tokenId][_pool] == 0, "ZV");

229:                 require(_poolWeight != 0, "ZV");

253:         if (BlackTimeLibrary.epochStart(block.timestamp) <= lastVoted[_tokenId]) revert("VOTED");

254:         if (block.timestamp <= BlackTimeLibrary.epochVoteStart(block.timestamp)) revert("DW");

```

```solidity
File: ./contracts/VotingEscrow.sol

178:         require(idToOwner[_tokenId] != address(0), "DNE");

257:         require(owner != address(0), "ZA");

259:         require(_approved != owner, "IA");

263:         require(senderIsOwner || senderIsApprovedForAll, "NAO");

322:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

324:         require(_isApprovedOrOwner(_sender, _tokenId), "NAO");

418:                     revert("E721_RJ");

541:         require(_isApprovedOrOwner(msg.sender, _tokenId), "NAO");

819:         require(_value > 0, "ZV"); // dev: need non-zero value

840:         require(_value > 0, "ZV"); // dev: need non-zero value

903:         require(!_locked.isSMNFT && !_locked.isPermanent, "!NORM");

940:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

943:         require(!_locked.isSMNFT && !_locked.isPermanent, "!NORM");

944:         require(block.timestamp >= _locked.end, "!EXP");

967:         require(_isApprovedOrOwner(sender, _tokenId), "NAO");

970:         require(!_newLocked.isSMNFT && !_newLocked.isPermanent, "!NORM");

971:         require(_newLocked.end > block.timestamp, "EXP");

972:         require(_newLocked.amount > 0, "ZV");

989:         require(_isApprovedOrOwner(msg.sender, _tokenId), "NAO");

991:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

993:         require(!_newLocked.isSMNFT && _newLocked.isPermanent, "!NORM");

1070:         require(msg.sender == voter, "NA");

1075:         require(msg.sender == voter, "NA");

1080:         require(msg.sender == voter, "NA");

1085:         require(attachments[_from] == 0 && !voted[_from], "ATT");

1086:         require(_from != _to, "SAME");

1092:         require(_locked1.end > block.timestamp ||  _locked1.isPermanent,"EXP||PERM");

1093:         require(_locked0.isPermanent ? (_locked0.isSMNFT ? _locked1.isSMNFT :  _locked1.isPermanent && !_locked1.isSMNFT) : true, "!MERGE");

1152:         require(canSplit[msg.sender] || canSplit[address(0)], "!SPLIT");

1153:         require(attachments[_from] == 0 && !voted[_from], "ATT");

1154:         require(_isApprovedOrOwner(msg.sender, _from), "NAO");

1157:         require(newLocked.end > block.timestamp || newLocked.isPermanent, "EXP");

1163:         require(_splitAmount != 0, "ZV");

1164:         require(newLocked.amount > _splitAmount, "BIGVAL");

1324:         require(delegatee != msg.sender, "NA");

1325:         require(delegatee != address(0), "ZA");

```

```solidity
File: ./contracts/WAVAX.sol

23:         revert("WAVAX: invalid call");

34:         require(balanceOf[msg.sender] >= wad, "WAVAX: insufficient balance");

62:         require(to != address(0), "WAVAX: transfer to zero address");

63:         require(balanceOf[from] >= value, "WAVAX: insufficient balance");

68:                 require(allowed >= value, "WAVAX: allowance exceeded");

```

```solidity
File: ./contracts/chainlink/EpochController.sol

48:          require(upkeepNeeded, "condition not met");

61:          require(preUpkeepNeeded, "condition not met");

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

33:         require(_auction.code.length > 0, "!contract");

43:         require(_auction.code.length > 0, "!contract");

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

62:         require( msg.sender == IPermissionsRegistry(permissionsRegistry).emergencyCouncil(), "NA");

82:         require(_gauges.length == _pids.length, "EXACT_LEN");

90:         require(_gauges.length == _rewarder.length, "EXACT_LEN");

106:         require(_gauges.length == int_bribe.length, "EXACT_LEN");

114:         require(_genesisManager != address(0), "ZA");

115:         require(_gauge != address(0), "ZA");

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

57:         require(nativeToken != address(0), "ZA"); 

58:         require(getGenesisPool(nativeToken) == address(0), "!ZA");

```

```solidity
File: ./contracts/factories/PairFactory.sol

37:         require(msg.sender == feeManager, "NA");

59:         require(msg.sender == owner(), "NA");

68:         require(msg.sender == pendingFeeManager, "NA");

73:         require(_newFee <= 3000, "HFE");

78:         require(_feehandler != address(0), "ZA");

83:         require(_dibs != address(0), "ZA");

92:         require(_fee <= MAX_FEE, "HFE");

93:         require(_fee != 0, "ZFE");

102:         require(_fees <= MAX_FEE, "HFE");

103:         require(isPair[_pairAddress], "INVP");

108:         require(isPair[_pairAddress], "INVP");

131:         require(_pairAddress != address(0) && isPair[_pairAddress], "INVP");

140:         require(tokenA != tokenB, "IA"); // Pair: IDENTICAL_ADDRESSES

142:         require(token0 != address(0), "ZA"); // Pair: ZERO_ADDRESS

143:         require(getPair[token0][token1][stable] == address(0), "!ZA");

158:         require(msg.sender == genesisManager || msg.sender == feeManager,  "NA");

```

```solidity
File: ./contracts/governance/Governor.sol

74:         require(_msgSender() == _executor(), "Governor: onlyGovernance");

172:             revert("Governor: unknown proposal id");

276:         require(targets.length > 0, "Governor: empty proposal");

279:         require(proposal.voteStart.isUnset(), "Governor: proposal already exists");

542:         require(state(proposalId) == ProposalState.Active, "Governor: vote not currently active");

712:         require(!proposalvote.hasVoted[account], "GovernorVotingSimple: vote already cast");

722:             revert("GovernorVotingSimple: invalid value for enum VoteType");

```

```solidity
File: ./contracts/governance/L2Governor.sol

70:         require(_msgSender() == _executor(), "Governor: onlyGovernance");

163:             revert("Governor: unknown proposal id");

268:         require(targets.length == values.length, "Governor: invalid proposal length");

269:         require(targets.length == calldatas.length, "Governor: invalid proposal length");

270:         require(targets.length > 0, "Governor: empty proposal");

273:         require(proposal.voteStart.isUnset(), "Governor: proposal already exists");

533:         require(state(proposalId) == ProposalState.Active, "Governor: vote not currently active");

```

```solidity
File: ./contracts/governance/L2GovernorCountingSimple.sol

101:         require(!proposalvote.hasVoted[account], "GovernorVotingSimple: vote already cast");

111:             revert("GovernorVotingSimple: invalid value for enum VoteType");

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

26:         require(!(a == -1 && b == _INT256_MIN), "SignedSafeMath: multiplication overflow");

29:         require(c / a == b, "SignedSafeMath: multiplication overflow");

47:         require(b != 0, "SignedSafeMath: division by zero");

48:         require(!(b == -1 && a == _INT256_MIN), "SignedSafeMath: division overflow");

67:         require((b >= 0 && c <= a) || (b < 0 && c > a), "SignedSafeMath: subtraction overflow");

84:         require((b >= 0 && c >= a) || (b < 0 && c < a), "SignedSafeMath: addition overflow");

90:         require(a >= 0, "Integer < 0");

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

19:         require(!self.isFactory[_pairFactory], "fact");

20:         require(_pairFactory.code.length > 0, "!contract");

28:         require(!self.isGaugeFactory[_gaugeFactory], "gFact");

29:         require(_gaugeFactory.code.length > 0, "!contract");

38:         require(_pairFactory.code.length > 0, "!contract");

50:         require(_gaugeFactory.code.length > 0, "!contract");

61:         require(self.isFactory[oldPF], "!exists");

69:         require(self.isGaugeFactory[oldGF], "!exists");

```

### <a name="GAS-12"></a>[GAS-12] Avoid contract existence checks by using low level calls
Prior to 0.8.10 the compiler inserted extra code, including `EXTCODESIZE` (**100 gas**), to check for contract existence for external function calls. In more recent solidity versions, the compiler will not insert these checks if the external call has a return value. Similar behavior can be achieved in earlier versions by using low-level calls, since low level calls never check for contract existence

*Instances (57)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

188:         token0 = IERC20(_token0).balanceOf(address(this));

189:         token1 = IERC20(_token1).balanceOf(address(this));

218:         claimed0 = IERC20(_token0).balanceOf(address(this));

219:         claimed1 = IERC20(_token1).balanceOf(address(this));

276:         uint256 gaugeAccruedFeeToken0 = IERC20(algebraPool.token0()).balanceOf(address(this));

277:         uint256 gaugeAccruedFeeToken1 = IERC20(algebraPool.token1()).balanceOf(address(this));

295:         communityVaultAccruedFeeToken0 = IERC20(algebraPool.token0()).balanceOf(communityVault);

296:         communityVaultAccruedFeeToken1 = IERC20(algebraPool.token1()).balanceOf(communityVault);

```

```solidity
File: ./contracts/BlackClaims.sol

243:         uint _balance = IERC20(tokenAddress_).balanceOf(address(this));

```

```solidity
File: ./contracts/Bribes.sol

307:         require(tokenAmount <= IERC20(tokenAddress).balanceOf(address(this)), "TOO_MUCH");

320:         require(tokenAmount <= IERC20(tokenAddress).balanceOf(address(this)), "TOO_MUCH");

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

97:         uint256 lpSupply = IERC20(IGauge(GAUGE).TOKEN()).balanceOf(GAUGE);

128:         require(IERC20(rewardToken).balanceOf(address(this)) >= amount, "!ENOUGH");

138:         require(IERC20(rewardToken).balanceOf(address(this)) >= amount, "!ENOUGH");

151:             uint256 lpSupply = IERC20(IGauge(GAUGE).TOKEN()).balanceOf(GAUGE);

177:         uint balance = IERC20(token).balanceOf(address(this));

```

```solidity
File: ./contracts/GaugeManager.sol

330:                 uint _balanceToken0 = IERC20(_token0).balanceOf(algebraPool.communityVault());

333:                 uint _balanceToken1 = IERC20(_token1).balanceOf(algebraPool.communityVault());

```

```solidity
File: ./contracts/GaugeV2.sol

179:         if(genesisPool != address(0)) balance += IGenesisPool(genesisPool).balanceOf(account);

238:         _deposit(TOKEN.balanceOf(msg.sender), msg.sender);

315:         if(genesisPool != address(0)) gensisBalance = IGenesisPool(genesisPool).balanceOf(msg.sender);

398:         uint256 balance = rewardToken.balanceOf(address(this));

```

```solidity
File: ./contracts/GenesisPoolManager.sol

114:             require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");

115:             require(IERC20(_fundingToken).balanceOf(pairAddress) == 0, "!ZV");

160:             require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");

161:             require(IERC20(genesisInfo.fundingToken).balanceOf(pairAddress) == 0, "!ZV");

```

```solidity
File: ./contracts/MinterUpgradeable.sol

125:         uint _veTotal = _black.balanceOf(address(_ve));

190:             uint _balanceOf = _black.balanceOf(address(this));

209:         return _black.totalSupply() - _black.balanceOf(address(_ve)) - _black.balanceOf(address(burnTokenAddress));

```

```solidity
File: ./contracts/Pair.sol

337:         uint _balance0 = IERC20(token0).balanceOf(address(this));

338:         uint _balance1 = IERC20(token1).balanceOf(address(this));

361:         uint _balance0 = IERC20(_token0).balanceOf(address(this));

362:         uint _balance1 = IERC20(_token1).balanceOf(address(this));

372:         _balance0 = IERC20(_token0).balanceOf(address(this));

373:         _balance1 = IERC20(_token1).balanceOf(address(this));

394:         _balance0 = IERC20(_token0).balanceOf(address(this));

395:         _balance1 = IERC20(_token1).balanceOf(address(this));

406:         _balance0 = IERC20(_token0).balanceOf(address(this)); // since we removed tokens, we need to reconfirm balances, can also simply use previous balance - amountIn/ 10000, but doing balanceOf again as safety check

407:         _balance1 = IERC20(_token1).balanceOf(address(this));

419:         _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)) - (reserve0));

420:         _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)) - (reserve1));

425:         _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);

```

```solidity
File: ./contracts/RewardsDistributor.sol

75:         uint token_balance = IERC20(token).balanceOf(address(this));

261:         uint256 _balance = IERC20(_token).balanceOf(address(this));

```

```solidity
File: ./contracts/RouterV2.sol

240:         uint _balance0 = IERC20(pairSwapMetaData.token0).balanceOf(address(pair));

241:         uint _balance1 = IERC20(pairSwapMetaData.token1).balanceOf(address(pair));

681:         _safeTransfer(token, to, erc20(token).balanceOf(address(this)));

715:             amountInput = erc20(input).balanceOf(address(pair)).sub(reserveInput);

739:         uint balanceBefore = erc20(routes[routes.length - 1].to).balanceOf(to);

742:             erc20(routes[routes.length - 1].to).balanceOf(to).sub(balanceBefore) >= amountOutMin,

760:         uint balanceBefore = erc20(routes[routes.length - 1].to).balanceOf(to);

763:             erc20(routes[routes.length - 1].to).balanceOf(to).sub(balanceBefore) >= amountOutMin,

783:         uint amountOut = erc20(address(wETH)).balanceOf(address(this));

```

```solidity
File: ./contracts/governance/Governor.sol

472:         address voter = ECDSA.recover(

493:         address voter = ECDSA.recover(

```

```solidity
File: ./contracts/governance/L2Governor.sol

463:         address voter = ECDSA.recover(

484:         address voter = ECDSA.recover(

```

### <a name="GAS-13"></a>[GAS-13] Stack variable used as a cheaper cache for a state variable is only used once
If the variable is only accessed once, it's cheaper to use the state variable directly that one time, and save the **3 gas** the extra stack assignment would spend

*Instances (6)*:
```solidity
File: ./contracts/BlackClaims.sol

187:         Season storage _season = season;

206:         Season storage _season = season;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

91:         uint _period = pre_epoch_period;

230:         uint _period = pre_epoch_period;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

213:         uint _period = active_period;

```

```solidity
File: ./contracts/governance/Governor.sol

831:         uint256 oldQuorumNumerator = _quorumNumerator;

```

### <a name="GAS-14"></a>[GAS-14] State variables only set in the constructor should be declared `immutable`
Variables only set in the constructor and never edited afterwards should be marked as immutable, as it would avoid the expensive storage-writing operation in the constructor (around **20 000 gas** per variable) and replace the expensive storage-reading operations (around **2100 gas** per reading) to a less expensive value reading (**3 gas**)

*Instances (68)*:
```solidity
File: ./contracts/APIHelper/TradeHelper.sol

19:         factory = _factory;

20:         pairCodeHash = PairFactory(_factory).pairCodeHash();

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

66:         factory = _factory;

67:         rewardToken = IERC20(_rewardToken);     // main reward

68:         bonusRewardToken = IERC20(_bonusRewardToken);

69:         VE = _ve;                               // vested

70:         poolAddress = _pool;

71:         algebraPool = IAlgebraPool(_pool);

72:         DISTRIBUTION = _distribution;           // distro address (GaugeManager)

73:         DURATION = BlackTimeLibrary.WEEK;                   

76:         external_bribe = _external_bribe;       // bribe fees goes here

77:         isForPair = _isForPair;

78:         farmingParam = _farmingParam;

79:         farmingCenter = IFarmingCenter(farmingParam.farmingCenter);

81:         algebraEternalFarming = IAlgebraEternalFarming(farmingParam.algebraEternalFarming);

82:         nonfungiblePositionManager = INonfungiblePositionManager(farmingParam.nfpm);

```

```solidity
File: ./contracts/BlackClaims.sol

56:         _ve = IVotingEscrow(__ve);

57:         token = IERC20(_ve.token());

58:         MAX_PERIOD = BlackTimeLibrary.MAX_LOCK_DURATION;

```

```solidity
File: ./contracts/BlackGovernor.sol

29:         minter = _minter;

```

```solidity
File: ./contracts/Bribes.sol

64:         WEEK = BlackTimeLibrary.WEEK;

67:         bribeFactory = _bribeFactory;

68:         tokenHandler = ITokenHandler(_tokenHandler);

69:         ve = IVoter(_voter)._ve();

74:         TYPE = _type;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

51:         entryPoint = _entryPoint;

52:         plugin = _plugin;

53:         tickSpacing = _tickSpacing;

54:         algebraPoolAPIStorage = _algebraPoolAPIStorage;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

56:         rewardToken = _rewardToken;

61:         GAUGE = gauge;

62:         distributePeriod = BlackTimeLibrary.WEEK;

```

```solidity
File: ./contracts/GaugeV2.sol

98:         rewardToken = IERC20(_rewardToken);     // main reward

99:         VE = _ve;                               // vested

100:         TOKEN = IERC20(_token);                 // underlying (LP)

102:         DURATION = BlackTimeLibrary.WEEK;                   

105:         external_bribe = _external_bribe;       // bribe fees goes here

109:         isForPair = _isForPair;                 // pair boolean, if false no claim_fees

```

```solidity
File: ./contracts/GenesisPool.sol

64:         genesisManager = _genesisManager;

65:         tokenHandler = ITokenHandler(_tokenHandler);

```

```solidity
File: ./contracts/GlobalRouter.sol

172:         tradeHelper = ITradeHelper(_tradeHelper);

```

```solidity
File: ./contracts/Pair.sol

93:         factory = _factory;

95:         fees = address(new PairFees(_token0, _token1));

97:             name = string(abi.encodePacked("StableV1 AMM - ", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

98:             symbol = string(abi.encodePacked("sAMM-", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

104:         decimals0 = 10**IERC20(_token0).decimals();

105:         decimals1 = 10**IERC20(_token1).decimals();

```

```solidity
File: ./contracts/PairFees.sol

17:         pair = msg.sender;

18:         token0 = _token0;

19:         token1 = _token1;

```

```solidity
File: ./contracts/RewardsDistributor.sol

52:         WEEK = BlackTimeLibrary.WEEK;

54:         start_time = _t;

56:         time_cursor = _t;

58:         token = _token;

59:         voting_escrow = _voting_escrow;

```

```solidity
File: ./contracts/RouterV2.sol

138:         owner = msg.sender;

139:         factory = _factory;

140:         wETH = IWETH(_wETH);

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

24:         voterV3 = IVoter(_voterV3);

```

```solidity
File: ./contracts/VotingEscrow.sol

117:         token = token_addr;

122:         WEEK = BlackTimeLibrary.WEEK;

123:         MAXTIME = BlackTimeLibrary.MAX_LOCK_DURATION;

124:         iMAXTIME = int128(int256(BlackTimeLibrary.MAX_LOCK_DURATION));

132:         _black = IBlack(token);

```

```solidity
File: ./contracts/governance/Governor.sol

88:         _name = name_;

88:         _name = name_;

740:         token = tokenAddress;

740:         token = tokenAddress;

```

### <a name="GAS-15"></a>[GAS-15] Functions guaranteed to revert when called by normal users can be marked `payable`
If a function modifier such as `onlyOwner` is used, the function will revert if a normal user tries to pay the function. Marking the function as `payable` will lower the gas cost for legitimate callers because the compiler will not include checks for whether a payment was provided.

*Instances (128)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

34:     function acceptLock(address _owner, uint256 _tokenId) external onlyManager {

40:     function releaseLock(uint256 _tokenId) external onlyManager {

72:     function voteLocks(uint256 start, uint256 length) external override onlyManager {

86:     function resetLocks(uint256 start, uint256 length) external override onlyManager {

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

141:     function setVoter(address _voter) external onlyOwner {

153:     function setTopPoolsStrategy(address strategy) external onlyOwner {

158:     function setVoteWeightStrategy(address strategy) external onlyOwner {

182:     function setTopN(uint256 _topN) public onlyOwner {

194:     function setOriginalOwner(uint256 _tokenId, address _user) external onlyVotingEscrow {} // implement this

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

96:     function activateEmergencyMode() external onlyOwner {

102:     function stopEmergencyMode() external onlyOwner {

146:     function getReward(uint256 tokenId, bool isBonusReward) public nonReentrant onlyDistribution {

262:     function setInternalBribe(address _int) external onlyOwner {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

116:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {

128:     function setDibs(address _dibs) external onlyAllowed {

133:     function setReferralFee(uint256 _dibsFee) external onlyAllowed {

```

```solidity
File: ./contracts/BlackClaims.sol

64:     function setTreasury(address treasury_) external onlyOwner {

107:     function revokeUnclaimedReward() external onlyOwner

241:     function recoverERC20(address tokenAddress_) external onlyOwner {

247:     function setOwner(address _owner) external onlyOwner {

251:     function setOwner2(address _owner) external onlyOwner {

```

```solidity
File: ./contracts/Bribes.sol

306:     function recoverERC20AndUpdateData(address tokenAddress, uint256 tokenAmount) external onlyAllowed {

319:     function emergencyRecoverERC20(address tokenAddress, uint256 tokenAmount) external onlyAllowed {

326:     function setVoter(address _Voter) external onlyAllowed {

332:     function setGaugeManager(address _gaugeManager) external onlyAllowed {

338:     function setMinter(address _minter) external onlyAllowed {

344:     function setAVM(address _avm) external onlyAllowed {

351:     function setOwner(address _owner) external onlyAllowed {

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

63:     function addAuthorizedAccount(address account) external onlyOwner {

70:     function removeAuthorizedAccount(address account) external onlyOwner {

171:     function setFee(address pool, uint16 newFee) external onlyAuthorized {

175:     function setCommunityFee(address pool, uint16 newCommunityFee) external onlyAuthorized {

179:     function setAlgebraFeeRecipient(address _newRecipient) external onlyOwner {

184:     function setAlgebraFeeManager(address _newManager) external onlyOwner {

189:     function setAlgebraFeeShare(uint16 _newFeeShare) external onlyOwner {

193:     function setAlgebraFarmingProxyPluginFactory(address _algebraFarmingProxyPluginFactory) external onlyOwner {

198:     function setAlgebraFactory(address _algebraFactory) external onlyOwner {

203:     function setAlgebraPluginFactory(address _algebraPluginFactory) external onlyOwner {

```

```solidity
File: ./contracts/CustomToken.sol

31:     function mint(address account, uint256 amount) external onlyOwner {

40:     function burn(address account, uint256 amount) external onlyOwner {

```

```solidity
File: ./contracts/Fan.sol

22:     function mint(address account, uint256 amount) external onlyOwner {

31:     function burn(address account, uint256 amount) external onlyOwner {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

69:     function onReward(address _user, address to, uint256 userBalance) onlyGauge external {

126:     function setDistributionRate(uint256 amount) public onlyOwner {

174:     function recoverERC20(uint amount, address token) external onlyOwner {

```

```solidity
File: ./contracts/GaugeManager.sol

571:     function setAVM(address _avm) external onlyOwner {

```

```solidity
File: ./contracts/GaugeV2.sol

125:     function setDistribution(address _distribution) external onlyOwner {

132:     function setGaugeRewarder(address _gaugeRewarder) external onlyOwner {

139:     function setInternalBribe(address _int) external onlyOwner {

144:     function activateEmergencyMode() external onlyOwner {

150:     function stopEmergencyMode() external onlyOwner {

221:     function depositsForGenesis(address _tokenOwner, uint256 _timestamp, uint256 _totalAmount) external onlyGenesisPool nonReentrant { 

334:     function getReward(address _user) public nonReentrant onlyDistribution updateReward(_user) {

376:     function setGenesisPool(address _genesisPool) external onlyGenesisManager{

382:     function notifyRewardAmount(address token, uint256 reward) external nonReentrant isNotEmergency onlyDistribution updateReward(address(0)) {

438:     function setGenesisPoolManager(address _genesisPoolManager) external onlyOwner {

```

```solidity
File: ./contracts/GenesisPool.sol

73:     function setGenesisPoolInfo(GenesisInfo calldata _genesisInfo, TokenAllocation calldata _allocationInfo, address _auction) external onlyManager(){

117:     function rejectPool() external onlyManager {

124:     function approvePool(address _pairAddress) external onlyManager {

131:     function depositToken(address spender, uint256 amount) external onlyManager returns (bool) {

181:     function transferIncentives(address gauge, address external_bribe, address internal_bribe) external onlyManager {

201:     function setPoolStatus(PoolStatus status) external onlyManager {

243:     function launch(address router, uint256 maturityTime) external onlyManager {

330:     function deductAmount(address account, uint256 gaugeTokenAmount) external onlyGauge {

348:     function deductAllAmount(address account) external onlyGauge {

395:     function setAuction(address _auction) external onlyManagerOrProtocol {

401:     function setMaturityTime(uint256 _maturityTime) external onlyManager{

405:     function setStartTime(uint256 _startTime) external onlyManager{

```

```solidity
File: ./contracts/GenesisPoolManager.sol

313:     function setRouter (address _router) external onlyOwner {

```

```solidity
File: ./contracts/PermissionsRegistry.sol

83:     function addRole(string memory role) external onlyBlackMultisig {

93:     function removeRole(string memory role) external onlyBlackMultisig {

124:     function setRoleFor(address c, string memory role) external onlyBlackMultisig {

140:     function removeRoleFrom(address c, string memory role) external onlyBlackMultisig {

```

```solidity
File: ./contracts/RewardsDistributor.sol

265:     function setAVM(address _avm) external onlyOwner {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

46:     function setTopNPools(address[] memory _poolAddresses) external onlyExecutor {

59:     function setTopN() external onlyAVM {

68:     function setAVM(address _avm) external onlyOwner {

75:     function setExecutor (address _executor) external onlyOwnerOrExecutor {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

45:     function setVoteWeights(uint256[] calldata _weights) external onlyExecutor {

55:     function setAVM(address _avm) external onlyOwner {

61:     function setTopN() external onlyAVM {

66:     function setExecutor(address _executor) external onlyOwnerOrExecutor {

```

```solidity
File: ./contracts/Thenian.sol

43:     function withdraw() external onlyOwner {

48:     function setRoot(bytes32 _root) external onlyOwner {

52:     function setNftPrice(uint256 _nftPrice) external onlyOwner {

59:     function reserveNFTs(address _to, uint256 _amount) external onlyOwner {

88:     function setBaseURI(string memory baseURI_) external onlyOwner {

```

```solidity
File: ./contracts/VoterV3.sol

105:     function setEpochOwner(address _epochOwner) external onlyOwner {

138:     function reset(uint256 _tokenId) external onlyNewEpoch(_tokenId) nonReentrant {

```

```solidity
File: ./contracts/chainlink/EpochController.sol

67:     function setAutomationRegistry(address _automationRegistry) external onlyOwner {

72:     function setAutomationRegistry2(address _automationRegistry2) external onlyOwner {

77:     function setGaugeManager(address _gaugeManager) external onlyOwner {

82:     function setMinter(address _minter) external onlyOwner {

87:     function setGenesisManager(address _genesisManager) external onlyOwner {

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

30:      function addAuction(address _auction) external onlyManager {

40:     function replaceAuction(address _auction, uint256 _pos) external onlyManager {

53:     function removeAuction(uint256 _pos) external onlyManager {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

131:     function addRewardToBribe(address _token, address __bribe) external onlyAllowed {

136:     function addRewardsToBribe(address[] memory _token, address __bribe) external onlyAllowed {

144:     function addRewardToBribes(address _token, address[] memory __bribes) external onlyAllowed {

153:     function addRewardsToBribes(address[][] memory _token, address[] memory __bribes) external onlyAllowed {

166:     function setBribeVoter(address[] memory _bribe, address _voter) external onlyOwner {

174:     function setBribeAVM(address[] memory _bribe, address _avm) external onlyOwner {

182:     function setBribeMinter(address[] memory _bribe, address _minter) external onlyOwner {

190:     function setBribeOwner(address[] memory _bribe, address _owner) external onlyOwner {

198:     function recoverERC20From(address[] memory _bribe, address[] memory _tokens, uint[] memory _amounts) external onlyOwner {

209:     function recoverERC20AndUpdateData(address[] memory _bribe, address[] memory _tokens, uint[] memory _amounts) external onlyOwner {

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

81:     function setRewarderPid( address[] memory _gauges, uint[] memory _pids) external onlyAllowed {

89:     function setGaugeRewarder( address[] memory _gauges, address[] memory _rewarder) external onlyAllowed {

97:     function setDistribution(address[] memory _gauges,  address distro) external onlyAllowed {

105:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {

113:     function setGenesisManager(address _gauge, address _genesisManager) external onlyAllowed {

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

35:     function setGenesisManager(address _genesisManager) external onlyManager {

44:     function removeGenesisPool(address nativeToken) external onlyManager {

52:     function removeGenesisPool(address nativeToken, uint256 index) external onlyManager {

56:     function createGenesisPool(address tokenOwner, address nativeToken, address fundingToken) external onlyManager returns (address genesisPool) {

```

```solidity
File: ./contracts/factories/PairFactory.sol

63:     function setFeeManager(address _feeManager) external onlyManager {

72:     function setStakingFees(uint256 _newFee) external onlyManager {

77:     function setStakingFeeAddress(address _feehandler) external onlyManager {

82:     function setDibs(address _dibs) external onlyManager {

87:     function setReferralFee(uint256 _refFee) external onlyManager {

91:     function setFee(bool _stable, uint256 _fee) external onlyManager {

101:     function setCustomFees(address _pairAddress, uint256 _fees) external onlyManager {

107:     function setCustomReferralFee(address _pairAddress, uint256 _refFee) external onlyManager {

130:     function setIsGenesis(address _pairAddress, bool status) external onlyManager {

153:     function setGenesisManager(address _genesisManager) external onlyManager {

```

```solidity
File: ./contracts/governance/Governor.sol

812:     function updateQuorumNumerator(uint256 newQuorumNumerator) external virtual onlyGovernance {

```

```solidity
File: ./contracts/governance/L2GovernorVotesQuorumFraction.sol

63:     function updateQuorumNumerator(uint256 newQuorumNumerator) external virtual onlyGovernance {

```

### <a name="GAS-16"></a>[GAS-16] `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)
Pre-increments and pre-decrements are cheaper.

For a `uint256 i` variable, the following is true with the Optimizer enabled at 10k:

**Increment:**

- `i += 1` is the most expensive form
- `i++` costs 6 gas less than `i += 1`
- `++i` costs 5 gas less than `i++` (11 gas less than `i += 1`)

**Decrement:**

- `i -= 1` is the most expensive form
- `i--` costs 11 gas less than `i -= 1`
- `--i` costs 5 gas less than `i--` (16 gas less than `i -= 1`)

Note that post-increments (or post-decrements) return the old value before incrementing or decrementing, hence the name *post-increment*:

```solidity
uint i = 1;  
uint j = 2;
require(j == i++, "This will be false as i is incremented after the comparison");
```
  
However, pre-increments (or pre-decrements) return the new value:
  
```solidity
uint i = 1;  
uint j = 2;
require(j == ++i, "This will be true as i is incremented before the comparison");
```

In the pre-increment case, the compiler has to create a temporary variable (when used) for returning `1` instead of `2`.

Consider using pre-increments and pre-decrements where they are relevant (meaning: not where post-increments/decrements logic are relevant).

*Saves 5 gas per instance*

*Instances (170)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

77:         for (uint256 i = start; i < start + length; i++) {

89:         for (uint256 i = start; i < start + length; i++) {

113:         for(uint i=0; i<locks.length; i++) {

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

73:             nextAvailableAVMIndex++;

109:         for (uint256 i = 0; i < avms.length; i++) {

176:         for(uint i=0; i<avms.length; i++) {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

104:         for ( i ; i < _gauges.length; i++){

111:         for ( i ; i < _gauges.length; i++){

119:         for ( i ; i < _gauges.length; i++){

```

```solidity
File: ./contracts/BlackClaims.sol

170:         for (uint256 i = 0; i < players_.length; i++) {

```

```solidity
File: ./contracts/Bribes.sol

118:             for (uint256 i = 0; i < numEpochs; i++) {

279:         for (uint256 i = 0; i < _length; i++) {

```

```solidity
File: ./contracts/GaugeManager.sol

144:     --------------------------------------------------------------------------------

145:     --------------------------------------------------------------------------------

147:     --------------------------------------------------------------------------------

148:     --------------------------------------------------------------------------------

149:     ----------------------------------------------------------------------------- */

159:         for(i; i < _pool.length; i++){

272:         for (uint i = 0; i < 20; i++) {

307:         for (i; i < poolsLength; i++) {

314:         for (uint256 x = _start; x < _finish; x++) {

347:         for (x; x < stop; x++) {

354:         for (uint256 x = _start; x < _finish; x++) {

363:         for (uint256 x = 0; x < _gauges.length; x++) {

396:     --------------------------------------------------------------------------------

397:     --------------------------------------------------------------------------------

399:     --------------------------------------------------------------------------------

400:     --------------------------------------------------------------------------------

401:     ----------------------------------------------------------------------------- */

431:     --------------------------------------------------------------------------------

432:     --------------------------------------------------------------------------------

434:     --------------------------------------------------------------------------------

435:     --------------------------------------------------------------------------------

436:     ----------------------------------------------------------------------------- */

507:         for (uint256 i = 0; i < _gauges.length; i++) {

514:         for (uint256 i = 0; i < _nftIds.length; i++) {

522:         for (uint256 i = 0; i < _bribes.length; i++) {

```

```solidity
File: ./contracts/GaugeV2.sol

117:     --------------------------------------------------------------------------------

118:     --------------------------------------------------------------------------------

120:     --------------------------------------------------------------------------------

121:     --------------------------------------------------------------------------------

122:     ----------------------------------------------------------------------------- */

160:     --------------------------------------------------------------------------------

161:     --------------------------------------------------------------------------------

163:     --------------------------------------------------------------------------------

164:     --------------------------------------------------------------------------------

165:     ----------------------------------------------------------------------------- */

214:     --------------------------------------------------------------------------------

215:     --------------------------------------------------------------------------------

217:     --------------------------------------------------------------------------------

218:     --------------------------------------------------------------------------------

219:     ----------------------------------------------------------------------------- */

369:     --------------------------------------------------------------------------------

370:     --------------------------------------------------------------------------------

372:     --------------------------------------------------------------------------------

373:     --------------------------------------------------------------------------------

374:     ----------------------------------------------------------------------------- */

```

```solidity
File: ./contracts/GenesisPool.sol

102:         for(i = 0; i < _incentivesCnt; i++){

189:         for(i = 0; i < _incentivesCnt; i++){

301:             for(i = 0; i < incentivesCnt; i++){

315:         for(i = 0; i < _incentivesCnt; i++){

381:         for(i = 0; i < incentivesCnt; i++){

```

```solidity
File: ./contracts/GenesisPoolManager.sol

196:         for(i = _proposedTokensCnt; i > 0; i--){

239:             for(i = _proposedTokensCnt; i > 0; i--){

```

```solidity
File: ./contracts/GlobalRouter.sol

178:         for (uint i = 0; i < routes.length; i++) {

246:     -------------------------------

248:     -------------------------------

249:     ---------------------------- */

275:     -------------------------------

277:     -------------------------------

278:     ---------------------------- */

```

```solidity
File: ./contracts/MinterUpgradeable.sol

92:             for (uint i = 0; i < claimants.length; i++) {

162:             epochCount++;

```

```solidity
File: ./contracts/Pair.sol

300:         for (uint i = 0; i < _prices.length; i++) {

437:         for (uint i = 0; i < 255; i++) {

```

```solidity
File: ./contracts/PermissionsRegistry.sol

76:     --------------------------------------------------------------------------------

78:     --------------------------------------------------------------------------------

79:     ----------------------------------------------------------------------------- */

97:         for(uint i = 0; i < _roles.length; i++){

108:         for(uint i = 0; i < rta.length; i++){

111:             for(uint k = 0; k < __roles.length; k++){

148:         for(uint i = 0; i < rta.length; i++){

156:         for(uint i = 0; i < atr.length; i++){

178:         for(uint i = 0; i < _roles.length; i++){

203:         for(i; i < _temp.length; i++){

227:     --------------------------------------------------------------------------------

229:     --------------------------------------------------------------------------------

230:     ----------------------------------------------------------------------------- */

```

```solidity
File: ./contracts/RewardsDistributor.sol

85:         for (uint i = 0; i < 20; i++) {

115:         for (uint i = 0; i < 128; i++) {

147:         for (uint i = 0; i < 50; i++) {

180:         for (uint i = 0; i < 50; i++) {

225:         for (uint i = 0; i < _tokenIds.length; i++) {

```

```solidity
File: ./contracts/RouterV2.sol

265:         for (uint i = 0; i < routes.length; i++) {

500:         for (uint i = 0; i < routes.length; i++) {

706:         for (uint i; i < routes.length; i++) {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

51:         for (uint256 i = 0; i < _poolAddresses.length; i++) {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

49:         for (uint256 i = 0; i < _weights.length; i++) {

```

```solidity
File: ./contracts/Thenian.sol

63:         for (uint256 i = 0; i < _amount; i++) {

101:             for (uint256 index; index < tokenCount; index++) {

160:         for (uint256 i = 0; i < amount; i++) {

```

```solidity
File: ./contracts/TokenHandler.sol

54:         for(i = 0; i < _tokens.length; i++){

74:         for(i = 0; i < _token.length; i++){

90:         for (i = 0; i < length; i++) {

113:         for(i = 0; i < _tokens.length; i++){

139:         for (i = 0; i < length; i++) {

152:         if(bucketId == volatilityBucketCount + 1) volatilityBucketCount++;

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

29:             digits++;

```

```solidity
File: ./contracts/VoterV3.sol

71:     --------------------------------------------------------------------------------

72:     --------------------------------------------------------------------------------

74:     --------------------------------------------------------------------------------

75:     --------------------------------------------------------------------------------

76:     ----------------------------------------------------------------------------- */

94:     --------------------------------------------------------------------------------

95:     --------------------------------------------------------------------------------

97:     --------------------------------------------------------------------------------

98:     --------------------------------------------------------------------------------

99:     ----------------------------------------------------------------------------- */

129:     --------------------------------------------------------------------------------

130:     --------------------------------------------------------------------------------

132:     --------------------------------------------------------------------------------

133:     --------------------------------------------------------------------------------

134:     ----------------------------------------------------------------------------- */

217:         for (uint i = 0; i < _poolCnt; i++) {

222:         for (uint256 i = 0; i < _poolCnt; i++) {

259:     --------------------------------------------------------------------------------

260:     --------------------------------------------------------------------------------

262:     --------------------------------------------------------------------------------

263:     --------------------------------------------------------------------------------

264:     ----------------------------------------------------------------------------- */

```

```solidity
File: ./contracts/VotingEscrow.sol

1238:         for (uint i = 0; i < _tokenIds.length; i++) {

1254:         for (uint i = 0; i < _tokenIds.length; i++) {

1272:         for (uint i = 0; i < _tokenIds.length; i++) {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

71:     --------------------------------------------------------------------------------

72:     --------------------------------------------------------------------------------

74:     --------------------------------------------------------------------------------

75:     --------------------------------------------------------------------------------

76:     ----------------------------------------------------------------------------- */

113:         for(i; i < defaultRewardToken.length; i++){

123:     --------------------------------------------------------------------------------

124:     --------------------------------------------------------------------------------

126:     --------------------------------------------------------------------------------

127:     --------------------------------------------------------------------------------

128:     ----------------------------------------------------------------------------- */

138:         for ( i ; i < _token.length; i++){

146:         for ( i ; i < __bribes.length; i++){

156:         for ( i ; i < __bribes.length; i++){

158:             for(k = 0; k < _token.length; k++){

168:         for(i; i< _bribe.length; i++){

176:         for(i; i<_bribe.length; i++){

184:         for(i; i< _bribe.length; i++){

192:         for(i; i< _bribe.length; i++){

203:         for(i; i< _bribe.length; i++){

214:         for(i; i< _bribe.length; i++){

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

69:         for ( i ; i < _gauges.length; i++){

76:         for ( i ; i < _gauges.length; i++){

84:         for ( i ; i < _gauges.length; i++){

92:         for ( i ; i < _gauges.length; i++){

99:         for ( i ; i < _gauges.length; i++){

108:         for ( i ; i < _gauges.length; i++){

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

47:         for (i = 0; i < length; i++) {

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

72:                         i++;

77:                             length--;

79:                             i++;

101:                     for (uint i = 0; i < dstRepOld.length; i++) {

145:                         i++;

150:                             length--;

152:                             i++;

176:                     for (uint i = 0; i < dstRepOld.length; i++) {

182:                 for (uint i = 0; i < ownerTokenCount; i++) {

```

### <a name="GAS-17"></a>[GAS-17] Using `private` rather than `public` for constants, saves gas
If needed, the values can be read from the verified contract source code, or if there are multiple values there can be a single getter function that [returns a tuple](https://github.com/code-423n4/2022-08-frax/blob/90f55a9ce4e25bceed3a74290b854341d8de6afa/src/contracts/FraxlendPair.sol#L156-L178) of the values of all currently-public constants. Saves **3406-3606 gas** in deployment gas due to the compiler not having to create non-payable getter functions for deployment calldata, not having to store the bytes of the value outside of where it's used, and not adding another entry to the method ID table

*Instances (32)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

14:     uint256 public constant MAX_LOCKS = 1024;

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

24:     uint256 public constant MAX_TOP_N = 100; // can be changed but has to be assigned on the instantiation

```

```solidity
File: ./contracts/Black.sol

8:     string public constant name = "BLACKHOLE";

9:     string public constant symbol = "BLACK";

10:     uint8 public constant decimals = 18;

```

```solidity
File: ./contracts/BlackGovernor.sol

16:     uint256 public constant MAX_PROPOSAL_NUMERATOR = 100; // max 10%

17:     uint256 public constant PROPOSAL_DENOMINATOR = 1000;

```

```solidity
File: ./contracts/GaugeManager.sol

64:     bytes32 public constant COMMUNITY_FEE_WITHDRAWER_ROLE = keccak256('COMMUNITY_FEE_WITHDRAWER');

65:     bytes32 public constant COMMUNITY_FEE_VAULT_ADMINISTRATOR = keccak256('COMMUNITY_FEE_VAULT_ADMINISTRATOR');

```

```solidity
File: ./contracts/MinterUpgradeable.sol

24:     uint public constant MAX_TEAM_RATE = 500; // 5%

25:     uint256 public constant TAIL_START = 8_969_150 * 1e18; //TAIL EMISSIONS 

27:     uint256 public constant NUDGE = 1; //delta added in tail emissions rate after voting

28:     uint256 public constant MAXIMUM_TAIL_RATE = 100; //maximum tail emissions rate after voting

29:     uint256 public constant MINIMUM_TAIL_RATE = 1; //maximum tail emissions rate after voting

30:     uint256 public constant MAX_BPS = 10_000; 

31:     uint256 public constant WEEKLY_DECAY = 9_900; //for epoch 15 to 66 growth

32:     uint256 public constant WEEKLY_GROWTH = 10_300; //for epoch 1 to 14 growth

33:     uint256 public constant PROPOSAL_INCREASE = 10_100; // 1% increment after the 67th epoch based on proposal

34:     uint256 public constant PROPOSAL_DECREASE = 9_900; // 1% increment after the 67th epoch based on proposal

```

```solidity
File: ./contracts/Pair.sol

18:     uint8 public constant decimals = 18;

```

```solidity
File: ./contracts/VotingEscrow.sol

159:     string constant public name = "veBlack";

160:     string constant public symbol = "veBLACK";

161:     string constant public version = "1.0.0";

162:     uint8 constant public decimals = 18;

1205:     bytes32 public constant DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)");

1208:     bytes32 public constant DELEGATION_TYPEHASH = keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");

```

```solidity
File: ./contracts/factories/PairFactory.sol

18:     uint256 public constant MAX_FEE = 25; // 0.25%

```

```solidity
File: ./contracts/governance/Governor.sol

39:     bytes32 public constant BALLOT_TYPEHASH = keccak256("Ballot(uint256 proposalId,uint8 support)");

40:     bytes32 public constant EXTENDED_BALLOT_TYPEHASH =

```

```solidity
File: ./contracts/governance/L2Governor.sol

38:     bytes32 public constant BALLOT_TYPEHASH = keccak256("Ballot(uint256 proposalId,uint8 support)");

39:     bytes32 public constant EXTENDED_BALLOT_TYPEHASH =

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

27:     uint public constant MAX_DELEGATES = 1024; // avoid too much gas

```

### <a name="GAS-18"></a>[GAS-18] Use shift right/left instead of division/multiplication if possible
While the `DIV` / `MUL` opcode uses 5 gas, the `SHR` / `SHL` opcode only uses 3 gas. Furthermore, beware that Solidity's division operation also includes a division-by-0 prevention which is bypassed using shifting. Eventually, overflow checks are never performed for shift operations as they are done for arithmetic operations. Instead, the result is always truncated, so the calculation can be unchecked in Solidity version `0.8+`
- Use `>> 1` instead of `/ 2`
- Use `>> 2` instead of `/ 4`
- Use `<< 3` instead of `* 8`
- ...
- Use `>> 5` instead of `/ 2^5 == / 32`
- Use `<< 6` instead of `* 2^6 == * 64`

TL;DR:
- Shifting left by N is like multiplying by 2^N (Each bits to the left is an increased power of 2)
- Shifting right by N is like dividing by 2^N (Each bits to the right is a decreased power of 2)

*Saves around 2 gas + 20 for unchecked per instance*

*Instances (20)*:
```solidity
File: ./contracts/Bribes.sol

152:             uint256 center = upper - (upper - lower) / 2; // ceil, avoiding overflow

184:             uint256 center = upper - (upper - lower) / 2; // ceil, avoiding overflow

```

```solidity
File: ./contracts/GaugeManager.sol

273:             str[2 + i * 2] = alphabet[uint8(value[i] >> 4)];

274:             str[3 + i * 2] = alphabet[uint8(value[i] & 0x0f)];

```

```solidity
File: ./contracts/GenesisPool.sol

324:         uint256 _depositerLiquidity = liquidity / 2;

331:         uint256 _depositerLiquidity = liquidity / 2;

349:         uint256 _depositerLiquidity = liquidity / 2;

```

```solidity
File: ./contracts/GlobalRouter.sol

67:             uint x = y / 2 + 1;

70:                 x = (y / x + x) / 2;

```

```solidity
File: ./contracts/RewardsDistributor.sol

117:             uint _mid = (_min + _max + 2) / 2;

```

```solidity
File: ./contracts/RouterV2.sol

67:             uint x = y / 2 + 1;

70:                 x = (y / x + x) / 2;

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

8:     uint256 internal constant MAX_LOCK_DURATION = 86400 * 365 * 4;

```

```solidity
File: ./contracts/libraries/Math.sol

14:             uint x = y / 2 + 1;

17:                 x = (y / x + x) / 2;

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

54:             uint center = upper - (upper - lower) / 2; // ceil, avoiding overflow

89:             uint _mid = (_min + _max + 1) / 2;

172:             uint _mid = (_min + _max + 1) / 2;

220:             uint center = upper - (upper - lower) / 2; // ceil, avoiding overflow

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

209:             uint32 center = upper - (upper - lower) / 2; // ceil, avoiding overflow

```

### <a name="GAS-19"></a>[GAS-19] Splitting require() statements that use && saves gas

*Instances (48)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

90:         require(avmIdxOneBased > 0 && avmIdxOneBased - 1 < avms.length, "out of range"); // is this necessary

183:         require(_topN > 0 && _topN < MAX_TOP_N, "invalid value");

198:         require(avmIdxOneBased > 0 && avmIdxOneBased - 1 < avms.length, "out of range");

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

270:         require(success && (data.length == 0 || abi.decode(data, (bool))));

```

```solidity
File: ./contracts/Black.sol

35:         require(msg.sender == minter && !initialMinted);

```

```solidity
File: ./contracts/BlackClaims.sol

131:         require(claim_duration_ >= 1 days && claim_duration_ < 1000 days, "CLAIM DURATION OUT OF BOUNDS");

203:         require(percent>=50&&percent<=100, "Percent out of bounds");

```

```solidity
File: ./contracts/Bribes.sol

63:         require(_bribeFactory != address(0) && _voter != address(0) && _gaugeManager != address(0) && _owner != address(0), "ZA");

```

```solidity
File: ./contracts/GaugeManager.sol

208:         require(ITokenHandler(tokenHandler).isWhitelisted(tokenA) && ITokenHandler(tokenHandler).isWhitelisted(tokenB), "!WHITELISTED");

211:         require(tokenA != address(0) && tokenB != address(0), "!TOKENS");

521:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId) || (address(avm)!= address(0) && avm.getOriginalOwner(_tokenId) == msg.sender), "NAO");

```

```solidity
File: ./contracts/GenesisPoolManager.sol

118:         require(genesisPoolInfo.duration >= MIN_DURATION && genesisPoolInfo.threshold >= MIN_THRESHOLD && genesisPoolInfo.startPrice > 0, "INV_GENESIS");

119:         require(genesisPoolInfo.supplyPercent > 0 && genesisPoolInfo.supplyPercent <= 10000, "INV"); 

```

```solidity
File: ./contracts/GlobalRouter.sol

284:         require(success && (data.length == 0 || abi.decode(data, (bool))));

296:         require(success && (data.length == 0 || abi.decode(data, (bool))));

```

```solidity
File: ./contracts/Pair.sol

368:         require(amount0 > 0 && amount1 > 0, 'ILB'); // Pair: INSUFFICIENT_LIQUIDITY_BURNED

384:         require(amount0Out < _reserve0 && amount1Out < _reserve1, 'IL'); // Pair: INSUFFICIENT_LIQUIDITY

390:         require(to != _token0 && to != _token1, 'IT'); // Pair: INVALID_TO

533:         require(recoveredAddress != address(0) && recoveredAddress == owner, 'ISIG');

572:         require(success && (data.length == 0 || abi.decode(data, (bool))), "IST");

579:         require(success && (data.length == 0 || abi.decode(data, (bool))), "ISA");

```

```solidity
File: ./contracts/PairFees.sol

25:         require(success && (data.length == 0 || abi.decode(data, (bool))));

```

```solidity
File: ./contracts/RouterV2.sol

165:         require(token0 != address(0) && token0 != token1, 'IA');

176:         require(amountA > 0 && reserveA > 0 && reserveB > 0, 'INL');

348:         require(amountADesired >= amountAMin && amountBDesired >= amountBMin, "DLMA");

367:         require(amountA >= amountAMin && amountB >= amountBMin, "IAA");

384:         require(!(IBaseV1Factory(factory).isGenesis(pair) && IBaseV1Pair(pair).totalSupply() == 0), "NA");

434:         require(amountA >= amountAMin && amountB >= amountBMin, 'IAA');

649:         require(success && (data.length == 0 || abi.decode(data, (bool))), "IST");

656:         require(success && (data.length == 0 || abi.decode(data, (bool))), "ISTF");

```

```solidity
File: ./contracts/VotingEscrow.sol

322:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

841:         require(unlock_time > block.timestamp && (unlock_time <= block.timestamp + MAXTIME), 'IUT');

903:         require(!_locked.isSMNFT && !_locked.isPermanent, "!NORM");

906:         require(_locked.end > block.timestamp && _locked.amount > 0, 'EXP||ZV');

907:         require((isSMNFT || unlock_time > _locked.end) && (unlock_time <= block.timestamp + MAXTIME), 'IUT'); // IUT -> invalid unlock time

940:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

943:         require(!_locked.isSMNFT && !_locked.isPermanent, "!NORM");

970:         require(!_newLocked.isSMNFT && !_newLocked.isPermanent, "!NORM");

991:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

993:         require(!_newLocked.isSMNFT && _newLocked.isPermanent, "!NORM");

1085:         require(attachments[_from] == 0 && !voted[_from], "ATT");

1093:         require(_locked0.isPermanent ? (_locked0.isSMNFT ? _locked1.isSMNFT :  _locked1.isPermanent && !_locked1.isSMNFT) : true, "!MERGE");

1153:         require(attachments[_from] == 0 && !voted[_from], "ATT");

```

```solidity
File: ./contracts/factories/PairFactory.sol

131:         require(_pairAddress != address(0) && isPair[_pairAddress], "INVP");

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

26:         require(!(a == -1 && b == _INT256_MIN), "SignedSafeMath: multiplication overflow");

48:         require(!(b == -1 && a == _INT256_MIN), "SignedSafeMath: division overflow");

67:         require((b >= 0 && c <= a) || (b < 0 && c > a), "SignedSafeMath: subtraction overflow");

84:         require((b >= 0 && c >= a) || (b < 0 && c < a), "SignedSafeMath: addition overflow");

```

### <a name="GAS-20"></a>[GAS-20] Superfluous event fields
`block.timestamp` and `block.number` are added to event information by default so adding them manually wastes gas

*Instances (6)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

61:     event EmergencyActivated(address indexed gauge, uint256 timestamp);

62:     event EmergencyDeactivated(address indexed gauge, uint256 timestamp);

```

```solidity
File: ./contracts/Bribes.sol

369:     event RewardAdded(address indexed rewardToken, uint256 reward, uint256 startTimestamp);

```

```solidity
File: ./contracts/GaugeV2.sol

64:     event EmergencyActivated(address indexed gauge, uint256 timestamp);

65:     event EmergencyDeactivated(address indexed gauge, uint256 timestamp);

```

```solidity
File: ./contracts/chainlink/EpochController.sol

21:     event Logger(string addr, uint timestamp,uint blocknbr , bool x1, bool x2, string msg);

```

### <a name="GAS-21"></a>[GAS-21] `uint256` to `bool` `mapping`: Utilizing Bitmaps to dramatically save on Gas
https://soliditydeveloper.com/bitmaps

https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/BitMaps.sol

- [BitMaps.sol#L5-L16](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/BitMaps.sol#L5-L16):

```solidity
/**
 * @dev Library for managing uint256 to bool mapping in a compact and efficient way, provided the keys are sequential.
 * Largely inspired by Uniswap's https://github.com/Uniswap/merkle-distributor/blob/master/contracts/MerkleDistributor.sol[merkle-distributor].
 *
 * BitMaps pack 256 booleans across each bit of a single 256-bit slot of `uint256` type.
 * Hence booleans corresponding to 256 _sequential_ indices would only consume a single slot,
 * unlike the regular `bool` which would consume an entire slot for a single value.
 *
 * This results in gas savings in two ways:
 *
 * - Setting a zero value to non-zero only once every 256 times
 * - Accessing the same warm slot for every 256 _sequential_ indices
 */
```

*Instances (2)*:
```solidity
File: ./contracts/MinterUpgradeable.sol

52:     mapping(uint256 => bool) public proposals;

```

```solidity
File: ./contracts/TokenHandler.sol

10:     mapping(uint256 => bool) public isWhitelistedNFT;

```

### <a name="GAS-22"></a>[GAS-22] Increments/decrements can be unchecked in for-loops
In Solidity 0.8+, there's a default overflow check on unsigned integers. It's possible to uncheck this in for-loops and save some gas at each iteration, but at the cost of some code readability, as this uncheck cannot be made inline.

[ethereum/solidity#10695](https://github.com/ethereum/solidity/issues/10695)

The change would be:

```diff
- for (uint256 i; i < numIterations; i++) {
+ for (uint256 i; i < numIterations;) {
 // ...  
+   unchecked { ++i; }
}  
```

These save around **25 gas saved** per instance.

The same can be applied with decrements (which should use `break` when `i == 0`).

The risk of overflow is non-existent for `uint256`.

*Instances (93)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

77:         for (uint256 i = start; i < start + length; i++) {

89:         for (uint256 i = start; i < start + length; i++) {

113:         for(uint i=0; i<locks.length; i++) {

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

109:         for (uint256 i = 0; i < avms.length; i++) {

176:         for(uint i=0; i<avms.length; i++) {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

104:         for ( i ; i < _gauges.length; i++){

111:         for ( i ; i < _gauges.length; i++){

119:         for ( i ; i < _gauges.length; i++){

```

```solidity
File: ./contracts/BlackClaims.sol

170:         for (uint256 i = 0; i < players_.length; i++) {

```

```solidity
File: ./contracts/Bribes.sol

118:             for (uint256 i = 0; i < numEpochs; i++) {

279:         for (uint256 i = 0; i < _length; i++) {

```

```solidity
File: ./contracts/GaugeManager.sol

159:         for(i; i < _pool.length; i++){

272:         for (uint i = 0; i < 20; i++) {

307:         for (i; i < poolsLength; i++) {

314:         for (uint256 x = _start; x < _finish; x++) {

347:         for (x; x < stop; x++) {

354:         for (uint256 x = _start; x < _finish; x++) {

363:         for (uint256 x = 0; x < _gauges.length; x++) {

507:         for (uint256 i = 0; i < _gauges.length; i++) {

514:         for (uint256 i = 0; i < _nftIds.length; i++) {

522:         for (uint256 i = 0; i < _bribes.length; i++) {

```

```solidity
File: ./contracts/GenesisPool.sol

102:         for(i = 0; i < _incentivesCnt; i++){

189:         for(i = 0; i < _incentivesCnt; i++){

301:             for(i = 0; i < incentivesCnt; i++){

315:         for(i = 0; i < _incentivesCnt; i++){

381:         for(i = 0; i < incentivesCnt; i++){

```

```solidity
File: ./contracts/GenesisPoolManager.sol

196:         for(i = _proposedTokensCnt; i > 0; i--){

239:             for(i = _proposedTokensCnt; i > 0; i--){

```

```solidity
File: ./contracts/GlobalRouter.sol

178:         for (uint i = 0; i < routes.length; i++) {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

92:             for (uint i = 0; i < claimants.length; i++) {

```

```solidity
File: ./contracts/Pair.sol

300:         for (uint i = 0; i < _prices.length; i++) {

437:         for (uint i = 0; i < 255; i++) {

```

```solidity
File: ./contracts/PermissionsRegistry.sol

97:         for(uint i = 0; i < _roles.length; i++){

108:         for(uint i = 0; i < rta.length; i++){

111:             for(uint k = 0; k < __roles.length; k++){

148:         for(uint i = 0; i < rta.length; i++){

156:         for(uint i = 0; i < atr.length; i++){

178:         for(uint i = 0; i < _roles.length; i++){

203:         for(i; i < _temp.length; i++){

```

```solidity
File: ./contracts/RewardsDistributor.sol

85:         for (uint i = 0; i < 20; i++) {

115:         for (uint i = 0; i < 128; i++) {

147:         for (uint i = 0; i < 50; i++) {

180:         for (uint i = 0; i < 50; i++) {

225:         for (uint i = 0; i < _tokenIds.length; i++) {

```

```solidity
File: ./contracts/RouterV2.sol

265:         for (uint i = 0; i < routes.length; i++) {

500:         for (uint i = 0; i < routes.length; i++) {

706:         for (uint i; i < routes.length; i++) {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

51:         for (uint256 i = 0; i < _poolAddresses.length; i++) {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

49:         for (uint256 i = 0; i < _weights.length; i++) {

```

```solidity
File: ./contracts/Thenian.sol

63:         for (uint256 i = 0; i < _amount; i++) {

101:             for (uint256 index; index < tokenCount; index++) {

160:         for (uint256 i = 0; i < amount; i++) {

```

```solidity
File: ./contracts/TokenHandler.sol

54:         for(i = 0; i < _tokens.length; i++){

74:         for(i = 0; i < _token.length; i++){

90:         for (i = 0; i < length; i++) {

113:         for(i = 0; i < _tokens.length; i++){

139:         for (i = 0; i < length; i++) {

```

```solidity
File: ./contracts/VoterV3.sol

149:         for (uint256 i = 0; i < _poolVoteCnt; i ++) {

184:         for (uint256 i = 0; i < _poolCnt; i ++) {

217:         for (uint i = 0; i < _poolCnt; i++) {

222:         for (uint256 i = 0; i < _poolCnt; i++) {

```

```solidity
File: ./contracts/VotingEscrow.sol

670:             for (uint i = 0; i < 255; ++i) {

1238:         for (uint i = 0; i < _tokenIds.length; i++) {

1254:         for (uint i = 0; i < _tokenIds.length; i++) {

1272:         for (uint i = 0; i < _tokenIds.length; i++) {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

113:         for(i; i < defaultRewardToken.length; i++){

138:         for ( i ; i < _token.length; i++){

146:         for ( i ; i < __bribes.length; i++){

156:         for ( i ; i < __bribes.length; i++){

158:             for(k = 0; k < _token.length; k++){

168:         for(i; i< _bribe.length; i++){

176:         for(i; i<_bribe.length; i++){

184:         for(i; i< _bribe.length; i++){

192:         for(i; i< _bribe.length; i++){

203:         for(i; i< _bribe.length; i++){

214:         for(i; i< _bribe.length; i++){

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

69:         for ( i ; i < _gauges.length; i++){

76:         for ( i ; i < _gauges.length; i++){

84:         for ( i ; i < _gauges.length; i++){

92:         for ( i ; i < _gauges.length; i++){

99:         for ( i ; i < _gauges.length; i++){

108:         for ( i ; i < _gauges.length; i++){

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

47:         for (i = 0; i < length; i++) {

```

```solidity
File: ./contracts/governance/Governor.sol

343:         for (uint256 i = 0; i < targets.length; ++i) {

360:             for (uint256 i = 0; i < targets.length; ++i) {

```

```solidity
File: ./contracts/governance/L2Governor.sol

334:         for (uint256 i = 0; i < targets.length; ++i) {

351:             for (uint256 i = 0; i < targets.length; ++i) {

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

84:         for (uint i = 0; i < 128; ++i) {

167:         for (uint i = 0; i < 128; ++i) {

192:         for (uint i = 0; i < 255; ++i) {

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

101:                     for (uint i = 0; i < dstRepOld.length; i++) {

176:                     for (uint i = 0; i < dstRepOld.length; i++) {

182:                 for (uint i = 0; i < ownerTokenCount; i++) {

```

### <a name="GAS-23"></a>[GAS-23] Use != 0 instead of > 0 for unsigned integer comparison

*Instances (145)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

90:         require(avmIdxOneBased > 0 && avmIdxOneBased - 1 < avms.length, "out of range"); // is this necessary

183:         require(_topN > 0 && _topN < MAX_TOP_N, "invalid value");

198:         require(avmIdxOneBased > 0 && avmIdxOneBased - 1 < avms.length, "out of range");

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

221:         if (claimed0 > 0 || claimed1 > 0) {

229:             if (_dibsFeeToken0 > 0) {

234:             if (_dibsFeeToken1 > 0) {

242:             if (_fees0  > 0) {

247:             if (_fees1  > 0) {

268:         require(token.code.length > 0);

```

```solidity
File: ./contracts/BlackClaims.sol

77:         require(start_time_ > 0, "CANNOT START AT 0");

88:         _finalized = season.claim_end_time > 0;

111:         require(_season.start_time > 0, "SEASON NOT FOUND");

113:         require(_remaining_reward_amount > 0, "ZERO_REMAINING_AMOUNT");

128:         require(_season.start_time > 0, "SEASON NOT FOUND");

130:         require(_season.reward_amount>0, "NO REWARD AMOUNT");

146:         require(_season.start_time > 0, "SEASON NOT FOUND");

148:         require(_season.reward_amount>0, "NO REWARD AMOUNT");

164:         require(_season.start_time > 0, "SEASON NOT FOUND");

191:         require(_reward > 0, "MUST HAVE A NON ZERO REWARD");

```

```solidity
File: ./contracts/Bribes.sol

117:         if (numEpochs > 0) {

212:         require(amount > 0, "ZV");

228:             _nCheckPoints > 0 &&

245:             _nCheckPoints > 0 &&

259:         require(amount > 0, "ZV");

282:             if (_reward > 0) {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

73:         if (user.amount > 0) {

152:             if (lpSupply > 0) {

175:         require(amount > 0, "ZV");

```

```solidity
File: ./contracts/GaugeManager.sol

106:         require(_bribeFactory.code.length > 0, "CODELEN");

114:         require(_permissionRegistry.code.length > 0, "CODELEN");

121:         require(_voter.code.length > 0, "CODELEN");

129:         require(_genesisManager.code.length > 0, "CODELEN");

184:         require(_pool.code.length > 0, "CODELEN");

296:         if(totalWeight > 0) _ratio = amount * 1e18 / Math.max(totalWeight, 1);     // 1e18 adjustment is removed during claim

297:         if (_ratio > 0) {

379:             if (_claimable > 0 && isAlive[_gauge] && !IGauge(_gauge).emergency()) {

411:         if (_supplied > 0) {

417:             if (_delta > 0) {

447:         if (_claimable > 0) {

476:         require(_gauge.code.length > 0, "CODELEN");

494:         require(_internal.code.length > 0, "CODELEN");

500:         require(_external.code.length > 0, "CODELEN");

542:         require(_minter.code.length > 0, "CODELEN");

```

```solidity
File: ./contracts/GaugeV2.sol

223:         require(_totalAmount > 0, "ZV");

248:         require(amount > 0, "ZV");

273:         require(amount > 0, "ZV");

274:         require(_balanceOf(msg.sender) > 0, "ZV");

292:         require(_amount > 0, "ZV");

336:         if (reward > 0) {

350:         if (reward > 0) {

417:         if (claimed0 > 0 || claimed1 > 0) {

424:             if (_fees0  > 0) {

429:             if (_fees1  > 0) {

```

```solidity
File: ./contracts/GenesisPool.sol

95:         require(_incentivesToken.length > 0, "ZV");

105:             if(_token != address(0) && _amount > 0 && (_token == genesisInfo.nativeToken || tokenHandler.isConnector(_token))){

139:         require(_amount > 0, "ZV");

191:             if(_amount > 0)

244:         if(genesisInfo.maturityTime > 0) {

279:         if(_amount > 0){

290:         if(_amount > 0){

```

```solidity
File: ./contracts/GenesisPoolManager.sol

105:         require(allocationInfo.proposedNativeAmount > 0, "ZV");

106:         require(allocationInfo.proposedFundingAmount > 0, "ZV");

118:         require(genesisPoolInfo.duration >= MIN_DURATION && genesisPoolInfo.threshold >= MIN_THRESHOLD && genesisPoolInfo.startPrice > 0, "INV_GENESIS");

119:         require(genesisPoolInfo.supplyPercent > 0 && genesisPoolInfo.supplyPercent <= 10000, "INV"); 

172:         require(amount > 0, "ZV");

196:         for(i = _proposedTokensCnt; i > 0; i--){

239:             for(i = _proposedTokensCnt; i > 0; i--){

260:         if(length > 0 && index >= 1 && index <= length)

```

```solidity
File: ./contracts/GlobalRouter.sol

281:         require(token.code.length > 0);

293:         require(token.code.length > 0);

```

```solidity
File: ./contracts/MinterUpgradeable.sol

89:         if(max > 0){

```

```solidity
File: ./contracts/Pair.sol

146:         if (claimed0 > 0 || claimed1 > 0) {

167:         if (_referralFee > 0) {

180:         if (_ratio > 0) {

192:          if (_referralFee > 0) {

206:         if (_ratio > 0) {

217:         if (_supplied > 0) {

226:             if (_delta0 > 0) {

230:             if (_delta1 > 0) {

250:         if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {

349:         require(liquidity > 0, 'ILM'); // Pair: INSUFFICIENT_LIQUIDITY_MINTED

368:         require(amount0 > 0 && amount1 > 0, 'ILB'); // Pair: INSUFFICIENT_LIQUIDITY_BURNED

382:         require(amount0Out > 0 || amount1Out > 0, 'IOA'); // Pair: INSUFFICIENT_OUTPUT_AMOUNT

391:         if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens

392:         if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens

393:         if (data.length > 0) IPairCallee(to).hook(msg.sender, amount0Out, amount1Out, data); // callback, used for flash loans

400:         require(amount0In > 0 || amount1In > 0, 'IIA'); // Pair: INSUFFICIENT_INPUT_AMOUNT

404:         if (amount0In > 0) _update0(amount0In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token0 and move them out of pool

405:         if (amount1In > 0) _update1(amount1In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token1 and move them out of pool

570:         require(token.code.length > 0, "CODELEN");

576:         require(token.code.length > 0, "CODELEN");

```

```solidity
File: ./contracts/PairFees.sol

23:         require(token.code.length > 0);

31:         if (amount0 > 0) _safeTransfer(token0, recipient, amount0);

32:         if (amount1 > 0) _safeTransfer(token1, recipient, amount1);

39:         if(amount > 0 && isTokenZero){

43:         if(amount > 0 && !isTokenZero){

51:         if (toStake0 > 0){

55:         if (toStake1 > 0){

```

```solidity
File: ./contracts/RouterV2.sol

176:         require(amountA > 0 && reserveA > 0 && reserveB > 0, 'INL');

646:         require(token.code.length > 0, "CODELEN");

653:         require(token.code.length > 0, "CODELEN");

```

```solidity
File: ./contracts/TokenHandler.sol

45:         require(_permissionRegistry.code.length > 0, "!contract");

65:         require(_token.code.length > 0, "!contract");

85:         require(_token.code.length > 0, "!contract");

125:         require(_token.code.length > 0, "!contract");

134:         require(_token.code.length > 0, "!contract");

```

```solidity
File: ./contracts/VoterV3.sol

113:         require(_permissionRegistry.code.length > 0, "CODELEN");

245:         if (_usedWeight > 0) IVotingEscrow(_ve).voting(_tokenId);

```

```solidity
File: ./contracts/VotingEscrow.sol

391:         return size > 0;

629:             if (old_locked.end > block.timestamp && old_locked.amount > 0) {

633:             if (new_locked.end > block.timestamp && new_locked.amount > 0) {

652:         if (_epoch > 0) {

819:         require(_value > 0, "ZV"); // dev: need non-zero value

820:         require(_locked.amount > 0, 'ZL');

840:         require(_value > 0, "ZV"); // dev: need non-zero value

882:         assert(_value > 0); // dev: need non-zero value

883:         require(_locked.amount > 0, 'ZL');

906:         require(_locked.end > block.timestamp && _locked.amount > 0, 'EXP||ZV');

972:         require(_newLocked.amount > 0, "ZV");

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

33:         require(_auction.code.length > 0, "!contract");

43:         require(_auction.code.length > 0, "!contract");

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

204:             if(_amounts[i] > 0) IBribe(_bribe[i]).emergencyRecoverERC20(_tokens[i], _amounts[i]);

215:             if(_amounts[i] > 0) IBribe(_bribe[i]).emergencyRecoverERC20(_tokens[i], _amounts[i]);

```

```solidity
File: ./contracts/factories/PairFactory.sol

113:         if (customFees[_pairAddress] > 0) { 

120:         if (customReferralFees[_pairAddress] > 0) { 

```

```solidity
File: ./contracts/governance/Governor.sol

276:         require(targets.length > 0, "Governor: empty proposal");

```

```solidity
File: ./contracts/governance/L2Governor.sol

270:         require(targets.length > 0, "Governor: empty proposal");

```

```solidity
File: ./contracts/interfaces/IAlgebraFarmingProxyPluginFactory.sol

2: pragma solidity >=0.5.0;

```

```solidity
File: ./contracts/libraries/Math.sol

25:         for (uint256 y = 1 << 255; y > 0; y >>= 3) {

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

20:         require(_pairFactory.code.length > 0, "!contract");

29:         require(_gaugeFactory.code.length > 0, "!contract");

38:         require(_pairFactory.code.length > 0, "!contract");

50:         require(_gaugeFactory.code.length > 0, "!contract");

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

99:         if (upoint.permanent > 0){

102:         else if(upoint.smNFT > 0){

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

39:         if (n > 0 && self.checkpoints[account][n - 1].timestamp == currentTimestamp) {

53:         if (srcRep != dstRep && _tokenId > 0) {

56:                 uint[] storage srcRepOld = srcRepNum > 0

60:                 bool _isCheckpointInNewBlock = (srcRepNum > 0) ? (nextSrcRepNum != srcRepNum - 1) : true;

88:                 uint[] storage dstRepOld = dstRepNum > 0

92:                 bool _isCheckpointInNewBlock = (dstRepNum > 0) ? (nextDstRepNum != dstRepNum - 1) : true;

128:                 uint[] storage srcRepOld = srcRepNum > 0

132:                 bool _isCheckpointInNewBlock = (srcRepNum > 0) ? (nextSrcRepNum != srcRepNum - 1) : true;

162:                 uint[] storage dstRepOld = dstRepNum > 0

166:                 bool _isCheckpointInNewBlock = (dstRepNum > 0) ? (nextDstRepNum != dstRepNum - 1) : true;

```

### <a name="GAS-24"></a>[GAS-24] `internal` functions not called by the contract should be removed
If the functions are required by an interface, the contract should inherit from that interface and use the `override` keyword

*Instances (28)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

435:     function getCurrentFees(address _pair, address token_0, address token_1)  internal view returns(uint _tokenFees0, uint _tokenFees1, address _feesAddress) {

```

```solidity
File: ./contracts/GlobalRouter.sol

61:     function min(uint a, uint b) internal pure returns (uint) {

64:     function sqrt(uint y) internal pure returns (uint z) {

76:     function sub(uint x, uint y) internal pure returns (uint z) {

287:     function _safeTransferETH(address to, uint value) internal {

292:     function _safeTransfer(address token, address to, uint256 value) internal {

```

```solidity
File: ./contracts/Pair.sol

575:     function _safeApprove(address token,address spender,uint256 value) internal {

```

```solidity
File: ./contracts/RewardsDistributor.sol

112:     function _find_timestamp_user_epoch(address ve, uint tokenId, uint _timestamp, uint max_user_epoch) internal view returns (uint) {

```

```solidity
File: ./contracts/RouterV2.sol

61:     function min(uint a, uint b) internal pure returns (uint) {

64:     function sqrt(uint y) internal pure returns (uint z) {

76:     function sub(uint x, uint y) internal pure returns (uint z) {

```

```solidity
File: ./contracts/libraries/Base64.sol

12:     function encode(bytes memory data) internal pure returns (string memory) {

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

27:     function epochVoteStart(uint256 timestamp) internal pure returns (uint256) {

34:     function epochVoteEnd(uint256 timestamp) internal pure returns (uint256) {

41:     function isLastHour(uint256 timestamp) internal pure returns (bool) {

48:     function epochMultiples(uint256 duration) internal pure returns (uint256) {

55:     function isLastEpoch(uint256 timestamp, uint256 endTime) internal pure returns (bool) {

62:     function prevPreEpoch(uint256 timestamp) internal pure returns (uint256) {

69:     function currPreEpoch(uint256 timestamp) internal pure returns (uint256) {

```

```solidity
File: ./contracts/libraries/Math.sol

5:     function max(uint a, uint b) internal pure returns (uint) {

8:     function min(uint a, uint b) internal pure returns (uint) {

11:     function sqrt(uint y) internal pure returns (uint z) {

23:     function cbrt(uint256 n) internal pure returns (uint256) { unchecked {

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

18:     function mul(int256 a, int256 b) internal pure returns (int256) {

46:     function div(int256 a, int256 b) internal pure returns (int256) {

65:     function sub(int256 a, int256 b) internal pure returns (int256) {

82:     function add(int256 a, int256 b) internal pure returns (int256) {

89:     function toUInt256(int256 a) internal pure returns (uint256) {

```

### <a name="GAS-25"></a>[GAS-25] WETH address definition can be use directly
WETH is a wrap Ether contract with a specific address in the Ethereum network, giving the option to define it may cause false recognition, it is healthier to define it directly.

    Advantages of defining a specific contract directly:
    
    It saves gas,
    Prevents incorrect argument definition,
    Prevents execution on a different chain and re-signature issues,
    WETH Address : 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2

*Instances (1)*:
```solidity
File: ./contracts/RouterV2.sol

120:     IWETH public immutable wETH;

```


## Non Critical Issues


| |Issue|Instances|
|-|:-|:-:|
| [NC-1](#NC-1) | Replace `abi.encodeWithSignature` and `abi.encodeWithSelector` with `abi.encodeCall` which keeps the code typo/type safe | 8 |
| [NC-2](#NC-2) | Missing checks for `address(0)` when assigning values to address state variables | 67 |
| [NC-3](#NC-3) | Array indices should be referenced via `enum`s rather than via numeric literals | 103 |
| [NC-4](#NC-4) | `require()` should be used instead of `assert()` | 22 |
| [NC-5](#NC-5) | Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked` | 16 |
| [NC-6](#NC-6) | Constants should be in CONSTANT_CASE | 13 |
| [NC-7](#NC-7) | `constant`s should be defined rather than using magic numbers | 95 |
| [NC-8](#NC-8) | Control structures do not follow the Solidity Style Guide | 191 |
| [NC-9](#NC-9) | Critical Changes Should Use Two-step Procedure | 8 |
| [NC-10](#NC-10) | Default Visibility for constants | 1 |
| [NC-11](#NC-11) | Consider disabling `renounceOwnership()` | 23 |
| [NC-12](#NC-12) | Draft Dependencies | 2 |
| [NC-13](#NC-13) | Duplicated `require()`/`revert()` Checks Should Be Refactored To A Modifier Or Function | 261 |
| [NC-14](#NC-14) | Event is never emitted | 2 |
| [NC-15](#NC-15) | Event missing indexed field | 33 |
| [NC-16](#NC-16) | Events that mark critical parameter changes should contain both the old and the new value | 29 |
| [NC-17](#NC-17) | Function ordering does not follow the Solidity style guide | 34 |
| [NC-18](#NC-18) | Functions should not be longer than 50 lines | 950 |
| [NC-19](#NC-19) | Change int to int256 | 53 |
| [NC-20](#NC-20) | Change uint to uint256 | 747 |
| [NC-21](#NC-21) | Interfaces should be defined in separate files from their usage | 20 |
| [NC-22](#NC-22) | Lack of checks in setters | 37 |
| [NC-23](#NC-23) | Lines are too long | 32 |
| [NC-24](#NC-24) | `mapping` definitions do not follow the Solidity Style Guide | 1 |
| [NC-25](#NC-25) | Missing Event for critical parameters change | 122 |
| [NC-26](#NC-26) | NatSpec is completely non-existent on functions that should have them | 351 |
| [NC-27](#NC-27) | Incomplete NatSpec: `@param` is missing on actually documented functions | 46 |
| [NC-28](#NC-28) | Incomplete NatSpec: `@return` is missing on actually documented functions | 6 |
| [NC-29](#NC-29) | File's first line is not an SPDX Identifier | 11 |
| [NC-30](#NC-30) | Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor | 136 |
| [NC-31](#NC-31) | Constant state variables defined more than once | 14 |
| [NC-32](#NC-32) | Consider using named mappings | 103 |
| [NC-33](#NC-33) | `address`s shouldn't be hard-coded | 3 |
| [NC-34](#NC-34) | Numeric values having to do with time should use time units for readability | 1 |
| [NC-35](#NC-35) | Variable names that consist of all capital letters should be reserved for `constant`/`immutable` variables | 5 |
| [NC-36](#NC-36) | Adding a `return` statement when the function defines a named return variable, is redundant | 59 |
| [NC-37](#NC-37) | `require()` / `revert()` statements should have descriptive reason strings | 71 |
| [NC-38](#NC-38) | Take advantage of Custom Error's return value property | 1 |
| [NC-39](#NC-39) | Deprecated library used for Solidity `>= 0.8` : SafeMath | 10 |
| [NC-40](#NC-40) | Use scientific notation (e.g. `1e18`) rather than exponentiation (e.g. `10**18`) | 4 |
| [NC-41](#NC-41) | Use scientific notation for readability reasons for large multiples of ten | 1 |
| [NC-42](#NC-42) | Avoid the use of sensitive terms | 71 |
| [NC-43](#NC-43) | Strings should use double quotes rather than single quotes | 114 |
| [NC-44](#NC-44) | Contract does not follow the Solidity style guide's suggested layout ordering | 27 |
| [NC-45](#NC-45) | Some require descriptions are not clear | 149 |
| [NC-46](#NC-46) | Use Underscores for Number Literals (add an underscore every 3 digits) | 26 |
| [NC-47](#NC-47) | Internal and private variables and functions names should begin with an underscore | 63 |
| [NC-48](#NC-48) | Event is missing `indexed` fields | 75 |
| [NC-49](#NC-49) | Constants should be defined rather than using magic numbers | 6 |
| [NC-50](#NC-50) | `public` functions not called by the contract should be declared `external` instead | 43 |
| [NC-51](#NC-51) | Variables need not be initialized to zero | 118 |
### <a name="NC-1"></a>[NC-1] Replace `abi.encodeWithSignature` and `abi.encodeWithSelector` with `abi.encodeCall` which keeps the code typo/type safe
When using `abi.encodeWithSignature`, it is possible to include a typo for the correct function signature.
When using `abi.encodeWithSignature` or `abi.encodeWithSelector`, it is also possible to provide parameters that are not of the correct type for the function.

To avoid these pitfalls, it would be best to use [`abi.encodeCall`](https://solidity-by-example.org/abi-encode/) instead.

*Instances (8)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

269:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));

```

```solidity
File: ./contracts/GlobalRouter.sol

283:         token.call(abi.encodeWithSelector(erc20.transferFrom.selector, from, to, value));

295:         token.call(abi.encodeWithSelector(erc20.transfer.selector, to, value));

```

```solidity
File: ./contracts/Pair.sol

571:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));

578:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.approve.selector, spender, value));

```

```solidity
File: ./contracts/PairFees.sol

24:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));

```

```solidity
File: ./contracts/RouterV2.sol

648:         token.call(abi.encodeWithSelector(erc20.transfer.selector, to, value));

655:         token.call(abi.encodeWithSelector(erc20.transferFrom.selector, from, to, value));

```

### <a name="NC-2"></a>[NC-2] Missing checks for `address(0)` when assigning values to address state variables

*Instances (67)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

191:         routerV2 = _router;

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

19:         factory = _factory;

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

455:         pairAPI = _pairApi;

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

495:         pairAPI = _pairApi;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

66:         factory = _factory;

69:         VE = _ve;                               // vested

70:         poolAddress = _pool;

72:         DISTRIBUTION = _distribution;           // distro address (GaugeManager)

75:         internal_bribe = _internal_bribe;       // lp fees goes here

76:         external_bribe = _external_bribe;       // bribe fees goes here

264:         internal_bribe = _int;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

40:         permissionsRegistry = _permissionRegistry;

51:         permissionsRegistry = _registry;

56:         algebraPoolAPIStorage = _algebraPoolAPIStorage;

```

```solidity
File: ./contracts/Black.sol

30:         minter = _minter;

```

```solidity
File: ./contracts/BlackGovernor.sol

29:         minter = _minter;

43:         team = newTeam;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

51:         entryPoint = _entryPoint;

52:         plugin = _plugin;

54:         algebraPoolAPIStorage = _algebraPoolAPIStorage;

55:         algebraFeeRecipient = _algebraFeeRecipient;

56:         algebraFeeManager = _algebraFeeManager;

58:         algebraFarmingProxyPluginFactory = _algebraFarmingProxyPluginFactory;

59:         algebraFactory = _algebraFactory;

60:         algebraPluginFactory = _algebraPluginFactory;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

61:         GAUGE = gauge;

```

```solidity
File: ./contracts/GaugeManager.sol

84:       _ve = __ve;  

86:       tokenHandler = _tokenHandler;

87:        permissionRegistry = _permissionRegistory;

```

```solidity
File: ./contracts/GaugeV2.sol

99:         VE = _ve;                               // vested

101:         DISTRIBUTION = _distribution;           // distro address (GaugeManager)

104:         internal_bribe = _internal_bribe;       // lp fees goes here

105:         external_bribe = _external_bribe;       // bribe fees goes here

107:         genesisManager = _genesisManager;

141:         internal_bribe = _int;

377:         genesisPool = _genesisPool;

439:         genesisManager = _genesisPoolManager;

```

```solidity
File: ./contracts/GenesisPool.sol

64:         genesisManager = _genesisManager;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

74:         epochController = _epochController;

75:         router = _router;

76:         permissionRegistory = _permissionRegistory;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

103:         pendingTeam = _team;

```

```solidity
File: ./contracts/Pair.sol

93:         factory = _factory;

```

```solidity
File: ./contracts/PairFees.sol

18:         token0 = _token0;

19:         token1 = _token1;

```

```solidity
File: ./contracts/RewardsDistributor.sol

58:         token = _token;

59:         voting_escrow = _voting_escrow;

250:         depositor = _depositor;

255:         owner = _owner;

```

```solidity
File: ./contracts/RouterV2.sol

139:         factory = _factory;

141:         swapRouter = _swapRouter;

791:         swapRouter = _swapRouter;

```

```solidity
File: ./contracts/TokenHandler.sol

41:         permissionRegistry = _permissionRegistry;

```

```solidity
File: ./contracts/VotingEscrow.sol

117:         token = token_addr;

120:         artProxy = art_proxy;

121:         avm = _avm;

166:         team = _team;

171:         artProxy = _proxy;

1056:         voter = _voter;

1061:         avm = _avm;

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

32:         permissionsRegistry = _permissionRegistry;

37:         permissionsRegistry = _registry;

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

32:         tokenHandler = _tokenHandler;

37:         genesisManager = _genesisManager;

```

```solidity
File: ./contracts/factories/PairFactory.sol

51:         pairGenerator = _pairGenerator;

64:         pendingFeeManager = _feeManager;

154:         genesisManager = _genesisManager;

```

### <a name="NC-3"></a>[NC-3] Array indices should be referenced via `enum`s rather than via numeric literals

*Instances (103)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

270:             pairs[i - _offset].external_bribes = bribes[0];

271:             pairs[i - _offset].internal_bribes = bribes[1];  

293:         pairInformation.external_bribes = bribes[0];

294:         pairInformation.internal_bribes = bribes[1];

398:                 _tempReward[0] = _getNextEpochRewards(_bribeAddress);

402:                 _tempReward[1] = _getNextEpochRewards(_bribeAddress);

461:         pairFactory = IPairFactory(voter.factories()[0]);

494:                 swapRoutes.routes[0] = _createRoute(swapRouteHelperData._pair1, tokenIn, tokenOut, true, swapRouteHelperData.minAmount, _userAddress, 0);

516:                     swapRoutes.routes[0] = _createRoute(swapRouteHelperData._pair1, tokenIn, tokenOut, false, swapRouteHelperData.minAmount, _userAddress, swapRouteHelperData.sqrtPriceAfter);

628:         if(amounts[0] > 0 && amounts[1] > 0 && amounts[2] > 0 && amounts[2] > swapRouteFromHopping.minAmount){

628:         if(amounts[0] > 0 && amounts[1] > 0 && amounts[2] > 0 && amounts[2] > swapRouteFromHopping.minAmount){

628:         if(amounts[0] > 0 && amounts[1] > 0 && amounts[2] > 0 && amounts[2] > swapRouteFromHopping.minAmount){

629:             swapRouteFromHopping.minAmount = amounts[2];

635:             swapRoutes.routes[0] = _createRoute(swapRouteFromHopping._pair1, tokenIn, swapRouteFromHopping.otherToken1, swapRouteFromHopping.isBasic1, amounts[0], receiver, sqrtPriceAfter[0]);

635:             swapRoutes.routes[0] = _createRoute(swapRouteFromHopping._pair1, tokenIn, swapRouteFromHopping.otherToken1, swapRouteFromHopping.isBasic1, amounts[0], receiver, sqrtPriceAfter[0]);

639:             swapRoutes.routes[1] = _createRoute(swapRouteFromHopping._pairMid, swapRouteFromHopping.otherToken1, swapRouteFromHopping.otherToken2, swapRouteFromHopping.isBasicMid, amounts[1], receiver, sqrtPriceAfter[1]);

639:             swapRoutes.routes[1] = _createRoute(swapRouteFromHopping._pairMid, swapRouteFromHopping.otherToken1, swapRouteFromHopping.otherToken2, swapRouteFromHopping.isBasicMid, amounts[1], receiver, sqrtPriceAfter[1]);

641:             swapRoutes.routes[2] = _createRoute(swapRouteFromHopping._pair2, swapRouteFromHopping.otherToken2, tokenOut, swapRouteFromHopping.isBasic2, amounts[2], _userAddress, sqrtPriceAfter[2]);

641:             swapRoutes.routes[2] = _createRoute(swapRouteFromHopping._pair2, swapRouteFromHopping.otherToken2, tokenOut, swapRouteFromHopping.isBasic2, amounts[2], _userAddress, sqrtPriceAfter[2]);

643:             swapRoutes.amountOut = amounts[2];

652:         if(amounts[0] > 0 && amounts[1] > 0 && amounts[1] > swapRouteFromHopping.minAmount){

652:         if(amounts[0] > 0 && amounts[1] > 0 && amounts[1] > swapRouteFromHopping.minAmount){

653:             swapRouteFromHopping.minAmount = amounts[1];

657:             swapRoutes.routes[0] = _createRoute(swapRouteFromHopping._pair1, tokenIn, swapRouteFromHopping.otherToken1, swapRouteFromHopping.isBasic1, amounts[0], receiver, sqrtPriceAfter[0]);

657:             swapRoutes.routes[0] = _createRoute(swapRouteFromHopping._pair1, tokenIn, swapRouteFromHopping.otherToken1, swapRouteFromHopping.isBasic1, amounts[0], receiver, sqrtPriceAfter[0]);

658:             swapRoutes.routes[1] = _createRoute(swapRouteFromHopping._pair2, swapRouteFromHopping.otherToken1, tokenOut, swapRouteFromHopping.isBasic2, amounts[1], _userAddress, sqrtPriceAfter[1]);

658:             swapRoutes.routes[1] = _createRoute(swapRouteFromHopping._pair2, swapRouteFromHopping.otherToken1, tokenOut, swapRouteFromHopping.isBasic2, amounts[1], _userAddress, sqrtPriceAfter[1]);

659:             swapRoutes.amountOut = amounts[1];

671:         (amounts[0], sqrtPriceAfter[0]) = _getAmountOut(amountIn, tokenIn, tokenMid, swapRouteHelperData.isBasic1, swapRouteHelperData._pair1);

672:         (amounts[1], sqrtPriceAfter[1]) = _getAmountOut(amounts[0], tokenMid, tokenOut, swapRouteHelperData.isBasic2, swapRouteHelperData._pair2);

682:         (amounts[0], sqrtPriceAfter[0]) = _getAmountOut(amountIn, tokenIn, tokenMid1, swapRouteHelperData.isBasic1, swapRouteHelperData._pair1);

683:         (amounts[1], sqrtPriceAfter[1]) = _getAmountOut(amounts[0], tokenMid1, tokenMid2, swapRouteHelperData.isBasicMid, swapRouteHelperData._pairMid);

684:         (amounts[2], sqrtPriceAfter[2]) = _getAmountOut(amounts[1], tokenMid2, tokenOut, swapRouteHelperData.isBasic2, swapRouteHelperData._pair2);

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

40:         pairFactory = IPairFactory(voter.factories()[0]);

130:         _tempReward[0] = _getNextEpochRewards(_bribe);

134:         _tempReward[1] = _getNextEpochRewards(_bribe);

175:         pairFactory = IPairFactory(voter.factories()[0]);

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

75:         amounts[0] = amountIn;

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

372:             _reward[0] = _createReward(internal_bribes_inputs.id, _feeToken0, internal_bribes_inputs.t0, internal_bribes_inputs.bribe_address, internal_bribes_inputs.pair);

376:             _reward[1] = _createReward(internal_bribes_inputs.id, _feeToken1, internal_bribes_inputs.t1, internal_bribes_inputs.bribe_address, internal_bribes_inputs.pair);

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

409:             _reward[0] = _createReward(internal_bribes_inputs.id, _feeToken0, internal_bribes_inputs.t0, internal_bribes_inputs.bribe_address, internal_bribes_inputs.pair);

413:             _reward[1] = _createReward(internal_bribes_inputs.id, _feeToken1, internal_bribes_inputs.t1, internal_bribes_inputs.bribe_address, internal_bribes_inputs.pair);

```

```solidity
File: ./contracts/BlackGovernor.sol

103:         require(address(targets[0]) == minter, "GovernorSimple: only minter allowed");

105:         require(bytes4(calldatas[0]) == IMinter.nudge.selector, "GovernorSimple: only nudge allowed");

```

```solidity
File: ./contracts/Bribes.sol

145:         if (checkpoints[tokenId][0].timestamp > timestamp) {

177:         if (supplyCheckpoints[0].timestamp > timestamp) {

```

```solidity
File: ./contracts/GaugeManager.sol

269:         str[0] = '0';

270:         str[1] = 'x';

```

```solidity
File: ./contracts/GlobalRouter.sol

197:         address _pair = tradeHelper.pairFor(routes[0].from, routes[0].to, routes[0].stable);

198:         _safeTransferFrom( routes[0].from, msg.sender, _pair, amounts[0] );

198:         _safeTransferFrom( routes[0].from, msg.sender, _pair, amounts[0] );

```

```solidity
File: ./contracts/RouterV2.sol

261:         amounts[0] = amountIn;

543:         routes[0].from = tokenFrom;

544:         routes[0].to = tokenTo;

545:         routes[0].stable = stable;

546:         routes[0].concentrated = concentrated;

549:         if(!routes[0].concentrated) {

551:             routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]

551:             routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]

551:             routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]

555:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

555:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

556:             if (IERC20(routes[0].from).allowance(address(this), swapRouter) < amounts[0]) {

556:             if (IERC20(routes[0].from).allowance(address(this), swapRouter) < amounts[0]) {

557:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

557:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

572:         if(!routes[0].concentrated)

575:                 routes[0].from, msg.sender, routes[0].pair, amounts[0]

575:                 routes[0].from, msg.sender, routes[0].pair, amounts[0]

579:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

579:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

580:             if (IERC20(routes[0].from).allowance(address(this), swapRouter) < amounts[0]) {

580:             if (IERC20(routes[0].from).allowance(address(this), swapRouter) < amounts[0]) {

581:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

581:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

588:         require(routes[0].from == address(wETH), 'INP');

591:         wETH.deposit{value: amounts[0]}();

593:         if (!routes[0].concentrated) {

594:             assert(wETH.transfer(pairFor(routes[0].from, routes[0].to, routes[0].stable),amounts[0]));

594:             assert(wETH.transfer(pairFor(routes[0].from, routes[0].to, routes[0].stable),amounts[0]));

596:             if (IERC20(address(wETH)).allowance(address(this), swapRouter) < amounts[0]) {

597:                 IERC20(address(wETH)).approve(swapRouter, amounts[0]);

612:         if(!routes[0].concentrated)

615:                 routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]

615:                 routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]

615:                 routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]

619:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

619:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

620:             if (IERC20(routes[0].from).allowance(address(this), swapRouter) < amounts[0]) {

620:             if (IERC20(routes[0].from).allowance(address(this), swapRouter) < amounts[0]) {

621:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

621:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

635:         _safeTransferFrom(routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]);

635:         _safeTransferFrom(routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]);

635:         _safeTransferFrom(routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amounts[0]);

734:         	routes[0].from,

736:         	pairFor(routes[0].from, routes[0].to, routes[0].stable),

756:         require(routes[0].from == address(wETH), 'INP');

759:         assert(wETH.transfer(pairFor(routes[0].from, routes[0].to, routes[0].stable), amountIn));

780:             routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amountIn

780:             routes[0].from, msg.sender, pairFor(routes[0].from, routes[0].to, routes[0].stable), amountIn

```

```solidity
File: ./contracts/VotingEscrow.sol

126:         votingBalanceLogicData.point_history[0].blk = block.number;

127:         votingBalanceLogicData.point_history[0].ts = block.timestamp;

```

### <a name="NC-4"></a>[NC-4] `require()` should be used instead of `assert()`
Prior to solidity version 0.8.0, hitting an assert consumes the **remainder of the transaction's available gas** rather than returning it, as `require()`/`revert()` do. `assert()` should be avoided even past solidity version 0.8.0 as its [documentation](https://docs.soliditylang.org/en/v0.8.14/control-structures.html#panic-via-assert-and-error-via-require) states that "The assert function creates an error of type Panic(uint256). ... Properly functioning code should never create a Panic, not even on invalid external input. If this happens, then there is a bug in your contract which you should fix. Additionally, a require statement (or a custom error) are more friendly in terms of understanding what happened."

*Instances (22)*:
```solidity
File: ./contracts/RewardsDistributor.sol

108:         assert(msg.sender == depositor);

```

```solidity
File: ./contracts/RouterV2.sol

148:         assert(msg.sender == address(wETH)); // only accept ETH via fallback from the WETH contract

363:                 assert(amountAOptimal <= amountADesired);

412:         assert(wETH.transfer(pair, amountETH));

594:             assert(wETH.transfer(pairFor(routes[0].from, routes[0].to, routes[0].stable),amounts[0]));

759:         assert(wETH.transfer(pairFor(routes[0].from, routes[0].to, routes[0].stable), amountIn));

```

```solidity
File: ./contracts/VotingEscrow.sol

277:         assert(_operator != msg.sender);

287:         assert(idToOwner[_tokenId] == _owner);

471:         assert(idToOwner[_tokenId] == address(0));

488:         assert(_to != address(0));

531:         assert(idToOwner[_tokenId] == _from);

796:                 assert(_black.burnFrom(from,_value));

798:                 assert(IERC20(token).transferFrom(from, address(this), _value));

878:         assert(_isApprovedOrOwner(msg.sender, _tokenId));

882:         assert(_value > 0); // dev: need non-zero value

900:         assert(_isApprovedOrOwner(msg.sender, _tokenId));

933:         assert(_black.burn(_value));

939:         assert(_isApprovedOrOwner(msg.sender, _tokenId));

956:         assert(IERC20(token).transfer(msg.sender, value));

1111:                 assert(_black.burn(value0));

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

79:         assert(_block <= block.number);

135:         assert(_block <= block.number);

```

### <a name="NC-5"></a>[NC-5] Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked`
Solidity version 0.8.4 introduces `bytes.concat()` (vs `abi.encodePacked(<bytes>,<bytes>)`)

Solidity version 0.8.12 introduces `string.concat()` (vs `abi.encodePacked(<str>,<str>), which catches concatenation errors (in the event of a `bytes` data mixed in the concatenation)`)

*Instances (16)*:
```solidity
File: ./contracts/Pair.sol

97:             name = string(abi.encodePacked("StableV1 AMM - ", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

98:             symbol = string(abi.encodePacked("sAMM-", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

100:             name = string(abi.encodePacked("VolatileV1 AMM - ", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

101:             symbol = string(abi.encodePacked("vAMM-", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

526:             abi.encodePacked(

```

```solidity
File: ./contracts/PairGenerator.sol

19:         bytes32 salt = keccak256(abi.encodePacked(token0, token1, stable)); // notice salt includes stable as well, 3 parameters

```

```solidity
File: ./contracts/Thenian.sol

109:         bytes32 leaf = keccak256(abi.encodePacked(keccak256(abi.encodePacked(sender))));

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

43:         output = string(abi.encodePacked(output, "token ", toString(_tokenId), '</text><text x="10" y="40" class="base">'));

44:         output = string(abi.encodePacked(output, "balanceOf ", toString(_balanceOf), '</text><text x="10" y="60" class="base">'));

45:         output = string(abi.encodePacked(output, "locked_end ", toString(_locked_end), '</text><text x="10" y="80" class="base">'));

46:         output = string(abi.encodePacked(output, "isSMNFT ", isSMNFT?"true":"false", '</text><text x="10" y="100" class="base">'));

47:         output = string(abi.encodePacked(output, "value ", toString(_value), '</text></svg>'));

49:         string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "lock #', toString(_tokenId), '", "description": "Black locks, can be used to boost gauge yields, vote on token emission, and receive bribes", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));

50:         output = string(abi.encodePacked('data:application/json;base64,', json));

```

```solidity
File: ./contracts/VotingEscrow.sol

1340:             abi.encodePacked("\x19\x01", domainSeparator, structHash)

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

60:         bytes32 salt = keccak256(abi.encodePacked(nativeToken, fundingToken, genesisPools[nativeToken].length));

```

### <a name="NC-6"></a>[NC-6] Constants should be in CONSTANT_CASE
For `constant` variable names, each word should use all capital letters, with underscores separating each word (CONSTANT_CASE)

*Instances (13)*:
```solidity
File: ./contracts/Black.sol

8:     string public constant name = "BLACKHOLE";

9:     string public constant symbol = "BLACK";

10:     uint8 public constant decimals = 18;

```

```solidity
File: ./contracts/Fan.sol

10:     uint256 private constant _initialSupply = 1000000 * 10 ** 18; // 1,000,000 tokens with 18 decimals

```

```solidity
File: ./contracts/Pair.sol

18:     uint8 public constant decimals = 18;

48:     uint constant periodSize = 1800;

```

```solidity
File: ./contracts/VotingEscrow.sol

145:     uint8 internal constant _not_entered = 1;

146:     uint8 internal constant _entered = 2;

159:     string constant public name = "veBlack";

160:     string constant public symbol = "veBLACK";

161:     string constant public version = "1.0.0";

162:     uint8 constant public decimals = 18;

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

6:     int256 constant private _INT256_MIN = -2**255;

```

### <a name="NC-7"></a>[NC-7] `constant`s should be defined rather than using magic numbers
Even [assembly](https://github.com/code-423n4/2022-05-opensea-seaport/blob/9d7ce4d08bf3c3010304a0476a785c70c0e90ae7/contracts/lib/TokenTransferrer.sol#L35-L39) can benefit from using readable constants instead of hex/numeric literals

*Instances (95)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

56:         minBalanceForAutovoting = 10*1e18; // decimals in black

```

```solidity
File: ./contracts/Black.sol

37:         _mint(_recipient, 500 * 1e6 * 1e18);

```

```solidity
File: ./contracts/BlackClaims.sol

131:         require(claim_duration_ >= 1 days && claim_duration_ < 1000 days, "CLAIM DURATION OUT OF BOUNDS");

208:         if(percent == 100) {

211:             uint256 credit_amount = (_reward * 100)/110;

```

```solidity
File: ./contracts/BlackGovernor.sol

18:     uint256 public proposalNumerator = 2; // start at 0.02%

34:         return 2 minutes; // 1 block

38:         return 30 minutes;

```

```solidity
File: ./contracts/Bribes.sol

152:             uint256 center = upper - (upper - lower) / 2; // ceil, avoiding overflow

184:             uint256 center = upper - (upper - lower) / 2; // ceil, avoiding overflow

```

```solidity
File: ./contracts/CustomToken.sol

22:         _initialSupply = initialSupply_ * 10 ** decimals();

```

```solidity
File: ./contracts/GaugeManager.sol

153:         require(_pool.length <= 10, "MAXVAL");

272:         for (uint i = 0; i < 20; i++) {

273:             str[2 + i * 2] = alphabet[uint8(value[i] >> 4)];

274:             str[3 + i * 2] = alphabet[uint8(value[i] & 0x0f)];

```

```solidity
File: ./contracts/GenesisPool.sol

165:         uint256 targetNativeAmount = (allocationInfo.proposedNativeAmount * genesisInfo.threshold) / 10000; // threshold is 100 * of original to support 2 deciamls

176:         uint256 targetNativeAmount = (allocationInfo.proposedNativeAmount * genesisInfo.threshold) / 10000; // threshold is 100 * of original to support 2 deciamls

225:         (, , uint _liquidity) = IRouter(_router).addLiquidity(genesisInfo.nativeToken, genesisInfo.fundingToken, genesisInfo.stable, nativeDesired, fundingDesired, 0, 0, address(this), block.timestamp + 100);

324:         uint256 _depositerLiquidity = liquidity / 2;

331:         uint256 _depositerLiquidity = liquidity / 2;

349:         uint256 _depositerLiquidity = liquidity / 2;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

83:         MIN_DURATION = 2 * BlackTimeLibrary.WEEK;

84:         MIN_THRESHOLD = 50 * 10 ** 2; 

119:         require(genesisPoolInfo.supplyPercent > 0 && genesisPoolInfo.supplyPercent <= 10000, "INV"); 

```

```solidity
File: ./contracts/GlobalRouter.sol

65:         if (y > 3) {

67:             uint x = y / 2 + 1;

70:                 x = (y / x + x) / 2;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

68:         teamRate = 500; // 500 bps = 5%

77:         weekly = 10_000_000 * 1e18; // represents a starting weekly emission of 10M BLACK (BLACK has 18 decimals)

152:             tailEmissionRate = 10000;

174:                 if (epochCount < 15) {

```

```solidity
File: ./contracts/Pair.sol

104:         decimals0 = 10**IERC20(_token0).decimals();

105:         decimals1 = 10**IERC20(_token1).decimals();

114:         _unlocked = 2;

166:         uint256 _referralFee = (_dibs != address(0)) ? (amount * _maxRef / 10000) : 0;

172:         uint256 _stakingNftFee =  amount * PairFactory(factory).stakingNFTFee() / 10000;

191:         uint256 _referralFee = (_dibs != address(0)) ? (amount * _maxRef / 10000) : 0;

197:         uint256 _stakingNftFee =  amount * PairFactory(factory).stakingNFTFee() / 10000;

404:         if (amount0In > 0) _update0(amount0In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token0 and move them out of pool

405:         if (amount1In > 0) _update1(amount1In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token1 and move them out of pool

433:         return 3*x0*(y*y/1e18)/1e18+(x0*x0/1e18*x0/1e18);

437:         for (uint i = 0; i < 255; i++) {

462:         amountIn -= amountIn * PairFactory(factory).getFee(address(this), stable) / 10000; // remove fee from amount received

```

```solidity
File: ./contracts/RewardsDistributor.sol

85:         for (uint i = 0; i < 20; i++) {

115:         for (uint i = 0; i < 128; i++) {

117:             uint _mid = (_min + _max + 2) / 2;

147:         for (uint i = 0; i < 50; i++) {

180:         for (uint i = 0; i < 50; i++) {

```

```solidity
File: ./contracts/RouterV2.sol

65:         if (y > 3) {

67:             uint x = y / 2 + 1;

70:                 x = (y / x + x) / 2;

247:         pairSwapMetaData.balanceA += (amountIn - (amountIn * IPairFactory(factory).getFee(pair, pairSwapMetaData.stable) / 10000));

511:                     deadline: block.timestamp + 600,

```

```solidity
File: ./contracts/Thenian.sol

22:     uint256 public MAX_PER_MINT = 10;

24:     uint256 public MAX_RESERVE = 150;

133:         require(block.timestamp < SALE_START_TIMESTAMP + 2 days, "Second round has ended.");

136:         require(secondMint[msg.sender].add(amount) <= MAX_PER_MINT, "Can only mint 10 in the second round");

147:         require(block.timestamp >= SALE_START_TIMESTAMP + 2 days, "Public Sale has not started yet.");

148:         require(block.timestamp < SALE_START_TIMESTAMP + 5 days, "Sale is over.");

149:         require(amount <= MAX_PER_MINT, "Can only mint 10 NFTs at a time");

150:         require(balanceOf(msg.sender).add(amount) <= 15, "Can only mint 15 NFTs per wallet");

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

30:             temp /= 10;

35:             buffer[digits] = bytes1(uint8(48 + uint(value % 10)));

36:             value /= 10;

```

```solidity
File: ./contracts/VoterV3.sol

66:         maxVotingNum = 30;

```

```solidity
File: ./contracts/VotingEscrow.sol

85:     uint public SMNFT_BONUS = 1000;

86:     uint public PRECISISON = 10000;

670:             for (uint i = 0; i < 255; ++i) {

```

```solidity
File: ./contracts/WAVAX.sol

7:     uint8  public decimals = 18;

```

```solidity
File: ./contracts/factories/PairFactory.sol

47:         stableFee = 4; // 0.04%

48:         volatileFee = 18; // 0.18%

73:         require(_newFee <= 3000, "HFE");

```

```solidity
File: ./contracts/governance/Governor.sol

792:         return 100;

```

```solidity
File: ./contracts/governance/L2GovernorVotesQuorumFraction.sol

43:         return 100;

```

```solidity
File: ./contracts/libraries/Base64.sol

17:         uint encodedLen = 4 * ((len + 2) / 3);

20:         bytes memory result = new bytes(encodedLen + 32);

26:             let resultPtr := add(result, 32)

33:                 i := add(i, 3)

47:                 resultPtr := add(resultPtr, 4)

50:             switch mod(len, 3)

52:                 mstore(sub(resultPtr, 2), shl(240, 0x3d3d))

54:             case 2 {

```

```solidity
File: ./contracts/libraries/Math.sol

12:         if (y > 3) {

14:             uint x = y / 2 + 1;

17:                 x = (y / x + x) / 2;

25:         for (uint256 y = 1 << 255; y > 0; y >>= 3) {

27:             uint256 z = 3 * x * (x + 1) + 1;

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

54:             uint center = upper - (upper - lower) / 2; // ceil, avoiding overflow

84:         for (uint i = 0; i < 128; ++i) {

89:             uint _mid = (_min + _max + 1) / 2;

167:         for (uint i = 0; i < 128; ++i) {

172:             uint _mid = (_min + _max + 1) / 2;

192:         for (uint i = 0; i < 255; ++i) {

220:             uint center = upper - (upper - lower) / 2; // ceil, avoiding overflow

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

209:             uint32 center = upper - (upper - lower) / 2; // ceil, avoiding overflow

```

### <a name="NC-8"></a>[NC-8] Control structures do not follow the Solidity Style Guide
See the [control structures](https://docs.soliditylang.org/en/latest/style-guide.html#control-structures) section of the Solidity Style Guide

*Instances (191)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

80:             if(_locked.end > block.timestamp || _locked.isPermanent) {

92:             if(_locked.end < block.timestamp && !_locked.isPermanent) {

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

185:         if(address(topPoolsStrategy) != address(0)) {

189:         if(address(voteWeightStrategy) != address(0)) {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

17: import '@cryptoalgebra/integral-farming/contracts/interfaces/IFarmingCenter.sol';

41:     IFarmingCenter public farmingCenter;

79:         farmingCenter = IFarmingCenter(farmingParam.farmingCenter);

157:     function notifyRewardAmount(address token, uint256 reward) external nonReentrant 

245:                 IBribe(internal_bribe).notifyRewardAmount(_token0, _fees0);

250:                 IBribe(internal_bribe).notifyRewardAmount(_token1, _fees1);

```

```solidity
File: ./contracts/BlackClaims.sol

208:         if(percent == 100) {

232:         if( !isSeasonClaimingActive() )

```

```solidity
File: ./contracts/Bribes.sol

227:         if (

244:         if (

274:         if(_owner == avm) {

290:         require(_isRewardToken(_rewardsToken), "!VERIFIED");

292:         if(!isBribeToken[_rewardsToken]){

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

102:             if( block.timestamp >= lastDistributedTime){

155:                 if( block.timestamp >= lastDistributedTime){

181:         if(token == address(rewardToken) && rewardPerSecond != 0 && lastDistributedTime > block.timestamp){

```

```solidity
File: ./contracts/GaugeManager.sol

70:     event NotifyReward(address indexed sender, address indexed reward, uint256 amount);

199:         if(_gaugeType == 0){

202:         if(_gaugeType == 1) {

215:         if(_gaugeType == 0) {

218:         if(_gaugeType == 1) {

250:         if(_gaugeType == 0) {

254:         if(_gaugeType == 1) {

296:         if(totalWeight > 0) _ratio = amount * 1e18 / Math.max(totalWeight, 1);     // 1e18 adjustment is removed during claim

301:         emit NotifyReward(msg.sender, base, amount);

322:         if (isGauge[gauges[_pool]] && isAlive[gauges[_pool]]){

323:             if(!isCLGauge[gauges[_pool]]) {

373:         if(lastTimestamp < currentTimestamp){

374:             _updateForAfterDistribution(_gauge); // should set claimable to 0 if killed

382:                 if(!isCLGauge[_gauge]) {

383:                     IGauge(_gauge).notifyRewardAmount(base, _claimable);

386:                         IGaugeCL(_gauge).notifyRewardAmount(base, _claimable);

416:             uint256 _delta = _index - _supplyIndex; // see if there is any difference that need to be accrued

418:                 uint256 _share = _supplied * _delta / 1e18; // add accrued difference for each supplied token

```

```solidity
File: ./contracts/GaugeV2.sol

109:         isForPair = _isForPair;                 // pair boolean, if false no claim_fees

179:         if(genesisPool != address(0)) balance += IGenesisPool(genesisPool).balanceOf(account);

296:         if(genesisPool != address(0)) IGenesisPool(genesisPool).deductAllAmount(msg.sender);

315:         if(genesisPool != address(0)) gensisBalance = IGenesisPool(genesisPool).balanceOf(msg.sender);

321:         if(genesisPool != address(0)){

427:                 IBribe(internal_bribe).notifyRewardAmount(_token0, _fees0);

432:                 IBribe(internal_bribe).notifyRewardAmount(_token1, _fees1);

```

```solidity
File: ./contracts/GenesisPool.sol

105:             if(_token != address(0) && _amount > 0 && (_token == genesisInfo.nativeToken || tokenHandler.isConnector(_token))){

107:                 if(incentives[_token] == 0){

119:         poolStatus = PoolStatus.NOT_QUALIFIED;

143:         if(userDeposits[spender] == 0){

174:     function eligbleForDisqualify() external view returns (bool){

191:             if(_amount > 0)

194:                 IBribe(external_bribe).notifyRewardAmount(incentiveTokens[i], _amount);

206:         if(status == PoolStatus.PARTIALLY_LAUNCHED){

209:         else if(status == PoolStatus.LAUNCH){

212:         else if(status == PoolStatus.NOT_QUALIFIED){

244:         if(genesisInfo.maturityTime > 0) {

247:         if(_eligbleForCompleteLaunch()){

255:         if(msg.sender == genesisInfo.tokenOwner){

256:             if(poolStatus == PoolStatus.PARTIALLY_LAUNCHED || poolStatus == PoolStatus.NOT_QUALIFIED){

265:         if(poolStatus == PoolStatus.NOT_QUALIFIED){

273:         require(poolStatus == PoolStatus.NOT_QUALIFIED || poolStatus == PoolStatus.PARTIALLY_LAUNCHED, "INS");

279:         if(_amount > 0){

285:         require(poolStatus == PoolStatus.NOT_QUALIFIED, "INS");

290:         if(_amount > 0){

296:         if(poolStatus == PoolStatus.NOT_QUALIFIED && msg.sender == genesisInfo.tokenOwner){

308:         require(poolStatus == PoolStatus.NOT_QUALIFIED, "INS");

326:         if(account == genesisInfo.tokenOwner) balance += (liquidity - _depositerLiquidity - tokenOwnerUnstaked);

334:         if(account == genesisInfo.tokenOwner) {

337:             if(gaugeTokenAmount < pendingOwnerStaked){

350:         if(account == genesisInfo.tokenOwner) tokenOwnerUnstaked = liquidity - _depositerLiquidity;

355:         if(depositAmount <= 0) return 0;

364:         if(nativeAmount <= 0) return 0;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

124:         if(genesisPool == address(0))

132:         if(!isNativeToken[nativeToken]){

177:         if(preLaunchPool){

201:             if(_poolStatus == PoolStatus.PRE_LISTING && IGenesisPool(_genesisPool).eligbleForPreLaunchPool()){

204:             }else if(_poolStatus == PoolStatus.PRE_LAUNCH_DEPOSIT_DISABLED){

244:                 if(_poolStatus == PoolStatus.PRE_LISTING && IGenesisPool(_genesisPool).eligbleForDisqualify()){

246:                     IGenesisPool(_genesisPool).setPoolStatus(PoolStatus.NOT_QUALIFIED);

249:                 else if(_poolStatus == PoolStatus.PRE_LAUNCH){

260:         if(length > 0 && index >= 1 && index <= length)

```

```solidity
File: ./contracts/MinterUpgradeable.sol

86:         uint max // sum amounts / max = % ownership of top protocols, so if initial 20m is distributed, and target is 25% protocol ownership, then max - 4 x 20m = 80m

89:         if(max > 0){

149:         else if(_state == IBlackGovernor.ProposalState.Defeated) {

161:         if (block.timestamp >= _period + WEEK && _initializer == address(0)) { // only trigger if new week

201:             _gaugeManager.notifyRewardAmount(_gauge);

```

```solidity
File: ./contracts/Pair.sol

224:             uint _delta0 = _index0 - _supplyIndex0; // see if there is any difference that need to be accrued

227:                 uint _share = _supplied * _delta0 / 1e18; // add accrued difference for each supplied token

256:         timeElapsed = blockTimestamp - _point.timestamp; // compare the last observation with current timestamp, if greater than 30 minutes, record a new event

391:         if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens

392:         if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens

393:         if (data.length > 0) IPairCallee(to).hook(msg.sender, amount0Out, amount1Out, data); // callback, used for flash loans

404:         if (amount0In > 0) _update0(amount0In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token0 and move them out of pool

405:         if (amount1In > 0) _update1(amount1In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token1 and move them out of pool

518:                 keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),

```

```solidity
File: ./contracts/PairFees.sol

31:         if (amount0 > 0) _safeTransfer(token0, recipient, amount0);

32:         if (amount1 > 0) _safeTransfer(token1, recipient, amount1);

39:         if(amount > 0 && isTokenZero){

43:         if(amount > 0 && !isTokenZero){

51:         if (toStake0 > 0){

55:         if (toStake1 > 0){

```

```solidity
File: ./contracts/PermissionsRegistry.sol

98:             if(keccak256(_roles[i]) == keccak256(_role)){

112:                 if(keccak256(__roles[k]) == keccak256(bytes(role))){

149:             if(rta[i] == c){

157:             if(keccak256(atr[i]) == keccak256(_role)){

```

```solidity
File: ./contracts/RewardsDistributor.sol

13: @title Curve Fee Distribution modified for ve(3,3) emissions

116:             if (_min >= _max) break;

134:         if (max_user_epoch == 0) return 0;

142:         if (week_cursor >= last_token_time) return 0;

143:         if (week_cursor < _start_time) week_cursor = _start_time;

148:             if (week_cursor >= _last_token_time) break;

168:         if (max_user_epoch == 0) return 0;

176:         if (week_cursor >= last_token_time) return 0;

177:         if (week_cursor < _start_time) week_cursor = _start_time;

181:             if (week_cursor >= _last_token_time) break;

227:             if (_tokenId == 0) break;

232:                 if(_locked.end < block.timestamp && !_locked.isPermanent){

```

```solidity
File: ./contracts/RouterV2.sol

213:         if(swapPossible){

226:         if(swapPossible){

250:         if(_k(pairSwapMetaData.balanceA, pairSwapMetaData.balanceB, pairSwapMetaData.decimalsA, pairSwapMetaData.decimalsB, pairSwapMetaData.stable) >= _k(pairSwapMetaData.reserveA, pairSwapMetaData.reserveB, pairSwapMetaData.decimalsA, pairSwapMetaData.decimalsB, pairSwapMetaData.stable)){

267:             if(routes[i].concentrated){

415:         if (msg.value > amountETH) _safeTransferETH(msg.sender, msg.value - amountETH);

501:             if(routes[i].concentrated){

549:         if(!routes[0].concentrated) {

572:         if(!routes[0].concentrated)

612:         if(!routes[0].concentrated)

```

```solidity
File: ./contracts/Thenian.sol

110:         return MerkleProof.verify(proof, root, leaf);

119:         require(verifyLeaf(proof, msg.sender), "Not whitelisted.");

134:         require(verifyLeaf(proof, msg.sender), "Not whitelisted.");

```

```solidity
File: ./contracts/TokenHandler.sol

152:         if(bucketId == volatilityBucketCount + 1) volatilityBucketCount++;

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

42:         output = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

```

```solidity
File: ./contracts/VoterV3.sol

42:     mapping(uint256 => uint256) public lastVoted;                     // nft      => timestamp of last vote (this is shifted to thursday of that epoc)

73:                                     MODIFIERS

176:         if (_timestamp <= BlackTimeLibrary.epochVoteStart(_timestamp)){

202:         if ((_timestamp >= BlackTimeLibrary.epochVoteEnd(_timestamp)) && !ITokenHandler(tokenHandler).isWhitelistedNFT(_tokenId) && (IAutoVotingEscrowManager(avm).tokenIdToAVMId(_tokenId)) == (0)){

219:             if(gaugeManager.isGaugeAliveForPool(_poolVote[i])) _totalVoteWeight += _weights[i];

245:         if (_usedWeight > 0) IVotingEscrow(_ve).voting(_tokenId);

253:         if (BlackTimeLibrary.epochStart(block.timestamp) <= lastVoted[_tokenId]) revert("VOTED");

254:         if (block.timestamp <= BlackTimeLibrary.epochVoteStart(block.timestamp)) revert("DW");

```

```solidity
File: ./contracts/VotingEscrow.sol

141:                                 MODIFIERS

619:             if(new_locked.isSMNFT){

623:             else if(new_locked.isPermanent){

775:         if(old_locked.isSMNFT) {

794:             if(old_locked.isSMNFT) {

823:         if (_locked.isSMNFT) smNFTBalance += _value;

824:         else if (_locked.isPermanent) permanentLockBalance += _value;

828:         if(voted[_tokenId]) {

848:         if(isSMNFT) {

886:         if (_locked.isSMNFT) smNFTBalance += _value;

887:         else if (_locked.isPermanent) permanentLockBalance += _value;

891:         if(voted[_tokenId]) {

909:         if(isSMNFT) {

916:         if(voted[_tokenId]) {

980:         if(voted[_tokenId]) {

1016:         if (ownership_change[_tokenId] == block.number) return 0;

1106:         if(newLockedTo.isSMNFT){

1116:         } else if (newLockedTo.isPermanent){

1118:             if (!_locked0.isPermanent) {  // Only add if source wasn't already permanent

1130:         if(voted[_to]) {

1205:     bytes32 public constant DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)");

1274:             if(!locked[tId].isSMNFT) continue;

1312:         if (delegatee == address(0)) delegatee = msg.sender;

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

114:             if(defaultRewardToken[i] == _token){

204:             if(_amounts[i] > 0) IBribe(_bribe[i]).emergencyRecoverERC20(_tokens[i], _amounts[i]);

215:             if(_amounts[i] > 0) IBribe(_bribe[i]).emergencyRecoverERC20(_tokens[i], _amounts[i]);

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

80:         if(IGenesisPool(pools[length - 1]).poolStatus() != IGenesisPoolBase.PoolStatus.NOT_QUALIFIED)

```

```solidity
File: ./contracts/factories/PairFactory.sol

49:         stakingNFTFee = 0; // 0% of stable/volatileFee, we can change it later if needed

```

```solidity
File: ./contracts/governance/Governor.sol

345:             Address.verifyCallResult(success, returndata, errorMessage);

```

```solidity
File: ./contracts/governance/L2Governor.sol

336:             Address.verifyCallResult(success, returndata, errorMessage);

```

```solidity
File: ./contracts/interfaces/IBribe.sol

8:     function notifyRewardAmount(address token, uint amount) external;

```

```solidity
File: ./contracts/interfaces/IBribeDistribution.sol

8:     function notifyRewardAmount(address token, uint amount) external;

```

```solidity
File: ./contracts/interfaces/IBribeFull.sol

11:     function notifyRewardAmount(address token, uint amount) external;

```

```solidity
File: ./contracts/interfaces/IGauge.sol

5:     function notifyRewardAmount(address token, uint amount) external;

```

```solidity
File: ./contracts/interfaces/IGaugeCL.sol

5:     function notifyRewardAmount(address token, uint amount) external returns (IncentiveKey memory incentivekey, uint256 rewardRate, uint128 bonusRewardRate);

```

```solidity
File: ./contracts/interfaces/IGaugeDistribution.sol

5:     function notifyRewardAmount(address token, uint amount) external;

```

```solidity
File: ./contracts/interfaces/IGaugeManager.sol

15:     function notifyRewardAmount(uint amount) external;

```

```solidity
File: ./contracts/interfaces/IGenesisPool.sol

20:     function eligbleForDisqualify() external view returns (bool);

```

```solidity
File: ./contracts/interfaces/IGenesisPoolBase.sol

47:         NOT_QUALIFIED

```

```solidity
File: ./contracts/libraries/Base64.sol

14:         if (len == 0) return "";

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

29:             if (last_point.smNFT != 0){

99:         if (upoint.permanent > 0){

102:         else if(upoint.smNFT > 0){

240:         if(_epoch == 0) {

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

68:                     if(_isCheckpointInNewBlock) {

69:                         if(ownerOfFn(tId) == srcRep) {

74:                         if(ownerOfFn(tId) != srcRep) {

100:                 if(_isCheckpointInNewBlock) {

141:                     if(_isCheckpointInNewBlock) {

142:                         if(_tokenHelper.ownerOfFn(tId) != _owner) {

147:                         if(_tokenHelper.ownerOfFn(tId) == _owner) {

175:                 if(_isCheckpointInNewBlock) {

```

### <a name="NC-9"></a>[NC-9] Critical Changes Should Use Two-step Procedure
The critical procedures should be two step process.

See similar findings in previous Code4rena contests for reference: <https://code4rena.com/reports/2022-06-illuminate/#2-critical-changes-should-use-two-step-procedure>

**Recommended Mitigation Steps**

Lack of two-step procedure for critical operations leaves them error-prone. Consider adding two step procedure on the critical functions.

*Instances (8)*:
```solidity
File: ./contracts/BlackClaims.sol

247:     function setOwner(address _owner) external onlyOwner {

251:     function setOwner2(address _owner) external onlyOwner {

```

```solidity
File: ./contracts/Bribes.sol

351:     function setOwner(address _owner) external onlyAllowed {

```

```solidity
File: ./contracts/RewardsDistributor.sol

253:     function setOwner(address _owner) external {

```

```solidity
File: ./contracts/VoterV3.sol

105:     function setEpochOwner(address _epochOwner) external onlyOwner {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

190:     function setBribeOwner(address[] memory _bribe, address _owner) external onlyOwner {

```

```solidity
File: ./contracts/interfaces/IAutomatedVotingManager.sol

6:     function setOriginalOwner(uint256 tokenId, address owner) external;

```

```solidity
File: ./contracts/interfaces/IBribeDistribution.sol

11:     function setOwner(address _owner) external;

```

### <a name="NC-10"></a>[NC-10] Default Visibility for constants
Some constants are using the default visibility. For readability, consider explicitly declaring them as `internal`.

*Instances (1)*:
```solidity
File: ./contracts/Pair.sol

48:     uint constant periodSize = 1800;

```

### <a name="NC-11"></a>[NC-11] Consider disabling `renounceOwnership()`
If the plan for your project does not include eventually giving up all ownership control, consider overwriting OpenZeppelin's `Ownable`'s `renounceOwnership()` function in order to disable it.

*Instances (23)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

16: contract AutoVotingEscrowManager is IAutoVotingEscrowManager, Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable  {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

25: contract GaugeCL is ReentrancyGuard, Ownable {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

24: contract GaugeFactoryCL is IGaugeFactoryCL, OwnableUpgradeable {

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

12: contract CustomPoolDeployer is Ownable {

```

```solidity
File: ./contracts/CustomToken.sol

8: contract CustomToken is ERC20, Ownable {

```

```solidity
File: ./contracts/Fan.sol

8: contract TokenFour is ERC20, Ownable {

```

```solidity
File: ./contracts/FixedAuction.sol

10: contract FixedAuction is IGenesisPoolBase, IAuction, OwnableUpgradeable {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

20: contract GaugeExtraRewarder is Ownable {

```

```solidity
File: ./contracts/GaugeManager.sol

33: contract GaugeManager is OwnableUpgradeable, ReentrancyGuardUpgradeable {

```

```solidity
File: ./contracts/GaugeV2.sol

24: contract GaugeV2 is ReentrancyGuard, Ownable {

```

```solidity
File: ./contracts/GenesisPoolManager.sol

29: contract GenesisPoolManager is IGenesisPoolBase, IGenesisPoolManager, OwnableUpgradeable, ReentrancyGuardUpgradeable {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

19: contract MinterUpgradeable is IMinter, OwnableUpgradeable {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

9: contract SetterTopNPoolsStrategy is ITopNPoolsStrategy, Ownable {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

8: contract SetterVoteWeightStrategy is IVoteWeightStrategy, Ownable {

```

```solidity
File: ./contracts/Thenian.sol

14: contract Thenian is ERC721Enumerable, Ownable {

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

9: contract VeArtProxyUpgradeable is IVeArtProxy, OwnableUpgradeable {

```

```solidity
File: ./contracts/VoterV3.sol

20: contract VoterV3 is OwnableUpgradeable, ReentrancyGuardUpgradeable {

```

```solidity
File: ./contracts/chainlink/EpochController.sol

12: contract EpochController is AutomationCompatibleInterface, OwnableUpgradeable  {

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

7: contract AuctionFactory is IAuctionFactory, OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

19: contract BribeFactoryV3 is OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

23: contract GaugeFactory is IGaugeFactory, OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

10: contract GenesisPoolFactory is IGenesisPoolFactory, OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/PairFactory.sol

10: contract PairFactory is IPairFactory, OwnableUpgradeable {

```

### <a name="NC-12"></a>[NC-12] Draft Dependencies
Draft contracts have not received adequate security auditing or are liable to change with future developments.

*Instances (2)*:
```solidity
File: ./contracts/governance/Governor.sol

8: import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

```

```solidity
File: ./contracts/governance/L2Governor.sol

9: import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

```

### <a name="NC-13"></a>[NC-13] Duplicated `require()`/`revert()` Checks Should Be Refactored To A Modifier Or Function

*Instances (261)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

447:         require(msg.sender == owner, 'not owner');

448:         require(_owner != address(0), 'zeroAddr');

455:         require(msg.sender == owner, 'not owner');

456:         require(_voter != address(0), 'zeroAddr');

469:         require(msg.sender == owner, 'not owner');

470:         require(_gaugeManager != address(0), 'zeroAddr');

767:         require(msg.sender == owner, '!owner');

772:         require(msg.sender == owner, '!owner');

777:         require(msg.sender == owner, '!owner');

782:         require(msg.sender == owner, '!owner');

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

165:         require(msg.sender == owner, 'not owner');

166:         require(_owner != address(0), 'zeroAddr');

171:         require(msg.sender == owner, 'not owner');

172:         require(_voter != address(0), 'zeroAddr');

180:         require(msg.sender == owner, 'not owner');

181:         require(_gaugeManager != address(0), 'zeroAddr');

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

73:         require(routes.length >= 1, 'TradeHelper: INVALID_PATH');

152:         require(routes.length >= 1, 'TradeHelper: INVALID_PATH');

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

152:         require(rewardDisitributor.voting_escrow() == voter._ve(), 've!=ve');

486:         require(rewardDisitributor.voting_escrow() == voter._ve(), 've!=ve');

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

92:         require(emergency == false, "emergency");

97:         require(emergency == false, "emergency");

104:         require(emergency == true,"emergency");

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

50:         require(owner() == msg.sender, 'not owner');

55:         require(owner() == msg.sender, 'not owner');

```

```solidity
File: ./contracts/BlackClaims.sol

111:         require(_season.start_time > 0, "SEASON NOT FOUND");

116:         require(transfer_success, "FAILED TRANSFER");

128:         require(_season.start_time > 0, "SEASON NOT FOUND");

130:         require(_season.reward_amount>0, "NO REWARD AMOUNT");

134:         require(transfer_success, "FAILED TRANSFER");

146:         require(_season.start_time > 0, "SEASON NOT FOUND");

148:         require(_season.reward_amount>0, "NO REWARD AMOUNT");

164:         require(_season.start_time > 0, "SEASON NOT FOUND");

219:             require(transfer_success, "FAILED TRANSFER");

```

```solidity
File: ./contracts/BlackGovernor.sol

42:         require(msg.sender == team, "not team");

47:         require(msg.sender == team, "not team");

```

```solidity
File: ./contracts/Bribes.sol

63:         require(_bribeFactory != address(0) && _voter != address(0) && _gaugeManager != address(0) && _owner != address(0), "ZA");

72:         require(minter != address(0), "ZA");

212:         require(amount > 0, "ZV");

213:         require(msg.sender == voter, "NA");

259:         require(amount > 0, "ZV");

260:         require(msg.sender == voter, "NA");

277:         require(msg.sender == gaugeManager, "NA");

307:         require(tokenAmount <= IERC20(tokenAddress).balanceOf(address(this)), "TOO_MUCH");

320:         require(tokenAmount <= IERC20(tokenAddress).balanceOf(address(this)), "TOO_MUCH");

327:         require(_Voter != address(0), "ZA");

339:         require(_minter != address(0), "ZA");

345:         require(_avm!=address(0), "ZA");

352:         require(_owner != address(0), "ZA");

362:         require( (msg.sender == owner || msg.sender == bribeFactory), "NA" );

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

64:         require(account != address(0), "zero address");

71:         require(account != address(0), "zero address");

180:         require(_newRecipient != address(0), "zero address");

185:         require(_newManager != address(0), "zero address");

194:         require(_algebraFarmingProxyPluginFactory != address(0), "zero address");

199:         require(_algebraFactory != address(0), "zero address");

204:         require(_algebraPluginFactory != address(0), "zero address");

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

128:         require(IERC20(rewardToken).balanceOf(address(this)) >= amount, "!ENOUGH");

138:         require(IERC20(rewardToken).balanceOf(address(this)) >= amount, "!ENOUGH");

178:         require(balance >= amount, "!ENOUGH");

```

```solidity
File: ./contracts/GaugeManager.sol

106:         require(_bribeFactory.code.length > 0, "CODELEN");

107:         require(_bribeFactory != address(0), "ZA");

114:         require(_permissionRegistry.code.length > 0, "CODELEN");

115:         require(_permissionRegistry != address(0), "ZA");

121:         require(_voter.code.length > 0, "CODELEN");

122:         require(_voter != address(0), "ZA");

128:         require(_genesisManager != address(0), "ZA");

129:         require(_genesisManager.code.length > 0, "CODELEN");

139:         require(_blackGovernor != address(0), "ZA");

184:         require(_pool.code.length > 0, "CODELEN");

189:         require(_factory != address(0), "ZA");

190:         require(_gaugeFactory != address(0), "ZA");

442:         require(isAlive[_gauge], "DEAD");

463:         require(isGauge[_gauge], 'DEAD');

475:         require(isGauge[_gauge], "!GAUGE");

476:         require(_gauge.code.length > 0, "CODELEN");

483:         require(isGauge[_gauge], "!GAUGE");

489:         require(isGauge[_gauge], "!GAUGE");

494:         require(_internal.code.length > 0, "CODELEN");

500:         require(_external.code.length > 0, "CODELEN");

541:         require(_minter != address(0), "ZA");

542:         require(_minter.code.length > 0, "CODELEN");

```

```solidity
File: ./contracts/GaugeV2.sol

78:         require(msg.sender == DISTRIBUTION, "NA");

83:         require(msg.sender == genesisPool, "NA");

88:         require(msg.sender == genesisManager, "NA");

93:         require(emergency == false, "EMER");

126:         require(_distribution != address(0), "ZA");

127:         require(_distribution != DISTRIBUTION, "SAME_ADDR");

133:         require(_gaugeRewarder != gaugeRewarder, "SAME_ADDR");

140:         require(_int >= address(0), "ZA");

145:         require(emergency == false, "EMER");

152:         require(emergency == true,"EMER");

222:         require(_tokenOwner != address(0), "ZA");

223:         require(_totalAmount > 0, "ZV");

248:         require(amount > 0, "ZV");

273:         require(amount > 0, "ZV");

274:         require(_balanceOf(msg.sender) > 0, "ZV");

290:         require(emergency, "EMER");

292:         require(_amount > 0, "ZV");

304:         require(emergency, "EMER");

```

```solidity
File: ./contracts/GenesisPool.sol

93:         require(_sender == genesisInfo.tokenOwner, "NA");

94:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED || poolStatus == PoolStatus.PRE_LISTING, "INS");

95:         require(_incentivesToken.length > 0, "ZV");

118:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED || poolStatus == PoolStatus.PRE_LISTING, "INS");

125:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED, "INS");

132:         require(poolStatus == PoolStatus.PRE_LISTING || poolStatus == PoolStatus.PRE_LAUNCH, "INS");

133:         require(block.timestamp >= genesisInfo.startTime, "INS");

139:         require(_amount > 0, "ZV");

273:         require(poolStatus == PoolStatus.NOT_QUALIFIED || poolStatus == PoolStatus.PARTIALLY_LAUNCHED, "INS");

274:         require(msg.sender == genesisInfo.tokenOwner, "NA");

285:         require(poolStatus == PoolStatus.NOT_QUALIFIED, "INS");

308:         require(poolStatus == PoolStatus.NOT_QUALIFIED, "INS");

309:         require(msg.sender == genesisInfo.tokenOwner, "NA");

397:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED, "INS");

```

```solidity
File: ./contracts/GenesisPoolManager.sol

104:         require(_sender == genesisPoolInfo.tokenOwner, "NA");

105:         require(allocationInfo.proposedNativeAmount > 0, "ZV");

106:         require(allocationInfo.proposedFundingAmount > 0, "ZV");

114:             require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");

115:             require(IERC20(_fundingToken).balanceOf(pairAddress) == 0, "!ZV");

127:         require(genesisPool != address(0), "ZA");

140:         require(nativeToken != address(0), "ZA");

142:         require(genesisPool != address(0), 'ZA');

149:         require(nativeToken != address(0), "ZA");

151:         require(genesisPool != address(0), 'ZA');

160:             require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");

161:             require(IERC20(genesisInfo.fundingToken).balanceOf(pairAddress) == 0, "!ZV");

172:         require(amount > 0, "ZV");

173:         require(genesisPool != address(0), "ZA");

188:         require(epochController == msg.sender, "NA");

228:         require(epochController == msg.sender, "NA");

270:         require(_genesisPool != address(0), "ZA");

283:         require(_epochController != address(0), "ZA");

300:         require(_nativeToken != address(0), "ZA");

302:         require(genesisPool != address(0), "ZA");

307:         require(_nativeToken != address(0), "ZA");

309:         require(genesisPool != address(0), "ZA");

314:         require(_router == address(0), "ZA");

```

```solidity
File: ./contracts/MinterUpgradeable.sol

113:         require(msg.sender == team, "not team");

118:         require(msg.sender == team, "not team");

```

```solidity
File: ./contracts/Pair.sol

570:         require(token.code.length > 0, "CODELEN");

576:         require(token.code.length > 0, "CODELEN");

```

```solidity
File: ./contracts/PermissionsRegistry.sol

95:         require(_checkRole[_role], 'not a role');

126:         require(_checkRole[_role], 'not a role');

142:         require(_checkRole[_role], 'not a role');

236:         require(msg.sender == emergencyCouncil || msg.sender == blackMultisig, "not allowed");

237:         require(_new != address(0), "addr0");

248:         require(msg.sender == blackTeamMultisig, "not allowed");

250:         require(_new != blackTeamMultisig, "same multisig");

259:         require(msg.sender == blackMultisig, "not allowed");

260:         require(_new != address(0), "addr0");

261:         require(_new != blackMultisig, "same multisig");

```

```solidity
File: ./contracts/RouterV2.sol

259:         require(routes.length >= 1, 'INP');

367:         require(amountA >= amountAMin && amountB >= amountBMin, "IAA");

434:         require(amountA >= amountAMin && amountB >= amountBMin, 'IAA');

548:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

571:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

588:         require(routes[0].from == address(wETH), 'INP');

590:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

608:         require(routes[routes.length - 1].to == address(wETH), 'INP');

610:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

646:         require(token.code.length > 0, "CODELEN");

653:         require(token.code.length > 0, "CODELEN");

741:         require(

756:         require(routes[0].from == address(wETH), 'INP');

762:         require(

778:         require(routes[routes.length - 1].to == address(wETH), 'INP');

784:         require(amountOut >= amountOutMin, 'IOA');

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

31:         require(msg.sender == address(avm), "Only AVM can call");

36:         require(msg.sender == executor, "Only AVM can call");

69:         require(_avm != address(0), "ZA");

76:         require(_executor!=address(0), "ZA"); 

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

56:         require(_avm != address(0), "ZA");

67:         require(_executor != address(0), "ZA");

```

```solidity
File: ./contracts/TokenHandler.sol

45:         require(_permissionRegistry.code.length > 0, "!contract");

65:         require(_token.code.length > 0, "!contract");

84:         require(isWhitelisted[_token], "out");

85:         require(_token.code.length > 0, "!contract");

123:         require(isWhitelisted[_token], "out");

125:         require(_token.code.length > 0, "!contract");

132:         require(isWhitelisted[_token], "out");

134:         require(_token.code.length > 0, "!contract");

162:         require(isWhitelisted[_token], "!whitelisted");

168:         require(isWhitelisted[_token], "!whitelisted");

```

```solidity
File: ./contracts/VotingEscrow.sol

257:         require(owner != address(0), "ZA");

263:         require(senderIsOwner || senderIsApprovedForAll, "NAO");

322:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

324:         require(_isApprovedOrOwner(_sender, _tokenId), "NAO");

541:         require(_isApprovedOrOwner(msg.sender, _tokenId), "NAO");

819:         require(_value > 0, "ZV"); // dev: need non-zero value

820:         require(_locked.amount > 0, 'ZL');

821:         require(_locked.end > block.timestamp || _locked.isPermanent, 'EXP');

840:         require(_value > 0, "ZV"); // dev: need non-zero value

841:         require(unlock_time > block.timestamp && (unlock_time <= block.timestamp + MAXTIME), 'IUT');

883:         require(_locked.amount > 0, 'ZL');

884:         require(_locked.end > block.timestamp || _locked.isPermanent, 'EXP');

903:         require(!_locked.isSMNFT && !_locked.isPermanent, "!NORM");

907:         require((isSMNFT || unlock_time > _locked.end) && (unlock_time <= block.timestamp + MAXTIME), 'IUT'); // IUT -> invalid unlock time

940:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

943:         require(!_locked.isSMNFT && !_locked.isPermanent, "!NORM");

967:         require(_isApprovedOrOwner(sender, _tokenId), "NAO");

970:         require(!_newLocked.isSMNFT && !_newLocked.isPermanent, "!NORM");

971:         require(_newLocked.end > block.timestamp, "EXP");

972:         require(_newLocked.amount > 0, "ZV");

989:         require(_isApprovedOrOwner(msg.sender, _tokenId), "NAO");

991:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

993:         require(!_newLocked.isSMNFT && _newLocked.isPermanent, "!NORM");

1070:         require(msg.sender == voter, "NA");

1075:         require(msg.sender == voter, "NA");

1080:         require(msg.sender == voter, "NA");

1085:         require(attachments[_from] == 0 && !voted[_from], "ATT");

1087:         require(_isApprovedOrOwner(msg.sender, _from) && 

1153:         require(attachments[_from] == 0 && !voted[_from], "ATT");

1154:         require(_isApprovedOrOwner(msg.sender, _from), "NAO");

1157:         require(newLocked.end > block.timestamp || newLocked.isPermanent, "EXP");

1163:         require(_splitAmount != 0, "ZV");

1324:         require(delegatee != msg.sender, "NA");

1325:         require(delegatee != address(0), "ZA");

1343:         require(

1351:         require(

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

31:         require(_auction != address(0), 'addr0');

33:         require(_auction.code.length > 0, "!contract");

41:         require(_auction != address(0), 'addr0');

42:         require(!isAuction[_auction], '!fact');

43:         require(_auction.code.length > 0, "!contract");

55:         require(isAuction[oldPF], '!fact');

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

36:         require(owner() == msg.sender, 'NA');

62:         require( msg.sender == IPermissionsRegistry(permissionsRegistry).emergencyCouncil(), "NA");

82:         require(_gauges.length == _pids.length, "EXACT_LEN");

90:         require(_gauges.length == _rewarder.length, "EXACT_LEN");

106:         require(_gauges.length == int_bribe.length, "EXACT_LEN");

114:         require(_genesisManager != address(0), "ZA");

115:         require(_gauge != address(0), "ZA");

```

```solidity
File: ./contracts/factories/PairFactory.sol

37:         require(msg.sender == feeManager, "NA");

59:         require(msg.sender == owner(), "NA");

68:         require(msg.sender == pendingFeeManager, "NA");

73:         require(_newFee <= 3000, "HFE");

78:         require(_feehandler != address(0), "ZA");

83:         require(_dibs != address(0), "ZA");

92:         require(_fee <= MAX_FEE, "HFE");

102:         require(_fees <= MAX_FEE, "HFE");

103:         require(isPair[_pairAddress], "INVP");

108:         require(isPair[_pairAddress], "INVP");

131:         require(_pairAddress != address(0) && isPair[_pairAddress], "INVP");

142:         require(token0 != address(0), "ZA"); // Pair: ZERO_ADDRESS

158:         require(msg.sender == genesisManager || msg.sender == feeManager,  "NA");

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

26:         require(!(a == -1 && b == _INT256_MIN), "SignedSafeMath: multiplication overflow");

29:         require(c / a == b, "SignedSafeMath: multiplication overflow");

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

18:         require(_pairFactory != address(0) , 'addr0');

19:         require(!self.isFactory[_pairFactory], "fact");

20:         require(_pairFactory.code.length > 0, "!contract");

27:         require(_gaugeFactory != address(0) , 'addr0');

28:         require(!self.isGaugeFactory[_gaugeFactory], "gFact");

29:         require(_gaugeFactory.code.length > 0, "!contract");

36:         require(_pairFactory != address(0), 'addr0');

37:         require(!self.isFactory[_pairFactory], 'fact');

38:         require(_pairFactory.code.length > 0, "!contract");

48:         require(_gaugeFactory != address(0) , 'addr0');

49:         require(!self.isGaugeFactory[_gaugeFactory], 'gFact');

50:         require(_gaugeFactory.code.length > 0, "!contract");

61:         require(self.isFactory[oldPF], "!exists");

69:         require(self.isGaugeFactory[oldGF], "!exists");

```

### <a name="NC-14"></a>[NC-14] Event is never emitted
The following are defined but never emitted. They can be removed to make the code cleaner.

*Instances (2)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

178:     event WBF(address oldWBF, address newWBF);

```

```solidity
File: ./contracts/Bribes.sol

372:     event RewardPaid(address indexed user,address indexed rewardsToken,uint256 reward);

```

### <a name="NC-15"></a>[NC-15] Event missing indexed field
Index event fields make the field more quickly accessible [to off-chain tools](https://ethereum.stackexchange.com/questions/40396/can-somebody-please-explain-the-concept-of-event-indexing) that parse events. This is especially useful when it comes to filtering based on an address. However, note that each index field costs extra gas during emission, so it's not necessarily best to index the maximum allowed per event (three fields). Where applicable, each `event` should use three `indexed` fields if there are three or more fields, and gas usage is not particularly of concern for the events in question. If there are fewer than three applicable fields, all of the applicable fields should be indexed.

*Instances (33)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

175:     event Owner(address oldOwner, address newOwner);

176:     event Voter(address oldVoter, address newVoter);

177:     event GaugeManager(address oldGaugeManager, address newGaugeManager);

178:     event WBF(address oldWBF, address newWBF);

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

130:     event Owner(address oldOwner, address newOwner);

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

137:     event Owner(address oldOwner, address newOwner);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

56:     event RewardAdded(uint256 reward);

```

```solidity
File: ./contracts/BlackClaims.sol

45:     event TreasurySet(address treasury);

46:     event StakedRewards(address staker, uint256 rewards);

```

```solidity
File: ./contracts/GaugeV2.sol

57:     event RewardAdded(uint256 reward);

61:     event DepositsForGenesis(address owner, uint256 amount);

```

```solidity
File: ./contracts/GenesisPool.sol

39:     event DepositedNativeToken(address native, address owner, address genesisPool, uint256 proposedNativeAmount, uint proposedFundingAmount);

40:     event AddedIncentives(address native, address[] incentivesToken, uint256[] incentivesAmount);

41:     event RejectedGenesisPool(address native);

42:     event ApprovedGenesisPool(address proposedToken);

```

```solidity
File: ./contracts/GenesisPoolManager.sol

57:     event WhiteListedTokenToUser(address proposedToken, address tokenOwner);

58:     event DespositedToken(address genesisPool, address sender, uint256 amount);

```

```solidity
File: ./contracts/Pair.sol

86:     event Sync(uint reserve0, uint reserve1);

```

```solidity
File: ./contracts/PermissionsRegistry.sol

29:     event RoleAdded(bytes role);

30:     event RoleRemoved(bytes role);

```

```solidity
File: ./contracts/RewardsDistributor.sol

21:     event CheckpointToken(

26:     event Claimed(

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

17:     event TopNPoolsUpdated(address[] poolAddresses);

18:     event TopNUpdated(uint256 newTopN);

19:     event AVMSet(address avm);

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

14:     event TopNUpdated(uint256 newTopN);

15:     event VoteWeightsUpdated(uint256[] newWeights);

16:     event AVMSet(address newAVM);

17:     event ExecutorUpdated(address newExecutor);

```

```solidity
File: ./contracts/VotingEscrow.sol

66:     event MetadataUpdate(uint256 _tokenId);

67:     event BatchMetadataUpdate(uint256 _fromTokenId, uint256 _toTokenId);

72:     event Supply(uint prevSupply, uint supply);

```

```solidity
File: ./contracts/governance/Governor.sol

768:     event QuorumNumeratorUpdated(uint256 oldQuorumNumerator, uint256 newQuorumNumerator);

```

### <a name="NC-16"></a>[NC-16] Events that mark critical parameter changes should contain both the old and the new value
This should especially be done if the new value is not required to be different from the old value

*Instances (29)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

446:     function setOwner(address _owner) external {
             require(msg.sender == owner, 'not owner');
             require(_owner != address(0), 'zeroAddr');
             owner = _owner;
             emit Owner(msg.sender, _owner);

454:     function setVoter(address _voter) external {
             require(msg.sender == owner, 'not owner');
             require(_voter != address(0), 'zeroAddr');
             address _oldVoter = address(voter);
             voter = IVoter(_voter);
             
             // update variable depending on voter
             pairFactory = IPairFactory(voter.factories()[0]);
             underlyingToken = IVotingEscrow(voter._ve()).token();
     
             emit Voter(_oldVoter, _voter);

468:     function setGaugeManager(address _gaugeManager) external {
             require(msg.sender == owner, 'not owner');
             require(_gaugeManager != address(0), 'zeroAddr');
             address _oldGaugeManager = address(gaugeManager);
             gaugeManager = IGaugeManager(_gaugeManager);
             emit GaugeManager(_oldGaugeManager, _gaugeManager);

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

410:     function setOwner(address _owner) external {
             require(msg.sender == owner, 'NA');
             require(_owner != address(0), 'ZA');
             owner = _owner;
             emit Owner(msg.sender, _owner);

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

447:     function setOwner(address _owner) external {
             require(msg.sender == owner, 'NA');
             require(_owner != address(0), 'ZA');
             owner = _owner;
             emit Owner(msg.sender, _owner);

```

```solidity
File: ./contracts/BlackClaims.sol

64:     function setTreasury(address treasury_) external onlyOwner {
            treasury = treasury_;
            emit TreasurySet(treasury_);

```

```solidity
File: ./contracts/Bribes.sol

351:     function setOwner(address _owner) external onlyAllowed {
             require(_owner != address(0), "ZA");
             owner = _owner;
             emit SetOwner(_owner);

```

```solidity
File: ./contracts/GaugeManager.sol

105:     function setBribeFactory(address _bribeFactory) external GaugeAdmin {
             require(_bribeFactory.code.length > 0, "CODELEN");
             require(_bribeFactory != address(0), "ZA");
             bribefactory = _bribeFactory;
             emit SetBribeFactory(bribefactory, _bribeFactory);

113:     function setPermissionsRegistry(address _permissionRegistry) external GaugeAdmin {
             require(_permissionRegistry.code.length > 0, "CODELEN");
             require(_permissionRegistry != address(0), "ZA");
             emit SetPermissionRegistry(permissionRegistry, _permissionRegistry);

127:     function setGenesisManager(address _genesisManager) external GaugeAdmin {
             require(_genesisManager != address(0), "ZA");
             require(_genesisManager.code.length > 0, "CODELEN");
             emit SetGenesisManager(genesisManager, _genesisManager);

540:     function setMinter(address _minter) external GaugeAdmin {
             require(_minter != address(0), "ZA");
             require(_minter.code.length > 0, "CODELEN");
             emit SetMinter(minter, _minter);

```

```solidity
File: ./contracts/GenesisPool.sol

73:     function setGenesisPoolInfo(GenesisInfo calldata _genesisInfo, TokenAllocation calldata _allocationInfo, address _auction) external onlyManager(){
            genesisInfo = _genesisInfo;
    
            genesisInfo.duration = BlackTimeLibrary.epochMultiples(genesisInfo.duration);
            genesisInfo.startTime = BlackTimeLibrary.epochStart(genesisInfo.startTime);
            
            allocationInfo.proposedNativeAmount = _allocationInfo.proposedNativeAmount;
            allocationInfo.proposedFundingAmount = _allocationInfo.proposedFundingAmount;
            allocationInfo.allocatedNativeAmount = 0;
            allocationInfo.allocatedFundingAmount = 0;
            allocationInfo.refundableNativeAmount = 0;
    
            auction = IAuction(_auction);
            poolStatus = PoolStatus.NATIVE_TOKEN_DEPOSITED;
    
            emit DepositedNativeToken(_genesisInfo.nativeToken, genesisInfo.tokenOwner, address(this), _allocationInfo.proposedNativeAmount, _allocationInfo.proposedFundingAmount);

```

```solidity
File: ./contracts/MinterUpgradeable.sol

159:     function update_period() external returns (uint) {
             uint _period = active_period;
             if (block.timestamp >= _period + WEEK && _initializer == address(0)) { // only trigger if new week
                 epochCount++;
                 _period = (block.timestamp / WEEK) * WEEK;
                 active_period = _period;
                 uint256 _weekly = weekly;
                 uint256 _emission;
                 bool _tail = _weekly < TAIL_START;
     
                 if (_tail) {
                     _emission = (_weekly * tailEmissionRate) / MAX_BPS;
                     weekly = _emission;
                 } else {
                     _emission = _weekly;
                     if (epochCount < 15) {
                         _weekly = (_weekly * WEEKLY_GROWTH) / MAX_BPS;
                     } else {
                         _weekly = (_weekly * WEEKLY_DECAY) / MAX_BPS;
                     }
                     weekly = _weekly;
                 }
     
                 tailEmissionRate = MAX_BPS;
     
                 uint _rebase = calculate_rebase(_emission);
     
                 uint _teamEmissions = _emission * teamRate / MAX_BPS;
     
                 uint _gauge = _emission - _rebase - _teamEmissions;
     
                 uint _balanceOf = _black.balanceOf(address(this));
                 if (_balanceOf < _emission) {
                     _black.mint(address(this), _emission - _balanceOf);
                 }
     
                 require(_black.transfer(team, _teamEmissions));
                 
                 require(_black.transfer(address(_rewards_distributor), _rebase));
                 _rewards_distributor.checkpoint_token(); // checkpoint token balance that was just minted in rewards distributor
     
                 _black.approve(address(_gaugeManager), _gauge);
                 _gaugeManager.notifyRewardAmount(_gauge);
     
                 emit Mint(msg.sender, _emission, _rebase, circulating_supply());

```

```solidity
File: ./contracts/PermissionsRegistry.sol

124:     function setRoleFor(address c, string memory role) external onlyBlackMultisig {
             bytes memory _role = bytes(role);
             require(_checkRole[_role], 'not a role');
             require(!hasRole[_role][c], 'assigned');
     
             hasRole[_role][c] = true;
     
             _roleToAddresses[_role].push(c);
             _addressToRoles[c].push(_role);
     
             emit RoleSetFor(c, _role);

235:     function setEmergencyCouncil(address _new) external {
             require(msg.sender == emergencyCouncil || msg.sender == blackMultisig, "not allowed");
             require(_new != address(0), "addr0");
             require(_new != emergencyCouncil, "same emergencyCouncil");
             emergencyCouncil = _new;
     
             emit SetEmergencyCouncil(_new);

247:     function setBlackTeamMultisig(address _new) external {
             require(msg.sender == blackTeamMultisig, "not allowed");
             require(_new != address(0), "addr 0");
             require(_new != blackTeamMultisig, "same multisig");
             blackTeamMultisig = _new;
             
             emit SetBlackTeamMultisig(_new);

258:     function setBlackMultisig(address _new) external {
             require(msg.sender == blackMultisig, "not allowed");
             require(_new != address(0), "addr0");
             require(_new != blackMultisig, "same multisig");
             blackMultisig = _new;
             
             emit SetBlackMultisig(_new);

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

46:     function setTopNPools(address[] memory _poolAddresses) external onlyExecutor {
            require(_poolAddresses.length <= topN, "Exceeds topN");
    
            delete topNPools;
    
            for (uint256 i = 0; i < _poolAddresses.length; i++) {
                require(_poolAddresses[i] != address(0), "Zero address not allowed");
                topNPools.push(_poolAddresses[i]);
            }
    
            emit TopNPoolsUpdated(_poolAddresses);

59:     function setTopN() external onlyAVM {
            topN = avm.topN();
            emit TopNUpdated(topN);

68:     function setAVM(address _avm) external onlyOwner {
            require(_avm != address(0), "ZA");
            avm = IAutoVotingEscrowManager(_avm);
            emit AVMSet(_avm);

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

45:     function setVoteWeights(uint256[] calldata _weights) external onlyExecutor {
            require(_weights.length <= topN, "Vote weight array exceeds topN");
    
            voteWeights = new uint256[](_weights.length);
            for (uint256 i = 0; i < _weights.length; i++) {
                voteWeights[i] = _weights[i];
            }
            emit VoteWeightsUpdated(_weights);

55:     function setAVM(address _avm) external onlyOwner {
            require(_avm != address(0), "ZA");
            avm = IAutoVotingEscrowManager(_avm);
            emit AVMSet(_avm);

61:     function setTopN() external onlyAVM {
            topN = avm.topN();
            emit TopNUpdated(topN);

66:     function setExecutor(address _executor) external onlyOwnerOrExecutor {
            require(_executor != address(0), "ZA");
            executor = _executor;
            emit ExecutorUpdated(_executor);

```

```solidity
File: ./contracts/TokenHandler.sol

44:     function setPermissionsRegistry(address _permissionRegistry) external Governance {
            require(_permissionRegistry.code.length > 0, "!contract");
            require(_permissionRegistry != address(0), "addr0");
            emit SetPermissionRegistry(permissionRegistry, _permissionRegistry);

161:     function updateTokenVolatilityBucket(address _token, uint256 bucketId) external Governance {
             require(isWhitelisted[_token], "!whitelisted");
             tokenVolatilityBucket[_token] = bucketId; // Update the token's volatility bucket
             emit TokenVolatilityBucketUpdated(_token, bucketId);

```

```solidity
File: ./contracts/VotingEscrow.sol

169:     function setArtProxy(address _proxy) external {
             require(msg.sender == team);
             artProxy = _proxy;
             emit BatchMetadataUpdate(0, type(uint256).max);

275:     function setApprovalForAll(address _operator, bool _approved) external {
             // Throws if `_operator` is the `msg.sender`
             assert(_operator != msg.sender);
             ownerToOperators[msg.sender][_operator] = _approved;
             emit ApprovalForAll(msg.sender, _operator, _approved);

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

35:     function setGenesisManager(address _genesisManager) external onlyManager {
            emit GenesisManagerChanged(genesisManager, _genesisManager);

```

### <a name="NC-17"></a>[NC-17] Function ordering does not follow the Solidity style guide
According to the [Solidity style guide](https://docs.soliditylang.org/en/v0.8.17/style-guide.html#order-of-functions), functions should be laid out in the following order :`constructor()`, `receive()`, `fallback()`, `external`, `public`, `internal`, `private`, but the cases below do not follow this pattern

*Instances (34)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

1: 
   Current order:
   public initialize
   internal getClaimable
   external getAllPair
   external getPair
   internal _pairAddressToInfo
   internal _getBribes
   internal _getNextEpochRewards
   internal getCurrentFees
   external setOwner
   external setVoter
   external setGaugeManager
   external getAmountOut
   internal _getPoolSwapRoutesFromThreeHop
   internal _getSwapRoutesFromTwoHop
   internal _getAmountViaHopping
   internal _getAmountViaHopping
   internal _getCLPoolAmountOut
   internal _getAmountOut
   internal _createRoute
   external setAlgebraFactory
   external setQuoterV2
   external setAlgebraPoolAPI
   external setPairFactory
   public getNextEpochStart
   
   Suggested order:
   external getAllPair
   external getPair
   external setOwner
   external setVoter
   external setGaugeManager
   external getAmountOut
   external setAlgebraFactory
   external setQuoterV2
   external setAlgebraPoolAPI
   external setPairFactory
   public initialize
   public getNextEpochStart
   internal getClaimable
   internal _pairAddressToInfo
   internal _getBribes
   internal _getNextEpochRewards
   internal getCurrentFees
   internal _getPoolSwapRoutesFromThreeHop
   internal _getSwapRoutesFromTwoHop
   internal _getAmountViaHopping
   internal _getAmountViaHopping
   internal _getCLPoolAmountOut
   internal _getAmountOut
   internal _createRoute

```

```solidity
File: ./contracts/APIHelper/GenesisPoolAPI.sol

1: 
   Current order:
   public initialize
   external getGenesisPoolFromNative
   external getGenesisPool
   internal _getGenesisPool
   external getAllGenesisPools
   external getAllUserRelatedGenesisPools
   internal _hasClaimbaleForOwner
   
   Suggested order:
   external getGenesisPoolFromNative
   external getGenesisPool
   external getAllGenesisPools
   external getAllUserRelatedGenesisPools
   public initialize
   internal _getGenesisPool
   internal _hasClaimbaleForOwner

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

1: 
   Current order:
   public initialize
   external getExpectedClaimForNextEpoch
   external getPairBribe
   internal _getNextEpochRewards
   external setOwner
   external setVoter
   external setGaugeManager
   
   Suggested order:
   external getExpectedClaimForNextEpoch
   external getPairBribe
   external setOwner
   external setVoter
   external setGaugeManager
   public initialize
   internal _getNextEpochRewards

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

1: 
   Current order:
   public initialize
   external getWhiteListedTokens
   external getConnectorTokens
   external getTokenBalances
   
   Suggested order:
   external getWhiteListedTokens
   external getConnectorTokens
   external getTokenBalances
   public initialize

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

1: 
   Current order:
   internal _sortTokens
   external sortTokens
   internal _pairFor
   external pairFor
   internal _calculate_k
   internal _calculate_deriv
   public getAmountOutStable
   public getAmountOutVolatile
   public getAmountOut
   public getAmountsOut
   public getAmountInStable
   public getAmountInVolatile
   public getAmountIn
   public getAmountsIn
   
   Suggested order:
   external sortTokens
   external pairFor
   public getAmountOutStable
   public getAmountOutVolatile
   public getAmountOut
   public getAmountsOut
   public getAmountInStable
   public getAmountInVolatile
   public getAmountIn
   public getAmountsIn
   internal _sortTokens
   internal _pairFor
   internal _calculate_k
   internal _calculate_deriv

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

1: 
   Current order:
   external pair_factory
   public initialize
   external getAllNFT
   external getNFTFromId
   external getNFTFromAddress
   public getAVMNFTFromAddress
   internal _getNFTFromId
   external getAllPairRewards
   internal _getRewardsForNft
   internal _pairReward
   internal _addInternalBribeRewards
   internal _addExternalBribeRewards
   internal _createReward
   external setOwner
   external setVoter
   external setAVM
   external setGaugeManager
   external setGaugeFactory
   external setRewardDistro
   external setPairAPI
   external setPairFactory
   
   Suggested order:
   external pair_factory
   external getAllNFT
   external getNFTFromId
   external getNFTFromAddress
   external getAllPairRewards
   external setOwner
   external setVoter
   external setAVM
   external setGaugeManager
   external setGaugeFactory
   external setRewardDistro
   external setPairAPI
   external setPairFactory
   public initialize
   public getAVMNFTFromAddress
   internal _getNFTFromId
   internal _getRewardsForNft
   internal _pairReward
   internal _addInternalBribeRewards
   internal _addExternalBribeRewards
   internal _createReward

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

1: 
   Current order:
   external pair_factory
   public initialize
   external getAllNFT
   external getNFTFromId
   external getNFTFromAddress
   public getAVMNFTFromAddress
   internal _getNFTFromId
   external getAllPairRewards
   internal _getRewardsForNft
   internal _pairReward
   internal _addInternalBribeRewards
   internal _addExternalBribeRewards
   internal _createReward
   external setOwner
   external setVoter
   external setAVM
   external setGaugeManager
   external setGaugeFactory
   external setGaugeFactoryCL
   external setRewardDistro
   external setPairAPI
   external setPairFactory
   
   Suggested order:
   external pair_factory
   external getAllNFT
   external getNFTFromId
   external getNFTFromAddress
   external getAllPairRewards
   external setOwner
   external setVoter
   external setAVM
   external setGaugeManager
   external setGaugeFactory
   external setGaugeFactoryCL
   external setRewardDistro
   external setPairAPI
   external setPairFactory
   public initialize
   public getAVMNFTFromAddress
   internal _getNFTFromId
   internal _getRewardsForNft
   internal _pairReward
   internal _addInternalBribeRewards
   internal _addExternalBribeRewards
   internal _createReward

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

1: 
   Current order:
   external activateEmergencyMode
   external stopEmergencyMode
   external balanceOf
   external earned
   external deposit
   external withdraw
   public getReward
   external notifyRewardAmount
   external gaugeBalances
   external claimFees
   internal _claimFees
   external rewardForDuration
   external setInternalBribe
   internal _safeTransfer
   external stakedFees
   internal getCommunityVaultAccruedFee
   
   Suggested order:
   external activateEmergencyMode
   external stopEmergencyMode
   external balanceOf
   external earned
   external deposit
   external withdraw
   external notifyRewardAmount
   external gaugeBalances
   external claimFees
   external rewardForDuration
   external setInternalBribe
   external stakedFees
   public getReward
   internal _claimFees
   internal _safeTransfer
   internal getCommunityVaultAccruedFee

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

1: 
   Current order:
   external activateEmergencyMode
   external stopEmergencyMode
   external setInternalBribe
   public initialize
   external setRegistry
   external setAlgebraPoolApi
   external createGauge
   internal createEternalFarming
   internal getIncentiveKey
   external gauges
   external activateEmergencyMode
   external stopEmergencyMode
   external setInternalBribe
   external length
   external setDibs
   external setReferralFee
   
   Suggested order:
   external activateEmergencyMode
   external stopEmergencyMode
   external setInternalBribe
   external setRegistry
   external setAlgebraPoolApi
   external createGauge
   external gauges
   external activateEmergencyMode
   external stopEmergencyMode
   external setInternalBribe
   external length
   external setDibs
   external setReferralFee
   public initialize
   internal createEternalFarming
   internal getIncentiveKey

```

```solidity
File: ./contracts/Black.sol

1: 
   Current order:
   external setMinter
   external initialMint
   external approve
   internal _mint
   internal _transfer
   external transfer
   external transferFrom
   external mint
   external burn
   external burnFrom
   internal _burn
   
   Suggested order:
   external setMinter
   external initialMint
   external approve
   external transfer
   external transferFrom
   external mint
   external burn
   external burnFrom
   internal _mint
   internal _transfer
   internal _burn

```

```solidity
File: ./contracts/BlackClaims.sol

1: 
   Current order:
   external setTreasury
   external startSeason
   public isSeasonFinalized
   public isSeasonClaimingActive
   public isSeasonClaimingEnded
   external revokeUnclaimedReward
   external finalize
   external extendClaimDuration
   external reportRewards
   internal _preClaim
   external claimAndStakeReward
   public getClaimableReward
   external recoverERC20
   external setOwner
   external setOwner2
   
   Suggested order:
   external setTreasury
   external startSeason
   external revokeUnclaimedReward
   external finalize
   external extendClaimDuration
   external reportRewards
   external claimAndStakeReward
   external recoverERC20
   external setOwner
   external setOwner2
   public isSeasonFinalized
   public isSeasonClaimingActive
   public isSeasonClaimingEnded
   public getClaimableReward
   internal _preClaim

```

```solidity
File: ./contracts/BlackGovernor.sol

1: 
   Current order:
   public votingDelay
   public votingPeriod
   external setTeam
   external setProposalNumerator
   public proposalThreshold
   public clock
   public CLOCK_MODE
   public cancel
   public quorum
   public propose
   
   Suggested order:
   external setTeam
   external setProposalNumerator
   public votingDelay
   public votingPeriod
   public proposalThreshold
   public clock
   public CLOCK_MODE
   public cancel
   public quorum
   public propose

```

```solidity
File: ./contracts/Bribes.sol

1: 
   Current order:
   public getEpochStart
   public getNextEpochStart
   external rewardsListLength
   public earned
   public getPriorBalanceIndex
   public getPriorSupplyIndex
   external isRewardToken
   internal _isRewardToken
   external deposit
   internal _writeCheckpoint
   internal _writeSupplyCheckpoint
   external withdraw
   external getReward
   external notifyRewardAmount
   external recoverERC20AndUpdateData
   external emergencyRecoverERC20
   external setVoter
   external setGaugeManager
   external setMinter
   external setAVM
   external setOwner
   
   Suggested order:
   external rewardsListLength
   external isRewardToken
   external deposit
   external withdraw
   external getReward
   external notifyRewardAmount
   external recoverERC20AndUpdateData
   external emergencyRecoverERC20
   external setVoter
   external setGaugeManager
   external setMinter
   external setAVM
   external setOwner
   public getEpochStart
   public getNextEpochStart
   public earned
   public getPriorBalanceIndex
   public getPriorSupplyIndex
   internal _isRewardToken
   internal _writeCheckpoint
   internal _writeSupplyCheckpoint

```

```solidity
File: ./contracts/FixedAuction.sol

1: 
   Current order:
   public initialize
   external getNativePrice
   external getNativeTokenAmount
   external getFundingTokenAmount
   external purchased
   
   Suggested order:
   external getNativePrice
   external getNativeTokenAmount
   external getFundingTokenAmount
   external purchased
   public initialize

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

1: 
   Current order:
   external onReward
   external pendingTokens
   external TOKEN
   external onReward
   public pendingReward
   internal _pendingReward
   public setDistributionRate
   public updatePool
   external recoverERC20
   external _gauge
   
   Suggested order:
   external onReward
   external pendingTokens
   external TOKEN
   external onReward
   external recoverERC20
   external _gauge
   public pendingReward
   public setDistributionRate
   public updatePool
   internal _pendingReward

```

```solidity
File: ./contracts/GaugeManager.sol

1: 
   Current order:
   public initialize
   external setBribeFactory
   external setPermissionsRegistry
   external setVoter
   external setGenesisManager
   external getBlackGovernor
   external setBlackGovernor
   external createGauges
   external createGauge
   external createGaugeWithBonusReward
   internal _createGauge
   private _saveBribeData
   private _deployBribes
   internal addressToString
   internal setGaugeAsCommunityFeeReceiver
   external notifyRewardAmount
   external distributeFees
   external distributeFees
   internal _distributeFees
   external distributeAll
   external distribute
   external distribute
   internal _distribute
   private _updateForAfterDistribution
   external killGauge
   external reviveGauge
   external setFarmingParam
   external setNewBribes
   external setInternalBribeFor
   external setExternalBribeFor
   private _setInternalBribe
   private _setExternalBribe
   external claimRewards
   external claimRewards
   external claimBribes
   external fetchInternalBribeFromPool
   external fetchExternalBribeFromPool
   external isGaugeAliveForPool
   external setMinter
   external addGaugeFactory
   external replaceGaugeFactory
   external removeGaugeFactory
   external addPairFactory
   external replacePairFactory
   external removePairFactory
   external setAVM
   external acceptAlgebraFeeChangeProposal
   
   Suggested order:
   external setBribeFactory
   external setPermissionsRegistry
   external setVoter
   external setGenesisManager
   external getBlackGovernor
   external setBlackGovernor
   external createGauges
   external createGauge
   external createGaugeWithBonusReward
   external notifyRewardAmount
   external distributeFees
   external distributeFees
   external distributeAll
   external distribute
   external distribute
   external killGauge
   external reviveGauge
   external setFarmingParam
   external setNewBribes
   external setInternalBribeFor
   external setExternalBribeFor
   external claimRewards
   external claimRewards
   external claimBribes
   external fetchInternalBribeFromPool
   external fetchExternalBribeFromPool
   external isGaugeAliveForPool
   external setMinter
   external addGaugeFactory
   external replaceGaugeFactory
   external removeGaugeFactory
   external addPairFactory
   external replacePairFactory
   external removePairFactory
   external setAVM
   external acceptAlgebraFeeChangeProposal
   public initialize
   internal _createGauge
   internal addressToString
   internal setGaugeAsCommunityFeeReceiver
   internal _distributeFees
   internal _distribute
   private _saveBribeData
   private _deployBribes
   private _updateForAfterDistribution
   private _setInternalBribe
   private _setExternalBribe

```

```solidity
File: ./contracts/GaugeV2.sol

1: 
   Current order:
   external onReward
   external setDistribution
   external setGaugeRewarder
   external setInternalBribe
   external activateEmergencyMode
   external stopEmergencyMode
   public totalSupply
   external balanceOf
   internal _balanceOf
   public lastTimeRewardApplicable
   public rewardPerToken
   public earned
   external rewardForDuration
   external periodFinish
   external depositsForGenesis
   internal _depositsForGenesis
   external depositAll
   external deposit
   internal _deposit
   external withdrawAll
   external withdraw
   internal _withdraw
   external emergencyWithdraw
   external emergencyWithdrawAmount
   internal _deductBalance
   external withdrawAllAndHarvest
   public getReward
   public getReward
   external setGenesisPool
   external notifyRewardAmount
   external claimFees
   internal _claimFees
   external setGenesisPoolManager
   
   Suggested order:
   external onReward
   external setDistribution
   external setGaugeRewarder
   external setInternalBribe
   external activateEmergencyMode
   external stopEmergencyMode
   external balanceOf
   external rewardForDuration
   external periodFinish
   external depositsForGenesis
   external depositAll
   external deposit
   external withdrawAll
   external withdraw
   external emergencyWithdraw
   external emergencyWithdrawAmount
   external withdrawAllAndHarvest
   external setGenesisPool
   external notifyRewardAmount
   external claimFees
   external setGenesisPoolManager
   public totalSupply
   public lastTimeRewardApplicable
   public rewardPerToken
   public earned
   public getReward
   public getReward
   internal _balanceOf
   internal _depositsForGenesis
   internal _deposit
   internal _withdraw
   internal _deductBalance
   internal _claimFees

```

```solidity
File: ./contracts/GenesisPool.sol

1: 
   Current order:
   external setGenesisPoolInfo
   external addIncentives
   external rejectPool
   external approvePool
   external depositToken
   external eligbleForPreLaunchPool
   internal _eligbleForPreLaunchPool
   internal _eligbleForCompleteLaunch
   external eligbleForDisqualify
   external transferIncentives
   external setPoolStatus
   internal _setPoolStatus
   internal _approveTokens
   internal _addLiquidityAndDistribute
   internal _launchCompletely
   internal _launchPartially
   external launch
   public claimableNative
   public claimableDeposits
   external claimNative
   external claimDeposits
   public claimableIncentives
   external claimIncentives
   external balanceOf
   external deductAmount
   external deductAllAmount
   external getNativeTokenAmount
   internal _getNativeTokenAmount
   external getFundingTokenAmount
   internal _getFundingTokenAmount
   external getAllocationInfo
   external getIncentivesInfo
   external getGenesisInfo
   external getLiquidityPoolInfo
   external setAuction
   external setMaturityTime
   external setStartTime
   
   Suggested order:
   external setGenesisPoolInfo
   external addIncentives
   external rejectPool
   external approvePool
   external depositToken
   external eligbleForPreLaunchPool
   external eligbleForDisqualify
   external transferIncentives
   external setPoolStatus
   external launch
   external claimNative
   external claimDeposits
   external claimIncentives
   external balanceOf
   external deductAmount
   external deductAllAmount
   external getNativeTokenAmount
   external getFundingTokenAmount
   external getAllocationInfo
   external getIncentivesInfo
   external getGenesisInfo
   external getLiquidityPoolInfo
   external setAuction
   external setMaturityTime
   external setStartTime
   public claimableNative
   public claimableDeposits
   public claimableIncentives
   internal _eligbleForPreLaunchPool
   internal _eligbleForCompleteLaunch
   internal _setPoolStatus
   internal _approveTokens
   internal _addLiquidityAndDistribute
   internal _launchCompletely
   internal _launchPartially
   internal _getNativeTokenAmount
   internal _getFundingTokenAmount

```

```solidity
File: ./contracts/GenesisPoolManager.sol

1: 
   Current order:
   external isPair
   external getPair
   external createPair
   external setGenesisPool
   external setGenesisStatus
   internal _checkGovernance
   public initialize
   external check
   external whiteListUserAndToken
   external depositNativeToken
   external rejectGenesisPool
   external approveGenesisPool
   external depositToken
   external checkAtEpochFlip
   internal _preLaunchPool
   internal _launchPool
   external checkBeforeEpochFlip
   internal _removeLiveToken
   external setAuction
   external getAllNaitveTokens
   external getLiveNaitveTokens
   external setEpochController
   external setMinimumDuration
   external setMinimumThreshold
   external setMaturityTime
   external setMaturityTime
   external setGenesisStartTime
   external setRouter
   
   Suggested order:
   external isPair
   external getPair
   external createPair
   external setGenesisPool
   external setGenesisStatus
   external check
   external whiteListUserAndToken
   external depositNativeToken
   external rejectGenesisPool
   external approveGenesisPool
   external depositToken
   external checkAtEpochFlip
   external checkBeforeEpochFlip
   external setAuction
   external getAllNaitveTokens
   external getLiveNaitveTokens
   external setEpochController
   external setMinimumDuration
   external setMinimumThreshold
   external setMaturityTime
   external setMaturityTime
   external setGenesisStartTime
   external setRouter
   public initialize
   internal _checkGovernance
   internal _preLaunchPool
   internal _launchPool
   internal _removeLiveToken

```

```solidity
File: ./contracts/GlobalRouter.sol

1: 
   Current order:
   external getAmountOutStable
   external getAmountOutVolatile
   external getAmountOut
   external getAmountsOut
   external getAmountInStable
   external pairFor
   external sortTokens
   external allPairsLength
   external isPair
   external pairCodeHash
   external getPair
   external createPair
   external transferFrom
   external permit
   external swap
   external burn
   external mint
   external getReserves
   external getAmountOut
   external totalSupply
   external transfer
   external decimals
   external symbol
   external balanceOf
   external transferFrom
   external approve
   external getFee
   external MAX_REFERRAL_FEE
   internal min
   internal sqrt
   internal sub
   external deposit
   external transfer
   external withdraw
   external exactInputSingle
   external exactInput
   external exactOutputSingle
   external exactOutput
   external exactInputSingleSupportingFeeOnTransferTokens
   internal _swap
   external swapExactTokensForTokens
   external exactInput
   external getAmountOutStable
   external getAmountOutVolatile
   external getAmountOut
   external getAmountsOut
   external getAmountInStable
   external pairFor
   external sortTokens
   internal _safeTransferFrom
   internal _safeTransferETH
   internal _safeTransfer
   
   Suggested order:
   external getAmountOutStable
   external getAmountOutVolatile
   external getAmountOut
   external getAmountsOut
   external getAmountInStable
   external pairFor
   external sortTokens
   external allPairsLength
   external isPair
   external pairCodeHash
   external getPair
   external createPair
   external transferFrom
   external permit
   external swap
   external burn
   external mint
   external getReserves
   external getAmountOut
   external totalSupply
   external transfer
   external decimals
   external symbol
   external balanceOf
   external transferFrom
   external approve
   external getFee
   external MAX_REFERRAL_FEE
   external deposit
   external transfer
   external withdraw
   external exactInputSingle
   external exactInput
   external exactOutputSingle
   external exactOutput
   external exactInputSingleSupportingFeeOnTransferTokens
   external swapExactTokensForTokens
   external exactInput
   external getAmountOutStable
   external getAmountOutVolatile
   external getAmountOut
   external getAmountsOut
   external getAmountInStable
   external pairFor
   external sortTokens
   internal min
   internal sqrt
   internal sub
   internal _swap
   internal _safeTransferFrom
   internal _safeTransferETH
   internal _safeTransfer

```

```solidity
File: ./contracts/MinterUpgradeable.sol

1: 
   Current order:
   public initialize
   external _initialize
   external setTeam
   external acceptTeam
   external setGaugeManager
   external setTeamRate
   public calculate_rebase
   external nudge
   external update_period
   public circulating_supply
   external check
   external period
   external setRewardDistributor
   
   Suggested order:
   external _initialize
   external setTeam
   external acceptTeam
   external setGaugeManager
   external setTeamRate
   external nudge
   external update_period
   external check
   external period
   external setRewardDistributor
   public initialize
   public calculate_rebase
   public circulating_supply

```

```solidity
File: ./contracts/Pair.sol

1: 
   Current order:
   external observationLength
   public lastObservation
   external metadata
   external tokens
   external isStable
   external claimFees
   external claimStakingFees
   internal _update0
   internal _update1
   internal _updateFor
   public getReserves
   internal _update
   public currentCumulativePrices
   external current
   external quote
   external prices
   public sample
   external mint
   external burn
   external swap
   external skim
   external sync
   internal _f
   internal _d
   internal _get_y
   external getAmountOut
   internal _getAmountOut
   internal _k
   internal _mint
   internal _burn
   external approve
   external permit
   external transfer
   external transferFrom
   internal _transferTokens
   internal _safeTransfer
   internal _safeApprove
   
   Suggested order:
   external observationLength
   external metadata
   external tokens
   external isStable
   external claimFees
   external claimStakingFees
   external current
   external quote
   external prices
   external mint
   external burn
   external swap
   external skim
   external sync
   external getAmountOut
   external approve
   external permit
   external transfer
   external transferFrom
   public lastObservation
   public getReserves
   public currentCumulativePrices
   public sample
   internal _update0
   internal _update1
   internal _updateFor
   internal _update
   internal _f
   internal _d
   internal _get_y
   internal _getAmountOut
   internal _k
   internal _mint
   internal _burn
   internal _transferTokens
   internal _safeTransfer
   internal _safeApprove

```

```solidity
File: ./contracts/PairFees.sol

1: 
   Current order:
   internal _safeTransfer
   external claimFeesFor
   external processStakingFees
   external withdrawStakingFees
   
   Suggested order:
   external claimFeesFor
   external processStakingFees
   external withdrawStakingFees
   internal _safeTransfer

```

```solidity
File: ./contracts/PermissionsRegistry.sol

1: 
   Current order:
   external addRole
   external removeRole
   external setRoleFor
   external removeRoleFrom
   external rolesToString
   external roles
   external rolesLength
   external roleToAddresses
   external addressToRole
   public helper_stringToBytes
   public helper_bytesToString
   external setEmergencyCouncil
   external setBlackTeamMultisig
   external setBlackMultisig
   
   Suggested order:
   external addRole
   external removeRole
   external setRoleFor
   external removeRoleFrom
   external rolesToString
   external roles
   external rolesLength
   external roleToAddresses
   external addressToRole
   external setEmergencyCouncil
   external setBlackTeamMultisig
   external setBlackMultisig
   public helper_stringToBytes
   public helper_bytesToString

```

```solidity
File: ./contracts/RewardsDistributor.sol

1: 
   Current order:
   external timestamp
   internal _checkpoint_token
   external checkpoint_token
   internal _find_timestamp_user_epoch
   internal _claim
   internal _claimable
   external claimable
   external claim
   external claim_many
   external setDepositor
   external setOwner
   external withdrawERC20
   external setAVM
   
   Suggested order:
   external timestamp
   external checkpoint_token
   external claimable
   external claim
   external claim_many
   external setDepositor
   external setOwner
   external withdrawERC20
   external setAVM
   internal _checkpoint_token
   internal _find_timestamp_user_epoch
   internal _claim
   internal _claimable

```

```solidity
File: ./contracts/RouterV2.sol

1: 
   Current order:
   external allPairsLength
   external isPair
   external getPair
   external createPair
   external isGenesis
   external transferFrom
   external permit
   external swap
   external burn
   external mint
   external getReserves
   external getAmountOut
   external totalSupply
   external totalSupply
   external transfer
   external decimals
   external symbol
   external balanceOf
   external transferFrom
   external approve
   external getFee
   external getPair
   external MAX_REFERRAL_FEE
   internal min
   internal sqrt
   internal sub
   external deposit
   external transfer
   external withdraw
   internal _k
   public sortTokens
   public pairFor
   internal quoteLiquidity
   public getReserves
   public getAmountOut
   public getPoolAmountOut
   internal _swapRatio
   public getAmountsOut
   external quoteAddLiquidity
   external quoteRemoveLiquidity
   internal _addLiquidity
   external addLiquidity
   external addLiquidityETH
   public removeLiquidity
   public removeLiquidityETH
   external removeLiquidityWithPermit
   external removeLiquidityETHWithPermit
   internal _swap
   external swapExactTokensForTokensSimple
   external swapExactTokensForTokens
   external swapExactETHForTokens
   external swapExactTokensForETH
   external UNSAFE_swapExactTokensForTokens
   internal _safeTransferETH
   internal _safeTransfer
   internal _safeTransferFrom
   public removeLiquidityETHSupportingFeeOnTransferTokens
   external removeLiquidityETHWithPermitSupportingFeeOnTransferTokens
   internal _swapSupportingFeeOnTransferTokens
   external swapExactTokensForTokensSupportingFeeOnTransferTokens
   external swapExactETHForTokensSupportingFeeOnTransferTokens
   external swapExactTokensForETHSupportingFeeOnTransferTokens
   external setSwapRouter
   external setAlgebraFactory
   external setQuoterV2
   external setAlgebraPoolAPI
   
   Suggested order:
   external allPairsLength
   external isPair
   external getPair
   external createPair
   external isGenesis
   external transferFrom
   external permit
   external swap
   external burn
   external mint
   external getReserves
   external getAmountOut
   external totalSupply
   external totalSupply
   external transfer
   external decimals
   external symbol
   external balanceOf
   external transferFrom
   external approve
   external getFee
   external getPair
   external MAX_REFERRAL_FEE
   external deposit
   external transfer
   external withdraw
   external quoteAddLiquidity
   external quoteRemoveLiquidity
   external addLiquidity
   external addLiquidityETH
   external removeLiquidityWithPermit
   external removeLiquidityETHWithPermit
   external swapExactTokensForTokensSimple
   external swapExactTokensForTokens
   external swapExactETHForTokens
   external swapExactTokensForETH
   external UNSAFE_swapExactTokensForTokens
   external removeLiquidityETHWithPermitSupportingFeeOnTransferTokens
   external swapExactTokensForTokensSupportingFeeOnTransferTokens
   external swapExactETHForTokensSupportingFeeOnTransferTokens
   external swapExactTokensForETHSupportingFeeOnTransferTokens
   external setSwapRouter
   external setAlgebraFactory
   external setQuoterV2
   external setAlgebraPoolAPI
   public sortTokens
   public pairFor
   public getReserves
   public getAmountOut
   public getPoolAmountOut
   public getAmountsOut
   public removeLiquidity
   public removeLiquidityETH
   public removeLiquidityETHSupportingFeeOnTransferTokens
   internal min
   internal sqrt
   internal sub
   internal _k
   internal quoteLiquidity
   internal _swapRatio
   internal _addLiquidity
   internal _swap
   internal _safeTransferETH
   internal _safeTransfer
   internal _safeTransferFrom
   internal _swapSupportingFeeOnTransferTokens

```

```solidity
File: ./contracts/TokenHandler.sol

1: 
   Current order:
   external setPermissionsRegistry
   external whitelistTokens
   external whitelistToken
   private _whitelist
   external blacklistTokens
   external blacklistToken
   private _blacklist
   external whitelistNFT
   external blacklistNFT
   external whitelistConnectors
   external whitelistConnector
   internal _whitelistConnector
   external blacklistConnector
   external setBucketType
   external getBucketType
   external updateTokenVolatilityBucket
   external getTokenVolatilityBucket
   external whiteListedTokensLength
   external connectorTokensLength
   external whiteListedTokens
   external connectorTokens
   
   Suggested order:
   external setPermissionsRegistry
   external whitelistTokens
   external whitelistToken
   external blacklistTokens
   external blacklistToken
   external whitelistNFT
   external blacklistNFT
   external whitelistConnectors
   external whitelistConnector
   external blacklistConnector
   external setBucketType
   external getBucketType
   external updateTokenVolatilityBucket
   external getTokenVolatilityBucket
   external whiteListedTokensLength
   external connectorTokensLength
   external whiteListedTokens
   external connectorTokens
   internal _whitelistConnector
   private _whitelist
   private _blacklist

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

1: 
   Current order:
   public initialize
   internal toString
   external _tokenURI
   
   Suggested order:
   external _tokenURI
   public initialize
   internal toString

```

```solidity
File: ./contracts/VotingEscrow.sol

1: 
   Current order:
   external setTeam
   external setArtProxy
   external tokenURI
   public ownerOf
   public ownerToNFTokenCountFn
   internal _balance
   external balanceOf
   external getApproved
   external isApprovedForAll
   public approve
   external setApprovalForAll
   internal _clearApproval
   internal _isApprovedOrOwner
   external isApprovedOrOwner
   internal _transferFrom
   external transferFrom
   external safeTransferFrom
   internal _isContract
   public safeTransferFrom
   external supportsInterface
   public tokenOfOwnerByIndex
   internal _addTokenToOwnerList
   internal _addTokenTo
   internal _mint
   internal _removeTokenFromOwnerList
   internal _removeTokenFrom
   internal _burn
   external get_last_user_slope
   external user_point_history
   external point_history
   external user_point_epoch
   internal _checkpoint
   internal _deposit_for
   external checkpoint
   external deposit_for
   internal _create_lock
   external create_lock
   external create_lock_for
   external increase_amount
   external increase_unlock_time
   internal updateToSMNFT
   external withdraw
   external lockPermanent
   external unlockPermanent
   external balanceOfNFT
   external balanceOfNFTAt
   external balanceOfAtNFT
   external totalSupplyAt
   external totalSupply
   public totalSupplyAtT
   external setVoter
   external setAVM
   external voting
   external abstain
   external attach
   external detach
   external merge
   external split
   private _createSplitNFT
   external toggleSplit
   public delegates
   external getVotes
   public getPastVotes
   public getsmNFTPastVotes
   external getPastTotalSupply
   external getsmNFTPastTotalSupply
   internal _delegate
   public delegate
   public delegateBySig
   external setSmNFTBonus
   public calculate_sm_nft_bonus
   public calculate_original_sm_nft_amount
   
   Suggested order:
   external setTeam
   external setArtProxy
   external tokenURI
   external balanceOf
   external getApproved
   external isApprovedForAll
   external setApprovalForAll
   external isApprovedOrOwner
   external transferFrom
   external safeTransferFrom
   external supportsInterface
   external get_last_user_slope
   external user_point_history
   external point_history
   external user_point_epoch
   external checkpoint
   external deposit_for
   external create_lock
   external create_lock_for
   external increase_amount
   external increase_unlock_time
   external withdraw
   external lockPermanent
   external unlockPermanent
   external balanceOfNFT
   external balanceOfNFTAt
   external balanceOfAtNFT
   external totalSupplyAt
   external totalSupply
   external setVoter
   external setAVM
   external voting
   external abstain
   external attach
   external detach
   external merge
   external split
   external toggleSplit
   external getVotes
   external getPastTotalSupply
   external getsmNFTPastTotalSupply
   external setSmNFTBonus
   public ownerOf
   public ownerToNFTokenCountFn
   public approve
   public safeTransferFrom
   public tokenOfOwnerByIndex
   public totalSupplyAtT
   public delegates
   public getPastVotes
   public getsmNFTPastVotes
   public delegate
   public delegateBySig
   public calculate_sm_nft_bonus
   public calculate_original_sm_nft_amount
   internal _balance
   internal _clearApproval
   internal _isApprovedOrOwner
   internal _transferFrom
   internal _isContract
   internal _addTokenToOwnerList
   internal _addTokenTo
   internal _mint
   internal _removeTokenFromOwnerList
   internal _removeTokenFrom
   internal _burn
   internal _checkpoint
   internal _deposit_for
   internal _create_lock
   internal updateToSMNFT
   internal _delegate
   private _createSplitNFT

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

1: 
   Current order:
   public initialize
   external addAuction
   external replaceAuction
   external removeAuction
   external auctionsLength
   external allAuctions
   
   Suggested order:
   external addAuction
   external replaceAuction
   external removeAuction
   external auctionsLength
   external allAuctions
   public initialize

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

1: 
   Current order:
   external setDistribution
   external activateEmergencyMode
   external stopEmergencyMode
   external setInternalBribe
   external setRewarderPid
   external setGaugeRewarder
   external setFeeVault
   external setGenesisPoolManager
   public initialize
   external setRegistry
   external gauges
   external length
   external createGauge
   external activateEmergencyMode
   external stopEmergencyMode
   external setRewarderPid
   external setGaugeRewarder
   external setDistribution
   external setInternalBribe
   external setGenesisManager
   
   Suggested order:
   external setDistribution
   external activateEmergencyMode
   external stopEmergencyMode
   external setInternalBribe
   external setRewarderPid
   external setGaugeRewarder
   external setFeeVault
   external setGenesisPoolManager
   external setRegistry
   external gauges
   external length
   external createGauge
   external activateEmergencyMode
   external stopEmergencyMode
   external setRewarderPid
   external setGaugeRewarder
   external setDistribution
   external setInternalBribe
   external setGenesisManager
   public initialize

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

1: 
   Current order:
   public initialize
   external setGenesisManager
   external genesisPoolsLength
   external removeGenesisPool
   external removeGenesisPool
   external createGenesisPool
   external getGenesisPools
   public getGenesisPool
   
   Suggested order:
   external setGenesisManager
   external genesisPoolsLength
   external removeGenesisPool
   external removeGenesisPool
   external createGenesisPool
   external getGenesisPools
   public initialize
   public getGenesisPool

```

```solidity
File: ./contracts/factories/PairFactory.sol

1: 
   Current order:
   public initialize
   external allPairsLength
   external setPause
   external setFeeManager
   external acceptFeeManager
   external setStakingFees
   external setStakingFeeAddress
   external setDibs
   external setReferralFee
   external setFee
   external setCustomFees
   external setCustomReferralFee
   public getFee
   public getReferralFee
   public getIsGenesis
   external setIsGenesis
   external pairCodeHash
   external createPair
   external setGenesisManager
   external setGenesisStatus
   
   Suggested order:
   external allPairsLength
   external setPause
   external setFeeManager
   external acceptFeeManager
   external setStakingFees
   external setStakingFeeAddress
   external setDibs
   external setReferralFee
   external setFee
   external setCustomFees
   external setCustomReferralFee
   external setIsGenesis
   external pairCodeHash
   external createPair
   external setGenesisManager
   external setGenesisStatus
   public initialize
   public getFee
   public getReferralFee
   public getIsGenesis

```

```solidity
File: ./contracts/governance/Governor.sol

1: 
   Current order:
   public supportsInterface
   public name
   public version
   public hashProposal
   public proposalProposer
   public state
   public proposalSnapshot
   public proposalDeadline
   public proposalThreshold
   internal _quorumReached
   internal _voteSucceeded
   internal _voteDefeated
   internal _getVotes
   internal _countVote
   internal _defaultParams
   internal _proposal
   public execute
   internal _execute
   internal _beforeExecute
   internal _afterExecute
   internal _cancel
   public getVotes
   public getVotesWithParams
   public castVote
   public castVoteWithReason
   public castVoteWithReasonAndParams
   public castVoteBySig
   public castVoteWithReasonAndParamsBySig
   internal _castVote
   internal _castVote
   external relay
   internal _executor
   public onERC721Received
   public onERC1155Received
   public onERC1155BatchReceived
   public COUNTING_MODE
   public hasVoted
   public proposalVotes
   internal _quorumReached
   internal _voteSucceeded
   internal _voteDefeated
   internal _countVote
   internal _getVotes
   public quorumNumerator
   public quorumDenominator
   public quorum
   external updateQuorumNumerator
   internal _updateQuorumNumerator
   
   Suggested order:
   external relay
   external updateQuorumNumerator
   public supportsInterface
   public name
   public version
   public hashProposal
   public proposalProposer
   public state
   public proposalSnapshot
   public proposalDeadline
   public proposalThreshold
   public execute
   public getVotes
   public getVotesWithParams
   public castVote
   public castVoteWithReason
   public castVoteWithReasonAndParams
   public castVoteBySig
   public castVoteWithReasonAndParamsBySig
   public onERC721Received
   public onERC1155Received
   public onERC1155BatchReceived
   public COUNTING_MODE
   public hasVoted
   public proposalVotes
   public quorumNumerator
   public quorumDenominator
   public quorum
   internal _quorumReached
   internal _voteSucceeded
   internal _voteDefeated
   internal _getVotes
   internal _countVote
   internal _defaultParams
   internal _proposal
   internal _execute
   internal _beforeExecute
   internal _afterExecute
   internal _cancel
   internal _castVote
   internal _castVote
   internal _executor
   internal _quorumReached
   internal _voteSucceeded
   internal _voteDefeated
   internal _countVote
   internal _getVotes
   internal _updateQuorumNumerator

```

### <a name="NC-18"></a>[NC-18] Functions should not be longer than 50 lines
Overly complex code can make understanding functionality more difficult, try to further modularize your code to ensure readability 

*Instances (950)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

34:     function acceptLock(address _owner, uint256 _tokenId) external onlyManager {

40:     function releaseLock(uint256 _tokenId) external onlyManager {

58:     function lockOwner(uint256 _tokenId) external view override returns (address) {

64:     function isFull() external view override returns (bool) {

68:     function getLockCount() external view override returns (uint256) {

72:     function voteLocks(uint256 start, uint256 length) external override onlyManager {

86:     function resetLocks(uint256 start, uint256 length) external override onlyManager {

98:     function _vote(uint256 tokenId, address[] memory pools, uint[] memory weights) internal {

111:     function getTotalVotingPower() external view returns (uint256) {

119:     function getLocks() external view returns (LockInfo[] memory) {

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

50:     function initialize(address _votingEscrow, address _voter, address _rewardsDistributor) public initializer {

61:     function enableAutoVoting(uint256 tokenId) external {

88:     function disableAutoVoting(uint256 tokenId) external {

108:     function getAVMIndex(address avmAddr) internal view returns (uint256) {

137:     function getAVMs() external view returns (IAutoVotingEscrow[] memory) {

141:     function setVoter(address _voter) external onlyOwner {

147:     function setExecutor(address _executor) external {

153:     function setTopPoolsStrategy(address strategy) external onlyOwner {

158:     function setVoteWeightStrategy(address strategy) external onlyOwner {

163:     function getTopPools() external view returns (address[] memory) {

169:     function getVoteWeights() external view returns (uint256[] memory) {

174:     function getTotalVotingPower() external view returns (uint256) {

182:     function setTopN(uint256 _topN) public onlyOwner {

194:     function setOriginalOwner(uint256 _tokenId, address _user) external onlyVotingEscrow {} // implement this

196:     function getOriginalOwner(uint256 _tokenId) external view returns (address) {

```

```solidity
File: ./contracts/AVM/interfaces/IAutoVotingEscrow.sol

10:     function acceptLock(address user, uint256 tokenId) external;

13:     function lockOwner(uint256 tokenId) external view returns (address);

14:     function getLockCount() external view returns (uint256);

15:     function voteLocks (uint start, uint end) external;

16:     function resetLocks(uint start, uint end) external;

17:     function getTotalVotingPower() external view returns (uint256);

18:     function getLocks() external view returns (LockInfo[] memory);

```

```solidity
File: ./contracts/AVM/interfaces/IAutoVotingEscrowManager.sol

7:     function getTopPools() external view returns (address[] memory);

8:     function getVoteWeights() external view returns (uint[] memory);

10:     function getTotalVotingPower() external view returns (uint256 _totalAVMVotingPower);

11:     function executor() external view returns (address);

12:     function getAVMs() external view returns (IAutoVotingEscrow[] memory);

13:     function tokenIdToAVMId(uint256 tokenId) external returns(uint256 avmIdx);

14:     function getOriginalOwner(uint256 tokenId) external view returns(address);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

96:     function activateEmergencyMode() external onlyOwner {

110:     function balanceOf(uint256 tokenId) external view returns (uint256) {

115:     function earned(uint256 tokenId) external view returns (uint256 reward, uint256 bonusReward) {

124:     function deposit(uint256 tokenId) external nonReentrant isNotEmergency {

136:     function withdraw(uint256 tokenId) external nonReentrant isNotEmergency {

146:     function getReward(uint256 tokenId, bool isBonusReward) public nonReentrant onlyDistribution {

157:     function notifyRewardAmount(address token, uint256 reward) external nonReentrant 

185:     function gaugeBalances() external view returns (uint256 token0, uint256 token1){

206:     function claimFees() external nonReentrant returns (uint256 claimed0, uint256 claimed1) {

210:     function _claimFees() internal returns (uint256 claimed0, uint256 claimed1) {

257:     function rewardForDuration() external view returns (uint256) {

262:     function setInternalBribe(address _int) external onlyOwner {

267:     function _safeTransfer(address token,address to,uint256 value) internal {

273:     function stakedFees() external view returns (uint256 totalFeeToken0, uint256 totalFeeToken1) {

293:     function getCommunityVaultAccruedFee() internal view returns (uint256 communityVaultAccruedFeeToken0, uint256 communityVaultAccruedFeeToken1) {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

21:     function setInternalBribe(address intbribe) external;

38:     function initialize(address _permissionRegistry) initializer  public {

49:     function setRegistry(address _registry) external {

54:     function setAlgebraPoolApi(address _algebraPoolAPIStorage) external {

59:     function createGauge(address _rewardToken,address _ve,address _pool,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, 

69:     function createEternalFarming(address _pool, address _algebraEternalFarming, address _rewardToken, address _bonusRewardToken) internal {

85:     function getIncentiveKey(address _rewardToken, address _bonusRewardToken, address _pool, address _algebraEternalFarming) internal view returns (IncentiveKey memory) {

93:     function gauges(uint256 i) external view returns(address) {

102:     function activateEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

109:     function stopEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

116:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {

128:     function setDibs(address _dibs) external onlyAllowed {

133:     function setReferralFee(uint256 _dibsFee) external onlyAllowed {

```

```solidity
File: ./contracts/Black.sol

34:     function initialMint(address _recipient) external {

40:     function approve(address _spender, uint _value) external returns (bool) {

46:     function _mint(address _to, uint _amount) internal returns (bool) {

55:     function _transfer(address _from, address _to, uint _value) internal returns (bool) {

64:     function transfer(address _to, uint _value) external returns (bool) {

68:     function transferFrom(address _from, address _to, uint _value) external returns (bool) {

76:     function mint(address account, uint amount) external returns (bool) {

82:     function burn(uint256 value) external returns (bool) {

87:     function burnFrom(address _from, uint _value) external returns (bool) {

96:     function _burn(address _from, uint _amount) internal returns (bool) {

```

```solidity
File: ./contracts/BlackClaims.sol

64:     function setTreasury(address treasury_) external onlyOwner {

86:     function isSeasonFinalized() public view returns(bool _finalized) 

93:     function isSeasonClaimingActive() public view returns(bool _active) 

100:     function isSeasonClaimingEnded() public view returns(bool _ended) 

107:     function revokeUnclaimedReward() external onlyOwner

201:     function claimAndStakeReward(uint percent) external returns (uint)

228:     function getClaimableReward(address userAddress) public view returns(uint256 _reward) 

241:     function recoverERC20(address tokenAddress_) external onlyOwner {

247:     function setOwner(address _owner) external onlyOwner {

251:     function setOwner2(address _owner) external onlyOwner {

```

```solidity
File: ./contracts/BlackGovernor.sol

33:     function votingDelay() public pure override(IGovernor) returns (uint256) {

37:     function votingPeriod() public pure override(IGovernor) returns (uint256) {

46:     function setProposalNumerator(uint256 numerator) external {

63:     function clock() public view override returns (uint48) {}

65:     function CLOCK_MODE() public view override returns (string memory) {}

91:     function quorum(uint256 blockTimestamp) public view override (L2GovernorVotesQuorumFraction, IGovernor) returns (uint256) {

```

```solidity
File: ./contracts/Bribes.sol

82:     function getEpochStart() public view returns(uint256){

87:     function getNextEpochStart() public view returns(uint256){

94:     function rewardsListLength() external view returns(uint256) {

99:     function earned(uint256 tokenId, address _rewardToken) public view returns(uint256){

133:     function getPriorBalanceIndex(uint256 tokenId, uint256 timestamp) public view returns (uint256) {

165:     function getPriorSupplyIndex(uint256 timestamp) public view returns (uint256) {

197:     function isRewardToken(address _rewardToken) external view returns (bool) {

201:     function _isRewardToken(address _rewardToken) internal view returns (bool) {

211:     function deposit(uint256 amount, uint256 tokenId) external nonReentrant {

223:     function _writeCheckpoint(uint256 tokenId, uint256 balance) internal {

258:     function withdraw(uint256 amount, uint256 tokenId) external nonReentrant {

272:     function getReward(uint256 tokenId, address[] memory tokens) external nonReentrant  {

289:     function notifyRewardAmount(address _rewardsToken, uint256 reward) external nonReentrant {

306:     function recoverERC20AndUpdateData(address tokenAddress, uint256 tokenAmount) external onlyAllowed {

319:     function emergencyRecoverERC20(address tokenAddress, uint256 tokenAmount) external onlyAllowed {

326:     function setVoter(address _Voter) external onlyAllowed {

332:     function setGaugeManager(address _gaugeManager) external onlyAllowed {

338:     function setMinter(address _minter) external onlyAllowed {

344:     function setAVM(address _avm) external onlyAllowed {

351:     function setOwner(address _owner) external onlyAllowed {

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

63:     function addAuthorizedAccount(address account) external onlyOwner {

70:     function removeAuthorizedAccount(address account) external onlyOwner {

135:     function afterCreatePoolHook(address, address, address) external pure {

171:     function setFee(address pool, uint16 newFee) external onlyAuthorized {

175:     function setCommunityFee(address pool, uint16 newCommunityFee) external onlyAuthorized {

179:     function setAlgebraFeeRecipient(address _newRecipient) external onlyOwner {

184:     function setAlgebraFeeManager(address _newManager) external onlyOwner {

189:     function setAlgebraFeeShare(uint16 _newFeeShare) external onlyOwner {

193:     function setAlgebraFarmingProxyPluginFactory(address _algebraFarmingProxyPluginFactory) external onlyOwner {

198:     function setAlgebraFactory(address _algebraFactory) external onlyOwner {

203:     function setAlgebraPluginFactory(address _algebraPluginFactory) external onlyOwner {

```

```solidity
File: ./contracts/CustomToken.sol

31:     function mint(address account, uint256 amount) external onlyOwner {

40:     function burn(address account, uint256 amount) external onlyOwner {

```

```solidity
File: ./contracts/Fan.sol

22:     function mint(address account, uint256 amount) external onlyOwner {

31:     function burn(address account, uint256 amount) external onlyOwner {

```

```solidity
File: ./contracts/FixedAuction.sol

18:     function getNativePrice() external view returns (uint256){

24:     function getNativeTokenAmount(uint256 depositAmount) external view returns (uint256){

30:     function getFundingTokenAmount(uint256 depositAmount) external view returns (uint256){

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

11:     function onReward(uint256 pid, address user, address recipient, uint256 lqdrAmount, uint256 newLpAmount) external;

12:     function pendingTokens(uint256 pid, address user, uint256 lqdrAmount) external view returns (IERC20[] memory, uint256[] memory);

69:     function onReward(address _user, address to, uint256 userBalance) onlyGauge external {

90:     function pendingReward(address _user) public view returns (uint256 pending){

93:     function _pendingReward(address _user) internal view returns(uint256 pending){

126:     function setDistributionRate(uint256 amount) public onlyOwner {

148:     function updatePool() public returns (PoolInfo memory pool) {

174:     function recoverERC20(uint amount, address token) external onlyOwner {

```

```solidity
File: ./contracts/GaugeManager.sol

80:     function initialize(address __ve, address _tokenHandler, address _gaugeFactory, address _gaugeFactoryCL, 

105:     function setBribeFactory(address _bribeFactory) external GaugeAdmin {

113:     function setPermissionsRegistry(address _permissionRegistry) external GaugeAdmin {

120:     function setVoter(address _voter) external GaugeAdmin{

127:     function setGenesisManager(address _genesisManager) external GaugeAdmin {

134:     function getBlackGovernor() external view returns (address){

138:     function setBlackGovernor(address _blackGovernor) external GaugeAdmin {

151:     function createGauges(address[] memory _pool, uint256[] memory _gaugeTypes) external nonReentrant returns(address[] memory, address[] memory, address[] memory)  {

166:     function createGauge(address _pool, uint256 _gaugeType) external nonReentrant returns (address _gauge, address _internal_bribe, address _external_bribe)  {

170:     function createGaugeWithBonusReward(address _pool, uint256 _gaugeType, address bonusRewardToken) external nonReentrant returns (address _gauge, address _internal_bribe, address _external_bribe)  {

181:     function _createGauge(address _pool, uint256 _gaugeType, address bonusRewardToken) internal returns (address _gauge, address _internal_bribe, address _external_bribe) {

229:     function _saveBribeData(address _pool, address _gauge, address _internal_bribe, address _external_bribe) private {

244:     function _deployBribes(address _pool, address tokenA, address tokenB, uint256 _gaugeType) private returns (address _internal_bribe, address _external_bribe) 

264:     function addressToString(address _addr) internal pure returns (string memory) {

282:     function setGaugeAsCommunityFeeReceiver(address _gauge, address _pool) internal {

290:     function notifyRewardAmount(uint256 amount) external {

313:    function distributeFees(uint256 _start, uint256 _finish) external nonReentrant {

321:     function _distributeFees(address _pool) internal {

352:     function distribute(uint256 _start, uint256 _finish) external nonReentrant {

361:     function distribute(address[] memory _gauges) external nonReentrant {

406:     function _updateForAfterDistribution(address _gauge) private {

441:     function killGauge(address _gauge) external Governance {

461:     function reviveGauge(address _gauge) external Governance {

469:     function setFarmingParam(address _farmingCenter, address _algebraEternalFarming, address _nfpm) external GaugeAdmin {

474:     function setNewBribes(address _gauge, address _internal, address _external) external GaugeAdmin {

482:     function setInternalBribeFor(address _gauge, address _internal) external GaugeAdmin {

488:     function setExternalBribeFor(address _gauge, address _external) external GaugeAdmin {

493:     function _setInternalBribe(address _gauge, address _internal) private {

499:     function _setExternalBribe(address _gauge, address _external) private {

506:     function claimRewards(address[] memory _gauges) external {

513:     function claimRewards(address _gauge, uint256[] memory _nftIds, bool isBonusReward) external {

520:     function claimBribes(address[] memory _bribes, address[][] memory _tokens, uint256 _tokenId) external {

527:     function fetchInternalBribeFromPool(address _pool) external returns (address) {

531:     function fetchExternalBribeFromPool(address _pool) external returns (address) {

535:     function isGaugeAliveForPool(address _pool) external returns (bool) {

540:     function setMinter(address _minter) external GaugeAdmin {

547:     function addGaugeFactory(address _gaugeFactory) external GaugeAdmin {

551:     function replaceGaugeFactory(address _gaugeFactory, uint256 _pos) external GaugeAdmin {

555:     function removeGaugeFactory(uint256 _pos) external GaugeAdmin {

559:     function addPairFactory(address _pairFactory) external GaugeAdmin {

563:     function replacePairFactory(address _pairFactory, uint256 _pos) external GaugeAdmin {

567:     function removePairFactory(uint256 _pos) external GaugeAdmin {

571:     function setAVM(address _avm) external onlyOwner {

575:     function acceptAlgebraFeeChangeProposal (address _pool, uint16 newAlgebraFee) external GaugeAdmin {

```

```solidity
File: ./contracts/GaugeV2.sol

125:     function setDistribution(address _distribution) external onlyOwner {

132:     function setGaugeRewarder(address _gaugeRewarder) external onlyOwner {

139:     function setInternalBribe(address _int) external onlyOwner {

144:     function activateEmergencyMode() external onlyOwner {

168:     function totalSupply() public view returns (uint256) {

173:     function balanceOf(address account) external view returns (uint256) {

177:     function _balanceOf(address account) internal view returns (uint256) {

184:     function lastTimeRewardApplicable() public view returns (uint256) {

189:     function rewardPerToken() public view returns (uint256) {

198:     function earned(address account) public view returns (uint256) {

203:     function rewardForDuration() external view returns (uint256) {

207:     function periodFinish() external view returns (uint256) {

221:     function depositsForGenesis(address _tokenOwner, uint256 _timestamp, uint256 _totalAmount) external onlyGenesisPool nonReentrant { 

228:     function _depositsForGenesis(address _tokenOwner, uint256 _timestamp, uint256 _totalAmount) internal updateReward(address(0)) {       

247:     function _deposit(uint256 amount, address account) internal nonReentrant isNotEmergency updateReward(account) {

272:     function _withdraw(uint256 amount) internal nonReentrant isNotEmergency updateReward(msg.sender) {

289:     function emergencyWithdraw() external nonReentrant {

302:     function emergencyWithdrawAmount(uint256 _amount) external nonReentrant {

313:     function _deductBalance(uint256 _amount) internal {

334:     function getReward(address _user) public nonReentrant onlyDistribution updateReward(_user) {

348:     function getReward() public nonReentrant updateReward(msg.sender) {

376:     function setGenesisPool(address _genesisPool) external onlyGenesisManager{

382:     function notifyRewardAmount(address token, uint256 reward) external nonReentrant isNotEmergency onlyDistribution updateReward(address(0)) {

407:     function claimFees() external nonReentrant returns (uint256 claimed0, uint256 claimed1) {

411:      function _claimFees() internal returns (uint256 claimed0, uint256 claimed1) {

438:     function setGenesisPoolManager(address _genesisPoolManager) external onlyOwner {

```

```solidity
File: ./contracts/GenesisPool.sol

73:     function setGenesisPoolInfo(GenesisInfo calldata _genesisInfo, TokenAllocation calldata _allocationInfo, address _auction) external onlyManager(){

91:     function addIncentives(address[] calldata _incentivesToken, uint256[] calldata _incentivesAmount) external {

124:     function approvePool(address _pairAddress) external onlyManager {

131:     function depositToken(address spender, uint256 amount) external onlyManager returns (bool) {

159:     function eligbleForPreLaunchPool() external view returns (bool){

163:     function _eligbleForPreLaunchPool() internal view returns (bool){

170:     function _eligbleForCompleteLaunch() internal view returns (bool){

174:     function eligbleForDisqualify() external view returns (bool){

181:     function transferIncentives(address gauge, address external_bribe, address internal_bribe) external onlyManager {

201:     function setPoolStatus(PoolStatus status) external onlyManager {

205:     function _setPoolStatus(PoolStatus status) internal {

219:     function _approveTokens(address router) internal {

224:     function _addLiquidityAndDistribute(address _router, uint256 nativeDesired, uint256 fundingDesired, uint256 maturityTime) internal {

231:     function _launchCompletely(address router, uint256 maturityTime) internal {

237:     function _launchPartially(address router, uint256 maturityTime) internal {

243:     function launch(address router, uint256 maturityTime) external onlyManager {

254:     function claimableNative() public view returns(PoolStatus, address token, uint256 amount){

264:     function claimableDeposits() public view returns(PoolStatus, address token, uint256 amount){

295:     function claimableIncentives() public view returns(address[] memory tokens , uint256[] memory amounts){

323:     function balanceOf(address account) external view returns (uint256) {

330:     function deductAmount(address account, uint256 gaugeTokenAmount) external onlyGauge {

348:     function deductAllAmount(address account) external onlyGauge {

354:     function getNativeTokenAmount(uint256 depositAmount) external view returns (uint256){

359:     function _getNativeTokenAmount(uint256 depositAmount) internal view returns (uint256){

363:     function getFundingTokenAmount(uint256 nativeAmount) external view returns (uint256){

368:     function _getFundingTokenAmount(uint256 nativeAmount) internal view returns (uint256){

372:     function getAllocationInfo() external view returns (TokenAllocation memory){

376:     function getIncentivesInfo() external view returns (IGenesisPoolBase.TokenIncentiveInfo memory incentiveInfo){

387:     function getGenesisInfo() external view returns (IGenesisPoolBase.GenesisInfo memory){

391:     function getLiquidityPoolInfo() external view returns (IGenesisPoolBase.LiquidityPool memory){

395:     function setAuction(address _auction) external onlyManagerOrProtocol {

401:     function setMaturityTime(uint256 _maturityTime) external onlyManager{

405:     function setStartTime(uint256 _startTime) external onlyManager{

```

```solidity
File: ./contracts/GenesisPoolManager.sol

22:     function isPair(address pair) external view returns (bool);

23:     function getPair(address tokenA, address token, bool stable) external view returns (address);

24:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

25:     function setGenesisPool(address _genesisPool) external;

26:     function setGenesisStatus(address _pair, bool status) external;

64:     function _checkGovernance() internal view returns (bool) {

70:     function initialize(address _epochController, address _router, address _permissionRegistory, address _gaugeManager, address _pairFactory, address _genesisFactory, address _auctionFactory, address _tokenHandler) initializer  public {

95:     function whiteListUserAndToken(address tokenOwner, address proposedToken) external Governance {

100:     function depositNativeToken(address nativeToken, uint auctionIndex, GenesisInfo calldata genesisPoolInfo, TokenAllocation calldata allocationInfo) external nonReentrant returns(address genesisPool) {

139:     function rejectGenesisPool(address nativeToken) external Governance {

148:     function approveGenesisPool(address nativeToken) external Governance {

171:     function depositToken(address genesisPool, uint256 amount) external nonReentrant{

211:     function _preLaunchPool(address genesisPool) internal {

218:     function _launchPool(address _nativeToken, address _genesisPool) internal {

257:     function _removeLiveToken(address nativeToken) internal {

269:     function setAuction(address _genesisPool, address _auction) external Governance {

274:     function getAllNaitveTokens() external view returns (address[] memory) {

278:     function getLiveNaitveTokens() external view returns (address[] memory) {

282:     function setEpochController(address _epochController) external Governance {

287:     function setMinimumDuration(uint256 _duration) external Governance {

291:     function setMinimumThreshold(uint256 _threshold) external Governance {

295:     function setMaturityTime(uint256 _maturityTime) external Governance {

299:     function setMaturityTime(address _nativeToken, uint256 _maturityTime) external Governance {

306:     function setGenesisStartTime(address _nativeToken, uint256 _startTime) external Governance {

313:     function setRouter (address _router) external onlyOwner {

```

```solidity
File: ./contracts/GlobalRouter.sol

16:     function getAmountOutStable(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount);

17:     function getAmountOutVolatile(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount);

18:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount, bool stable);

19:     function getAmountsOut(uint amountIn, Route[] memory routes) external view returns (uint[] memory amounts);

20:     function getAmountInStable(uint amountOut, address tokenIn, address tokenOut) external view returns (uint amountIn);

21:     function pairFor(address tokenA, address tokenB, bool stable) external view returns (address pair);

22:     function sortTokens(address tokenA, address tokenB) external pure returns (address token0, address token1);

27:     function allPairsLength() external view returns (uint);

28:     function isPair(address pair) external view returns (bool);

29:     function pairCodeHash() external view returns (bytes32);

30:     function getPair(address tokenA, address token, bool stable) external view returns (address);

31:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

35:     function transferFrom(address src, address dst, uint amount) external returns (bool);

36:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

37:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

38:     function burn(address to) external returns (uint amount0, uint amount1);

39:     function mint(address to) external returns (uint liquidity);

40:     function getReserves() external view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast);

41:     function getAmountOut(uint, address) external view returns (uint);

45:     function totalSupply() external view returns (uint256);

46:     function transfer(address recipient, uint amount) external returns (bool);

47:     function decimals() external view returns (uint8);

48:     function symbol() external view returns (string memory);

49:     function balanceOf(address) external view returns (uint);

50:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

51:     function approve(address spender, uint value) external returns (bool);

55:     function getFee(bool _stable) external view returns(uint256);

56:     function MAX_REFERRAL_FEE() external view returns(uint256);

61:     function min(uint a, uint b) internal pure returns (uint) {

64:     function sqrt(uint y) internal pure returns (uint z) {

76:     function sub(uint x, uint y) internal pure returns (uint z) {

83:     function transfer(address to, uint value) external returns (bool);

105:     function exactInputSingle(ExactInputSingleParams calldata params) external payable returns (uint256 amountOut);

118:     function exactInput(ExactInputParams calldata params) external payable returns (uint256 amountOut);

134:     function exactOutputSingle(ExactOutputSingleParams calldata params) external payable returns (uint256 amountIn);

147:     function exactOutput(ExactOutputParams calldata params) external payable returns (uint256 amountIn);

153:     function exactInputSingleSupportingFeeOnTransferTokens(ExactInputSingleParams calldata params)

177:     function _swap(uint[] memory amounts, ITradeHelper.Route[] memory routes, address _to) internal virtual {

193:     function swapExactTokensForTokens(uint amountIn,uint amountOutMin, ITradeHelper.Route[] calldata routes,address to,uint deadline, bool _type) external ensure(deadline) returns (uint[] memory amounts){

204:     function exactInput(IRouterV3.ExactInputParams memory params)

251:     function getAmountOutStable(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount){

254:     function getAmountOutVolatile(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount){

257:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount, bool stable){

260:     function getAmountsOut(uint amountIn, ITradeHelper.Route[] memory routes) external view returns (uint[] memory amounts){

263:     function getAmountInStable(uint amountOut, address tokenIn, address tokenOut) external view returns (uint amountIn){

266:     function pairFor(address tokenA, address tokenB, bool stable) external view returns (address pair){

269:     function sortTokens(address tokenA, address tokenB) external view returns (address token0, address token1){

280:     function _safeTransferFrom(address token, address from, address to, uint256 value) internal {

287:     function _safeTransferETH(address to, uint value) internal {

292:     function _safeTransfer(address token, address to, uint256 value) internal {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

111:     function setGaugeManager(address __gaugeManager) external {

124:     function calculate_rebase(uint _weeklyMint) public view returns (uint) {

159:     function update_period() external returns (uint) {

208:     function circulating_supply() public view returns (uint) {

220:     function setRewardDistributor(address _rewardDistro) external {

```

```solidity
File: ./contracts/Pair.sol

119:     function observationLength() external view returns (uint) {

123:     function lastObservation() public view returns (Observation memory) {

127:     function metadata() external view returns (uint dec0, uint dec1, uint r0, uint r1, bool st, address t0, address t1) {

131:     function tokens() external view returns (address, address) {

140:     function claimFees() external returns (uint claimed0, uint claimed1) {

240:     function getReserves() public view returns (uint _reserve0, uint _reserve1, uint _blockTimestampLast) {

247:     function _update(uint balance0, uint balance1, uint _reserve0, uint _reserve1) internal {

267:     function currentCumulativePrices() public view returns (uint reserve0Cumulative, uint reserve1Cumulative, uint blockTimestamp) {

283:     function current(address tokenIn, uint amountIn) external view returns (uint amountOut) {

297:     function quote(address tokenIn, uint amountIn, uint granularity) external view returns (uint amountOut) {

307:     function prices(address tokenIn, uint amountIn, uint points) external view returns (uint[] memory) {

311:     function sample(address tokenIn, uint amountIn, uint points, uint window) public view returns (uint[] memory) {

335:     function mint(address to) external lock returns (uint liquidity) {

358:     function burn(address to) external lock returns (uint amount0, uint amount1) {

380:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {

428:     function _f(uint x0, uint y) internal pure returns (uint) {

432:     function _d(uint x0, uint y) internal pure returns (uint) {

436:     function _get_y(uint x0, uint xy, uint y) internal pure returns (uint) {

460:     function getAmountOut(uint amountIn, address tokenIn) external view returns (uint) {

466:     function _getAmountOut(uint amountIn, address tokenIn, uint _reserve0, uint _reserve1) internal view returns (uint) {

481:     function _k(uint x, uint y) internal view returns (uint) {

493:     function _mint(address dst, uint amount) internal {

500:     function _burn(address dst, uint amount) internal {

507:     function approve(address spender, uint amount) external returns (bool) {

514:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {

539:     function transfer(address dst, uint amount) external returns (bool) {

544:     function transferFrom(address src, address dst, uint amount) external returns (bool) {

559:     function _transferTokens(address src, address dst, uint amount) internal {

569:     function _safeTransfer(address token,address to,uint256 value) internal {

575:     function _safeApprove(address token,address spender,uint256 value) internal {

```

```solidity
File: ./contracts/PairFees.sol

22:     function _safeTransfer(address token,address to,uint256 value) internal {

29:     function claimFeesFor(address recipient, uint amount0, uint amount1) external {

37:     function processStakingFees(uint amount, bool isTokenZero) external {

49:     function withdrawStakingFees(address recipient) external {

```

```solidity
File: ./contracts/PairGenerator.sol

13:     function pairCodeHash() external pure returns (bytes32) {

17:     function createPair(address token0, address token1, bool stable) external returns (address pair) {

```

```solidity
File: ./contracts/PermissionsRegistry.sol

83:     function addRole(string memory role) external onlyBlackMultisig {

93:     function removeRole(string memory role) external onlyBlackMultisig {

124:     function setRoleFor(address c, string memory role) external onlyBlackMultisig {

140:     function removeRoleFrom(address c, string memory role) external onlyBlackMultisig {

176:     function rolesToString() external view returns(string[] memory __roles){

185:     function roles() external view returns(bytes[] memory){

190:     function rolesLength() external view returns(uint){

195:     function roleToAddresses(string memory role) external view returns(address[] memory _addresses){

200:     function addressToRole(address _user) external view returns(string[] memory){

215:     function helper_stringToBytes(string memory _input) public pure returns(bytes memory){

220:     function helper_bytesToString(bytes memory _input) public pure returns(string memory){

235:     function setEmergencyCouncil(address _new) external {

247:     function setBlackTeamMultisig(address _new) external {

258:     function setBlackMultisig(address _new) external {

```

```solidity
File: ./contracts/RewardsDistributor.sol

70:     function timestamp() external view returns (uint) {

112:     function _find_timestamp_user_epoch(address ve, uint tokenId, uint _timestamp, uint max_user_epoch) internal view returns (uint) {

128:     function _claim(uint _tokenId, address ve, uint _last_token_time) internal returns (uint) {

162:     function _claimable(uint _tokenId, address ve, uint _last_token_time) internal view returns (uint) {

192:     function claimable(uint _tokenId) external view returns (uint) {

197:     function claim(uint256 _tokenId) external returns (uint256) {

219:     function claim_many(uint[] memory _tokenIds) external returns (bool) {

248:     function setDepositor(address _depositor) external {

265:     function setAVM(address _avm) external onlyOwner {

```

```solidity
File: ./contracts/RouterV2.sol

25:     function allPairsLength() external view returns (uint);

26:     function isPair(address pair) external view returns (bool);

27:     function getPair(address tokenA, address token, bool stable) external view returns (address);

28:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

29:     function isGenesis(address pair) external view returns (bool);

33:     function transferFrom(address src, address dst, uint amount) external returns (bool);

34:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

35:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

36:     function burn(address to) external returns (uint amount0, uint amount1);

37:     function mint(address to) external returns (uint liquidity);

38:     function getReserves() external view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast);

39:     function getAmountOut(uint, address) external view returns (uint);

40:     function totalSupply() external view returns (uint);

44:     function totalSupply() external view returns (uint256);

45:     function transfer(address recipient, uint amount) external returns (bool);

46:     function decimals() external view returns (uint8);

47:     function symbol() external view returns (string memory);

48:     function balanceOf(address) external view returns (uint);

49:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

50:     function approve(address spender, uint value) external returns (bool);

54:     function getFee(address _pairAddress, bool _stable) external view returns(uint256);

55:     function getPair(address tokenA, address token, bool stable) external view returns (address);

56:     function MAX_REFERRAL_FEE() external view returns(uint256);

61:     function min(uint a, uint b) internal pure returns (uint) {

64:     function sqrt(uint y) internal pure returns (uint z) {

76:     function sub(uint x, uint y) internal pure returns (uint z) {

83:     function transfer(address to, uint value) external returns (bool);

151:     function _k(uint x, uint y, uint decimals0, uint decimals1, bool stable) internal pure returns (uint) {

163:     function sortTokens(address tokenA, address tokenB) public pure returns (address token0, address token1) {

169:     function pairFor(address tokenA, address tokenB, bool stable) public view returns (address pair) {

175:     function quoteLiquidity(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {

181:     function getReserves(address tokenA, address tokenB, bool stable) public view returns (uint reserveA, uint reserveB) {

188:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount, bool stable) {

220:     function getPoolAmountOut(uint amountIn, address tokenIn, address pair) public view returns (uint amount) {

233:     function _swapRatio(uint amountIn, address tokenIn, address pair, uint amountOut) internal view returns (bool){

258:     function getAmountsOut(uint amountIn, route[] memory routes) public returns (uint[] memory amounts) {

499:     function _swap(uint[] memory amounts, route[] memory routes, address _to) internal virtual {

587:     function swapExactETHForTokens(uint amountOutMin, route[] calldata routes, address to, uint deadline) external payable ensure(deadline) returns (uint[] memory amounts) {

603:     function swapExactTokensForETH(uint amountIn, uint amountOutMin, route[] calldata routes, address to, uint deadline)

640:     function _safeTransferETH(address to, uint value) internal {

645:     function _safeTransfer(address token, address to, uint256 value) internal {

652:     function _safeTransferFrom(address token, address from, address to, uint256 value) internal {

662:     function removeLiquidityETHSupportingFeeOnTransferTokens(

685:     function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(

705:     function _swapSupportingFeeOnTransferTokens(route[] calldata routes, address _to) internal virtual {

726:     function swapExactTokensForTokensSupportingFeeOnTransferTokens(

746:     function swapExactETHForTokensSupportingFeeOnTransferTokens(

768:     function swapExactTokensForETHSupportingFeeOnTransferTokens(

789:     function setSwapRouter(address _swapRouter) external {

794:     function setAlgebraFactory(address _algebraFactory) external {

799:     function setQuoterV2(address _quoterV2) external {

804:     function setAlgebraPoolAPI(address _algebraPoolAPIStorage) external {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

46:     function setTopNPools(address[] memory _poolAddresses) external onlyExecutor {

64:     function getTopNPools() external view returns (address[] memory) {

68:     function setAVM(address _avm) external onlyOwner {

75:     function setExecutor (address _executor) external onlyOwnerOrExecutor {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

41:     function getVoteWeights() external view returns (uint256[] memory) {

45:     function setVoteWeights(uint256[] calldata _weights) external onlyExecutor {

55:     function setAVM(address _avm) external onlyOwner {

66:     function setExecutor(address _executor) external onlyOwnerOrExecutor {

```

```solidity
File: ./contracts/Thenian.sol

48:     function setRoot(bytes32 _root) external onlyOwner {

52:     function setNftPrice(uint256 _nftPrice) external onlyOwner {

59:     function reserveNFTs(address _to, uint256 _amount) external onlyOwner {

74:     function _baseURI() internal view virtual override returns (string memory) {

81:     function baseURI() external view returns (string memory) {

88:     function setBaseURI(string memory baseURI_) external onlyOwner {

95:     function tokensOfOwner(address _owner) external view returns (uint256[] memory) {

108:     function verifyLeaf(bytes32[] memory proof, address sender) internal view returns (bool) {

116:     function mintFirst(bytes32[] memory proof) public payable {

131:     function mintSecond(uint256 amount, bytes32[] memory proof) public payable {

146:     function mintPublic(uint256 amount) public payable {

157:     function _mintTo(address account, uint amount) internal {

```

```solidity
File: ./contracts/TokenHandler.sol

44:     function setPermissionsRegistry(address _permissionRegistry) external Governance {

52:     function whitelistTokens(address[] memory _tokens) external GovernanceOrGenesisManager {

59:     function whitelistToken(address _token) external GovernanceOrGenesisManager {

72:     function blacklistTokens(address[] memory _token) external GovernanceOrGenesisManager {

79:     function blacklistToken(address _token) external GovernanceOrGenesisManager {

101:     function whitelistNFT(uint256 _tokenId) external Governance() {

106:     function blacklistNFT(uint256 _tokenId) external Governance() {

111:     function whitelistConnectors(address[] memory _tokens) external Governance {

118:     function whitelistConnector(address _token) external Governance() {

122:     function _whitelistConnector(address _token) internal {

131:     function blacklistConnector(address _token) external Governance() {

150:     function setBucketType(uint256 bucketId, string calldata bucketName) external Governance {

156:     function getBucketType(uint256 bucketId) external view returns (string memory) {

161:     function updateTokenVolatilityBucket(address _token, uint256 bucketId) external Governance {

167:     function getTokenVolatilityBucket(address _token) external view returns (uint256) {

172:     function whiteListedTokensLength() external view returns(uint256) {

176:     function connectorTokensLength() external view returns(uint256) {

180:     function whiteListedTokens() external view returns(address[] memory tokens) {

184:     function connectorTokens() external view returns(address[] memory tokens) {

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

19:     function toString(uint value) internal pure returns (string memory) {

41:     function _tokenURI(uint _tokenId, uint _balanceOf, uint _locked_end, uint _value, bool isSMNFT) external pure returns (string memory output) {

```

```solidity
File: ./contracts/VoterV3.sol

101:     function getAutomationRegistry() external view returns (address){

105:     function setEpochOwner(address _epochOwner) external onlyOwner {

112:     function setPermissionsRegistry(address _permissionRegistry) external VoterAdmin {

119:     function setMaxVotingNum(uint256 _maxVotingNum) external VoterAdmin {

138:     function reset(uint256 _tokenId) external onlyNewEpoch(_tokenId) nonReentrant {

174:     function poke(uint256 _tokenId) external nonReentrant {

196:     function vote(uint256 _tokenId, address[] calldata _poolVote, uint256[] calldata _weights) 

210:     function _vote(uint256 _tokenId, address[] memory _poolVote, uint256[] memory _weights) internal {

267:     function length() external view returns (uint256) {

272:     function poolVoteLength(uint256 tokenId) external view returns(uint256) { 

276:     function setGaugeManager(address _gaugeManager) external VoterAdmin {

```

```solidity
File: ./contracts/VotingEscrow.sol

177:     function tokenURI(uint _tokenId) external view returns (string memory) {

196:     function ownerOf(uint _tokenId) public view returns (address) {

200:     function ownerToNFTokenCountFn(address owner) public view returns (uint) {

208:     function _balance(address _owner) internal view returns (uint) {

215:     function balanceOf(address _owner) external view returns (uint) {

233:     function getApproved(uint _tokenId) external view returns (address) {

240:     function isApprovedForAll(address _owner, address _operator) external view returns (bool) {

254:     function approve(address _approved, uint _tokenId) public {

275:     function setApprovalForAll(address _operator, bool _approved) external {

285:     function _clearApproval(address _owner, uint _tokenId) internal {

298:     function _isApprovedOrOwner(address _spender, uint _tokenId) internal view returns (bool) {

306:     function isApprovedOrOwner(address _spender, uint _tokenId) external view returns (bool) {

383:     function _isContract(address account) internal view returns (bool) {

438:     function supportsInterface(bytes4 _interfaceID) external view returns (bool) {

453:     function tokenOfOwnerByIndex(address _owner, uint _tokenIndex) public view returns (uint) {

460:     function _addTokenToOwnerList(address _to, uint _tokenId) internal {

469:     function _addTokenTo(address _to, uint _tokenId) internal {

486:     function _mint(address _to, uint _tokenId) internal returns (bool) {

500:     function _removeTokenFromOwnerList(address _from, uint _tokenId) internal {

529:     function _removeTokenFrom(address _from, uint _tokenId) internal {

578:     function get_last_user_slope(uint _tokenId) external view returns (int128) {

587:     function user_point_history(uint _tokenId, uint _idx) external view returns (IVotingEscrow.Point memory) {

591:     function point_history(uint epoch) external view returns (IVotingEscrow.Point memory) {

595:     function user_point_epoch(uint tokenId) external view returns (uint) {

816:     function deposit_for(uint _tokenId, uint _value) external nonreentrant {

837:     function _create_lock(uint _value, uint _lock_duration, address _to, bool isSMNFT) internal returns (uint) {

863:     function create_lock(uint _value, uint _lock_duration, bool isSMNFT) external nonreentrant returns (uint) {

871:     function create_lock_for(uint _value, uint _lock_duration, address _to, bool isSMNFT) external nonreentrant returns (uint) {

877:     function increase_amount(uint _tokenId, uint _value) external nonreentrant {

899:     function increase_unlock_time(uint _tokenId, uint _lock_duration, bool isSMNFT) external nonreentrant {

922:     function updateToSMNFT (uint _tokenId, IVotingEscrow.LockedBalance memory _locked) internal {

938:     function withdraw(uint _tokenId) external nonreentrant {

987:     function unlockPermanent(uint _tokenId) external {

1015:     function balanceOfNFT(uint _tokenId) external view returns (uint) {

1020:     function balanceOfNFTAt(uint _tokenId, uint _t) external view returns (uint) {

1024:     function balanceOfAtNFT(uint _tokenId, uint _block) external view returns (uint) {

1031:     function totalSupplyAt(uint _block) external view returns (uint) {

1035:     function totalSupply() external view returns (uint) {

1042:     function totalSupplyAtT(uint t) public view returns (uint) {

1084:     function merge(uint _from, uint _to) external nonreentrant {

1188:     function _createSplitNFT(address _to, IVotingEscrow.LockedBalance memory _newLocked) private returns (uint256 _tokenId) {

1195:     function toggleSplit(address _account, bool _bool) external {

1221:     function delegates(address delegator) public view returns (address) {

1231:     function getVotes(address account) external view returns (uint) {

1245:     function getPastVotes(address account, uint timestamp)

1263:     function getsmNFTPastVotes(address account, uint timestamp) 

1281:     function getPastTotalSupply(uint256 timestamp) external view returns (uint) {

1285:     function getsmNFTPastTotalSupply() external view returns (uint) {

1292:     function _delegate(address delegator, address delegatee) internal {

1364:     function calculate_sm_nft_bonus(uint amount) public view returns (uint){

1368:     function calculate_original_sm_nft_amount(uint amount) public view returns (uint){

```

```solidity
File: ./contracts/WAVAX.sol

42:     function totalSupply() public view returns (uint256) {

47:     function approve(address spender, uint256 value) public returns (bool) {

53:     function transfer(address to, uint256 value) public returns (bool) {

```

```solidity
File: ./contracts/chainlink/AutomationCompatibleInterface.sol

22:   function checkUpkeep(bytes calldata checkData) external returns (bool upkeepNeeded, bytes memory performData);

23:   function checkUpPrekeep(bytes calldata checkData) external returns (bool preUpkeepNeeded, bytes memory performData);

41:   function performUpkeep(bytes calldata performData) external;

42:   function performPreUpkeep(bytes calldata performData) external;

```

```solidity
File: ./contracts/chainlink/EpochController.sol

25:     function initialize(address _minter, address _permissionsRegistry, address _gaugeManager) public initializer {

33:     function checkUpkeep(bytes memory /*checkdata*/) public view override returns (bool upkeepNeeded, bytes memory /*performData*/) {

38:     function checkUpPrekeep(bytes memory /*checkdata*/) public view override returns (bool preUpkeepNeeded, bytes memory /*performData*/) {

43:     function performUpkeep(bytes calldata /*performData*/) external override {

56:     function performPreUpkeep(bytes calldata /*performData*/) external override {

67:     function setAutomationRegistry(address _automationRegistry) external onlyOwner {

72:     function setAutomationRegistry2(address _automationRegistry2) external onlyOwner {

77:     function setGaugeManager(address _gaugeManager) external onlyOwner {

82:     function setMinter(address _minter) external onlyOwner {

87:     function setGenesisManager(address _genesisManager) external onlyOwner {

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

23:     function initialize(address _auction) public initializer {

30:      function addAuction(address _auction) external onlyManager {

40:     function replaceAuction(address _auction, uint256 _pos) external onlyManager {

53:     function removeAuction(uint256 _pos) external onlyManager {

63:     function auctionsLength() external view returns (uint256){

67:     function allAuctions() external view returns (address[] memory){

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

14:     function emergencyRecoverERC20(address tokenAddress, uint256 tokenAmount) external;

15:     function recoverERC20AndUpdateData(address tokenAddress, uint256 tokenAmount) external;

37:     function initialize(address _voter, address _gaugeManager, address _permissionsRegistry, address _tokenHandler) initializer  public {

59:     function createBribe(address _owner,address _token0,address _token1, string memory _type) external returns (address) {

88:     function setPermissionsRegistry(address _permReg) external {

94:     function setTokenHandler(address _tokenHandler) external {

101:     function pushDefaultRewardToken(address _token) external {

109:     function removeDefaultRewardToken(address _token) external {

131:     function addRewardToBribe(address _token, address __bribe) external onlyAllowed {

136:     function addRewardsToBribe(address[] memory _token, address __bribe) external onlyAllowed {

144:     function addRewardToBribes(address _token, address[] memory __bribes) external onlyAllowed {

153:     function addRewardsToBribes(address[][] memory _token, address[] memory __bribes) external onlyAllowed {

166:     function setBribeVoter(address[] memory _bribe, address _voter) external onlyOwner {

174:     function setBribeAVM(address[] memory _bribe, address _avm) external onlyOwner {

182:     function setBribeMinter(address[] memory _bribe, address _minter) external onlyOwner {

190:     function setBribeOwner(address[] memory _bribe, address _owner) external onlyOwner {

198:     function recoverERC20From(address[] memory _bribe, address[] memory _tokens, uint[] memory _amounts) external onlyOwner {

209:     function recoverERC20AndUpdateData(address[] memory _bribe, address[] memory _tokens, uint[] memory _amounts) external onlyOwner {

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

12:     function setDistribution(address _distro) external;

15:     function setInternalBribe(address intbribe) external;

19:     function setGenesisPoolManager(address _genesisManager) external;

30:     function initialize(address _permissionRegistry) initializer  public {

35:     function setRegistry(address _registry) external {

40:     function gauges(uint256 i) external view returns(address) {

49:     function createGauge(address _rewardToken,address _ve,address _token,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, address _genesisManager) external returns (address) {

67:     function activateEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

74:     function stopEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

81:     function setRewarderPid( address[] memory _gauges, uint[] memory _pids) external onlyAllowed {

89:     function setGaugeRewarder( address[] memory _gauges, address[] memory _rewarder) external onlyAllowed {

97:     function setDistribution(address[] memory _gauges,  address distro) external onlyAllowed {

105:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {

113:     function setGenesisManager(address _gauge, address _genesisManager) external onlyAllowed {

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

28:     function initialize(address _tokenHandler) public initializer {

35:     function setGenesisManager(address _genesisManager) external onlyManager {

40:     function genesisPoolsLength() external view returns (uint256){

44:     function removeGenesisPool(address nativeToken) external onlyManager {

52:     function removeGenesisPool(address nativeToken, uint256 index) external onlyManager {

56:     function createGenesisPool(address tokenOwner, address nativeToken, address fundingToken) external onlyManager returns (address genesisPool) {

69:     function getGenesisPools(address nativeToken) external view returns (address[] memory){

73:     function getGenesisPool(address nativeToken) public view returns (address) {

```

```solidity
File: ./contracts/factories/PairFactory.sol

43:     function initialize(address _pairGenerator) public initializer {

54:     function allPairsLength() external view returns (uint) {

63:     function setFeeManager(address _feeManager) external onlyManager {

72:     function setStakingFees(uint256 _newFee) external onlyManager {

77:     function setStakingFeeAddress(address _feehandler) external onlyManager {

82:     function setDibs(address _dibs) external onlyManager {

87:     function setReferralFee(uint256 _refFee) external onlyManager {

91:     function setFee(bool _stable, uint256 _fee) external onlyManager {

101:     function setCustomFees(address _pairAddress, uint256 _fees) external onlyManager {

107:     function setCustomReferralFee(address _pairAddress, uint256 _refFee) external onlyManager {

112:     function getFee(address _pairAddress, bool _stable) public view returns (uint256) {

119:     function getReferralFee(address _pairAddress) public view returns (uint256) {

126:     function getIsGenesis(address _pairAddress) public view returns (bool) {

130:     function setIsGenesis(address _pairAddress, bool status) external onlyManager {

135:     function pairCodeHash() external view returns (bytes32) {

139:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair) {

153:     function setGenesisManager(address _genesisManager) external onlyManager {

157:     function setGenesisStatus(address _pair, bool status) external {

```

```solidity
File: ./contracts/governance/Governor.sol

101:     function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, ERC165) returns (bool) {

118:     function name() public view virtual override returns (string memory) {

125:     function version() public view virtual override returns (string memory) {

151:     function proposalProposer(uint256 proposalId) public view virtual override returns (address) {

158:     function state(uint256 proposalId) public view virtual override returns (ProposalState) {

197:     function proposalSnapshot(uint256 proposalId) public view virtual override returns (uint256) {

204:     function proposalDeadline(uint256 proposalId) public view virtual override returns (uint256) {

211:     function proposalThreshold() public view virtual returns (uint256) {

218:     function _quorumReached(uint256 proposalId) internal view virtual returns (bool);

223:     function _voteSucceeded(uint256 proposalId) internal view virtual returns (bool);

225:     function _voteDefeated(uint256 proposalId) internal view virtual returns (bool);

255:     function _defaultParams() internal view virtual returns (bytes memory) {

414:     function getVotes(address account, uint256 blockTimestamp) public view virtual override returns (uint256) {

432:     function castVote(uint256 proposalId, uint8 support) public virtual override returns (uint256) {

574:     function _executor() internal view virtual returns (address) {

649:     function COUNTING_MODE() public pure virtual override returns (string memory) {

656:     function hasVoted(uint256 proposalId, address account) public view virtual override returns (bool) {

680:     function _quorumReached(uint256 proposalId) internal view virtual override returns (bool) {

689:     function _voteSucceeded(uint256 proposalId) internal view virtual override returns (bool) {

695:     function _voteDefeated(uint256 proposalId) internal view virtual override returns (bool) {

784:     function quorumNumerator() public view virtual returns (uint256) {

791:     function quorumDenominator() public view virtual returns (uint256) {

798:     function quorum(uint256 blockTimestamp) public view virtual override returns (uint256) {

812:     function updateQuorumNumerator(uint256 newQuorumNumerator) external virtual onlyGovernance {

825:     function _updateQuorumNumerator(uint256 newQuorumNumerator) internal virtual {

```

```solidity
File: ./contracts/governance/L2Governor.sol

96:     function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, ERC165) returns (bool) {

113:     function name() public view virtual override returns (string memory) {

120:     function version() public view virtual override returns (string memory) {

149:     function state(uint256 proposalId) public view virtual override returns (ProposalState) {

189:     function proposalSnapshot(uint256 proposalId) public view virtual override returns (uint256) {

196:     function proposalDeadline(uint256 proposalId) public view virtual override returns (uint256) {

203:     function proposalThreshold() public view virtual returns (uint256) {

210:     function _quorumReached(uint256 proposalId) internal view virtual returns (bool);

215:     function _voteSucceeded(uint256 proposalId) internal view virtual returns (bool);

217:     function _voteDefeated(uint256 proposalId) internal view virtual returns (bool);

247:     function _defaultParams() internal view virtual returns (bytes memory) {

405:     function getVotes(address account, uint256 blockTimestamp) public view virtual override returns (uint256) {

423:     function castVote(uint256 proposalId, uint8 support) public virtual override returns (uint256) {

565:     function _executor() internal view virtual returns (address) {

```

```solidity
File: ./contracts/governance/L2GovernorCountingSimple.sol

38:     function COUNTING_MODE() public pure virtual override returns (string memory) {

45:     function hasVoted(uint256 proposalId, address account) public view virtual override returns (bool) {

69:     function _quorumReached(uint256 proposalId) internal view virtual override returns (bool) {

78:     function _voteSucceeded(uint256 proposalId) internal view virtual override returns (bool) {

84:     function _voteDefeated(uint256 proposalId) internal view virtual override returns (bool) {

```

```solidity
File: ./contracts/governance/L2GovernorVotesQuorumFraction.sol

35:     function quorumNumerator() public view virtual returns (uint256) {

42:     function quorumDenominator() public view virtual returns (uint256) {

49:     function quorum(uint256 blockTimestamp) public view virtual override returns (uint256) {

63:     function updateQuorumNumerator(uint256 newQuorumNumerator) external virtual onlyGovernance {

76:     function _updateQuorumNumerator(uint256 newQuorumNumerator) internal virtual {

```

```solidity
File: ./contracts/interfaces/IAlgebraCLFactory.sol

9:     function allPairsLength() external view returns (uint);

10:     function allPairs(uint256 index) external view returns (address);

```

```solidity
File: ./contracts/interfaces/IAlgebraCustomCommunityVault.sol

9:     function algebraFee() external view returns (uint16);

```

```solidity
File: ./contracts/interfaces/IAlgebraCustomVaultPoolEntryPoint.sol

5:   function setCommunityFee(address pool, uint16 newCommunityFee) external;

```

```solidity
File: ./contracts/interfaces/IAlgebraEternalFarmingCustom.sol

14:   function deactivateIncentive(IncentiveKey memory key, address deployer) external;

16:   function getRewardInfo(IncentiveKey memory key, uint256 tokenId) external view returns (uint256 reward, uint256 bonusReward);

```

```solidity
File: ./contracts/interfaces/IAuction.sol

5:     function getNativePrice() external view returns (uint256);

6:     function getNativeTokenAmount(uint256 depositAmount) external view returns (uint256);

7:     function getFundingTokenAmount(uint256 nativeAmount) external view returns (uint256);

```

```solidity
File: ./contracts/interfaces/IAuctionFactory.sol

5:     function auctions(uint index) external view returns (address);

6:     function isAuction(address auction) external view returns (bool);

7:     function auctionsLength() external view returns (uint256);

8:     function allAuctions() external view returns (address[] memory);

```

```solidity
File: ./contracts/interfaces/IAutomatedVotingManager.sol

5:     function originalOwner(uint256 tokenId) external view returns(address);

6:     function setOriginalOwner(uint256 tokenId, address owner) external;

8:     function tokenIndexes(uint256 _index) external view returns (uint256);

9:     function tokenIdsLength() external view returns(uint256);

10:     function tokenIds(uint256 _index) external view returns (uint256);

11:     function getTotalVotingPower() external view returns (uint256 _totalAVMVotingPower);

12:     function executor() external view returns (address);

```

```solidity
File: ./contracts/interfaces/IBlack.sol

5:     function totalSupply() external view returns (uint);

6:     function balanceOf(address) external view returns (uint);

7:     function approve(address spender, uint value) external returns (bool);

8:     function transfer(address, uint) external returns (bool);

9:     function transferFrom(address,address,uint) external returns (bool);

10:     function mint(address, uint) external returns (bool);

13:     function burnFrom(address, uint) external returns (bool);

```

```solidity
File: ./contracts/interfaces/IBlackClaims.sol

29:     function getClaimableReward(address userAddress) external view returns(uint256); 

```

```solidity
File: ./contracts/interfaces/IBlackGovernor.sol

18:     function status() external returns (ProposalState);

```

```solidity
File: ./contracts/interfaces/IBlackHoleVotes.sol

9:     function getsmNFTPastVotes(address account, uint256 timepoint) external view returns (uint256);

12:     function getsmNFTPastTotalSupply() external view returns (uint256);

```

```solidity
File: ./contracts/interfaces/IBlackholePairApiV2.sol

63:     function getAllPair(address _user, uint _amounts, uint _offset) external view returns(uint totPairs, bool hasNext, pairInfo[] memory pairs);

```

```solidity
File: ./contracts/interfaces/IBribe.sol

5:     function deposit(uint amount, uint tokenId) external;

6:     function withdraw(uint amount, uint tokenId) external;

7:     function getRewardForAddress(address _owner, address[] memory tokens) external;

8:     function notifyRewardAmount(address token, uint amount) external;

9:     function left(address token) external view returns (uint);

10:     function getReward(uint tokenId, address[] memory tokens) external;

11:     function bribeTokens(uint256 i) external view returns(address); 

12:     function rewardsListLength() external view returns (uint256);

13:     function tokenRewardsPerEpoch(address _token, uint256 epochStart) external view returns(uint256);

```

```solidity
File: ./contracts/interfaces/IBribeDistribution.sol

5:     function _deposit(uint amount, uint tokenId) external;

6:     function _withdraw(uint amount, uint tokenId) external;

7:     function getRewardForOwner(uint tokenId, address[] memory tokens) external;

8:     function notifyRewardAmount(address token, uint amount) external;

9:     function left(address token) external view returns (uint);

10:     function recoverERC20(address tokenAddress, uint256 tokenAmount) external ;

```

```solidity
File: ./contracts/interfaces/IBribeFactory.sol

5:     function createInternalBribe(address[] memory) external returns (address);

6:     function createExternalBribe(address[] memory) external returns (address);

7:     function createBribe(address _owner,address _token0,address _token1, string memory _type) external returns (address);

```

```solidity
File: ./contracts/interfaces/IBribeFull.sol

8:     function _deposit(uint amount, uint tokenId) external;

9:     function _withdraw(uint amount, uint tokenId) external;

10:     function getRewardForOwner(uint tokenId, address[] memory tokens) external;

11:     function notifyRewardAmount(address token, uint amount) external;

12:     function left(address token) external view returns (uint);

13:     function rewardsListLength() external view returns (uint);

14:     function supplyNumCheckpoints() external view returns (uint);

15:     function getEpochStart(uint timestamp) external pure returns (uint);

16:     function getPriorSupplyIndex(uint timestamp) external view returns (uint);

17:     function bribeTokens(uint index) external view returns (address);

18:     function rewardsPerEpoch(address token,uint ts) external view returns (uint);

19:     function supplyCheckpoints(uint _index) external view returns(uint timestamp, uint supplyd);

20:     function earned(address token, uint tokenId) external view returns (uint);

21:     function earned(uint tokenId, address token) external view returns (uint);

22:     function firstBribeTimestamp() external view returns(uint);

23:     function totalSupplyAt(uint256 _timestamp) external view returns (uint256);

```

```solidity
File: ./contracts/interfaces/IDibs.sol

11:     function findTotalRewardFor(address _user, uint _totalFees) external view returns(uint256 _referralFeeAmount);

```

```solidity
File: ./contracts/interfaces/IERC20.sol

5:     function totalSupply() external view returns (uint256);

6:     function transfer(address recipient, uint amount) external returns (bool);

7:     function decimals() external view returns (uint8);

8:     function symbol() external view returns (string memory);

9:     function balanceOf(address) external view returns (uint);

10:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

11:     function allowance(address owner, address spender) external view returns (uint);

12:     function approve(address spender, uint value) external returns (bool);

```

```solidity
File: ./contracts/interfaces/IGauge.sol

5:     function notifyRewardAmount(address token, uint amount) external;

6:     function getReward(address account, address[] memory tokens) external;

8:     function claimFees() external returns (uint claimed0, uint claimed1);

9:     function left(address token) external view returns (uint);

10:     function rewardRate(address _pair) external view returns (uint);

11:     function balanceOf(address _account) external view returns (uint);

12:     function isForPair() external view returns (bool);

13:     function totalSupply() external view returns (uint);

14:     function earned(address token, address account) external view returns (uint);

15:     function setGenesisPool(address genesisPool) external;

16:     function depositsForGenesis(address tokenOwner, uint256 timestamp, uint256 liquidity) external;

```

```solidity
File: ./contracts/interfaces/IGaugeCL.sol

5:     function notifyRewardAmount(address token, uint amount) external returns (IncentiveKey memory incentivekey, uint256 rewardRate, uint128 bonusRewardRate);

6:     function getReward(uint256 tokenId, bool isBonusReward) external;

7:     function claimFees() external returns (uint claimed0, uint claimed1);

8:     function balanceOf(uint256 tokenId) external view returns (uint256); 

11:     function earned(uint256 tokenId) external view returns (uint256 reward, uint256 bonusReward);   

12:     function totalSupply() external view returns (uint);

13:     function rewardRate() external view returns (uint);

14:     function rewardForDuration() external view returns (uint256);

15:     function stakedFees() external view returns (uint256, uint256);

```

```solidity
File: ./contracts/interfaces/IGaugeDistribution.sol

5:     function notifyRewardAmount(address token, uint amount) external;

6:     function getReward(address account, address[] memory tokens) external;

7:     function claimFees() external returns (uint claimed0, uint claimed1);

8:     function left(address token) external view returns (uint);

9:     function rewardRate(address _pair) external view returns (uint);

10:     function balanceOf(address _account) external view returns (uint);

11:     function isForPair() external view returns (bool);

12:     function totalSupply() external view returns (uint);

13:     function earned(address token, address account) external view returns (uint);

15:     function internal_bribe() external view returns(address);

```

```solidity
File: ./contracts/interfaces/IGaugeFactory.sol

5:     function createGauge(address _rewardToken,address _ve,address _token,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, address _genesisManager) external returns (address) ;

6:     function gauges(uint256 i) external view returns(address);

```

```solidity
File: ./contracts/interfaces/IGaugeFactoryCL.sol

7:     function createGauge(address _rewardToken,address _ve,address _token,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, IGaugeManager.FarmingParam memory farmingParam, address bonusRewardToken) external returns (address) ;

8:     function gauges(uint256 i) external view returns(address);

11:     function dibsPercentage() external view returns (uint256);

```

```solidity
File: ./contracts/interfaces/IGaugeManager.sol

12:     function fetchInternalBribeFromPool(address _pool) external returns (address);

13:     function fetchExternalBribeFromPool(address _pool) external returns (address);

14:     function isGaugeAliveForPool(address _pool) external returns (bool);

15:     function notifyRewardAmount(uint amount) external;

19:     function createGauge(address _pool, uint256 _gaugeType) external returns (address _gauge, address _internal_bribe, address _external_bribe);

20:     function gauges(address _pair) external view returns (address);

21:     function isGauge(address _gauge) external view returns (bool);

22:     function poolForGauge(address _gauge) external view returns (address);

23:     function internal_bribes(address _gauge) external view returns (address);

24:     function external_bribes(address _gauge) external view returns (address);

25:     function pools(uint256 i) external view returns(address);

26:     function getBlackGovernor() external view returns (address);

27:     function setBlackGovernor(address _blackGovernor) external;

28:     function acceptAlgebraFeeChangeProposal (uint16 newAlgebraFee) external;

```

```solidity
File: ./contracts/interfaces/IGenesisPool.sol

7:     function getAllocationInfo() external view returns (IGenesisPoolBase.TokenAllocation memory);

8:     function getIncentivesInfo() external view returns (IGenesisPoolBase.TokenIncentiveInfo memory);

9:     function getGenesisInfo() external view returns (IGenesisPoolBase.GenesisInfo memory);

10:     function getLiquidityPoolInfo() external view returns (IGenesisPoolBase.LiquidityPool memory);

11:     function poolStatus() external view returns (IGenesisPoolBase.PoolStatus);

12:     function userDeposits(address _user) external view returns (uint256);

14:     function setGenesisPoolInfo(IGenesisPoolBase.GenesisInfo calldata _genesisInfo, IGenesisPoolBase.TokenAllocation calldata _allocationInfo, address auction) external;

16:     function approvePool(address _pairAddress) external;

17:     function depositToken(address spender, uint256 amount) external returns (bool);

18:     function transferIncentives(address gauge, address external_bribe, address internal_bribe) external;

19:     function eligbleForPreLaunchPool() external view returns (bool);

20:     function eligbleForDisqualify() external view returns (bool);

21:     function setPoolStatus(IGenesisPoolBase.PoolStatus status) external;

22:     function balanceOf(address account) external view returns (uint256);

23:     function deductAmount(address account, uint256 amount) external;

24:     function deductAllAmount(address account) external;

26:     function getNativeTokenAmount(uint256 depositAmount) external view returns (uint256);

28:     function launch(address router, uint256 maturityTime) external;

29:     function setMaturityTime(uint256 _maturityTime) external;

30:     function setStartTime(uint256 _startTime) external;

```

```solidity
File: ./contracts/interfaces/IGenesisPoolFactory.sol

5:     function getGenesisPool(address nativeToken) external view returns (address);

6:     function getGenesisPools(address nativeToken) external view returns (address[] memory);

7:     function allGenesisPools(uint index) external returns (address);

9:     function genesisPoolsLength() external view returns (uint256);

10:     function createGenesisPool(address tokenOwner, address nativeToken, address fundingToken) external returns (address);

11:     function removeGenesisPool(address nativeToken) external;

12:     function removeGenesisPool(address nativeToken, uint256 i) external;

```

```solidity
File: ./contracts/interfaces/IGenesisPoolManager.sol

5:     function nativeTokens(uint256 index) external view returns(address);

6:     function liveNativeTokens(uint256 index) external view returns(address);

7:     function getAllNaitveTokens() external view returns (address[] memory);

8:     function getLiveNaitveTokens() external view returns (address[] memory);

```

```solidity
File: ./contracts/interfaces/IMinter.sol

8:     function active_period() external view returns(uint);

```

```solidity
File: ./contracts/interfaces/IPair.sol

5:     function metadata() external view returns (uint dec0, uint dec1, uint r0, uint r1, bool st, address t0, address t1);

6:     function claimFees() external returns (uint, uint);

7:     function tokens() external view returns (address, address);

8:     function token0() external view returns (address);

9:     function token1() external view returns (address);

10:     function transferFrom(address src, address dst, uint amount) external returns (bool);

11:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

12:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

13:     function burn(address to) external returns (uint amount0, uint amount1);

14:     function mint(address to) external returns (uint liquidity);

15:     function getReserves() external view returns (uint _reserve0, uint _reserve1, uint _blockTimestampLast);

16:     function getAmountOut(uint, address) external view returns (uint);

18:     function name() external view returns(string memory);

19:     function symbol() external view returns(string memory);

20:     function totalSupply() external view returns (uint);

21:     function decimals() external view returns (uint8);

23:     function claimable0(address _user) external view returns (uint);

24:     function claimable1(address _user) external view returns (uint);

```

```solidity
File: ./contracts/interfaces/IPairCallee.sol

5:     function hook(address sender, uint amount0, uint amount1, bytes calldata data) external;

```

```solidity
File: ./contracts/interfaces/IPairFactory.sol

5:     function allPairsLength() external view returns (uint);

6:     function isPair(address pair) external view returns (bool);

7:     function allPairs(uint index) external view returns (address);

8:     function pairCodeHash() external view returns (bytes32);

9:     function getPair(address tokenA, address token, bool stable) external view returns (address);

10:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

11:     function isGenesis(address pair) external view returns (bool);

```

```solidity
File: ./contracts/interfaces/IPairGenerator.sol

5:     function pairCodeHash() external pure returns (bytes32);

6:     function createPair(address token0, address token1, bool stable) external returns (address pair);

```

```solidity
File: ./contracts/interfaces/IPairInfo.sol

12:     function isPair(address _pair) external view returns(bool);

```

```solidity
File: ./contracts/interfaces/IPermissionsRegistry.sol

5:     function emergencyCouncil() external view returns(address);

6:     function blackTeamMultisig() external view returns(address);

7:     function hasRole(bytes memory role, address caller) external view returns(bool);

```

```solidity
File: ./contracts/interfaces/IRewardsDistributor.sol

6:     function voting_escrow() external view returns(address);

7:     function claimable(uint _tokenId) external view returns (uint);

8:     function claim(uint _tokenId) external returns (uint);

```

```solidity
File: ./contracts/interfaces/IRouter.sol

10:     function pairFor(address tokenA, address tokenB, bool stable) external view returns (address pair);

11:     function swapExactTokensForTokens(uint amountIn,uint amountOutMin,route[] calldata routes,address to,uint deadline) external returns (uint[] memory amounts);

12:     function addLiquidity(address tokenA,address tokenB,bool stable,uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB, uint liquidity);

13:     function isPair(address pair) external view returns (bool);

14:     function getReserves(address tokenA, address tokenB, bool stable) external view returns (uint reserveA, uint reserveB);

15:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount, bool stable);

16:     function getPoolAmountOut(uint amountIn, address tokenIn, address pair) external view returns (uint amount);

```

```solidity
File: ./contracts/interfaces/ITokenHandler.sol

5:     function isWhitelisted(address token) external view returns (bool);

6:     function isWhitelistedNFT(uint256 token) external view returns (bool);

7:     function isConnector(address token) external view returns (bool);

12:     function whiteListed(uint256 index) external returns (address);

13:     function connectors(uint256 index) external returns (address);

15:     function whiteListedTokensLength() external returns (uint256);

16:     function connectorTokensLength() external returns (uint256);

18:     function whiteListedTokens() external view returns(address[] memory tokens);

19:     function connectorTokens() external view returns(address[] memory tokens);

```

```solidity
File: ./contracts/interfaces/ITopNPoolsStrategy.sol

5:     function getTopNPools() external view returns (address[] memory );

```

```solidity
File: ./contracts/interfaces/IUniswapRouterETH.sol

55:     function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)

60:     function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

64:     function getAmountsOut(uint amountIn, address[] calldata path)

```

```solidity
File: ./contracts/interfaces/IUniswapV2Pair.sol

5:     function factory() external view returns (address);

6:     function token0() external view returns (address);

7:     function token1() external view returns (address);

8:     function burn(address to) external returns (uint amount0, uint amount1);

9:     function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);

```

```solidity
File: ./contracts/interfaces/IVeArtProxy.sol

5:     function _tokenURI(uint _tokenId, uint _balanceOf, uint _locked_end, uint _value, bool isSMNFT) external pure returns (string memory output);

```

```solidity
File: ./contracts/interfaces/IVoteWeightStrategy.sol

7:     function getVoteWeights() external view returns(uint256[] memory);

```

```solidity
File: ./contracts/interfaces/IVoter.sol

7:     function factories() external view returns(address[] memory);

8:     function usedWeights(uint id) external view returns(uint);

9:     function lastVoted(uint id) external view returns(uint);

10:     function poolVote(uint id, uint _index) external view returns(address _pair);

11:     function votes(uint id, address _pool) external view returns(uint votes);

12:     function vote(uint256 _tokenId, address[] calldata _poolVote, uint256[] calldata _weights) external;

13:     function poolVoteLength(uint tokenId) external view returns(uint);

14:     function lastVotedTimestamp(uint id) external view returns(uint);

16:     function weights(address _pool) external view returns(uint);

18:     function getEpochGovernor() external view returns (address);

19:     function setEpochGovernor(address _epochGovernor) external;

21:     function totalWeight() external returns (uint256);

```

```solidity
File: ./contracts/interfaces/IVotingEscrow.sol

23:     function create_lock_for(uint _value, uint _lock_duration, address _to, bool isSMSFT) external returns (uint);

25:     function locked(uint id) external view returns(LockedBalance memory);

26:     function tokenOfOwnerByIndex(address _owner, uint _tokenIndex) external view returns (uint);

31:     function point_history(uint loc) external view returns (Point memory);

32:     function user_point_history(uint tokenId, uint loc) external view returns (Point memory);

33:     function permanentLockBalance() external view returns (uint256);

34:     function user_point_epoch(uint tokenId) external view returns (uint);

36:     function ownerOf(uint) external view returns (address);

37:     function isApprovedOrOwner(address, uint) external view returns (bool);

38:     function transferFrom(address, address, uint) external;

40:     function voted(uint) external view returns (bool);

41:     function attachments(uint) external view returns (uint);

46:     function approve(address _approved, uint _tokenId) external;

49:     function deposit_for(uint tokenId, uint value) external;

51:     function balanceOfNFT(uint _id) external view returns (uint);

52:     function balanceOfNFTAt(uint _tokenId, uint _t) external view returns (uint);

53:     function balanceOf(address _owner) external view returns (uint);

54:     function totalSupply() external view returns (uint);

55:     function totalSupplyAtT(uint256 _t) external view returns (uint);

67:     function smNFTBalance() external view returns (uint);

68:     function calculate_sm_nft_bonus(uint amount) external view returns (uint);

69:     function calculate_original_sm_nft_amount(uint amount) external view returns (uint);

```

```solidity
File: ./contracts/interfaces/IWETH.sol

6:     function transfer(address to, uint256 value) external returns (bool);

```

```solidity
File: ./contracts/interfaces/IWrappedBribeFactory.sol

7:     function createBribe(address existing_bribe) external returns (address);

8:     function oldBribeToNew(address _external_bribe_addr) external view returns(address);

```

```solidity
File: ./contracts/libraries/Base64.sol

12:     function encode(bytes memory data) internal pure returns (string memory) {

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

13:     function epochStart(uint256 timestamp) internal pure returns (uint256) {

20:     function epochNext(uint256 timestamp) internal pure returns (uint256) {

27:     function epochVoteStart(uint256 timestamp) internal pure returns (uint256) {

34:     function epochVoteEnd(uint256 timestamp) internal pure returns (uint256) {

41:     function isLastHour(uint256 timestamp) internal pure returns (bool) {

48:     function epochMultiples(uint256 duration) internal pure returns (uint256) {

55:     function isLastEpoch(uint256 timestamp, uint256 endTime) internal pure returns (bool) {

62:     function prevPreEpoch(uint256 timestamp) internal pure returns (uint256) {

69:     function currPreEpoch(uint256 timestamp) internal pure returns (uint256) {

```

```solidity
File: ./contracts/libraries/Math.sol

5:     function max(uint a, uint b) internal pure returns (uint) {

8:     function min(uint a, uint b) internal pure returns (uint) {

11:     function sqrt(uint y) internal pure returns (uint z) {

23:     function cbrt(uint256 n) internal pure returns (uint256) { unchecked {

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

18:     function mul(int256 a, int256 b) internal pure returns (int256) {

46:     function div(int256 a, int256 b) internal pure returns (int256) {

65:     function sub(int256 a, int256 b) internal pure returns (int256) {

82:     function add(int256 a, int256 b) internal pure returns (int256) {

89:     function toUInt256(int256 a) internal pure returns (uint256) {

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

17:     function addPairFactory(Data storage self, address _pairFactory) external {

26:     function addGaugeFactory(Data storage self, address _gaugeFactory) external {

35:     function replacePairFactory(Data storage self, address _pairFactory, uint256 _pos) external {

47:     function replaceGaugeFactory(Data storage self, address _gaugeFactory, uint256 _pos) external {

59:     function removePairFactory(Data storage self, uint256 _pos) external {

67:     function removeGaugeFactory(Data storage self, uint256 _pos) external {

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

186:     function _supply_at(IVotingEscrow.Point memory point, 

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

23:         function(address) view returns (uint) ownerToNFTokenCountFn;

24:         function(address, uint) view returns (uint) tokenOfOwnerByIndex;

191:     function getPastVotesIndex(Data storage data, address account, uint timestamp) internal view returns (uint32) {

```

### <a name="NC-19"></a>[NC-19] Change int to int256
Throughout the code base, some variables are declared as `int`. To favor explicitness, consider changing all instances of `int` to `int256`

*Instances (53)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

263:         require(_int >= address(0), "zero");

```

```solidity
File: ./contracts/Bribes.sol

23:     struct Checkpoint {

28:     struct SupplyCheckpoint {

108:         Checkpoint memory cp0 = checkpoints[tokenId][_index];

153:             Checkpoint memory cp = checkpoints[tokenId][center];

185:             SupplyCheckpoint memory cp = supplyCheckpoints[center];

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

51:         entryPoint = _entryPoint;

```

```solidity
File: ./contracts/GaugeManager.sol

155:         address[] memory _int = new address[](_pool.length);

```

```solidity
File: ./contracts/GaugeV2.sol

140:         require(_int >= address(0), "ZA");

```

```solidity
File: ./contracts/MinterUpgradeable.sol

78:         isFirstMint = true;

98:         active_period = ((block.timestamp) / WEEK) * WEEK; // allow minter.update_period() to mint new emissions THIS Thursday

134:         uint256 rebaseAmount = ((_weeklyMint * circulatingBlack) / blackSupply) * (circulatingBlack) / (2 * blackSupply);

198:             _rewards_distributor.checkpoint_token(); // checkpoint token balance that was just minted in rewards distributor

```

```solidity
File: ./contracts/Pair.sol

255:         Observation memory _point = lastObservation();

```

```solidity
File: ./contracts/RewardsDistributor.sol

118:             IVotingEscrow.Point memory pt = IVotingEscrow(ve).user_point_history(tokenId, _mid);

138:             IVotingEscrow.Point memory user_point = IVotingEscrow(ve).user_point_history(_tokenId, 1);

172:             IVotingEscrow.Point memory user_point = IVotingEscrow(ve).user_point_history(_tokenId, 1);

```

```solidity
File: ./contracts/Thenian.sol

22:     uint256 public MAX_PER_MINT = 10;

136:         require(secondMint[msg.sender].add(amount) <= MAX_PER_MINT, "Can only mint 10 in the second round");

149:         require(amount <= MAX_PER_MINT, "Can only mint 10 NFTs at a time");

150:         require(balanceOf(msg.sender).add(amount) <= 15, "Can only mint 15 NFTs per wallet");

158:         require(totalSupply().add(amount) <= MAX_SUPPLY, "Mint would exceed max supply.");

```

```solidity
File: ./contracts/VotingEscrow.sol

587:     function user_point_history(uint _tokenId, uint _idx) external view returns (IVotingEscrow.Point memory) {

591:     function point_history(uint epoch) external view returns (IVotingEscrow.Point memory) {

608:         IVotingEscrow.Point memory u_old;

609:         IVotingEscrow.Point memory u_new;

651:         IVotingEscrow.Point memory last_point = IVotingEscrow.Point({bias: 0, slope: 0, ts: block.timestamp, blk: block.number, permanent: 0, smNFT : 0, smNFTBonus : 0});

653:             last_point = votingBalanceLogicData.point_history[_epoch];

655:         uint last_checkpoint = last_point.ts;

659:         IVotingEscrow.Point memory initial_last_point = last_point;

669:             uint t_i = (last_checkpoint / WEEK) * WEEK;

690:                 last_checkpoint = t_i;

```

```solidity
File: ./contracts/interfaces/IAlgebraCustomVaultPoolEntryPoint.sol

3: interface IAlgebraCustomVaultPoolEntryPoint {

```

```solidity
File: ./contracts/interfaces/IVotingEscrow.sol

6:     struct Point {

31:     function point_history(uint loc) external view returns (Point memory);

32:     function user_point_history(uint tokenId, uint loc) external view returns (Point memory);

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

28:             IVotingEscrow.Point memory last_point = VotingBalanceLogicData.user_point_history[_tokenId][userEpoch];

55:             IVotingEscrow.Point memory userPoint = votingBalanceLogicData.user_point_history[_tokenId][center];

97:         IVotingEscrow.Point memory upoint = VotingBalanceLogicData.user_point_history[_tokenId][_min];

108:         IVotingEscrow.Point memory point_0 = VotingBalanceLogicData.point_history[_epoch];

112:             IVotingEscrow.Point memory point_1 = VotingBalanceLogicData.point_history[_epoch + 1];

139:         IVotingEscrow.Point memory point = VotingBalanceLogicData.point_history[target_epoch];

142:             IVotingEscrow.Point memory point_next = VotingBalanceLogicData.point_history[target_epoch + 1];

186:     function _supply_at(IVotingEscrow.Point memory point, 

190:         IVotingEscrow.Point memory last_point = point;

221:             IVotingEscrow.Point memory point = VotingBalanceLogicData.point_history[center];

244:             IVotingEscrow.Point memory last_point = VotingBalanceLogicData.point_history[globalEpoch];

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

7:     struct Checkpoint {

61:                 Checkpoint storage cpSrcRep = self.checkpoints[srcRep][nextSrcRepNum];

93:                 Checkpoint storage cpDstRep = self.checkpoints[dstRep][nextDstRepNum];

134:                 Checkpoint storage cpSrcRep = _self.checkpoints[_srcRep][nextSrcRepNum];

167:                 Checkpoint storage cpDstRep = _self.checkpoints[_dstRep][nextDstRepNum];

210:             VotingDelegationLib.Checkpoint storage cp = data.checkpoints[account][center];

```

### <a name="NC-20"></a>[NC-20] Change uint to uint256
Throughout the code base, some variables are declared as `uint`. To favor explicitness, consider changing all instances of `uint` to `uint256`

*Instances (747)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

113:         for(uint i=0; i<locks.length; i++) {

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

32:     uint public minBalanceForAutovoting;

176:         for(uint i=0; i<avms.length; i++) {

```

```solidity
File: ./contracts/AVM/interfaces/IAutoVotingEscrow.sol

15:     function voteLocks (uint start, uint end) external;

16:     function resetLocks(uint start, uint end) external;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

103:         uint i = 0;

110:         uint i = 0;

118:         uint i = 0;

```

```solidity
File: ./contracts/Black.sol

11:     uint public totalSupply = 0;

19:     event Transfer(address indexed from, address indexed to, uint value);

20:     event Approval(address indexed owner, address indexed spender, uint value);

40:     function approve(address _spender, uint _value) external returns (bool) {

46:     function _mint(address _to, uint _amount) internal returns (bool) {

55:     function _transfer(address _from, address _to, uint _value) internal returns (bool) {

64:     function transfer(address _to, uint _value) external returns (bool) {

68:     function transferFrom(address _from, address _to, uint _value) external returns (bool) {

69:         uint allowed_from = allowance[_from][msg.sender];

76:     function mint(address account, uint amount) external returns (bool) {

87:     function burnFrom(address _from, uint _value) external returns (bool) {

88:         uint allowed_from = allowance[_from][msg.sender];

96:     function _burn(address _from, uint _amount) internal returns (bool) {

```

```solidity
File: ./contracts/BlackClaims.sol

201:     function claimAndStakeReward(uint percent) external returns (uint)

222:         uint _tokenId = _ve.create_lock_for(staked_reward, MAX_PERIOD, msg.sender, true);

243:         uint _balance = IERC20(tokenAddress_).balanceOf(address(this));

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

101:             uint _tempTimestamp;

154:                 uint _tempTimestamp;

174:     function recoverERC20(uint amount, address token) external onlyOwner {

177:         uint balance = IERC20(token).balanceOf(address(this));

183:             uint timeleft = lastDistributedTime - block.timestamp;

184:             uint notDistributed = rewardPerSecond * timeleft;

```

```solidity
File: ./contracts/GaugeManager.sol

272:         for (uint i = 0; i < 20; i++) {

330:                 uint _balanceToken0 = IERC20(_token0).balanceOf(algebraPool.communityVault());

333:                 uint _balanceToken1 = IERC20(_token1).balanceOf(algebraPool.communityVault());

```

```solidity
File: ./contracts/GenesisPool.sol

39:     event DepositedNativeToken(address native, address owner, address genesisPool, uint256 proposedNativeAmount, uint proposedFundingAmount);

137:         uint _amount = _maxFundingLeft <= _fundingLeft ? _maxFundingLeft : _fundingLeft;

164:         uint _endTime = genesisInfo.startTime + genesisInfo.duration;

225:         (, , uint _liquidity) = IRouter(_router).addLiquidity(genesisInfo.nativeToken, genesisInfo.fundingToken, genesisInfo.stable, nativeDesired, fundingDesired, 0, 0, address(this), block.timestamp + 100);

313:         uint _amount;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

46:     uint public WEEK;

47:     uint public pre_epoch_period; // 2 : 30 of every thursday

91:         uint _period = pre_epoch_period;

100:     function depositNativeToken(address nativeToken, uint auctionIndex, GenesisInfo calldata genesisPoolInfo, TokenAllocation calldata allocationInfo) external nonReentrant returns(address genesisPool) {

230:         uint _period = pre_epoch_period;

258:         uint index = liveNativeTokensIndex[nativeToken];

259:         uint length = liveNativeTokens.length;

```

```solidity
File: ./contracts/GlobalRouter.sol

16:     function getAmountOutStable(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount);

17:     function getAmountOutVolatile(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount);

18:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount, bool stable);

19:     function getAmountsOut(uint amountIn, Route[] memory routes) external view returns (uint[] memory amounts);

20:     function getAmountInStable(uint amountOut, address tokenIn, address tokenOut) external view returns (uint amountIn);

35:     function transferFrom(address src, address dst, uint amount) external returns (bool);

36:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

37:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

38:     function burn(address to) external returns (uint amount0, uint amount1);

39:     function mint(address to) external returns (uint liquidity);

46:     function transfer(address recipient, uint amount) external returns (bool);

50:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

51:     function approve(address spender, uint value) external returns (bool);

61:     function min(uint a, uint b) internal pure returns (uint) {

64:     function sqrt(uint y) internal pure returns (uint z) {

67:             uint x = y / 2 + 1;

76:     function sub(uint x, uint y) internal pure returns (uint z) {

83:     function transfer(address to, uint value) external returns (bool);

165:     modifier ensure(uint deadline) {

178:         for (uint i = 0; i < routes.length; i++) {

180:             uint amountOut = amounts[i + 1];

181:             (uint amount0Out, uint amount1Out) = routes[i].from == token0 ? (uint(0), amountOut) : (amountOut, uint(0));

193:     function swapExactTokensForTokens(uint amountIn,uint amountOutMin, ITradeHelper.Route[] calldata routes,address to,uint deadline, bool _type) external ensure(deadline) returns (uint[] memory amounts){

251:     function getAmountOutStable(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount){

254:     function getAmountOutVolatile(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount){

257:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount, bool stable){

260:     function getAmountsOut(uint amountIn, ITradeHelper.Route[] memory routes) external view returns (uint[] memory amounts){

263:     function getAmountInStable(uint amountOut, address tokenIn, address tokenOut) external view returns (uint amountIn){

287:     function _safeTransferETH(address to, uint value) internal {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

23:     uint public teamRate;  //EMISSION that goes to protocol

24:     uint public constant MAX_TEAM_RATE = 500; // 5%

36:     uint public WEEK; // allows minting once per week (reset every Thursday 00:00 UTC)

37:     uint public weekly; // represents a starting weekly emission of 2.6M BLACK (BLACK has 18 decimals)

38:     uint public active_period;

39:     uint public LOCK;

54:     event Mint(address indexed sender, uint weekly, uint circulating_supply, uint circulating_emission);

86:         uint max // sum amounts / max = % ownership of top protocols, so if initial 20m is distributed, and target is 25% protocol ownership, then max - 4 x 20m = 80m

92:             for (uint i = 0; i < claimants.length; i++) {

117:     function setTeamRate(uint _teamRate) external {

124:     function calculate_rebase(uint _weeklyMint) public view returns (uint) {

125:         uint _veTotal = _black.balanceOf(address(_ve));

126:         uint _blackTotal = _black.totalSupply();

127:         uint _smNFTBalance = IVotingEscrow(_ve).smNFTBalance();

128:         uint _superMassiveBonus = IVotingEscrow(_ve).calculate_sm_nft_bonus(_smNFTBalance);

130:         uint veBlackSupply = _veTotal + _smNFTBalance +_superMassiveBonus;

131:         uint blackSupply = _blackTotal + _superMassiveBonus;

132:         uint circulatingBlack = blackSupply - veBlackSupply;

160:         uint _period = active_period;

184:             uint _rebase = calculate_rebase(_emission);

186:             uint _teamEmissions = _emission * teamRate / MAX_BPS;

188:             uint _gauge = _emission - _rebase - _teamEmissions;

190:             uint _balanceOf = _black.balanceOf(address(this));

213:         uint _period = active_period;

```

```solidity
File: ./contracts/Pair.sol

23:     uint public totalSupply = 0;

33:     uint internal constant MINIMUM_LIQUIDITY = 10**3;

42:         uint timestamp;

43:         uint reserve0Cumulative;

44:         uint reserve1Cumulative;

48:     uint constant periodSize = 1800;

52:     uint internal immutable decimals0;

53:     uint internal immutable decimals1;

55:     uint public reserve0;

56:     uint public reserve1;

57:     uint public blockTimestampLast;

59:     uint public reserve0CumulativeLast;

60:     uint public reserve1CumulativeLast;

64:     uint public index0 = 0;

65:     uint public index1 = 0;

75:     event Fees(address indexed sender, uint amount0, uint amount1);

76:     event Mint(address indexed sender, uint amount0, uint amount1);

77:     event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);

80:         uint amount0In,

81:         uint amount1In,

82:         uint amount0Out,

83:         uint amount1Out,

86:     event Sync(uint reserve0, uint reserve1);

87:     event Claim(address indexed sender, address indexed recipient, uint amount0, uint amount1);

89:     event Transfer(address indexed from, address indexed to, uint amount);

90:     event Approval(address indexed owner, address indexed spender, uint amount);

111:     uint internal _unlocked = 1;

127:     function metadata() external view returns (uint dec0, uint dec1, uint r0, uint r1, bool st, address t0, address t1) {

140:     function claimFees() external returns (uint claimed0, uint claimed1) {

162:     function _update0(uint amount) internal {

187:     function _update1(uint amount) internal {

216:         uint _supplied = balanceOf[recipient]; // get LP balance of `recipient`

218:             uint _supplyIndex0 = supplyIndex0[recipient]; // get last adjusted index0 for recipient

219:             uint _supplyIndex1 = supplyIndex1[recipient];

220:             uint _index0 = index0; // get global index0 for accumulated fees

221:             uint _index1 = index1;

224:             uint _delta0 = _index0 - _supplyIndex0; // see if there is any difference that need to be accrued

225:             uint _delta1 = _index1 - _supplyIndex1;

227:                 uint _share = _supplied * _delta0 / 1e18; // add accrued difference for each supplied token

231:                 uint _share = _supplied * _delta1 / 1e18;

240:     function getReserves() public view returns (uint _reserve0, uint _reserve1, uint _blockTimestampLast) {

247:     function _update(uint balance0, uint balance1, uint _reserve0, uint _reserve1) internal {

248:         uint blockTimestamp = block.timestamp;

249:         uint timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired

267:     function currentCumulativePrices() public view returns (uint reserve0Cumulative, uint reserve1Cumulative, uint blockTimestamp) {

273:         (uint _reserve0, uint _reserve1, uint _blockTimestampLast) = getReserves();

276:             uint timeElapsed = blockTimestamp - _blockTimestampLast;

283:     function current(address tokenIn, uint amountIn) external view returns (uint amountOut) {

285:         (uint reserve0Cumulative, uint reserve1Cumulative,) = currentCumulativePrices();

290:         uint timeElapsed = block.timestamp - _observation.timestamp;

291:         uint _reserve0 = (reserve0Cumulative - _observation.reserve0Cumulative) / timeElapsed;

292:         uint _reserve1 = (reserve1Cumulative - _observation.reserve1Cumulative) / timeElapsed;

297:     function quote(address tokenIn, uint amountIn, uint granularity) external view returns (uint amountOut) {

298:         uint [] memory _prices = sample(tokenIn, amountIn, granularity, 1);

299:         uint priceAverageCumulative;

300:         for (uint i = 0; i < _prices.length; i++) {

307:     function prices(address tokenIn, uint amountIn, uint points) external view returns (uint[] memory) {

311:     function sample(address tokenIn, uint amountIn, uint points, uint window) public view returns (uint[] memory) {

314:         uint length = observations.length-1;

315:         uint i = length - (points * window);

316:         uint nextIndex = 0;

317:         uint index = 0;

321:             uint timeElapsed = observations[nextIndex].timestamp - observations[i].timestamp;

322:             uint _reserve0 = (observations[nextIndex].reserve0Cumulative - observations[i].reserve0Cumulative) / timeElapsed;

323:             uint _reserve1 = (observations[nextIndex].reserve1Cumulative - observations[i].reserve1Cumulative) / timeElapsed;

335:     function mint(address to) external lock returns (uint liquidity) {

336:         (uint _reserve0, uint _reserve1) = (reserve0, reserve1);

337:         uint _balance0 = IERC20(token0).balanceOf(address(this));

338:         uint _balance1 = IERC20(token1).balanceOf(address(this));

339:         uint _amount0 = _balance0 - _reserve0;

340:         uint _amount1 = _balance1 - _reserve1;

342:         uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee

358:     function burn(address to) external lock returns (uint amount0, uint amount1) {

359:         (uint _reserve0, uint _reserve1) = (reserve0, reserve1);

361:         uint _balance0 = IERC20(_token0).balanceOf(address(this));

362:         uint _balance1 = IERC20(_token1).balanceOf(address(this));

363:         uint _liquidity = balanceOf[address(this)];

365:         uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee

380:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {

383:         (uint _reserve0, uint _reserve1) =  (reserve0, reserve1);

386:         uint _balance0;

387:         uint _balance1;

398:         uint amount0In = _balance0 > _reserve0 - amount0Out ? _balance0 - (_reserve0 - amount0Out) : 0;

399:         uint amount1In = _balance1 > _reserve1 - amount1Out ? _balance1 - (_reserve1 - amount1Out) : 0;

428:     function _f(uint x0, uint y) internal pure returns (uint) {

432:     function _d(uint x0, uint y) internal pure returns (uint) {

436:     function _get_y(uint x0, uint xy, uint y) internal pure returns (uint) {

437:         for (uint i = 0; i < 255; i++) {

438:             uint y_prev = y;

439:             uint k = _f(x0, y);

441:                 uint dy = (xy - k)*1e18/_d(x0, y);

444:                 uint dy = (k - xy)*1e18/_d(x0, y);

460:     function getAmountOut(uint amountIn, address tokenIn) external view returns (uint) {

461:         (uint _reserve0, uint _reserve1) = (reserve0, reserve1);

466:     function _getAmountOut(uint amountIn, address tokenIn, uint _reserve0, uint _reserve1) internal view returns (uint) {

468:             uint xy =  _k(_reserve0, _reserve1);

471:             (uint reserveA, uint reserveB) = tokenIn == token0 ? (_reserve0, _reserve1) : (_reserve1, _reserve0);

473:             uint y = reserveB - _get_y(amountIn+reserveA, xy, reserveB);

476:             (uint reserveA, uint reserveB) = tokenIn == token0 ? (_reserve0, _reserve1) : (_reserve1, _reserve0);

481:     function _k(uint x, uint y) internal view returns (uint) {

483:             uint _x = x * 1e18 / decimals0;

484:             uint _y = y * 1e18 / decimals1;

485:             uint _a = (_x * _y) / 1e18;

486:             uint _b = ((_x * _x) / 1e18 + (_y * _y) / 1e18);

493:     function _mint(address dst, uint amount) internal {

500:     function _burn(address dst, uint amount) internal {

507:     function approve(address spender, uint amount) external returns (bool) {

514:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {

539:     function transfer(address dst, uint amount) external returns (bool) {

544:     function transferFrom(address src, address dst, uint amount) external returns (bool) {

546:         uint spenderAllowance = allowance[src][spender];

549:             uint newAllowance = spenderAllowance - amount;

559:     function _transferTokens(address src, address dst, uint amount) internal {

```

```solidity
File: ./contracts/PairFees.sol

29:     function claimFeesFor(address recipient, uint amount0, uint amount1) external {

37:     function processStakingFees(uint amount, bool isTokenZero) external {

```

```solidity
File: ./contracts/PermissionsRegistry.sol

97:         for(uint i = 0; i < _roles.length; i++){

108:         for(uint i = 0; i < rta.length; i++){

111:             for(uint k = 0; k < __roles.length; k++){

148:         for(uint i = 0; i < rta.length; i++){

156:         for(uint i = 0; i < atr.length; i++){

178:         for(uint i = 0; i < _roles.length; i++){

202:         uint i = 0;

```

```solidity
File: ./contracts/RewardsDistributor.sol

22:         uint time,

23:         uint tokens

27:         uint tokenId,

28:         uint amount,

29:         uint claim_epoch,

30:         uint max_epoch

35:     uint public start_time;

36:     uint public time_cursor;

37:     mapping(uint => uint) public time_cursor_of;

39:     uint public last_token_time;

41:     uint public token_last_balance;

53:         uint _t = block.timestamp / WEEK * WEEK;

75:         uint token_balance = IERC20(token).balanceOf(address(this));

76:         uint to_distribute = token_balance - token_last_balance;

79:         uint t = last_token_time;

80:         uint since_last = block.timestamp - t;

82:         uint this_week = t / WEEK * WEEK;

83:         uint next_week = 0;

85:         for (uint i = 0; i < 20; i++) {

112:     function _find_timestamp_user_epoch(address ve, uint tokenId, uint _timestamp, uint max_user_epoch) internal view returns (uint) {

113:         uint _min = 0;

114:         uint _max = max_user_epoch;

115:         for (uint i = 0; i < 128; i++) {

117:             uint _mid = (_min + _max + 2) / 2;

128:     function _claim(uint _tokenId, address ve, uint _last_token_time) internal returns (uint) {

129:         uint to_distribute = 0;

131:         uint max_user_epoch = IVotingEscrow(ve).user_point_epoch(_tokenId);

132:         uint _start_time = start_time;

136:         uint week_cursor = time_cursor_of[_tokenId];

145:         uint supply;

147:         for (uint i = 0; i < 50; i++) {

149:             uint balance_of = IVotingEscrow(ve).balanceOfNFTAt(_tokenId, week_cursor + WEEK - 1);

162:     function _claimable(uint _tokenId, address ve, uint _last_token_time) internal view returns (uint) {

163:         uint to_distribute = 0;

165:         uint max_user_epoch = IVotingEscrow(ve).user_point_epoch(_tokenId);

166:         uint _start_time = start_time;

170:         uint week_cursor = time_cursor_of[_tokenId];

178:         uint supply;

180:         for (uint i = 0; i < 50; i++) {

182:             uint balance_of = IVotingEscrow(ve).balanceOfNFTAt(_tokenId, week_cursor + WEEK - 1);

192:     function claimable(uint _tokenId) external view returns (uint) {

193:         uint _last_token_time = last_token_time / WEEK * WEEK;

198:         uint _last_token_time = last_token_time;

200:         uint amount = _claim(_tokenId, voting_escrow, _last_token_time);

220:         uint _last_token_time = last_token_time;

223:         uint total = 0;

225:         for (uint i = 0; i < _tokenIds.length; i++) {

226:             uint _tokenId = _tokenIds[i];

228:             uint amount = _claim(_tokenId, _voting_escrow, _last_token_time);

```

```solidity
File: ./contracts/RouterV2.sol

33:     function transferFrom(address src, address dst, uint amount) external returns (bool);

34:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

35:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

36:     function burn(address to) external returns (uint amount0, uint amount1);

37:     function mint(address to) external returns (uint liquidity);

45:     function transfer(address recipient, uint amount) external returns (bool);

49:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

50:     function approve(address spender, uint value) external returns (bool);

61:     function min(uint a, uint b) internal pure returns (uint) {

64:     function sqrt(uint y) internal pure returns (uint z) {

67:             uint x = y / 2 + 1;

76:     function sub(uint x, uint y) internal pure returns (uint z) {

83:     function transfer(address to, uint value) external returns (bool);

104:         uint decimals0;

105:         uint decimals1;

106:         uint reserve0;

107:         uint reserve1;

111:         uint balanceA;

112:         uint balanceB;

113:         uint reserveA;

114:         uint reserveB;

115:         uint decimalsA;

116:         uint decimalsB;

121:     uint internal constant MINIMUM_LIQUIDITY = 10**3;

130:     event Swap(address indexed sender,uint amount0In,address _tokenIn, address indexed to, bool stable);

132:     modifier ensure(uint deadline) {

151:     function _k(uint x, uint y, uint decimals0, uint decimals1, bool stable) internal pure returns (uint) {

153:             uint _x = x * 1e18 / decimals0;

154:             uint _y = y * 1e18 / decimals1;

155:             uint _a = (_x * _y) / 1e18;

156:             uint _b = ((_x * _x) / 1e18 + (_y * _y) / 1e18);

175:     function quoteLiquidity(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {

181:     function getReserves(address tokenA, address tokenB, bool stable) public view returns (uint reserveA, uint reserveB) {

183:         (uint reserve0, uint reserve1,) = IBaseV1Pair(pairFor(tokenA, tokenB, stable)).getReserves();

188:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount, bool stable) {

192:         uint amountStable;

193:         uint amountVolatile;

194:         uint amountOut;

220:     function getPoolAmountOut(uint amountIn, address tokenIn, address pair) public view returns (uint amount) {

222:         uint amountOut = IBaseV1Pair(pair).getAmountOut(amountIn, tokenIn);

233:     function _swapRatio(uint amountIn, address tokenIn, address pair, uint amountOut) internal view returns (bool){

240:         uint _balance0 = IERC20(pairSwapMetaData.token0).balanceOf(address(pair));

241:         uint _balance1 = IERC20(pairSwapMetaData.token1).balanceOf(address(pair));

258:     function getAmountsOut(uint amountIn, route[] memory routes) public returns (uint[] memory amounts) {

265:         for (uint i = 0; i < routes.length; i++) {

290:         uint amountADesired,

291:         uint amountBDesired

292:     ) external view returns (uint amountA, uint amountB, uint liquidity) {

295:         (uint reserveA, uint reserveB) = (0,0);

296:         uint _totalSupply = 0;

306:             uint amountBOptimal = quoteLiquidity(amountADesired, reserveA, reserveB);

311:                 uint amountAOptimal = quoteLiquidity(amountBDesired, reserveB, reserveA);

322:         uint liquidity

323:     ) external view returns (uint amountA, uint amountB) {

331:         (uint reserveA, uint reserveB) = getReserves(tokenA, tokenB, stable);

332:         uint _totalSupply = erc20(_pair).totalSupply();

343:         uint amountADesired,

344:         uint amountBDesired,

345:         uint amountAMin,

346:         uint amountBMin

347:     ) internal returns (uint amountA, uint amountB) {

354:         (uint reserveA, uint reserveB) = getReserves(tokenA, tokenB, stable);

358:             uint amountBOptimal = quoteLiquidity(amountADesired, reserveA, reserveB);

362:                 uint amountAOptimal = quoteLiquidity(amountBDesired, reserveB, reserveA);

374:         uint amountADesired,

375:         uint amountBDesired,

376:         uint amountAMin,

377:         uint amountBMin,

379:         uint deadline

380:     ) external ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {

394:         uint amountTokenDesired,

395:         uint amountTokenMin,

396:         uint amountETHMin,

398:         uint deadline

399:     ) external payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {

423:         uint liquidity,

424:         uint amountAMin,

425:         uint amountBMin,

427:         uint deadline

428:     ) public ensure(deadline) returns (uint amountA, uint amountB) {

431:         (uint amount0, uint amount1) = IBaseV1Pair(pair).burn(to);

440:         uint liquidity,

441:         uint amountTokenMin,

442:         uint amountETHMin,

444:         uint deadline

445:     ) public ensure(deadline) returns (uint amountToken, uint amountETH) {

465:         uint liquidity,

466:         uint amountAMin,

467:         uint amountBMin,

469:         uint deadline,

471:     ) external returns (uint amountA, uint amountB) {

474:             uint value = approveMax ? type(uint).max : liquidity;

484:         uint liquidity,

485:         uint amountTokenMin,

486:         uint amountETHMin,

488:         uint deadline,

490:     ) external returns (uint amountToken, uint amountETH) {

492:         uint value = approveMax ? type(uint).max : liquidity;

500:         for (uint i = 0; i < routes.length; i++) {

521:                 uint amountOut = amounts[i + 1];

522:                 (uint amount0Out, uint amount1Out) = routes[i].from == token0 ? (uint(0), amountOut) : (amountOut, uint(0));

533:         uint amountIn,

534:         uint amountOutMin,

540:         uint deadline

564:         uint amountIn,

565:         uint amountOutMin,

568:         uint deadline

587:     function swapExactETHForTokens(uint amountOutMin, route[] calldata routes, address to, uint deadline) external payable ensure(deadline) returns (uint[] memory amounts) {

603:     function swapExactTokensForETH(uint amountIn, uint amountOutMin, route[] calldata routes, address to, uint deadline)

633:         uint deadline

640:     function _safeTransferETH(address to, uint value) internal {

665:         uint liquidity,

666:         uint amountTokenMin,

667:         uint amountETHMin,

669:         uint deadline

670:     ) public ensure(deadline) returns (uint amountToken, uint amountETH) {

688:         uint liquidity,

689:         uint amountTokenMin,

690:         uint amountETHMin,

692:         uint deadline,

694:     ) external returns (uint amountToken, uint amountETH) {

696:         uint value = approveMax ? type(uint).max : liquidity;

706:         for (uint i; i < routes.length; i++) {

710:             uint amountInput;

711:             uint amountOutput;

713:             (uint reserve0, uint reserve1,) = pair.getReserves();

714:             (uint reserveInput,) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);

718:             (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));

727:         uint amountIn,

728:         uint amountOutMin,

731:         uint deadline

739:         uint balanceBefore = erc20(routes[routes.length - 1].to).balanceOf(to);

747:         uint amountOutMin,

750:         uint deadline

757:         uint amountIn = msg.value;

760:         uint balanceBefore = erc20(routes[routes.length - 1].to).balanceOf(to);

769:         uint amountIn,

770:         uint amountOutMin,

773:         uint deadline

783:         uint amountOut = erc20(address(wETH)).balanceOf(address(this));

```

```solidity
File: ./contracts/Thenian.sol

157:     function _mintTo(address account, uint amount) internal {

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

19:     function toString(uint value) internal pure returns (string memory) {

26:         uint temp = value;

27:         uint digits;

41:     function _tokenURI(uint _tokenId, uint _balanceOf, uint _locked_end, uint _value, bool isSMNFT) external pure returns (string memory output) {

```

```solidity
File: ./contracts/VoterV3.sol

31:     uint public EPOCH_DURATION;

217:         for (uint i = 0; i < _poolCnt; i++) {

```

```solidity
File: ./contracts/VotingEscrow.sol

38:         uint tokenId,

39:         uint value,

40:         uint indexed locktime,

42:         uint ts

69:     event Withdraw(address indexed provider, uint tokenId, uint value, uint ts);

72:     event Supply(uint prevSupply, uint supply);

85:     uint public SMNFT_BONUS = 1000;

86:     uint public PRECISISON = 10000;

101:     uint internal tokenId;

103:     uint internal WEEK;

105:     uint internal MAXTIME;

177:     function tokenURI(uint _tokenId) external view returns (string memory) {

189:     mapping(uint => address) internal idToOwner;

196:     function ownerOf(uint _tokenId) public view returns (address) {

224:     mapping(uint => address) internal idToApprovals;

229:     mapping(uint => uint) public ownership_change;

233:     function getApproved(uint _tokenId) external view returns (address) {

254:     function approve(address _approved, uint _tokenId) public {

285:     function _clearApproval(address _owner, uint _tokenId) internal {

298:     function _isApprovedOrOwner(address _spender, uint _tokenId) internal view returns (bool) {

306:     function isApprovedOrOwner(address _spender, uint _tokenId) external view returns (bool) {

319:         uint _tokenId,

359:         uint _tokenId

378:         uint _tokenId

387:         uint size;

409:         uint _tokenId,

447:     mapping(address => mapping(uint => uint)) internal ownerToNFTokenIdList;

450:     mapping(uint => uint) internal tokenToOwnerIndex;

453:     function tokenOfOwnerByIndex(address _owner, uint _tokenIndex) public view returns (uint) {

460:     function _addTokenToOwnerList(address _to, uint _tokenId) internal {

461:         uint current_count = _balance(_to);

469:     function _addTokenTo(address _to, uint _tokenId) internal {

486:     function _mint(address _to, uint _tokenId) internal returns (bool) {

500:     function _removeTokenFromOwnerList(address _from, uint _tokenId) internal {

502:         uint current_count = _balance(_from) - 1;

503:         uint current_index = tokenToOwnerIndex[_tokenId];

511:             uint lastTokenId = ownerToNFTokenIdList[_from][current_count];

529:     function _removeTokenFrom(address _from, uint _tokenId) internal {

540:     function _burn(uint _tokenId) internal {

560:     mapping(uint => IVotingEscrow.LockedBalance) public locked;

561:     uint public permanentLockBalance;

562:     uint public smNFTBalance;

563:     uint public epoch;

564:     mapping(uint => int128) public slope_changes; // time -> signed slope change

565:     uint public supply;

569:     uint internal constant MULTIPLIER = 1 ether;

578:     function get_last_user_slope(uint _tokenId) external view returns (int128) {

579:         uint uepoch = votingBalanceLogicData.user_point_epoch[_tokenId];

587:     function user_point_history(uint _tokenId, uint _idx) external view returns (IVotingEscrow.Point memory) {

591:     function point_history(uint epoch) external view returns (IVotingEscrow.Point memory) {

595:     function user_point_epoch(uint tokenId) external view returns (uint) {

604:         uint _tokenId,

612:         uint _epoch = epoch;

655:         uint last_checkpoint = last_point.ts;

660:         uint block_slope = 0; // dblock/dt

669:             uint t_i = (last_checkpoint / WEEK) * WEEK;

670:             for (uint i = 0; i < 255; ++i) {

746:             uint user_epoch = votingBalanceLogicData.user_point_epoch[_tokenId] + 1;

762:         uint _tokenId,

763:         uint _value,

764:         uint unlock_time,

769:         uint supply_before = supply;

816:     function deposit_for(uint _tokenId, uint _value) external nonreentrant {

837:     function _create_lock(uint _value, uint _lock_duration, address _to, bool isSMNFT) internal returns (uint) {

838:         uint unlock_time = (block.timestamp + _lock_duration) / WEEK * WEEK; // Locktime is rounded down to weeks

844:         uint _tokenId = tokenId;

863:     function create_lock(uint _value, uint _lock_duration, bool isSMNFT) external nonreentrant returns (uint) {

871:     function create_lock_for(uint _value, uint _lock_duration, address _to, bool isSMNFT) external nonreentrant returns (uint) {

877:     function increase_amount(uint _tokenId, uint _value) external nonreentrant {

899:     function increase_unlock_time(uint _tokenId, uint _lock_duration, bool isSMNFT) external nonreentrant {

904:         uint unlock_time = (block.timestamp + _lock_duration) / WEEK * WEEK; // Locktime is rounded down to weeks

922:     function updateToSMNFT (uint _tokenId, IVotingEscrow.LockedBalance memory _locked) internal {

925:         uint _amount = uint(int256(_locked.amount));

928:         uint _value = uint256(uint128(_locked.amount));

938:     function withdraw(uint _tokenId) external nonreentrant {

945:         uint value = uint(int256(_locked.amount));

948:         uint supply_before = supply;

965:     function lockPermanent(uint _tokenId) external {

974:         uint _amount = uint(int256(_newLocked.amount));

987:     function unlockPermanent(uint _tokenId) external {

994:         uint _amount = uint(int256(_newLocked.amount));

1015:     function balanceOfNFT(uint _tokenId) external view returns (uint) {

1020:     function balanceOfNFTAt(uint _tokenId, uint _t) external view returns (uint) {

1024:     function balanceOfAtNFT(uint _tokenId, uint _block) external view returns (uint) {

1031:     function totalSupplyAt(uint _block) external view returns (uint) {

1042:     function totalSupplyAtT(uint t) public view returns (uint) {

1051:     mapping(uint => uint) public attachments;

1052:     mapping(uint => bool) public voted;

1064:     function voting(uint _tokenId) external {

1069:     function abstain(uint _tokenId) external {

1074:     function attach(uint _tokenId) external {

1079:     function detach(uint _tokenId) external {

1084:     function merge(uint _from, uint _to) external nonreentrant {

1095:         uint value0 = uint(int256(_locked0.amount));

1096:         uint end = _locked0.end >= _locked1.end ? _locked0.end : _locked1.end;

1148:         uint _from,

1149:         uint _amount

1237:         uint votes = 0;

1238:         for (uint i = 0; i < _tokenIds.length; i++) {

1239:             uint tId = _tokenIds[i];

1245:     function getPastVotes(address account, uint timestamp)

1253:         uint votes = 0;

1254:         for (uint i = 0; i < _tokenIds.length; i++) {

1255:             uint tId = _tokenIds[i];

1263:     function getsmNFTPastVotes(address account, uint timestamp) 

1271:         uint votes = 0;

1272:         for (uint i = 0; i < _tokenIds.length; i++) {

1273:             uint tId = _tokenIds[i];

1318:         uint nonce,

1319:         uint expiry,

1358:     function setSmNFTBonus(uint _bonus) external {

1364:     function calculate_sm_nft_bonus(uint amount) public view returns (uint){

1368:     function calculate_original_sm_nft_amount(uint amount) public view returns (uint){

```

```solidity
File: ./contracts/chainlink/EpochController.sol

21:     event Logger(string addr, uint timestamp,uint blocknbr , bool x1, bool x2, string msg);

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

112:         uint i = 0;

137:         uint i = 0;

145:         uint i = 0;

154:         uint i = 0;

155:         uint k;

167:         uint i = 0;

175:         uint i=0;

183:         uint i = 0;

191:         uint i = 0;

199:         uint i = 0;

210:         uint i = 0;

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

68:         uint i = 0;

75:         uint i = 0;

83:         uint i = 0;

91:         uint i = 0;

98:         uint i = 0;

107:         uint i = 0;

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

45:         uint length = genesisPools[nativeToken].length;

75:         uint length = pools.length;

```

```solidity
File: ./contracts/interfaces/IAuctionFactory.sol

5:     function auctions(uint index) external view returns (address);

```

```solidity
File: ./contracts/interfaces/IBlack.sol

7:     function approve(address spender, uint value) external returns (bool);

```

```solidity
File: ./contracts/interfaces/IBlackholePairApiV2.sol

11:         uint decimals; 			        // pair decimals

13:         uint total_supply; 			    // pair tokens supply

18:         uint token0_decimals; 		    // pair 1st token decimals

19:         uint reserve0; 			        // pair 1st token reserves (nr. of tokens in the contract)

20:         uint claimable0;                // claimable 1st token from fees (for unstaked positions)

24:         uint token1_decimals;    		// pair 2nd token decimals

25:         uint reserve1; 			        // pair 2nd token reserves (nr. of tokens in the contract)

26:         uint claimable1; 			    // claimable 2nd token from fees (for unstaked positions)

30:         uint gauge_total_supply; 		// pair staked tokens (less/eq than/to pair total supply)

31:         uint emissions; 			    // pair emissions (per second)

33:         uint emissions_token_decimals; 	// pair emissions token decimals

36:         uint account_lp_balance; 		// account LP tokens balance

37:         uint account_token0_balance; 	// account 1st token balance

38:         uint account_token1_balance; 	// account 2nd token balance

39:         uint account_gauge_balance;     // account pair staked in gauge balance

40:         uint account_gauge_earned; 		// account earned emissions for this pair

43:         uint votes;

46:         uint staked_token0_fees;      // staked token 0 fees accumulated till now

47:         uint staked_token1_fees;      // staked token 1 fees accumulated till now

63:     function getAllPair(address _user, uint _amounts, uint _offset) external view returns(uint totPairs, bool hasNext, pairInfo[] memory pairs);

```

```solidity
File: ./contracts/interfaces/IBribe.sol

5:     function deposit(uint amount, uint tokenId) external;

6:     function withdraw(uint amount, uint tokenId) external;

8:     function notifyRewardAmount(address token, uint amount) external;

10:     function getReward(uint tokenId, address[] memory tokens) external;

```

```solidity
File: ./contracts/interfaces/IBribeDistribution.sol

5:     function _deposit(uint amount, uint tokenId) external;

6:     function _withdraw(uint amount, uint tokenId) external;

7:     function getRewardForOwner(uint tokenId, address[] memory tokens) external;

8:     function notifyRewardAmount(address token, uint amount) external;

```

```solidity
File: ./contracts/interfaces/IBribeFull.sol

8:     function _deposit(uint amount, uint tokenId) external;

9:     function _withdraw(uint amount, uint tokenId) external;

10:     function getRewardForOwner(uint tokenId, address[] memory tokens) external;

11:     function notifyRewardAmount(address token, uint amount) external;

15:     function getEpochStart(uint timestamp) external pure returns (uint);

16:     function getPriorSupplyIndex(uint timestamp) external view returns (uint);

17:     function bribeTokens(uint index) external view returns (address);

18:     function rewardsPerEpoch(address token,uint ts) external view returns (uint);

19:     function supplyCheckpoints(uint _index) external view returns(uint timestamp, uint supplyd);

20:     function earned(address token, uint tokenId) external view returns (uint);

21:     function earned(uint tokenId, address token) external view returns (uint);

```

```solidity
File: ./contracts/interfaces/IDibs.sol

11:     function findTotalRewardFor(address _user, uint _totalFees) external view returns(uint256 _referralFeeAmount);

```

```solidity
File: ./contracts/interfaces/IERC20.sol

6:     function transfer(address recipient, uint amount) external returns (bool);

10:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

12:     function approve(address spender, uint value) external returns (bool);

14:     event Transfer(address indexed from, address indexed to, uint value);

15:     event Approval(address indexed owner, address indexed spender, uint value);

```

```solidity
File: ./contracts/interfaces/IGauge.sol

5:     function notifyRewardAmount(address token, uint amount) external;

8:     function claimFees() external returns (uint claimed0, uint claimed1);

```

```solidity
File: ./contracts/interfaces/IGaugeCL.sol

5:     function notifyRewardAmount(address token, uint amount) external returns (IncentiveKey memory incentivekey, uint256 rewardRate, uint128 bonusRewardRate);

7:     function claimFees() external returns (uint claimed0, uint claimed1);

```

```solidity
File: ./contracts/interfaces/IGaugeDistribution.sol

5:     function notifyRewardAmount(address token, uint amount) external;

7:     function claimFees() external returns (uint claimed0, uint claimed1);

```

```solidity
File: ./contracts/interfaces/IGaugeManager.sol

15:     function notifyRewardAmount(uint amount) external;

```

```solidity
File: ./contracts/interfaces/IGenesisPoolFactory.sol

7:     function allGenesisPools(uint index) external returns (address);

```

```solidity
File: ./contracts/interfaces/IPair.sol

5:     function metadata() external view returns (uint dec0, uint dec1, uint r0, uint r1, bool st, address t0, address t1);

10:     function transferFrom(address src, address dst, uint amount) external returns (bool);

11:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

12:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

13:     function burn(address to) external returns (uint amount0, uint amount1);

14:     function mint(address to) external returns (uint liquidity);

15:     function getReserves() external view returns (uint _reserve0, uint _reserve1, uint _blockTimestampLast);

```

```solidity
File: ./contracts/interfaces/IPairCallee.sol

5:     function hook(address sender, uint amount0, uint amount1, bytes calldata data) external;

```

```solidity
File: ./contracts/interfaces/IPairFactory.sol

7:     function allPairs(uint index) external view returns (address);

```

```solidity
File: ./contracts/interfaces/IRewardsDistributor.sol

7:     function claimable(uint _tokenId) external view returns (uint);

8:     function claim(uint _tokenId) external returns (uint);

```

```solidity
File: ./contracts/interfaces/IRouter.sol

11:     function swapExactTokensForTokens(uint amountIn,uint amountOutMin,route[] calldata routes,address to,uint deadline) external returns (uint[] memory amounts);

12:     function addLiquidity(address tokenA,address tokenB,bool stable,uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB, uint liquidity);

14:     function getReserves(address tokenA, address tokenB, bool stable) external view returns (uint reserveA, uint reserveB);

15:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount, bool stable);

16:     function getPoolAmountOut(uint amountIn, address tokenIn, address pair) external view returns (uint amount);

```

```solidity
File: ./contracts/interfaces/IUniswapRouterETH.sol

11:         uint amountADesired,

12:         uint amountBDesired,

13:         uint amountAMin,

14:         uint amountBMin,

16:         uint deadline

17:     ) external returns (uint amountA, uint amountB, uint liquidity);

21:         uint amountTokenDesired,

22:         uint amountTokenMin,

23:         uint amountETHMin,

25:         uint deadline

26:     ) external payable returns (uint amountToken, uint amountETH, uint liquidity);

31:         uint liquidity,

32:         uint amountAMin,

33:         uint amountBMin,

35:         uint deadline

36:     ) external returns (uint amountA, uint amountB);

40:         uint liquidity,

41:         uint amountTokenMin,

42:         uint amountETHMin,

44:         uint deadline

45:     ) external returns (uint amountToken, uint amountETH);

48:         uint amountIn, 

49:         uint amountOutMin, 

52:         uint deadline

55:     function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)

60:     function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

64:     function getAmountsOut(uint amountIn, address[] calldata path)

```

```solidity
File: ./contracts/interfaces/IUniswapV2Pair.sol

8:     function burn(address to) external returns (uint amount0, uint amount1);

```

```solidity
File: ./contracts/interfaces/IVeArtProxy.sol

5:     function _tokenURI(uint _tokenId, uint _balanceOf, uint _locked_end, uint _value, bool isSMNFT) external pure returns (string memory output);

```

```solidity
File: ./contracts/interfaces/IVoter.sol

8:     function usedWeights(uint id) external view returns(uint);

9:     function lastVoted(uint id) external view returns(uint);

10:     function poolVote(uint id, uint _index) external view returns(address _pair);

11:     function votes(uint id, address _pool) external view returns(uint votes);

13:     function poolVoteLength(uint tokenId) external view returns(uint);

14:     function lastVotedTimestamp(uint id) external view returns(uint);

```

```solidity
File: ./contracts/interfaces/IVotingEscrow.sol

12:         uint smNFT;

13:         uint smNFTBonus;

18:         uint end;

23:     function create_lock_for(uint _value, uint _lock_duration, address _to, bool isSMSFT) external returns (uint);

25:     function locked(uint id) external view returns(LockedBalance memory);

26:     function tokenOfOwnerByIndex(address _owner, uint _tokenIndex) external view returns (uint);

31:     function point_history(uint loc) external view returns (Point memory);

32:     function user_point_history(uint tokenId, uint loc) external view returns (Point memory);

34:     function user_point_epoch(uint tokenId) external view returns (uint);

42:     function voting(uint tokenId) external;

43:     function abstain(uint tokenId) external;

44:     function attach(uint tokenId) external;

45:     function detach(uint tokenId) external;

46:     function approve(address _approved, uint _tokenId) external;

49:     function deposit_for(uint tokenId, uint value) external;

51:     function balanceOfNFT(uint _id) external view returns (uint);

52:     function balanceOfNFTAt(uint _tokenId, uint _t) external view returns (uint);

63:     function lockPermanent(uint _tokenId) external;

65:     function unlockPermanent(uint _tokenId) external;

68:     function calculate_sm_nft_bonus(uint amount) external view returns (uint);

69:     function calculate_original_sm_nft_amount(uint amount) external view returns (uint);

```

```solidity
File: ./contracts/libraries/Base64.sol

13:         uint len = data.length;

17:         uint encodedLen = 4 * ((len + 2) / 3);

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

7:     uint internal constant NO_VOTING_WINDOW = 150;

```

```solidity
File: ./contracts/libraries/Math.sol

5:     function max(uint a, uint b) internal pure returns (uint) {

8:     function min(uint a, uint b) internal pure returns (uint) {

11:     function sqrt(uint y) internal pure returns (uint z) {

14:             uint x = y / 2 + 1;

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

10:         mapping(uint => IVotingEscrow.Point) point_history;

11:         mapping(uint => uint) user_point_epoch;

12:         mapping(uint => IVotingEscrow.Point[1000000000]) user_point_history; // user -> Point[user_epoch]

20:     function balanceOfNFT(uint _tokenId, uint _t, 

23:         uint _epoch = VotingBalanceLogicData.user_point_epoch[_tokenId];

27:             uint userEpoch = getPastUserPointIndex(_epoch, _tokenId, _t, VotingBalanceLogicData);

46:     function getPastUserPointIndex(uint _epoch, 

47:     uint _tokenId,

48:     uint _t,

51:         uint lower = 0;

52:         uint upper = _epoch;

54:             uint center = upper - (upper - lower) / 2; // ceil, avoiding overflow

72:     function balanceOfAtNFT(uint _tokenId, 

73:         uint _block,

75:         uint epoch

82:         uint _min = 0;

83:         uint _max = VotingBalanceLogicData.user_point_epoch[_tokenId];

84:         for (uint i = 0; i < 128; ++i) {

89:             uint _mid = (_min + _max + 1) / 2;

106:         uint max_epoch = epoch;

107:         uint _epoch = _find_block_epoch(_block, max_epoch, VotingBalanceLogicData);

109:         uint d_block = 0;

110:         uint d_t = 0;

119:         uint block_time = point_0.ts;

132:     function totalSupplyAt(uint _block, uint epoch,

134:         mapping(uint => int128) storage slope_changes) public view returns (uint) {

136:         uint _epoch = epoch;

137:         uint target_epoch = _find_block_epoch(_block, _epoch, VotingBalanceLogicData);

140:         uint dt = 0;

160:     function _find_block_epoch(uint _block, 

161:         uint max_epoch,

165:         uint _min = 0;

166:         uint _max = max_epoch;

167:         for (uint i = 0; i < 128; ++i) {

172:             uint _mid = (_min + _max + 1) / 2;

187:         uint t,

188:         mapping(uint => int128) storage slope_changes) internal view returns (uint) {

189:         uint WEEK = BlackTimeLibrary.WEEK;

191:         uint t_i = (last_point.ts / WEEK) * WEEK;

192:         for (uint i = 0; i < 255; ++i) {

214:     function getPastGlobalPointIndex(uint _epoch,

215:         uint _t,

217:         uint lower = 0;

218:         uint upper = _epoch;

220:             uint center = upper - (upper - lower) / 2; // ceil, avoiding overflow

236:     function totalSupplyAtT(uint t, uint epoch,

237:         mapping(uint => int128) storage slope_changes,

239:         uint _epoch = epoch;

243:             uint globalEpoch = getPastGlobalPointIndex(_epoch, t, VotingBalanceLogicData);

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

8:         uint timestamp;

27:     uint public constant MAX_DELEGATES = 1024; // avoid too much gas

50:         uint _tokenId,

66:                 for (uint i = 0; i < length;) {

67:                     uint tId = srcRepOld[i];

101:                     for (uint i = 0; i < dstRepOld.length; i++) {

102:                         uint tId = dstRepOld[i];

139:                 for (uint i = 0; i < length;) {

140:                     uint tId = srcRepOld[i];

170:                 uint ownerTokenCount = _tokenHelper.ownerToNFTokenCountFn(_owner);

176:                     for (uint i = 0; i < dstRepOld.length; i++) {

177:                         uint tId = dstRepOld[i];

182:                 for (uint i = 0; i < ownerTokenCount; i++) {

183:                     uint tId = _tokenHelper.tokenOfOwnerByIndex(_owner,i);

191:     function getPastVotesIndex(Data storage data, address account, uint timestamp) internal view returns (uint32) {

```

### <a name="NC-21"></a>[NC-21] Interfaces should be defined in separate files from their usage
The interfaces below should be defined in separate files, so that it's easier for future projects to import them, and to avoid duplication later on if they need to be used elsewhere in the project

*Instances (20)*:
```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

23: interface IPairAPI {

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

25: interface IPairAPI {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

18: interface IGaugeCL {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

10: interface IRewarder {

15: interface IGauge {

```

```solidity
File: ./contracts/GaugeV2.sol

15: interface IRewarder {

```

```solidity
File: ./contracts/GenesisPoolManager.sol

21: interface IBaseV1Factory {

```

```solidity
File: ./contracts/GlobalRouter.sol

10: interface ITradeHelper {

26: interface IBaseV1Factory {

34: interface IBaseV1Pair {

44: interface erc20 {

54: interface IPairFactory {

81: interface IWETH {

91: interface IRouterV3 {

```

```solidity
File: ./contracts/RouterV2.sol

24: interface IBaseV1Factory {

32: interface IBaseV1Pair {

43: interface erc20 {

53: interface IPairFactory {

81: interface IWETH {

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

11: interface IGauge{

```

### <a name="NC-22"></a>[NC-22] Lack of checks in setters
Be it sanity checks (like checks against `0`-values) or initial setting checks: it's best for Setter functions to have them

*Instances (37)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

21:     function setInternalBribe(address intbribe) external;

133:     function setReferralFee(uint256 _dibsFee) external onlyAllowed {
             dibsPercentage = _dibsFee;

```

```solidity
File: ./contracts/BlackClaims.sol

64:     function setTreasury(address treasury_) external onlyOwner {
            treasury = treasury_;
            emit TreasurySet(treasury_);

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

139:     function setPluginForPool(
             address pool,
             address _plugin
         ) external onlyAuthorized {
             poolToPlugin[pool] = _plugin;

151:     function setPlugin(
             address pool,
             address newPluginAddress
         ) external onlyAuthorized {
             IAlgebraCustomPoolEntryPoint(entryPoint).setPlugin(

161:     function setPluginConfig(
             address pool,
             uint8 newConfig
         ) external onlyAuthorized {
             IAlgebraCustomPoolEntryPoint(entryPoint).setPluginConfig(

171:     function setFee(address pool, uint16 newFee) external onlyAuthorized {
             IAlgebraCustomPoolEntryPoint(entryPoint).setFee(pool, newFee);

175:     function setCommunityFee(address pool, uint16 newCommunityFee) external onlyAuthorized {
             IAlgebraCustomVaultPoolEntryPoint(entryPoint).setCommunityFee(pool, newCommunityFee);

189:     function setAlgebraFeeShare(uint16 _newFeeShare) external onlyOwner {
             algebraFeeShare = _newFeeShare;

```

```solidity
File: ./contracts/GaugeManager.sol

282:     function setGaugeAsCommunityFeeReceiver(address _gauge, address _pool) internal {
             address communityVault = IAlgebraPool(_pool).communityVault();
             IAlgebraCommunityVault(communityVault).changeCommunityFeeReceiver(_gauge);

469:     function setFarmingParam(address _farmingCenter, address _algebraEternalFarming, address _nfpm) external GaugeAdmin {
             farmingParam = IGaugeManager.FarmingParam(_farmingCenter, _algebraEternalFarming, _nfpm);

571:     function setAVM(address _avm) external onlyOwner {
             avm = IAutoVotingEscrowManager(_avm);

```

```solidity
File: ./contracts/GaugeV2.sol

376:     function setGenesisPool(address _genesisPool) external onlyGenesisManager{
             genesisPool = _genesisPool;

438:     function setGenesisPoolManager(address _genesisPoolManager) external onlyOwner {
             genesisManager = _genesisPoolManager;

```

```solidity
File: ./contracts/GenesisPool.sol

73:     function setGenesisPoolInfo(GenesisInfo calldata _genesisInfo, TokenAllocation calldata _allocationInfo, address _auction) external onlyManager(){
            genesisInfo = _genesisInfo;
    
            genesisInfo.duration = BlackTimeLibrary.epochMultiples(genesisInfo.duration);
            genesisInfo.startTime = BlackTimeLibrary.epochStart(genesisInfo.startTime);
            
            allocationInfo.proposedNativeAmount = _allocationInfo.proposedNativeAmount;
            allocationInfo.proposedFundingAmount = _allocationInfo.proposedFundingAmount;
            allocationInfo.allocatedNativeAmount = 0;
            allocationInfo.allocatedFundingAmount = 0;
            allocationInfo.refundableNativeAmount = 0;
    
            auction = IAuction(_auction);
            poolStatus = PoolStatus.NATIVE_TOKEN_DEPOSITED;
    
            emit DepositedNativeToken(_genesisInfo.nativeToken, genesisInfo.tokenOwner, address(this), _allocationInfo.proposedNativeAmount, _allocationInfo.proposedFundingAmount);

201:     function setPoolStatus(PoolStatus status) external onlyManager {
             _setPoolStatus(status);

401:     function setMaturityTime(uint256 _maturityTime) external onlyManager{
             genesisInfo.maturityTime = _maturityTime;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

25:     function setGenesisPool(address _genesisPool) external;

26:     function setGenesisStatus(address _pair, bool status) external;

287:     function setMinimumDuration(uint256 _duration) external Governance {
             MIN_DURATION = _duration;

291:     function setMinimumThreshold(uint256 _threshold) external Governance {
             MIN_THRESHOLD = _threshold;

295:     function setMaturityTime(uint256 _maturityTime) external Governance {
             MATURITY_TIME = _maturityTime;

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

59:     function setTopN() external onlyAVM {
            topN = avm.topN();
            emit TopNUpdated(topN);

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

61:     function setTopN() external onlyAVM {
            topN = avm.topN();
            emit TopNUpdated(topN);

```

```solidity
File: ./contracts/VotingEscrow.sol

275:     function setApprovalForAll(address _operator, bool _approved) external {
             // Throws if `_operator` is the `msg.sender`
             assert(_operator != msg.sender);
             ownerToOperators[msg.sender][_operator] = _approved;
             emit ApprovalForAll(msg.sender, _operator, _approved);

922:     function updateToSMNFT (uint _tokenId, IVotingEscrow.LockedBalance memory _locked) internal {
             _locked.isPermanent = true;
             _locked.isSMNFT = true;
             uint _amount = uint(int256(_locked.amount));
             smNFTBalance += _amount;
             _locked.end = 0;
             uint _value = uint256(uint128(_locked.amount));
             _locked.amount = int128(int256(_value + calculate_sm_nft_bonus(_value)));
             _checkpoint(_tokenId, locked[_tokenId], _locked);
             locked[_tokenId] = _locked;
             // assert(IERC20(token).transfer(burnTokenAddress, _value));
             assert(_black.burn(_value));

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

12:     function setDistribution(address _distro) external;

15:     function setInternalBribe(address intbribe) external;

16:     function setRewarderPid(uint256 pid) external;

17:     function setGaugeRewarder(address _gr) external;

18:     function setFeeVault(address _feeVault) external;

19:     function setGenesisPoolManager(address _genesisManager) external;

97:     function setDistribution(address[] memory _gauges,  address distro) external onlyAllowed {
            uint i = 0;
            for ( i ; i < _gauges.length; i++){

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

35:     function setGenesisManager(address _genesisManager) external onlyManager {
            emit GenesisManagerChanged(genesisManager, _genesisManager);
            genesisManager = _genesisManager;

```

```solidity
File: ./contracts/factories/PairFactory.sol

63:     function setFeeManager(address _feeManager) external onlyManager {
            pendingFeeManager = _feeManager;

87:     function setReferralFee(uint256 _refFee) external onlyManager {
            MAX_REFERRAL_FEE = _refFee;

153:     function setGenesisManager(address _genesisManager) external onlyManager {
             genesisManager = _genesisManager;

```

### <a name="NC-23"></a>[NC-23] Lines are too long
Usually lines in source code are limited to [80](https://softwareengineering.stackexchange.com/questions/148677/why-is-80-characters-the-standard-limit-for-code-width) characters. Today's screens are much larger so it's reasonable to stretch this in some cases. Since the files will most likely reside in GitHub, and GitHub starts using a scroll bar in all cases when the length is over [164](https://github.com/aizatto/character-length) characters, the lines below should be split when they reach that length

*Instances (32)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

64:         last_gauge = address(new GaugeCL(_rewardToken,_ve,_pool,_distribution,_internal_bribe,_external_bribe,_isPair, farmingParam, _bonusRewardToken, address(this)));

85:     function getIncentiveKey(address _rewardToken, address _bonusRewardToken, address _pool, address _algebraEternalFarming) internal view returns (IncentiveKey memory) {

```

```solidity
File: ./contracts/Bribes.sol

62:     constructor(address _owner,address _voter,address _gaugeManager, address _bribeFactory, address _tokenHandler, address _token0, address _token1, string memory _type)  {

```

```solidity
File: ./contracts/GaugeManager.sol

151:     function createGauges(address[] memory _pool, uint256[] memory _gaugeTypes) external nonReentrant returns(address[] memory, address[] memory, address[] memory)  {

170:     function createGaugeWithBonusReward(address _pool, uint256 _gaugeType, address bonusRewardToken) external nonReentrant returns (address _gauge, address _internal_bribe, address _external_bribe)  {

181:     function _createGauge(address _pool, uint256 _gaugeType, address bonusRewardToken) internal returns (address _gauge, address _internal_bribe, address _external_bribe) {

219:             _gauge = IGaugeFactoryCL(_gaugeFactory).createGauge(base, _ve, _pool, address(this), _internal_bribe, _external_bribe, isPair, farmingParam, bonusRewardToken);

```

```solidity
File: ./contracts/GaugeV2.sol

97:     constructor(address _rewardToken,address _ve,address _token,address _distribution, address _internal_bribe, address _external_bribe, bool _isForPair, address _genesisManager) {

```

```solidity
File: ./contracts/GenesisPool.sol

88:         emit DepositedNativeToken(_genesisInfo.nativeToken, genesisInfo.tokenOwner, address(this), _allocationInfo.proposedNativeAmount, _allocationInfo.proposedFundingAmount);

225:         (, , uint _liquidity) = IRouter(_router).addLiquidity(genesisInfo.nativeToken, genesisInfo.fundingToken, genesisInfo.stable, nativeDesired, fundingDesired, 0, 0, address(this), block.timestamp + 100);

```

```solidity
File: ./contracts/GenesisPoolManager.sol

70:     function initialize(address _epochController, address _router, address _permissionRegistory, address _gaugeManager, address _pairFactory, address _genesisFactory, address _auctionFactory, address _tokenHandler) initializer  public {

100:     function depositNativeToken(address nativeToken, uint auctionIndex, GenesisInfo calldata genesisPoolInfo, TokenAllocation calldata allocationInfo) external nonReentrant returns(address genesisPool) {

```

```solidity
File: ./contracts/GlobalRouter.sol

193:     function swapExactTokensForTokens(uint amountIn,uint amountOutMin, ITradeHelper.Route[] calldata routes,address to,uint deadline, bool _type) external ensure(deadline) returns (uint[] memory amounts){

```

```solidity
File: ./contracts/MinterUpgradeable.sol

86:         uint max // sum amounts / max = % ownership of top protocols, so if initial 20m is distributed, and target is 25% protocol ownership, then max - 4 x 20m = 80m

```

```solidity
File: ./contracts/Pair.sol

406:         _balance0 = IERC20(_token0).balanceOf(address(this)); // since we removed tokens, we need to reconfirm balances, can also simply use previous balance - amountIn/ 10000, but doing balanceOf again as safety check

```

```solidity
File: ./contracts/RouterV2.sol

244:         (pairSwapMetaData.reserveA, pairSwapMetaData.reserveB) = tokenIn == pairSwapMetaData.token0 ? (pairSwapMetaData.reserve0, pairSwapMetaData.reserve1) : (pairSwapMetaData.reserve1, pairSwapMetaData.reserve0);

245:         (pairSwapMetaData.decimalsA, pairSwapMetaData.decimalsB) = tokenIn == pairSwapMetaData.token0 ? (pairSwapMetaData.decimals0, pairSwapMetaData.decimals1) : (pairSwapMetaData.decimals1, pairSwapMetaData.decimals0);

250:         if(_k(pairSwapMetaData.balanceA, pairSwapMetaData.balanceB, pairSwapMetaData.decimalsA, pairSwapMetaData.decimalsB, pairSwapMetaData.stable) >= _k(pairSwapMetaData.reserveA, pairSwapMetaData.reserveB, pairSwapMetaData.decimalsA, pairSwapMetaData.decimalsB, pairSwapMetaData.stable)){

587:     function swapExactETHForTokens(uint amountOutMin, route[] calldata routes, address to, uint deadline) external payable ensure(deadline) returns (uint[] memory amounts) {

```

```solidity
File: ./contracts/TokenHandler.sol

36:         require(IPermissionsRegistry(permissionRegistry).hasRole("GENESIS_MANAGER", msg.sender) || IPermissionsRegistry(permissionRegistry).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE GENESIS_MANAGER');

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

42:         output = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

49:         string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "lock #', toString(_tokenId), '", "description": "Black locks, can be used to boost gauge yields, vote on token emission, and receive bribes", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));

```

```solidity
File: ./contracts/VoterV3.sol

202:         if ((_timestamp >= BlackTimeLibrary.epochVoteEnd(_timestamp)) && !ITokenHandler(tokenHandler).isWhitelistedNFT(_tokenId) && (IAutoVotingEscrowManager(avm).tokenIdToAVMId(_tokenId)) == (0)){

```

```solidity
File: ./contracts/VotingEscrow.sol

181:         return IVeArtProxy(artProxy)._tokenURI(_tokenId,VotingBalanceLogic.balanceOfNFT(_tokenId, block.timestamp, votingBalanceLogicData),_locked.end,uint(int256(_locked.amount)), _locked.isSMNFT);

651:         IVotingEscrow.Point memory last_point = IVotingEscrow.Point({bias: 0, slope: 0, ts: block.timestamp, blk: block.number, permanent: 0, smNFT : 0, smNFTBonus : 0});

```

```solidity
File: ./contracts/chainlink/EpochController.sol

50:         emit Logger(sender, block.timestamp, block.number, msg.sender == automationRegistry, permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'performUpkeep called');

63:         emit Logger(sender, block.timestamp, block.number, msg.sender == automationRegistry2, permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'performPreUpkeep called');

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

49:     function createGauge(address _rewardToken,address _ve,address _token,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, address _genesisManager) external returns (address) {

```

```solidity
File: ./contracts/interfaces/IGaugeFactory.sol

5:     function createGauge(address _rewardToken,address _ve,address _token,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, address _genesisManager) external returns (address) ;

```

```solidity
File: ./contracts/interfaces/IGaugeFactoryCL.sol

7:     function createGauge(address _rewardToken,address _ve,address _token,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, IGaugeManager.FarmingParam memory farmingParam, address bonusRewardToken) external returns (address) ;

```

```solidity
File: ./contracts/interfaces/IGenesisPool.sol

14:     function setGenesisPoolInfo(IGenesisPoolBase.GenesisInfo calldata _genesisInfo, IGenesisPoolBase.TokenAllocation calldata _allocationInfo, address auction) external;

```

```solidity
File: ./contracts/interfaces/IRouter.sol

12:     function addLiquidity(address tokenA,address tokenB,bool stable,uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB, uint liquidity);

```

### <a name="NC-24"></a>[NC-24] `mapping` definitions do not follow the Solidity Style Guide
See the [mappings](https://docs.soliditylang.org/en/latest/style-guide.html#mappings) section of the Solidity Style Guide

*Instances (1)*:
```solidity
File: ./contracts/Pair.sol

25:     mapping(address => mapping (address => uint)) public allowance;

```

### <a name="NC-25"></a>[NC-25] Missing Event for critical parameters change
Events help non-contract tools to track changes, and events prevent users from being surprised by changes.

*Instances (122)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

766:     function setAlgebraFactory(address _algebraFactory) external {
             require(msg.sender == owner, '!owner');
             algebraFactory = IAlgebraCLFactory(_algebraFactory);

771:     function setQuoterV2(address _quoterV2) external {
             require(msg.sender == owner, '!owner');
             quoterV2 = IQuoterV2(_quoterV2);

776:     function setAlgebraPoolAPI(address _algebraPoolAPIStorage) external {
             require(msg.sender == owner, '!owner');
             algebraPoolAPIStorage = IAlgebraPoolAPIStorage(_algebraPoolAPIStorage);

781:     function setPairFactory(address _pairFactory) external {
             require(msg.sender == owner, '!owner');
             pairFactory = IPairFactory(_pairFactory);

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

164:     function setOwner(address _owner) external {
             require(msg.sender == owner, 'not owner');
             require(_owner != address(0), 'zeroAddr');
             owner = _owner;

170:     function setVoter(address _voter) external {
             require(msg.sender == owner, 'not owner');
             require(_voter != address(0), 'zeroAddr');
             voter = IVoter(_voter);
             // update variable depending on voter
             pairFactory = IPairFactory(voter.factories()[0]);
             underlyingToken = IVotingEscrow(voter._ve()).token();

179:     function setGaugeManager(address _gaugeManager) external {
             require(msg.sender == owner, 'not owner');
             require(_gaugeManager != address(0), 'zeroAddr');
             gaugeManager = IGaugeManager(_gaugeManager);

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

418:     function setVoter(address _voter) external  {
             require(msg.sender == owner);
     
             voter = IVoter(_voter);

424:     function setAVM(address _avm) external {
             require(msg.sender == owner && _avm!=address(0));
             avm = IAutoVotingEscrowManager(_avm);

429:     function setGaugeManager(address _gaugeManager) external  {
             require(msg.sender == owner);
     
             gaugeManager = IGaugeManager(_gaugeManager);

435:     function setGaugeFactory(address _gaugeFactory) external  {
             require(msg.sender == owner);
     
             gaugeFactory = IGaugeFactory(_gaugeFactory);

442:     function setRewardDistro(address _rewarddistro) external {
             require(msg.sender == owner);
             
             rewardDisitributor = IRewardsDistributor(_rewarddistro);
             require(rewardDisitributor.voting_escrow() == voter._ve(), 've!=ve');
     
             ve = IVotingEscrow( rewardDisitributor.voting_escrow() );
             underlyingToken = IVotingEscrow(ve).token();

452:     function setPairAPI(address _pairApi) external {
             require(msg.sender == owner);
             
             pairAPI = _pairApi;

459:     function setPairFactory(address _pairFactory) external {
             require(msg.sender == owner);  
             pairFactory = IPairFactory(_pairFactory);

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

455:     function setVoter(address _voter) external  {
             require(msg.sender == owner);
     
             voter = IVoter(_voter);

461:     function setAVM(address _avm) external {
             require(msg.sender == owner && _avm!=address(0));
             avm = IAutoVotingEscrowManager(_avm);

466:     function setGaugeManager(address _gaugeManager) external  {
             require(msg.sender == owner);
             gaugeManager = IGaugeManager(_gaugeManager);

471:     function setGaugeFactory(address _gaugeFactory) external  {
             require(msg.sender == owner);
             gaugeFactory = IGaugeFactory(_gaugeFactory);

476:     function setGaugeFactoryCL(address _gaugeFactoryCL) external  {
             require(msg.sender == owner);
             gaugeFactoryCL = IGaugeFactoryCL(_gaugeFactoryCL);

482:     function setRewardDistro(address _rewarddistro) external {
             require(msg.sender == owner);
             
             rewardDisitributor = IRewardsDistributor(_rewarddistro);
             require(rewardDisitributor.voting_escrow() == voter._ve(), 've!=ve');
     
             ve = IVotingEscrow( rewardDisitributor.voting_escrow() );
             underlyingToken = IVotingEscrow(ve).token();

492:     function setPairAPI(address _pairApi) external {
             require(msg.sender == owner);
             
             pairAPI = _pairApi;

499:     function setPairFactory(address _pairFactory) external {
             require(msg.sender == owner);  
             pairFactory = IPairFactory(_pairFactory);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

262:     function setInternalBribe(address _int) external onlyOwner {
             require(_int >= address(0), "zero");
             internal_bribe = _int;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

21:     function setInternalBribe(address intbribe) external;

49:     function setRegistry(address _registry) external {
            require(owner() == msg.sender, 'not owner');
            permissionsRegistry = _registry;

54:     function setAlgebraPoolApi(address _algebraPoolAPIStorage) external {
            require(owner() == msg.sender, 'not owner');
            algebraPoolAPIStorage = _algebraPoolAPIStorage;

116:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {
             require(_gauges.length == int_bribe.length);
             uint i = 0;
             for ( i ; i < _gauges.length; i++){

128:     function setDibs(address _dibs) external onlyAllowed {
             require(_dibs != address(0));
             dibs = _dibs;

133:     function setReferralFee(uint256 _dibsFee) external onlyAllowed {
             dibsPercentage = _dibsFee;

```

```solidity
File: ./contracts/Black.sol

28:     function setMinter(address _minter) external {
            require(msg.sender == minter);
            minter = _minter;

```

```solidity
File: ./contracts/BlackClaims.sol

247:     function setOwner(address _owner) external onlyOwner {
             require(_owner != address(0));
             owner = _owner;

251:     function setOwner2(address _owner) external onlyOwner {
             require(_owner != address(0));
             secondOwner = _owner;

```

```solidity
File: ./contracts/BlackGovernor.sol

41:     function setTeam(address newTeam) external {
            require(msg.sender == team, "not team");
            team = newTeam;

46:     function setProposalNumerator(uint256 numerator) external {
            require(msg.sender == team, "not team");
            require(numerator <= MAX_PROPOSAL_NUMERATOR, "numerator too high");
            proposalNumerator = numerator;

```

```solidity
File: ./contracts/Bribes.sol

326:     function setVoter(address _Voter) external onlyAllowed {
             require(_Voter != address(0), "ZA");
             voter = _Voter;

332:     function setGaugeManager(address _gaugeManager) external onlyAllowed {
             require(_gaugeManager != address(0));
             gaugeManager = _gaugeManager;

338:     function setMinter(address _minter) external onlyAllowed {
             require(_minter != address(0), "ZA");
             minter = _minter;

344:     function setAVM(address _avm) external onlyAllowed {
             require(_avm!=address(0), "ZA");
             avm = _avm;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

139:     function setPluginForPool(
             address pool,
             address _plugin
         ) external onlyAuthorized {
             poolToPlugin[pool] = _plugin;

151:     function setPlugin(
             address pool,
             address newPluginAddress
         ) external onlyAuthorized {
             IAlgebraCustomPoolEntryPoint(entryPoint).setPlugin(

161:     function setPluginConfig(
             address pool,
             uint8 newConfig
         ) external onlyAuthorized {
             IAlgebraCustomPoolEntryPoint(entryPoint).setPluginConfig(

171:     function setFee(address pool, uint16 newFee) external onlyAuthorized {
             IAlgebraCustomPoolEntryPoint(entryPoint).setFee(pool, newFee);

175:     function setCommunityFee(address pool, uint16 newCommunityFee) external onlyAuthorized {
             IAlgebraCustomVaultPoolEntryPoint(entryPoint).setCommunityFee(pool, newCommunityFee);

179:     function setAlgebraFeeRecipient(address _newRecipient) external onlyOwner {
             require(_newRecipient != address(0), "zero address");
             algebraFeeRecipient = _newRecipient;

184:     function setAlgebraFeeManager(address _newManager) external onlyOwner {
             require(_newManager != address(0), "zero address");
             algebraFeeManager = _newManager;

189:     function setAlgebraFeeShare(uint16 _newFeeShare) external onlyOwner {
             algebraFeeShare = _newFeeShare;

193:     function setAlgebraFarmingProxyPluginFactory(address _algebraFarmingProxyPluginFactory) external onlyOwner {
             require(_algebraFarmingProxyPluginFactory != address(0), "zero address");
             algebraFarmingProxyPluginFactory = _algebraFarmingProxyPluginFactory;

198:     function setAlgebraFactory(address _algebraFactory) external onlyOwner {
             require(_algebraFactory != address(0), "zero address");
             algebraFactory = _algebraFactory;

203:     function setAlgebraPluginFactory(address _algebraPluginFactory) external onlyOwner {
             require(_algebraPluginFactory != address(0), "zero address");
             algebraPluginFactory = _algebraPluginFactory;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

126:     function setDistributionRate(uint256 amount) public onlyOwner {
             updatePool();
             require(IERC20(rewardToken).balanceOf(address(this)) >= amount, "!ENOUGH");
             uint256 notDistributed;
             if (block.timestamp < lastDistributedTime) {
                 uint256 timeLeft = lastDistributedTime - (block.timestamp);
                 notDistributed = rewardPerSecond * (timeLeft);
     
             }
     
             amount = amount + (notDistributed);
             uint256 _rewardPerSecond = amount / (distributePeriod);
             require(IERC20(rewardToken).balanceOf(address(this)) >= amount, "!ENOUGH");
     
             rewardPerSecond = _rewardPerSecond;
             lastDistributedTime = block.timestamp + (distributePeriod);

148:     function updatePool() public returns (PoolInfo memory pool) {
             pool = poolInfo;
             if (block.timestamp > pool.lastRewardTime) {

```

```solidity
File: ./contracts/GaugeManager.sol

120:     function setVoter(address _voter) external GaugeAdmin{
             require(_voter.code.length > 0, "CODELEN");
             require(_voter != address(0), "ZA");
             voter = _voter;

138:     function setBlackGovernor(address _blackGovernor) external GaugeAdmin {
             require(_blackGovernor != address(0), "ZA");
             blackGovernor = _blackGovernor;

469:     function setFarmingParam(address _farmingCenter, address _algebraEternalFarming, address _nfpm) external GaugeAdmin {
             farmingParam = IGaugeManager.FarmingParam(_farmingCenter, _algebraEternalFarming, _nfpm);

474:     function setNewBribes(address _gauge, address _internal, address _external) external GaugeAdmin {
             require(isGauge[_gauge], "!GAUGE");
             require(_gauge.code.length > 0, "CODELEN");
             _setInternalBribe(_gauge, _internal);
             _setExternalBribe(_gauge, _external);

482:     function setInternalBribeFor(address _gauge, address _internal) external GaugeAdmin {
             require(isGauge[_gauge], "!GAUGE");
             _setInternalBribe(_gauge, _internal);

488:     function setExternalBribeFor(address _gauge, address _external) external GaugeAdmin {
             require(isGauge[_gauge], "!GAUGE");
             _setExternalBribe(_gauge, _external);

571:     function setAVM(address _avm) external onlyOwner {
             avm = IAutoVotingEscrowManager(_avm);

```

```solidity
File: ./contracts/GaugeV2.sol

125:     function setDistribution(address _distribution) external onlyOwner {
             require(_distribution != address(0), "ZA");
             require(_distribution != DISTRIBUTION, "SAME_ADDR");
             DISTRIBUTION = _distribution;

132:     function setGaugeRewarder(address _gaugeRewarder) external onlyOwner {
             require(_gaugeRewarder != gaugeRewarder, "SAME_ADDR");
             gaugeRewarder = _gaugeRewarder;

139:     function setInternalBribe(address _int) external onlyOwner {
             require(_int >= address(0), "ZA");
             internal_bribe = _int;

376:     function setGenesisPool(address _genesisPool) external onlyGenesisManager{
             genesisPool = _genesisPool;

438:     function setGenesisPoolManager(address _genesisPoolManager) external onlyOwner {
             genesisManager = _genesisPoolManager;

```

```solidity
File: ./contracts/GenesisPool.sol

201:     function setPoolStatus(PoolStatus status) external onlyManager {
             _setPoolStatus(status);

395:     function setAuction(address _auction) external onlyManagerOrProtocol {
             require(_auction != address(0), "ZA");
             require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED, "INS");
             auction = IAuction(_auction);

401:     function setMaturityTime(uint256 _maturityTime) external onlyManager{
             genesisInfo.maturityTime = _maturityTime;

405:     function setStartTime(uint256 _startTime) external onlyManager{
             _startTime = BlackTimeLibrary.epochStart(_startTime);
             require(_startTime + genesisInfo.duration - BlackTimeLibrary.NO_GENESIS_DEPOSIT_WINDOW > block.timestamp, "TIME");
             genesisInfo.startTime = _startTime;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

25:     function setGenesisPool(address _genesisPool) external;

26:     function setGenesisStatus(address _pair, bool status) external;

269:     function setAuction(address _genesisPool, address _auction) external Governance {
             require(_genesisPool != address(0), "ZA");
             IGenesisPool(_genesisPool).setAuction(_auction);

282:     function setEpochController(address _epochController) external Governance {
             require(_epochController != address(0), "ZA");
             epochController = _epochController;

287:     function setMinimumDuration(uint256 _duration) external Governance {
             MIN_DURATION = _duration;

291:     function setMinimumThreshold(uint256 _threshold) external Governance {
             MIN_THRESHOLD = _threshold;

295:     function setMaturityTime(uint256 _maturityTime) external Governance {
             MATURITY_TIME = _maturityTime;

299:     function setMaturityTime(address _nativeToken, uint256 _maturityTime) external Governance {
             require(_nativeToken != address(0), "ZA");
             address genesisPool = genesisFactory.getGenesisPool(_nativeToken);
             require(genesisPool != address(0), "ZA");
             IGenesisPool(genesisPool).setMaturityTime(_maturityTime);

306:     function setGenesisStartTime(address _nativeToken, uint256 _startTime) external Governance {
             require(_nativeToken != address(0), "ZA");
             address genesisPool = genesisFactory.getGenesisPool(_nativeToken);
             require(genesisPool != address(0), "ZA");
             IGenesisPool(genesisPool).setStartTime(_startTime);

313:     function setRouter (address _router) external onlyOwner {
             require(_router == address(0), "ZA");
             router = _router;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

101:     function setTeam(address _team) external {
             require(msg.sender == team);
             pendingTeam = _team;

111:     function setGaugeManager(address __gaugeManager) external {
             require(__gaugeManager != address(0));
             require(msg.sender == team, "not team");
             _gaugeManager = IGaugeManager(__gaugeManager);

117:     function setTeamRate(uint _teamRate) external {
             require(msg.sender == team, "not team");
             require(_teamRate <= MAX_TEAM_RATE, "rate too high");
             teamRate = _teamRate;

220:     function setRewardDistributor(address _rewardDistro) external {
             require(msg.sender == team);
             _rewards_distributor = IRewardsDistributor(_rewardDistro);

```

```solidity
File: ./contracts/RewardsDistributor.sol

248:     function setDepositor(address _depositor) external {
             require(msg.sender == owner);
             depositor = _depositor;

253:     function setOwner(address _owner) external {
             require(msg.sender == owner);
             owner = _owner;

265:     function setAVM(address _avm) external onlyOwner {
             require(_avm != address(0), "ZA");
             avm = IAutoVotingEscrowManager(_avm);

```

```solidity
File: ./contracts/RouterV2.sol

789:     function setSwapRouter(address _swapRouter) external {
             require(msg.sender == owner);
             swapRouter = _swapRouter;

789:     function setSwapRouter(address _swapRouter) external {
             require(msg.sender == owner);
             swapRouter = _swapRouter;

794:     function setAlgebraFactory(address _algebraFactory) external {
             require(msg.sender == owner);
             algebraFactory = IAlgebraCLFactory(_algebraFactory);

794:     function setAlgebraFactory(address _algebraFactory) external {
             require(msg.sender == owner);
             algebraFactory = IAlgebraCLFactory(_algebraFactory);

799:     function setQuoterV2(address _quoterV2) external {
             require(msg.sender == owner);
             quoterV2 = IQuoterV2(_quoterV2);

799:     function setQuoterV2(address _quoterV2) external {
             require(msg.sender == owner);
             quoterV2 = IQuoterV2(_quoterV2);

804:     function setAlgebraPoolAPI(address _algebraPoolAPIStorage) external {
             require(msg.sender == owner);
             algebraPoolAPIStorage = IAlgebraPoolAPIStorage(_algebraPoolAPIStorage);

804:     function setAlgebraPoolAPI(address _algebraPoolAPIStorage) external {
             require(msg.sender == owner);
             algebraPoolAPIStorage = IAlgebraPoolAPIStorage(_algebraPoolAPIStorage);

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

75:     function setExecutor (address _executor) external onlyOwnerOrExecutor {
            require(_executor!=address(0), "ZA"); 
            executor = _executor;

```

```solidity
File: ./contracts/TokenHandler.sol

150:     function setBucketType(uint256 bucketId, string calldata bucketName) external Governance {
             require(bucketId <= volatilityBucketCount + 1);
             if(bucketId == volatilityBucketCount + 1) volatilityBucketCount++;
             bucketType[bucketId] = bucketName;

```

```solidity
File: ./contracts/VotingEscrow.sol

164:     function setTeam(address _team) external {
             require(msg.sender == team);
             team = _team;

1054:     function setVoter(address _voter) external {
              require(msg.sender == team);
              voter = _voter;

1059:     function setAVM(address _avm) external {
              require(msg.sender == team);
              avm = _avm;

1358:     function setSmNFTBonus(uint _bonus) external {
              require(msg.sender == team);
              require(_bonus <= PRECISISON);
              SMNFT_BONUS = _bonus;

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

12:     function setDistribution(address _distro) external;

15:     function setInternalBribe(address intbribe) external;

16:     function setRewarderPid(uint256 pid) external;

17:     function setGaugeRewarder(address _gr) external;

18:     function setFeeVault(address _feeVault) external;

19:     function setGenesisPoolManager(address _genesisManager) external;

35:     function setRegistry(address _registry) external {
            require(owner() == msg.sender, 'NA');
            permissionsRegistry = _registry;

81:     function setRewarderPid( address[] memory _gauges, uint[] memory _pids) external onlyAllowed {
            require(_gauges.length == _pids.length, "EXACT_LEN");
            uint i = 0;
            for ( i ; i < _gauges.length; i++){

89:     function setGaugeRewarder( address[] memory _gauges, address[] memory _rewarder) external onlyAllowed {
            require(_gauges.length == _rewarder.length, "EXACT_LEN");
            uint i = 0;
            for ( i ; i < _gauges.length; i++){

97:     function setDistribution(address[] memory _gauges,  address distro) external onlyAllowed {
            uint i = 0;
            for ( i ; i < _gauges.length; i++){

105:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {
             require(_gauges.length == int_bribe.length, "EXACT_LEN");
             uint i = 0;
             for ( i ; i < _gauges.length; i++){

113:     function setGenesisManager(address _gauge, address _genesisManager) external onlyAllowed {
             require(_genesisManager != address(0), "ZA");
             require(_gauge != address(0), "ZA");
             IGauge(_gauge).setGenesisPoolManager(_genesisManager);

```

```solidity
File: ./contracts/factories/PairFactory.sol

58:     function setPause(bool _state) external {
            require(msg.sender == owner(), "NA");
            isPaused = _state;

63:     function setFeeManager(address _feeManager) external onlyManager {
            pendingFeeManager = _feeManager;

72:     function setStakingFees(uint256 _newFee) external onlyManager {
            require(_newFee <= 3000, "HFE");
            stakingNFTFee = _newFee;

77:     function setStakingFeeAddress(address _feehandler) external onlyManager {
            require(_feehandler != address(0), "ZA");
            stakingFeeHandler = _feehandler;

82:     function setDibs(address _dibs) external onlyManager {
            require(_dibs != address(0), "ZA");
            dibs = _dibs;

87:     function setReferralFee(uint256 _refFee) external onlyManager {
            MAX_REFERRAL_FEE = _refFee;

91:     function setFee(bool _stable, uint256 _fee) external onlyManager {
            require(_fee <= MAX_FEE, "HFE");
            require(_fee != 0, "ZFE");
            if (_stable) {

101:     function setCustomFees(address _pairAddress, uint256 _fees) external onlyManager {
             require(_fees <= MAX_FEE, "HFE");
             require(isPair[_pairAddress], "INVP");
             customFees[_pairAddress] = _fees;

107:     function setCustomReferralFee(address _pairAddress, uint256 _refFee) external onlyManager {
             require(isPair[_pairAddress], "INVP");
             customReferralFees[_pairAddress] = _refFee;

130:     function setIsGenesis(address _pairAddress, bool status) external onlyManager {
             require(_pairAddress != address(0) && isPair[_pairAddress], "INVP");
             isGenesis[_pairAddress] = status;

153:     function setGenesisManager(address _genesisManager) external onlyManager {
             genesisManager = _genesisManager;

157:     function setGenesisStatus(address _pair, bool status) external {
             require(msg.sender == genesisManager || msg.sender == feeManager,  "NA");
             isGenesis[_pair] = status;

```

### <a name="NC-26"></a>[NC-26] NatSpec is completely non-existent on functions that should have them
Public and external functions that aren't view or pure should have NatSpec comments

*Instances (351)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

183:     function initialize(address _voter, address _router, address _gaugeManager, address _pairFactory, address _algebraFactory, address _quoterV2, address _algebraPoolAPIStorage) initializer public {

446:     function setOwner(address _owner) external {

454:     function setVoter(address _voter) external {

468:     function setGaugeManager(address _gaugeManager) external {

476:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut, address _userAddress) external returns (swapRoute memory swapRoutes){ //TODO:: this was view initially check

766:     function setAlgebraFactory(address _algebraFactory) external {

771:     function setQuoterV2(address _quoterV2) external {

776:     function setAlgebraPoolAPI(address _algebraPoolAPIStorage) external {

781:     function setPairFactory(address _pairFactory) external {

```

```solidity
File: ./contracts/APIHelper/GenesisPoolAPI.sol

40:     function initialize(address _genesisManager, address _genesisPoolFactory) initializer public {

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

36:     function initialize(address _voter, address _gaugeManager) initializer public {

164:     function setOwner(address _owner) external {

170:     function setVoter(address _voter) external {

179:     function setGaugeManager(address _gaugeManager) external {

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

22:     function initialize(address _tokenHandler) initializer public {

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

137:     function initialize(address _votingEscrow, address _gaugeManager) initializer public {

410:     function setOwner(address _owner) external {

418:     function setVoter(address _voter) external  {

424:     function setAVM(address _avm) external {

429:     function setGaugeManager(address _gaugeManager) external  {

435:     function setGaugeFactory(address _gaugeFactory) external  {

442:     function setRewardDistro(address _rewarddistro) external {

452:     function setPairAPI(address _pairApi) external {

459:     function setPairFactory(address _pairFactory) external {

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

144:     function initialize(address _voter, address _rewarddistro, address _gaugeFactory, address _gaugeFactoryCL, address _gaugeManager) initializer public {

447:     function setOwner(address _owner) external {

455:     function setVoter(address _voter) external  {

461:     function setAVM(address _avm) external {

466:     function setGaugeManager(address _gaugeManager) external  {

471:     function setGaugeFactory(address _gaugeFactory) external  {

476:     function setGaugeFactoryCL(address _gaugeFactoryCL) external  {

482:     function setRewardDistro(address _rewarddistro) external {

492:     function setPairAPI(address _pairApi) external {

499:     function setPairFactory(address _pairFactory) external {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

96:     function activateEmergencyMode() external onlyOwner {

102:     function stopEmergencyMode() external onlyOwner {

124:     function deposit(uint256 tokenId) external nonReentrant isNotEmergency {

136:     function withdraw(uint256 tokenId) external nonReentrant isNotEmergency {

146:     function getReward(uint256 tokenId, bool isBonusReward) public nonReentrant onlyDistribution {

157:     function notifyRewardAmount(address token, uint256 reward) external nonReentrant 

206:     function claimFees() external nonReentrant returns (uint256 claimed0, uint256 claimed1) {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

19:     function activateEmergencyMode() external;

20:     function stopEmergencyMode() external;

21:     function setInternalBribe(address intbribe) external;

38:     function initialize(address _permissionRegistry) initializer  public {

49:     function setRegistry(address _registry) external {

54:     function setAlgebraPoolApi(address _algebraPoolAPIStorage) external {

59:     function createGauge(address _rewardToken,address _ve,address _pool,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, 

102:     function activateEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

109:     function stopEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

116:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {

128:     function setDibs(address _dibs) external onlyAllowed {

133:     function setReferralFee(uint256 _dibsFee) external onlyAllowed {

```

```solidity
File: ./contracts/Black.sol

28:     function setMinter(address _minter) external {

34:     function initialMint(address _recipient) external {

40:     function approve(address _spender, uint _value) external returns (bool) {

64:     function transfer(address _to, uint _value) external returns (bool) {

68:     function transferFrom(address _from, address _to, uint _value) external returns (bool) {

76:     function mint(address account, uint amount) external returns (bool) {

82:     function burn(uint256 value) external returns (bool) {

87:     function burnFrom(address _from, uint _value) external returns (bool) {

```

```solidity
File: ./contracts/BlackClaims.sol

247:     function setOwner(address _owner) external onlyOwner {

251:     function setOwner2(address _owner) external onlyOwner {

```

```solidity
File: ./contracts/BlackGovernor.sol

41:     function setTeam(address newTeam) external {

46:     function setProposalNumerator(uint256 numerator) external {

```

```solidity
File: ./contracts/Bribes.sol

351:     function setOwner(address _owner) external onlyAllowed {

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

63:     function addAuthorizedAccount(address account) external onlyOwner {

70:     function removeAuthorizedAccount(address account) external onlyOwner {

77:     function createCustomPool(

139:     function setPluginForPool(

151:     function setPlugin(

161:     function setPluginConfig(

171:     function setFee(address pool, uint16 newFee) external onlyAuthorized {

175:     function setCommunityFee(address pool, uint16 newCommunityFee) external onlyAuthorized {

179:     function setAlgebraFeeRecipient(address _newRecipient) external onlyOwner {

184:     function setAlgebraFeeManager(address _newManager) external onlyOwner {

189:     function setAlgebraFeeShare(uint16 _newFeeShare) external onlyOwner {

193:     function setAlgebraFarmingProxyPluginFactory(address _algebraFarmingProxyPluginFactory) external onlyOwner {

198:     function setAlgebraFactory(address _algebraFactory) external onlyOwner {

203:     function setAlgebraPluginFactory(address _algebraPluginFactory) external onlyOwner {

```

```solidity
File: ./contracts/FixedAuction.sol

14:     function initialize() initializer  public {

37:     function purchased(uint256 amount) external {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

11:     function onReward(uint256 pid, address user, address recipient, uint256 lqdrAmount, uint256 newLpAmount) external;

```

```solidity
File: ./contracts/GaugeManager.sol

80:     function initialize(address __ve, address _tokenHandler, address _gaugeFactory, address _gaugeFactoryCL, 

120:     function setVoter(address _voter) external GaugeAdmin{

138:     function setBlackGovernor(address _blackGovernor) external GaugeAdmin {

170:     function createGaugeWithBonusReward(address _pool, uint256 _gaugeType, address bonusRewardToken) external nonReentrant returns (address _gauge, address _internal_bribe, address _external_bribe)  {

304:     function distributeFees() external nonReentrant {

313:    function distributeFees(uint256 _start, uint256 _finish) external nonReentrant {

352:     function distribute(uint256 _start, uint256 _finish) external nonReentrant {

469:     function setFarmingParam(address _farmingCenter, address _algebraEternalFarming, address _nfpm) external GaugeAdmin {

527:     function fetchInternalBribeFromPool(address _pool) external returns (address) {

531:     function fetchExternalBribeFromPool(address _pool) external returns (address) {

535:     function isGaugeAliveForPool(address _pool) external returns (bool) {

547:     function addGaugeFactory(address _gaugeFactory) external GaugeAdmin {

551:     function replaceGaugeFactory(address _gaugeFactory, uint256 _pos) external GaugeAdmin {

555:     function removeGaugeFactory(uint256 _pos) external GaugeAdmin {

559:     function addPairFactory(address _pairFactory) external GaugeAdmin {

563:     function replacePairFactory(address _pairFactory, uint256 _pos) external GaugeAdmin {

567:     function removePairFactory(uint256 _pos) external GaugeAdmin {

571:     function setAVM(address _avm) external onlyOwner {

575:     function acceptAlgebraFeeChangeProposal (address _pool, uint16 newAlgebraFee) external GaugeAdmin {

```

```solidity
File: ./contracts/GaugeV2.sol

16:     function onReward(

144:     function activateEmergencyMode() external onlyOwner {

150:     function stopEmergencyMode() external onlyOwner {

221:     function depositsForGenesis(address _tokenOwner, uint256 _timestamp, uint256 _totalAmount) external onlyGenesisPool nonReentrant { 

289:     function emergencyWithdraw() external nonReentrant {

302:     function emergencyWithdrawAmount(uint256 _amount) external nonReentrant {

376:     function setGenesisPool(address _genesisPool) external onlyGenesisManager{

407:     function claimFees() external nonReentrant returns (uint256 claimed0, uint256 claimed1) {

438:     function setGenesisPoolManager(address _genesisPoolManager) external onlyOwner {

```

```solidity
File: ./contracts/GenesisPool.sol

73:     function setGenesisPoolInfo(GenesisInfo calldata _genesisInfo, TokenAllocation calldata _allocationInfo, address _auction) external onlyManager(){

91:     function addIncentives(address[] calldata _incentivesToken, uint256[] calldata _incentivesAmount) external {

117:     function rejectPool() external onlyManager {

124:     function approvePool(address _pairAddress) external onlyManager {

131:     function depositToken(address spender, uint256 amount) external onlyManager returns (bool) {

181:     function transferIncentives(address gauge, address external_bribe, address internal_bribe) external onlyManager {

201:     function setPoolStatus(PoolStatus status) external onlyManager {

243:     function launch(address router, uint256 maturityTime) external onlyManager {

272:     function claimNative() external {

284:     function claimDeposits() external {

307:     function claimIncentives() external {

330:     function deductAmount(address account, uint256 gaugeTokenAmount) external onlyGauge {

348:     function deductAllAmount(address account) external onlyGauge {

395:     function setAuction(address _auction) external onlyManagerOrProtocol {

401:     function setMaturityTime(uint256 _maturityTime) external onlyManager{

405:     function setStartTime(uint256 _startTime) external onlyManager{

```

```solidity
File: ./contracts/GenesisPoolManager.sol

24:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

25:     function setGenesisPool(address _genesisPool) external;

26:     function setGenesisStatus(address _pair, bool status) external;

70:     function initialize(address _epochController, address _router, address _permissionRegistory, address _gaugeManager, address _pairFactory, address _genesisFactory, address _auctionFactory, address _tokenHandler) initializer  public {

95:     function whiteListUserAndToken(address tokenOwner, address proposedToken) external Governance {

100:     function depositNativeToken(address nativeToken, uint auctionIndex, GenesisInfo calldata genesisPoolInfo, TokenAllocation calldata allocationInfo) external nonReentrant returns(address genesisPool) {

139:     function rejectGenesisPool(address nativeToken) external Governance {

148:     function approveGenesisPool(address nativeToken) external Governance {

171:     function depositToken(address genesisPool, uint256 amount) external nonReentrant{

187:     function checkAtEpochFlip() external {

227:     function checkBeforeEpochFlip() external {

269:     function setAuction(address _genesisPool, address _auction) external Governance {

282:     function setEpochController(address _epochController) external Governance {

287:     function setMinimumDuration(uint256 _duration) external Governance {

291:     function setMinimumThreshold(uint256 _threshold) external Governance {

295:     function setMaturityTime(uint256 _maturityTime) external Governance {

299:     function setMaturityTime(address _nativeToken, uint256 _maturityTime) external Governance {

306:     function setGenesisStartTime(address _nativeToken, uint256 _startTime) external Governance {

313:     function setRouter (address _router) external onlyOwner {

```

```solidity
File: ./contracts/GlobalRouter.sol

31:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

31:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

35:     function transferFrom(address src, address dst, uint amount) external returns (bool);

35:     function transferFrom(address src, address dst, uint amount) external returns (bool);

36:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

36:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

37:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

37:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

38:     function burn(address to) external returns (uint amount0, uint amount1);

38:     function burn(address to) external returns (uint amount0, uint amount1);

39:     function mint(address to) external returns (uint liquidity);

39:     function mint(address to) external returns (uint liquidity);

46:     function transfer(address recipient, uint amount) external returns (bool);

46:     function transfer(address recipient, uint amount) external returns (bool);

50:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

50:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

51:     function approve(address spender, uint value) external returns (bool);

51:     function approve(address spender, uint value) external returns (bool);

82:     function deposit() external payable;

82:     function deposit() external payable;

83:     function transfer(address to, uint value) external returns (bool);

83:     function transfer(address to, uint value) external returns (bool);

84:     function withdraw(uint) external;

84:     function withdraw(uint) external;

204:     function exactInput(IRouterV3.ExactInputParams memory params)

204:     function exactInput(IRouterV3.ExactInputParams memory params)

```

```solidity
File: ./contracts/MinterUpgradeable.sol

58:     function initialize(    

83:     function _initialize(

101:     function setTeam(address _team) external {

106:     function acceptTeam() external {

111:     function setGaugeManager(address __gaugeManager) external {

117:     function setTeamRate(uint _teamRate) external {

138:     function nudge() external {

159:     function update_period() external returns (uint) {

220:     function setRewardDistributor(address _rewardDistro) external {

```

```solidity
File: ./contracts/Pair.sol

140:     function claimFees() external returns (uint claimed0, uint claimed1) {

156:     function claimStakingFees() external {

335:     function mint(address to) external lock returns (uint liquidity) {

358:     function burn(address to) external lock returns (uint amount0, uint amount1) {

380:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {

417:     function skim(address to) external lock {

424:     function sync() external lock {

507:     function approve(address spender, uint amount) external returns (bool) {

514:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {

539:     function transfer(address dst, uint amount) external returns (bool) {

544:     function transferFrom(address src, address dst, uint amount) external returns (bool) {

```

```solidity
File: ./contracts/PairFees.sol

29:     function claimFeesFor(address recipient, uint amount0, uint amount1) external {

37:     function processStakingFees(uint amount, bool isTokenZero) external {

49:     function withdrawStakingFees(address recipient) external {

```

```solidity
File: ./contracts/PairGenerator.sol

17:     function createPair(address token0, address token1, bool stable) external returns (address pair) {

```

```solidity
File: ./contracts/RewardsDistributor.sol

107:     function checkpoint_token() external {

197:     function claim(uint256 _tokenId) external returns (uint256) {

219:     function claim_many(uint[] memory _tokenIds) external returns (bool) {

248:     function setDepositor(address _depositor) external {

253:     function setOwner(address _owner) external {

258:     function withdrawERC20(address _token) external {

265:     function setAVM(address _avm) external onlyOwner {

```

```solidity
File: ./contracts/RouterV2.sol

28:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

28:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

33:     function transferFrom(address src, address dst, uint amount) external returns (bool);

33:     function transferFrom(address src, address dst, uint amount) external returns (bool);

34:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

34:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

35:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

35:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

36:     function burn(address to) external returns (uint amount0, uint amount1);

36:     function burn(address to) external returns (uint amount0, uint amount1);

37:     function mint(address to) external returns (uint liquidity);

37:     function mint(address to) external returns (uint liquidity);

45:     function transfer(address recipient, uint amount) external returns (bool);

45:     function transfer(address recipient, uint amount) external returns (bool);

49:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

49:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

50:     function approve(address spender, uint value) external returns (bool);

50:     function approve(address spender, uint value) external returns (bool);

82:     function deposit() external payable;

82:     function deposit() external payable;

83:     function transfer(address to, uint value) external returns (bool);

83:     function transfer(address to, uint value) external returns (bool);

84:     function withdraw(uint) external;

84:     function withdraw(uint) external;

258:     function getAmountsOut(uint amountIn, route[] memory routes) public returns (uint[] memory amounts) {

258:     function getAmountsOut(uint amountIn, route[] memory routes) public returns (uint[] memory amounts) {

370:     function addLiquidity(

370:     function addLiquidity(

391:     function addLiquidityETH(

391:     function addLiquidityETH(

419:     function removeLiquidity(

419:     function removeLiquidity(

437:     function removeLiquidityETH(

437:     function removeLiquidityETH(

461:     function removeLiquidityWithPermit(

461:     function removeLiquidityWithPermit(

481:     function removeLiquidityETHWithPermit(

481:     function removeLiquidityETHWithPermit(

532:     function swapExactTokensForTokensSimple(

532:     function swapExactTokensForTokensSimple(

563:     function swapExactTokensForTokens(

563:     function swapExactTokensForTokens(

587:     function swapExactETHForTokens(uint amountOutMin, route[] calldata routes, address to, uint deadline) external payable ensure(deadline) returns (uint[] memory amounts) {

587:     function swapExactETHForTokens(uint amountOutMin, route[] calldata routes, address to, uint deadline) external payable ensure(deadline) returns (uint[] memory amounts) {

603:     function swapExactTokensForETH(uint amountIn, uint amountOutMin, route[] calldata routes, address to, uint deadline)

603:     function swapExactTokensForETH(uint amountIn, uint amountOutMin, route[] calldata routes, address to, uint deadline)

629:     function UNSAFE_swapExactTokensForTokens(

629:     function UNSAFE_swapExactTokensForTokens(

662:     function removeLiquidityETHSupportingFeeOnTransferTokens(

662:     function removeLiquidityETHSupportingFeeOnTransferTokens(

685:     function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(

685:     function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(

726:     function swapExactTokensForTokensSupportingFeeOnTransferTokens(

726:     function swapExactTokensForTokensSupportingFeeOnTransferTokens(

746:     function swapExactETHForTokensSupportingFeeOnTransferTokens(

746:     function swapExactETHForTokensSupportingFeeOnTransferTokens(

768:     function swapExactTokensForETHSupportingFeeOnTransferTokens(

768:     function swapExactTokensForETHSupportingFeeOnTransferTokens(

789:     function setSwapRouter(address _swapRouter) external {

789:     function setSwapRouter(address _swapRouter) external {

794:     function setAlgebraFactory(address _algebraFactory) external {

794:     function setAlgebraFactory(address _algebraFactory) external {

799:     function setQuoterV2(address _quoterV2) external {

799:     function setQuoterV2(address _quoterV2) external {

804:     function setAlgebraPoolAPI(address _algebraPoolAPIStorage) external {

804:     function setAlgebraPoolAPI(address _algebraPoolAPIStorage) external {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

46:     function setTopNPools(address[] memory _poolAddresses) external onlyExecutor {

59:     function setTopN() external onlyAVM {

68:     function setAVM(address _avm) external onlyOwner {

75:     function setExecutor (address _executor) external onlyOwnerOrExecutor {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

45:     function setVoteWeights(uint256[] calldata _weights) external onlyExecutor {

55:     function setAVM(address _avm) external onlyOwner {

61:     function setTopN() external onlyAVM {

66:     function setExecutor(address _executor) external onlyOwnerOrExecutor {

```

```solidity
File: ./contracts/TokenHandler.sol

44:     function setPermissionsRegistry(address _permissionRegistry) external Governance {

59:     function whitelistToken(address _token) external GovernanceOrGenesisManager {

79:     function blacklistToken(address _token) external GovernanceOrGenesisManager {

101:     function whitelistNFT(uint256 _tokenId) external Governance() {

106:     function blacklistNFT(uint256 _tokenId) external Governance() {

111:     function whitelistConnectors(address[] memory _tokens) external Governance {

118:     function whitelistConnector(address _token) external Governance() {

131:     function blacklistConnector(address _token) external Governance() {

150:     function setBucketType(uint256 bucketId, string calldata bucketName) external Governance {

161:     function updateTokenVolatilityBucket(address _token, uint256 bucketId) external Governance {

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

14:     function initialize() initializer public {

```

```solidity
File: ./contracts/VotingEscrow.sol

164:     function setTeam(address _team) external {

169:     function setArtProxy(address _proxy) external {

965:     function lockPermanent(uint _tokenId) external {

987:     function unlockPermanent(uint _tokenId) external {

1054:     function setVoter(address _voter) external {

1059:     function setAVM(address _avm) external {

1064:     function voting(uint _tokenId) external {

1069:     function abstain(uint _tokenId) external {

1074:     function attach(uint _tokenId) external {

1079:     function detach(uint _tokenId) external {

1084:     function merge(uint _from, uint _to) external nonreentrant {

1147:     function split(

1195:     function toggleSplit(address _account, bool _bool) external {

1316:     function delegateBySig(

1358:     function setSmNFTBonus(uint _bonus) external {

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

23:     function initialize(address _auction) public initializer {

30:      function addAuction(address _auction) external onlyManager {

40:     function replaceAuction(address _auction, uint256 _pos) external onlyManager {

53:     function removeAuction(uint256 _pos) external onlyManager {

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

12:     function setDistribution(address _distro) external;

13:     function activateEmergencyMode() external;

14:     function stopEmergencyMode() external;

15:     function setInternalBribe(address intbribe) external;

16:     function setRewarderPid(uint256 pid) external;

17:     function setGaugeRewarder(address _gr) external;

18:     function setFeeVault(address _feeVault) external;

19:     function setGenesisPoolManager(address _genesisManager) external;

30:     function initialize(address _permissionRegistry) initializer  public {

35:     function setRegistry(address _registry) external {

49:     function createGauge(address _rewardToken,address _ve,address _token,address _distribution, address _internal_bribe, address _external_bribe, bool _isPair, address _genesisManager) external returns (address) {

67:     function activateEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

74:     function stopEmergencyMode( address[] memory _gauges) external EmergencyCouncil {

81:     function setRewarderPid( address[] memory _gauges, uint[] memory _pids) external onlyAllowed {

89:     function setGaugeRewarder( address[] memory _gauges, address[] memory _rewarder) external onlyAllowed {

97:     function setDistribution(address[] memory _gauges,  address distro) external onlyAllowed {

105:     function setInternalBribe(address[] memory _gauges,  address[] memory int_bribe) external onlyAllowed {

113:     function setGenesisManager(address _gauge, address _genesisManager) external onlyAllowed {

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

28:     function initialize(address _tokenHandler) public initializer {

35:     function setGenesisManager(address _genesisManager) external onlyManager {

44:     function removeGenesisPool(address nativeToken) external onlyManager {

52:     function removeGenesisPool(address nativeToken, uint256 index) external onlyManager {

56:     function createGenesisPool(address tokenOwner, address nativeToken, address fundingToken) external onlyManager returns (address genesisPool) {

```

```solidity
File: ./contracts/factories/PairFactory.sol

43:     function initialize(address _pairGenerator) public initializer {

58:     function setPause(bool _state) external {

63:     function setFeeManager(address _feeManager) external onlyManager {

67:     function acceptFeeManager() external {

72:     function setStakingFees(uint256 _newFee) external onlyManager {

77:     function setStakingFeeAddress(address _feehandler) external onlyManager {

82:     function setDibs(address _dibs) external onlyManager {

87:     function setReferralFee(uint256 _refFee) external onlyManager {

91:     function setFee(bool _stable, uint256 _fee) external onlyManager {

101:     function setCustomFees(address _pairAddress, uint256 _fees) external onlyManager {

107:     function setCustomReferralFee(address _pairAddress, uint256 _refFee) external onlyManager {

130:     function setIsGenesis(address _pairAddress, bool status) external onlyManager {

139:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair) {

153:     function setGenesisManager(address _genesisManager) external onlyManager {

157:     function setGenesisStatus(address _pair, bool status) external {

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

17:     function addPairFactory(Data storage self, address _pairFactory) external {

26:     function addGaugeFactory(Data storage self, address _gaugeFactory) external {

35:     function replacePairFactory(Data storage self, address _pairFactory, uint256 _pos) external {

47:     function replaceGaugeFactory(Data storage self, address _gaugeFactory, uint256 _pos) external {

59:     function removePairFactory(Data storage self, uint256 _pos) external {

67:     function removeGaugeFactory(Data storage self, uint256 _pos) external {

```

### <a name="NC-27"></a>[NC-27] Incomplete NatSpec: `@param` is missing on actually documented functions
The following functions are missing `@param` NatSpec comments.

*Instances (46)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

261:     ///@notice set new internal bribe contract (where to send fees)
         function setInternalBribe(address _int) external onlyOwner {

```

```solidity
File: ./contracts/BlackClaims.sol

140:     ///@notice Extends a season claim end time, setting its rewards quantity and claim period.
         function extendClaimDuration(
             uint256 claim_duration_

199:     ///@notice Stake tokens claimed.
         ///@dev Callable only on seasons which have been finalized and whose claim duration has not elapsed.
         function claimAndStakeReward(uint percent) external returns (uint)

```

```solidity
File: ./contracts/Bribes.sol

207:     /// @notice User votes deposit
         /// @dev    called on voter.vote() or voter.poke()
         ///         we save into owner "address" and not "tokenID". 
         ///         Owner must reset before transferring token
         function deposit(uint256 amount, uint256 tokenId) external nonReentrant {

256:     /// @notice User votes withdrawal 
         /// @dev    called on voter.reset()
         function withdraw(uint256 amount, uint256 tokenId) external nonReentrant {

271:     /// @notice Claim the TOKENID rewards
         function getReward(uint256 tokenId, address[] memory tokens) external nonReentrant  {

288:     /// @dev Rewards are saved into Current EPOCH mapping. 
         function notifyRewardAmount(address _rewardsToken, uint256 reward) external nonReentrant {

305:     /// @notice Recover some ERC20 from the contract and updated given bribe
         function recoverERC20AndUpdateData(address tokenAddress, uint256 tokenAmount) external onlyAllowed {

316:     /// @notice Recover some ERC20 from the contract.
         /// @dev    Be careful --> if called then getReward() at last epoch will fail because some reward are missing! 
         ///         Think about calling recoverERC20AndUpdateData()
         function emergencyRecoverERC20(address tokenAddress, uint256 tokenAmount) external onlyAllowed {

325:     /// @notice Set a new voter
         function setVoter(address _Voter) external onlyAllowed {

331:         /// @notice Set a new gaugeManager
         function setGaugeManager(address _gaugeManager) external onlyAllowed {

337:     /// @notice Set a new minter
         function setMinter(address _minter) external onlyAllowed {

343:     /// @notice Set a new AVM 
         function setAVM(address _avm) external onlyAllowed {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

125:     /// @notice Set the distribution rate for a given distributePeriod. Rewards needs to be sent before calling setDistributionRate
         function setDistributionRate(uint256 amount) public onlyOwner {

173:     /// @notice Recover any ERC20 available
         function recoverERC20(uint amount, address token) external onlyOwner {

```

```solidity
File: ./contracts/GaugeManager.sol

104:     /// @notice Set a new Bribe Factory
         function setBribeFactory(address _bribeFactory) external GaugeAdmin {

112:     /// @notice Set a new PermissionRegistry
         function setPermissionsRegistry(address _permissionRegistry) external GaugeAdmin {

126:     /// @notice Set a new Minter
         function setGenesisManager(address _genesisManager) external GaugeAdmin {

150:     /// @notice create multiple gauges
         function createGauges(address[] memory _pool, uint256[] memory _gaugeTypes) external nonReentrant returns(address[] memory, address[] memory, address[] memory)  {

165:     /// @notice create a gauge  
         function createGauge(address _pool, uint256 _gaugeType) external nonReentrant returns (address _gauge, address _internal_bribe, address _external_bribe)  {

359:     /// @notice distribute reward onyl for given gauges
         /// @dev    this function is used in case some distribution fails
         function distribute(address[] memory _gauges) external nonReentrant {

473:       /// @notice Set a new bribes for a given gauge
         function setNewBribes(address _gauge, address _internal, address _external) external GaugeAdmin {

481:     /// @notice Set a new internal bribe for a given gauge
         function setInternalBribeFor(address _gauge, address _internal) external GaugeAdmin {

487:     /// @notice Set a new External bribe for a given gauge
         function setExternalBribeFor(address _gauge, address _external) external GaugeAdmin {

505:     /// @notice claim LP gauge rewards
         function claimRewards(address[] memory _gauges) external {

512:     /// @notice claim LP gauge rewards
         function claimRewards(address _gauge, uint256[] memory _nftIds, bool isBonusReward) external {

519:     /// @notice claim bribes rewards given a TokenID
         function claimBribes(address[] memory _bribes, address[][] memory _tokens, uint256 _tokenId) external {

539:         /// @notice Set a new Minter
         function setMinter(address _minter) external GaugeAdmin {

```

```solidity
File: ./contracts/GaugeV2.sol

124:     ///@notice set distribution address (should be GaugeManager)
         function setDistribution(address _distribution) external onlyOwner {

131:     ///@notice set gauge rewarder address
         function setGaugeRewarder(address _gaugeRewarder) external onlyOwner {

138:     ///@notice set new internal bribe contract (where to send fees)
         function setInternalBribe(address _int) external onlyOwner {

241:     ///@notice deposit amount TOKEN
         function deposit(uint256 amount) external {

266:     ///@notice withdraw a certain amount of TOKEN
         function withdraw(uint256 amount) external {

333:     ///@notice User harvest function called from distribution (GaugeManager allows harvest on multiple gauges)
         function getReward(address _user) public nonReentrant onlyDistribution updateReward(_user) {

380:     /// @dev Receive rewards from distribution
     
         function notifyRewardAmount(address token, uint256 reward) external nonReentrant isNotEmergency onlyDistribution updateReward(address(0)) {

```

```solidity
File: ./contracts/GlobalRouter.sol

191:     /// @notice Swap a Token for a Token given the _type of pools
         /// @param  _type       boolean true := sAMM/vAMM pools, false := algebra v3 
         function swapExactTokensForTokens(uint amountIn,uint amountOutMin, ITradeHelper.Route[] calldata routes,address to,uint deadline, bool _type) external ensure(deadline) returns (uint[] memory amounts){

```

```solidity
File: ./contracts/PermissionsRegistry.sol

91:     /// @notice Remove a role
        /// @dev    set last one to i_th position then .pop()
        function removeRole(string memory role) external onlyBlackMultisig {

123:     /// @notice Set a role for an address
         function setRoleFor(address c, string memory role) external onlyBlackMultisig {

139:     /// @notice remove a role from an address
         function removeRoleFrom(address c, string memory role) external onlyBlackMultisig {

```

```solidity
File: ./contracts/TokenHandler.sol

51:     /// @notice Whitelist a token for gauge creation
        function whitelistTokens(address[] memory _tokens) external GovernanceOrGenesisManager {

71:     /// @notice Blacklist a malicious token
        function blacklistTokens(address[] memory _token) external GovernanceOrGenesisManager {

```

```solidity
File: ./contracts/VotingEscrow.sol

860:     /// @notice Deposit `_value` tokens for `msg.sender` and lock for `_lock_duration`
         /// @param _value Amount to deposit
         /// @param _lock_duration Number of seconds to lock tokens for (rounded down to nearest week)
         function create_lock(uint _value, uint _lock_duration, bool isSMNFT) external nonreentrant returns (uint) {

867:     /// @notice Deposit `_value` tokens for `_to` and lock for `_lock_duration`
         /// @param _value Amount to deposit
         /// @param _lock_duration Number of seconds to lock tokens for (rounded down to nearest week)
         /// @param _to Address to deposit
         function create_lock_for(uint _value, uint _lock_duration, address _to, bool isSMNFT) external nonreentrant returns (uint) {

875:     /// @notice Deposit `_value` additional tokens for `_tokenId` without modifying the unlock time
         /// @param _value Amount of tokens to deposit and add to the lock
         function increase_amount(uint _tokenId, uint _value) external nonreentrant {

897:     /// @notice Extend the unlock time for `_tokenId`
         /// @param _lock_duration New number of seconds until tokens unlock
         function increase_unlock_time(uint _tokenId, uint _lock_duration, bool isSMNFT) external nonreentrant {

936:     /// @notice Withdraw all tokens for `_tokenId`
         /// @dev Only possible if the lock has expired
         function withdraw(uint _tokenId) external nonreentrant {

```

### <a name="NC-28"></a>[NC-28] Incomplete NatSpec: `@return` is missing on actually documented functions
The following functions are missing `@return` NatSpec comments.

*Instances (6)*:
```solidity
File: ./contracts/BlackClaims.sol

199:     ///@notice Stake tokens claimed.
         ///@dev Callable only on seasons which have been finalized and whose claim duration has not elapsed.
         function claimAndStakeReward(uint percent) external returns (uint)

```

```solidity
File: ./contracts/GaugeManager.sol

150:     /// @notice create multiple gauges
         function createGauges(address[] memory _pool, uint256[] memory _gaugeTypes) external nonReentrant returns(address[] memory, address[] memory, address[] memory)  {

165:     /// @notice create a gauge  
         function createGauge(address _pool, uint256 _gaugeType) external nonReentrant returns (address _gauge, address _internal_bribe, address _external_bribe)  {

```

```solidity
File: ./contracts/GlobalRouter.sol

191:     /// @notice Swap a Token for a Token given the _type of pools
         /// @param  _type       boolean true := sAMM/vAMM pools, false := algebra v3 
         function swapExactTokensForTokens(uint amountIn,uint amountOutMin, ITradeHelper.Route[] calldata routes,address to,uint deadline, bool _type) external ensure(deadline) returns (uint[] memory amounts){

```

```solidity
File: ./contracts/VotingEscrow.sol

860:     /// @notice Deposit `_value` tokens for `msg.sender` and lock for `_lock_duration`
         /// @param _value Amount to deposit
         /// @param _lock_duration Number of seconds to lock tokens for (rounded down to nearest week)
         function create_lock(uint _value, uint _lock_duration, bool isSMNFT) external nonreentrant returns (uint) {

867:     /// @notice Deposit `_value` tokens for `_to` and lock for `_lock_duration`
         /// @param _value Amount to deposit
         /// @param _lock_duration Number of seconds to lock tokens for (rounded down to nearest week)
         /// @param _to Address to deposit
         function create_lock_for(uint _value, uint _lock_duration, address _to, bool isSMNFT) external nonreentrant returns (uint) {

```

### <a name="NC-29"></a>[NC-29] File's first line is not an SPDX Identifier

*Instances (11)*:
```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

1: 

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

1: 

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/RouterV2.sol

1: /**

```

```solidity
File: ./contracts/interfaces/IAlgebraCustomVaultPoolEntryPoint.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/interfaces/IAlgebraEternalFarmingCustom.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/interfaces/IBribeAPI.sol

1: 

```

```solidity
File: ./contracts/interfaces/IBribeFull.sol

1: 

```

```solidity
File: ./contracts/interfaces/IGaugeCL.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/interfaces/IUniswapRouterETH.sol

1: 

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

1: pragma solidity 0.8.13;

```

### <a name="NC-30"></a>[NC-30] Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor
If a function is supposed to be access-controlled, a `modifier` should be used instead of a `require/if` statement for more readability.

*Instances (136)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

23:         require(msg.sender == manager, "Only manager");

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

41:         require(msg.sender == address(votingEscrow), '!VE');

46:         require(msg.sender == executor, "Only executor");

62:         require(votingEscrow.isApprovedOrOwner(msg.sender, tokenId), "NAO");

93:         require(avm.lockOwner(tokenId) == msg.sender, "Not owner");

148:         require(msg.sender == executor || msg.sender == owner(), "NA");

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

87:         require(msg.sender == DISTRIBUTION, "Caller is not RewardsDistribution contract");

125:         require(msg.sender == nonfungiblePositionManager.ownerOf(tokenId));

137:         require(msg.sender == nonfungiblePositionManager.ownerOf(tokenId));

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

45:         require(owner() == msg.sender || IPermissionsRegistry(permissionsRegistry).hasRole("GAUGE_ADMIN",msg.sender), 'ERR: GAUGE_ADMIN');

50:         require(owner() == msg.sender, 'not owner');

55:         require(owner() == msg.sender, 'not owner');

98:         require( msg.sender == IPermissionsRegistry(permissionsRegistry).emergencyCouncil() );

```

```solidity
File: ./contracts/Black.sol

29:         require(msg.sender == minter);

35:         require(msg.sender == minter && !initialMinted);

77:         require(msg.sender == minter, 'not allowed');

```

```solidity
File: ./contracts/BlackClaims.sol

29:         require(msg.sender == owner || msg.sender == secondOwner, 'not owner');

185:         require(claimed_rewards[msg.sender] == 0, "REWARD CLAIMED");

```

```solidity
File: ./contracts/BlackGovernor.sol

42:         require(msg.sender == team, "not team");

47:         require(msg.sender == team, "not team");

```

```solidity
File: ./contracts/Bribes.sol

213:         require(msg.sender == voter, "NA");

260:         require(msg.sender == voter, "NA");

277:         require(msg.sender == gaugeManager, "NA");

362:         require( (msg.sender == owner || msg.sender == bribeFactory), "NA" );

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

131:         require(msg.sender == entryPoint, "Only entryPoint");

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

118:         require(msg.sender == GAUGE,"!GAUGE");

```

```solidity
File: ./contracts/GaugeManager.sol

95:         require(IPermissionsRegistry(permissionRegistry).hasRole("GAUGE_ADMIN",msg.sender), 'GAUGE_ADMIN');

100:         require(IPermissionsRegistry(permissionRegistry).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE');

291:         require(msg.sender == minter, "NA");

301:         emit NotifyReward(msg.sender, base, amount);

521:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId) || (address(avm)!= address(0) && avm.getOriginalOwner(_tokenId) == msg.sender), "NAO");

```

```solidity
File: ./contracts/GaugeV2.sol

78:         require(msg.sender == DISTRIBUTION, "NA");

83:         require(msg.sender == genesisPool, "NA");

88:         require(msg.sender == genesisManager, "NA");

274:         require(_balanceOf(msg.sender) > 0, "ZV");

275:         require(block.timestamp >= maturityTime[msg.sender], "!MATURE");

296:         if(genesisPool != address(0)) IGenesisPool(genesisPool).deductAllAmount(msg.sender);

315:         if(genesisPool != address(0)) gensisBalance = IGenesisPool(genesisPool).balanceOf(msg.sender);

```

```solidity
File: ./contracts/GenesisPool.sol

45:         require(msg.sender == genesisManager);

50:         require(msg.sender == genesisManager || msg.sender == genesisInfo.tokenOwner);

55:         require(msg.sender == liquidityPoolInfo.gaugeAddress);

255:         if(msg.sender == genesisInfo.tokenOwner){

274:         require(msg.sender == genesisInfo.tokenOwner, "NA");

296:         if(poolStatus == PoolStatus.NOT_QUALIFIED && msg.sender == genesisInfo.tokenOwner){

309:         require(msg.sender == genesisInfo.tokenOwner, "NA");

```

```solidity
File: ./contracts/GenesisPoolManager.sol

60:         require(IPermissionsRegistry(permissionRegistory).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE');

188:         require(epochController == msg.sender, "NA");

228:         require(epochController == msg.sender, "NA");

```

```solidity
File: ./contracts/MinterUpgradeable.sol

88:         require(_initializer == msg.sender);

102:         require(msg.sender == team);

107:         require(msg.sender == pendingTeam, "not pending team");

113:         require(msg.sender == team, "not team");

118:         require(msg.sender == team, "not team");

140:         require (msg.sender == _epochGovernor, "NA");

221:         require(msg.sender == team);

```

```solidity
File: ./contracts/Pair.sol

393:         if (data.length > 0) IPairCallee(to).hook(msg.sender, amount0Out, amount1Out, data); // callback, used for flash loans

```

```solidity
File: ./contracts/PairFees.sol

30:         require(msg.sender == pair);

38:         require(msg.sender == pair);

50:         require(msg.sender == pair);

```

```solidity
File: ./contracts/PermissionsRegistry.sol

71:         require(msg.sender == blackMultisig, "!blackMultisig");

236:         require(msg.sender == emergencyCouncil || msg.sender == blackMultisig, "not allowed");

248:         require(msg.sender == blackTeamMultisig, "not allowed");

259:         require(msg.sender == blackMultisig, "not allowed");

```

```solidity
File: ./contracts/RewardsDistributor.sol

66:         require(msg.sender == owner, 'not owner');

108:         assert(msg.sender == depositor);

249:         require(msg.sender == owner);

254:         require(msg.sender == owner);

259:         require(msg.sender == owner);

```

```solidity
File: ./contracts/RouterV2.sol

148:         assert(msg.sender == address(wETH)); // only accept ETH via fallback from the WETH contract

415:         if (msg.value > amountETH) _safeTransferETH(msg.sender, msg.value - amountETH);

430:         require(IBaseV1Pair(pair).transferFrom(msg.sender, pair, liquidity), "ITFM"); // send liquidity to pair

790:         require(msg.sender == owner);

795:         require(msg.sender == owner);

800:         require(msg.sender == owner);

805:         require(msg.sender == owner);

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

31:         require(msg.sender == address(avm), "Only AVM can call");

36:         require(msg.sender == executor, "Only AVM can call");

41:         require(msg.sender == owner() || msg.sender == executor, "Unauthorized");

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

27:         require(msg.sender == address(avm), "Only AVM can call");

32:         require(msg.sender == executor, "Only executor can call");

37:         require(msg.sender == owner() || msg.sender == executor, "Unauthorized");

```

```solidity
File: ./contracts/Thenian.sol

119:         require(verifyLeaf(proof, msg.sender), "Not whitelisted.");

121:         require(!firstMint[msg.sender], "Already minted!");

134:         require(verifyLeaf(proof, msg.sender), "Not whitelisted.");

136:         require(secondMint[msg.sender].add(amount) <= MAX_PER_MINT, "Can only mint 10 in the second round");

150:         require(balanceOf(msg.sender).add(amount) <= 15, "Can only mint 15 NFTs per wallet");

```

```solidity
File: ./contracts/TokenHandler.sol

31:         require(IPermissionsRegistry(permissionRegistry).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE');

36:         require(IPermissionsRegistry(permissionRegistry).hasRole("GENESIS_MANAGER", msg.sender) || IPermissionsRegistry(permissionRegistry).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE GENESIS_MANAGER');

```

```solidity
File: ./contracts/VoterV3.sol

79:         require(IPermissionsRegistry(permissionRegistry).hasRole("VOTER_ADMIN",msg.sender), 'VOTER_ADMIN');

84:         require(IPermissionsRegistry(permissionRegistry).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE');

89:         require(IPermissionsRegistry(permissionRegistry).hasRole("GENESIS_MANAGER", msg.sender), 'GENESIS_MANAGER');

139:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId), "NAO");

179:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId) || msg.sender == _ve, "NAO||VE");

198:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId), "NAO");

```

```solidity
File: ./contracts/VotingEscrow.sol

165:         require(msg.sender == team);

170:         require(msg.sender == team);

277:         assert(_operator != msg.sender);

541:         require(_isApprovedOrOwner(msg.sender, _tokenId), "NAO");

878:         assert(_isApprovedOrOwner(msg.sender, _tokenId));

900:         assert(_isApprovedOrOwner(msg.sender, _tokenId));

939:         assert(_isApprovedOrOwner(msg.sender, _tokenId));

956:         assert(IERC20(token).transfer(msg.sender, value));

989:         require(_isApprovedOrOwner(msg.sender, _tokenId), "NAO");

1055:         require(msg.sender == team);

1060:         require(msg.sender == team);

1065:         require(msg.sender == voter);

1070:         require(msg.sender == voter, "NA");

1075:         require(msg.sender == voter, "NA");

1080:         require(msg.sender == voter, "NA");

1087:         require(_isApprovedOrOwner(msg.sender, _from) && 

1152:         require(canSplit[msg.sender] || canSplit[address(0)], "!SPLIT");

1154:         require(_isApprovedOrOwner(msg.sender, _from), "NAO");

1196:         require(msg.sender == team);

1312:         if (delegatee == address(0)) delegatee = msg.sender;

1324:         require(delegatee != msg.sender, "NA");

1359:         require(msg.sender == team);

```

```solidity
File: ./contracts/WAVAX.sol

34:         require(balanceOf[msg.sender] >= wad, "WAVAX: insufficient balance");

65:         if (from != msg.sender) {

```

```solidity
File: ./contracts/chainlink/EpochController.sol

45:          require(msg.sender == automationRegistry || permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'cannot execute');

58:          require(msg.sender == automationRegistry2 || permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'cannot execute');

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

16:         require(msg.sender == owner());

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

31:         require(owner() == msg.sender || permissionsRegistry.hasRole("BRIBE_ADMIN",msg.sender), 'BRIBE_ADMIN');

60:         require(msg.sender == gaugeManager || msg.sender == owner(), 'NA');

81:         require(owner() == msg.sender, 'NA');

89:         require(owner() == msg.sender, 'NA');

95:         require(owner() == msg.sender, 'NA');

102:         require(owner() == msg.sender, 'NA');

110:         require(owner() == msg.sender, 'NA');

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

36:         require(owner() == msg.sender, 'NA');

57:         require(owner() == msg.sender || IPermissionsRegistry(permissionsRegistry).hasRole("GAUGE_ADMIN",msg.sender), 'GAUGE_ADMIN');

62:         require( msg.sender == IPermissionsRegistry(permissionsRegistry).emergencyCouncil(), "NA");

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

22:         require(msg.sender == genesisManager);

```

```solidity
File: ./contracts/factories/PairFactory.sol

37:         require(msg.sender == feeManager, "NA");

59:         require(msg.sender == owner(), "NA");

68:         require(msg.sender == pendingFeeManager, "NA");

158:         require(msg.sender == genesisManager || msg.sender == feeManager,  "NA");

```

### <a name="NC-31"></a>[NC-31] Constant state variables defined more than once
Rather than redefining state variable constant, consider using a library to store all constants as this will prevent data redundancy

*Instances (14)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

157:     uint256 public constant MAX_PAIRS = 1000;

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

110:     uint256 constant public MAX_RESULTS = 1000;

111:     uint256 constant public MAX_PAIRS = 30;

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

117:     uint256 constant public MAX_RESULTS = 1000;

118:     uint256 constant public MAX_PAIRS = 30;

```

```solidity
File: ./contracts/Black.sol

8:     string public constant name = "BLACKHOLE";

9:     string public constant symbol = "BLACK";

10:     uint8 public constant decimals = 18;

```

```solidity
File: ./contracts/Pair.sol

18:     uint8 public constant decimals = 18;

33:     uint internal constant MINIMUM_LIQUIDITY = 10**3;

```

```solidity
File: ./contracts/RouterV2.sol

121:     uint internal constant MINIMUM_LIQUIDITY = 10**3;

```

```solidity
File: ./contracts/VotingEscrow.sol

159:     string constant public name = "veBlack";

160:     string constant public symbol = "veBLACK";

162:     uint8 constant public decimals = 18;

```

### <a name="NC-32"></a>[NC-32] Consider using named mappings
Consider moving to solidity version 0.8.18 or later, and using [named mappings](https://ethereum.stackexchange.com/questions/51629/how-to-name-the-arguments-in-mapping/145555#145555) to make it easier to understand the purpose of each mapping

*Instances (103)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

20:     mapping(uint256 => uint256) public tokenIdIndex; // tokenId => index in `locks`

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

26:     mapping(uint256 => uint256) public tokenIdToAVMId;

27:     mapping(uint256 => address) public originalOwner;

```

```solidity
File: ./contracts/Black.sol

13:     mapping(address => uint) public balanceOf;

14:     mapping(address => mapping(address => uint)) public allowance;

```

```solidity
File: ./contracts/BlackClaims.sol

40:     mapping(address => uint256) public season_rewards;

43:     mapping(address => uint256) public claimed_rewards;

```

```solidity
File: ./contracts/Bribes.sol

33:     mapping(address => mapping(uint256 => uint256)) public tokenRewardsPerEpoch; // token -> startTimestamp -> rewardBalance

46:     mapping(uint256 => uint256) public balanceOf;

48:     mapping(address => mapping(uint256 => uint256)) public lastEarn;

50:     mapping(uint256 => mapping(uint256 => Checkpoint)) public checkpoints;

51:     mapping(uint256 => uint256) public numCheckpoints;

53:     mapping(uint256 => SupplyCheckpoint) public supplyCheckpoints;

56:     mapping(address => bool) internal isBribeToken;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

28:     mapping(address => address) public poolToPlugin;

29:     mapping(address => bool) public authorizedAccounts;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

43:     mapping(address => UserInfo) public userInfo;

```

```solidity
File: ./contracts/GaugeManager.sol

42:     mapping(address => uint256) internal supplyIndex;              // gauge    => index

43:     mapping(address => uint256) public claimable;                  // gauge    => claimable $the

44:     mapping(address => address) public gauges;                  // pool     => gauge

45:     mapping(address => uint256) public gaugesDistributionTimestmap;// gauge    => last Distribution Time

46:     mapping(address => address) public poolForGauge;            // gauge    => pool    

47:     mapping(address => address) public internal_bribes;         // gauge    => internal bribe (only fees)

48:     mapping(address => address) public external_bribes;         // gauge    => external bribe (real bribes)

57:     mapping(address => bool) public isGauge;                    // gauge    => boolean [is a gauge?]

58:     mapping(address => bool) public isCLGauge;

59:     mapping(address => bool) public isAlive;                    // gauge    => boolean [is the gauge alive?]

```

```solidity
File: ./contracts/GaugeV2.sol

50:     mapping(address => uint256) public userRewardPerTokenPaid;

51:     mapping(address => uint256) public rewards;

54:     mapping(address => uint256) internal _balances;

55:     mapping(address => uint256) public maturityTime;

```

```solidity
File: ./contracts/GenesisPool.sol

30:     mapping(address => uint256) public incentives;

33:     mapping(address => uint256) public userDeposits;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

51:     mapping(address => mapping(address => bool)) public whiteListedTokensToUser; 

54:     mapping(address => uint256) internal liveNativeTokensIndex;

55:     mapping(address => bool) internal isNativeToken;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

52:     mapping(uint256 => bool) public proposals;

```

```solidity
File: ./contracts/Pair.sol

25:     mapping(address => mapping (address => uint)) public allowance;

26:     mapping(address => uint) public balanceOf;

31:     mapping(address => uint) public nonces;

68:     mapping(address => uint) public supplyIndex0;

69:     mapping(address => uint) public supplyIndex1;

72:     mapping(address => uint) public claimable0;

73:     mapping(address => uint) public claimable1;

```

```solidity
File: ./contracts/PermissionsRegistry.sol

20:     mapping(bytes => mapping(address => bool)) public hasRole;

21:     mapping(bytes => bool) internal _checkRole;

23:     mapping(bytes => address[]) internal _roleToAddresses;

24:     mapping(address => bytes[]) internal _addressToRoles;

```

```solidity
File: ./contracts/RewardsDistributor.sol

37:     mapping(uint => uint) public time_cursor_of;

```

```solidity
File: ./contracts/Thenian.sol

29:     mapping(address => bool) public firstMint;

30:     mapping(address => uint256) public secondMint;

31:     mapping(address => uint256) public originalMinters;

```

```solidity
File: ./contracts/TokenHandler.sol

9:     mapping(address => bool) public isWhitelisted;             

10:     mapping(uint256 => bool) public isWhitelistedNFT;

11:     mapping(address => bool) public isConnector;

12:     mapping(address => uint256) public tokenVolatilityBucket; // Mapping of token to volatility bucket ID

13:     mapping(uint256 => string) public bucketType; // Mapping of token to volatility bucket ID

```

```solidity
File: ./contracts/VoterV3.sol

35:     mapping(uint256 => mapping(address => uint256)) public votes;  // nft      => pool     => votes

36:     mapping(uint256 => address[]) public poolVote;                 // nft      => pools

38:     mapping(address => uint256) public weights;

40:     mapping(uint256 => uint256) public usedWeights;

42:     mapping(uint256 => uint256) public lastVoted;                     // nft      => timestamp of last vote (this is shifted to thursday of that epoc)

43:     mapping(uint256 => uint256) public lastVotedTimestamp;            // nft      => timestamp of last vote

```

```solidity
File: ./contracts/VotingEscrow.sol

89:     mapping(bytes4 => bool) internal supportedInterfaces;

189:     mapping(uint => address) internal idToOwner;

192:     mapping(address => uint) internal ownerToNFTokenCount;

224:     mapping(uint => address) internal idToApprovals;

227:     mapping(address => mapping(address => bool)) internal ownerToOperators;

229:     mapping(uint => uint) public ownership_change;

447:     mapping(address => mapping(uint => uint)) internal ownerToNFTokenIdList;

450:     mapping(uint => uint) internal tokenToOwnerIndex;

560:     mapping(uint => IVotingEscrow.LockedBalance) public locked;

564:     mapping(uint => int128) public slope_changes; // time -> signed slope change

566:     mapping(address => bool) public canSplit;

1051:     mapping(uint => uint) public attachments;

1052:     mapping(uint => bool) public voted;

1211:     mapping(address => address) private _delegates;

1214:     mapping(address => uint) public nonces;

```

```solidity
File: ./contracts/WAVAX.sol

14:     mapping(address => uint256)                   public balanceOf;

15:     mapping(address => mapping(address => uint256)) public allowance;

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

10:     mapping(address => bool) public isAuction;

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

15:     mapping(address => address[]) public genesisPools;

```

```solidity
File: ./contracts/factories/PairFactory.sol

27:     mapping(address => mapping(address => mapping(bool => address))) public getPair;

29:     mapping(address => bool) public isPair; 

30:     mapping(address => uint256) public customFees; 

31:     mapping(address => uint256) public customReferralFees; 

32:     mapping(address => bool) public isGenesis; 

```

```solidity
File: ./contracts/governance/Governor.sol

55:     mapping(uint256 => ProposalCore) public _proposals;

640:         mapping(address => bool) hasVoted;

643:     mapping(uint256 => ProposalVote) private _proposalVotes;

```

```solidity
File: ./contracts/governance/L2Governor.sol

51:     mapping(uint256 => ProposalCore) private _proposals;

```

```solidity
File: ./contracts/governance/L2GovernorCountingSimple.sol

29:         mapping(address => bool) hasVoted;

32:     mapping(uint256 => ProposalVote) private _proposalVotes;

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

7:         mapping(address => bool) isFactory;

8:         mapping(address => bool) isGaugeFactory;

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

10:         mapping(uint => IVotingEscrow.Point) point_history;

11:         mapping(uint => uint) user_point_epoch;

12:         mapping(uint => IVotingEscrow.Point[1000000000]) user_point_history; // user -> Point[user_epoch]

134:         mapping(uint => int128) storage slope_changes) public view returns (uint) {

188:         mapping(uint => int128) storage slope_changes) internal view returns (uint) {

237:         mapping(uint => int128) storage slope_changes,

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

16:         mapping(address => mapping(uint32 => Checkpoint)) checkpoints;

18:         mapping(address => uint32) numCheckpoints;

```

### <a name="NC-33"></a>[NC-33] `address`s shouldn't be hard-coded
It is often better to declare `address`es as `immutable`, and assign them via constructor arguments. This allows the code to remain the same across deployments on different networks, and avoids recompilation when addresses need to change.

*Instances (3)*:
```solidity
File: ./contracts/MinterUpgradeable.sol

80:         burnTokenAddress=0x000000000000000000000000000000000000dEaD;

```

```solidity
File: ./contracts/Thenian.sol

27:     address public multiSig = 0x7d70ee3774325C51e021Af1f7987C214d2CAA184;

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

48:         defaultRewardToken.push(address(0x68b8220c62513493777563943037Ea919ba0b24C)); // BLACK address

```

### <a name="NC-34"></a>[NC-34] Numeric values having to do with time should use time units for readability
There are [units](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#time-units) for seconds, minutes, hours, days, and weeks, and since they're defined, they should be used

*Instances (1)*:
```solidity
File: ./contracts/Pair.sol

48:     uint constant periodSize = 1800;

```

### <a name="NC-35"></a>[NC-35] Variable names that consist of all capital letters should be reserved for `constant`/`immutable` variables
If the variable needs to be different based on which class it comes from, a `view`/`pure` *function* should be used instead (e.g. like [this](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/76eee35971c2541585e05cbf258510dda7b2fbc6/contracts/token/ERC20/extensions/draft-IERC20Permit.sol#L59)).

*Instances (5)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/interfaces/IAlgebraCustomVaultPoolEntryPoint.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/interfaces/IAlgebraEternalFarmingCustom.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/interfaces/IGaugeCL.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

1: pragma solidity 0.8.13;

```

### <a name="NC-36"></a>[NC-36] Adding a `return` statement when the function defines a named return variable, is redundant

*Instances (59)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

203:     function getClaimable(address _account, address _pair) internal view returns(uint claimable0, uint claimable1){
     
             if(address(_account) == address(0)){
                 return (0,0);
             }
             
             Pair pair = Pair(_pair);
     
             uint _supplied = pair.balanceOf(_account); // get LP balance of `_user`
             uint _claim0 = pair.claimable0(_account);
             uint _claim1 = pair.claimable1(_account);
             if (_supplied > 0) {
                 uint _supplyIndex0 = pair.supplyIndex0(_account); // get last adjusted index0 for recipient
                 uint _supplyIndex1 = pair.supplyIndex1(_account);
                 uint _index0 = pair.index0(); // get global index0 for accumulated fees
                 uint _index1 = pair.index1();
                 uint _delta0 = _index0 - _supplyIndex0; // see if there is any difference that need to be accrued
                 uint _delta1 = _index1 - _supplyIndex1;
                 if (_delta0 > 0) {
                     _claim0 += _supplied * _delta0 / 1e18; // add accrued difference for each supplied token
                 }
                 if (_delta1 > 0) {
                     _claim1 += _supplied * _delta1 / 1e18;
                 }
             } 
     
             return (_claim0, _claim1);

203:     function getClaimable(address _account, address _pair) internal view returns(uint claimable0, uint claimable1){
     
             if(address(_account) == address(0)){
                 return (0,0);

276:     function getPair(address _pair, address _account) external view returns(pairInfo memory _pairInfo){
             pairInfo memory pairInformation =  _pairAddressToInfo(_pair, _account);
             uint claim0;
             uint claim1;
             uint stakedToken0Fees;     
             uint stakedToken1Fees; 
     
             (claim0, claim1) = getClaimable(_account, _pair);
             pairInformation.claimable0 = claim0;
             pairInformation.claimable1 = claim1;
     
             (stakedToken0Fees, stakedToken1Fees) = getClaimable(pairInformation.gauge, _pair);
             pairInformation.staked_token0_fees = stakedToken0Fees;
             pairInformation.staked_token1_fees = stakedToken1Fees;  
     
             Bribes[] memory bribes;
             bribes = _getBribes(_pair);
             pairInformation.external_bribes = bribes[0];
             pairInformation.internal_bribes = bribes[1];
             return pairInformation;

435:     function getCurrentFees(address _pair, address token_0, address token_1)  internal view returns(uint _tokenFees0, uint _tokenFees1, address _feesAddress) {
             Pair pair = Pair(_pair);  
     
             address feesAddress = pair.fees();
             uint tokenFees0 = IERC20(token_0).balanceOf(feesAddress);
             uint tokenFees1 = IERC20(token_1).balanceOf(feesAddress);
     
             return (tokenFees0, tokenFees1, feesAddress);

617:     function _getPoolSwapRoutesFromThreeHop(SwapRouteHelperData memory swapRouteFromHopping, uint amountIn, address tokenIn, address tokenOut, address _userAddress) internal returns (swapRoute memory swapRoutes){
             uint256[] memory amounts;
             uint160[] memory sqrtPriceAfter;
             if(swapRouteFromHopping.isBasicMid){
                 if(!pairFactory.isPair(swapRouteFromHopping._pairMid)) return swapRoutes;
                 if(pairFactory.isGenesis(swapRouteFromHopping._pairMid)) return swapRoutes;
             }
             
             
             (amounts, sqrtPriceAfter) = _getAmountViaHopping(amountIn, tokenIn, swapRouteFromHopping.otherToken1, swapRouteFromHopping.otherToken2, tokenOut, swapRouteFromHopping);
             address receiver;
             if(amounts[0] > 0 && amounts[1] > 0 && amounts[2] > 0 && amounts[2] > swapRouteFromHopping.minAmount){
                 swapRouteFromHopping.minAmount = amounts[2];
                 swapRouteFromHopping.foundPath = true;
                 swapRoutes.routes = new route[](3);
     
                 receiver = swapRouteFromHopping.isBasicMid ? swapRouteFromHopping._pairMid: routerV2;
     
                 swapRoutes.routes[0] = _createRoute(swapRouteFromHopping._pair1, tokenIn, swapRouteFromHopping.otherToken1, swapRouteFromHopping.isBasic1, amounts[0], receiver, sqrtPriceAfter[0]);
     
                 receiver = swapRouteFromHopping.isBasic2 ? swapRouteFromHopping._pair2: routerV2;
     
                 swapRoutes.routes[1] = _createRoute(swapRouteFromHopping._pairMid, swapRouteFromHopping.otherToken1, swapRouteFromHopping.otherToken2, swapRouteFromHopping.isBasicMid, amounts[1], receiver, sqrtPriceAfter[1]);
     
                 swapRoutes.routes[2] = _createRoute(swapRouteFromHopping._pair2, swapRouteFromHopping.otherToken2, tokenOut, swapRouteFromHopping.isBasic2, amounts[2], _userAddress, sqrtPriceAfter[2]);
     
                 swapRoutes.amountOut = amounts[2];
                 swapRoutes.hops = 3;
             }
             return swapRoutes;

617:     function _getPoolSwapRoutesFromThreeHop(SwapRouteHelperData memory swapRouteFromHopping, uint amountIn, address tokenIn, address tokenOut, address _userAddress) internal returns (swapRoute memory swapRoutes){
             uint256[] memory amounts;
             uint160[] memory sqrtPriceAfter;
             if(swapRouteFromHopping.isBasicMid){
                 if(!pairFactory.isPair(swapRouteFromHopping._pairMid)) return swapRoutes;

617:     function _getPoolSwapRoutesFromThreeHop(SwapRouteHelperData memory swapRouteFromHopping, uint amountIn, address tokenIn, address tokenOut, address _userAddress) internal returns (swapRoute memory swapRoutes){
             uint256[] memory amounts;
             uint160[] memory sqrtPriceAfter;
             if(swapRouteFromHopping.isBasicMid){
                 if(!pairFactory.isPair(swapRouteFromHopping._pairMid)) return swapRoutes;
                 if(pairFactory.isGenesis(swapRouteFromHopping._pairMid)) return swapRoutes;

649:     function _getSwapRoutesFromTwoHop(SwapRouteHelperData memory swapRouteFromHopping, uint amountIn, address tokenIn, address tokenOut, address _userAddress) internal returns (swapRoute memory swapRoutes){
             (uint256[] memory amounts, uint160[] memory sqrtPriceAfter) = _getAmountViaHopping(amountIn, tokenIn, swapRouteFromHopping.otherToken1, tokenOut, swapRouteFromHopping);
             address receiver;
             if(amounts[0] > 0 && amounts[1] > 0 && amounts[1] > swapRouteFromHopping.minAmount){
                 swapRouteFromHopping.minAmount = amounts[1];
                 swapRouteFromHopping.foundPath = true;
                 swapRoutes.routes = new route[](2);
                 receiver = swapRouteFromHopping.isBasic2 ? swapRouteFromHopping._pair2: routerV2;
                 swapRoutes.routes[0] = _createRoute(swapRouteFromHopping._pair1, tokenIn, swapRouteFromHopping.otherToken1, swapRouteFromHopping.isBasic1, amounts[0], receiver, sqrtPriceAfter[0]);
                 swapRoutes.routes[1] = _createRoute(swapRouteFromHopping._pair2, swapRouteFromHopping.otherToken1, tokenOut, swapRouteFromHopping.isBasic2, amounts[1], _userAddress, sqrtPriceAfter[1]);
                 swapRoutes.amountOut = amounts[1];
                 swapRoutes.hops = 2;
             }
             return swapRoutes;

666:     function _getAmountViaHopping(uint amountIn, address tokenIn, address tokenMid, address tokenOut, SwapRouteHelperData memory swapRouteHelperData) internal returns (uint256[] memory amounts, uint160[] memory sqrtPriceAfter){
     
             amounts = new uint256[](2);
             sqrtPriceAfter = new uint160[](3);
     
             (amounts[0], sqrtPriceAfter[0]) = _getAmountOut(amountIn, tokenIn, tokenMid, swapRouteHelperData.isBasic1, swapRouteHelperData._pair1);
             (amounts[1], sqrtPriceAfter[1]) = _getAmountOut(amounts[0], tokenMid, tokenOut, swapRouteHelperData.isBasic2, swapRouteHelperData._pair2);
     
             return (amounts, sqrtPriceAfter);

677:     function _getAmountViaHopping(uint amountIn, address tokenIn, address tokenMid1, address tokenMid2, address tokenOut, SwapRouteHelperData memory swapRouteHelperData) internal returns (uint256[] memory amounts, uint160[] memory sqrtPriceAfter){
     
             amounts = new uint256[](3);
             sqrtPriceAfter = new uint160[](3);
     
             (amounts[0], sqrtPriceAfter[0]) = _getAmountOut(amountIn, tokenIn, tokenMid1, swapRouteHelperData.isBasic1, swapRouteHelperData._pair1);
             (amounts[1], sqrtPriceAfter[1]) = _getAmountOut(amounts[0], tokenMid1, tokenMid2, swapRouteHelperData.isBasicMid, swapRouteHelperData._pairMid);
             (amounts[2], sqrtPriceAfter[2]) = _getAmountOut(amounts[1], tokenMid2, tokenOut, swapRouteHelperData.isBasic2, swapRouteHelperData._pair2);
     
             return (amounts, sqrtPriceAfter);

```

```solidity
File: ./contracts/APIHelper/GenesisPoolAPI.sol

48:     function getGenesisPoolFromNative(address _user, address nativeToken) external view returns (GenesisData memory genesisData){
            address genesisPool = genesisPoolFactory.getGenesisPool(nativeToken);
            if(genesisPool == address(0)) return genesisData;
    
            return _getGenesisPool(_user, genesisPool);

48:     function getGenesisPoolFromNative(address _user, address nativeToken) external view returns (GenesisData memory genesisData){
            address genesisPool = genesisPoolFactory.getGenesisPool(nativeToken);
            if(genesisPool == address(0)) return genesisData;

55:     function getGenesisPool(address _user, address genesisPool) external view returns (GenesisData memory genesisData){
            return _getGenesisPool(_user, genesisPool);

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

26:     function getWhiteListedTokens() external view returns (Token[] memory tokens) {
            address[] memory whitelistedTokens = tokenHandler.whiteListedTokens();
            uint i;
            uint length = whitelistedTokens.length;
            tokens = new Token[](length);
    
            for(i = 0; i < length; i++){
                tokens[i].tokenAddress = whitelistedTokens[i];
                tokens[i].decimal =  IERC20(whitelistedTokens[i]).decimals();
                tokens[i].ticker = IERC20(whitelistedTokens[i]).symbol();
            }
    
            return tokens;

41:     function getConnectorTokens() external view returns (Token[] memory tokens) {
            address[] memory connectorTokens = tokenHandler.connectorTokens();
            uint i;
            uint length = connectorTokens.length;
            tokens = new Token[](length);
    
            for(i = 0; i < length; i++){
                tokens[i].tokenAddress = connectorTokens[i];
                tokens[i].decimal =  IERC20(connectorTokens[i]).decimals();
                tokens[i].ticker = IERC20(connectorTokens[i]).symbol();
            }
    
            return tokens;

56:     function getTokenBalances(address _user, address[] memory tokenAddresses) external view returns (uint256[] memory amounts){
            uint256 length = tokenAddresses.length;
            amounts = new uint256[](length);
    
            if(_user == address(0)) return amounts;
            
            uint256 i;
            for(i = 0; i < length; i++){
                amounts[i] = tokenAddresses[i] != address(0) ? IERC20(tokenAddresses[i]).balanceOf(_user) : 0;
            }
            return amounts;

56:     function getTokenBalances(address _user, address[] memory tokenAddresses) external view returns (uint256[] memory amounts){
            uint256 length = tokenAddresses.length;
            amounts = new uint256[](length);
    
            if(_user == address(0)) return amounts;

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

29:     function sortTokens(address tokenA, address tokenB) external pure returns (address token0, address token1) {
            return _sortTokens(tokenA, tokenB);

44:     function pairFor(address tokenA, address tokenB, bool stable) external view returns (address pair) {
            return _pairFor(tokenA, tokenB, stable);

56:     function getAmountOutStable(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount) {
            address pair = _pairFor(tokenIn, tokenOut, true);
            return (PairFactory(factory).isPair(pair)) ? Pair(pair).getAmountOut(amountIn, tokenIn) : 0;

61:     function getAmountOutVolatile(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount) {
            address pair = _pairFor(tokenIn, tokenOut, false);
            return (PairFactory(factory).isPair(pair)) ? Pair(pair).getAmountOut(amountIn, tokenIn) : 0;

66:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount, bool stable) {
            uint amountStable = getAmountOutStable(amountIn, tokenIn, tokenOut);
            uint amountVolatile = getAmountOutVolatile(amountIn, tokenIn, tokenOut);
            return amountStable > amountVolatile ? (amountStable, true) : (amountVolatile, false);

145:     function getAmountIn(uint amountOut, address tokenIn, address tokenOut) public view returns (uint amount, bool stable) {
             uint amountStable = getAmountInStable(amountOut, tokenIn, tokenOut);
             uint amountVolatile = getAmountInVolatile(amountOut, tokenIn, tokenOut);
             return amountStable < amountVolatile ? (amountStable, true) : (amountVolatile, false);

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

165:     function getNFTFromAddress(address _user) external view returns(veNFT[] memory venft){
     
             uint256 totNFTs = (_user != address(0)) ? ve.balanceOf(_user) : 0;
     
             venft = new veNFT[](totNFTs);
             uint256 i=0;
             uint256 _id;
     
             for(i; i < totNFTs; i++){
                 _id = ve.tokenOfOwnerByIndex(_user, i);
                 if(_id != 0){
                     venft[i] = _getNFTFromId(_id, _user);
                 }
             }
     
             return venft;

208:     function _getNFTFromId(uint256 id, address _owner) internal view returns(veNFT memory venft){
     
             if(_owner == address(0)){
                 return venft;

275:     function getAllPairRewards(address _user, uint _amounts, uint _offset) external view returns(uint totNFTs, bool hasNext, LockReward[] memory _lockReward){
             
             if(_user == address(0)){
     
                 return (totNFTs, hasNext, _lockReward);

329:     function _pairReward(address _pair, uint256 id,  address _gauge) internal view returns (Reward[] memory _reward, bool) {
     
             if (_gauge == address(0)) {
                 return (_reward, false);
             }
     
             address external_bribe = gaugeManager.external_bribes(_gauge);
             address internal_bribe = gaugeManager.internal_bribes(_gauge);
     
             uint256 totBribeTokens = (external_bribe == address(0)) ? 0 : IBribeAPI(external_bribe).rewardsListLength();
             _reward = new Reward[](2 + totBribeTokens);
     
             // Fetch pair contract once
             IPair ipair = IPair(_pair);
             (address t0, address t1) = (ipair.token0(), ipair.token1());
     
             InternalBribeInputs memory internal_bribes_input = InternalBribeInputs({
                 id: id,
                 t0: t0,
                 t1: t1,
                 bribe_address: internal_bribe,
                 pair: _pair
             });
     
             ExternalBribeInputs memory external_bribes_input = ExternalBribeInputs({
                 id: id,
                 bribe_address: external_bribe,
                 tokens: totBribeTokens,
                 pair: _pair
             });
     
             // Fetch earned fees
             bool internalRewards = _addInternalBribeRewards(_reward, internal_bribes_input);
             bool externalRewards = _addExternalBribeRewards(_reward, external_bribes_input);
     
             return (_reward, internalRewards || externalRewards);

329:     function _pairReward(address _pair, uint256 id,  address _gauge) internal view returns (Reward[] memory _reward, bool) {
     
             if (_gauge == address(0)) {
                 return (_reward, false);

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

181:     function getNFTFromAddress(address _user) external view returns(veNFT[] memory venft){
     
             uint256 totNFTs = (_user != address(0)) ? ve.balanceOf(_user) : 0;
     
             venft = new veNFT[](totNFTs);
             uint256 i=0;
             uint256 _id;
     
             for(i; i < totNFTs; i++){
                 _id = ve.tokenOfOwnerByIndex(_user, i);
                 if(_id != 0){
                     venft[i] = _getNFTFromId(_id, _user);
                 }
             }
     
             return venft;

224:     function _getNFTFromId(uint256 id, address _owner) internal view returns(veNFT memory venft){
     
             if(_owner == address(0)){
                 return venft;

291:     function getAllPairRewards(address _user, uint _amounts, uint _offset) external view returns(uint totNFTs, bool hasNext, LockReward[] memory _lockReward){
             
             if(_user == address(0)){
     
                 return (totNFTs, hasNext, _lockReward);

366:     function _pairReward(address _pair, uint256 id,  address _gauge) internal view returns (Reward[] memory _reward, bool) {
     
             if (_gauge == address(0)) {
                 return (_reward, false);
             }
     
             address external_bribe = gaugeManager.external_bribes(_gauge);
             address internal_bribe = gaugeManager.internal_bribes(_gauge);
     
             uint256 totBribeTokens = (external_bribe == address(0)) ? 0 : IBribeAPI(external_bribe).rewardsListLength();
             _reward = new Reward[](2 + totBribeTokens);
     
             // Fetch pair contract once
             IPair ipair = IPair(_pair);
             (address t0, address t1) = (ipair.token0(), ipair.token1());
     
             InternalBribeInputs memory internal_bribes_input = InternalBribeInputs({
                 id: id,
                 t0: t0,
                 t1: t1,
                 bribe_address: internal_bribe,
                 pair: _pair
             });
     
             ExternalBribeInputs memory external_bribes_input = ExternalBribeInputs({
                 id: id,
                 bribe_address: external_bribe,
                 tokens: totBribeTokens,
                 pair: _pair
             });
     
             // Fetch earned fees
             bool internalRewards = _addInternalBribeRewards(_reward, internal_bribes_input);
             bool externalRewards = _addExternalBribeRewards(_reward, external_bribes_input);
     
             return (_reward, internalRewards || externalRewards);

366:     function _pairReward(address _pair, uint256 id,  address _gauge) internal view returns (Reward[] memory _reward, bool) {
     
             if (_gauge == address(0)) {
                 return (_reward, false);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

115:     function earned(uint256 tokenId) external view returns (uint256 reward, uint256 bonusReward) {
     
             (IERC20Minimal rewardTokenAdd, IERC20Minimal bonusRewardTokenAdd, IAlgebraPool pool, uint256 nonce) = 
                     algebraEternalFarming.incentiveKeys(poolAddress);
             IncentiveKey memory incentivekey = IncentiveKey(rewardTokenAdd, bonusRewardTokenAdd, pool, nonce);
             (reward, bonusReward) = IAlgebraEternalFarmingCustom(address(algebraEternalFarming)).getRewardInfo(incentivekey, tokenId);
             return (reward, bonusReward);

206:     function claimFees() external nonReentrant returns (uint256 claimed0, uint256 claimed1) {
             return _claimFees();

210:     function _claimFees() internal returns (uint256 claimed0, uint256 claimed1) {
             if (!isForPair) {
                 return (0, 0);

```

```solidity
File: ./contracts/BlackGovernor.sol

67:     function cancel(
            address[] memory targets,
            uint256[] memory values,
            bytes[] memory calldatas,
            bytes32 epochTimeHash
        ) public virtual override returns (uint256 proposalId) {
            address proposer = _msgSender();
            uint256 _proposalId = hashProposal(
                targets,
                values,
                calldatas,
                epochTimeHash
            );
            require(
                state(_proposalId) == ProposalState.Pending,
                "Governor: too late to cancel"
            );
            require(
                proposer == _proposals[_proposalId].proposer,
                "Governor: only proposer can cancel"
            );
            return _cancel(targets, values, calldatas, epochTimeHash);

```

```solidity
File: ./contracts/GaugeV2.sol

407:     function claimFees() external nonReentrant returns (uint256 claimed0, uint256 claimed1) {
             return _claimFees();

411:      function _claimFees() internal returns (uint256 claimed0, uint256 claimed1) {
             if (!isForPair) {
                 return (0, 0);

```

```solidity
File: ./contracts/GlobalRouter.sol

251:     function getAmountOutStable(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount){
             return tradeHelper.getAmountOutStable(amountIn, tokenIn, tokenOut);

254:     function getAmountOutVolatile(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount){
             return tradeHelper.getAmountOutVolatile(amountIn, tokenIn, tokenOut);

257:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount, bool stable){
             return tradeHelper.getAmountOut(amountIn, tokenIn, tokenOut);

260:     function getAmountsOut(uint amountIn, ITradeHelper.Route[] memory routes) external view returns (uint[] memory amounts){
             return tradeHelper.getAmountsOut(amountIn, routes);

263:     function getAmountInStable(uint amountOut, address tokenIn, address tokenOut) external view returns (uint amountIn){
             return tradeHelper.getAmountInStable(amountOut, tokenIn, tokenOut);

266:     function pairFor(address tokenA, address tokenB, bool stable) external view returns (address pair){
             return tradeHelper.pairFor(tokenA, tokenB, stable);

269:     function sortTokens(address tokenA, address tokenB) external view returns (address token0, address token1){
             return tradeHelper.sortTokens(tokenA, tokenB);

```

```solidity
File: ./contracts/Pair.sol

127:     function metadata() external view returns (uint dec0, uint dec1, uint r0, uint r1, bool st, address t0, address t1) {
             return (decimals0, decimals1, reserve0, reserve1, stable, token0, token1);

297:     function quote(address tokenIn, uint amountIn, uint granularity) external view returns (uint amountOut) {
             uint [] memory _prices = sample(tokenIn, amountIn, granularity, 1);
             uint priceAverageCumulative;
             for (uint i = 0; i < _prices.length; i++) {
                 priceAverageCumulative += _prices[i];
             }
             return priceAverageCumulative / granularity;

```

```solidity
File: ./contracts/PermissionsRegistry.sol

194:      /// @notice Return addresses for a given role
         function roleToAddresses(string memory role) external view returns(address[] memory _addresses){
             return _roleToAddresses[bytes(role)];

```

```solidity
File: ./contracts/RouterV2.sol

169:     function pairFor(address tokenA, address tokenB, bool stable) public view returns (address pair) {
             (address token0, address token1) = sortTokens(tokenA, tokenB);
             return IPairFactory(factory).getPair(token0, token1, stable);

188:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount, bool stable) {
             address pairStable = pairFor(tokenIn, tokenOut, true);
             address pairVolatile = pairFor(tokenIn, tokenOut, false);
             address pair;
             uint amountStable;
             uint amountVolatile;
             uint amountOut;
     
             if (IBaseV1Factory(factory).isPair(pairStable) && !IBaseV1Factory(factory).isGenesis(pairStable)) {
                 amountStable = IBaseV1Pair(pairStable).getAmountOut(amountIn, tokenIn);
             }
     
             if (IBaseV1Factory(factory).isPair(pairVolatile) && !IBaseV1Factory(factory).isGenesis(pairVolatile)) {
                 amountVolatile = IBaseV1Pair(pairVolatile).getAmountOut(amountIn, tokenIn);
             }
     
             (amountOut, stable, pair) = amountStable > amountVolatile ? (amountStable, true, pairStable) : (amountVolatile, false, pairVolatile);
     
             if (pair == address(0)) {
                 return (0, true);
             }
     
             
             bool swapPossible = _swapRatio(amountIn, tokenIn, pair, amountOut);
     
             if(swapPossible){
                 return (amountOut, stable);
             }
     
             return (0, true);

188:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount, bool stable) {
             address pairStable = pairFor(tokenIn, tokenOut, true);
             address pairVolatile = pairFor(tokenIn, tokenOut, false);
             address pair;
             uint amountStable;
             uint amountVolatile;
             uint amountOut;
     
             if (IBaseV1Factory(factory).isPair(pairStable) && !IBaseV1Factory(factory).isGenesis(pairStable)) {
                 amountStable = IBaseV1Pair(pairStable).getAmountOut(amountIn, tokenIn);
             }
     
             if (IBaseV1Factory(factory).isPair(pairVolatile) && !IBaseV1Factory(factory).isGenesis(pairVolatile)) {
                 amountVolatile = IBaseV1Pair(pairVolatile).getAmountOut(amountIn, tokenIn);
             }
     
             (amountOut, stable, pair) = amountStable > amountVolatile ? (amountStable, true, pairStable) : (amountVolatile, false, pairVolatile);
     
             if (pair == address(0)) {
                 return (0, true);

188:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount, bool stable) {
             address pairStable = pairFor(tokenIn, tokenOut, true);
             address pairVolatile = pairFor(tokenIn, tokenOut, false);
             address pair;
             uint amountStable;
             uint amountVolatile;
             uint amountOut;
     
             if (IBaseV1Factory(factory).isPair(pairStable) && !IBaseV1Factory(factory).isGenesis(pairStable)) {
                 amountStable = IBaseV1Pair(pairStable).getAmountOut(amountIn, tokenIn);
             }
     
             if (IBaseV1Factory(factory).isPair(pairVolatile) && !IBaseV1Factory(factory).isGenesis(pairVolatile)) {
                 amountVolatile = IBaseV1Pair(pairVolatile).getAmountOut(amountIn, tokenIn);
             }
     
             (amountOut, stable, pair) = amountStable > amountVolatile ? (amountStable, true, pairStable) : (amountVolatile, false, pairVolatile);
     
             if (pair == address(0)) {
                 return (0, true);
             }
     
             
             bool swapPossible = _swapRatio(amountIn, tokenIn, pair, amountOut);
     
             if(swapPossible){
                 return (amountOut, stable);

220:     function getPoolAmountOut(uint amountIn, address tokenIn, address pair) public view returns (uint amount) {
             
             uint amountOut = IBaseV1Pair(pair).getAmountOut(amountIn, tokenIn);
             
             bool swapPossible = _swapRatio(amountIn, tokenIn, pair, amountOut);
     
             if(swapPossible){
                 return amountOut;
             }
     
             return 0;

220:     function getPoolAmountOut(uint amountIn, address tokenIn, address pair) public view returns (uint amount) {
             
             uint amountOut = IBaseV1Pair(pair).getAmountOut(amountIn, tokenIn);
             
             bool swapPossible = _swapRatio(amountIn, tokenIn, pair, amountOut);
     
             if(swapPossible){
                 return amountOut;

318:     function quoteRemoveLiquidity(
             address tokenA,
             address tokenB,
             bool stable,
             uint liquidity
         ) external view returns (uint amountA, uint amountB) {
             // create the pair if it doesn't exist yet
             address _pair = IBaseV1Factory(factory).getPair(tokenA, tokenB, stable);
     
             if (_pair == address(0)) {
                 return (0,0);

```

```solidity
File: ./contracts/TokenHandler.sol

180:     function whiteListedTokens() external view returns(address[] memory tokens) {
             return whiteListed;

184:     function connectorTokens() external view returns(address[] memory tokens) {
             return connectors;

```

```solidity
File: ./contracts/governance/Governor.sol

660:     /**
          * @dev Accessor to the internal vote counts.
          */
         function proposalVotes(uint256 proposalId)
             public
             view
             virtual
             returns (
                 uint256 againstVotes,
                 uint256 forVotes,
                 uint256 abstainVotes
             )
         {
             ProposalVote storage proposalvote = _proposalVotes[proposalId];
             return (proposalvote.againstVotes, proposalvote.forVotes, proposalvote.abstainVotes);

```

### <a name="NC-37"></a>[NC-37] `require()` / `revert()` statements should have descriptive reason strings

*Instances (71)*:
```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

419:         require(msg.sender == owner);

425:         require(msg.sender == owner && _avm!=address(0));

430:         require(msg.sender == owner);

436:         require(msg.sender == owner);

443:         require(msg.sender == owner);

453:         require(msg.sender == owner);

460:         require(msg.sender == owner);  

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

456:         require(msg.sender == owner);

462:         require(msg.sender == owner && _avm!=address(0));

467:         require(msg.sender == owner);

472:         require(msg.sender == owner);

477:         require(msg.sender == owner);

483:         require(msg.sender == owner);

493:         require(msg.sender == owner);

500:         require(msg.sender == owner);  

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

125:         require(msg.sender == nonfungiblePositionManager.ownerOf(tokenId));

137:         require(msg.sender == nonfungiblePositionManager.ownerOf(tokenId));

268:         require(token.code.length > 0);

270:         require(success && (data.length == 0 || abi.decode(data, (bool))));

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

98:         require( msg.sender == IPermissionsRegistry(permissionsRegistry).emergencyCouncil() );

117:         require(_gauges.length == int_bribe.length);

129:         require(_dibs != address(0));

```

```solidity
File: ./contracts/Black.sol

29:         require(msg.sender == minter);

35:         require(msg.sender == minter && !initialMinted);

```

```solidity
File: ./contracts/BlackClaims.sol

242:         require(tokenAddress_ != address(0));

248:         require(_owner != address(0));

252:         require(_owner != address(0));

```

```solidity
File: ./contracts/Bribes.sol

333:         require(_gaugeManager != address(0));

```

```solidity
File: ./contracts/GenesisPool.sol

45:         require(msg.sender == genesisManager);

50:         require(msg.sender == genesisManager || msg.sender == genesisInfo.tokenOwner);

55:         require(msg.sender == liquidityPoolInfo.gaugeAddress);

```

```solidity
File: ./contracts/GlobalRouter.sol

281:         require(token.code.length > 0);

284:         require(success && (data.length == 0 || abi.decode(data, (bool))));

293:         require(token.code.length > 0);

296:         require(success && (data.length == 0 || abi.decode(data, (bool))));

```

```solidity
File: ./contracts/MinterUpgradeable.sol

88:         require(_initializer == msg.sender);

102:         require(msg.sender == team);

112:         require(__gaugeManager != address(0));

142:         require (weekly < TAIL_START);

144:         require (!proposals[_period]);

195:             require(_black.transfer(team, _teamEmissions));

197:             require(_black.transfer(address(_rewards_distributor), _rebase));

221:         require(msg.sender == team);

```

```solidity
File: ./contracts/PairFees.sol

23:         require(token.code.length > 0);

25:         require(success && (data.length == 0 || abi.decode(data, (bool))));

30:         require(msg.sender == pair);

38:         require(msg.sender == pair);

50:         require(msg.sender == pair);

```

```solidity
File: ./contracts/RewardsDistributor.sol

249:         require(msg.sender == owner);

254:         require(msg.sender == owner);

259:         require(msg.sender == owner);

260:         require(_token != address(0));

```

```solidity
File: ./contracts/RouterV2.sol

77:         require((z = x - y) <= x);

790:         require(msg.sender == owner);

795:         require(msg.sender == owner);

800:         require(msg.sender == owner);

805:         require(msg.sender == owner);

```

```solidity
File: ./contracts/TokenHandler.sol

151:         require(bucketId <= volatilityBucketCount + 1);

157:         require(bucketId <= volatilityBucketCount);

```

```solidity
File: ./contracts/VotingEscrow.sol

149:         require(_entered_state == _not_entered);

165:         require(msg.sender == team);

170:         require(msg.sender == team);

1055:         require(msg.sender == team);

1060:         require(msg.sender == team);

1065:         require(msg.sender == voter);

1196:         require(msg.sender == team);

1359:         require(msg.sender == team);

1360:         require(_bonus <= PRECISISON);

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

16:         require(msg.sender == owner());

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

22:         require(msg.sender == genesisManager);

```

```solidity
File: ./contracts/governance/Governor.sol

95:         require(_executor() == address(this));

```

### <a name="NC-38"></a>[NC-38] Take advantage of Custom Error's return value property
An important feature of Custom Error is that values such as address, tokenID, msg.value can be written inside the () sign, this kind of approach provides a serious advantage in debugging and examining the revert details of dapps such as tenderly.

*Instances (1)*:
```solidity
File: ./contracts/chainlink/AutomationBase.sol

13:       revert OnlySimulatedBackend();

```

### <a name="NC-39"></a>[NC-39] Deprecated library used for Solidity `>= 0.8` : SafeMath

*Instances (10)*:
```solidity
File: ./contracts/GlobalRouter.sol

4: import "@openzeppelin/contracts/utils/math/SafeMath.sol";

```

```solidity
File: ./contracts/Thenian.sol

7: import "@openzeppelin/contracts/utils/math/SafeMath.sol";

16:     using SafeMath for uint256;

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

5: library SignedSafeMath {

26:         require(!(a == -1 && b == _INT256_MIN), "SignedSafeMath: multiplication overflow");

29:         require(c / a == b, "SignedSafeMath: multiplication overflow");

47:         require(b != 0, "SignedSafeMath: division by zero");

48:         require(!(b == -1 && a == _INT256_MIN), "SignedSafeMath: division overflow");

67:         require((b >= 0 && c <= a) || (b < 0 && c > a), "SignedSafeMath: subtraction overflow");

84:         require((b >= 0 && c >= a) || (b < 0 && c < a), "SignedSafeMath: addition overflow");

```

### <a name="NC-40"></a>[NC-40] Use scientific notation (e.g. `1e18`) rather than exponentiation (e.g. `10**18`)
While this won't save gas in the recent solidity versions, this is shorter and more readable (this is especially true in calculations).

*Instances (4)*:
```solidity
File: ./contracts/Fan.sol

10:     uint256 private constant _initialSupply = 1000000 * 10 ** 18; // 1,000,000 tokens with 18 decimals

```

```solidity
File: ./contracts/GenesisPoolManager.sol

84:         MIN_THRESHOLD = 50 * 10 ** 2; 

```

```solidity
File: ./contracts/Pair.sol

33:     uint internal constant MINIMUM_LIQUIDITY = 10**3;

```

```solidity
File: ./contracts/RouterV2.sol

121:     uint internal constant MINIMUM_LIQUIDITY = 10**3;

```

### <a name="NC-41"></a>[NC-41] Use scientific notation for readability reasons for large multiples of ten
The more a number has zeros, the harder it becomes to see with the eyes if it's the intended value. To ease auditing and bug bounty hunting, consider using the scientific notation

*Instances (1)*:
```solidity
File: ./contracts/Fan.sol

10:     uint256 private constant _initialSupply = 1000000 * 10 ** 18; // 1,000,000 tokens with 18 decimals

```

### <a name="NC-42"></a>[NC-42] Avoid the use of sensitive terms
Use [alternative variants](https://www.zdnet.com/article/mysql-drops-master-slave-and-blacklist-whitelist-terminology/), e.g. allowlist/denylist instead of whitelist/blacklist

*Instances (71)*:
```solidity
File: ./contracts/GaugeManager.sol

208:         require(ITokenHandler(tokenHandler).isWhitelisted(tokenA) && ITokenHandler(tokenHandler).isWhitelisted(tokenB), "!WHITELISTED");

```

```solidity
File: ./contracts/GenesisPoolManager.sol

51:     mapping(address => mapping(address => bool)) public whiteListedTokensToUser; 

57:     event WhiteListedTokenToUser(address proposedToken, address tokenOwner);

95:     function whiteListUserAndToken(address tokenOwner, address proposedToken) external Governance {

96:         whiteListedTokensToUser[proposedToken][tokenOwner] = true;

97:         emit WhiteListedTokenToUser(proposedToken, tokenOwner);

102:         require(whiteListedTokensToUser[nativeToken][_sender] || _checkGovernance(), "!WHITELIST");

178:             tokenHandler.whitelistToken(IGenesisPool(genesisPool).getGenesisInfo().nativeToken);

202:                 tokenHandler.whitelistToken(nativeToken);

```

```solidity
File: ./contracts/Thenian.sol

119:         require(verifyLeaf(proof, msg.sender), "Not whitelisted.");

134:         require(verifyLeaf(proof, msg.sender), "Not whitelisted.");

```

```solidity
File: ./contracts/TokenHandler.sol

9:     mapping(address => bool) public isWhitelisted;             

10:     mapping(uint256 => bool) public isWhitelistedNFT;

15:     address[] public whiteListed;

22:     event Whitelisted(address indexed whitelister, address indexed token);

23:     event Blacklisted(address indexed blacklister, address indexed token);

24:     event WhitelistedNFT(address indexed whitelister, uint256 tokenId);

25:     event BlacklistNFT(address indexed whitelister, uint256 tokenId);

26:     event WhitelistedConnector(address indexed whitelister, address indexed token);

27:     event BlacklistConnector(address indexed whitelister, address indexed token);

52:     function whitelistTokens(address[] memory _tokens) external GovernanceOrGenesisManager {

55:             _whitelist(_tokens[i]);

59:     function whitelistToken(address _token) external GovernanceOrGenesisManager {

60:         _whitelist(_token);

63:     function _whitelist(address _token) private {

64:         require(!isWhitelisted[_token], "in");

66:         isWhitelisted[_token] = true;

67:         whiteListed.push(_token);

68:         emit Whitelisted(msg.sender, _token);

72:     function blacklistTokens(address[] memory _token) external GovernanceOrGenesisManager {

75:             _blacklist(_token[i]);

79:     function blacklistToken(address _token) external GovernanceOrGenesisManager {

80:         _blacklist(_token);

83:     function _blacklist(address _token) private {

84:         require(isWhitelisted[_token], "out");

86:         isWhitelisted[_token] = false;

88:         uint256 length = whiteListed.length;

91:             if (whiteListed[i] == _token) {

92:                 whiteListed[i] = whiteListed[length - 1]; 

93:                 whiteListed.pop(); 

98:         emit Blacklisted(msg.sender, _token);

101:     function whitelistNFT(uint256 _tokenId) external Governance() {

102:         isWhitelistedNFT[_tokenId] = true;

103:         emit WhitelistedNFT(msg.sender, _tokenId);

106:     function blacklistNFT(uint256 _tokenId) external Governance() {

107:         isWhitelistedNFT[_tokenId] = false;

108:         emit BlacklistNFT(msg.sender, _tokenId);

111:     function whitelistConnectors(address[] memory _tokens) external Governance {

114:             _whitelistConnector(_tokens[i]);

118:     function whitelistConnector(address _token) external Governance() {

119:         _whitelistConnector(_token);

122:     function _whitelistConnector(address _token) internal {

123:         require(isWhitelisted[_token], "out");

128:         emit WhitelistedConnector(msg.sender, _token);

131:     function blacklistConnector(address _token) external Governance() {

132:         require(isWhitelisted[_token], "out");

147:         emit BlacklistConnector(msg.sender, _token);

162:         require(isWhitelisted[_token], "!whitelisted");

168:         require(isWhitelisted[_token], "!whitelisted");

172:     function whiteListedTokensLength() external view returns(uint256) {

173:         return whiteListed.length;

180:     function whiteListedTokens() external view returns(address[] memory tokens) {

181:         return whiteListed;

```

```solidity
File: ./contracts/VoterV3.sol

202:         if ((_timestamp >= BlackTimeLibrary.epochVoteEnd(_timestamp)) && !ITokenHandler(tokenHandler).isWhitelistedNFT(_tokenId) && (IAutoVotingEscrowManager(avm).tokenIdToAVMId(_tokenId)) == (0)){

```

```solidity
File: ./contracts/interfaces/ITokenHandler.sol

5:     function isWhitelisted(address token) external view returns (bool);

6:     function isWhitelistedNFT(uint256 token) external view returns (bool);

9:     function whitelistToken(address _token) external;

10:     function blacklistToken(address _token) external;

12:     function whiteListed(uint256 index) external returns (address);

15:     function whiteListedTokensLength() external returns (uint256);

18:     function whiteListedTokens() external view returns(address[] memory tokens);

```

### <a name="NC-43"></a>[NC-43] Strings should use double quotes rather than single quotes
See the Solidity Style Guide: https://docs.soliditylang.org/en/v0.8.20/style-guide.html#other-recommendations

*Instances (114)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

41:         require(msg.sender == address(votingEscrow), '!VE');

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

45:         require(owner() == msg.sender || IPermissionsRegistry(permissionsRegistry).hasRole("GAUGE_ADMIN",msg.sender), 'ERR: GAUGE_ADMIN');

50:         require(owner() == msg.sender, 'not owner');

55:         require(owner() == msg.sender, 'not owner');

```

```solidity
File: ./contracts/Black.sol

77:         require(msg.sender == minter, 'not allowed');

```

```solidity
File: ./contracts/BlackClaims.sol

29:         require(msg.sender == owner || msg.sender == secondOwner, 'not owner');

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

185:             require(amount <= notDistributed, 'TOO_MANY');

```

```solidity
File: ./contracts/GaugeManager.sol

64:     bytes32 public constant COMMUNITY_FEE_WITHDRAWER_ROLE = keccak256('COMMUNITY_FEE_WITHDRAWER');

65:     bytes32 public constant COMMUNITY_FEE_VAULT_ADMINISTRATOR = keccak256('COMMUNITY_FEE_VAULT_ADMINISTRATOR');

95:         require(IPermissionsRegistry(permissionRegistry).hasRole("GAUGE_ADMIN",msg.sender), 'GAUGE_ADMIN');

100:         require(IPermissionsRegistry(permissionRegistry).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE');

269:         str[0] = '0';

270:         str[1] = 'x';

463:         require(isGauge[_gauge], 'DEAD');

```

```solidity
File: ./contracts/GenesisPoolManager.sol

60:         require(IPermissionsRegistry(permissionRegistory).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE');

142:         require(genesisPool != address(0), 'ZA');

151:         require(genesisPool != address(0), 'ZA');

```

```solidity
File: ./contracts/GlobalRouter.sol

77:         require((z = x - y) <= x, 'Math: Sub-underflow');

166:         require(deadline >= block.timestamp, 'BaseV1Router: EXPIRED');

196:         require(amounts[amounts.length - 1] >= amountOutMin, 'BaseV1Router: INSUFFICIENT_OUTPUT_AMOUNT');

236:         require(amountOut >= params.amountOutMinimum, 'Too little received');*/

289:         require(success, 'TransferHelper: ETH_TRANSFER_FAILED');

```

```solidity
File: ./contracts/Pair.sol

349:         require(liquidity > 0, 'ILM'); // Pair: INSUFFICIENT_LIQUIDITY_MINTED

368:         require(amount0 > 0 && amount1 > 0, 'ILB'); // Pair: INSUFFICIENT_LIQUIDITY_BURNED

382:         require(amount0Out > 0 || amount1Out > 0, 'IOA'); // Pair: INSUFFICIENT_OUTPUT_AMOUNT

384:         require(amount0Out < _reserve0 && amount1Out < _reserve1, 'IL'); // Pair: INSUFFICIENT_LIQUIDITY

390:         require(to != _token0 && to != _token1, 'IT'); // Pair: INVALID_TO

400:         require(amount0In > 0 || amount1In > 0, 'IIA'); // Pair: INSUFFICIENT_INPUT_AMOUNT

409:         require(_k(_balance0, _balance1) >= _k(_reserve0, _reserve1), 'K'); // Pair: K

515:         require(deadline >= block.timestamp, 'EXP');

518:                 keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),

520:                 keccak256(bytes('1')),

527:                 '\x19\x01',

533:         require(recoveredAddress != address(0) && recoveredAddress == owner, 'ISIG');

```

```solidity
File: ./contracts/PermissionsRegistry.sol

85:         require(!_checkRole[_role], 'is a role');

95:         require(_checkRole[_role], 'not a role');

126:         require(_checkRole[_role], 'not a role');

127:         require(!hasRole[_role][c], 'assigned');

142:         require(_checkRole[_role], 'not a role');

143:         require(hasRole[_role][c], 'not assigned');

```

```solidity
File: ./contracts/RewardsDistributor.sol

66:         require(msg.sender == owner, 'not owner');

```

```solidity
File: ./contracts/RouterV2.sol

133:         require(deadline >= block.timestamp, 'EXP');

165:         require(token0 != address(0) && token0 != token1, 'IA');

176:         require(amountA > 0 && reserveA > 0 && reserveB > 0, 'INL');

259:         require(routes.length >= 1, 'INP');

434:         require(amountA >= amountAMin && amountB >= amountBMin, 'IAA');

548:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

571:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

588:         require(routes[0].from == address(wETH), 'INP');

590:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

608:         require(routes[routes.length - 1].to == address(wETH), 'INP');

610:         require(amounts[amounts.length - 1] >= amountOutMin, 'IOA');

642:         require(success, 'ETF');

743:             'IOA'

756:         require(routes[0].from == address(wETH), 'INP');

764:             'IOA'

778:         require(routes[routes.length - 1].to == address(wETH), 'INP');

784:         require(amountOut >= amountOutMin, 'IOA');

```

```solidity
File: ./contracts/TokenHandler.sol

31:         require(IPermissionsRegistry(permissionRegistry).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE');

36:         require(IPermissionsRegistry(permissionRegistry).hasRole("GENESIS_MANAGER", msg.sender) || IPermissionsRegistry(permissionRegistry).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE GENESIS_MANAGER');

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

42:         output = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

43:         output = string(abi.encodePacked(output, "token ", toString(_tokenId), '</text><text x="10" y="40" class="base">'));

44:         output = string(abi.encodePacked(output, "balanceOf ", toString(_balanceOf), '</text><text x="10" y="60" class="base">'));

45:         output = string(abi.encodePacked(output, "locked_end ", toString(_locked_end), '</text><text x="10" y="80" class="base">'));

46:         output = string(abi.encodePacked(output, "isSMNFT ", isSMNFT?"true":"false", '</text><text x="10" y="100" class="base">'));

47:         output = string(abi.encodePacked(output, "value ", toString(_value), '</text></svg>'));

49:         string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "lock #', toString(_tokenId), '", "description": "Black locks, can be used to boost gauge yields, vote on token emission, and receive bribes", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));

50:         output = string(abi.encodePacked('data:application/json;base64,', json));

```

```solidity
File: ./contracts/VoterV3.sol

79:         require(IPermissionsRegistry(permissionRegistry).hasRole("VOTER_ADMIN",msg.sender), 'VOTER_ADMIN');

84:         require(IPermissionsRegistry(permissionRegistry).hasRole("GOVERNANCE",msg.sender), 'GOVERNANCE');

89:         require(IPermissionsRegistry(permissionRegistry).hasRole("GENESIS_MANAGER", msg.sender), 'GENESIS_MANAGER');

```

```solidity
File: ./contracts/VotingEscrow.sol

422:                     revert('E721_NRCV');

820:         require(_locked.amount > 0, 'ZL');

821:         require(_locked.end > block.timestamp || _locked.isPermanent, 'EXP');

841:         require(unlock_time > block.timestamp && (unlock_time <= block.timestamp + MAXTIME), 'IUT');

883:         require(_locked.amount > 0, 'ZL');

884:         require(_locked.end > block.timestamp || _locked.isPermanent, 'EXP');

906:         require(_locked.end > block.timestamp && _locked.amount > 0, 'EXP||ZV');

907:         require((isSMNFT || unlock_time > _locked.end) && (unlock_time <= block.timestamp + MAXTIME), 'IUT'); // IUT -> invalid unlock time

```

```solidity
File: ./contracts/chainlink/EpochController.sol

45:          require(msg.sender == automationRegistry || permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'cannot execute');

46:          (bool upkeepNeeded, ) = checkUpkeep('0x');

50:         emit Logger(sender, block.timestamp, block.number, msg.sender == automationRegistry, permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'performUpkeep called');

58:          require(msg.sender == automationRegistry2 || permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'cannot execute');

59:          (bool preUpkeepNeeded, ) = checkUpPrekeep('0x');

63:         emit Logger(sender, block.timestamp, block.number, msg.sender == automationRegistry2, permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'performPreUpkeep called');

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

31:         require(_auction != address(0), 'addr0');

32:         require(!isAuction[_auction], 'fact');

41:         require(_auction != address(0), 'addr0');

42:         require(!isAuction[_auction], '!fact');

55:         require(isAuction[oldPF], '!fact');

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

31:         require(owner() == msg.sender || permissionsRegistry.hasRole("BRIBE_ADMIN",msg.sender), 'BRIBE_ADMIN');

60:         require(msg.sender == gaugeManager || msg.sender == owner(), 'NA');

81:         require(owner() == msg.sender, 'NA');

82:         require(_Voter != address(0), 'ZA');

89:         require(owner() == msg.sender, 'NA');

90:         require(_permReg != address(0), 'ZA');

95:         require(owner() == msg.sender, 'NA');

96:         require(_tokenHandler != address(0), 'ZA');

102:         require(owner() == msg.sender, 'NA');

103:         require(_token != address(0), 'ZA');

110:         require(owner() == msg.sender, 'NA');

111:         require(_token != address(0), 'ZA');

200:         require(_bribe.length == _tokens.length, 'MISMATCH_LEN');

201:         require(_tokens.length == _amounts.length, 'MISMATCH_LEN');

211:         require(_bribe.length == _tokens.length, 'MISMATCH_LEN');

212:         require(_tokens.length == _amounts.length, 'MISMATCH_LEN');

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

36:         require(owner() == msg.sender, 'NA');

57:         require(owner() == msg.sender || IPermissionsRegistry(permissionsRegistry).hasRole("GAUGE_ADMIN",msg.sender), 'GAUGE_ADMIN');

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

18:         require(_pairFactory != address(0) , 'addr0');

27:         require(_gaugeFactory != address(0) , 'addr0');

36:         require(_pairFactory != address(0), 'addr0');

37:         require(!self.isFactory[_pairFactory], 'fact');

48:         require(_gaugeFactory != address(0) , 'addr0');

49:         require(!self.isGaugeFactory[_gaugeFactory], 'gFact');

```

### <a name="NC-44"></a>[NC-44] Contract does not follow the Solidity style guide's suggested layout ordering
The [style guide](https://docs.soliditylang.org/en/v0.8.16/style-guide.html#order-of-layout) says that, within a contract, the ordering should be:

1) Type declarations
2) State variables
3) Events
4) Modifiers
5) Functions

However, the contract(s) below do not follow this ordering

*Instances (27)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

1: 
   Current order:
   StructDefinition.pairInfo
   StructDefinition.tokenBribe
   StructDefinition.pairBribeEpoch
   StructDefinition.Bribes
   StructDefinition.Rewards
   StructDefinition.swapRoute
   StructDefinition.route
   StructDefinition.SwapRouteHelperData
   StructDefinition.CLOutputData
   VariableDeclaration.MAX_PAIRS
   VariableDeclaration.MAX_EPOCHS
   VariableDeclaration.MAX_REWARDS
   VariableDeclaration.pairFactory
   VariableDeclaration.algebraFactory
   VariableDeclaration.quoterV2
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.routerV2
   VariableDeclaration.algebraPoolAPIStorage
   VariableDeclaration.underlyingToken
   VariableDeclaration.owner
   EventDefinition.Owner
   EventDefinition.Voter
   EventDefinition.GaugeManager
   EventDefinition.WBF
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getClaimable
   FunctionDefinition.getAllPair
   FunctionDefinition.getPair
   FunctionDefinition._pairAddressToInfo
   FunctionDefinition._getBribes
   FunctionDefinition._getNextEpochRewards
   FunctionDefinition.getCurrentFees
   FunctionDefinition.setOwner
   FunctionDefinition.setVoter
   FunctionDefinition.setGaugeManager
   FunctionDefinition.getAmountOut
   FunctionDefinition._getPoolSwapRoutesFromThreeHop
   FunctionDefinition._getSwapRoutesFromTwoHop
   FunctionDefinition._getAmountViaHopping
   FunctionDefinition._getAmountViaHopping
   FunctionDefinition._getCLPoolAmountOut
   FunctionDefinition._getAmountOut
   FunctionDefinition._createRoute
   FunctionDefinition.setAlgebraFactory
   FunctionDefinition.setQuoterV2
   FunctionDefinition.setAlgebraPoolAPI
   FunctionDefinition.setPairFactory
   FunctionDefinition.getNextEpochStart
   
   Suggested order:
   VariableDeclaration.MAX_PAIRS
   VariableDeclaration.MAX_EPOCHS
   VariableDeclaration.MAX_REWARDS
   VariableDeclaration.pairFactory
   VariableDeclaration.algebraFactory
   VariableDeclaration.quoterV2
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.routerV2
   VariableDeclaration.algebraPoolAPIStorage
   VariableDeclaration.underlyingToken
   VariableDeclaration.owner
   StructDefinition.pairInfo
   StructDefinition.tokenBribe
   StructDefinition.pairBribeEpoch
   StructDefinition.Bribes
   StructDefinition.Rewards
   StructDefinition.swapRoute
   StructDefinition.route
   StructDefinition.SwapRouteHelperData
   StructDefinition.CLOutputData
   EventDefinition.Owner
   EventDefinition.Voter
   EventDefinition.GaugeManager
   EventDefinition.WBF
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getClaimable
   FunctionDefinition.getAllPair
   FunctionDefinition.getPair
   FunctionDefinition._pairAddressToInfo
   FunctionDefinition._getBribes
   FunctionDefinition._getNextEpochRewards
   FunctionDefinition.getCurrentFees
   FunctionDefinition.setOwner
   FunctionDefinition.setVoter
   FunctionDefinition.setGaugeManager
   FunctionDefinition.getAmountOut
   FunctionDefinition._getPoolSwapRoutesFromThreeHop
   FunctionDefinition._getSwapRoutesFromTwoHop
   FunctionDefinition._getAmountViaHopping
   FunctionDefinition._getAmountViaHopping
   FunctionDefinition._getCLPoolAmountOut
   FunctionDefinition._getAmountOut
   FunctionDefinition._createRoute
   FunctionDefinition.setAlgebraFactory
   FunctionDefinition.setQuoterV2
   FunctionDefinition.setAlgebraPoolAPI
   FunctionDefinition.setPairFactory
   FunctionDefinition.getNextEpochStart

```

```solidity
File: ./contracts/APIHelper/GenesisPoolAPI.sol

1: 
   Current order:
   StructDefinition.GenesisData
   VariableDeclaration.owner
   VariableDeclaration.genesisManager
   VariableDeclaration.genesisPoolFactory
   VariableDeclaration.MAX_POOLS
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getGenesisPoolFromNative
   FunctionDefinition.getGenesisPool
   FunctionDefinition._getGenesisPool
   FunctionDefinition.getAllGenesisPools
   FunctionDefinition.getAllUserRelatedGenesisPools
   FunctionDefinition._hasClaimbaleForOwner
   
   Suggested order:
   VariableDeclaration.owner
   VariableDeclaration.genesisManager
   VariableDeclaration.genesisPoolFactory
   VariableDeclaration.MAX_POOLS
   StructDefinition.GenesisData
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getGenesisPoolFromNative
   FunctionDefinition.getGenesisPool
   FunctionDefinition._getGenesisPool
   FunctionDefinition.getAllGenesisPools
   FunctionDefinition.getAllUserRelatedGenesisPools
   FunctionDefinition._hasClaimbaleForOwner

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

1: 
   Current order:
   VariableDeclaration.pairFactory
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.underlyingToken
   VariableDeclaration.owner
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   StructDefinition.Bribes
   StructDefinition.Rewards
   FunctionDefinition.getExpectedClaimForNextEpoch
   FunctionDefinition.getPairBribe
   FunctionDefinition._getNextEpochRewards
   FunctionDefinition.setOwner
   FunctionDefinition.setVoter
   FunctionDefinition.setGaugeManager
   
   Suggested order:
   VariableDeclaration.pairFactory
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.underlyingToken
   VariableDeclaration.owner
   StructDefinition.Bribes
   StructDefinition.Rewards
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getExpectedClaimForNextEpoch
   FunctionDefinition.getPairBribe
   FunctionDefinition._getNextEpochRewards
   FunctionDefinition.setOwner
   FunctionDefinition.setVoter
   FunctionDefinition.setGaugeManager

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

1: 
   Current order:
   StructDefinition.Token
   VariableDeclaration.tokenHandler
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getWhiteListedTokens
   FunctionDefinition.getConnectorTokens
   FunctionDefinition.getTokenBalances
   
   Suggested order:
   VariableDeclaration.tokenHandler
   StructDefinition.Token
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getWhiteListedTokens
   FunctionDefinition.getConnectorTokens
   FunctionDefinition.getTokenBalances

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

1: 
   Current order:
   StructDefinition.Bribes
   StructDefinition.Rewards
   FunctionDefinition.pair_factory
   StructDefinition.pairVotes
   StructDefinition.InternalBribeInputs
   StructDefinition.ExternalBribeInputs
   StructDefinition.veNFT
   StructDefinition.Reward
   StructDefinition.PairReward
   StructDefinition.LockReward
   VariableDeclaration.MAX_RESULTS
   VariableDeclaration.MAX_PAIRS
   VariableDeclaration.WEEK
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.gaugeFactory
   VariableDeclaration.underlyingToken
   VariableDeclaration.ve
   VariableDeclaration.rewardDisitributor
   VariableDeclaration.pairAPI
   VariableDeclaration.pairFactory
   VariableDeclaration.owner
   VariableDeclaration.avm
   EventDefinition.Owner
   StructDefinition.AllPairRewards
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getAllNFT
   FunctionDefinition.getNFTFromId
   FunctionDefinition.getNFTFromAddress
   FunctionDefinition.getAVMNFTFromAddress
   FunctionDefinition._getNFTFromId
   FunctionDefinition.getAllPairRewards
   FunctionDefinition._getRewardsForNft
   FunctionDefinition._pairReward
   FunctionDefinition._addInternalBribeRewards
   FunctionDefinition._addExternalBribeRewards
   FunctionDefinition._createReward
   FunctionDefinition.setOwner
   FunctionDefinition.setVoter
   FunctionDefinition.setAVM
   FunctionDefinition.setGaugeManager
   FunctionDefinition.setGaugeFactory
   FunctionDefinition.setRewardDistro
   FunctionDefinition.setPairAPI
   FunctionDefinition.setPairFactory
   
   Suggested order:
   VariableDeclaration.MAX_RESULTS
   VariableDeclaration.MAX_PAIRS
   VariableDeclaration.WEEK
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.gaugeFactory
   VariableDeclaration.underlyingToken
   VariableDeclaration.ve
   VariableDeclaration.rewardDisitributor
   VariableDeclaration.pairAPI
   VariableDeclaration.pairFactory
   VariableDeclaration.owner
   VariableDeclaration.avm
   StructDefinition.Bribes
   StructDefinition.Rewards
   StructDefinition.pairVotes
   StructDefinition.InternalBribeInputs
   StructDefinition.ExternalBribeInputs
   StructDefinition.veNFT
   StructDefinition.Reward
   StructDefinition.PairReward
   StructDefinition.LockReward
   StructDefinition.AllPairRewards
   EventDefinition.Owner
   FunctionDefinition.pair_factory
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getAllNFT
   FunctionDefinition.getNFTFromId
   FunctionDefinition.getNFTFromAddress
   FunctionDefinition.getAVMNFTFromAddress
   FunctionDefinition._getNFTFromId
   FunctionDefinition.getAllPairRewards
   FunctionDefinition._getRewardsForNft
   FunctionDefinition._pairReward
   FunctionDefinition._addInternalBribeRewards
   FunctionDefinition._addExternalBribeRewards
   FunctionDefinition._createReward
   FunctionDefinition.setOwner
   FunctionDefinition.setVoter
   FunctionDefinition.setAVM
   FunctionDefinition.setGaugeManager
   FunctionDefinition.setGaugeFactory
   FunctionDefinition.setRewardDistro
   FunctionDefinition.setPairAPI
   FunctionDefinition.setPairFactory

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

1: 
   Current order:
   StructDefinition.Bribes
   StructDefinition.Rewards
   FunctionDefinition.pair_factory
   StructDefinition.LockInfo
   StructDefinition.pairVotes
   StructDefinition.InternalBribeInputs
   StructDefinition.ExternalBribeInputs
   StructDefinition.veNFT
   StructDefinition.Reward
   StructDefinition.PairReward
   StructDefinition.LockReward
   VariableDeclaration.MAX_RESULTS
   VariableDeclaration.MAX_PAIRS
   VariableDeclaration.WEEK
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.gaugeFactory
   VariableDeclaration.gaugeFactoryCL
   VariableDeclaration.underlyingToken
   VariableDeclaration.ve
   VariableDeclaration.rewardDisitributor
   VariableDeclaration.pairAPI
   VariableDeclaration.pairFactory
   VariableDeclaration.owner
   VariableDeclaration.avm
   EventDefinition.Owner
   StructDefinition.AllPairRewards
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getAllNFT
   FunctionDefinition.getNFTFromId
   FunctionDefinition.getNFTFromAddress
   FunctionDefinition.getAVMNFTFromAddress
   FunctionDefinition._getNFTFromId
   FunctionDefinition.getAllPairRewards
   FunctionDefinition._getRewardsForNft
   FunctionDefinition._pairReward
   FunctionDefinition._addInternalBribeRewards
   FunctionDefinition._addExternalBribeRewards
   FunctionDefinition._createReward
   FunctionDefinition.setOwner
   FunctionDefinition.setVoter
   FunctionDefinition.setAVM
   FunctionDefinition.setGaugeManager
   FunctionDefinition.setGaugeFactory
   FunctionDefinition.setGaugeFactoryCL
   FunctionDefinition.setRewardDistro
   FunctionDefinition.setPairAPI
   FunctionDefinition.setPairFactory
   
   Suggested order:
   VariableDeclaration.MAX_RESULTS
   VariableDeclaration.MAX_PAIRS
   VariableDeclaration.WEEK
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.gaugeFactory
   VariableDeclaration.gaugeFactoryCL
   VariableDeclaration.underlyingToken
   VariableDeclaration.ve
   VariableDeclaration.rewardDisitributor
   VariableDeclaration.pairAPI
   VariableDeclaration.pairFactory
   VariableDeclaration.owner
   VariableDeclaration.avm
   StructDefinition.Bribes
   StructDefinition.Rewards
   StructDefinition.LockInfo
   StructDefinition.pairVotes
   StructDefinition.InternalBribeInputs
   StructDefinition.ExternalBribeInputs
   StructDefinition.veNFT
   StructDefinition.Reward
   StructDefinition.PairReward
   StructDefinition.LockReward
   StructDefinition.AllPairRewards
   EventDefinition.Owner
   FunctionDefinition.pair_factory
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.getAllNFT
   FunctionDefinition.getNFTFromId
   FunctionDefinition.getNFTFromAddress
   FunctionDefinition.getAVMNFTFromAddress
   FunctionDefinition._getNFTFromId
   FunctionDefinition.getAllPairRewards
   FunctionDefinition._getRewardsForNft
   FunctionDefinition._pairReward
   FunctionDefinition._addInternalBribeRewards
   FunctionDefinition._addExternalBribeRewards
   FunctionDefinition._createReward
   FunctionDefinition.setOwner
   FunctionDefinition.setVoter
   FunctionDefinition.setAVM
   FunctionDefinition.setGaugeManager
   FunctionDefinition.setGaugeFactory
   FunctionDefinition.setGaugeFactoryCL
   FunctionDefinition.setRewardDistro
   FunctionDefinition.setPairAPI
   FunctionDefinition.setPairFactory

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

1: 
   Current order:
   UsingForDirective.IERC20
   VariableDeclaration.rewardToken
   VariableDeclaration.bonusRewardToken
   VariableDeclaration.VE
   VariableDeclaration.DISTRIBUTION
   VariableDeclaration.internal_bribe
   VariableDeclaration.external_bribe
   VariableDeclaration.DURATION
   VariableDeclaration._periodFinish
   VariableDeclaration.rewardRate
   VariableDeclaration.lastUpdateTime
   VariableDeclaration.rewardPerTokenStored
   VariableDeclaration.farmingCenter
   VariableDeclaration.farmingParam
   VariableDeclaration.algebraEternalFarming
   VariableDeclaration.algebraPool
   VariableDeclaration.poolAddress
   VariableDeclaration.communityVault
   VariableDeclaration.nonfungiblePositionManager
   VariableDeclaration.emergency
   VariableDeclaration.isForPair
   VariableDeclaration.factory
   VariableDeclaration.ALGEBRA_FEE_DENOMINATOR
   VariableDeclaration.REFERRAL_FEE_DENOMINATOR
   EventDefinition.RewardAdded
   EventDefinition.Deposit
   EventDefinition.Withdraw
   EventDefinition.Harvest
   EventDefinition.ClaimFees
   EventDefinition.EmergencyActivated
   EventDefinition.EmergencyDeactivated
   FunctionDefinition.constructor
   ModifierDefinition.onlyDistribution
   ModifierDefinition.isNotEmergency
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.balanceOf
   FunctionDefinition.earned
   FunctionDefinition.deposit
   FunctionDefinition.withdraw
   FunctionDefinition.getReward
   FunctionDefinition.notifyRewardAmount
   FunctionDefinition.gaugeBalances
   FunctionDefinition.claimFees
   FunctionDefinition._claimFees
   FunctionDefinition.rewardForDuration
   FunctionDefinition.setInternalBribe
   FunctionDefinition._safeTransfer
   FunctionDefinition.stakedFees
   FunctionDefinition.getCommunityVaultAccruedFee
   
   Suggested order:
   UsingForDirective.IERC20
   VariableDeclaration.rewardToken
   VariableDeclaration.bonusRewardToken
   VariableDeclaration.VE
   VariableDeclaration.DISTRIBUTION
   VariableDeclaration.internal_bribe
   VariableDeclaration.external_bribe
   VariableDeclaration.DURATION
   VariableDeclaration._periodFinish
   VariableDeclaration.rewardRate
   VariableDeclaration.lastUpdateTime
   VariableDeclaration.rewardPerTokenStored
   VariableDeclaration.farmingCenter
   VariableDeclaration.farmingParam
   VariableDeclaration.algebraEternalFarming
   VariableDeclaration.algebraPool
   VariableDeclaration.poolAddress
   VariableDeclaration.communityVault
   VariableDeclaration.nonfungiblePositionManager
   VariableDeclaration.emergency
   VariableDeclaration.isForPair
   VariableDeclaration.factory
   VariableDeclaration.ALGEBRA_FEE_DENOMINATOR
   VariableDeclaration.REFERRAL_FEE_DENOMINATOR
   EventDefinition.RewardAdded
   EventDefinition.Deposit
   EventDefinition.Withdraw
   EventDefinition.Harvest
   EventDefinition.ClaimFees
   EventDefinition.EmergencyActivated
   EventDefinition.EmergencyDeactivated
   ModifierDefinition.onlyDistribution
   ModifierDefinition.isNotEmergency
   FunctionDefinition.constructor
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.balanceOf
   FunctionDefinition.earned
   FunctionDefinition.deposit
   FunctionDefinition.withdraw
   FunctionDefinition.getReward
   FunctionDefinition.notifyRewardAmount
   FunctionDefinition.gaugeBalances
   FunctionDefinition.claimFees
   FunctionDefinition._claimFees
   FunctionDefinition.rewardForDuration
   FunctionDefinition.setInternalBribe
   FunctionDefinition._safeTransfer
   FunctionDefinition.stakedFees
   FunctionDefinition.getCommunityVaultAccruedFee

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

1: 
   Current order:
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.setInternalBribe
   UsingForDirective.IERC20
   VariableDeclaration.last_gauge
   VariableDeclaration.permissionsRegistry
   VariableDeclaration.algebraPoolAPIStorage
   VariableDeclaration.__gauges
   VariableDeclaration.dibs
   VariableDeclaration.dibsPercentage
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   ModifierDefinition.onlyAllowed
   FunctionDefinition.setRegistry
   FunctionDefinition.setAlgebraPoolApi
   FunctionDefinition.createGauge
   FunctionDefinition.createEternalFarming
   FunctionDefinition.getIncentiveKey
   FunctionDefinition.gauges
   ModifierDefinition.EmergencyCouncil
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.setInternalBribe
   FunctionDefinition.length
   FunctionDefinition.setDibs
   FunctionDefinition.setReferralFee
   
   Suggested order:
   UsingForDirective.IERC20
   VariableDeclaration.last_gauge
   VariableDeclaration.permissionsRegistry
   VariableDeclaration.algebraPoolAPIStorage
   VariableDeclaration.__gauges
   VariableDeclaration.dibs
   VariableDeclaration.dibsPercentage
   ModifierDefinition.onlyAllowed
   ModifierDefinition.EmergencyCouncil
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.setInternalBribe
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.setRegistry
   FunctionDefinition.setAlgebraPoolApi
   FunctionDefinition.createGauge
   FunctionDefinition.createEternalFarming
   FunctionDefinition.getIncentiveKey
   FunctionDefinition.gauges
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.setInternalBribe
   FunctionDefinition.length
   FunctionDefinition.setDibs
   FunctionDefinition.setReferralFee

```

```solidity
File: ./contracts/BlackClaims.sol

1: 
   Current order:
   VariableDeclaration.MAX_PERIOD
   VariableDeclaration.token
   VariableDeclaration.treasury
   VariableDeclaration.owner
   VariableDeclaration.secondOwner
   ModifierDefinition.onlyOwner
   VariableDeclaration._ve
   VariableDeclaration.season
   VariableDeclaration.season_rewards
   VariableDeclaration.claimed_rewards
   EventDefinition.TreasurySet
   EventDefinition.StakedRewards
   FunctionDefinition.constructor
   FunctionDefinition.setTreasury
   FunctionDefinition.startSeason
   FunctionDefinition.isSeasonFinalized
   FunctionDefinition.isSeasonClaimingActive
   FunctionDefinition.isSeasonClaimingEnded
   FunctionDefinition.revokeUnclaimedReward
   FunctionDefinition.finalize
   FunctionDefinition.extendClaimDuration
   FunctionDefinition.reportRewards
   FunctionDefinition._preClaim
   FunctionDefinition.claimAndStakeReward
   FunctionDefinition.getClaimableReward
   FunctionDefinition.recoverERC20
   FunctionDefinition.setOwner
   FunctionDefinition.setOwner2
   
   Suggested order:
   VariableDeclaration.MAX_PERIOD
   VariableDeclaration.token
   VariableDeclaration.treasury
   VariableDeclaration.owner
   VariableDeclaration.secondOwner
   VariableDeclaration._ve
   VariableDeclaration.season
   VariableDeclaration.season_rewards
   VariableDeclaration.claimed_rewards
   EventDefinition.TreasurySet
   EventDefinition.StakedRewards
   ModifierDefinition.onlyOwner
   FunctionDefinition.constructor
   FunctionDefinition.setTreasury
   FunctionDefinition.startSeason
   FunctionDefinition.isSeasonFinalized
   FunctionDefinition.isSeasonClaimingActive
   FunctionDefinition.isSeasonClaimingEnded
   FunctionDefinition.revokeUnclaimedReward
   FunctionDefinition.finalize
   FunctionDefinition.extendClaimDuration
   FunctionDefinition.reportRewards
   FunctionDefinition._preClaim
   FunctionDefinition.claimAndStakeReward
   FunctionDefinition.getClaimableReward
   FunctionDefinition.recoverERC20
   FunctionDefinition.setOwner
   FunctionDefinition.setOwner2

```

```solidity
File: ./contracts/Bribes.sol

1: 
   Current order:
   UsingForDirective.IERC20
   VariableDeclaration.WEEK
   StructDefinition.Checkpoint
   StructDefinition.SupplyCheckpoint
   VariableDeclaration.tokenRewardsPerEpoch
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.bribeFactory
   VariableDeclaration.minter
   VariableDeclaration.ve
   VariableDeclaration.owner
   VariableDeclaration.avm
   VariableDeclaration.tokenHandler
   VariableDeclaration.TYPE
   VariableDeclaration.totalSupply
   VariableDeclaration.balanceOf
   VariableDeclaration.lastEarn
   VariableDeclaration.checkpoints
   VariableDeclaration.numCheckpoints
   VariableDeclaration.supplyCheckpoints
   VariableDeclaration.supplyNumCheckpoints
   VariableDeclaration.isBribeToken
   VariableDeclaration.bribeTokens
   FunctionDefinition.constructor
   FunctionDefinition.getEpochStart
   FunctionDefinition.getNextEpochStart
   FunctionDefinition.rewardsListLength
   FunctionDefinition.earned
   FunctionDefinition.getPriorBalanceIndex
   FunctionDefinition.getPriorSupplyIndex
   FunctionDefinition.isRewardToken
   FunctionDefinition._isRewardToken
   FunctionDefinition.deposit
   FunctionDefinition._writeCheckpoint
   FunctionDefinition._writeSupplyCheckpoint
   FunctionDefinition.withdraw
   FunctionDefinition.getReward
   FunctionDefinition.notifyRewardAmount
   FunctionDefinition.recoverERC20AndUpdateData
   FunctionDefinition.emergencyRecoverERC20
   FunctionDefinition.setVoter
   FunctionDefinition.setGaugeManager
   FunctionDefinition.setMinter
   FunctionDefinition.setAVM
   EventDefinition.SetOwner
   FunctionDefinition.setOwner
   ModifierDefinition.onlyAllowed
   EventDefinition.RewardAdded
   EventDefinition.Staked
   EventDefinition.Withdrawn
   EventDefinition.RewardPaid
   EventDefinition.Recovered
   
   Suggested order:
   UsingForDirective.IERC20
   VariableDeclaration.WEEK
   VariableDeclaration.tokenRewardsPerEpoch
   VariableDeclaration.voter
   VariableDeclaration.gaugeManager
   VariableDeclaration.bribeFactory
   VariableDeclaration.minter
   VariableDeclaration.ve
   VariableDeclaration.owner
   VariableDeclaration.avm
   VariableDeclaration.tokenHandler
   VariableDeclaration.TYPE
   VariableDeclaration.totalSupply
   VariableDeclaration.balanceOf
   VariableDeclaration.lastEarn
   VariableDeclaration.checkpoints
   VariableDeclaration.numCheckpoints
   VariableDeclaration.supplyCheckpoints
   VariableDeclaration.supplyNumCheckpoints
   VariableDeclaration.isBribeToken
   VariableDeclaration.bribeTokens
   StructDefinition.Checkpoint
   StructDefinition.SupplyCheckpoint
   EventDefinition.SetOwner
   EventDefinition.RewardAdded
   EventDefinition.Staked
   EventDefinition.Withdrawn
   EventDefinition.RewardPaid
   EventDefinition.Recovered
   ModifierDefinition.onlyAllowed
   FunctionDefinition.constructor
   FunctionDefinition.getEpochStart
   FunctionDefinition.getNextEpochStart
   FunctionDefinition.rewardsListLength
   FunctionDefinition.earned
   FunctionDefinition.getPriorBalanceIndex
   FunctionDefinition.getPriorSupplyIndex
   FunctionDefinition.isRewardToken
   FunctionDefinition._isRewardToken
   FunctionDefinition.deposit
   FunctionDefinition._writeCheckpoint
   FunctionDefinition._writeSupplyCheckpoint
   FunctionDefinition.withdraw
   FunctionDefinition.getReward
   FunctionDefinition.notifyRewardAmount
   FunctionDefinition.recoverERC20AndUpdateData
   FunctionDefinition.emergencyRecoverERC20
   FunctionDefinition.setVoter
   FunctionDefinition.setGaugeManager
   FunctionDefinition.setMinter
   FunctionDefinition.setAVM
   FunctionDefinition.setOwner

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

1: 
   Current order:
   EventDefinition.AuthorizedAccountAdded
   EventDefinition.AuthorizedAccountRemoved
   VariableDeclaration.entryPoint
   VariableDeclaration.plugin
   VariableDeclaration.tickSpacing
   VariableDeclaration.algebraPoolAPIStorage
   VariableDeclaration.algebraFeeRecipient
   VariableDeclaration.algebraFeeManager
   VariableDeclaration.algebraFeeShare
   VariableDeclaration.algebraFarmingProxyPluginFactory
   VariableDeclaration.algebraFactory
   VariableDeclaration.algebraPluginFactory
   VariableDeclaration.poolToPlugin
   VariableDeclaration.authorizedAccounts
   ModifierDefinition.onlyAuthorized
   FunctionDefinition.constructor
   FunctionDefinition.addAuthorizedAccount
   FunctionDefinition.removeAuthorizedAccount
   FunctionDefinition.createCustomPool
   FunctionDefinition.beforeCreatePoolHook
   FunctionDefinition.afterCreatePoolHook
   FunctionDefinition.setPluginForPool
   FunctionDefinition.setPlugin
   FunctionDefinition.setPluginConfig
   FunctionDefinition.setFee
   FunctionDefinition.setCommunityFee
   FunctionDefinition.setAlgebraFeeRecipient
   FunctionDefinition.setAlgebraFeeManager
   FunctionDefinition.setAlgebraFeeShare
   FunctionDefinition.setAlgebraFarmingProxyPluginFactory
   FunctionDefinition.setAlgebraFactory
   FunctionDefinition.setAlgebraPluginFactory
   
   Suggested order:
   VariableDeclaration.entryPoint
   VariableDeclaration.plugin
   VariableDeclaration.tickSpacing
   VariableDeclaration.algebraPoolAPIStorage
   VariableDeclaration.algebraFeeRecipient
   VariableDeclaration.algebraFeeManager
   VariableDeclaration.algebraFeeShare
   VariableDeclaration.algebraFarmingProxyPluginFactory
   VariableDeclaration.algebraFactory
   VariableDeclaration.algebraPluginFactory
   VariableDeclaration.poolToPlugin
   VariableDeclaration.authorizedAccounts
   EventDefinition.AuthorizedAccountAdded
   EventDefinition.AuthorizedAccountRemoved
   ModifierDefinition.onlyAuthorized
   FunctionDefinition.constructor
   FunctionDefinition.addAuthorizedAccount
   FunctionDefinition.removeAuthorizedAccount
   FunctionDefinition.createCustomPool
   FunctionDefinition.beforeCreatePoolHook
   FunctionDefinition.afterCreatePoolHook
   FunctionDefinition.setPluginForPool
   FunctionDefinition.setPlugin
   FunctionDefinition.setPluginConfig
   FunctionDefinition.setFee
   FunctionDefinition.setCommunityFee
   FunctionDefinition.setAlgebraFeeRecipient
   FunctionDefinition.setAlgebraFeeManager
   FunctionDefinition.setAlgebraFeeShare
   FunctionDefinition.setAlgebraFarmingProxyPluginFactory
   FunctionDefinition.setAlgebraFactory
   FunctionDefinition.setAlgebraPluginFactory

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

1: 
   Current order:
   FunctionDefinition.onReward
   FunctionDefinition.pendingTokens
   FunctionDefinition.TOKEN
   UsingForDirective.IERC20
   VariableDeclaration.rewardToken
   StructDefinition.UserInfo
   StructDefinition.PoolInfo
   VariableDeclaration.poolInfo
   VariableDeclaration.userInfo
   VariableDeclaration.lastDistributedTime
   VariableDeclaration.rewardPerSecond
   VariableDeclaration.distributePeriod
   VariableDeclaration.ACC_TOKEN_PRECISION
   VariableDeclaration.GAUGE
   EventDefinition.OnReward
   FunctionDefinition.constructor
   FunctionDefinition.onReward
   FunctionDefinition.pendingReward
   FunctionDefinition._pendingReward
   ModifierDefinition.onlyGauge
   FunctionDefinition.setDistributionRate
   FunctionDefinition.updatePool
   FunctionDefinition.recoverERC20
   FunctionDefinition._gauge
   
   Suggested order:
   UsingForDirective.IERC20
   VariableDeclaration.rewardToken
   VariableDeclaration.poolInfo
   VariableDeclaration.userInfo
   VariableDeclaration.lastDistributedTime
   VariableDeclaration.rewardPerSecond
   VariableDeclaration.distributePeriod
   VariableDeclaration.ACC_TOKEN_PRECISION
   VariableDeclaration.GAUGE
   StructDefinition.UserInfo
   StructDefinition.PoolInfo
   EventDefinition.OnReward
   ModifierDefinition.onlyGauge
   FunctionDefinition.onReward
   FunctionDefinition.pendingTokens
   FunctionDefinition.TOKEN
   FunctionDefinition.constructor
   FunctionDefinition.onReward
   FunctionDefinition.pendingReward
   FunctionDefinition._pendingReward
   FunctionDefinition.setDistributionRate
   FunctionDefinition.updatePool
   FunctionDefinition.recoverERC20
   FunctionDefinition._gauge

```

```solidity
File: ./contracts/GaugeManager.sol

1: 
   Current order:
   UsingForDirective.IERC20Upgradeable
   VariableDeclaration.pools
   VariableDeclaration.minter
   VariableDeclaration.index
   VariableDeclaration.base
   VariableDeclaration.bribefactory
   VariableDeclaration._ve
   VariableDeclaration.supplyIndex
   VariableDeclaration.claimable
   VariableDeclaration.gauges
   VariableDeclaration.gaugesDistributionTimestmap
   VariableDeclaration.poolForGauge
   VariableDeclaration.internal_bribes
   VariableDeclaration.external_bribes
   VariableDeclaration._factoriesData
   VariableDeclaration.permissionRegistry
   VariableDeclaration.voter
   VariableDeclaration.genesisManager
   VariableDeclaration.tokenHandler
   VariableDeclaration.blackGovernor
   VariableDeclaration.isGauge
   VariableDeclaration.isCLGauge
   VariableDeclaration.isAlive
   VariableDeclaration.farmingParam
   VariableDeclaration.avm
   VariableDeclaration.COMMUNITY_FEE_WITHDRAWER_ROLE
   VariableDeclaration.COMMUNITY_FEE_VAULT_ADMINISTRATOR
   EventDefinition.GaugeCreated
   EventDefinition.GaugeKilled
   EventDefinition.GaugeRevived
   EventDefinition.NotifyReward
   EventDefinition.DistributeReward
   EventDefinition.SetBribeFor
   EventDefinition.SetMinter
   EventDefinition.SetBribeFactory
   EventDefinition.SetGenesisManager
   EventDefinition.SetPermissionRegistry
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   ModifierDefinition.GaugeAdmin
   ModifierDefinition.Governance
   FunctionDefinition.setBribeFactory
   FunctionDefinition.setPermissionsRegistry
   FunctionDefinition.setVoter
   FunctionDefinition.setGenesisManager
   FunctionDefinition.getBlackGovernor
   FunctionDefinition.setBlackGovernor
   FunctionDefinition.createGauges
   FunctionDefinition.createGauge
   FunctionDefinition.createGaugeWithBonusReward
   FunctionDefinition._createGauge
   FunctionDefinition._saveBribeData
   FunctionDefinition._deployBribes
   FunctionDefinition.addressToString
   FunctionDefinition.setGaugeAsCommunityFeeReceiver
   FunctionDefinition.notifyRewardAmount
   FunctionDefinition.distributeFees
   FunctionDefinition.distributeFees
   FunctionDefinition._distributeFees
   FunctionDefinition.distributeAll
   FunctionDefinition.distribute
   FunctionDefinition.distribute
   FunctionDefinition._distribute
   FunctionDefinition._updateForAfterDistribution
   FunctionDefinition.killGauge
   FunctionDefinition.reviveGauge
   FunctionDefinition.setFarmingParam
   FunctionDefinition.setNewBribes
   FunctionDefinition.setInternalBribeFor
   FunctionDefinition.setExternalBribeFor
   FunctionDefinition._setInternalBribe
   FunctionDefinition._setExternalBribe
   FunctionDefinition.claimRewards
   FunctionDefinition.claimRewards
   FunctionDefinition.claimBribes
   FunctionDefinition.fetchInternalBribeFromPool
   FunctionDefinition.fetchExternalBribeFromPool
   FunctionDefinition.isGaugeAliveForPool
   FunctionDefinition.setMinter
   FunctionDefinition.addGaugeFactory
   FunctionDefinition.replaceGaugeFactory
   FunctionDefinition.removeGaugeFactory
   FunctionDefinition.addPairFactory
   FunctionDefinition.replacePairFactory
   FunctionDefinition.removePairFactory
   FunctionDefinition.setAVM
   FunctionDefinition.acceptAlgebraFeeChangeProposal
   
   Suggested order:
   UsingForDirective.IERC20Upgradeable
   VariableDeclaration.pools
   VariableDeclaration.minter
   VariableDeclaration.index
   VariableDeclaration.base
   VariableDeclaration.bribefactory
   VariableDeclaration._ve
   VariableDeclaration.supplyIndex
   VariableDeclaration.claimable
   VariableDeclaration.gauges
   VariableDeclaration.gaugesDistributionTimestmap
   VariableDeclaration.poolForGauge
   VariableDeclaration.internal_bribes
   VariableDeclaration.external_bribes
   VariableDeclaration._factoriesData
   VariableDeclaration.permissionRegistry
   VariableDeclaration.voter
   VariableDeclaration.genesisManager
   VariableDeclaration.tokenHandler
   VariableDeclaration.blackGovernor
   VariableDeclaration.isGauge
   VariableDeclaration.isCLGauge
   VariableDeclaration.isAlive
   VariableDeclaration.farmingParam
   VariableDeclaration.avm
   VariableDeclaration.COMMUNITY_FEE_WITHDRAWER_ROLE
   VariableDeclaration.COMMUNITY_FEE_VAULT_ADMINISTRATOR
   EventDefinition.GaugeCreated
   EventDefinition.GaugeKilled
   EventDefinition.GaugeRevived
   EventDefinition.NotifyReward
   EventDefinition.DistributeReward
   EventDefinition.SetBribeFor
   EventDefinition.SetMinter
   EventDefinition.SetBribeFactory
   EventDefinition.SetGenesisManager
   EventDefinition.SetPermissionRegistry
   ModifierDefinition.GaugeAdmin
   ModifierDefinition.Governance
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.setBribeFactory
   FunctionDefinition.setPermissionsRegistry
   FunctionDefinition.setVoter
   FunctionDefinition.setGenesisManager
   FunctionDefinition.getBlackGovernor
   FunctionDefinition.setBlackGovernor
   FunctionDefinition.createGauges
   FunctionDefinition.createGauge
   FunctionDefinition.createGaugeWithBonusReward
   FunctionDefinition._createGauge
   FunctionDefinition._saveBribeData
   FunctionDefinition._deployBribes
   FunctionDefinition.addressToString
   FunctionDefinition.setGaugeAsCommunityFeeReceiver
   FunctionDefinition.notifyRewardAmount
   FunctionDefinition.distributeFees
   FunctionDefinition.distributeFees
   FunctionDefinition._distributeFees
   FunctionDefinition.distributeAll
   FunctionDefinition.distribute
   FunctionDefinition.distribute
   FunctionDefinition._distribute
   FunctionDefinition._updateForAfterDistribution
   FunctionDefinition.killGauge
   FunctionDefinition.reviveGauge
   FunctionDefinition.setFarmingParam
   FunctionDefinition.setNewBribes
   FunctionDefinition.setInternalBribeFor
   FunctionDefinition.setExternalBribeFor
   FunctionDefinition._setInternalBribe
   FunctionDefinition._setExternalBribe
   FunctionDefinition.claimRewards
   FunctionDefinition.claimRewards
   FunctionDefinition.claimBribes
   FunctionDefinition.fetchInternalBribeFromPool
   FunctionDefinition.fetchExternalBribeFromPool
   FunctionDefinition.isGaugeAliveForPool
   FunctionDefinition.setMinter
   FunctionDefinition.addGaugeFactory
   FunctionDefinition.replaceGaugeFactory
   FunctionDefinition.removeGaugeFactory
   FunctionDefinition.addPairFactory
   FunctionDefinition.replacePairFactory
   FunctionDefinition.removePairFactory
   FunctionDefinition.setAVM
   FunctionDefinition.acceptAlgebraFeeChangeProposal

```

```solidity
File: ./contracts/GaugeV2.sol

1: 
   Current order:
   FunctionDefinition.onReward
   UsingForDirective.IERC20
   VariableDeclaration.isForPair
   VariableDeclaration.emergency
   VariableDeclaration.rewardToken
   VariableDeclaration.TOKEN
   VariableDeclaration.VE
   VariableDeclaration.DISTRIBUTION
   VariableDeclaration.gaugeRewarder
   VariableDeclaration.internal_bribe
   VariableDeclaration.external_bribe
   VariableDeclaration.DURATION
   VariableDeclaration._periodFinish
   VariableDeclaration.rewardRate
   VariableDeclaration.lastUpdateTime
   VariableDeclaration.rewardPerTokenStored
   VariableDeclaration.genesisPool
   VariableDeclaration.genesisManager
   VariableDeclaration.userRewardPerTokenPaid
   VariableDeclaration.rewards
   VariableDeclaration._totalSupply
   VariableDeclaration._balances
   VariableDeclaration.maturityTime
   EventDefinition.RewardAdded
   EventDefinition.Deposit
   EventDefinition.Withdraw
   EventDefinition.Harvest
   EventDefinition.DepositsForGenesis
   EventDefinition.ClaimFees
   EventDefinition.EmergencyActivated
   EventDefinition.EmergencyDeactivated
   ModifierDefinition.updateReward
   ModifierDefinition.onlyDistribution
   ModifierDefinition.onlyGenesisPool
   ModifierDefinition.onlyGenesisManager
   ModifierDefinition.isNotEmergency
   FunctionDefinition.constructor
   FunctionDefinition.setDistribution
   FunctionDefinition.setGaugeRewarder
   FunctionDefinition.setInternalBribe
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.totalSupply
   FunctionDefinition.balanceOf
   FunctionDefinition._balanceOf
   FunctionDefinition.lastTimeRewardApplicable
   FunctionDefinition.rewardPerToken
   FunctionDefinition.earned
   FunctionDefinition.rewardForDuration
   FunctionDefinition.periodFinish
   FunctionDefinition.depositsForGenesis
   FunctionDefinition._depositsForGenesis
   FunctionDefinition.depositAll
   FunctionDefinition.deposit
   FunctionDefinition._deposit
   FunctionDefinition.withdrawAll
   FunctionDefinition.withdraw
   FunctionDefinition._withdraw
   FunctionDefinition.emergencyWithdraw
   FunctionDefinition.emergencyWithdrawAmount
   FunctionDefinition._deductBalance
   FunctionDefinition.withdrawAllAndHarvest
   FunctionDefinition.getReward
   FunctionDefinition.getReward
   FunctionDefinition.setGenesisPool
   FunctionDefinition.notifyRewardAmount
   FunctionDefinition.claimFees
   FunctionDefinition._claimFees
   FunctionDefinition.setGenesisPoolManager
   
   Suggested order:
   UsingForDirective.IERC20
   VariableDeclaration.isForPair
   VariableDeclaration.emergency
   VariableDeclaration.rewardToken
   VariableDeclaration.TOKEN
   VariableDeclaration.VE
   VariableDeclaration.DISTRIBUTION
   VariableDeclaration.gaugeRewarder
   VariableDeclaration.internal_bribe
   VariableDeclaration.external_bribe
   VariableDeclaration.DURATION
   VariableDeclaration._periodFinish
   VariableDeclaration.rewardRate
   VariableDeclaration.lastUpdateTime
   VariableDeclaration.rewardPerTokenStored
   VariableDeclaration.genesisPool
   VariableDeclaration.genesisManager
   VariableDeclaration.userRewardPerTokenPaid
   VariableDeclaration.rewards
   VariableDeclaration._totalSupply
   VariableDeclaration._balances
   VariableDeclaration.maturityTime
   EventDefinition.RewardAdded
   EventDefinition.Deposit
   EventDefinition.Withdraw
   EventDefinition.Harvest
   EventDefinition.DepositsForGenesis
   EventDefinition.ClaimFees
   EventDefinition.EmergencyActivated
   EventDefinition.EmergencyDeactivated
   ModifierDefinition.updateReward
   ModifierDefinition.onlyDistribution
   ModifierDefinition.onlyGenesisPool
   ModifierDefinition.onlyGenesisManager
   ModifierDefinition.isNotEmergency
   FunctionDefinition.onReward
   FunctionDefinition.constructor
   FunctionDefinition.setDistribution
   FunctionDefinition.setGaugeRewarder
   FunctionDefinition.setInternalBribe
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.totalSupply
   FunctionDefinition.balanceOf
   FunctionDefinition._balanceOf
   FunctionDefinition.lastTimeRewardApplicable
   FunctionDefinition.rewardPerToken
   FunctionDefinition.earned
   FunctionDefinition.rewardForDuration
   FunctionDefinition.periodFinish
   FunctionDefinition.depositsForGenesis
   FunctionDefinition._depositsForGenesis
   FunctionDefinition.depositAll
   FunctionDefinition.deposit
   FunctionDefinition._deposit
   FunctionDefinition.withdrawAll
   FunctionDefinition.withdraw
   FunctionDefinition._withdraw
   FunctionDefinition.emergencyWithdraw
   FunctionDefinition.emergencyWithdrawAmount
   FunctionDefinition._deductBalance
   FunctionDefinition.withdrawAllAndHarvest
   FunctionDefinition.getReward
   FunctionDefinition.getReward
   FunctionDefinition.setGenesisPool
   FunctionDefinition.notifyRewardAmount
   FunctionDefinition.claimFees
   FunctionDefinition._claimFees
   FunctionDefinition.setGenesisPoolManager

```

```solidity
File: ./contracts/GenesisPoolManager.sol

1: 
   Current order:
   FunctionDefinition.isPair
   FunctionDefinition.getPair
   FunctionDefinition.createPair
   FunctionDefinition.setGenesisPool
   FunctionDefinition.setGenesisStatus
   VariableDeclaration.MIN_DURATION
   VariableDeclaration.MIN_THRESHOLD
   VariableDeclaration.MATURITY_TIME
   VariableDeclaration.epochController
   VariableDeclaration.permissionRegistory
   VariableDeclaration.router
   VariableDeclaration.pairFactory
   VariableDeclaration.gaugeManager
   VariableDeclaration.tokenHandler
   VariableDeclaration.genesisFactory
   VariableDeclaration.auctionFactory
   VariableDeclaration.WEEK
   VariableDeclaration.pre_epoch_period
   UsingForDirective.IERC20
   VariableDeclaration.whiteListedTokensToUser
   VariableDeclaration.nativeTokens
   VariableDeclaration.liveNativeTokens
   VariableDeclaration.liveNativeTokensIndex
   VariableDeclaration.isNativeToken
   EventDefinition.WhiteListedTokenToUser
   EventDefinition.DespositedToken
   ModifierDefinition.Governance
   FunctionDefinition._checkGovernance
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.check
   FunctionDefinition.whiteListUserAndToken
   FunctionDefinition.depositNativeToken
   FunctionDefinition.rejectGenesisPool
   FunctionDefinition.approveGenesisPool
   FunctionDefinition.depositToken
   FunctionDefinition.checkAtEpochFlip
   FunctionDefinition._preLaunchPool
   FunctionDefinition._launchPool
   FunctionDefinition.checkBeforeEpochFlip
   FunctionDefinition._removeLiveToken
   FunctionDefinition.setAuction
   FunctionDefinition.getAllNaitveTokens
   FunctionDefinition.getLiveNaitveTokens
   FunctionDefinition.setEpochController
   FunctionDefinition.setMinimumDuration
   FunctionDefinition.setMinimumThreshold
   FunctionDefinition.setMaturityTime
   FunctionDefinition.setMaturityTime
   FunctionDefinition.setGenesisStartTime
   FunctionDefinition.setRouter
   
   Suggested order:
   UsingForDirective.IERC20
   VariableDeclaration.MIN_DURATION
   VariableDeclaration.MIN_THRESHOLD
   VariableDeclaration.MATURITY_TIME
   VariableDeclaration.epochController
   VariableDeclaration.permissionRegistory
   VariableDeclaration.router
   VariableDeclaration.pairFactory
   VariableDeclaration.gaugeManager
   VariableDeclaration.tokenHandler
   VariableDeclaration.genesisFactory
   VariableDeclaration.auctionFactory
   VariableDeclaration.WEEK
   VariableDeclaration.pre_epoch_period
   VariableDeclaration.whiteListedTokensToUser
   VariableDeclaration.nativeTokens
   VariableDeclaration.liveNativeTokens
   VariableDeclaration.liveNativeTokensIndex
   VariableDeclaration.isNativeToken
   EventDefinition.WhiteListedTokenToUser
   EventDefinition.DespositedToken
   ModifierDefinition.Governance
   FunctionDefinition.isPair
   FunctionDefinition.getPair
   FunctionDefinition.createPair
   FunctionDefinition.setGenesisPool
   FunctionDefinition.setGenesisStatus
   FunctionDefinition._checkGovernance
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.check
   FunctionDefinition.whiteListUserAndToken
   FunctionDefinition.depositNativeToken
   FunctionDefinition.rejectGenesisPool
   FunctionDefinition.approveGenesisPool
   FunctionDefinition.depositToken
   FunctionDefinition.checkAtEpochFlip
   FunctionDefinition._preLaunchPool
   FunctionDefinition._launchPool
   FunctionDefinition.checkBeforeEpochFlip
   FunctionDefinition._removeLiveToken
   FunctionDefinition.setAuction
   FunctionDefinition.getAllNaitveTokens
   FunctionDefinition.getLiveNaitveTokens
   FunctionDefinition.setEpochController
   FunctionDefinition.setMinimumDuration
   FunctionDefinition.setMinimumThreshold
   FunctionDefinition.setMaturityTime
   FunctionDefinition.setMaturityTime
   FunctionDefinition.setGenesisStartTime
   FunctionDefinition.setRouter

```

```solidity
File: ./contracts/GlobalRouter.sol

1: 
   Current order:
   StructDefinition.Route
   FunctionDefinition.getAmountOutStable
   FunctionDefinition.getAmountOutVolatile
   FunctionDefinition.getAmountOut
   FunctionDefinition.getAmountsOut
   FunctionDefinition.getAmountInStable
   FunctionDefinition.pairFor
   FunctionDefinition.sortTokens
   FunctionDefinition.allPairsLength
   FunctionDefinition.isPair
   FunctionDefinition.pairCodeHash
   FunctionDefinition.getPair
   FunctionDefinition.createPair
   FunctionDefinition.transferFrom
   FunctionDefinition.permit
   FunctionDefinition.swap
   FunctionDefinition.burn
   FunctionDefinition.mint
   FunctionDefinition.getReserves
   FunctionDefinition.getAmountOut
   FunctionDefinition.totalSupply
   FunctionDefinition.transfer
   FunctionDefinition.decimals
   FunctionDefinition.symbol
   FunctionDefinition.balanceOf
   FunctionDefinition.transferFrom
   FunctionDefinition.approve
   FunctionDefinition.getFee
   FunctionDefinition.MAX_REFERRAL_FEE
   FunctionDefinition.min
   FunctionDefinition.sqrt
   FunctionDefinition.sub
   FunctionDefinition.deposit
   FunctionDefinition.transfer
   FunctionDefinition.withdraw
   StructDefinition.ExactInputSingleParams
   FunctionDefinition.exactInputSingle
   StructDefinition.ExactInputParams
   FunctionDefinition.exactInput
   StructDefinition.ExactOutputSingleParams
   FunctionDefinition.exactOutputSingle
   StructDefinition.ExactOutputParams
   FunctionDefinition.exactOutput
   FunctionDefinition.exactInputSingleSupportingFeeOnTransferTokens
   VariableDeclaration.tradeHelper
   ModifierDefinition.ensure
   FunctionDefinition.constructor
   FunctionDefinition._swap
   FunctionDefinition.swapExactTokensForTokens
   FunctionDefinition.exactInput
   FunctionDefinition.getAmountOutStable
   FunctionDefinition.getAmountOutVolatile
   FunctionDefinition.getAmountOut
   FunctionDefinition.getAmountsOut
   FunctionDefinition.getAmountInStable
   FunctionDefinition.pairFor
   FunctionDefinition.sortTokens
   FunctionDefinition._safeTransferFrom
   FunctionDefinition._safeTransferETH
   FunctionDefinition._safeTransfer
   
   Suggested order:
   VariableDeclaration.tradeHelper
   StructDefinition.Route
   StructDefinition.ExactInputSingleParams
   StructDefinition.ExactInputParams
   StructDefinition.ExactOutputSingleParams
   StructDefinition.ExactOutputParams
   ModifierDefinition.ensure
   FunctionDefinition.getAmountOutStable
   FunctionDefinition.getAmountOutVolatile
   FunctionDefinition.getAmountOut
   FunctionDefinition.getAmountsOut
   FunctionDefinition.getAmountInStable
   FunctionDefinition.pairFor
   FunctionDefinition.sortTokens
   FunctionDefinition.allPairsLength
   FunctionDefinition.isPair
   FunctionDefinition.pairCodeHash
   FunctionDefinition.getPair
   FunctionDefinition.createPair
   FunctionDefinition.transferFrom
   FunctionDefinition.permit
   FunctionDefinition.swap
   FunctionDefinition.burn
   FunctionDefinition.mint
   FunctionDefinition.getReserves
   FunctionDefinition.getAmountOut
   FunctionDefinition.totalSupply
   FunctionDefinition.transfer
   FunctionDefinition.decimals
   FunctionDefinition.symbol
   FunctionDefinition.balanceOf
   FunctionDefinition.transferFrom
   FunctionDefinition.approve
   FunctionDefinition.getFee
   FunctionDefinition.MAX_REFERRAL_FEE
   FunctionDefinition.min
   FunctionDefinition.sqrt
   FunctionDefinition.sub
   FunctionDefinition.deposit
   FunctionDefinition.transfer
   FunctionDefinition.withdraw
   FunctionDefinition.exactInputSingle
   FunctionDefinition.exactInput
   FunctionDefinition.exactOutputSingle
   FunctionDefinition.exactOutput
   FunctionDefinition.exactInputSingleSupportingFeeOnTransferTokens
   FunctionDefinition.constructor
   FunctionDefinition._swap
   FunctionDefinition.swapExactTokensForTokens
   FunctionDefinition.exactInput
   FunctionDefinition.getAmountOutStable
   FunctionDefinition.getAmountOutVolatile
   FunctionDefinition.getAmountOut
   FunctionDefinition.getAmountsOut
   FunctionDefinition.getAmountInStable
   FunctionDefinition.pairFor
   FunctionDefinition.sortTokens
   FunctionDefinition._safeTransferFrom
   FunctionDefinition._safeTransferETH
   FunctionDefinition._safeTransfer

```

```solidity
File: ./contracts/Pair.sol

1: 
   Current order:
   VariableDeclaration.name
   VariableDeclaration.symbol
   VariableDeclaration.decimals
   VariableDeclaration.stable
   VariableDeclaration.totalSupply
   VariableDeclaration.allowance
   VariableDeclaration.balanceOf
   VariableDeclaration.DOMAIN_SEPARATOR
   VariableDeclaration.PERMIT_TYPEHASH
   VariableDeclaration.nonces
   VariableDeclaration.MINIMUM_LIQUIDITY
   VariableDeclaration.token0
   VariableDeclaration.token1
   VariableDeclaration.fees
   VariableDeclaration.factory
   StructDefinition.Observation
   VariableDeclaration.periodSize
   VariableDeclaration.observations
   VariableDeclaration.decimals0
   VariableDeclaration.decimals1
   VariableDeclaration.reserve0
   VariableDeclaration.reserve1
   VariableDeclaration.blockTimestampLast
   VariableDeclaration.reserve0CumulativeLast
   VariableDeclaration.reserve1CumulativeLast
   VariableDeclaration.index0
   VariableDeclaration.index1
   VariableDeclaration.supplyIndex0
   VariableDeclaration.supplyIndex1
   VariableDeclaration.claimable0
   VariableDeclaration.claimable1
   EventDefinition.Fees
   EventDefinition.Mint
   EventDefinition.Burn
   EventDefinition.Swap
   EventDefinition.Sync
   EventDefinition.Claim
   EventDefinition.Transfer
   EventDefinition.Approval
   FunctionDefinition.constructor
   VariableDeclaration._unlocked
   ModifierDefinition.lock
   FunctionDefinition.observationLength
   FunctionDefinition.lastObservation
   FunctionDefinition.metadata
   FunctionDefinition.tokens
   FunctionDefinition.isStable
   FunctionDefinition.claimFees
   FunctionDefinition.claimStakingFees
   FunctionDefinition._update0
   FunctionDefinition._update1
   FunctionDefinition._updateFor
   FunctionDefinition.getReserves
   FunctionDefinition._update
   FunctionDefinition.currentCumulativePrices
   FunctionDefinition.current
   FunctionDefinition.quote
   FunctionDefinition.prices
   FunctionDefinition.sample
   FunctionDefinition.mint
   FunctionDefinition.burn
   FunctionDefinition.swap
   FunctionDefinition.skim
   FunctionDefinition.sync
   FunctionDefinition._f
   FunctionDefinition._d
   FunctionDefinition._get_y
   FunctionDefinition.getAmountOut
   FunctionDefinition._getAmountOut
   FunctionDefinition._k
   FunctionDefinition._mint
   FunctionDefinition._burn
   FunctionDefinition.approve
   FunctionDefinition.permit
   FunctionDefinition.transfer
   FunctionDefinition.transferFrom
   FunctionDefinition._transferTokens
   FunctionDefinition._safeTransfer
   FunctionDefinition._safeApprove
   
   Suggested order:
   VariableDeclaration.name
   VariableDeclaration.symbol
   VariableDeclaration.decimals
   VariableDeclaration.stable
   VariableDeclaration.totalSupply
   VariableDeclaration.allowance
   VariableDeclaration.balanceOf
   VariableDeclaration.DOMAIN_SEPARATOR
   VariableDeclaration.PERMIT_TYPEHASH
   VariableDeclaration.nonces
   VariableDeclaration.MINIMUM_LIQUIDITY
   VariableDeclaration.token0
   VariableDeclaration.token1
   VariableDeclaration.fees
   VariableDeclaration.factory
   VariableDeclaration.periodSize
   VariableDeclaration.observations
   VariableDeclaration.decimals0
   VariableDeclaration.decimals1
   VariableDeclaration.reserve0
   VariableDeclaration.reserve1
   VariableDeclaration.blockTimestampLast
   VariableDeclaration.reserve0CumulativeLast
   VariableDeclaration.reserve1CumulativeLast
   VariableDeclaration.index0
   VariableDeclaration.index1
   VariableDeclaration.supplyIndex0
   VariableDeclaration.supplyIndex1
   VariableDeclaration.claimable0
   VariableDeclaration.claimable1
   VariableDeclaration._unlocked
   StructDefinition.Observation
   EventDefinition.Fees
   EventDefinition.Mint
   EventDefinition.Burn
   EventDefinition.Swap
   EventDefinition.Sync
   EventDefinition.Claim
   EventDefinition.Transfer
   EventDefinition.Approval
   ModifierDefinition.lock
   FunctionDefinition.constructor
   FunctionDefinition.observationLength
   FunctionDefinition.lastObservation
   FunctionDefinition.metadata
   FunctionDefinition.tokens
   FunctionDefinition.isStable
   FunctionDefinition.claimFees
   FunctionDefinition.claimStakingFees
   FunctionDefinition._update0
   FunctionDefinition._update1
   FunctionDefinition._updateFor
   FunctionDefinition.getReserves
   FunctionDefinition._update
   FunctionDefinition.currentCumulativePrices
   FunctionDefinition.current
   FunctionDefinition.quote
   FunctionDefinition.prices
   FunctionDefinition.sample
   FunctionDefinition.mint
   FunctionDefinition.burn
   FunctionDefinition.swap
   FunctionDefinition.skim
   FunctionDefinition.sync
   FunctionDefinition._f
   FunctionDefinition._d
   FunctionDefinition._get_y
   FunctionDefinition.getAmountOut
   FunctionDefinition._getAmountOut
   FunctionDefinition._k
   FunctionDefinition._mint
   FunctionDefinition._burn
   FunctionDefinition.approve
   FunctionDefinition.permit
   FunctionDefinition.transfer
   FunctionDefinition.transferFrom
   FunctionDefinition._transferTokens
   FunctionDefinition._safeTransfer
   FunctionDefinition._safeApprove

```

```solidity
File: ./contracts/PermissionsRegistry.sol

1: 
   Current order:
   VariableDeclaration.blackMultisig
   VariableDeclaration.blackTeamMultisig
   VariableDeclaration.emergencyCouncil
   VariableDeclaration.hasRole
   VariableDeclaration._checkRole
   VariableDeclaration._roleToAddresses
   VariableDeclaration._addressToRoles
   VariableDeclaration._roles
   EventDefinition.RoleAdded
   EventDefinition.RoleRemoved
   EventDefinition.RoleSetFor
   EventDefinition.RoleRemovedFor
   EventDefinition.SetEmergencyCouncil
   EventDefinition.SetBlackTeamMultisig
   EventDefinition.SetBlackMultisig
   FunctionDefinition.constructor
   ModifierDefinition.onlyBlackMultisig
   FunctionDefinition.addRole
   FunctionDefinition.removeRole
   FunctionDefinition.setRoleFor
   FunctionDefinition.removeRoleFrom
   FunctionDefinition.rolesToString
   FunctionDefinition.roles
   FunctionDefinition.rolesLength
   FunctionDefinition.roleToAddresses
   FunctionDefinition.addressToRole
   FunctionDefinition.helper_stringToBytes
   FunctionDefinition.helper_bytesToString
   FunctionDefinition.setEmergencyCouncil
   FunctionDefinition.setBlackTeamMultisig
   FunctionDefinition.setBlackMultisig
   
   Suggested order:
   VariableDeclaration.blackMultisig
   VariableDeclaration.blackTeamMultisig
   VariableDeclaration.emergencyCouncil
   VariableDeclaration.hasRole
   VariableDeclaration._checkRole
   VariableDeclaration._roleToAddresses
   VariableDeclaration._addressToRoles
   VariableDeclaration._roles
   EventDefinition.RoleAdded
   EventDefinition.RoleRemoved
   EventDefinition.RoleSetFor
   EventDefinition.RoleRemovedFor
   EventDefinition.SetEmergencyCouncil
   EventDefinition.SetBlackTeamMultisig
   EventDefinition.SetBlackMultisig
   ModifierDefinition.onlyBlackMultisig
   FunctionDefinition.constructor
   FunctionDefinition.addRole
   FunctionDefinition.removeRole
   FunctionDefinition.setRoleFor
   FunctionDefinition.removeRoleFrom
   FunctionDefinition.rolesToString
   FunctionDefinition.roles
   FunctionDefinition.rolesLength
   FunctionDefinition.roleToAddresses
   FunctionDefinition.addressToRole
   FunctionDefinition.helper_stringToBytes
   FunctionDefinition.helper_bytesToString
   FunctionDefinition.setEmergencyCouncil
   FunctionDefinition.setBlackTeamMultisig
   FunctionDefinition.setBlackMultisig

```

```solidity
File: ./contracts/RewardsDistributor.sol

1: 
   Current order:
   EventDefinition.CheckpointToken
   EventDefinition.Claimed
   VariableDeclaration.WEEK
   VariableDeclaration.start_time
   VariableDeclaration.time_cursor
   VariableDeclaration.time_cursor_of
   VariableDeclaration.last_token_time
   VariableDeclaration.tokens_per_week
   VariableDeclaration.token_last_balance
   VariableDeclaration.ve_supply
   VariableDeclaration.owner
   VariableDeclaration.voting_escrow
   VariableDeclaration.token
   VariableDeclaration.depositor
   VariableDeclaration.avm
   FunctionDefinition.constructor
   ModifierDefinition.onlyOwner
   FunctionDefinition.timestamp
   FunctionDefinition._checkpoint_token
   FunctionDefinition.checkpoint_token
   FunctionDefinition._find_timestamp_user_epoch
   FunctionDefinition._claim
   FunctionDefinition._claimable
   FunctionDefinition.claimable
   FunctionDefinition.claim
   FunctionDefinition.claim_many
   FunctionDefinition.setDepositor
   FunctionDefinition.setOwner
   FunctionDefinition.withdrawERC20
   FunctionDefinition.setAVM
   
   Suggested order:
   VariableDeclaration.WEEK
   VariableDeclaration.start_time
   VariableDeclaration.time_cursor
   VariableDeclaration.time_cursor_of
   VariableDeclaration.last_token_time
   VariableDeclaration.tokens_per_week
   VariableDeclaration.token_last_balance
   VariableDeclaration.ve_supply
   VariableDeclaration.owner
   VariableDeclaration.voting_escrow
   VariableDeclaration.token
   VariableDeclaration.depositor
   VariableDeclaration.avm
   EventDefinition.CheckpointToken
   EventDefinition.Claimed
   ModifierDefinition.onlyOwner
   FunctionDefinition.constructor
   FunctionDefinition.timestamp
   FunctionDefinition._checkpoint_token
   FunctionDefinition.checkpoint_token
   FunctionDefinition._find_timestamp_user_epoch
   FunctionDefinition._claim
   FunctionDefinition._claimable
   FunctionDefinition.claimable
   FunctionDefinition.claim
   FunctionDefinition.claim_many
   FunctionDefinition.setDepositor
   FunctionDefinition.setOwner
   FunctionDefinition.withdrawERC20
   FunctionDefinition.setAVM

```

```solidity
File: ./contracts/RouterV2.sol

1: 
   Current order:
   FunctionDefinition.allPairsLength
   FunctionDefinition.isPair
   FunctionDefinition.getPair
   FunctionDefinition.createPair
   FunctionDefinition.isGenesis
   FunctionDefinition.transferFrom
   FunctionDefinition.permit
   FunctionDefinition.swap
   FunctionDefinition.burn
   FunctionDefinition.mint
   FunctionDefinition.getReserves
   FunctionDefinition.getAmountOut
   FunctionDefinition.totalSupply
   FunctionDefinition.totalSupply
   FunctionDefinition.transfer
   FunctionDefinition.decimals
   FunctionDefinition.symbol
   FunctionDefinition.balanceOf
   FunctionDefinition.transferFrom
   FunctionDefinition.approve
   FunctionDefinition.getFee
   FunctionDefinition.getPair
   FunctionDefinition.MAX_REFERRAL_FEE
   FunctionDefinition.min
   FunctionDefinition.sqrt
   FunctionDefinition.sub
   FunctionDefinition.deposit
   FunctionDefinition.transfer
   FunctionDefinition.withdraw
   UsingForDirective.Math
   StructDefinition.route
   StructDefinition.PairSwapMetadata
   VariableDeclaration.factory
   VariableDeclaration.wETH
   VariableDeclaration.MINIMUM_LIQUIDITY
   VariableDeclaration.swapRouter
   VariableDeclaration.owner
   VariableDeclaration.algebraFactory
   VariableDeclaration.quoterV2
   VariableDeclaration.algebraPoolAPIStorage
   EventDefinition.Swap
   ModifierDefinition.ensure
   FunctionDefinition.constructor
   FunctionDefinition.receive
   FunctionDefinition._k
   FunctionDefinition.sortTokens
   FunctionDefinition.pairFor
   FunctionDefinition.quoteLiquidity
   FunctionDefinition.getReserves
   FunctionDefinition.getAmountOut
   FunctionDefinition.getPoolAmountOut
   FunctionDefinition._swapRatio
   FunctionDefinition.getAmountsOut
   FunctionDefinition.quoteAddLiquidity
   FunctionDefinition.quoteRemoveLiquidity
   FunctionDefinition._addLiquidity
   FunctionDefinition.addLiquidity
   FunctionDefinition.addLiquidityETH
   FunctionDefinition.removeLiquidity
   FunctionDefinition.removeLiquidityETH
   FunctionDefinition.removeLiquidityWithPermit
   FunctionDefinition.removeLiquidityETHWithPermit
   FunctionDefinition._swap
   FunctionDefinition.swapExactTokensForTokensSimple
   FunctionDefinition.swapExactTokensForTokens
   FunctionDefinition.swapExactETHForTokens
   FunctionDefinition.swapExactTokensForETH
   FunctionDefinition.UNSAFE_swapExactTokensForTokens
   FunctionDefinition._safeTransferETH
   FunctionDefinition._safeTransfer
   FunctionDefinition._safeTransferFrom
   FunctionDefinition.removeLiquidityETHSupportingFeeOnTransferTokens
   FunctionDefinition.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens
   FunctionDefinition._swapSupportingFeeOnTransferTokens
   FunctionDefinition.swapExactTokensForTokensSupportingFeeOnTransferTokens
   FunctionDefinition.swapExactETHForTokensSupportingFeeOnTransferTokens
   FunctionDefinition.swapExactTokensForETHSupportingFeeOnTransferTokens
   FunctionDefinition.setSwapRouter
   FunctionDefinition.setAlgebraFactory
   FunctionDefinition.setQuoterV2
   FunctionDefinition.setAlgebraPoolAPI
   
   Suggested order:
   UsingForDirective.Math
   VariableDeclaration.factory
   VariableDeclaration.wETH
   VariableDeclaration.MINIMUM_LIQUIDITY
   VariableDeclaration.swapRouter
   VariableDeclaration.owner
   VariableDeclaration.algebraFactory
   VariableDeclaration.quoterV2
   VariableDeclaration.algebraPoolAPIStorage
   StructDefinition.route
   StructDefinition.PairSwapMetadata
   EventDefinition.Swap
   ModifierDefinition.ensure
   FunctionDefinition.allPairsLength
   FunctionDefinition.isPair
   FunctionDefinition.getPair
   FunctionDefinition.createPair
   FunctionDefinition.isGenesis
   FunctionDefinition.transferFrom
   FunctionDefinition.permit
   FunctionDefinition.swap
   FunctionDefinition.burn
   FunctionDefinition.mint
   FunctionDefinition.getReserves
   FunctionDefinition.getAmountOut
   FunctionDefinition.totalSupply
   FunctionDefinition.totalSupply
   FunctionDefinition.transfer
   FunctionDefinition.decimals
   FunctionDefinition.symbol
   FunctionDefinition.balanceOf
   FunctionDefinition.transferFrom
   FunctionDefinition.approve
   FunctionDefinition.getFee
   FunctionDefinition.getPair
   FunctionDefinition.MAX_REFERRAL_FEE
   FunctionDefinition.min
   FunctionDefinition.sqrt
   FunctionDefinition.sub
   FunctionDefinition.deposit
   FunctionDefinition.transfer
   FunctionDefinition.withdraw
   FunctionDefinition.constructor
   FunctionDefinition.receive
   FunctionDefinition._k
   FunctionDefinition.sortTokens
   FunctionDefinition.pairFor
   FunctionDefinition.quoteLiquidity
   FunctionDefinition.getReserves
   FunctionDefinition.getAmountOut
   FunctionDefinition.getPoolAmountOut
   FunctionDefinition._swapRatio
   FunctionDefinition.getAmountsOut
   FunctionDefinition.quoteAddLiquidity
   FunctionDefinition.quoteRemoveLiquidity
   FunctionDefinition._addLiquidity
   FunctionDefinition.addLiquidity
   FunctionDefinition.addLiquidityETH
   FunctionDefinition.removeLiquidity
   FunctionDefinition.removeLiquidityETH
   FunctionDefinition.removeLiquidityWithPermit
   FunctionDefinition.removeLiquidityETHWithPermit
   FunctionDefinition._swap
   FunctionDefinition.swapExactTokensForTokensSimple
   FunctionDefinition.swapExactTokensForTokens
   FunctionDefinition.swapExactETHForTokens
   FunctionDefinition.swapExactTokensForETH
   FunctionDefinition.UNSAFE_swapExactTokensForTokens
   FunctionDefinition._safeTransferETH
   FunctionDefinition._safeTransfer
   FunctionDefinition._safeTransferFrom
   FunctionDefinition.removeLiquidityETHSupportingFeeOnTransferTokens
   FunctionDefinition.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens
   FunctionDefinition._swapSupportingFeeOnTransferTokens
   FunctionDefinition.swapExactTokensForTokensSupportingFeeOnTransferTokens
   FunctionDefinition.swapExactETHForTokensSupportingFeeOnTransferTokens
   FunctionDefinition.swapExactTokensForETHSupportingFeeOnTransferTokens
   FunctionDefinition.setSwapRouter
   FunctionDefinition.setAlgebraFactory
   FunctionDefinition.setQuoterV2
   FunctionDefinition.setAlgebraPoolAPI

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

1: 
   Current order:
   VariableDeclaration.voterV3
   VariableDeclaration.avm
   VariableDeclaration.topNPools
   VariableDeclaration.topN
   VariableDeclaration.executor
   EventDefinition.TopNPoolsUpdated
   EventDefinition.TopNUpdated
   EventDefinition.AVMSet
   FunctionDefinition.constructor
   ModifierDefinition.onlyAVM
   ModifierDefinition.onlyExecutor
   ModifierDefinition.onlyOwnerOrExecutor
   FunctionDefinition.setTopNPools
   FunctionDefinition.setTopN
   FunctionDefinition.getTopNPools
   FunctionDefinition.setAVM
   FunctionDefinition.setExecutor
   
   Suggested order:
   VariableDeclaration.voterV3
   VariableDeclaration.avm
   VariableDeclaration.topNPools
   VariableDeclaration.topN
   VariableDeclaration.executor
   EventDefinition.TopNPoolsUpdated
   EventDefinition.TopNUpdated
   EventDefinition.AVMSet
   ModifierDefinition.onlyAVM
   ModifierDefinition.onlyExecutor
   ModifierDefinition.onlyOwnerOrExecutor
   FunctionDefinition.constructor
   FunctionDefinition.setTopNPools
   FunctionDefinition.setTopN
   FunctionDefinition.getTopNPools
   FunctionDefinition.setAVM
   FunctionDefinition.setExecutor

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

1: 
   Current order:
   VariableDeclaration.topN
   VariableDeclaration.voteWeights
   VariableDeclaration.avm
   VariableDeclaration.executor
   EventDefinition.TopNUpdated
   EventDefinition.VoteWeightsUpdated
   EventDefinition.AVMSet
   EventDefinition.ExecutorUpdated
   FunctionDefinition.constructor
   ModifierDefinition.onlyAVM
   ModifierDefinition.onlyExecutor
   ModifierDefinition.onlyOwnerOrExecutor
   FunctionDefinition.getVoteWeights
   FunctionDefinition.setVoteWeights
   FunctionDefinition.setAVM
   FunctionDefinition.setTopN
   FunctionDefinition.setExecutor
   
   Suggested order:
   VariableDeclaration.topN
   VariableDeclaration.voteWeights
   VariableDeclaration.avm
   VariableDeclaration.executor
   EventDefinition.TopNUpdated
   EventDefinition.VoteWeightsUpdated
   EventDefinition.AVMSet
   EventDefinition.ExecutorUpdated
   ModifierDefinition.onlyAVM
   ModifierDefinition.onlyExecutor
   ModifierDefinition.onlyOwnerOrExecutor
   FunctionDefinition.constructor
   FunctionDefinition.getVoteWeights
   FunctionDefinition.setVoteWeights
   FunctionDefinition.setAVM
   FunctionDefinition.setTopN
   FunctionDefinition.setExecutor

```

```solidity
File: ./contracts/VotingEscrow.sol

1: 
   Current order:
   EnumDefinition.DepositType
   EventDefinition.Deposit
   EventDefinition.Merge
   EventDefinition.Split
   EventDefinition.MetadataUpdate
   EventDefinition.BatchMetadataUpdate
   EventDefinition.Withdraw
   EventDefinition.LockPermanent
   EventDefinition.UnlockPermanent
   EventDefinition.Supply
   VariableDeclaration.token
   VariableDeclaration.voter
   VariableDeclaration.team
   VariableDeclaration.artProxy
   VariableDeclaration.avm
   VariableDeclaration.SMNFT_BONUS
   VariableDeclaration.PRECISISON
   VariableDeclaration.supportedInterfaces
   VariableDeclaration.ERC165_INTERFACE_ID
   VariableDeclaration.ERC721_INTERFACE_ID
   VariableDeclaration.ERC721_METADATA_INTERFACE_ID
   VariableDeclaration.tokenId
   VariableDeclaration.WEEK
   VariableDeclaration.MAXTIME
   VariableDeclaration.iMAXTIME
   VariableDeclaration._black
   VariableDeclaration.cpData
   VariableDeclaration.votingBalanceLogicData
   FunctionDefinition.constructor
   VariableDeclaration._not_entered
   VariableDeclaration._entered
   VariableDeclaration._entered_state
   ModifierDefinition.nonreentrant
   VariableDeclaration.name
   VariableDeclaration.symbol
   VariableDeclaration.version
   VariableDeclaration.decimals
   FunctionDefinition.setTeam
   FunctionDefinition.setArtProxy
   FunctionDefinition.tokenURI
   VariableDeclaration.idToOwner
   VariableDeclaration.ownerToNFTokenCount
   FunctionDefinition.ownerOf
   FunctionDefinition.ownerToNFTokenCountFn
   FunctionDefinition._balance
   FunctionDefinition.balanceOf
   VariableDeclaration.idToApprovals
   VariableDeclaration.ownerToOperators
   VariableDeclaration.ownership_change
   FunctionDefinition.getApproved
   FunctionDefinition.isApprovedForAll
   FunctionDefinition.approve
   FunctionDefinition.setApprovalForAll
   FunctionDefinition._clearApproval
   FunctionDefinition._isApprovedOrOwner
   FunctionDefinition.isApprovedOrOwner
   FunctionDefinition._transferFrom
   FunctionDefinition.transferFrom
   FunctionDefinition.safeTransferFrom
   FunctionDefinition._isContract
   FunctionDefinition.safeTransferFrom
   FunctionDefinition.supportsInterface
   VariableDeclaration.ownerToNFTokenIdList
   VariableDeclaration.tokenToOwnerIndex
   FunctionDefinition.tokenOfOwnerByIndex
   FunctionDefinition._addTokenToOwnerList
   FunctionDefinition._addTokenTo
   FunctionDefinition._mint
   FunctionDefinition._removeTokenFromOwnerList
   FunctionDefinition._removeTokenFrom
   FunctionDefinition._burn
   VariableDeclaration.locked
   VariableDeclaration.permanentLockBalance
   VariableDeclaration.smNFTBalance
   VariableDeclaration.epoch
   VariableDeclaration.slope_changes
   VariableDeclaration.supply
   VariableDeclaration.canSplit
   VariableDeclaration.MULTIPLIER
   FunctionDefinition.get_last_user_slope
   FunctionDefinition.user_point_history
   FunctionDefinition.point_history
   FunctionDefinition.user_point_epoch
   FunctionDefinition._checkpoint
   FunctionDefinition._deposit_for
   FunctionDefinition.checkpoint
   FunctionDefinition.deposit_for
   FunctionDefinition._create_lock
   FunctionDefinition.create_lock
   FunctionDefinition.create_lock_for
   FunctionDefinition.increase_amount
   FunctionDefinition.increase_unlock_time
   FunctionDefinition.updateToSMNFT
   FunctionDefinition.withdraw
   FunctionDefinition.lockPermanent
   FunctionDefinition.unlockPermanent
   FunctionDefinition.balanceOfNFT
   FunctionDefinition.balanceOfNFTAt
   FunctionDefinition.balanceOfAtNFT
   FunctionDefinition.totalSupplyAt
   FunctionDefinition.totalSupply
   FunctionDefinition.totalSupplyAtT
   VariableDeclaration.attachments
   VariableDeclaration.voted
   FunctionDefinition.setVoter
   FunctionDefinition.setAVM
   FunctionDefinition.voting
   FunctionDefinition.abstain
   FunctionDefinition.attach
   FunctionDefinition.detach
   FunctionDefinition.merge
   FunctionDefinition.split
   FunctionDefinition._createSplitNFT
   FunctionDefinition.toggleSplit
   VariableDeclaration.DOMAIN_TYPEHASH
   VariableDeclaration.DELEGATION_TYPEHASH
   VariableDeclaration._delegates
   VariableDeclaration.nonces
   FunctionDefinition.delegates
   FunctionDefinition.getVotes
   FunctionDefinition.getPastVotes
   FunctionDefinition.getsmNFTPastVotes
   FunctionDefinition.getPastTotalSupply
   FunctionDefinition.getsmNFTPastTotalSupply
   FunctionDefinition._delegate
   FunctionDefinition.delegate
   FunctionDefinition.delegateBySig
   FunctionDefinition.setSmNFTBonus
   FunctionDefinition.calculate_sm_nft_bonus
   FunctionDefinition.calculate_original_sm_nft_amount
   
   Suggested order:
   VariableDeclaration.token
   VariableDeclaration.voter
   VariableDeclaration.team
   VariableDeclaration.artProxy
   VariableDeclaration.avm
   VariableDeclaration.SMNFT_BONUS
   VariableDeclaration.PRECISISON
   VariableDeclaration.supportedInterfaces
   VariableDeclaration.ERC165_INTERFACE_ID
   VariableDeclaration.ERC721_INTERFACE_ID
   VariableDeclaration.ERC721_METADATA_INTERFACE_ID
   VariableDeclaration.tokenId
   VariableDeclaration.WEEK
   VariableDeclaration.MAXTIME
   VariableDeclaration.iMAXTIME
   VariableDeclaration._black
   VariableDeclaration.cpData
   VariableDeclaration.votingBalanceLogicData
   VariableDeclaration._not_entered
   VariableDeclaration._entered
   VariableDeclaration._entered_state
   VariableDeclaration.name
   VariableDeclaration.symbol
   VariableDeclaration.version
   VariableDeclaration.decimals
   VariableDeclaration.idToOwner
   VariableDeclaration.ownerToNFTokenCount
   VariableDeclaration.idToApprovals
   VariableDeclaration.ownerToOperators
   VariableDeclaration.ownership_change
   VariableDeclaration.ownerToNFTokenIdList
   VariableDeclaration.tokenToOwnerIndex
   VariableDeclaration.locked
   VariableDeclaration.permanentLockBalance
   VariableDeclaration.smNFTBalance
   VariableDeclaration.epoch
   VariableDeclaration.slope_changes
   VariableDeclaration.supply
   VariableDeclaration.canSplit
   VariableDeclaration.MULTIPLIER
   VariableDeclaration.attachments
   VariableDeclaration.voted
   VariableDeclaration.DOMAIN_TYPEHASH
   VariableDeclaration.DELEGATION_TYPEHASH
   VariableDeclaration._delegates
   VariableDeclaration.nonces
   EnumDefinition.DepositType
   EventDefinition.Deposit
   EventDefinition.Merge
   EventDefinition.Split
   EventDefinition.MetadataUpdate
   EventDefinition.BatchMetadataUpdate
   EventDefinition.Withdraw
   EventDefinition.LockPermanent
   EventDefinition.UnlockPermanent
   EventDefinition.Supply
   ModifierDefinition.nonreentrant
   FunctionDefinition.constructor
   FunctionDefinition.setTeam
   FunctionDefinition.setArtProxy
   FunctionDefinition.tokenURI
   FunctionDefinition.ownerOf
   FunctionDefinition.ownerToNFTokenCountFn
   FunctionDefinition._balance
   FunctionDefinition.balanceOf
   FunctionDefinition.getApproved
   FunctionDefinition.isApprovedForAll
   FunctionDefinition.approve
   FunctionDefinition.setApprovalForAll
   FunctionDefinition._clearApproval
   FunctionDefinition._isApprovedOrOwner
   FunctionDefinition.isApprovedOrOwner
   FunctionDefinition._transferFrom
   FunctionDefinition.transferFrom
   FunctionDefinition.safeTransferFrom
   FunctionDefinition._isContract
   FunctionDefinition.safeTransferFrom
   FunctionDefinition.supportsInterface
   FunctionDefinition.tokenOfOwnerByIndex
   FunctionDefinition._addTokenToOwnerList
   FunctionDefinition._addTokenTo
   FunctionDefinition._mint
   FunctionDefinition._removeTokenFromOwnerList
   FunctionDefinition._removeTokenFrom
   FunctionDefinition._burn
   FunctionDefinition.get_last_user_slope
   FunctionDefinition.user_point_history
   FunctionDefinition.point_history
   FunctionDefinition.user_point_epoch
   FunctionDefinition._checkpoint
   FunctionDefinition._deposit_for
   FunctionDefinition.checkpoint
   FunctionDefinition.deposit_for
   FunctionDefinition._create_lock
   FunctionDefinition.create_lock
   FunctionDefinition.create_lock_for
   FunctionDefinition.increase_amount
   FunctionDefinition.increase_unlock_time
   FunctionDefinition.updateToSMNFT
   FunctionDefinition.withdraw
   FunctionDefinition.lockPermanent
   FunctionDefinition.unlockPermanent
   FunctionDefinition.balanceOfNFT
   FunctionDefinition.balanceOfNFTAt
   FunctionDefinition.balanceOfAtNFT
   FunctionDefinition.totalSupplyAt
   FunctionDefinition.totalSupply
   FunctionDefinition.totalSupplyAtT
   FunctionDefinition.setVoter
   FunctionDefinition.setAVM
   FunctionDefinition.voting
   FunctionDefinition.abstain
   FunctionDefinition.attach
   FunctionDefinition.detach
   FunctionDefinition.merge
   FunctionDefinition.split
   FunctionDefinition._createSplitNFT
   FunctionDefinition.toggleSplit
   FunctionDefinition.delegates
   FunctionDefinition.getVotes
   FunctionDefinition.getPastVotes
   FunctionDefinition.getsmNFTPastVotes
   FunctionDefinition.getPastTotalSupply
   FunctionDefinition.getsmNFTPastTotalSupply
   FunctionDefinition._delegate
   FunctionDefinition.delegate
   FunctionDefinition.delegateBySig
   FunctionDefinition.setSmNFTBonus
   FunctionDefinition.calculate_sm_nft_bonus
   FunctionDefinition.calculate_original_sm_nft_amount

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

1: 
   Current order:
   FunctionDefinition.setDistribution
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.setInternalBribe
   FunctionDefinition.setRewarderPid
   FunctionDefinition.setGaugeRewarder
   FunctionDefinition.setFeeVault
   FunctionDefinition.setGenesisPoolManager
   VariableDeclaration.last_gauge
   VariableDeclaration.permissionsRegistry
   VariableDeclaration.__gauges
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.setRegistry
   FunctionDefinition.gauges
   FunctionDefinition.length
   FunctionDefinition.createGauge
   ModifierDefinition.onlyAllowed
   ModifierDefinition.EmergencyCouncil
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.setRewarderPid
   FunctionDefinition.setGaugeRewarder
   FunctionDefinition.setDistribution
   FunctionDefinition.setInternalBribe
   FunctionDefinition.setGenesisManager
   
   Suggested order:
   VariableDeclaration.last_gauge
   VariableDeclaration.permissionsRegistry
   VariableDeclaration.__gauges
   ModifierDefinition.onlyAllowed
   ModifierDefinition.EmergencyCouncil
   FunctionDefinition.setDistribution
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.setInternalBribe
   FunctionDefinition.setRewarderPid
   FunctionDefinition.setGaugeRewarder
   FunctionDefinition.setFeeVault
   FunctionDefinition.setGenesisPoolManager
   FunctionDefinition.constructor
   FunctionDefinition.initialize
   FunctionDefinition.setRegistry
   FunctionDefinition.gauges
   FunctionDefinition.length
   FunctionDefinition.createGauge
   FunctionDefinition.activateEmergencyMode
   FunctionDefinition.stopEmergencyMode
   FunctionDefinition.setRewarderPid
   FunctionDefinition.setGaugeRewarder
   FunctionDefinition.setDistribution
   FunctionDefinition.setInternalBribe
   FunctionDefinition.setGenesisManager

```

```solidity
File: ./contracts/governance/Governor.sol

1: 
   Current order:
   UsingForDirective.DoubleEndedQueue.Bytes32Deque
   UsingForDirective.SafeCast
   UsingForDirective.Timers.Timestamp
   VariableDeclaration.BALLOT_TYPEHASH
   VariableDeclaration.EXTENDED_BALLOT_TYPEHASH
   StructDefinition.ProposalCore
   VariableDeclaration._name
   VariableDeclaration.status
   VariableDeclaration._proposals
   VariableDeclaration._governanceCall
   ModifierDefinition.onlyGovernance
   FunctionDefinition.constructor
   FunctionDefinition.receive
   FunctionDefinition.supportsInterface
   FunctionDefinition.name
   FunctionDefinition.version
   FunctionDefinition.hashProposal
   FunctionDefinition.proposalProposer
   FunctionDefinition.state
   FunctionDefinition.proposalSnapshot
   FunctionDefinition.proposalDeadline
   FunctionDefinition.proposalThreshold
   FunctionDefinition._quorumReached
   FunctionDefinition._voteSucceeded
   FunctionDefinition._voteDefeated
   FunctionDefinition._getVotes
   FunctionDefinition._countVote
   FunctionDefinition._defaultParams
   FunctionDefinition._proposal
   FunctionDefinition.execute
   FunctionDefinition._execute
   FunctionDefinition._beforeExecute
   FunctionDefinition._afterExecute
   FunctionDefinition._cancel
   FunctionDefinition.getVotes
   FunctionDefinition.getVotesWithParams
   FunctionDefinition.castVote
   FunctionDefinition.castVoteWithReason
   FunctionDefinition.castVoteWithReasonAndParams
   FunctionDefinition.castVoteBySig
   FunctionDefinition.castVoteWithReasonAndParamsBySig
   FunctionDefinition._castVote
   FunctionDefinition._castVote
   FunctionDefinition.relay
   FunctionDefinition._executor
   FunctionDefinition.onERC721Received
   FunctionDefinition.onERC1155Received
   FunctionDefinition.onERC1155BatchReceived
   EnumDefinition.VoteType
   StructDefinition.ProposalVote
   VariableDeclaration._proposalVotes
   FunctionDefinition.COUNTING_MODE
   FunctionDefinition.hasVoted
   FunctionDefinition.proposalVotes
   FunctionDefinition._quorumReached
   FunctionDefinition._voteSucceeded
   FunctionDefinition._voteDefeated
   FunctionDefinition._countVote
   VariableDeclaration.token
   FunctionDefinition.constructor
   FunctionDefinition._getVotes
   VariableDeclaration._quorumNumerator
   EventDefinition.QuorumNumeratorUpdated
   FunctionDefinition.constructor
   FunctionDefinition.quorumNumerator
   FunctionDefinition.quorumDenominator
   FunctionDefinition.quorum
   FunctionDefinition.updateQuorumNumerator
   FunctionDefinition._updateQuorumNumerator
   
   Suggested order:
   UsingForDirective.DoubleEndedQueue.Bytes32Deque
   UsingForDirective.SafeCast
   UsingForDirective.Timers.Timestamp
   VariableDeclaration.BALLOT_TYPEHASH
   VariableDeclaration.EXTENDED_BALLOT_TYPEHASH
   VariableDeclaration._name
   VariableDeclaration.status
   VariableDeclaration._proposals
   VariableDeclaration._governanceCall
   VariableDeclaration._proposalVotes
   VariableDeclaration.token
   VariableDeclaration._quorumNumerator
   EnumDefinition.VoteType
   StructDefinition.ProposalCore
   StructDefinition.ProposalVote
   EventDefinition.QuorumNumeratorUpdated
   ModifierDefinition.onlyGovernance
   FunctionDefinition.constructor
   FunctionDefinition.receive
   FunctionDefinition.supportsInterface
   FunctionDefinition.name
   FunctionDefinition.version
   FunctionDefinition.hashProposal
   FunctionDefinition.proposalProposer
   FunctionDefinition.state
   FunctionDefinition.proposalSnapshot
   FunctionDefinition.proposalDeadline
   FunctionDefinition.proposalThreshold
   FunctionDefinition._quorumReached
   FunctionDefinition._voteSucceeded
   FunctionDefinition._voteDefeated
   FunctionDefinition._getVotes
   FunctionDefinition._countVote
   FunctionDefinition._defaultParams
   FunctionDefinition._proposal
   FunctionDefinition.execute
   FunctionDefinition._execute
   FunctionDefinition._beforeExecute
   FunctionDefinition._afterExecute
   FunctionDefinition._cancel
   FunctionDefinition.getVotes
   FunctionDefinition.getVotesWithParams
   FunctionDefinition.castVote
   FunctionDefinition.castVoteWithReason
   FunctionDefinition.castVoteWithReasonAndParams
   FunctionDefinition.castVoteBySig
   FunctionDefinition.castVoteWithReasonAndParamsBySig
   FunctionDefinition._castVote
   FunctionDefinition._castVote
   FunctionDefinition.relay
   FunctionDefinition._executor
   FunctionDefinition.onERC721Received
   FunctionDefinition.onERC1155Received
   FunctionDefinition.onERC1155BatchReceived
   FunctionDefinition.COUNTING_MODE
   FunctionDefinition.hasVoted
   FunctionDefinition.proposalVotes
   FunctionDefinition._quorumReached
   FunctionDefinition._voteSucceeded
   FunctionDefinition._voteDefeated
   FunctionDefinition._countVote
   FunctionDefinition.constructor
   FunctionDefinition._getVotes
   FunctionDefinition.constructor
   FunctionDefinition.quorumNumerator
   FunctionDefinition.quorumDenominator
   FunctionDefinition.quorum
   FunctionDefinition.updateQuorumNumerator
   FunctionDefinition._updateQuorumNumerator

```

```solidity
File: ./contracts/interfaces/IERC20.sol

1: 
   Current order:
   FunctionDefinition.totalSupply
   FunctionDefinition.transfer
   FunctionDefinition.decimals
   FunctionDefinition.symbol
   FunctionDefinition.balanceOf
   FunctionDefinition.transferFrom
   FunctionDefinition.allowance
   FunctionDefinition.approve
   EventDefinition.Transfer
   EventDefinition.Approval
   
   Suggested order:
   EventDefinition.Transfer
   EventDefinition.Approval
   FunctionDefinition.totalSupply
   FunctionDefinition.transfer
   FunctionDefinition.decimals
   FunctionDefinition.symbol
   FunctionDefinition.balanceOf
   FunctionDefinition.transferFrom
   FunctionDefinition.allowance
   FunctionDefinition.approve

```

```solidity
File: ./contracts/interfaces/IGenesisPoolBase.sol

1: 
   Current order:
   StructDefinition.TokenAllocation
   StructDefinition.TokenIncentiveInfo
   StructDefinition.GenesisInfo
   StructDefinition.LiquidityPool
   EnumDefinition.PoolStatus
   
   Suggested order:
   EnumDefinition.PoolStatus
   StructDefinition.TokenAllocation
   StructDefinition.TokenIncentiveInfo
   StructDefinition.GenesisInfo
   StructDefinition.LiquidityPool

```

### <a name="NC-45"></a>[NC-45] Some require descriptions are not clear
1. It does not comply with the general require error description model of the project (Either all of them should be debugged in this way, or all of them should be explained with a string not exceeding 32 bytes.)
2. For debug dapps like Tenderly, these debug messages are important, this allows the user to see the reasons for revert practically.

*Instances (149)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

62:         require(votingEscrow.isApprovedOrOwner(msg.sender, tokenId), "NAO");

63:         require(!BlackTimeLibrary.isLastHour(block.timestamp), "LH");

64:         require(uint256(int256(votingEscrow.locked(tokenId).amount)) >= minBalanceForAutovoting, "IB"); // to be changed to an >= instaed of a >

91:         require(!BlackTimeLibrary.isLastHour(block.timestamp), "LH");

125:         require(BlackTimeLibrary.isLastHour(block.timestamp), "!LH");

142:         require(_voter != address(0), "ZA");

148:         require(msg.sender == executor || msg.sender == owner(), "NA");

149:         require(_executor != address(0), "ZA");

154:         require(strategy != address(0), "ZA");

159:         require(strategy != address(0), "ZA");

```

```solidity
File: ./contracts/Bribes.sol

63:         require(_bribeFactory != address(0) && _voter != address(0) && _gaugeManager != address(0) && _owner != address(0), "ZA");

72:         require(minter != address(0), "ZA");

212:         require(amount > 0, "ZV");

213:         require(msg.sender == voter, "NA");

259:         require(amount > 0, "ZV");

260:         require(msg.sender == voter, "NA");

277:         require(msg.sender == gaugeManager, "NA");

327:         require(_Voter != address(0), "ZA");

339:         require(_minter != address(0), "ZA");

345:         require(_avm!=address(0), "ZA");

352:         require(_owner != address(0), "ZA");

362:         require( (msg.sender == owner || msg.sender == bribeFactory), "NA" );

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

175:         require(amount > 0, "ZV");

176:         require(token != address(0), "ZA");

```

```solidity
File: ./contracts/GaugeManager.sol

107:         require(_bribeFactory != address(0), "ZA");

115:         require(_permissionRegistry != address(0), "ZA");

122:         require(_voter != address(0), "ZA");

128:         require(_genesisManager != address(0), "ZA");

139:         require(_blackGovernor != address(0), "ZA");

183:         require(gauges[_pool] == address(0x0), "DNE");

189:         require(_factory != address(0), "ZA");

190:         require(_gaugeFactory != address(0), "ZA");

291:         require(msg.sender == minter, "NA");

521:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId) || (address(avm)!= address(0) && avm.getOriginalOwner(_tokenId) == msg.sender), "NAO");

541:         require(_minter != address(0), "ZA");

```

```solidity
File: ./contracts/GaugeV2.sol

78:         require(msg.sender == DISTRIBUTION, "NA");

83:         require(msg.sender == genesisPool, "NA");

88:         require(msg.sender == genesisManager, "NA");

126:         require(_distribution != address(0), "ZA");

140:         require(_int >= address(0), "ZA");

222:         require(_tokenOwner != address(0), "ZA");

223:         require(_totalAmount > 0, "ZV");

248:         require(amount > 0, "ZV");

273:         require(amount > 0, "ZV");

274:         require(_balanceOf(msg.sender) > 0, "ZV");

292:         require(_amount > 0, "ZV");

383:         require(token == address(rewardToken), "IA");

```

```solidity
File: ./contracts/GenesisPool.sol

93:         require(_sender == genesisInfo.tokenOwner, "NA");

94:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED || poolStatus == PoolStatus.PRE_LISTING, "INS");

95:         require(_incentivesToken.length > 0, "ZV");

118:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED || poolStatus == PoolStatus.PRE_LISTING, "INS");

125:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED, "INS");

132:         require(poolStatus == PoolStatus.PRE_LISTING || poolStatus == PoolStatus.PRE_LAUNCH, "INS");

133:         require(block.timestamp >= genesisInfo.startTime, "INS");

139:         require(_amount > 0, "ZV");

273:         require(poolStatus == PoolStatus.NOT_QUALIFIED || poolStatus == PoolStatus.PARTIALLY_LAUNCHED, "INS");

274:         require(msg.sender == genesisInfo.tokenOwner, "NA");

285:         require(poolStatus == PoolStatus.NOT_QUALIFIED, "INS");

308:         require(poolStatus == PoolStatus.NOT_QUALIFIED, "INS");

309:         require(msg.sender == genesisInfo.tokenOwner, "NA");

396:         require(_auction != address(0), "ZA");

397:         require(poolStatus == PoolStatus.NATIVE_TOKEN_DEPOSITED, "INS");

```

```solidity
File: ./contracts/GenesisPoolManager.sol

103:         require(nativeToken == genesisPoolInfo.nativeToken, "IA");

104:         require(_sender == genesisPoolInfo.tokenOwner, "NA");

105:         require(allocationInfo.proposedNativeAmount > 0, "ZV");

106:         require(allocationInfo.proposedFundingAmount > 0, "ZV");

114:             require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");

115:             require(IERC20(_fundingToken).balanceOf(pairAddress) == 0, "!ZV");

119:         require(genesisPoolInfo.supplyPercent > 0 && genesisPoolInfo.supplyPercent <= 10000, "INV"); 

127:         require(genesisPool != address(0), "ZA");

140:         require(nativeToken != address(0), "ZA");

149:         require(nativeToken != address(0), "ZA");

160:             require(IERC20(nativeToken).balanceOf(pairAddress) == 0, "!ZV");

161:             require(IERC20(genesisInfo.fundingToken).balanceOf(pairAddress) == 0, "!ZV");

172:         require(amount > 0, "ZV");

173:         require(genesisPool != address(0), "ZA");

188:         require(epochController == msg.sender, "NA");

228:         require(epochController == msg.sender, "NA");

270:         require(_genesisPool != address(0), "ZA");

283:         require(_epochController != address(0), "ZA");

300:         require(_nativeToken != address(0), "ZA");

302:         require(genesisPool != address(0), "ZA");

307:         require(_nativeToken != address(0), "ZA");

309:         require(genesisPool != address(0), "ZA");

314:         require(_router == address(0), "ZA");

```

```solidity
File: ./contracts/MinterUpgradeable.sol

140:         require (msg.sender == _epochGovernor, "NA");

```

```solidity
File: ./contracts/Pair.sol

572:         require(success && (data.length == 0 || abi.decode(data, (bool))), "IST");

579:         require(success && (data.length == 0 || abi.decode(data, (bool))), "ISA");

```

```solidity
File: ./contracts/RewardsDistributor.sol

266:         require(_avm != address(0), "ZA");

```

```solidity
File: ./contracts/RouterV2.sol

367:         require(amountA >= amountAMin && amountB >= amountBMin, "IAA");

384:         require(!(IBaseV1Factory(factory).isGenesis(pair) && IBaseV1Pair(pair).totalSupply() == 0), "NA");

649:         require(success && (data.length == 0 || abi.decode(data, (bool))), "IST");

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

69:         require(_avm != address(0), "ZA");

76:         require(_executor!=address(0), "ZA"); 

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

56:         require(_avm != address(0), "ZA");

67:         require(_executor != address(0), "ZA");

```

```solidity
File: ./contracts/TokenHandler.sol

64:         require(!isWhitelisted[_token], "in");

84:         require(isWhitelisted[_token], "out");

123:         require(isWhitelisted[_token], "out");

132:         require(isWhitelisted[_token], "out");

```

```solidity
File: ./contracts/VoterV3.sol

106:         require(_epochOwner != address(0), "ZA");

114:         require(_permissionRegistry != address(0), "ZA");

139:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId), "NAO");

198:         require(IVotingEscrow(_ve).isApprovedOrOwner(msg.sender, _tokenId), "NAO");

228:                 require(votes[_tokenId][_pool] == 0, "ZV");

229:                 require(_poolWeight != 0, "ZV");

```

```solidity
File: ./contracts/VotingEscrow.sol

178:         require(idToOwner[_tokenId] != address(0), "DNE");

257:         require(owner != address(0), "ZA");

259:         require(_approved != owner, "IA");

263:         require(senderIsOwner || senderIsApprovedForAll, "NAO");

322:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

324:         require(_isApprovedOrOwner(_sender, _tokenId), "NAO");

541:         require(_isApprovedOrOwner(msg.sender, _tokenId), "NAO");

819:         require(_value > 0, "ZV"); // dev: need non-zero value

840:         require(_value > 0, "ZV"); // dev: need non-zero value

940:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

967:         require(_isApprovedOrOwner(sender, _tokenId), "NAO");

971:         require(_newLocked.end > block.timestamp, "EXP");

972:         require(_newLocked.amount > 0, "ZV");

989:         require(_isApprovedOrOwner(msg.sender, _tokenId), "NAO");

991:         require(attachments[_tokenId] == 0 && !voted[_tokenId], "ATT");

1070:         require(msg.sender == voter, "NA");

1075:         require(msg.sender == voter, "NA");

1080:         require(msg.sender == voter, "NA");

1085:         require(attachments[_from] == 0 && !voted[_from], "ATT");

1153:         require(attachments[_from] == 0 && !voted[_from], "ATT");

1154:         require(_isApprovedOrOwner(msg.sender, _from), "NAO");

1157:         require(newLocked.end > block.timestamp || newLocked.isPermanent, "EXP");

1163:         require(_splitAmount != 0, "ZV");

1324:         require(delegatee != msg.sender, "NA");

1325:         require(delegatee != address(0), "ZA");

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

62:         require( msg.sender == IPermissionsRegistry(permissionsRegistry).emergencyCouncil(), "NA");

114:         require(_genesisManager != address(0), "ZA");

115:         require(_gauge != address(0), "ZA");

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

57:         require(nativeToken != address(0), "ZA"); 

58:         require(getGenesisPool(nativeToken) == address(0), "!ZA");

```

```solidity
File: ./contracts/factories/PairFactory.sol

37:         require(msg.sender == feeManager, "NA");

59:         require(msg.sender == owner(), "NA");

68:         require(msg.sender == pendingFeeManager, "NA");

73:         require(_newFee <= 3000, "HFE");

78:         require(_feehandler != address(0), "ZA");

83:         require(_dibs != address(0), "ZA");

92:         require(_fee <= MAX_FEE, "HFE");

93:         require(_fee != 0, "ZFE");

102:         require(_fees <= MAX_FEE, "HFE");

140:         require(tokenA != tokenB, "IA"); // Pair: IDENTICAL_ADDRESSES

142:         require(token0 != address(0), "ZA"); // Pair: ZERO_ADDRESS

143:         require(getPair[token0][token1][stable] == address(0), "!ZA");

158:         require(msg.sender == genesisManager || msg.sender == feeManager,  "NA");

```

### <a name="NC-46"></a>[NC-46] Use Underscores for Number Literals (add an underscore every 3 digits)

*Instances (26)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

14:     uint256 public constant MAX_LOCKS = 1024;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

53:     uint16 private constant ALGEBRA_FEE_DENOMINATOR = 1000;

54:     uint16 private constant REFERRAL_FEE_DENOMINATOR = 1000;

```

```solidity
File: ./contracts/BlackClaims.sol

131:         require(claim_duration_ >= 1 days && claim_duration_ < 1000 days, "CLAIM DURATION OUT OF BOUNDS");

```

```solidity
File: ./contracts/BlackGovernor.sol

17:     uint256 public constant PROPOSAL_DENOMINATOR = 1000;

```

```solidity
File: ./contracts/Fan.sol

10:     uint256 private constant _initialSupply = 1000000 * 10 ** 18; // 1,000,000 tokens with 18 decimals

```

```solidity
File: ./contracts/GenesisPool.sol

165:         uint256 targetNativeAmount = (allocationInfo.proposedNativeAmount * genesisInfo.threshold) / 10000; // threshold is 100 * of original to support 2 deciamls

176:         uint256 targetNativeAmount = (allocationInfo.proposedNativeAmount * genesisInfo.threshold) / 10000; // threshold is 100 * of original to support 2 deciamls

```

```solidity
File: ./contracts/GenesisPoolManager.sol

119:         require(genesisPoolInfo.supplyPercent > 0 && genesisPoolInfo.supplyPercent <= 10000, "INV"); 

```

```solidity
File: ./contracts/MinterUpgradeable.sol

152:             tailEmissionRate = 10000;

```

```solidity
File: ./contracts/Pair.sol

48:     uint constant periodSize = 1800;

166:         uint256 _referralFee = (_dibs != address(0)) ? (amount * _maxRef / 10000) : 0;

172:         uint256 _stakingNftFee =  amount * PairFactory(factory).stakingNFTFee() / 10000;

191:         uint256 _referralFee = (_dibs != address(0)) ? (amount * _maxRef / 10000) : 0;

197:         uint256 _stakingNftFee =  amount * PairFactory(factory).stakingNFTFee() / 10000;

404:         if (amount0In > 0) _update0(amount0In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token0 and move them out of pool

405:         if (amount1In > 0) _update1(amount1In * PairFactory(factory).getFee(address(this), stable) / 10000); // accrue fees for token1 and move them out of pool

406:         _balance0 = IERC20(_token0).balanceOf(address(this)); // since we removed tokens, we need to reconfirm balances, can also simply use previous balance - amountIn/ 10000, but doing balanceOf again as safety check

462:         amountIn -= amountIn * PairFactory(factory).getFee(address(this), stable) / 10000; // remove fee from amount received

```

```solidity
File: ./contracts/RouterV2.sol

247:         pairSwapMetaData.balanceA += (amountIn - (amountIn * IPairFactory(factory).getFee(pair, pairSwapMetaData.stable) / 10000));

```

```solidity
File: ./contracts/VotingEscrow.sol

85:     uint public SMNFT_BONUS = 1000;

86:     uint public PRECISISON = 10000;

```

```solidity
File: ./contracts/factories/PairFactory.sol

73:         require(_newFee <= 3000, "HFE");

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

8:     uint256 internal constant MAX_LOCK_DURATION = 86400 * 365 * 4;

9:     uint256 internal constant GENESIS_STAKING_MATURITY_TIME = 2 * 86400;

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

27:     uint public constant MAX_DELEGATES = 1024; // avoid too much gas

```

### <a name="NC-47"></a>[NC-47] Internal and private variables and functions names should begin with an underscore
According to the Solidity Style Guide, Non-`external` variable and function names should begin with an [underscore](https://docs.soliditylang.org/en/latest/style-guide.html#underscore-prefix-for-non-external-functions-and-variables)

*Instances (63)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

203:     function getClaimable(address _account, address _pair) internal view returns(uint claimable0, uint claimable1){

435:     function getCurrentFees(address _pair, address token_0, address token_1)  internal view returns(uint _tokenFees0, uint _tokenFees1, address _feesAddress) {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

42:     IGaugeManager.FarmingParam farmingParam;

293:     function getCommunityVaultAccruedFee() internal view returns (uint256 communityVaultAccruedFeeToken0, uint256 communityVaultAccruedFeeToken1) {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

69:     function createEternalFarming(address _pool, address _algebraEternalFarming, address _rewardToken, address _bonusRewardToken) internal {

85:     function getIncentiveKey(address _rewardToken, address _bonusRewardToken, address _pool, address _algebraEternalFarming) internal view returns (IncentiveKey memory) {

```

```solidity
File: ./contracts/BlackClaims.sol

24:     address treasury;

```

```solidity
File: ./contracts/Bribes.sol

56:     mapping(address => bool) internal isBribeToken;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

51:     address private GAUGE;

```

```solidity
File: ./contracts/GaugeManager.sol

38:     uint256 internal index; 

39:     address internal base; 

42:     mapping(address => uint256) internal supplyIndex;              // gauge    => index

264:     function addressToString(address _addr) internal pure returns (string memory) {

282:     function setGaugeAsCommunityFeeReceiver(address _gauge, address _pool) internal {

```

```solidity
File: ./contracts/GenesisPool.sol

22:     IAuction internal auction;

35:     uint256 internal totalDeposits;

36:     uint256 liquidity;

37:     uint256 tokenOwnerUnstaked;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

54:     mapping(address => uint256) internal liveNativeTokensIndex;

55:     mapping(address => bool) internal isNativeToken;

```

```solidity
File: ./contracts/GlobalRouter.sol

61:     function min(uint a, uint b) internal pure returns (uint) {

64:     function sqrt(uint y) internal pure returns (uint z) {

76:     function sub(uint x, uint y) internal pure returns (uint z) {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

50:     address private burnTokenAddress;

```

```solidity
File: ./contracts/Pair.sol

28:     bytes32 internal DOMAIN_SEPARATOR;

```

```solidity
File: ./contracts/RouterV2.sol

61:     function min(uint a, uint b) internal pure returns (uint) {

64:     function sqrt(uint y) internal pure returns (uint z) {

76:     function sub(uint x, uint y) internal pure returns (uint z) {

175:     function quoteLiquidity(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

19:     function toString(uint value) internal pure returns (string memory) {

```

```solidity
File: ./contracts/VotingEscrow.sol

89:     mapping(bytes4 => bool) internal supportedInterfaces;

101:     uint internal tokenId;

103:     uint internal WEEK;

105:     uint internal MAXTIME;

106:     int128 internal iMAXTIME;

110:     VotingDelegationLib.Data private cpData;

112:     VotingBalanceLogic.Data private votingBalanceLogicData;

189:     mapping(uint => address) internal idToOwner;

192:     mapping(address => uint) internal ownerToNFTokenCount;

224:     mapping(uint => address) internal idToApprovals;

227:     mapping(address => mapping(address => bool)) internal ownerToOperators;

447:     mapping(address => mapping(uint => uint)) internal ownerToNFTokenIdList;

450:     mapping(uint => uint) internal tokenToOwnerIndex;

922:     function updateToSMNFT (uint _tokenId, IVotingEscrow.LockedBalance memory _locked) internal {

```

```solidity
File: ./contracts/libraries/Base64.sol

12:     function encode(bytes memory data) internal pure returns (string memory) {

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

13:     function epochStart(uint256 timestamp) internal pure returns (uint256) {

20:     function epochNext(uint256 timestamp) internal pure returns (uint256) {

27:     function epochVoteStart(uint256 timestamp) internal pure returns (uint256) {

34:     function epochVoteEnd(uint256 timestamp) internal pure returns (uint256) {

41:     function isLastHour(uint256 timestamp) internal pure returns (bool) {

48:     function epochMultiples(uint256 duration) internal pure returns (uint256) {

55:     function isLastEpoch(uint256 timestamp, uint256 endTime) internal pure returns (bool) {

62:     function prevPreEpoch(uint256 timestamp) internal pure returns (uint256) {

69:     function currPreEpoch(uint256 timestamp) internal pure returns (uint256) {

```

```solidity
File: ./contracts/libraries/Math.sol

5:     function max(uint a, uint b) internal pure returns (uint) {

8:     function min(uint a, uint b) internal pure returns (uint) {

11:     function sqrt(uint y) internal pure returns (uint z) {

23:     function cbrt(uint256 n) internal pure returns (uint256) { unchecked {

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

18:     function mul(int256 a, int256 b) internal pure returns (int256) {

46:     function div(int256 a, int256 b) internal pure returns (int256) {

65:     function sub(int256 a, int256 b) internal pure returns (int256) {

82:     function add(int256 a, int256 b) internal pure returns (int256) {

89:     function toUInt256(int256 a) internal pure returns (uint256) {

```

### <a name="NC-48"></a>[NC-48] Event is missing `indexed` fields
Index event fields make the field more quickly accessible to off-chain tools that parse events. However, note that each index field costs extra gas during emission, so it's not necessarily best to index the maximum allowed per event (three fields). Each event should use three indexed fields if there are three or more fields, and gas usage is not particularly of concern for the events in question. If there are fewer than three fields, all of the fields should be indexed.

*Instances (75)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

175:     event Owner(address oldOwner, address newOwner);

176:     event Voter(address oldVoter, address newVoter);

177:     event GaugeManager(address oldGaugeManager, address newGaugeManager);

178:     event WBF(address oldWBF, address newWBF);

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

130:     event Owner(address oldOwner, address newOwner);

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

137:     event Owner(address oldOwner, address newOwner);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

56:     event RewardAdded(uint256 reward);

57:     event Deposit(address indexed user, uint256 amount);

58:     event Withdraw(address indexed user, uint256 amount);

59:     event Harvest(address indexed user, uint256 reward);

60:     event ClaimFees(address indexed from, uint256 claimed0, uint256 claimed1);

61:     event EmergencyActivated(address indexed gauge, uint256 timestamp);

62:     event EmergencyDeactivated(address indexed gauge, uint256 timestamp);

```

```solidity
File: ./contracts/Black.sol

19:     event Transfer(address indexed from, address indexed to, uint value);

20:     event Approval(address indexed owner, address indexed spender, uint value);

```

```solidity
File: ./contracts/BlackClaims.sol

45:     event TreasurySet(address treasury);

46:     event StakedRewards(address staker, uint256 rewards);

```

```solidity
File: ./contracts/Bribes.sol

369:     event RewardAdded(address indexed rewardToken, uint256 reward, uint256 startTimestamp);

370:     event Staked(uint256 indexed tokenId, uint256 amount);

371:     event Withdrawn(uint256 indexed tokenId, uint256 amount);

372:     event RewardPaid(address indexed user,address indexed rewardsToken,uint256 reward);

373:     event Recovered(address indexed token, uint256 amount);

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

53:     event OnReward(address indexed user, uint256 LPBalance, uint256 rewardAmount, address indexed to);

```

```solidity
File: ./contracts/GaugeManager.sol

70:     event NotifyReward(address indexed sender, address indexed reward, uint256 amount);

71:     event DistributeReward(address indexed sender, address indexed gauge, uint256 amount);

```

```solidity
File: ./contracts/GaugeV2.sol

57:     event RewardAdded(uint256 reward);

58:     event Deposit(address indexed user, uint256 amount);

59:     event Withdraw(address indexed user, uint256 amount);

60:     event Harvest(address indexed user, uint256 reward);

61:     event DepositsForGenesis(address owner, uint256 amount);

63:     event ClaimFees(address indexed from, uint256 claimed0, uint256 claimed1);

64:     event EmergencyActivated(address indexed gauge, uint256 timestamp);

65:     event EmergencyDeactivated(address indexed gauge, uint256 timestamp);

```

```solidity
File: ./contracts/GenesisPool.sol

39:     event DepositedNativeToken(address native, address owner, address genesisPool, uint256 proposedNativeAmount, uint proposedFundingAmount);

40:     event AddedIncentives(address native, address[] incentivesToken, uint256[] incentivesAmount);

41:     event RejectedGenesisPool(address native);

42:     event ApprovedGenesisPool(address proposedToken);

```

```solidity
File: ./contracts/GenesisPoolManager.sol

57:     event WhiteListedTokenToUser(address proposedToken, address tokenOwner);

58:     event DespositedToken(address genesisPool, address sender, uint256 amount);

```

```solidity
File: ./contracts/MinterUpgradeable.sol

54:     event Mint(address indexed sender, uint weekly, uint circulating_supply, uint circulating_emission);

```

```solidity
File: ./contracts/Pair.sol

75:     event Fees(address indexed sender, uint amount0, uint amount1);

76:     event Mint(address indexed sender, uint amount0, uint amount1);

77:     event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);

78:     event Swap(

86:     event Sync(uint reserve0, uint reserve1);

87:     event Claim(address indexed sender, address indexed recipient, uint amount0, uint amount1);

89:     event Transfer(address indexed from, address indexed to, uint amount);

90:     event Approval(address indexed owner, address indexed spender, uint amount);

```

```solidity
File: ./contracts/PairGenerator.sol

9:     event PairCreated(address indexed token0, address indexed token1, bool stable, address pair);

```

```solidity
File: ./contracts/PermissionsRegistry.sol

29:     event RoleAdded(bytes role);

30:     event RoleRemoved(bytes role);

```

```solidity
File: ./contracts/RewardsDistributor.sol

21:     event CheckpointToken(

26:     event Claimed(

```

```solidity
File: ./contracts/RouterV2.sol

130:     event Swap(address indexed sender,uint amount0In,address _tokenIn, address indexed to, bool stable);

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

17:     event TopNPoolsUpdated(address[] poolAddresses);

18:     event TopNUpdated(uint256 newTopN);

19:     event AVMSet(address avm);

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

14:     event TopNUpdated(uint256 newTopN);

15:     event VoteWeightsUpdated(uint256[] newWeights);

16:     event AVMSet(address newAVM);

17:     event ExecutorUpdated(address newExecutor);

```

```solidity
File: ./contracts/TokenHandler.sol

24:     event WhitelistedNFT(address indexed whitelister, uint256 tokenId);

25:     event BlacklistNFT(address indexed whitelister, uint256 tokenId);

28:     event TokenVolatilityBucketUpdated(address indexed token, uint256 bucketId);

```

```solidity
File: ./contracts/VotingEscrow.sol

36:     event Deposit(

66:     event MetadataUpdate(uint256 _tokenId);

67:     event BatchMetadataUpdate(uint256 _fromTokenId, uint256 _toTokenId);

69:     event Withdraw(address indexed provider, uint tokenId, uint value, uint ts);

70:     event LockPermanent(address indexed _owner, uint256 indexed _tokenId, uint256 amount, uint256 _ts);

71:     event UnlockPermanent(address indexed _owner, uint256 indexed _tokenId, uint256 amount, uint256 _ts);

72:     event Supply(uint prevSupply, uint supply);

```

```solidity
File: ./contracts/factories/PairFactory.sol

34:     event PairCreated(address indexed token0, address indexed token1, bool stable, address pair, uint);

```

```solidity
File: ./contracts/governance/Governor.sol

768:     event QuorumNumeratorUpdated(uint256 oldQuorumNumerator, uint256 newQuorumNumerator);

```

```solidity
File: ./contracts/interfaces/IERC20.sol

14:     event Transfer(address indexed from, address indexed to, uint value);

15:     event Approval(address indexed owner, address indexed spender, uint value);

```

### <a name="NC-49"></a>[NC-49] Constants should be defined rather than using magic numbers

*Instances (6)*:
```solidity
File: ./contracts/GaugeManager.sol

268:         bytes memory str = new bytes(42);

```

```solidity
File: ./contracts/libraries/Base64.sol

36:                 let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))

38:                 out := add(out, and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF))

43:                 out := shl(224, out)

52:                 mstore(sub(resultPtr, 2), shl(240, 0x3d3d))

55:                 mstore(sub(resultPtr, 1), shl(248, 0x3d))

```

### <a name="NC-50"></a>[NC-50] `public` functions not called by the contract should be declared `external` instead

*Instances (43)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

183:     function initialize(address _voter, address _router, address _gaugeManager, address _pairFactory, address _algebraFactory, address _quoterV2, address _algebraPoolAPIStorage) initializer public {

787:     function getNextEpochStart() public view returns(uint256){

```

```solidity
File: ./contracts/APIHelper/GenesisPoolAPI.sol

40:     function initialize(address _genesisManager, address _genesisPoolFactory) initializer public {

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

36:     function initialize(address _voter, address _gaugeManager) initializer public {

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

22:     function initialize(address _tokenHandler) initializer public {

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

72:     function getAmountsOut(uint amountIn, route[] memory routes) public view returns (uint[] memory amounts) {

151:     function getAmountsIn(uint amountOut, route[] memory routes) public view returns (uint[] memory amounts) {

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

137:     function initialize(address _votingEscrow, address _gaugeManager) initializer public {

183:         function getAVMNFTFromAddress(address _user) public view returns (veNFT[] memory) {

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

144:     function initialize(address _voter, address _rewarddistro, address _gaugeFactory, address _gaugeFactoryCL, address _gaugeManager) initializer public {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

146:     function getReward(uint256 tokenId, bool isBonusReward) public nonReentrant onlyDistribution {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

38:     function initialize(address _permissionRegistry) initializer  public {

```

```solidity
File: ./contracts/BlackClaims.sol

228:     function getClaimableReward(address userAddress) public view returns(uint256 _reward) 

```

```solidity
File: ./contracts/Bribes.sol

82:     function getEpochStart() public view returns(uint256){

87:     function getNextEpochStart() public view returns(uint256){

```

```solidity
File: ./contracts/FixedAuction.sol

14:     function initialize() initializer  public {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

90:     function pendingReward(address _user) public view returns (uint256 pending){

126:     function setDistributionRate(uint256 amount) public onlyOwner {

```

```solidity
File: ./contracts/GaugeManager.sol

80:     function initialize(address __ve, address _tokenHandler, address _gaugeFactory, address _gaugeFactoryCL, 

```

```solidity
File: ./contracts/GaugeV2.sol

168:     function totalSupply() public view returns (uint256) {

```

```solidity
File: ./contracts/GenesisPool.sol

254:     function claimableNative() public view returns(PoolStatus, address token, uint256 amount){

264:     function claimableDeposits() public view returns(PoolStatus, address token, uint256 amount){

295:     function claimableIncentives() public view returns(address[] memory tokens , uint256[] memory amounts){

```

```solidity
File: ./contracts/GenesisPoolManager.sol

70:     function initialize(address _epochController, address _router, address _permissionRegistory, address _gaugeManager, address _pairFactory, address _genesisFactory, address _auctionFactory, address _tokenHandler) initializer  public {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

58:     function initialize(    

```

```solidity
File: ./contracts/PermissionsRegistry.sol

215:     function helper_stringToBytes(string memory _input) public pure returns(bytes memory){

220:     function helper_bytesToString(bytes memory _input) public pure returns(string memory){

```

```solidity
File: ./contracts/RouterV2.sol

220:     function getPoolAmountOut(uint amountIn, address tokenIn, address pair) public view returns (uint amount) {

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

14:     function initialize() initializer public {

```

```solidity
File: ./contracts/VotingEscrow.sol

200:     function ownerToNFTokenCountFn(address owner) public view returns (uint) {

254:     function approve(address _approved, uint _tokenId) public {

453:     function tokenOfOwnerByIndex(address _owner, uint _tokenIndex) public view returns (uint) {

1245:     function getPastVotes(address account, uint timestamp)

1263:     function getsmNFTPastVotes(address account, uint timestamp) 

1311:     function delegate(address delegatee) public {

1316:     function delegateBySig(

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

23:     function initialize(address _auction) public initializer {

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

30:     function initialize(address _permissionRegistry) initializer  public {

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

28:     function initialize(address _tokenHandler) public initializer {

```

```solidity
File: ./contracts/factories/PairFactory.sol

43:     function initialize(address _pairGenerator) public initializer {

112:     function getFee(address _pairAddress, bool _stable) public view returns (uint256) {

119:     function getReferralFee(address _pairAddress) public view returns (uint256) {

126:     function getIsGenesis(address _pairAddress) public view returns (bool) {

```

### <a name="NC-51"></a>[NC-51] Variables need not be initialized to zero
The default value for variables is zero, so initializing them to zero is superfluous.

*Instances (118)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

112:         uint256 votingBalance = 0;

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

109:         for (uint256 i = 0; i < avms.length; i++) {

175:         uint256 totalVotingPower = 0;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

103:         uint i = 0;

110:         uint i = 0;

118:         uint i = 0;

```

```solidity
File: ./contracts/Black.sol

11:     uint public totalSupply = 0;

```

```solidity
File: ./contracts/BlackClaims.sol

167:         uint256 _increase = 0;

168:         uint256 _decrease = 0;

170:         for (uint256 i = 0; i < players_.length; i++) {

205:         uint256 staked_reward = 0;

```

```solidity
File: ./contracts/Bribes.sol

104:         uint256 reward = 0;

118:             for (uint256 i = 0; i < numEpochs; i++) {

149:         uint256 lower = 0;

181:         uint256 lower = 0;

279:         for (uint256 i = 0; i < _length; i++) {

```

```solidity
File: ./contracts/GaugeManager.sol

158:         uint256 i = 0;

193:         address tokenA = address(0);

194:         address tokenB = address(0);

272:         for (uint i = 0; i < 20; i++) {

294:         uint256 _ratio = 0;

305:         uint256 i = 0;

345:         uint256 x = 0;

363:         for (uint256 x = 0; x < _gauges.length; x++) {

507:         for (uint256 i = 0; i < _gauges.length; i++) {

514:         for (uint256 i = 0; i < _nftIds.length; i++) {

522:         for (uint256 i = 0; i < _bribes.length; i++) {

```

```solidity
File: ./contracts/GaugeV2.sol

314:         uint256 gensisBalance = 0;

```

```solidity
File: ./contracts/GenesisPool.sol

98:         uint256 i = 0;

186:         uint256 i = 0;

187:         uint256 _amount = 0;

```

```solidity
File: ./contracts/GlobalRouter.sol

178:         for (uint i = 0; i < routes.length; i++) {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

92:             for (uint i = 0; i < claimants.length; i++) {

```

```solidity
File: ./contracts/Pair.sol

23:     uint public totalSupply = 0;

64:     uint public index0 = 0;

65:     uint public index1 = 0;

300:         for (uint i = 0; i < _prices.length; i++) {

316:         uint nextIndex = 0;

317:         uint index = 0;

437:         for (uint i = 0; i < 255; i++) {

```

```solidity
File: ./contracts/PermissionsRegistry.sol

97:         for(uint i = 0; i < _roles.length; i++){

108:         for(uint i = 0; i < rta.length; i++){

111:             for(uint k = 0; k < __roles.length; k++){

148:         for(uint i = 0; i < rta.length; i++){

156:         for(uint i = 0; i < atr.length; i++){

178:         for(uint i = 0; i < _roles.length; i++){

202:         uint i = 0;

```

```solidity
File: ./contracts/RewardsDistributor.sol

83:         uint next_week = 0;

85:         for (uint i = 0; i < 20; i++) {

113:         uint _min = 0;

115:         for (uint i = 0; i < 128; i++) {

129:         uint to_distribute = 0;

147:         for (uint i = 0; i < 50; i++) {

163:         uint to_distribute = 0;

180:         for (uint i = 0; i < 50; i++) {

223:         uint total = 0;

225:         for (uint i = 0; i < _tokenIds.length; i++) {

```

```solidity
File: ./contracts/RouterV2.sol

265:         for (uint i = 0; i < routes.length; i++) {

296:         uint _totalSupply = 0;

500:         for (uint i = 0; i < routes.length; i++) {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

51:         for (uint256 i = 0; i < _poolAddresses.length; i++) {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

49:         for (uint256 i = 0; i < _weights.length; i++) {

```

```solidity
File: ./contracts/Thenian.sol

63:         for (uint256 i = 0; i < _amount; i++) {

160:         for (uint256 i = 0; i < amount; i++) {

```

```solidity
File: ./contracts/TokenHandler.sol

53:         uint256 i = 0;

73:         uint256 i = 0;

112:         uint256 i = 0;

```

```solidity
File: ./contracts/VoterV3.sol

147:         uint256 _totalWeight = 0;

149:         for (uint256 i = 0; i < _poolVoteCnt; i ++) {

184:         for (uint256 i = 0; i < _poolCnt; i ++) {

214:         uint256 _totalVoteWeight = 0;

215:         uint256 _usedWeight = 0;

217:         for (uint i = 0; i < _poolCnt; i++) {

222:         for (uint256 i = 0; i < _poolCnt; i++) {

```

```solidity
File: ./contracts/VotingEscrow.sol

660:         uint block_slope = 0; // dblock/dt

670:             for (uint i = 0; i < 255; ++i) {

1237:         uint votes = 0;

1238:         for (uint i = 0; i < _tokenIds.length; i++) {

1253:         uint votes = 0;

1254:         for (uint i = 0; i < _tokenIds.length; i++) {

1271:         uint votes = 0;

1272:         for (uint i = 0; i < _tokenIds.length; i++) {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

112:         uint i = 0;

137:         uint i = 0;

145:         uint i = 0;

154:         uint i = 0;

167:         uint i = 0;

183:         uint i = 0;

191:         uint i = 0;

199:         uint i = 0;

210:         uint i = 0;

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

68:         uint i = 0;

75:         uint i = 0;

83:         uint i = 0;

91:         uint i = 0;

98:         uint i = 0;

107:         uint i = 0;

```

```solidity
File: ./contracts/governance/Governor.sol

343:         for (uint256 i = 0; i < targets.length; ++i) {

360:             for (uint256 i = 0; i < targets.length; ++i) {

```

```solidity
File: ./contracts/governance/L2Governor.sol

334:         for (uint256 i = 0; i < targets.length; ++i) {

351:             for (uint256 i = 0; i < targets.length; ++i) {

```

```solidity
File: ./contracts/libraries/Math.sol

24:         uint256 x = 0;

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

51:         uint lower = 0;

82:         uint _min = 0;

84:         for (uint i = 0; i < 128; ++i) {

109:         uint d_block = 0;

110:         uint d_t = 0;

140:         uint dt = 0;

165:         uint _min = 0;

167:         for (uint i = 0; i < 128; ++i) {

192:         for (uint i = 0; i < 255; ++i) {

217:         uint lower = 0;

```

```solidity
File: ./contracts/libraries/VotingDelegationLib.sol

66:                 for (uint i = 0; i < length;) {

101:                     for (uint i = 0; i < dstRepOld.length; i++) {

139:                 for (uint i = 0; i < length;) {

176:                     for (uint i = 0; i < dstRepOld.length; i++) {

182:                 for (uint i = 0; i < ownerTokenCount; i++) {

206:         uint32 lower = 0;

```


## Low Issues


| |Issue|Instances|
|-|:-|:-:|
| [L-1](#L-1) | `approve()`/`safeApprove()` may revert if the current approval is not zero | 25 |
| [L-2](#L-2) | Use of `tx.origin` is unsafe in almost every context | 1 |
| [L-3](#L-3) | Use a 2-step ownership transfer pattern | 23 |
| [L-4](#L-4) | Precision Loss due to Division before Multiplication | 14 |
| [L-5](#L-5) | Some tokens may revert when zero value transfers are made | 36 |
| [L-6](#L-6) | Missing checks for `address(0)` when assigning values to address state variables | 67 |
| [L-7](#L-7) | Use of `ecrecover` is susceptible to signature malleability | 2 |
| [L-8](#L-8) | `abi.encodePacked()` should not be used with dynamic types when passing the result to a hash function such as `keccak256()` | 14 |
| [L-9](#L-9) | Use of `tx.origin` is unsafe in almost every context | 1 |
| [L-10](#L-10) | `decimals()` is not a part of the ERC-20 standard | 2 |
| [L-11](#L-11) | `decimals()` should be of type `uint8` | 1 |
| [L-12](#L-12) | Deprecated approve() function | 9 |
| [L-13](#L-13) | Do not use deprecated library functions | 15 |
| [L-14](#L-14) | `safeApprove()` is deprecated | 14 |
| [L-15](#L-15) | Do not leave an implementation contract uninitialized | 16 |
| [L-16](#L-16) | Division by zero not prevented | 54 |
| [L-17](#L-17) | `domainSeparator()` isn't protected against replay attacks in case of a future chain split  | 5 |
| [L-18](#L-18) | Duplicate import statements | 2 |
| [L-19](#L-19) | Empty Function Body - Consider commenting why | 3 |
| [L-20](#L-20) | External calls in an un-bounded `for-`loop may result in a DOS | 3 |
| [L-21](#L-21) | External call recipient may consume all transaction gas | 13 |
| [L-22](#L-22) | Fallback lacking `payable` | 1 |
| [L-23](#L-23) | Initializers could be front-run | 43 |
| [L-24](#L-24) | Signature use at deadlines should be allowed | 29 |
| [L-25](#L-25) | Prevent accidentally burning tokens | 36 |
| [L-26](#L-26) | Possible rounding issue | 21 |
| [L-27](#L-27) | Loss of precision | 59 |
| [L-28](#L-28) | Solidity version 0.8.20+ may not work on other chains due to `PUSH0` | 34 |
| [L-29](#L-29) | Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership` | 26 |
| [L-30](#L-30) | File allows a version of solidity that is susceptible to an assembly optimizer bug | 34 |
| [L-31](#L-31) | Sweeping may break accounting if tokens with multiple addresses are used | 11 |
| [L-32](#L-32) | `symbol()` is not a part of the ERC-20 standard | 6 |
| [L-33](#L-33) | Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting | 6 |
| [L-34](#L-34) | Unsafe ERC20 operation(s) | 32 |
| [L-35](#L-35) | Unsafe solidity low-level call can cause gas grief attack | 4 |
| [L-36](#L-36) | Unspecific compiler version pragma | 1 |
| [L-37](#L-37) | Upgradeable contract is missing a `__gap[50]` storage variable to allow for new storage variables in later versions | 44 |
| [L-38](#L-38) | Upgradeable contract not initialized | 87 |
| [L-39](#L-39) | Use of ecrecover is susceptible to signature malleability | 2 |
### <a name="L-1"></a>[L-1] `approve()`/`safeApprove()` may revert if the current approval is not zero
- Some tokens (like the *very popular* USDT) do not work when changing the allowance from an existing non-zero allowance value (it will revert if the current approval is not zero to protect against front-running changes of approvals). These tokens must first be approved for zero and then the actual allowance can be approved.
- Furthermore, OZ's implementation of safeApprove would throw an error if an approve is attempted from a non-zero value (`"SafeERC20: approve from non-zero to non-zero allowance"`)

Set the allowance to zero immediately before each of the existing allowance calls

*Instances (25)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

55:         IVotingEscrow(votingEscrow).approve(msg.sender, _tokenId);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

179:         IERC20(token).safeApprove(farmingParam.algebraEternalFarming, reward);

243:                 IERC20(_token0).safeApprove(internal_bribe, 0);

244:                 IERC20(_token0).safeApprove(internal_bribe, _fees0);

248:                 IERC20(_token1).safeApprove(internal_bribe, 0);

249:                 IERC20(_token1).safeApprove(internal_bribe, _fees1);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

78:         IERC20(_rewardToken).safeApprove(_algebraEternalFarming, reward);

```

```solidity
File: ./contracts/BlackClaims.sol

221:         token.approve(address(_ve), staked_reward);

```

```solidity
File: ./contracts/GaugeManager.sol

224:         IERC20(base).approve(_gauge, type(uint256).max);

```

```solidity
File: ./contracts/GaugeV2.sol

425:                 IERC20(_token0).safeApprove(internal_bribe, 0);

426:                 IERC20(_token0).safeApprove(internal_bribe, _fees0);

430:                 IERC20(_token1).safeApprove(internal_bribe, 0);

431:                 IERC20(_token1).safeApprove(internal_bribe, _fees1);

```

```solidity
File: ./contracts/GenesisPool.sol

193:                 IERC20(incentiveTokens[i]).safeApprove(external_bribe, _amount);

220:         IERC20(genesisInfo.nativeToken).safeApprove(router, allocationInfo.allocatedNativeAmount);

221:         IERC20(genesisInfo.fundingToken).safeApprove(router, allocationInfo.allocatedFundingAmount);

227:         IERC20(liquidityPoolInfo.pairAddress).safeApprove(liquidityPoolInfo.gaugeAddress, liquidity);

```

```solidity
File: ./contracts/MinterUpgradeable.sol

91:             _black.approve(address(_ve), type(uint).max);

200:             _black.approve(address(_gaugeManager), _gauge);

```

```solidity
File: ./contracts/RewardsDistributor.sol

62:         require(IERC20(_token).approve(_voting_escrow, type(uint).max), "approval failed");

```

```solidity
File: ./contracts/RouterV2.sol

503:                     IERC20(routes[i].from).approve(swapRouter, amounts[i]);

557:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

581:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

597:                 IERC20(address(wETH)).approve(swapRouter, amounts[0]);

621:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

```

### <a name="L-2"></a>[L-2] Use of `tx.origin` is unsafe in almost every context
According to [Vitalik Buterin](https://ethereum.stackexchange.com/questions/196/how-do-i-make-my-dapp-serenity-proof), contracts should _not_ `assume that tx.origin will continue to be usable or meaningful`. An example of this is [EIP-3074](https://eips.ethereum.org/EIPS/eip-3074#allowing-txorigin-as-signer-1) which explicitly mentions the intention to change its semantics when it's used with new op codes. There have also been calls to [remove](https://github.com/ethereum/solidity/issues/683) `tx.origin`, and there are [security issues](solidity.readthedocs.io/en/v0.4.24/security-considerations.html#tx-origin) associated with using it for authorization. For these reasons, it's best to completely avoid the feature.

*Instances (1)*:
```solidity
File: ./contracts/chainlink/AutomationBase.sol

12:     if (tx.origin != address(0)) {

```

### <a name="L-3"></a>[L-3] Use a 2-step ownership transfer pattern
Recommend considering implementing a two step process where the owner or admin nominates an account and the nominated account needs to call an `acceptOwnership()` function for the transfer of ownership to fully succeed. This ensures the nominated EOA account is a valid and active account. Lack of two-step procedure for critical operations leaves them error-prone. Consider adding two step procedure on the critical functions.

*Instances (23)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

16: contract AutoVotingEscrowManager is IAutoVotingEscrowManager, Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable  {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

25: contract GaugeCL is ReentrancyGuard, Ownable {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

24: contract GaugeFactoryCL is IGaugeFactoryCL, OwnableUpgradeable {

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

12: contract CustomPoolDeployer is Ownable {

```

```solidity
File: ./contracts/CustomToken.sol

8: contract CustomToken is ERC20, Ownable {

```

```solidity
File: ./contracts/Fan.sol

8: contract TokenFour is ERC20, Ownable {

```

```solidity
File: ./contracts/FixedAuction.sol

10: contract FixedAuction is IGenesisPoolBase, IAuction, OwnableUpgradeable {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

20: contract GaugeExtraRewarder is Ownable {

```

```solidity
File: ./contracts/GaugeManager.sol

33: contract GaugeManager is OwnableUpgradeable, ReentrancyGuardUpgradeable {

```

```solidity
File: ./contracts/GaugeV2.sol

24: contract GaugeV2 is ReentrancyGuard, Ownable {

```

```solidity
File: ./contracts/GenesisPoolManager.sol

29: contract GenesisPoolManager is IGenesisPoolBase, IGenesisPoolManager, OwnableUpgradeable, ReentrancyGuardUpgradeable {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

19: contract MinterUpgradeable is IMinter, OwnableUpgradeable {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

9: contract SetterTopNPoolsStrategy is ITopNPoolsStrategy, Ownable {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

8: contract SetterVoteWeightStrategy is IVoteWeightStrategy, Ownable {

```

```solidity
File: ./contracts/Thenian.sol

14: contract Thenian is ERC721Enumerable, Ownable {

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

9: contract VeArtProxyUpgradeable is IVeArtProxy, OwnableUpgradeable {

```

```solidity
File: ./contracts/VoterV3.sol

20: contract VoterV3 is OwnableUpgradeable, ReentrancyGuardUpgradeable {

```

```solidity
File: ./contracts/chainlink/EpochController.sol

12: contract EpochController is AutomationCompatibleInterface, OwnableUpgradeable  {

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

7: contract AuctionFactory is IAuctionFactory, OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

19: contract BribeFactoryV3 is OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

23: contract GaugeFactory is IGaugeFactory, OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

10: contract GenesisPoolFactory is IGenesisPoolFactory, OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/PairFactory.sol

10: contract PairFactory is IPairFactory, OwnableUpgradeable {

```

### <a name="L-4"></a>[L-4] Precision Loss due to Division before Multiplication
division operations can lead to a loss of precision as the fractional part is discarded. When the result of such a division operation is then multiplied, this loss of precision can be magnified, potentially leading to significant inaccuracies in the calculations.

*Instances (14)*:
```solidity
File: ./contracts/APIHelper/TradeHelper.sol

49:         return x*(y*y/1e18*y/1e18)/1e18+(x*x/1e18*x/1e18)*y/1e18;

53:         return 3*y*(x*x/1e18)/1e18+(y*y/1e18*y/1e18);

```

```solidity
File: ./contracts/Pair.sol

429:         return x0*(y*y/1e18*y/1e18)/1e18+(x0*x0/1e18*x0/1e18)*y/1e18;

433:         return 3*x0*(y*y/1e18)/1e18+(x0*x0/1e18*x0/1e18);

```

```solidity
File: ./contracts/RewardsDistributor.sol

53:         uint _t = block.timestamp / WEEK * WEEK;

71:         return block.timestamp / WEEK * WEEK;

82:         uint this_week = t / WEEK * WEEK;

139:             week_cursor = user_point.ts / WEEK * WEEK;

173:             week_cursor = user_point.ts / WEEK * WEEK;

193:         uint _last_token_time = last_token_time / WEEK * WEEK;

199:         _last_token_time = _last_token_time / WEEK * WEEK;

221:         _last_token_time = _last_token_time / WEEK * WEEK;

```

```solidity
File: ./contracts/VotingEscrow.sol

838:         uint unlock_time = (block.timestamp + _lock_duration) / WEEK * WEEK; // Locktime is rounded down to weeks

904:         uint unlock_time = (block.timestamp + _lock_duration) / WEEK * WEEK; // Locktime is rounded down to weeks

```

### <a name="L-5"></a>[L-5] Some tokens may revert when zero value transfers are made
Example: https://github.com/d-xo/weird-erc20#revert-on-zero-value-transfers.

In spite of the fact that EIP-20 [states](https://github.com/ethereum/EIPs/blob/46b9b698815abbfa628cd1097311deee77dd45c5/EIPS/eip-20.md?plain=1#L116) that zero-valued transfers must be accepted, some tokens, such as LEND will revert if this is attempted, which may cause transactions that involve other tokens (such as batch operations) to fully revert. Consider skipping the transfer if the amount is zero, which will also save gas.

*Instances (36)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

178:         rewardToken.safeTransferFrom(DISTRIBUTION, address(this), reward);

```

```solidity
File: ./contracts/BlackClaims.sol

115:         bool transfer_success = token.transfer(treasury, _remaining_reward_amount);

133:         bool transfer_success = token.transferFrom(treasury, address(this), _season.reward_amount);

218:             bool transfer_success = token.transfer(msg.sender, claimed_reward);

244:         IERC20(tokenAddress_).transfer(msg.sender, _balance);

```

```solidity
File: ./contracts/Bribes.sol

283:                 IERC20(tokens[i]).safeTransfer(_owner, _reward);

297:         IERC20(_rewardsToken).safeTransferFrom(msg.sender,address(this),reward);

312:         IERC20(tokenAddress).safeTransfer(owner, tokenAmount);

321:         IERC20(tokenAddress).safeTransfer(owner, tokenAmount);

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

77:             rewardToken.safeTransfer(to, pending);

188:         IERC20(token).safeTransfer(msg.sender, amount);

```

```solidity
File: ./contracts/GaugeManager.sol

292:         IERC20Upgradeable(base).safeTransferFrom(msg.sender, address(this), amount);

422:                     IERC20Upgradeable(base).safeTransfer(minter, _share); // send rewards back to Minter so they're not stuck in GaugeManager

448:             IERC20Upgradeable(base).safeTransfer(minter, _claimable);

```

```solidity
File: ./contracts/GaugeV2.sol

229:         TOKEN.safeTransferFrom(msg.sender, address(this), _totalAmount);

256:         TOKEN.safeTransferFrom(account, address(this), amount);

284:         TOKEN.safeTransfer(msg.sender, amount);

298:         TOKEN.safeTransfer(msg.sender, _amount);

309:         TOKEN.safeTransfer(msg.sender, _amount);

338:             rewardToken.safeTransfer(_user, reward);

352:             rewardToken.safeTransfer(msg.sender, reward);

384:         rewardToken.safeTransferFrom(DISTRIBUTION, address(this), reward);

```

```solidity
File: ./contracts/GenesisPool.sol

106:                 IERC20(_token).safeTransferFrom(_sender, address(this), _amount);

141:         IERC20(genesisInfo.fundingToken).safeTransferFrom(spender, address(this), _amount);

280:             IERC20(genesisInfo.nativeToken).safeTransfer(msg.sender, _amount);

291:             IERC20(genesisInfo.fundingToken).safeTransfer(msg.sender, _amount);

319:             IERC20(incentiveTokens[i]).safeTransfer(msg.sender, _amount);

```

```solidity
File: ./contracts/GenesisPoolManager.sol

128:         IERC20(nativeToken).safeTransferFrom(_sender, genesisPool, allocationInfo.proposedNativeAmount);

```

```solidity
File: ./contracts/RewardsDistributor.sol

210:                 IERC20(token).transfer(_nftOwner, amount);

234:                     IERC20(token).transfer(_nftOwner, amount);

262:         IERC20(_token).transfer(msg.sender, _balance);

```

```solidity
File: ./contracts/RouterV2.sol

555:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

579:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

619:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

```

```solidity
File: ./contracts/VotingEscrow.sol

798:                 assert(IERC20(token).transferFrom(from, address(this), _value));

956:         assert(IERC20(token).transfer(msg.sender, value));

```

### <a name="L-6"></a>[L-6] Missing checks for `address(0)` when assigning values to address state variables

*Instances (67)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

191:         routerV2 = _router;

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

19:         factory = _factory;

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

455:         pairAPI = _pairApi;

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

495:         pairAPI = _pairApi;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

66:         factory = _factory;

69:         VE = _ve;                               // vested

70:         poolAddress = _pool;

72:         DISTRIBUTION = _distribution;           // distro address (GaugeManager)

75:         internal_bribe = _internal_bribe;       // lp fees goes here

76:         external_bribe = _external_bribe;       // bribe fees goes here

264:         internal_bribe = _int;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

40:         permissionsRegistry = _permissionRegistry;

51:         permissionsRegistry = _registry;

56:         algebraPoolAPIStorage = _algebraPoolAPIStorage;

```

```solidity
File: ./contracts/Black.sol

30:         minter = _minter;

```

```solidity
File: ./contracts/BlackGovernor.sol

29:         minter = _minter;

43:         team = newTeam;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

51:         entryPoint = _entryPoint;

52:         plugin = _plugin;

54:         algebraPoolAPIStorage = _algebraPoolAPIStorage;

55:         algebraFeeRecipient = _algebraFeeRecipient;

56:         algebraFeeManager = _algebraFeeManager;

58:         algebraFarmingProxyPluginFactory = _algebraFarmingProxyPluginFactory;

59:         algebraFactory = _algebraFactory;

60:         algebraPluginFactory = _algebraPluginFactory;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

61:         GAUGE = gauge;

```

```solidity
File: ./contracts/GaugeManager.sol

84:       _ve = __ve;  

86:       tokenHandler = _tokenHandler;

87:        permissionRegistry = _permissionRegistory;

```

```solidity
File: ./contracts/GaugeV2.sol

99:         VE = _ve;                               // vested

101:         DISTRIBUTION = _distribution;           // distro address (GaugeManager)

104:         internal_bribe = _internal_bribe;       // lp fees goes here

105:         external_bribe = _external_bribe;       // bribe fees goes here

107:         genesisManager = _genesisManager;

141:         internal_bribe = _int;

377:         genesisPool = _genesisPool;

439:         genesisManager = _genesisPoolManager;

```

```solidity
File: ./contracts/GenesisPool.sol

64:         genesisManager = _genesisManager;

```

```solidity
File: ./contracts/GenesisPoolManager.sol

74:         epochController = _epochController;

75:         router = _router;

76:         permissionRegistory = _permissionRegistory;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

103:         pendingTeam = _team;

```

```solidity
File: ./contracts/Pair.sol

93:         factory = _factory;

```

```solidity
File: ./contracts/PairFees.sol

18:         token0 = _token0;

19:         token1 = _token1;

```

```solidity
File: ./contracts/RewardsDistributor.sol

58:         token = _token;

59:         voting_escrow = _voting_escrow;

250:         depositor = _depositor;

255:         owner = _owner;

```

```solidity
File: ./contracts/RouterV2.sol

139:         factory = _factory;

141:         swapRouter = _swapRouter;

791:         swapRouter = _swapRouter;

```

```solidity
File: ./contracts/TokenHandler.sol

41:         permissionRegistry = _permissionRegistry;

```

```solidity
File: ./contracts/VotingEscrow.sol

117:         token = token_addr;

120:         artProxy = art_proxy;

121:         avm = _avm;

166:         team = _team;

171:         artProxy = _proxy;

1056:         voter = _voter;

1061:         avm = _avm;

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

32:         permissionsRegistry = _permissionRegistry;

37:         permissionsRegistry = _registry;

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

32:         tokenHandler = _tokenHandler;

37:         genesisManager = _genesisManager;

```

```solidity
File: ./contracts/factories/PairFactory.sol

51:         pairGenerator = _pairGenerator;

64:         pendingFeeManager = _feeManager;

154:         genesisManager = _genesisManager;

```

### <a name="L-7"></a>[L-7] Use of `ecrecover` is susceptible to signature malleability
The built-in EVM precompile `ecrecover` is susceptible to signature malleability, which could lead to replay attacks.
References:  <https://swcregistry.io/docs/SWC-117>,  <https://swcregistry.io/docs/SWC-121>, and  <https://medium.com/cryptronics/signature-replay-vulnerabilities-in-smart-contracts-3b6f7596df57>.
While this is not immediately exploitable, this may become a vulnerability if used elsewhere.

*Instances (2)*:
```solidity
File: ./contracts/Pair.sol

532:         address recoveredAddress = ecrecover(digest, v, r, s);

```

```solidity
File: ./contracts/VotingEscrow.sol

1342:         address signatory = ecrecover(digest, v, r, s);

```

### <a name="L-8"></a>[L-8] `abi.encodePacked()` should not be used with dynamic types when passing the result to a hash function such as `keccak256()`
Use `abi.encode()` instead which will pad items to 32 bytes, which will [prevent hash collisions](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#non-standard-packed-mode) (e.g. `abi.encodePacked(0x123,0x456)` => `0x123456` => `abi.encodePacked(0x1,0x23456)`, but `abi.encode(0x123,0x456)` => `0x0...1230...456`). "Unless there is a compelling reason, `abi.encode` should be preferred". If there is only one argument to `abi.encodePacked()` it can often be cast to `bytes()` or `bytes32()` [instead](https://ethereum.stackexchange.com/questions/30912/how-to-compare-strings-in-solidity#answer-82739).
If all arguments are strings and or bytes, `bytes.concat()` should be used instead

*Instances (14)*:
```solidity
File: ./contracts/APIHelper/TradeHelper.sol

37:             hex'ff',

```

```solidity
File: ./contracts/Pair.sol

97:             name = string(abi.encodePacked("StableV1 AMM - ", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

98:             symbol = string(abi.encodePacked("sAMM-", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

100:             name = string(abi.encodePacked("VolatileV1 AMM - ", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

101:             symbol = string(abi.encodePacked("vAMM-", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

527:                 '\x19\x01',

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

43:         output = string(abi.encodePacked(output, "token ", toString(_tokenId), '</text><text x="10" y="40" class="base">'));

44:         output = string(abi.encodePacked(output, "balanceOf ", toString(_balanceOf), '</text><text x="10" y="60" class="base">'));

45:         output = string(abi.encodePacked(output, "locked_end ", toString(_locked_end), '</text><text x="10" y="80" class="base">'));

46:         output = string(abi.encodePacked(output, "isSMNFT ", isSMNFT?"true":"false", '</text><text x="10" y="100" class="base">'));

47:         output = string(abi.encodePacked(output, "value ", toString(_value), '</text></svg>'));

49:         string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "lock #', toString(_tokenId), '", "description": "Black locks, can be used to boost gauge yields, vote on token emission, and receive bribes", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));

50:         output = string(abi.encodePacked('data:application/json;base64,', json));

```

```solidity
File: ./contracts/VotingEscrow.sol

1340:             abi.encodePacked("\x19\x01", domainSeparator, structHash)

```

### <a name="L-9"></a>[L-9] Use of `tx.origin` is unsafe in almost every context
According to [Vitalik Buterin](https://ethereum.stackexchange.com/questions/196/how-do-i-make-my-dapp-serenity-proof), contracts should _not_ `assume that tx.origin will continue to be usable or meaningful`. An example of this is [EIP-3074](https://eips.ethereum.org/EIPS/eip-3074#allowing-txorigin-as-signer-1) which explicitly mentions the intention to change its semantics when it's used with new op codes. There have also been calls to [remove](https://github.com/ethereum/solidity/issues/683) `tx.origin`, and there are [security issues](solidity.readthedocs.io/en/v0.4.24/security-considerations.html#tx-origin) associated with using it for authorization. For these reasons, it's best to completely avoid the feature.

*Instances (1)*:
```solidity
File: ./contracts/chainlink/AutomationBase.sol

12:     if (tx.origin != address(0)) {

```

### <a name="L-10"></a>[L-10] `decimals()` is not a part of the ERC-20 standard
The `decimals()` function is not a part of the [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20), and was added later as an [optional extension](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/IERC20Metadata.sol). As such, some valid ERC20 tokens do not support this interface, so it is unsafe to blindly cast all tokens to this interface, and then call this function.

*Instances (2)*:
```solidity
File: ./contracts/Pair.sol

104:         decimals0 = 10**IERC20(_token0).decimals();

105:         decimals1 = 10**IERC20(_token1).decimals();

```

### <a name="L-11"></a>[L-11] `decimals()` should be of type `uint8`

*Instances (1)*:
```solidity
File: ./contracts/RouterV2.sol

151:     function _k(uint x, uint y, uint decimals0, uint decimals1, bool stable) internal pure returns (uint) {

```

### <a name="L-12"></a>[L-12] Deprecated approve() function
Due to the inheritance of ERC20's approve function, there's a vulnerability to the ERC20 approve and double spend front running attack. Briefly, an authorized spender could spend both allowances by front running an allowance-changing transaction. Consider implementing OpenZeppelin's `.safeApprove()` function to help mitigate this.

*Instances (9)*:
```solidity
File: ./contracts/BlackClaims.sol

221:         token.approve(address(_ve), staked_reward);

```

```solidity
File: ./contracts/GaugeManager.sol

224:         IERC20(base).approve(_gauge, type(uint256).max);

```

```solidity
File: ./contracts/MinterUpgradeable.sol

91:             _black.approve(address(_ve), type(uint).max);

200:             _black.approve(address(_gaugeManager), _gauge);

```

```solidity
File: ./contracts/RouterV2.sol

503:                     IERC20(routes[i].from).approve(swapRouter, amounts[i]);

557:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

581:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

597:                 IERC20(address(wETH)).approve(swapRouter, amounts[0]);

621:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

```

### <a name="L-13"></a>[L-13] Do not use deprecated library functions

*Instances (15)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

179:         IERC20(token).safeApprove(farmingParam.algebraEternalFarming, reward);

243:                 IERC20(_token0).safeApprove(internal_bribe, 0);

244:                 IERC20(_token0).safeApprove(internal_bribe, _fees0);

248:                 IERC20(_token1).safeApprove(internal_bribe, 0);

249:                 IERC20(_token1).safeApprove(internal_bribe, _fees1);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

78:         IERC20(_rewardToken).safeApprove(_algebraEternalFarming, reward);

```

```solidity
File: ./contracts/GaugeV2.sol

425:                 IERC20(_token0).safeApprove(internal_bribe, 0);

426:                 IERC20(_token0).safeApprove(internal_bribe, _fees0);

430:                 IERC20(_token1).safeApprove(internal_bribe, 0);

431:                 IERC20(_token1).safeApprove(internal_bribe, _fees1);

```

```solidity
File: ./contracts/GenesisPool.sol

193:                 IERC20(incentiveTokens[i]).safeApprove(external_bribe, _amount);

220:         IERC20(genesisInfo.nativeToken).safeApprove(router, allocationInfo.allocatedNativeAmount);

221:         IERC20(genesisInfo.fundingToken).safeApprove(router, allocationInfo.allocatedFundingAmount);

227:         IERC20(liquidityPoolInfo.pairAddress).safeApprove(liquidityPoolInfo.gaugeAddress, liquidity);

```

```solidity
File: ./contracts/Pair.sol

575:     function _safeApprove(address token,address spender,uint256 value) internal {

```

### <a name="L-14"></a>[L-14] `safeApprove()` is deprecated
[Deprecated](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/bfff03c0d2a59bcd8e2ead1da9aed9edf0080d05/contracts/token/ERC20/utils/SafeERC20.sol#L38-L45) in favor of `safeIncreaseAllowance()` and `safeDecreaseAllowance()`. If only setting the initial allowance to the value that means infinite, `safeIncreaseAllowance()` can be used instead. The function may currently work, but if a bug is found in this version of OpenZeppelin, and the version that you're forced to upgrade to no longer has this function, you'll encounter unnecessary delays in porting and testing replacement contracts.

*Instances (14)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

179:         IERC20(token).safeApprove(farmingParam.algebraEternalFarming, reward);

243:                 IERC20(_token0).safeApprove(internal_bribe, 0);

244:                 IERC20(_token0).safeApprove(internal_bribe, _fees0);

248:                 IERC20(_token1).safeApprove(internal_bribe, 0);

249:                 IERC20(_token1).safeApprove(internal_bribe, _fees1);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

78:         IERC20(_rewardToken).safeApprove(_algebraEternalFarming, reward);

```

```solidity
File: ./contracts/GaugeV2.sol

425:                 IERC20(_token0).safeApprove(internal_bribe, 0);

426:                 IERC20(_token0).safeApprove(internal_bribe, _fees0);

430:                 IERC20(_token1).safeApprove(internal_bribe, 0);

431:                 IERC20(_token1).safeApprove(internal_bribe, _fees1);

```

```solidity
File: ./contracts/GenesisPool.sol

193:                 IERC20(incentiveTokens[i]).safeApprove(external_bribe, _amount);

220:         IERC20(genesisInfo.nativeToken).safeApprove(router, allocationInfo.allocatedNativeAmount);

221:         IERC20(genesisInfo.fundingToken).safeApprove(router, allocationInfo.allocatedFundingAmount);

227:         IERC20(liquidityPoolInfo.pairAddress).safeApprove(liquidityPoolInfo.gaugeAddress, liquidity);

```

### <a name="L-15"></a>[L-15] Do not leave an implementation contract uninitialized
An uninitialized implementation contract can be taken over by an attacker, which may impact the proxy. To prevent the implementation contract from being used, it's advisable to invoke the `_disableInitializers` function in the constructor to automatically lock it when it is deployed. This should look similar to this:
```solidity
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
      _disableInitializers();
  }
```

Sources:
- https://docs.openzeppelin.com/contracts/4.x/api/proxy#Initializable-_disableInitializers--
- https://twitter.com/0xCygaar/status/1621417995905167360?s=20

*Instances (16)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

180:     constructor() {}

```

```solidity
File: ./contracts/APIHelper/GenesisPoolAPI.sol

38:     constructor() {}

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

34:     constructor() {}

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

20:     constructor() {}

```

```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

135:     constructor() {}

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

142:     constructor() {}

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

36:     constructor() {}

```

```solidity
File: ./contracts/FixedAuction.sol

12:     constructor() {}

```

```solidity
File: ./contracts/GaugeManager.sol

78:     constructor() {}

```

```solidity
File: ./contracts/GenesisPoolManager.sol

68:     constructor() {}

```

```solidity
File: ./contracts/MinterUpgradeable.sol

56:     constructor() {}

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

12:     constructor() {}

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

20:     constructor() {}

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

28:     constructor() {}

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

26:     constructor() {}

```

```solidity
File: ./contracts/factories/PairFactory.sol

41:     constructor() {}

```

### <a name="L-16"></a>[L-16] Division by zero not prevented
The divisions below take an input parameter which does not have any zero-value checks, which may lead to the functions reverting when zero is passed.

*Instances (54)*:
```solidity
File: ./contracts/BlackGovernor.sol

92:         return (token.getsmNFTPastTotalSupply() * quorumNumerator()) / quorumDenominator();

```

```solidity
File: ./contracts/Bribes.sol

125:                 reward += (cp0.balanceOf * tokenRewardsPerEpoch[_rewardToken][_currTs]) / _supply;

```

```solidity
File: ./contracts/FixedAuction.sol

27:         return (depositAmount * tokenAllocation.proposedNativeAmount) / tokenAllocation.proposedFundingAmount;

33:         return (depositAmount * tokenAllocation.proposedFundingAmount) / tokenAllocation.proposedNativeAmount;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

110:             accRewardPerShare = accRewardPerShare + ( reward * (ACC_TOKEN_PRECISION) / lpSupply );

137:         uint256 _rewardPerSecond = amount / (distributePeriod);

164:                 pool.accRewardPerShare = pool.accRewardPerShare + ( reward * (ACC_TOKEN_PRECISION) / (lpSupply) );

186:             rewardPerSecond = (notDistributed - amount) / timeleft;

```

```solidity
File: ./contracts/GaugeManager.sol

296:         if(totalWeight > 0) _ratio = amount * 1e18 / Math.max(totalWeight, 1);     // 1e18 adjustment is removed during claim

```

```solidity
File: ./contracts/GaugeV2.sol

193:             return rewardPerTokenStored + (lastTimeRewardApplicable() - lastUpdateTime) * rewardRate * 1e18 / _totalSupply; 

```

```solidity
File: ./contracts/GenesisPool.sol

325:         uint256 balance = (_depositerLiquidity * userDeposits[account]) / totalDeposits;

332:         uint256 userAmount = (totalDeposits * gaugeTokenAmount) / _depositerLiquidity; 

342:                 userAmount -= (totalDeposits * pendingOwnerStaked) / _depositerLiquidity;

```

```solidity
File: ./contracts/GlobalRouter.sol

70:                 x = (y / x + x) / 2;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

134:         uint256 rebaseAmount = ((_weeklyMint * circulatingBlack) / blackSupply) * (circulatingBlack) / (2 * blackSupply);

```

```solidity
File: ./contracts/Pair.sol

179:         uint256 _ratio = amount * 1e18 / totalSupply; // 1e18 adjustment is removed during claim

204:         uint256 _ratio = amount * 1e18 / totalSupply;

291:         uint _reserve0 = (reserve0Cumulative - _observation.reserve0Cumulative) / timeElapsed;

292:         uint _reserve1 = (reserve1Cumulative - _observation.reserve1Cumulative) / timeElapsed;

303:         return priceAverageCumulative / granularity;

322:             uint _reserve0 = (observations[nextIndex].reserve0Cumulative - observations[i].reserve0Cumulative) / timeElapsed;

323:             uint _reserve1 = (observations[nextIndex].reserve1Cumulative - observations[i].reserve1Cumulative) / timeElapsed;

347:             liquidity = Math.min(_amount0 * _totalSupply / _reserve0, _amount1 * _totalSupply / _reserve1);

366:         amount0 = _liquidity * _balance0 / _totalSupply; // using balances ensures pro-rata distribution

367:         amount1 = _liquidity * _balance1 / _totalSupply; // using balances ensures pro-rata distribution

469:             _reserve0 = _reserve0 * 1e18 / decimals0;

470:             _reserve1 = _reserve1 * 1e18 / decimals1;

472:             amountIn = tokenIn == token0 ? amountIn * 1e18 / decimals0 : amountIn * 1e18 / decimals1;

477:             return amountIn * reserveB / (reserveA + amountIn);

483:             uint _x = x * 1e18 / decimals0;

484:             uint _y = y * 1e18 / decimals1;

```

```solidity
File: ./contracts/RewardsDistributor.sol

91:                     tokens_per_week[this_week] += to_distribute * (block.timestamp - t) / since_last;

98:                     tokens_per_week[this_week] += to_distribute * (next_week - t) / since_last;

152:             to_distribute += balance_of * tokens_per_week[week_cursor] / supply;

185:             to_distribute += balance_of * tokens_per_week[week_cursor] / supply;

```

```solidity
File: ./contracts/RouterV2.sol

70:                 x = (y / x + x) / 2;

153:             uint _x = x * 1e18 / decimals0;

154:             uint _y = y * 1e18 / decimals1;

177:         amountB = amountA * reserveB / reserveA;

309:                 liquidity = Math.min(amountA * _totalSupply / reserveA, amountB * _totalSupply / reserveB);

334:         amountA = liquidity * reserveA / _totalSupply; // using balances ensures pro-rata distribution

```

```solidity
File: ./contracts/VoterV3.sol

226:                 uint256 _poolWeight = _weights[i] * _weight / _totalVoteWeight;

```

```solidity
File: ./contracts/VotingEscrow.sol

630:                 u_old.slope = old_locked.amount / iMAXTIME;

634:                 u_new.slope = new_locked.amount / iMAXTIME;

662:             block_slope = (MULTIPLIER * (block.number - last_point.blk)) / (block.timestamp - last_point.ts);

1369:         return (amount * PRECISISON) / (SMNFT_BONUS + PRECISISON);

```

```solidity
File: ./contracts/governance/Governor.sol

799:         return (token.getsmNFTPastTotalSupply() * quorumNumerator()) / quorumDenominator();

```

```solidity
File: ./contracts/governance/L2GovernorVotesQuorumFraction.sol

50:         return (token.getPastTotalSupply(blockTimestamp) * quorumNumerator()) / quorumDenominator();

```

```solidity
File: ./contracts/libraries/Math.sol

17:                 x = (y / x + x) / 2;

28:             if (n / y >= z) {

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

29:         require(c / a == b, "SignedSafeMath: multiplication overflow");

50:         int256 c = a / b;

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

121:             block_time += (d_t * (_block - point_0.blk)) / d_block;

144:                 dt = ((_block - point.blk) * (point_next.ts - point.ts)) / (point_next.blk - point.blk);

```

### <a name="L-17"></a>[L-17] `domainSeparator()` isn't protected against replay attacks in case of a future chain split 
Severity: Low.
Description: See <https://eips.ethereum.org/EIPS/eip-2612#security-considerations>.
Remediation: Consider using the [implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/EIP712.sol#L77-L90) from OpenZeppelin, which recalculates the domain separator if the current `block.chainid` is not the cached chain ID.
Past occurrences of this issue:
- [Reality Cards Contest](https://github.com/code-423n4/2021-06-realitycards-findings/issues/166)
- [Swivel Contest](https://github.com/code-423n4/2021-09-swivel-findings/issues/98)
- [Malt Finance Contest](https://github.com/code-423n4/2021-11-malt-findings/issues/349)

*Instances (5)*:
```solidity
File: ./contracts/Pair.sol

28:     bytes32 internal DOMAIN_SEPARATOR;

516:         DOMAIN_SEPARATOR = keccak256(

528:                 DOMAIN_SEPARATOR,

```

```solidity
File: ./contracts/VotingEscrow.sol

1327:         bytes32 domainSeparator = keccak256(

1340:             abi.encodePacked("\x19\x01", domainSeparator, structHash)

```

### <a name="L-18"></a>[L-18] Duplicate import statements

*Instances (2)*:
```solidity
File: ./contracts/GaugeManager.sol

15: import './interfaces/IBribe.sol';

20: import './interfaces/IBribe.sol';

```

### <a name="L-19"></a>[L-19] Empty Function Body - Consider commenting why

*Instances (3)*:
```solidity
File: ./contracts/BlackGovernor.sol

63:     function clock() public view override returns (uint48) {}

65:     function CLOCK_MODE() public view override returns (string memory) {}

```

```solidity
File: ./contracts/FixedAuction.sol

37:     function purchased(uint256 amount) external {

```

### <a name="L-20"></a>[L-20] External calls in an un-bounded `for-`loop may result in a DOS
Consider limiting the number of iterations in for-loops that make external calls

*Instances (3)*:
```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

189:             IAutoVotingEscrow.LockInfo[] memory locks = avms[i].getLocks(); // assuming locks() is a function

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

205:             IAutoVotingEscrow.LockInfo[] memory locks = avms[i].getLocks(); // assuming locks() is a function

```

```solidity
File: ./contracts/PermissionsRegistry.sol

114:                     _addressToRoles[rta[i]].pop();

```

### <a name="L-21"></a>[L-21] External call recipient may consume all transaction gas
There is no limit specified on the amount of gas used, so the recipient can use up all of the transaction's gas, causing it to revert. Use `addr.call{gas: <amount>}("")` or [this](https://github.com/nomad-xyz/ExcessivelySafeCall) library instead.

*Instances (13)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

269:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));

```

```solidity
File: ./contracts/GlobalRouter.sol

283:         token.call(abi.encodeWithSelector(erc20.transferFrom.selector, from, to, value));

288:         (bool success,) = to.call{value:value}(new bytes(0));

295:         token.call(abi.encodeWithSelector(erc20.transfer.selector, to, value));

```

```solidity
File: ./contracts/Pair.sol

571:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));

578:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.approve.selector, spender, value));

```

```solidity
File: ./contracts/PairFees.sol

24:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));

```

```solidity
File: ./contracts/RouterV2.sol

641:         (bool success,) = to.call{value:value}(new bytes(0));

648:         token.call(abi.encodeWithSelector(erc20.transfer.selector, to, value));

655:         token.call(abi.encodeWithSelector(erc20.transferFrom.selector, from, to, value));

```

```solidity
File: ./contracts/Thenian.sol

44:         (bool withdrawMultiSig, ) = multiSig.call{value: address(this).balance}("");

```

```solidity
File: ./contracts/governance/Governor.sol

344:             (bool success, bytes memory returndata) = targets[i].call{value: values[i]}(calldatas[i]);

```

```solidity
File: ./contracts/governance/L2Governor.sol

335:             (bool success, bytes memory returndata) = targets[i].call{value: values[i]}(calldatas[i]);

```

### <a name="L-22"></a>[L-22] Fallback lacking `payable`

*Instances (1)*:
```solidity
File: ./contracts/RouterV2.sol

148:         assert(msg.sender == address(wETH)); // only accept ETH via fallback from the WETH contract

```

### <a name="L-23"></a>[L-23] Initializers could be front-run
Initializers could be front-run, allowing an attacker to either set their own values, take ownership of the contract, and in the best case forcing a re-deployment

*Instances (43)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

50:     function initialize(address _votingEscrow, address _voter, address _rewardsDistributor) public initializer {

51:         __Ownable_init();

52:         __ReentrancyGuard_init();

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

38:     function initialize(address _permissionRegistry) initializer  public {

39:         __Ownable_init();   //after deploy ownership to multisig

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

91:         IAlgebraPool(customPool).initialize(initialPrice);

```

```solidity
File: ./contracts/FixedAuction.sol

14:     function initialize() initializer  public {

15:         __Ownable_init();

```

```solidity
File: ./contracts/GaugeManager.sol

80:     function initialize(address __ve, address _tokenHandler, address _gaugeFactory, address _gaugeFactoryCL, 

81:                         address _pairFactory, address _pairFactoryCL, address _permissionRegistory) initializer public {

82:      __Ownable_init();

83:      __ReentrancyGuard_init();

```

```solidity
File: ./contracts/GenesisPoolManager.sol

70:     function initialize(address _epochController, address _router, address _permissionRegistory, address _gaugeManager, address _pairFactory, address _genesisFactory, address _auctionFactory, address _tokenHandler) initializer  public {

71:         __Ownable_init();

72:         __ReentrancyGuard_init();

```

```solidity
File: ./contracts/MinterUpgradeable.sol

42:     address internal _initializer;

58:     function initialize(    

62:     ) initializer public {

63:         __Ownable_init();

65:         _initializer = msg.sender;

83:     function _initialize(

88:         require(_initializer == msg.sender);

97:         _initializer = address(0);

161:         if (block.timestamp >= _period + WEEK && _initializer == address(0)) { // only trigger if new week

214:         return (block.timestamp >= _period + WEEK && _initializer == address(0));

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

14:     function initialize() initializer public {

15:         __Ownable_init();

```

```solidity
File: ./contracts/VoterV3.sol

52:     function initialize(

57:     ) public initializer {

58:         __Ownable_init();

59:         __ReentrancyGuard_init();

```

```solidity
File: ./contracts/chainlink/EpochController.sol

25:     function initialize(address _minter, address _permissionsRegistry, address _gaugeManager) public initializer {

26:         __Ownable_init();

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

23:     function initialize(address _auction) public initializer {

24:         __Ownable_init();

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

37:     function initialize(address _voter, address _gaugeManager, address _permissionsRegistry, address _tokenHandler) initializer  public {

38:         __Ownable_init();   //after deploy ownership to multisig

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

30:     function initialize(address _permissionRegistry) initializer  public {

31:         __Ownable_init();   //after deploy ownership to multisig

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

28:     function initialize(address _tokenHandler) public initializer {

29:         __Ownable_init();

```

```solidity
File: ./contracts/factories/PairFactory.sol

43:     function initialize(address _pairGenerator) public initializer {

44:         __Ownable_init();

```

### <a name="L-24"></a>[L-24] Signature use at deadlines should be allowed
According to [EIP-2612](https://github.com/ethereum/EIPs/blob/71dc97318013bf2ac572ab63fab530ac9ef419ca/EIPS/eip-2612.md?plain=1#L58), signatures used on exactly the deadline timestamp are supposed to be allowed. While the signature may or may not be used for the exact EIP-2612 use case (transfer approvals), for consistency's sake, all deadlines should follow this semantic. If the timestamp is an expiration rather than a deadline, consider whether it makes more sense to include the expiration timestamp as a valid timestamp, as is done for deadlines.

*Instances (29)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

80:             if(_locked.end > block.timestamp || _locked.isPermanent) {

92:             if(_locked.end < block.timestamp && !_locked.isPermanent) {

```

```solidity
File: ./contracts/BlackClaims.sol

95:         _active = isSeasonFinalized() && season.claim_end_time >= block.timestamp;

102:         _ended = isSeasonFinalized() && season.claim_end_time < block.timestamp;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

181:         if(token == address(rewardToken) && rewardPerSecond != 0 && lastDistributedTime > block.timestamp){

```

```solidity
File: ./contracts/GenesisPool.sol

407:         require(_startTime + genesisInfo.duration - BlackTimeLibrary.NO_GENESIS_DEPOSIT_WINDOW > block.timestamp, "TIME");

```

```solidity
File: ./contracts/GenesisPoolManager.sol

154:         require(genesisInfo.startTime + genesisInfo.duration - BlackTimeLibrary.NO_GENESIS_DEPOSIT_WINDOW > block.timestamp, "TIME");

```

```solidity
File: ./contracts/GlobalRouter.sol

166:         require(deadline >= block.timestamp, 'BaseV1Router: EXPIRED');

```

```solidity
File: ./contracts/Pair.sol

515:         require(deadline >= block.timestamp, 'EXP');

```

```solidity
File: ./contracts/RewardsDistributor.sol

205:             if (_locked.end < block.timestamp && !_locked.isPermanent) {

232:                 if(_locked.end < block.timestamp && !_locked.isPermanent){

```

```solidity
File: ./contracts/RouterV2.sol

133:         require(deadline >= block.timestamp, 'EXP');

```

```solidity
File: ./contracts/VotingEscrow.sol

629:             if (old_locked.end > block.timestamp && old_locked.amount > 0) {

633:             if (new_locked.end > block.timestamp && new_locked.amount > 0) {

675:                 if (t_i > block.timestamp) {

729:             if (old_locked.end > block.timestamp) {

738:             if (new_locked.end > block.timestamp) {

821:         require(_locked.end > block.timestamp || _locked.isPermanent, 'EXP');

841:         require(unlock_time > block.timestamp && (unlock_time <= block.timestamp + MAXTIME), 'IUT');

884:         require(_locked.end > block.timestamp || _locked.isPermanent, 'EXP');

906:         require(_locked.end > block.timestamp && _locked.amount > 0, 'EXP||ZV');

907:         require((isSMNFT || unlock_time > _locked.end) && (unlock_time <= block.timestamp + MAXTIME), 'IUT'); // IUT -> invalid unlock time

971:         require(_newLocked.end > block.timestamp, "EXP");

1092:         require(_locked1.end > block.timestamp ||  _locked1.isPermanent,"EXP||PERM");

1157:         require(newLocked.end > block.timestamp || newLocked.isPermanent, "EXP");

```

```solidity
File: ./contracts/governance/Governor.sol

175:         if (start >= block.timestamp) {

181:         if (deadline >= block.timestamp) {

```

```solidity
File: ./contracts/governance/L2Governor.sol

166:         if (start >= block.timestamp) {

172:         if (deadline >= block.timestamp) {

```

### <a name="L-25"></a>[L-25] Prevent accidentally burning tokens
Minting and burning tokens to address(0) prevention

*Instances (36)*:
```solidity
File: ./contracts/Black.sol

24:         _mint(msg.sender, 0);

29:         require(msg.sender == minter);

35:         require(msg.sender == minter && !initialMinted);

37:         _mint(_recipient, 500 * 1e6 * 1e18);

77:         require(msg.sender == minter, 'not allowed');

78:         _mint(account, amount);

83:         _burn(msg.sender, value);

92:         _burn(_from, _value);

```

```solidity
File: ./contracts/BlackGovernor.sol

103:         require(address(targets[0]) == minter, "GovernorSimple: only minter allowed");

```

```solidity
File: ./contracts/Bribes.sol

72:         require(minter != address(0), "ZA");

83:         return IMinter(minter).active_period();

83:         return IMinter(minter).active_period();

309:         uint256 _startTimestamp = IMinter(minter).active_period() + WEEK;

309:         uint256 _startTimestamp = IMinter(minter).active_period() + WEEK;

339:         require(_minter != address(0), "ZA");

```

```solidity
File: ./contracts/GaugeManager.sol

291:         require(msg.sender == minter, "NA");

343:         IMinter(minter).update_period();

343:         IMinter(minter).update_period();

353:         IMinter(minter).update_period();

353:         IMinter(minter).update_period();

362:         IMinter(minter).update_period();

362:         IMinter(minter).update_period();

422:                     IERC20Upgradeable(base).safeTransfer(minter, _share); // send rewards back to Minter so they're not stuck in GaugeManager

448:             IERC20Upgradeable(base).safeTransfer(minter, _claimable);

541:         require(_minter != address(0), "ZA");

542:         require(_minter.code.length > 0, "CODELEN");

543:         emit SetMinter(minter, _minter);

```

```solidity
File: ./contracts/MinterUpgradeable.sol

209:         return _black.totalSupply() - _black.balanceOf(address(_ve)) - _black.balanceOf(address(burnTokenAddress));

```

```solidity
File: ./contracts/Pair.sol

345:             _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens

350:         _mint(to, liquidity);

369:         _burn(address(this), _liquidity);

```

```solidity
File: ./contracts/VotingEscrow.sol

845:         _mint(_to, _tokenId);

959:         _burn(_tokenId);

1100:         _burn(_from);

1168:         _burn(_from);

1192:         _mint(_to, _tokenId);

```

### <a name="L-26"></a>[L-26] Possible rounding issue
Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator. Also, there is indication of multiplication and division without the use of parenthesis which could result in issues.

*Instances (21)*:
```solidity
File: ./contracts/Bribes.sol

125:                 reward += (cp0.balanceOf * tokenRewardsPerEpoch[_rewardToken][_currTs]) / _supply;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

110:             accRewardPerShare = accRewardPerShare + ( reward * (ACC_TOKEN_PRECISION) / lpSupply );

164:                 pool.accRewardPerShare = pool.accRewardPerShare + ( reward * (ACC_TOKEN_PRECISION) / (lpSupply) );

```

```solidity
File: ./contracts/GaugeManager.sol

296:         if(totalWeight > 0) _ratio = amount * 1e18 / Math.max(totalWeight, 1);     // 1e18 adjustment is removed during claim

```

```solidity
File: ./contracts/GaugeV2.sol

193:             return rewardPerTokenStored + (lastTimeRewardApplicable() - lastUpdateTime) * rewardRate * 1e18 / _totalSupply; 

```

```solidity
File: ./contracts/GenesisPool.sol

325:         uint256 balance = (_depositerLiquidity * userDeposits[account]) / totalDeposits;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

134:         uint256 rebaseAmount = ((_weeklyMint * circulatingBlack) / blackSupply) * (circulatingBlack) / (2 * blackSupply);

```

```solidity
File: ./contracts/Pair.sol

179:         uint256 _ratio = amount * 1e18 / totalSupply; // 1e18 adjustment is removed during claim

204:         uint256 _ratio = amount * 1e18 / totalSupply;

347:             liquidity = Math.min(_amount0 * _totalSupply / _reserve0, _amount1 * _totalSupply / _reserve1);

366:         amount0 = _liquidity * _balance0 / _totalSupply; // using balances ensures pro-rata distribution

367:         amount1 = _liquidity * _balance1 / _totalSupply; // using balances ensures pro-rata distribution

477:             return amountIn * reserveB / (reserveA + amountIn);

```

```solidity
File: ./contracts/RewardsDistributor.sol

152:             to_distribute += balance_of * tokens_per_week[week_cursor] / supply;

185:             to_distribute += balance_of * tokens_per_week[week_cursor] / supply;

```

```solidity
File: ./contracts/RouterV2.sol

177:         amountB = amountA * reserveB / reserveA;

309:                 liquidity = Math.min(amountA * _totalSupply / reserveA, amountB * _totalSupply / reserveB);

313:                 liquidity = Math.min(amountA * _totalSupply / reserveA, amountB * _totalSupply / reserveB);

334:         amountA = liquidity * reserveA / _totalSupply; // using balances ensures pro-rata distribution

335:         amountB = liquidity * reserveB / _totalSupply; // using balances ensures pro-rata distribution

```

```solidity
File: ./contracts/VoterV3.sol

226:                 uint256 _poolWeight = _weights[i] * _weight / _totalVoteWeight;

```

### <a name="L-27"></a>[L-27] Loss of precision
Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator

*Instances (59)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

162:             rewardRate = reward / DURATION;

166:             rewardRate = (reward + leftover) / DURATION;

226:             uint256 _dibsFeeToken0 = (dibs != address(0)) ? (claimed0 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

227:             uint256 _dibsFeeToken1 = (dibs != address(0)) ? (claimed1 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

286:         uint256 _dibsFeeToken0 = (dibs != address(0)) ? (totalFeeToken0 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

287:         uint256 _dibsFeeToken1 = (dibs != address(0)) ? (totalFeeToken1 * referralFee / REFERRAL_FEE_DENOMINATOR) : 0;

303:         uint256 algebraFeeToken0 = communityVaultAccruedFeeToken0 * algebraFee / ALGEBRA_FEE_DENOMINATOR;

304:         uint256 algebraFeeToken1 = communityVaultAccruedFeeToken1 * algebraFee / ALGEBRA_FEE_DENOMINATOR;

```

```solidity
File: ./contracts/Bribes.sol

115:         uint256 numEpochs = (BlackTimeLibrary.epochStart(block.timestamp) - _currTs) / WEEK;

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

80:         user.rewardDebt = (userBalance * (pool.accRewardPerShare) / ACC_TOKEN_PRECISION);

113:         pending =  (user.amount * (accRewardPerShare) / ACC_TOKEN_PRECISION)  - (user.rewardDebt);

```

```solidity
File: ./contracts/GaugeManager.sol

296:         if(totalWeight > 0) _ratio = amount * 1e18 / Math.max(totalWeight, 1);     // 1e18 adjustment is removed during claim

```

```solidity
File: ./contracts/GaugeV2.sol

193:             return rewardPerTokenStored + (lastTimeRewardApplicable() - lastUpdateTime) * rewardRate * 1e18 / _totalSupply; 

387:             rewardRate = reward / DURATION;

391:             rewardRate = (reward + leftover) / DURATION;

399:         require(rewardRate <= balance / DURATION, "REWARD_HIGH");

```

```solidity
File: ./contracts/GenesisPool.sol

325:         uint256 balance = (_depositerLiquidity * userDeposits[account]) / totalDeposits;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

76:         active_period = ((block.timestamp + (2 * WEEK)) / WEEK) * WEEK;

98:         active_period = ((block.timestamp) / WEEK) * WEEK; // allow minter.update_period() to mint new emissions THIS Thursday

163:             _period = (block.timestamp / WEEK) * WEEK;

170:                 _emission = (_weekly * tailEmissionRate) / MAX_BPS;

175:                     _weekly = (_weekly * WEEKLY_GROWTH) / MAX_BPS;

177:                     _weekly = (_weekly * WEEKLY_DECAY) / MAX_BPS;

186:             uint _teamEmissions = _emission * teamRate / MAX_BPS;

218:         return(block.timestamp / WEEK) * WEEK;

```

```solidity
File: ./contracts/Pair.sol

179:         uint256 _ratio = amount * 1e18 / totalSupply; // 1e18 adjustment is removed during claim

204:         uint256 _ratio = amount * 1e18 / totalSupply;

347:             liquidity = Math.min(_amount0 * _totalSupply / _reserve0, _amount1 * _totalSupply / _reserve1);

366:         amount0 = _liquidity * _balance0 / _totalSupply; // using balances ensures pro-rata distribution

367:         amount1 = _liquidity * _balance1 / _totalSupply; // using balances ensures pro-rata distribution

477:             return amountIn * reserveB / (reserveA + amountIn);

```

```solidity
File: ./contracts/RewardsDistributor.sol

53:         uint _t = block.timestamp / WEEK * WEEK;

71:         return block.timestamp / WEEK * WEEK;

82:         uint this_week = t / WEEK * WEEK;

139:             week_cursor = user_point.ts / WEEK * WEEK;

173:             week_cursor = user_point.ts / WEEK * WEEK;

193:         uint _last_token_time = last_token_time / WEEK * WEEK;

199:         _last_token_time = _last_token_time / WEEK * WEEK;

221:         _last_token_time = _last_token_time / WEEK * WEEK;

```

```solidity
File: ./contracts/RouterV2.sol

177:         amountB = amountA * reserveB / reserveA;

309:                 liquidity = Math.min(amountA * _totalSupply / reserveA, amountB * _totalSupply / reserveB);

313:                 liquidity = Math.min(amountA * _totalSupply / reserveA, amountB * _totalSupply / reserveB);

334:         amountA = liquidity * reserveA / _totalSupply; // using balances ensures pro-rata distribution

335:         amountB = liquidity * reserveB / _totalSupply; // using balances ensures pro-rata distribution

```

```solidity
File: ./contracts/VoterV3.sol

226:                 uint256 _poolWeight = _weights[i] * _weight / _totalVoteWeight;

```

```solidity
File: ./contracts/VotingEscrow.sol

630:                 u_old.slope = old_locked.amount / iMAXTIME;

634:                 u_new.slope = new_locked.amount / iMAXTIME;

662:             block_slope = (MULTIPLIER * (block.number - last_point.blk)) / (block.timestamp - last_point.ts);

669:             uint t_i = (last_checkpoint / WEEK) * WEEK;

692:                 last_point.blk = initial_last_point.blk + (block_slope * (t_i - initial_last_point.ts)) / MULTIPLIER;

838:         uint unlock_time = (block.timestamp + _lock_duration) / WEEK * WEEK; // Locktime is rounded down to weeks

904:         uint unlock_time = (block.timestamp + _lock_duration) / WEEK * WEEK; // Locktime is rounded down to weeks

996:         _newLocked.end = ((block.timestamp + MAXTIME) / WEEK) * WEEK;

1365:         return (SMNFT_BONUS * amount) / PRECISISON;

1369:         return (amount * PRECISISON) / (SMNFT_BONUS + PRECISISON);

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

50:             return (duration / WEEK) * WEEK;

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

121:             block_time += (d_t * (_block - point_0.blk)) / d_block;

148:                 dt = ((_block - point.blk) * (block.timestamp - point.ts)) / (block.number - point.blk);

191:         uint t_i = (last_point.ts / WEEK) * WEEK;

```

### <a name="L-28"></a>[L-28] Solidity version 0.8.20+ may not work on other chains due to `PUSH0`
The compiler for Solidity 0.8.20 switches the default target EVM version to [Shanghai](https://blog.soliditylang.org/2023/05/10/solidity-0.8.20-release-announcement/#important-note), which includes the new `PUSH0` op code. This op code may not yet be implemented on all L2s, so deployment on these chains will fail. To work around this issue, use an earlier [EVM](https://docs.soliditylang.org/en/v0.8.20/using-the-compiler.html?ref=zaryabs.com#setting-the-evm-version-to-target) [version](https://book.getfoundry.sh/reference/config/solidity-compiler#evm_version). While the project itself may or may not compile with 0.8.20, other projects with which it integrates, or which extend this project may, and those projects will have problems deploying these contracts/libraries.

*Instances (34)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/APIHelper/GenesisPoolAPI.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/Black.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/BlackClaims.sol

4: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/BlackGovernor.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/Bribes.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/FixedAuction.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/GaugeManager.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/GenesisPool.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/Pair.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/PairFees.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/PairGenerator.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/PermissionsRegistry.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/RewardsDistributor.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/TokenHandler.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/VotingEscrow.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/factories/PairFactory.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/Base64.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/Math.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/PoolsAndRewardsLibrary.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

3: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

1: pragma solidity 0.8.13;

```

### <a name="L-29"></a>[L-29] Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership`
Use [Ownable2Step.transferOwnership](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable2Step.sol) which is safer. Use it as it is more secure due to 2-stage ownership transfer.

**Recommended Mitigation Steps**

Use <a href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable2Step.sol">Ownable2Step.sol</a>
  
  ```solidity
      function acceptOwnership() external {
          address sender = _msgSender();
          require(pendingOwner() == sender, "Ownable2Step: caller is not the new owner");
          _transferOwnership(sender);
      }
```

*Instances (26)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

58:         _transferOwnership(msg.sender);

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

4: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

10: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/CustomToken.sol

6: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/Fan.sol

6: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/FixedAuction.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

6: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/GaugeManager.sol

25: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/GaugeV2.sol

5: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/GenesisPoolManager.sol

4: import "@openzeppelin/contracts/access/Ownable.sol";

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/GlobalRouter.sol

6: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/MinterUpgradeable.sol

13: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

6: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

5: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/Thenian.sol

6: import "@openzeppelin/contracts/access/Ownable.sol";

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

7: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/VoterV3.sol

15: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/chainlink/EpochController.sol

9: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

5: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

```solidity
File: ./contracts/factories/PairFactory.sol

8: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

```

### <a name="L-30"></a>[L-30] File allows a version of solidity that is susceptible to an assembly optimizer bug
In solidity versions 0.8.13 and 0.8.14, there is an [optimizer bug](https://github.com/ethereum/solidity-blog/blob/499ab8abc19391be7b7b34f88953a067029a5b45/_posts/2022-06-15-inline-assembly-memory-side-effects-bug.md) where, if the use of a variable is in a separate `assembly` block from the block in which it was stored, the `mstore` operation is optimized out, leading to uninitialized memory. The code currently does not have such a pattern of execution, but it does use `mstore`s in `assembly` blocks, so it is a risk for future changes. The affected solidity versions should be avoided if at all possible.

*Instances (34)*:
```solidity
File: ./contracts/APIHelper/BlackholePairAPIV2.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/APIHelper/GenesisPoolAPI.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/APIHelper/RewardAPI.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/APIHelper/TokenAPI.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/APIHelper/TradeHelper.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

1: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/Black.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/BlackClaims.sol

4: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/BlackGovernor.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/Bribes.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/FixedAuction.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/GaugeManager.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/GenesisPool.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/MinterUpgradeable.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/Pair.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/PairFees.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/PairGenerator.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/PermissionsRegistry.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/RewardsDistributor.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/TokenHandler.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/VotingEscrow.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/factories/PairFactory.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/Base64.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/BlackTimeLibrary.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/Math.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/PoolsAndRewardsLibrary.sol

2: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/SignedSafeMath.sol

3: pragma solidity 0.8.13;

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

1: pragma solidity 0.8.13;

```

### <a name="L-31"></a>[L-31] Sweeping may break accounting if tokens with multiple addresses are used
There have been [cases](https://blog.openzeppelin.com/compound-tusd-integration-issue-retrospective/) in the past where a token mistakenly had two addresses that could control its balance, and transfers using one address impacted the balance of the other. To protect against this potential scenario, sweep functions should ensure that the balance of the non-sweepable token does not change after the transfer of the swept tokens.

*Instances (11)*:
```solidity
File: ./contracts/BlackClaims.sol

241:     function recoverERC20(address tokenAddress_) external onlyOwner {

```

```solidity
File: ./contracts/Bribes.sol

306:     function recoverERC20AndUpdateData(address tokenAddress, uint256 tokenAmount) external onlyAllowed {

319:     function emergencyRecoverERC20(address tokenAddress, uint256 tokenAmount) external onlyAllowed {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

174:     function recoverERC20(uint amount, address token) external onlyOwner {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

14:     function emergencyRecoverERC20(address tokenAddress, uint256 tokenAmount) external;

15:     function recoverERC20AndUpdateData(address tokenAddress, uint256 tokenAmount) external;

198:     function recoverERC20From(address[] memory _bribe, address[] memory _tokens, uint[] memory _amounts) external onlyOwner {

204:             if(_amounts[i] > 0) IBribe(_bribe[i]).emergencyRecoverERC20(_tokens[i], _amounts[i]);

209:     function recoverERC20AndUpdateData(address[] memory _bribe, address[] memory _tokens, uint[] memory _amounts) external onlyOwner {

215:             if(_amounts[i] > 0) IBribe(_bribe[i]).emergencyRecoverERC20(_tokens[i], _amounts[i]);

```

```solidity
File: ./contracts/interfaces/IBribeDistribution.sol

10:     function recoverERC20(address tokenAddress, uint256 tokenAmount) external ;

```

### <a name="L-32"></a>[L-32] `symbol()` is not a part of the ERC-20 standard
The `symbol()` function is not a part of the [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20), and was added later as an [optional extension](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/IERC20Metadata.sol). As such, some valid ERC20 tokens do not support this interface, so it is unsafe to blindly cast all tokens to this interface, and then call this function.

*Instances (6)*:
```solidity
File: ./contracts/GaugeManager.sol

251:             _internalType =  string.concat("Black LP Fees: ", IERC20(_pool).symbol() );

252:             _extrenalType = string.concat("Black Bribes: ", IERC20(_pool).symbol() );

```

```solidity
File: ./contracts/Pair.sol

97:             name = string(abi.encodePacked("StableV1 AMM - ", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

98:             symbol = string(abi.encodePacked("sAMM-", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

100:             name = string(abi.encodePacked("VolatileV1 AMM - ", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

101:             symbol = string(abi.encodePacked("vAMM-", IERC20(_token0).symbol(), "/", IERC20(_token1).symbol()));

```

### <a name="L-33"></a>[L-33] Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting
Downcasting from `uint256`/`int256` in Solidity does not revert on overflow. This can result in undesired exploitation or bugs, since developers usually assume that overflows raise errors. [OpenZeppelin's SafeCast library](https://docs.openzeppelin.com/contracts/3.x/api/utils#SafeCast) restores this intuition by reverting the transaction when such an operation overflows. Using this library eliminates an entire class of bugs, so it's recommended to use it always. Some exceptions are acceptable like with the classic `uint256(uint160(address(variable)))`

*Instances (6)*:
```solidity
File: ./contracts/APIHelper/veNFTAPI.sol

238:         venft.amount = _lockedBalance.isSMNFT ? uint128(ve.calculate_original_sm_nft_amount(uint256(int256(_lockedBalance.amount)))) : uint128(_lockedBalance.amount); // this is 10% extra for super massive

```

```solidity
File: ./contracts/APIHelper/veNFTAPIV1.sol

254:         venft.amount = _lockedBalance.isSMNFT ? uint128(ve.calculate_original_sm_nft_amount(uint256(int256(_lockedBalance.amount)))) : uint128(_lockedBalance.amount); // this is 10% extra for super massive

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

181:         algebraEternalFarming.addRewards(incentivekey, uint128(reward), 0);

```

```solidity
File: ./contracts/BlackClaims.sol

117:         _season.remaining_reward_amount -= uint128(_remaining_reward_amount);

```

```solidity
File: ./contracts/GaugeManager.sol

387:                     IAlgebraEternalFarming(farmingParam.algebraEternalFarming).setRates(incentivekey, uint128(rewardRate), bonusRewardRate);

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

35:             buffer[digits] = bytes1(uint8(48 + uint(value % 10)));

```

### <a name="L-34"></a>[L-34] Unsafe ERC20 operation(s)

*Instances (32)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrow.sol

55:         IVotingEscrow(votingEscrow).approve(msg.sender, _tokenId);

```

```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

83:         votingEscrow.transferFrom(msg.sender, address(target), tokenId);

98:         votingEscrow.transferFrom(address(avm), msg.sender, tokenId);

```

```solidity
File: ./contracts/BlackClaims.sol

115:         bool transfer_success = token.transfer(treasury, _remaining_reward_amount);

133:         bool transfer_success = token.transferFrom(treasury, address(this), _season.reward_amount);

218:             bool transfer_success = token.transfer(msg.sender, claimed_reward);

221:         token.approve(address(_ve), staked_reward);

244:         IERC20(tokenAddress_).transfer(msg.sender, _balance);

```

```solidity
File: ./contracts/GaugeManager.sol

224:         IERC20(base).approve(_gauge, type(uint256).max);

```

```solidity
File: ./contracts/MinterUpgradeable.sol

91:             _black.approve(address(_ve), type(uint).max);

195:             require(_black.transfer(team, _teamEmissions));

197:             require(_black.transfer(address(_rewards_distributor), _rebase));

200:             _black.approve(address(_gaugeManager), _gauge);

```

```solidity
File: ./contracts/RewardsDistributor.sol

62:         require(IERC20(_token).approve(_voting_escrow, type(uint).max), "approval failed");

210:                 IERC20(token).transfer(_nftOwner, amount);

234:                     IERC20(token).transfer(_nftOwner, amount);

262:         IERC20(_token).transfer(msg.sender, _balance);

```

```solidity
File: ./contracts/RouterV2.sol

412:         assert(wETH.transfer(pair, amountETH));

430:         require(IBaseV1Pair(pair).transferFrom(msg.sender, pair, liquidity), "ITFM"); // send liquidity to pair

503:                     IERC20(routes[i].from).approve(swapRouter, amounts[i]);

555:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

557:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

579:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

581:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

594:             assert(wETH.transfer(pairFor(routes[0].from, routes[0].to, routes[0].stable),amounts[0]));

597:                 IERC20(address(wETH)).approve(swapRouter, amounts[0]);

619:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

621:                 IERC20(routes[0].from).approve(swapRouter, amounts[0]);

759:         assert(wETH.transfer(pairFor(routes[0].from, routes[0].to, routes[0].stable), amountIn));

```

```solidity
File: ./contracts/VotingEscrow.sol

798:                 assert(IERC20(token).transferFrom(from, address(this), _value));

956:         assert(IERC20(token).transfer(msg.sender, value));

```

```solidity
File: ./contracts/WAVAX.sol

39:         payable(msg.sender).transfer(wad);

```

### <a name="L-35"></a>[L-35] Unsafe solidity low-level call can cause gas grief attack
Using the low-level calls of a solidity address can leave the contract open to gas grief attacks. These attacks occur when the called contract returns a large amount of data.

So when calling an external contract, it is necessary to check the length of the return data before reading/copying it (using `returndatasize()`).

*Instances (4)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

269:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));

```

```solidity
File: ./contracts/Pair.sol

571:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));

578:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.approve.selector, spender, value));

```

```solidity
File: ./contracts/PairFees.sol

24:         (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));

```

### <a name="L-36"></a>[L-36] Unspecific compiler version pragma

*Instances (1)*:
```solidity
File: ./contracts/interfaces/IAlgebraFarmingProxyPluginFactory.sol

2: pragma solidity >=0.5.0;

```

### <a name="L-37"></a>[L-37] Upgradeable contract is missing a `__gap[50]` storage variable to allow for new storage variables in later versions
See [this](https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps) link for a description of this storage variable. While some contracts may not currently be sub-classed, adding the variable now protects against forgetting to add it in the future.

*Instances (44)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

5: import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

12: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

16: contract AutoVotingEscrowManager is IAutoVotingEscrowManager, Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable  {

97:         IVoter(voter).reset(tokenId); // wrote it here as the autovoting escrow itself isnt upgradeable

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

24: contract GaugeFactoryCL is IGaugeFactoryCL, OwnableUpgradeable {

```

```solidity
File: ./contracts/FixedAuction.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

10: contract FixedAuction is IGenesisPoolBase, IAuction, OwnableUpgradeable {

```

```solidity
File: ./contracts/GaugeManager.sol

24: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

25: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

26: import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

27: import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

33: contract GaugeManager is OwnableUpgradeable, ReentrancyGuardUpgradeable {

34:     using SafeERC20Upgradeable for IERC20Upgradeable;

292:         IERC20Upgradeable(base).safeTransferFrom(msg.sender, address(this), amount);

422:                     IERC20Upgradeable(base).safeTransfer(minter, _share); // send rewards back to Minter so they're not stuck in GaugeManager

448:             IERC20Upgradeable(base).safeTransfer(minter, _claimable);

```

```solidity
File: ./contracts/GenesisPool.sol

5: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

```

```solidity
File: ./contracts/GenesisPoolManager.sol

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

7: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

29: contract GenesisPoolManager is IGenesisPoolBase, IGenesisPoolManager, OwnableUpgradeable, ReentrancyGuardUpgradeable {

```

```solidity
File: ./contracts/MinterUpgradeable.sol

13: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

19: contract MinterUpgradeable is IMinter, OwnableUpgradeable {

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

7: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

9: contract VeArtProxyUpgradeable is IVeArtProxy, OwnableUpgradeable {

```

```solidity
File: ./contracts/VoterV3.sol

15: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

16: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

17: import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

18: import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

20: contract VoterV3 is OwnableUpgradeable, ReentrancyGuardUpgradeable {

21:     using SafeERC20Upgradeable for IERC20Upgradeable;

```

```solidity
File: ./contracts/chainlink/EpochController.sol

9: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

12: contract EpochController is AutomationCompatibleInterface, OwnableUpgradeable  {

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

7: contract AuctionFactory is IAuctionFactory, OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

19: contract BribeFactoryV3 is OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

5: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

23: contract GaugeFactory is IGaugeFactory, OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

10: contract GenesisPoolFactory is IGenesisPoolFactory, OwnableUpgradeable {

```

```solidity
File: ./contracts/factories/PairFactory.sol

8: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

10: contract PairFactory is IPairFactory, OwnableUpgradeable {

```

### <a name="L-38"></a>[L-38] Upgradeable contract not initialized
Upgradeable contracts are initialized via an initializer function rather than by a constructor. Leaving such a contract uninitialized may lead to it being taken over by a malicious user

*Instances (87)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

5: import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

12: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

16: contract AutoVotingEscrowManager is IAutoVotingEscrowManager, Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable  {

50:     function initialize(address _votingEscrow, address _voter, address _rewardsDistributor) public initializer {

51:         __Ownable_init();

52:         __ReentrancyGuard_init();

97:         IVoter(voter).reset(tokenId); // wrote it here as the autovoting escrow itself isnt upgradeable

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

24: contract GaugeFactoryCL is IGaugeFactoryCL, OwnableUpgradeable {

38:     function initialize(address _permissionRegistry) initializer  public {

39:         __Ownable_init();   //after deploy ownership to multisig

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

91:         IAlgebraPool(customPool).initialize(initialPrice);

```

```solidity
File: ./contracts/FixedAuction.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

10: contract FixedAuction is IGenesisPoolBase, IAuction, OwnableUpgradeable {

14:     function initialize() initializer  public {

15:         __Ownable_init();

```

```solidity
File: ./contracts/GaugeManager.sol

24: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

25: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

26: import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

27: import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

33: contract GaugeManager is OwnableUpgradeable, ReentrancyGuardUpgradeable {

34:     using SafeERC20Upgradeable for IERC20Upgradeable;

80:     function initialize(address __ve, address _tokenHandler, address _gaugeFactory, address _gaugeFactoryCL, 

81:                         address _pairFactory, address _pairFactoryCL, address _permissionRegistory) initializer public {

82:      __Ownable_init();

83:      __ReentrancyGuard_init();

292:         IERC20Upgradeable(base).safeTransferFrom(msg.sender, address(this), amount);

422:                     IERC20Upgradeable(base).safeTransfer(minter, _share); // send rewards back to Minter so they're not stuck in GaugeManager

448:             IERC20Upgradeable(base).safeTransfer(minter, _claimable);

```

```solidity
File: ./contracts/GenesisPool.sol

5: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

```

```solidity
File: ./contracts/GenesisPoolManager.sol

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

7: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

29: contract GenesisPoolManager is IGenesisPoolBase, IGenesisPoolManager, OwnableUpgradeable, ReentrancyGuardUpgradeable {

70:     function initialize(address _epochController, address _router, address _permissionRegistory, address _gaugeManager, address _pairFactory, address _genesisFactory, address _auctionFactory, address _tokenHandler) initializer  public {

71:         __Ownable_init();

72:         __ReentrancyGuard_init();

```

```solidity
File: ./contracts/MinterUpgradeable.sol

13: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

19: contract MinterUpgradeable is IMinter, OwnableUpgradeable {

42:     address internal _initializer;

58:     function initialize(    

62:     ) initializer public {

63:         __Ownable_init();

65:         _initializer = msg.sender;

83:     function _initialize(

88:         require(_initializer == msg.sender);

97:         _initializer = address(0);

161:         if (block.timestamp >= _period + WEEK && _initializer == address(0)) { // only trigger if new week

214:         return (block.timestamp >= _period + WEEK && _initializer == address(0));

```

```solidity
File: ./contracts/VeArtProxyUpgradeable.sol

7: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

9: contract VeArtProxyUpgradeable is IVeArtProxy, OwnableUpgradeable {

14:     function initialize() initializer public {

15:         __Ownable_init();

```

```solidity
File: ./contracts/VoterV3.sol

15: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

16: import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

17: import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

18: import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

20: contract VoterV3 is OwnableUpgradeable, ReentrancyGuardUpgradeable {

21:     using SafeERC20Upgradeable for IERC20Upgradeable;

52:     function initialize(

57:     ) public initializer {

58:         __Ownable_init();

59:         __ReentrancyGuard_init();

```

```solidity
File: ./contracts/chainlink/EpochController.sol

9: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

12: contract EpochController is AutomationCompatibleInterface, OwnableUpgradeable  {

25:     function initialize(address _minter, address _permissionsRegistry, address _gaugeManager) public initializer {

26:         __Ownable_init();

```

```solidity
File: ./contracts/factories/AuctionFactory.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

7: contract AuctionFactory is IAuctionFactory, OwnableUpgradeable {

23:     function initialize(address _auction) public initializer {

24:         __Ownable_init();

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

6: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

19: contract BribeFactoryV3 is OwnableUpgradeable {

37:     function initialize(address _voter, address _gaugeManager, address _permissionsRegistry, address _tokenHandler) initializer  public {

38:         __Ownable_init();   //after deploy ownership to multisig

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

5: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

23: contract GaugeFactory is IGaugeFactory, OwnableUpgradeable {

30:     function initialize(address _permissionRegistry) initializer  public {

31:         __Ownable_init();   //after deploy ownership to multisig

```

```solidity
File: ./contracts/factories/GenesisPoolFactory.sol

4: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

10: contract GenesisPoolFactory is IGenesisPoolFactory, OwnableUpgradeable {

28:     function initialize(address _tokenHandler) public initializer {

29:         __Ownable_init();

```

```solidity
File: ./contracts/factories/PairFactory.sol

8: import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

10: contract PairFactory is IPairFactory, OwnableUpgradeable {

43:     function initialize(address _pairGenerator) public initializer {

44:         __Ownable_init();

```

### <a name="L-39"></a>[L-39] Use of ecrecover is susceptible to signature malleability
The built-in EVM precompile ecrecover is susceptible to signature malleability, which could lead to replay attacks.Consider using OpenZeppelin’s ECDSA library instead of the built-in function.

*Instances (2)*:
```solidity
File: ./contracts/Pair.sol

532:         address recoveredAddress = ecrecover(digest, v, r, s);

```

```solidity
File: ./contracts/VotingEscrow.sol

1342:         address signatory = ecrecover(digest, v, r, s);

```


## Medium Issues


| |Issue|Instances|
|-|:-|:-:|
| [M-1](#M-1) | Contracts are vulnerable to fee-on-transfer accounting-related issues | 13 |
| [M-2](#M-2) | `block.number` means different things on different L2s | 16 |
| [M-3](#M-3) | Centralization Risk for trusted owners | 67 |
| [M-4](#M-4) | `_safeMint()` should be used rather than `_mint()` wherever possible | 2 |
| [M-5](#M-5) | Fees can be set to be greater than 100%. | 19 |
| [M-6](#M-6) | Lack of EIP-712 compliance: using `keccak256()` directly on an array or struct variable | 1 |
| [M-7](#M-7) | Library function isn't `internal` or `private` | 106 |
| [M-8](#M-8) | Direct `supportsInterface()` calls may cause caller to revert | 2 |
| [M-9](#M-9) | Return values of `transfer()`/`transferFrom()` not checked | 9 |
| [M-10](#M-10) | Unsafe use of `transfer()`/`transferFrom()` with `IERC20` | 12 |
### <a name="M-1"></a>[M-1] Contracts are vulnerable to fee-on-transfer accounting-related issues
Consistently check account balance before and after transfers for Fee-On-Transfer discrepancies. As arbitrary ERC20 tokens can be used, the amount here should be calculated every time to take into consideration a possible fee-on-transfer or deflation.
Also, it's a good practice for the future of the solution.

Use the balance before and after the transfer to calculate the received amount instead of assuming that it would be equal to the amount passed as a parameter. Or explicitly document that such tokens shouldn't be used and won't be supported

*Instances (13)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

178:         rewardToken.safeTransferFrom(DISTRIBUTION, address(this), reward);

```

```solidity
File: ./contracts/BlackClaims.sol

133:         bool transfer_success = token.transferFrom(treasury, address(this), _season.reward_amount);

```

```solidity
File: ./contracts/Bribes.sol

297:         IERC20(_rewardsToken).safeTransferFrom(msg.sender,address(this),reward);

```

```solidity
File: ./contracts/GaugeManager.sol

292:         IERC20Upgradeable(base).safeTransferFrom(msg.sender, address(this), amount);

```

```solidity
File: ./contracts/GaugeV2.sol

229:         TOKEN.safeTransferFrom(msg.sender, address(this), _totalAmount);

256:         TOKEN.safeTransferFrom(account, address(this), amount);

384:         rewardToken.safeTransferFrom(DISTRIBUTION, address(this), reward);

```

```solidity
File: ./contracts/GenesisPool.sol

106:                 IERC20(_token).safeTransferFrom(_sender, address(this), _amount);

141:         IERC20(genesisInfo.fundingToken).safeTransferFrom(spender, address(this), _amount);

```

```solidity
File: ./contracts/RouterV2.sol

555:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

579:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

619:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

```

```solidity
File: ./contracts/VotingEscrow.sol

798:                 assert(IERC20(token).transferFrom(from, address(this), _value));

```

### <a name="M-2"></a>[M-2] `block.number` means different things on different L2s
On Optimism, `block.number` is the L2 block number, but on Arbitrum, it's the L1 block number, and `ArbSys(address(100)).arbBlockNumber()` must be used. Furthermore, L2 block numbers often occur much more frequently than L1 block numbers (any may even occur on a per-transaction basis), so using block numbers for timing results in inconsistencies, especially when voting is involved across multiple chains. As of version 4.9, OpenZeppelin has [modified](https://blog.openzeppelin.com/introducing-openzeppelin-contracts-v4.9#governor) their governor code to use a clock rather than block numbers, to avoid these sorts of issues, but this still requires that the project [implement](https://docs.openzeppelin.com/contracts/4.x/governance#token_2) a [clock](https://eips.ethereum.org/EIPS/eip-6372) for each L2.

*Instances (16)*:
```solidity
File: ./contracts/VotingEscrow.sol

126:         votingBalanceLogicData.point_history[0].blk = block.number;

335:         ownership_change[_tokenId] = block.number;

651:         IVotingEscrow.Point memory last_point = IVotingEscrow.Point({bias: 0, slope: 0, ts: block.timestamp, blk: block.number, permanent: 0, smNFT : 0, smNFTBonus : 0});

662:             block_slope = (MULTIPLIER * (block.number - last_point.blk)) / (block.timestamp - last_point.ts);

695:                     last_point.blk = block.number;

750:             u_new.blk = block.number;

1016:         if (ownership_change[_tokenId] == block.number) return 0;

```

```solidity
File: ./contracts/chainlink/EpochController.sol

50:         emit Logger(sender, block.timestamp, block.number, msg.sender == automationRegistry, permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'performUpkeep called');

63:         emit Logger(sender, block.timestamp, block.number, msg.sender == automationRegistry2, permissionsRegistry.hasRole("EPOCH_MANAGER", msg.sender), 'performPreUpkeep called');

```

```solidity
File: ./contracts/governance/Governor.sol

269:             getVotes(_msgSender(), block.number - 1) >= proposalThreshold(),

```

```solidity
File: ./contracts/governance/L2Governor.sol

261:             getVotes(_msgSender(), block.number - 1) >= proposalThreshold(),

```

```solidity
File: ./contracts/libraries/VotingBalanceLogic.sol

79:         assert(_block <= block.number);

116:             d_block = block.number - point_0.blk;

135:         assert(_block <= block.number);

147:             if (point.blk != block.number) {

148:                 dt = ((_block - point.blk) * (block.timestamp - point.ts)) / (block.number - point.blk);

```

### <a name="M-3"></a>[M-3] Centralization Risk for trusted owners

#### Impact:
Contracts have owners with privileged rights to perform admin tasks and need to be trusted to not perform malicious updates or drain funds.

*Instances (67)*:
```solidity
File: ./contracts/AVM/AutoVotingEscrowManager.sol

141:     function setVoter(address _voter) external onlyOwner {

153:     function setTopPoolsStrategy(address strategy) external onlyOwner {

158:     function setVoteWeightStrategy(address strategy) external onlyOwner {

182:     function setTopN(uint256 _topN) public onlyOwner {

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

25: contract GaugeCL is ReentrancyGuard, Ownable {

96:     function activateEmergencyMode() external onlyOwner {

102:     function stopEmergencyMode() external onlyOwner {

262:     function setInternalBribe(address _int) external onlyOwner {

```

```solidity
File: ./contracts/BlackClaims.sol

28:     modifier onlyOwner {

64:     function setTreasury(address treasury_) external onlyOwner {

75:     ) external onlyOwner returns(IBlackClaims.Season memory season_)

241:     function recoverERC20(address tokenAddress_) external onlyOwner {

247:     function setOwner(address _owner) external onlyOwner {

251:     function setOwner2(address _owner) external onlyOwner {

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

12: contract CustomPoolDeployer is Ownable {

63:     function addAuthorizedAccount(address account) external onlyOwner {

70:     function removeAuthorizedAccount(address account) external onlyOwner {

179:     function setAlgebraFeeRecipient(address _newRecipient) external onlyOwner {

184:     function setAlgebraFeeManager(address _newManager) external onlyOwner {

189:     function setAlgebraFeeShare(uint16 _newFeeShare) external onlyOwner {

193:     function setAlgebraFarmingProxyPluginFactory(address _algebraFarmingProxyPluginFactory) external onlyOwner {

198:     function setAlgebraFactory(address _algebraFactory) external onlyOwner {

203:     function setAlgebraPluginFactory(address _algebraPluginFactory) external onlyOwner {

```

```solidity
File: ./contracts/CustomToken.sol

8: contract CustomToken is ERC20, Ownable {

21:     ) ERC20(name_, symbol_) Ownable() {

31:     function mint(address account, uint256 amount) external onlyOwner {

40:     function burn(address account, uint256 amount) external onlyOwner {

```

```solidity
File: ./contracts/Fan.sol

8: contract TokenFour is ERC20, Ownable {

12:     constructor() ERC20("TokenEleven", "TELV") Ownable () {

22:     function mint(address account, uint256 amount) external onlyOwner {

31:     function burn(address account, uint256 amount) external onlyOwner {

```

```solidity
File: ./contracts/GaugeExtraRewarder.sol

20: contract GaugeExtraRewarder is Ownable {

126:     function setDistributionRate(uint256 amount) public onlyOwner {

174:     function recoverERC20(uint amount, address token) external onlyOwner {

```

```solidity
File: ./contracts/GaugeManager.sol

571:     function setAVM(address _avm) external onlyOwner {

```

```solidity
File: ./contracts/GaugeV2.sol

24: contract GaugeV2 is ReentrancyGuard, Ownable {

125:     function setDistribution(address _distribution) external onlyOwner {

132:     function setGaugeRewarder(address _gaugeRewarder) external onlyOwner {

139:     function setInternalBribe(address _int) external onlyOwner {

144:     function activateEmergencyMode() external onlyOwner {

150:     function stopEmergencyMode() external onlyOwner {

438:     function setGenesisPoolManager(address _genesisPoolManager) external onlyOwner {

```

```solidity
File: ./contracts/GenesisPoolManager.sol

313:     function setRouter (address _router) external onlyOwner {

```

```solidity
File: ./contracts/RewardsDistributor.sol

65:     modifier onlyOwner {

265:     function setAVM(address _avm) external onlyOwner {

```

```solidity
File: ./contracts/SetterTopNPoolsStrategy.sol

9: contract SetterTopNPoolsStrategy is ITopNPoolsStrategy, Ownable {

68:     function setAVM(address _avm) external onlyOwner {

```

```solidity
File: ./contracts/SetterVoteWeightStrategy.sol

8: contract SetterVoteWeightStrategy is IVoteWeightStrategy, Ownable {

55:     function setAVM(address _avm) external onlyOwner {

```

```solidity
File: ./contracts/Thenian.sol

14: contract Thenian is ERC721Enumerable, Ownable {

43:     function withdraw() external onlyOwner {

48:     function setRoot(bytes32 _root) external onlyOwner {

52:     function setNftPrice(uint256 _nftPrice) external onlyOwner {

59:     function reserveNFTs(address _to, uint256 _amount) external onlyOwner {

88:     function setBaseURI(string memory baseURI_) external onlyOwner {

```

```solidity
File: ./contracts/VoterV3.sol

105:     function setEpochOwner(address _epochOwner) external onlyOwner {

```

```solidity
File: ./contracts/chainlink/EpochController.sol

67:     function setAutomationRegistry(address _automationRegistry) external onlyOwner {

72:     function setAutomationRegistry2(address _automationRegistry2) external onlyOwner {

77:     function setGaugeManager(address _gaugeManager) external onlyOwner {

82:     function setMinter(address _minter) external onlyOwner {

87:     function setGenesisManager(address _genesisManager) external onlyOwner {

```

```solidity
File: ./contracts/factories/BribeFactoryV3.sol

166:     function setBribeVoter(address[] memory _bribe, address _voter) external onlyOwner {

174:     function setBribeAVM(address[] memory _bribe, address _avm) external onlyOwner {

182:     function setBribeMinter(address[] memory _bribe, address _minter) external onlyOwner {

190:     function setBribeOwner(address[] memory _bribe, address _owner) external onlyOwner {

198:     function recoverERC20From(address[] memory _bribe, address[] memory _tokens, uint[] memory _amounts) external onlyOwner {

209:     function recoverERC20AndUpdateData(address[] memory _bribe, address[] memory _tokens, uint[] memory _amounts) external onlyOwner {

```

### <a name="M-4"></a>[M-4] `_safeMint()` should be used rather than `_mint()` wherever possible
`_mint()` is [discouraged](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/d4d8d2ed9798cc3383912a23b5e8d5cb602f7d4b/contracts/token/ERC721/ERC721.sol#L271) in favor of `_safeMint()` which ensures that the recipient is either an EOA or implements `IERC721Receiver`. Both open [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/d4d8d2ed9798cc3383912a23b5e8d5cb602f7d4b/contracts/token/ERC721/ERC721.sol#L238-L250) and [solmate](https://github.com/Rari-Capital/solmate/blob/4eaf6b68202e36f67cab379768ac6be304c8ebde/src/tokens/ERC721.sol#L180) have versions of this function so that NFTs aren't lost if they're minted to contracts that cannot transfer them back out.

Be careful however to respect the CEI pattern or add a re-entrancy guard as `_safeMint` adds a callback-check (`_checkOnERC721Received`) and a malicious `onERC721Received` could be exploited if not careful.

Reading material:

- <https://blocksecteam.medium.com/when-safemint-becomes-unsafe-lessons-from-the-hypebears-security-incident-2965209bda2a>
- <https://samczsun.com/the-dangers-of-surprising-code/>
- <https://github.com/KadenZipfel/smart-contract-attack-vectors/blob/master/vulnerabilities/unprotected-callback.md>

*Instances (2)*:
```solidity
File: ./contracts/VotingEscrow.sol

845:         _mint(_to, _tokenId);

1192:         _mint(_to, _tokenId);

```

### <a name="M-5"></a>[M-5] Fees can be set to be greater than 100%.
There should be an upper limit to reasonable fees.
A malicious owner can keep the fee rate at zero, but if a large value transfer enters the mempool, the owner can jack the rate up to the maximum and sandwich attack a user.

*Instances (19)*:
```solidity
File: ./contracts/AlgebraCLVe33/GaugeCL.sol

206:     function claimFees() external nonReentrant returns (uint256 claimed0, uint256 claimed1) {
             return _claimFees();

```

```solidity
File: ./contracts/AlgebraCLVe33/GaugeFactoryCL.sol

133:     function setReferralFee(uint256 _dibsFee) external onlyAllowed {
             dibsPercentage = _dibsFee;

```

```solidity
File: ./contracts/CustomPoolDeployer.sol

171:     function setFee(address pool, uint16 newFee) external onlyAuthorized {
             IAlgebraCustomPoolEntryPoint(entryPoint).setFee(pool, newFee);

175:     function setCommunityFee(address pool, uint16 newCommunityFee) external onlyAuthorized {
             IAlgebraCustomVaultPoolEntryPoint(entryPoint).setCommunityFee(pool, newCommunityFee);

189:     function setAlgebraFeeShare(uint16 _newFeeShare) external onlyOwner {
             algebraFeeShare = _newFeeShare;

```

```solidity
File: ./contracts/GaugeManager.sol

282:     function setGaugeAsCommunityFeeReceiver(address _gauge, address _pool) internal {
             address communityVault = IAlgebraPool(_pool).communityVault();
             IAlgebraCommunityVault(communityVault).changeCommunityFeeReceiver(_gauge);

304:     function distributeFees() external nonReentrant {
             uint256 i = 0;
             uint256 poolsLength = pools.length;
             for (i; i < poolsLength; i++) {

313:    function distributeFees(uint256 _start, uint256 _finish) external nonReentrant {
             for (uint256 x = _start; x < _finish; x++) {

575:     function acceptAlgebraFeeChangeProposal (address _pool, uint16 newAlgebraFee) external GaugeAdmin {
             address communityVault = IAlgebraPool(_pool).communityVault();
             IAlgebraCommunityVault(communityVault).acceptAlgebraFeeChangeProposal(newAlgebraFee);

```

```solidity
File: ./contracts/GaugeV2.sol

407:     function claimFees() external nonReentrant returns (uint256 claimed0, uint256 claimed1) {
             return _claimFees();

```

```solidity
File: ./contracts/GlobalRouter.sol

153:     function exactInputSingleSupportingFeeOnTransferTokens(ExactInputSingleParams calldata params)

```

```solidity
File: ./contracts/Pair.sol

156:     function claimStakingFees() external {
             address _feehandler = PairFactory(factory).stakingFeeHandler();
             PairFees(fees).withdrawStakingFees(_feehandler);

```

```solidity
File: ./contracts/RouterV2.sol

662:     function removeLiquidityETHSupportingFeeOnTransferTokens(
             address token,
             bool stable,
             uint liquidity,
             uint amountTokenMin,
             uint amountETHMin,
             address to,
             uint deadline
         ) public ensure(deadline) returns (uint amountToken, uint amountETH) {
             (amountToken, amountETH) = removeLiquidity(
                 token,
                 address(wETH),
                 stable,
                 liquidity,
                 amountTokenMin,
                 amountETHMin,
                 address(this),
                 deadline
             );
             _safeTransfer(token, to, erc20(token).balanceOf(address(this)));
             wETH.withdraw(amountETH);
             _safeTransferETH(to, amountETH);

662:     function removeLiquidityETHSupportingFeeOnTransferTokens(
             address token,
             bool stable,
             uint liquidity,
             uint amountTokenMin,
             uint amountETHMin,
             address to,
             uint deadline
         ) public ensure(deadline) returns (uint amountToken, uint amountETH) {
             (amountToken, amountETH) = removeLiquidity(
                 token,
                 address(wETH),
                 stable,
                 liquidity,
                 amountTokenMin,
                 amountETHMin,
                 address(this),
                 deadline
             );
             _safeTransfer(token, to, erc20(token).balanceOf(address(this)));
             wETH.withdraw(amountETH);
             _safeTransferETH(to, amountETH);

685:     function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
             address token,
             bool stable,
             uint liquidity,
             uint amountTokenMin,
             uint amountETHMin,
             address to,
             uint deadline,
             bool approveMax, uint8 v, bytes32 r, bytes32 s
         ) external returns (uint amountToken, uint amountETH) {
             address pair = pairFor(token, address(wETH), stable);
             uint value = approveMax ? type(uint).max : liquidity;
             IBaseV1Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
             (amountToken, amountETH) = removeLiquidityETHSupportingFeeOnTransferTokens(

685:     function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
             address token,
             bool stable,
             uint liquidity,
             uint amountTokenMin,
             uint amountETHMin,
             address to,
             uint deadline,
             bool approveMax, uint8 v, bytes32 r, bytes32 s
         ) external returns (uint amountToken, uint amountETH) {
             address pair = pairFor(token, address(wETH), stable);
             uint value = approveMax ? type(uint).max : liquidity;
             IBaseV1Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
             (amountToken, amountETH) = removeLiquidityETHSupportingFeeOnTransferTokens(

```

```solidity
File: ./contracts/factories/GaugeFactory.sol

18:     function setFeeVault(address _feeVault) external;

```

```solidity
File: ./contracts/factories/PairFactory.sol

63:     function setFeeManager(address _feeManager) external onlyManager {
            pendingFeeManager = _feeManager;

87:     function setReferralFee(uint256 _refFee) external onlyManager {
            MAX_REFERRAL_FEE = _refFee;

```

### <a name="M-6"></a>[M-6] Lack of EIP-712 compliance: using `keccak256()` directly on an array or struct variable
Directly using the actual variable instead of encoding the array values goes against the EIP-712 specification https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md#definition-of-encodedata. 
**Note**: OpenSea's [Seaport's example with offerHashes and considerationHashes](https://github.com/ProjectOpenSea/seaport/blob/a62c2f8f484784735025d7b03ccb37865bc39e5a/reference/lib/ReferenceGettersAndDerivers.sol#L130-L131) can be used as a reference to understand how array of structs should be encoded.

*Instances (1)*:
```solidity
File: ./contracts/governance/Governor.sol

148:         return uint256(keccak256(abi.encode(targets, values, calldatas, epochTimeHash)));

```

### <a name="M-7"></a>[M-7] Library function isn't `internal` or `private`
In a library, using an external or public visibility means that we won't be going through the library with a DELEGATECALL but with a CALL. This changes the context and should be done carefully.

*Instances (106)*:
```solidity
File: ./contracts/GlobalRouter.sol

16:     function getAmountOutStable(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount);

17:     function getAmountOutVolatile(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount);

18:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount, bool stable);

19:     function getAmountsOut(uint amountIn, Route[] memory routes) external view returns (uint[] memory amounts);

20:     function getAmountInStable(uint amountOut, address tokenIn, address tokenOut) external view returns (uint amountIn);

21:     function pairFor(address tokenA, address tokenB, bool stable) external view returns (address pair);

22:     function sortTokens(address tokenA, address tokenB) external pure returns (address token0, address token1);

27:     function allPairsLength() external view returns (uint);

28:     function isPair(address pair) external view returns (bool);

29:     function pairCodeHash() external view returns (bytes32);

30:     function getPair(address tokenA, address token, bool stable) external view returns (address);

31:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

35:     function transferFrom(address src, address dst, uint amount) external returns (bool);

36:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

37:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

38:     function burn(address to) external returns (uint amount0, uint amount1);

39:     function mint(address to) external returns (uint liquidity);

40:     function getReserves() external view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast);

41:     function getAmountOut(uint, address) external view returns (uint);

45:     function totalSupply() external view returns (uint256);

46:     function transfer(address recipient, uint amount) external returns (bool);

47:     function decimals() external view returns (uint8);

48:     function symbol() external view returns (string memory);

49:     function balanceOf(address) external view returns (uint);

50:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

51:     function approve(address spender, uint value) external returns (bool);

55:     function getFee(bool _stable) external view returns(uint256);

56:     function MAX_REFERRAL_FEE() external view returns(uint256);

82:     function deposit() external payable;

83:     function transfer(address to, uint value) external returns (bool);

84:     function withdraw(uint) external;

105:     function exactInputSingle(ExactInputSingleParams calldata params) external payable returns (uint256 amountOut);

118:     function exactInput(ExactInputParams calldata params) external payable returns (uint256 amountOut);

134:     function exactOutputSingle(ExactOutputSingleParams calldata params) external payable returns (uint256 amountIn);

147:     function exactOutput(ExactOutputParams calldata params) external payable returns (uint256 amountIn);

153:     function exactInputSingleSupportingFeeOnTransferTokens(ExactInputSingleParams calldata params)

193:     function swapExactTokensForTokens(uint amountIn,uint amountOutMin, ITradeHelper.Route[] calldata routes,address to,uint deadline, bool _type) external ensure(deadline) returns (uint[] memory amounts){

204:     function exactInput(IRouterV3.ExactInputParams memory params)

251:     function getAmountOutStable(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount){

254:     function getAmountOutVolatile(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount){

257:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) external view returns (uint amount, bool stable){

260:     function getAmountsOut(uint amountIn, ITradeHelper.Route[] memory routes) external view returns (uint[] memory amounts){

263:     function getAmountInStable(uint amountOut, address tokenIn, address tokenOut) external view returns (uint amountIn){

266:     function pairFor(address tokenA, address tokenB, bool stable) external view returns (address pair){

269:     function sortTokens(address tokenA, address tokenB) external view returns (address token0, address token1){

```

```solidity
File: ./contracts/RouterV2.sol

25:     function allPairsLength() external view returns (uint);

26:     function isPair(address pair) external view returns (bool);

27:     function getPair(address tokenA, address token, bool stable) external view returns (address);

28:     function createPair(address tokenA, address tokenB, bool stable) external returns (address pair);

29:     function isGenesis(address pair) external view returns (bool);

33:     function transferFrom(address src, address dst, uint amount) external returns (bool);

34:     function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

35:     function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

36:     function burn(address to) external returns (uint amount0, uint amount1);

37:     function mint(address to) external returns (uint liquidity);

38:     function getReserves() external view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast);

39:     function getAmountOut(uint, address) external view returns (uint);

40:     function totalSupply() external view returns (uint);

44:     function totalSupply() external view returns (uint256);

45:     function transfer(address recipient, uint amount) external returns (bool);

46:     function decimals() external view returns (uint8);

47:     function symbol() external view returns (string memory);

48:     function balanceOf(address) external view returns (uint);

49:     function transferFrom(address sender, address recipient, uint amount) external returns (bool);

50:     function approve(address spender, uint value) external returns (bool);

54:     function getFee(address _pairAddress, bool _stable) external view returns(uint256);

55:     function getPair(address tokenA, address token, bool stable) external view returns (address);

56:     function MAX_REFERRAL_FEE() external view returns(uint256);

82:     function deposit() external payable;

83:     function transfer(address to, uint value) external returns (bool);

84:     function withdraw(uint) external;

147:     receive() external payable {

163:     function sortTokens(address tokenA, address tokenB) public pure returns (address token0, address token1) {

169:     function pairFor(address tokenA, address tokenB, bool stable) public view returns (address pair) {

181:     function getReserves(address tokenA, address tokenB, bool stable) public view returns (uint reserveA, uint reserveB) {

188:     function getAmountOut(uint amountIn, address tokenIn, address tokenOut) public view returns (uint amount, bool stable) {

220:     function getPoolAmountOut(uint amountIn, address tokenIn, address pair) public view returns (uint amount) {

258:     function getAmountsOut(uint amountIn, route[] memory routes) public returns (uint[] memory amounts) {

286:     function quoteAddLiquidity(

318:     function quoteRemoveLiquidity(

370:     function addLiquidity(

391:     function addLiquidityETH(

419:     function removeLiquidity(

437:     function removeLiquidityETH(

461:     function removeLiquidityWithPermit(

481:     function removeLiquidityETHWithPermit(

532:     function swapExactTokensForTokensSimple(

563:     function swapExactTokensForTokens(

587:     function swapExactETHForTokens(uint amountOutMin, route[] calldata routes, address to, uint deadline) external payable ensure(deadline) returns (uint[] memory amounts) {

603:     function swapExactTokensForETH(uint amountIn, uint amountOutMin, route[] calldata routes, address to, uint deadline)

629:     function UNSAFE_swapExactTokensForTokens(

662:     function removeLiquidityETHSupportingFeeOnTransferTokens(

685:     function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(

726:     function swapExactTokensForTokensSupportingFeeOnTransferTokens(

746:     function swapExactETHForTokensSupportingFeeOnTransferTokens(

768:     function swapExactTokensForETHSupportingFeeOnTransferTokens(

789:     function setSwapRouter(address _swapRouter) external {

794:     function setAlgebraFactory(address _algebraFactory) external {

799:     function setQuoterV2(address _quoterV2) external {

804:     function setAlgebraPoolAPI(address _algebraPoolAPIStorage) external {

```

```solidity
File: ./contracts/libraries/VoterFactoryLib.sol

17:     function addPairFactory(Data storage self, address _pairFactory) external {

26:     function addGaugeFactory(Data storage self, address _gaugeFactory) external {

35:     function replacePairFactory(Data storage self, address _pairFactory, uint256 _pos) external {

47:     function replaceGaugeFactory(Data storage self, address _gaugeFactory, uint256 _pos) external {

59:     function removePairFactory(Data storage self, uint256 _pos) external {

67:     function removeGaugeFactory(Data storage self, uint256 _pos) external {

```

### <a name="M-8"></a>[M-8] Direct `supportsInterface()` calls may cause caller to revert
Calling `supportsInterface()` on a contract that doesn't implement the ERC-165 standard will result in the call reverting. Even if the caller does support the function, the contract may be malicious and consume all of the transaction's available gas. Call it via a low-level [staticcall()](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/f959d7e4e6ee0b022b41e5b644c79369869d8411/contracts/utils/introspection/ERC165Checker.sol#L119), with a fixed amount of gas, and check the return code, or use OpenZeppelin's [`ERC165Checker.supportsInterface()`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/f959d7e4e6ee0b022b41e5b644c79369869d8411/contracts/utils/introspection/ERC165Checker.sol#L36-L39).

*Instances (2)*:
```solidity
File: ./contracts/governance/Governor.sol

112:             super.supportsInterface(interfaceId);

```

```solidity
File: ./contracts/governance/L2Governor.sol

107:             super.supportsInterface(interfaceId);

```

### <a name="M-9"></a>[M-9] Return values of `transfer()`/`transferFrom()` not checked
Not all `IERC20` implementations `revert()` when there's a failure in `transfer()`/`transferFrom()`. The function signature has a `boolean` return value and they indicate errors that way instead. By not checking the return value, operations that should have marked as failed, may potentially go through without actually making a payment

*Instances (9)*:
```solidity
File: ./contracts/BlackClaims.sol

244:         IERC20(tokenAddress_).transfer(msg.sender, _balance);

```

```solidity
File: ./contracts/RewardsDistributor.sol

210:                 IERC20(token).transfer(_nftOwner, amount);

234:                     IERC20(token).transfer(_nftOwner, amount);

262:         IERC20(_token).transfer(msg.sender, _balance);

```

```solidity
File: ./contracts/RouterV2.sol

555:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

579:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

619:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

```

```solidity
File: ./contracts/VotingEscrow.sol

798:                 assert(IERC20(token).transferFrom(from, address(this), _value));

956:         assert(IERC20(token).transfer(msg.sender, value));

```

### <a name="M-10"></a>[M-10] Unsafe use of `transfer()`/`transferFrom()` with `IERC20`
Some tokens do not implement the ERC20 standard properly but are still accepted by most code that accepts ERC20 tokens.  For example Tether (USDT)'s `transfer()` and `transferFrom()` functions on L1 do not return booleans as the specification requires, and instead have no return value. When these sorts of tokens are cast to `IERC20`, their [function signatures](https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca) do not match and therefore the calls made, revert (see [this](https://gist.github.com/IllIllI000/2b00a32e8f0559e8f386ea4f1800abc5) link for a test case). Use OpenZeppelin's `SafeERC20`'s `safeTransfer()`/`safeTransferFrom()` instead

*Instances (12)*:
```solidity
File: ./contracts/BlackClaims.sol

115:         bool transfer_success = token.transfer(treasury, _remaining_reward_amount);

133:         bool transfer_success = token.transferFrom(treasury, address(this), _season.reward_amount);

218:             bool transfer_success = token.transfer(msg.sender, claimed_reward);

244:         IERC20(tokenAddress_).transfer(msg.sender, _balance);

```

```solidity
File: ./contracts/RewardsDistributor.sol

210:                 IERC20(token).transfer(_nftOwner, amount);

234:                     IERC20(token).transfer(_nftOwner, amount);

262:         IERC20(_token).transfer(msg.sender, _balance);

```

```solidity
File: ./contracts/RouterV2.sol

555:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

579:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

619:             IERC20(routes[0].from).transferFrom(msg.sender, address(this), amounts[0]);

```

```solidity
File: ./contracts/VotingEscrow.sol

798:                 assert(IERC20(token).transferFrom(from, address(this), _value));

956:         assert(IERC20(token).transfer(msg.sender, value));

```
