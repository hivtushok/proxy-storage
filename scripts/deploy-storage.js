const { ethers, upgrades } = require("hardhat");

async function main() {
  const StorageLogic = await ethers.getContractFactory("StorageLogic");

  const storageLogic = await upgrades.deployProxy(StorageLogic);
  await storageLogic.deployed();

  console.log("StorageLogic deployed to:", storageLogic.address);
}

main();
