// SPDX-License-Identifier: GPL-2.0-or-later

using Util as Util;

methods {
    function extSloads(bytes32[]) external returns bytes32[] => NONDET DELETE;

    function collateral(MorphoHarness.Id, address) external returns uint256 envfree;
    function virtualTotalSupplyAssets(MorphoHarness.Id) external returns uint256 envfree;
    function virtualTotalSupplyShares(MorphoHarness.Id) external returns uint256 envfree;
    function virtualTotalBorrowAssets(MorphoHarness.Id) external returns uint256 envfree;
    function virtualTotalBorrowShares(MorphoHarness.Id) external returns uint256 envfree;
    function fee(MorphoHarness.Id) external returns uint256 envfree;
    function lastUpdate(MorphoHarness.Id) external returns uint256 envfree;

    function Util.maxFee() external returns uint256 envfree;
    function Util.libId(MorphoHarness.MarketParams) external returns MorphoHarness.Id envfree;

    function UtilsLib.min(uint256 x, uint256 y) internal returns uint256 => summaryMin(x, y);
    function MathLib.mulDivDown(uint256 a, uint256 b, uint256 c) internal returns uint256 => summaryMulDivDown(a, b, c);
    function MathLib.mulDivUp(uint256 a, uint256 b, uint256 c) internal returns uint256 => summaryMulDivUp(a, b, c);
    function MathLib.wTaylorCompounded(uint256, uint256) internal returns uint256 => NONDET;

    function _.borrowRate(MorphoHarness.MarketParams, MorphoHarness.Market) external => HAVOC_ECF;

}

invariant feeInRange(MorphoHarness.Id id)
    fee(id) <= Util.maxFee();

function summaryMin(uint256 x, uint256 y) returns uint256 {
    return x < y ? x : y;
}

// This is a simple overapproximative summary, stating that it rounds in the right direction.
function summaryMulDivUp(uint256 x, uint256 y, uint256 d) returns uint256 {
    uint256 result;
    // Safe require that is checked by the specification in LibSummary.spec.
    require result * d >= x * y;
    return result;
}

// This is a simple overapproximative summary, stating that it rounds in the right direction.
function summaryMulDivDown(uint256 x, uint256 y, uint256 d) returns uint256 {
    uint256 result;
    // Safe require that is checked by the specification in LibSummary.spec.
    require result * d <= x * y;
    return result;
}

// Check that accrueInterest increases the value of supply shares.
rule accrueInterestIncreasesSupplyExchangeRate(env e, MorphoHarness.MarketParams marketParams) {
    MorphoHarness.Id id;
    requireInvariant feeInRange(id);

    mathint assetsBefore = virtualTotalSupplyAssets(id);
    mathint sharesBefore = virtualTotalSupplyShares(id);

    // The check is done for every market, not just for id.
    accrueInterest(e, marketParams);

    mathint assetsAfter = virtualTotalSupplyAssets(id);
    mathint sharesAfter = virtualTotalSupplyShares(id);

    // Check that the exchange rate increases: assetsBefore/sharesBefore <= assetsAfter/sharesAfter.
    assert assetsBefore * sharesAfter <= assetsAfter * sharesBefore;
}

// Check that accrueInterest increases the value of borrow shares.
rule accrueInterestIncreasesBorrowExchangeRate(env e, MorphoHarness.MarketParams marketParams) {
    MorphoHarness.Id id;
    requireInvariant feeInRange(id);

    mathint assetsBefore = virtualTotalBorrowAssets(id);
    mathint sharesBefore = virtualTotalBorrowShares(id);

    // The check is done for every marketParams, not just for id.
    accrueInterest(e, marketParams);

    mathint assetsAfter = virtualTotalBorrowAssets(id);
    mathint sharesAfter = virtualTotalBorrowShares(id);

    // Check that the exchange rate increases: assetsBefore/sharesBefore <= assetsAfter/sharesAfter.
    assert assetsBefore * sharesAfter <= assetsAfter * sharesBefore;
}


// Check that except when not accruing interest and except for liquidate, every function increases the value of supply shares.
rule onlyLiquidateCanDecreaseSupplyExchangeRate(env e, method f, calldataarg args)
filtered {
    f -> !f.isView && f.selector != sig:liquidate(MorphoHarness.MarketParams, address, uint256, uint256, bytes).selector
}
{
    MorphoHarness.Id id;
    requireInvariant feeInRange(id);

    mathint assetsBefore = virtualTotalSupplyAssets(id);
    mathint sharesBefore = virtualTotalSupplyShares(id);

    // Interest is checked separately by the rules above.
    // Here we assume interest has already been accumulated for this block.
    require lastUpdate(id) == e.block.timestamp;

    f(e, args);

    mathint assetsAfter = virtualTotalSupplyAssets(id);
    mathint sharesAfter = virtualTotalSupplyShares(id);

    // Check that the exchange rate increases: assetsBefore/sharesBefore <= assetsAfter/sharesAfter
    assert assetsBefore * sharesAfter <= assetsAfter * sharesBefore;
}

// Check that when not realizing bad debt in liquidate, the value of supply shares increases.
rule liquidateWithoutBadDebtRealizationIncreasesSupplyExchangeRate(env e, MorphoHarness.MarketParams marketParams, address borrower, uint256 seizedAssets, uint256 repaidShares, bytes data)
{
    MorphoHarness.Id id;
    requireInvariant feeInRange(id);

    mathint assetsBefore = virtualTotalSupplyAssets(id);
    mathint sharesBefore = virtualTotalSupplyShares(id);

    // Interest is checked separately by the rules above.
    // Here we assume interest has already been accumulated for this block.
    require lastUpdate(id) == e.block.timestamp;

    liquidate(e, marketParams, borrower, seizedAssets, repaidShares, data);

    mathint assetsAfter = virtualTotalSupplyAssets(id);
    mathint sharesAfter = virtualTotalSupplyShares(id);

    // Trick to ensure that no bad debt realization happened.
    require collateral(id, borrower) != 0;

    // Check that the exchange rate increases: assetsBefore/sharesBefore <= assetsAfter/sharesAfter
    assert assetsBefore * sharesAfter <= assetsAfter * sharesBefore;
}

// Check that except when not accruing interest, every function is decreasing the value of borrow shares.
// The repay function is checked separately, see below.
// The liquidate function is checked separately, see below.
rule onlyAccrueInterestCanIncreaseBorrowExchangeRate(env e, method f, calldataarg args)
filtered {
    f -> !f.isView &&
    f.selector != sig:repay(MorphoHarness.MarketParams, uint256, uint256, address, bytes).selector &&
    f.selector != sig:liquidate(MorphoHarness.MarketParams, address, uint256, uint256, bytes).selector
}
{
    MorphoHarness.Id id;
    requireInvariant feeInRange(id);

    // Interest would increase borrow exchange rate, so we need to assume that no time passes.
    require lastUpdate(id) == e.block.timestamp;

    mathint assetsBefore = virtualTotalBorrowAssets(id);
    mathint sharesBefore = virtualTotalBorrowShares(id);

    f(e, args);

    mathint assetsAfter = virtualTotalBorrowAssets(id);
    mathint sharesAfter = virtualTotalBorrowShares(id);

    // Check that the exchange rate decreases: assetsBefore/sharesBefore >= assetsAfter/sharesAfter
    assert assetsBefore * sharesAfter >= assetsAfter * sharesBefore;
}

// Check that when not accruing interest, repay is decreasing the value of borrow shares.
// Check the case where it would not repay more than the total assets.
// The other case requires exact math (ie not over-approximating mulDivUp and mulDivDown), so it is checked separately in ExactMath.spec.
rule repayDecreasesBorrowExchangeRate(env e, MorphoHarness.MarketParams marketParams, uint256 assets, uint256 shares, address onBehalf, bytes data)
{
    MorphoHarness.Id id = Util.libId(marketParams);
    requireInvariant feeInRange(id);

    mathint assetsBefore = virtualTotalBorrowAssets(id);
    mathint sharesBefore = virtualTotalBorrowShares(id);

    // Interest would increase borrow exchange rate, so we need to assume that no time passes.
    require lastUpdate(id) == e.block.timestamp;

    mathint repaidAssets;
    repaidAssets, _ = repay(e, marketParams, assets, shares, onBehalf, data);

    // Check the case where it would not repay more than the total assets.
    require repaidAssets < assetsBefore;

    mathint assetsAfter = virtualTotalBorrowAssets(id);
    mathint sharesAfter = virtualTotalBorrowShares(id);

    assert assetsAfter == assetsBefore - repaidAssets;
    // Check that the exchange rate decreases: assetsBefore/sharesBefore >= assetsAfter/sharesAfter
    assert assetsBefore * sharesAfter >= assetsAfter * sharesBefore;
}

rule liquidateDecreasesBorrowExchangeRate(env e, MorphoHarness.MarketParams marketParams, address borrower, uint256 seizedAssets, uint256 repaidShares, bytes data)
{
    require data.length == 0;
    MorphoHarness.Id id = Util.libId(marketParams);

    mathint assetsBefore = virtualTotalBorrowAssets(id);
    mathint sharesBefore = virtualTotalBorrowShares(id);

    // Interest would increase borrow exchange rate, so we need to assume that no time passes.
    require lastUpdate(id) == e.block.timestamp;

    liquidate(e, marketParams, borrower, seizedAssets, repaidShares, data);

    mathint assetsAfter = virtualTotalBorrowAssets(id);
    mathint sharesAfter = virtualTotalBorrowShares(id);

    require assetsAfter != 1;

    // Check that the exchange rate decreases: assetsBefore/sharesBefore >= assetsAfter/sharesAfter
    assert assetsBefore * sharesAfter >= assetsAfter * sharesBefore;
}
