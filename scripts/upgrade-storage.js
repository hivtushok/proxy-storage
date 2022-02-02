const { ethers, upgrades } = require("hardhat");

async function main() {
  const proxy = "";

  const StorageLogic = await ethers.getContractFactory("StorageLogic");
  await upgrades.upgradeProxy(proxy, StorageLogic);

  console.log("StorageLogic upgrade done");
}

main();
