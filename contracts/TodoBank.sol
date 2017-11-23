pragma solidity ^0.4.18;

// @title  TodoBank
// @author Luke Hedger
contract TodoBank {
  /*
   * @notice Store todo deposit in TodoVault as a mapping of `bytes32` to `uint`
   * @see http://solidity.readthedocs.io/en/develop/types.html#mappings
   */
  mapping(bytes32 => uint) TodoVault;

  /*
   * @notice Get a todo deposit value from the vault
   * @param {bytes32} _todoId
   * @return {uint}   todoDeposit
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#functions
   */
  function getTodoDeposit(bytes32 _todoId) public view returns (uint) {
    /*
     * @notice Get deposit from vault by todoId
     */
    return TodoVault[_todoId];
  }

  /*
   * @notice Set a todo deposit value to the vault
   * @param {bytes32} _todoId
   * @param {uint}    _deposit
   * @see https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html#functions
   */
  function setTodoDeposit(bytes32 _todoId, uint _deposit) public {
    /*
     * @notice Set deposit to vault by todoId
     */
    TodoVault[_todoId] = _deposit;
  }
}
