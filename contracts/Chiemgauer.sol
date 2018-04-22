pragma solidity ^0.4.17;

import '../node_modules/zeppelin-solidity/contracts/token/ERC20/Mintabletoken.sol';
import '../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol';


contract Chiemgauer is MintableToken, StandardBurnableToken {

   string public name = 'Chiemgauer';
   string public symbol = 'Chiem';
   uint8 public decimals = 2;
   uint public INITIAL_SUPPLY = 0; // slices of pizza

   function Chiemgauer() public {
       totalSupply_ = INITIAL_SUPPLY;
       balances[msg.sender] = INITIAL_SUPPLY;

   }

    function unsafe_mint(address _to, uint256 _amount) public returns (bool) {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }

    function unsafe_burn(address _who, uint256 _value) public {
        require(_value <= balances[_who]);
        // no need to require value <= totalSupply, since that would imply the
        // sender's balance is greater than the totalSupply, which *should* be an assertion failure

        balances[_who] = balances[_who].sub(_value);
        totalSupply_ = totalSupply_.sub(_value);
        emit Burn(_who, _value);
        emit Transfer(_who, address(0), _value);
    }

}