pragma solidity ^0.4.8;
contract exchangerContract{
    uint exchangeRule;
    mapping (uint => string) company;

    event deductEvent(string companyName,uint rewardPoints);
    event increaseEvent(string companyName,uint rewardPoints);
    event trialResultEvent (bool result);

function exchangerContract(uint  _exchangeRule){
    exchangeRule=_exchangeRule;
}

function verify(uint requestPoints,address bankID,uint accountID)  returns(bool ){

        //do something

        if (((requestPoints*exchangeRule)%100)==0){
            deductRewardPoints(0,requestPoints,bankID,accountID);
            increaseRewardPoints(1,requestPoints*exchangeRule/100,bankID,accountID);
            trialResultEvent(true);
            return true;
        }
        else {
            trialResultEvent(false);
            return false;
        }
    }
function deductRewardPoints(uint companyID,uint deductNumber,address bankID,uint accountID){
        //do something

        deductEvent(company[companyID],deductNumber);
}

    function increaseRewardPoints(uint companyID,uint increaseNumber,address bankID,uint accountID){
        //do something

        increaseEvent(company[companyID],increaseNumber);
    }

}



contract Bank {


    struct User {
        uint id;
        string name;
        string password;
        uint balance;
        //申請的融資
        address[] loanApply;
        //購買的債券
        address[] bondInvested;
    }

        address owner;
        uint realBankID;
        uint exchangeRule;

    event IncreaseTheAccountBalanceEvent(address from, address indexed specialBankId, uint indexed accountId, uint indexed realBankId, uint amount, uint afterBalance, uint256 timestamp);
    event OpenAccountEvent(address from, address indexed specialBankId, uint accountId, uint256 timestamp);
    event DecreaseTheAccountBalanceFromRealBankEvent(address from, address indexed specialBankId, uint indexed accountId, uint indexed realBankId, uint amount, uint afterBalance, uint256 timestamp);
    event transferUserToUserEVENT(uint fromID,uint toId, uint amount,uint256 timestamp);
    mapping (uint => User) users;


    function Bank(uint _realBankID,uint _exchangeRule){
        owner=msg.sender;
        realBankID=_realBankID;
        exchangeRule=_exchangeRule;
    }

    function getUser(uint _id) constant returns (uint id, string name, uint balance)  {

        var user = users[_id];
        if (user.id==0) {
            throw;
        }
        else{
        id = user.id;
        name = user.name;
        balance = user.balance;


        }
    }


    function createUserAccount(uint _id, string _name,uint _balance) returns (bool)  {

        users[_id].id=_id;
        users[_id].name=_name;
        users[_id].balance=_balance;

        OpenAccountEvent(msg.sender,this,users[_id].id,now);


        return true;

    }


     function depositRealbank(uint _realBankID,uint _accountID, uint amount) returns (uint afterBalance) {


        if (realBankID==_realBankID){
            if (users[_accountID].id==0){
            return 0;
            }
            else{
                users[_accountID].balance += amount;

                IncreaseTheAccountBalanceEvent(msg.sender,this, users[_accountID].id, realBankID,amount,users[_accountID].balance,now);

            return users[_accountID].balance;

        }
        }
        else{
            return 0;
        }

    }

    function withdrawRealbank(uint _id ,uint amount,uint _realBankID) returns (uint afterBalance) {



        if (realBankID==_realBankID){
            if (users[_id].id==0){
            return 0;
            }
            else{
                if (users[_id].balance<amount) {
                    return 0;
                }
                else {
                    users[_id].balance -= amount;
                    DecreaseTheAccountBalanceFromRealBankEvent(msg.sender,this,users[_id].id,realBankID,amount,users[_id].balance,now);

                    return users[_id].balance;
                }

            }
        }
        else{
            return 0;
        }

    }

    function transferUserToUser(uint fromId,uint toId, uint amount) returns (bool) {

        if (users[fromId].balance < amount) return false;

        users[fromId].balance -= amount;
        users[toId].balance  += amount;

        transferUserToUserEVENT(fromId,toId,amount,now);

        return true;
    }

     function checkBalance(uint userID,uint amount) constant returns (bool) {

        if (users[userID].id==0){
            return false;
        }
        return (users[userID].balance>=amount) ;
    }

}
