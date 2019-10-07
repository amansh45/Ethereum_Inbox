const assert = require('assert');
const ganache = require('ganache-cli');

// Whenever we use Constructor function we capatalise it.
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

/*

Every function attached to eth will be using promises..
In place of .then we can use async await.

beforeEach(() => {
	web3.eth.getAccounts().then(fetchedAccounts => {
		console.log(fetchedAccounts);
	});
});
	
*/

beforeEach(async () => {
	// Get a list of all accounts.
	
	accounts = await web3.eth.getAccounts();

	// Use one of the accounts to deploy the contract.
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode,  arguments: ['Hi There!']})
		.send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		console.log(inbox);
	});
});