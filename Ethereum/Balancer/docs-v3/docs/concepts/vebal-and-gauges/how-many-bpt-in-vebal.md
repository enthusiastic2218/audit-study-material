# How Many BPT in veBAL?

Are you trying value or determine underlying assets that are locked in veBAL? You'll need to query a few things from the [veBAL contract](https://etherscan.io/address/0xc128a9954e6c874ea3d62ce62b468ba073093f25#readContract). Most notably:

```
underlyingBpt = veBAL.token();
(amount, end) = veBAL.locked();
```

::: danger
Don't use `balanceOf` on the veBAL contract if you're trying to calculate value associated with underlying tokens. `balanceOf` returns a time dependent value only useful for querying a user's current voting power.
:::

Now that you have the `underlyingBpt` address and the `amount` of those BPT that you have locked, you can now analyze, [value](https://docs-v2.balancer.fi/reference/lp-tokens/valuing.html#valuing), or [determine underlying tokens](https://docs-v2.balancer.fi/reference/lp-tokens/underlying.html#overview).
