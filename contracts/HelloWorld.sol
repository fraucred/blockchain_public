pragma solidity ^0.4.0;
contract HelloWorld {
	// uint public balance;
	address public owner;
	mapping (address => uint) balances;	
	function HelloWorld() {
		//balance = 1000;
		owner = msg.sender;
		balances[owner] = 1000;
	}

	function getBalance(address _user) constant returns (uint _balance){
		return balances[_user];
	}

	function transfer(address _to, uint _value) returns (bool success) {
		if (balances[msg.sender] < _value) {
			return false;
		}
		balances[msg.sender] -= _value;
		balances[_to] += _value;
		return true;
	}	
	/*
	function deposit(uint _value) returns(uint _newValue) {
		// .?.? o_o
		balance += _value;
		return balance;
	}
	*/
	
}
