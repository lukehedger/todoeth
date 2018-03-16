import web3 from './web3'

/**
 * Upload data to Swarm
 *
 * Formats data for upload into structure required by `web3.bzz`
 * Uploads data to Swarm
 * Returns resulting Swarm hash
 *
 * @see https://github.com/MaiaVictor/swarm-js/#uploads
 * @see http://web3js.readthedocs.io/en/1.0/web3-bzz.html#id7
 *
 * @param  {Object}      data Data to upload to Swarm
 * @return {String}      Swarm content hash
 */
export const upload = data => {
  return web3.bzz.upload(
    Object.keys(data)
      .map(key => ({
        [`/${key}`]: {
          type: 'text/plain',
          data: JSON.stringify(data[key]),
        },
      }))
      .reduce((o, v) => Object.assign({}, o, v), {})
  )
}

/**
 * Download data from Swarm
 *
 * @param  {String} hash Swarm content hash
 * @return {*}           Data downloaded from Swarm
 */
export const download = hash => {
  return web3.bzz.download(hash)
}
