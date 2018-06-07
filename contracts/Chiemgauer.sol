pragma solidity ^0.4.17;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/Mintabletoken.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol';


contract Chiemgauer is StandardBurnableToken, MintableToken {

   string public name = 'Chiemgauer';
   string public symbol = 'CMG';
   uint8 public decimals = 2;
   uint public INITIAL_SUPPLY = 0;

   event Mint(address indexed to, uint256 amount, bytes8 fullHash);

   constructor () public {
       totalSupply_ = INITIAL_SUPPLY;
   }

//   // overwrite inherited mint function
//   function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
//      revert();
//   }
//
//   // our mint function that requires a 3rd argument
//   function mint(address _to, uint256 _amount, bytes8 _fullHash) onlyOwner canMint public returns (bool) {
//      totalSupply_ = totalSupply_.add(_amount);
//      balances[_to] = balances[_to].add(_amount);
//      emit Mint(_to, _amount);
//      emit Transfer(address(0), _to, _amount);
//      return true;
//   }
}