const { expect, use } = require("chai");
const { ethers } = require("hardhat");
const { deployContract, MockProvider, solidity } = require("ethereum-waffle");
const BasicToken = require("../build/BasicToken.json");

describe("StorageLogic", function () {
  use(solidity);

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  let StorageLogic;
  let storageLogic;
  let coinbase;
  let token;
  let testWallet;
  let testWalletTo;
  let receiver;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    StorageLogic = await ethers.getContractFactory("StorageLogic");

    [, , receiver] = signers;

    storageLogic = await StorageLogic.deploy();
    await storageLogic.initialize();

    const [wallet, walletTo] = new MockProvider().getWallets();
    testWallet = wallet;
    testWalletTo = walletTo;
    token = await deployContract(wallet, BasicToken, [1000]);
  });

  describe("Ownership", () => {
    it("should transfer ownership", async () => {
      expect(await storageLogic.owner()).to.be.equal(coinbase.address);

      await storageLogic.transferOwnership(receiver.address);

      expect(await storageLogic.owner()).to.be.equal(receiver.address);

      await expect(
        storageLogic.transferTokens(token.address, coinbase.address, 100)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Funding", () => {
    it("should fund storage with ERC20 tokens", async () => {
      await token.transfer(storageLogic.address, 200);
      expect(await token.balanceOf(storageLogic.address)).to.equal(200);
    });

    it("should fail if ERC20 address is 0x", async () => {
      await token.transfer(storageLogic.address, 200);

      await expect(
        storageLogic.transferTokens(ZERO_ADDRESS, coinbase.address, 100)
      ).to.be.revertedWith("Token address cannot be 0x");
    });

    it("should fail if specified amount is 0", async () => {
      await token.transfer(storageLogic.address, 200);

      await expect(
        storageLogic.transferTokens(token.address, coinbase.address, 0)
      ).to.be.revertedWith("Amount cannot be less than 0");
    });
  });
});
