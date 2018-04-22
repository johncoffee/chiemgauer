pragma solidity ^0.4.19;

contract Gateway {

    event ReadyForTransaction(address walletId, uint TransactionId);

    //mapping (uint => address) public referenceTransactionToOwner;

    uint NoOfTransactions = 1;

    struct TransactionToOwner {
        uint TransactionId;
        address AccountOwner;
    }

    TransactionToOwner[] public TransactionToOwners;

    function initializeTransaction () public {
        uint TransactionId = NoOfTransactions++;
        TransactionToOwners.push(TransactionToOwner(TransactionId, msg.sender));
        emit ReadyForTransaction(msg.sender,TransactionId);
    }

}