pragma solidity ^0.4.19;

import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Erc20Interface {

    //UNSAFE MINT FOR DEBUGGUGGING PURPOSES
    function unsafe_mint(address _to, uint256 _amount) public returns (bool);

    function mint(address _to, uint256 _amount) public returns (bool);
    function burn(uint256 _value) public;

}

contract Gateway is Ownable {

    //TODO, TransactionRef and TransactionHash should not be an uint, but a short string of 67 char

    address public erc20ContractAddress = 0x5e7979a7a445565c167b89598d849625968c8eef;

    Erc20Interface erc20Contract = Erc20Interface(erc20ContractAddress);

    event DepositFundsDirectlyComplete(uint TransactionRef, address walletId, uint Amount);

    mapping (uint => address) public referenceTransactionToOwner;

    function setErc20ContractAddress(address _address) external onlyOwner {
        erc20Contract = Erc20Interface(_address);
    }

    function depositFundsDirectly(uint _TransactionRef, address _Receiver, uint _Amount) external onlyOwner {
        //Abort if transactionref has allready been processed
        require(referenceTransactionToOwner[_TransactionRef]==0);
        referenceTransactionToOwner[_TransactionRef]=_Receiver;
        //Mint amount to receivers wallet
        erc20Contract.mint(_Receiver, _Amount);
        //Raise event for notify user on deposit complete
        emit DepositFundsDirectlyComplete(_TransactionRef, _Receiver, _Amount);
    }

    function UnsafeDepositFundsDirectly(uint _TransactionRef, address _Receiver, uint _Amount) external onlyOwner {
        //Abort if transactionref has allready been processed
        require(referenceTransactionToOwner[_TransactionRef]==0);
        referenceTransactionToOwner[_TransactionRef]=_Receiver;
        //Mint amount to receivers wallet
        //UNSAFE MINT FOR DEBUGGUGGING PURPOSES
        erc20Contract.unsafe_mint(_Receiver, _Amount);
        //Raise event for notify user on deposit complete
        emit DepositFundsDirectlyComplete(_TransactionRef, _Receiver, _Amount);
    }

    function withdrawFunds(uint _TransactionHash, address _Sender, uint _Amount) external onlyOwner {
        //Abort if transactionHash has allready been processed
        require(referenceTransactionToOwner[_TransactionHash]==0);
        referenceTransactionToOwner[_TransactionHash]=_Sender;

        erc20Contract.burn(_Amount);
    }

}