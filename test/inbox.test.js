const assert = require('assert');
const ganache = require('ganache-cli');

// Whenever we use Constructor function we capatalise it.
const Web3 = require('web3');

provider = ganache.provider()
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');


let accounts;
let inbox;
const INITIAL_STRING = 'Hi There!';

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

	inbox.setProvider(provider);
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		// Check if the value passing to assert.ok() is NULL of not.
		assert.ok(inbox.options.address);
	});

	// Calling a function which does not modifies any data on blockchain, rather only returns something is both instantaneous
	// and async() in nature.
	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hi There!');
	});

	// Whenever we transact a function we usually do not assign the result to any variable because we gets a transaction hash
	// for every such transaction.
	it('can change the message', async() => {
		await inbox.methods.setMessage('Bye There').send({ from: accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Bye There');
	});

}); 