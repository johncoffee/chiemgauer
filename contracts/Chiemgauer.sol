pragma solidity ^0.4.17;

import '../node_modules/zeppelin-solidity/contracts/token/ERC20/Mintabletoken.sol';
import '../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol';


contract Chiemgauer is StandardToken {

   string public name = 'Chiemgauer';
   string public symbol = 'Chiem';
   uint8 public decimals = 2;
   uint public INITIAL_SUPPLY = 0; // slices of pizza

   function Chiemgauer(address ownAll) public {
       totalSupply_ = INITIAL_SUPPLY;
       balances[ownAll] = INITIAL_SUPPLY;

   }

}