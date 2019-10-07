//using require will not work as the javascript interpreter will pop out the error that inbox.sol is not a js file..
//Hence we will directly read the sol file from HDD.
//require('.contracts/inbox.sol')

const path = require('path');
const fs = require('fs');
const solc = require('solc');
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// Number of solidity contracts you want to compile
module.exports = solc.compile(source, 1).contracts[':Inbox'];

 