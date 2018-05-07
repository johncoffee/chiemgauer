pragma solidity ^0.4.17;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/Mintabletoken.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol';


contract Chiemgauer is StandardBurnableToken, MintableToken {

   string public name = 'Chiemgauer';
   string public symbol = 'Chiem';
   uint8 public decimals = 2;
   uint public INITIAL_SUPPLY = 0; // slices of pizza

   function Chiemgauer(address ownAll) public {
       totalSupply_ = INITIAL_SUPPLY;
       balances[ownAll] = INITIAL_SUPPLY;

   }

    //UNSAFE MINT FOR DEBUGGUGGING PURPOSES
    function unsafe_mint(address _to, uint256 _amount) public returns (bool) {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }
}