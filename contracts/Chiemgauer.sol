pragma solidity ^0.4.17;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/Mintabletoken.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol';


contract Chiemgauer is StandardBurnableToken, MintableToken {

   string public name = 'Chiemgauer';
   string public symbol = 'CMG';
   uint8 public decimals = 2;
   uint public INITIAL_SUPPLY = 0;

   constructor () public {
       totalSupply_ = INITIAL_SUPPLY;
   }
}