/**
 * Simple state manager
 *
 * @type {Class}
 */
export default class State {
  constructor(state) {
    /**
     * Initialise state object
     *
     * @type {Object}
     */
    this.state = state
  }

  /**
   * Get state item by key
   *
   * @param  {String} stateKey Key of state item
   * @return {*}               Value of state item
   */
  getState(stateKey) {
    return this.state[stateKey]
  }

  /**
   * ...
   *
   * @param  {Object} newState Value to merge into state
   * @return {void}
   */
  setState(newState) {
    this.state = Object.assign({}, this.state, newState)
  }
}
