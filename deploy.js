// Truffle is used to simultaneously specify which account we want to use as a source of ether and what outside node
// we are going to connect to
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
	'master nut blur reopen black secret pole heart grunt enhance clean real', 
	'https://rinkeby.infura.io/v3/ddadd8e5449f4890a6ff7f6697108fc7'
);

const web3 = new Web3(provider);

// We cannot use async await outside of a function, hence a function is declared.
const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: '0x' + bytecode,  arguments: ['Hi There!']})
		.send({ from: accounts[0] });

	console.log('Contract deployed to', result.options.address);
};

deploy();