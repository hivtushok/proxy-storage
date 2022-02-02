//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StorageLogic is OwnableUpgradeable {
  function initialize() public initializer {
    __Ownable_init_unchained();
  }

  /**
   * @dev Transfers the storage funds.
   * @param tokenAddr an ERC20 token address.
   * @param to an address where the storage funds will be transferred.
   * @param amount the number of tokens to transfer.
   */
  function transferTokens(
    address tokenAddr,
    address to,
    uint256 amount
  ) public onlyOwner {
    require(tokenAddr != address(0), "Token address cannot be 0x");
    require(amount > 0, "Amount cannot be less than 0");

    IERC20 tok = IERC20(tokenAddr);

    require(
      tok.balanceOf(address(this)) >= amount,
      "Amount is more than supply"
    );

    tok.transfer(to, amount);
  }

  /**
   * @dev Return number of specified tokens in the storage.
   * @param tokenAddr an ERC20 token address.
   * @return number of tokens.
   */
  function getBalance(address tokenAddr) public view returns (uint256) {
    IERC20 tok = IERC20(tokenAddr);
    return tok.balanceOf(address(this));
  }
}
