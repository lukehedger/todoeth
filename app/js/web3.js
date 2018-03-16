import Web3 from 'web3'

// init the web3 library using a local RPC endpoint
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// init Swarm using a local node
web3.bzz.setProvider('http://localhost:8500')

export default web3
