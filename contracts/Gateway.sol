pragma solidity ^0.4.19;

contract Erc20Interface {

    //THIS SHOULD BE SAFE
    function unsafe_mint(address _to, uint256 _amount) public returns (bool);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool);
    function unsafe_burn(address _who, uint256 _value) public;
    function totalSupply() public view returns (uint256);

}

contract Gateway {

    address foundationAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
    address erc20Address = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
    Erc20Interface erc20Contract = Erc20Interface(erc20Address);

    event ReadyForTransaction(address walletId, uint TransactionRef);

    mapping (uint => address) public referenceTransactionToOwner;

    uint NoOfTransactions = 1;

    function initializeTransaction () public {
        uint TransactionRef = NoOfTransactions++;
        referenceTransactionToOwner[TransactionRef] = msg.sender;
        emit ReadyForTransaction(msg.sender,TransactionRef);
    }

    //THIS FUNCTION SHOULD BE OWNER ONLY
    function depositFunds(uint _TransactionRef, uint _Amount) public {
        address TransactionOwner = referenceTransactionToOwner[_TransactionRef];
        //MINT MONEY TO OWNERS ACCOUNT
        erc20Contract.unsafe_mint(TransactionOwner, _Amount);
    }

    function withdrawFunds(uint _Amount) public {
        //Foundation cannot withdraw
        require(msg.sender !=foundationAddress);

        uint AmountToFoundation = (_Amount - _Amount%10)/10;
        uint AmountToSender = _Amount - AmountToFoundation;
        uint TransactionRef = NoOfTransactions++;
        referenceTransactionToOwner[TransactionRef] = msg.sender;
        emit ReadyForTransaction(msg.sender,TransactionRef);
        //Transfer fee to foundation
        erc20Contract.transferFrom(msg.sender, foundationAddress, AmountToFoundation);
        //BurnRemaining to withdraw
        erc20Contract.unsafe_burn(msg.sender, AmountToSender);
    }

    function checkErc20Balance() public view returns (uint256){
        return erc20Contract.totalSupply();
    }

}