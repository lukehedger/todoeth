pragma solidity ^0.4.18;

// @title  TodoStorage
// @author Luke Hedger
contract TodoStorage {
  /*
   * @notice Store todos in TodoStore as a mapping of `bytes32` to `bytes32[]`
   * @see http://solidity.readthedocs.io/en/develop/types.html#mappings
   */
  mapping(bytes32 => bytes32[]) TodoStore;

  /*
   * @notice Get todo by index
   * @param  {uint}    _index
   * @param  {bytes32} _user
   * @return {bytes32} todo
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#functions
   */
  function getTodoByIndex(uint _index, bytes32 _user) public view returns (bytes32) {
    /*
     * @notice Get todo from store by userId and index
     */
    return TodoStore[_user][_index];
  }

  /*
   * @notice Get number of todos for a user
   * @param  {bytes32} _user
   * @return {uint}    todoCount
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#functions
   */
  function getTodoCount(bytes32 _user) public view returns (uint) {
    /*
     * @notice Get length of todo array from store by userId
     */
    return TodoStore[_user].length;
  }

  /*
   * @notice Set a todo to the store
   * @param {bytes32} _todoId
   * @param {bytes32} _user
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#functions
   */
  function setTodo(bytes32 _todoId, bytes32 _user) public {
    /*
     * @notice Push todo to store by userId
     */
    TodoStore[_user].push(_todoId);
  }
}
