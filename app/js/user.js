import web3 from './web3'

/**
 * Get the Ethereum accounts controlled by the current RPC provider
 *
 * @return {Array} Ethereum accounts
 */
export const getAccounts = () => {
  return web3.eth.getAccounts()
}

/**
 * Get the balance in Ether of an address
 *
 * @param  {String} address Ethereum address of account
 * @return {Number}         Balance of account in Ether, converted from Wei
 */
export const getBalance = address => {
  return web3.eth.getBalance(address)
    .then(balance => web3.utils.fromWei(balance, 'ether'))
}
