# Proxy storage

## Specifications

- Uses [Transparent Proxy](https://blog.openzeppelin.com/the-transparent-proxy-pattern/) for upgradeability.
- Uses [OwnableUpgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/access/OwnableUpgradeable.sol) for ownership management.
- Uses [IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) for ERC20 token operations.

## Deployed contracts (Rinkeby)

Contract | Address
--- | ---
StorageLogic | [0xB79221BfEb28344352e364Be0d5BD9d58c790B95](https://rinkeby.etherscan.io/address/0xb79221bfeb28344352e364be0d5bd9d58c790b95)  
ProxyAdmin | [0x71E31031E76c07db971BA2E7D457cDc4837FE9EE](https://rinkeby.etherscan.io/address/0x71e31031e76c07db971ba2e7d457cdc4837fe9ee)
TransparentUpgradeableProxy | [0xD7C7b723Ac4fCF06234B25792467f7D3Ba67F2CC](https://rinkeby.etherscan.io/address/0xd7c7b723ac4fcf06234b25792467f7d3ba67f2cc)

## Building & compiling

```shell
yarn waffle && compile
```

## Running tests

```shell
yarn test
```

## Rinkeby deployment

You should specify your `PRIVATE_KEY` and `RINKEBY_URL` env variable

```shell
yarn hardhat run --network rinkeby scripts/deploy-storage.js
```

## Upgrades

You should specify your `PRIVATE_KEY` and `RINKEBY_URL` env variable and have a contract deployed with Proxy.

```shell
yarn hardhat run --network rinkeby scripts/upgrade-storage.js
```

## Etherscan verification

You should specify your `ETHERSCAN_API_KEY` env variable.
Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
yarn hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
```
