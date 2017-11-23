pragma solidity ^0.4.18;

import './TodoBank.sol';
import './TodoStorage.sol';

// @title  Todo
// @author Luke Hedger
contract Todo {
  /*
   * @notice todoBank state variable to store reference to TodoBank contract
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#state-variables
   */
  TodoBank todoBank;

  /*
   * @notice todoStorage state variable to store reference to TodoStorage
   *         contract
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#state-variables
   */
  TodoStorage todoStorage;

  /*
   * @notice TodoAdded event
   * @param {bytes32} todoId
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#events
   */
  event TodoAdded(bytes32 todoId);

  /*
   * @notice Todo contract constructor function - called when creating the
   *         contract. Will instantiate the TodoBank and TodoStorage contracts
   *         at the provided addresses.
   * @param {address} _todoBank    Address of the deployed TodoBank contract
   * @param {address} _todoStorage Address of the deployed TodoStorage contract
   * @see http://solidity.readthedocs.io/en/develop/contracts.html#creating-contracts
   */
  function Todo(address _todoBank, address _todoStorage) public {
    todoBank = TodoBank(_todoBank);

    todoStorage = TodoStorage(_todoStorage);
  }

  /*
   * @notice Method to add a new todo for message sender
   * @param {bytes32} _todoId Swarm hash of todo metadata
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#functions
   */
  function addTodo(bytes32 _todoId) public payable {
    /*
     * @notice Compute `_userId` from hash of `msg.sender` address
     */
    bytes32 _userId = keccak256(msg.sender);

    /*
     * @notice Call the `setTodo` method on the TodoStorage contract
     */
    todoStorage.setTodo(_todoId, _userId);

    /*
     * @notice Call the `setTodoDeposit` method on the TodoBank contract.
     *         `msg.value` sent in transaction is used as the deposit amount.
     */
    todoBank.setTodoDeposit(_todoId, msg.value);

    /*
     * @notice Trigger the `TodoAdded` event
     */
    TodoAdded(_todoId);
  }

  /*
   * @notice Method to get a user's todo by index from the array of todos stored
   * @param  {uint}    _index Index of required todo
   * @return {bytes32} todoId
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#functions
   */
  function getTodo(uint _index) public view returns (bytes32) {
    /*
     * @notice Compute `_userId` from hash of `msg.sender` address
     */
    bytes32 _userId = keccak256(msg.sender);

    /*
     * @notice Call the `getTodoByIndex` method on the TodoStorage contract
     */
    return todoStorage.getTodoByIndex(_index, _userId);
  }

  /*
   * @notice Method to get a user's todo by index from the array of todos stored
   * @return {uint} todoCount
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#functions
   */
  function getTodoCount() public view returns (uint) {
    /*
     * @notice Compute `_userId` from hash of `msg.sender` address
     */
    bytes32 _userId = keccak256(msg.sender);

    /*
     * @notice Call the `getTodoCount` method on the TodoStorage contract.
     */
    return todoStorage.getTodoCount(_userId);
  }
}
