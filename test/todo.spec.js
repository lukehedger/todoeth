const { format } = require('date-fns')
const swarmhash = require('swarmhash')
const Web3 = require('web3')

const compiledContracts = require('../contracts/contracts.json')
const deployedAddresses = require('../contracts/addresses.json')

/**
 * Todo contract tests
 */
describe('Todoeth :: Contracts :: Todo', () => {
  let accounts, Todo, todoid, web3

  beforeAll(async () => {
    // init web3 library with local RPC endpoint
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

    // get the available Ethereum test accounts
    accounts = await web3.eth.getAccounts()

    // create a Swarm reference from some sample todo data
    // `0x` prefix is added to turn the Swarm hash into a valid `bytes32` value
    todoId = `0x${swarmhash(
      new Buffer(JSON.stringify({
        complete: false,
        deposit: 1,
        owner: accounts[1],
        task: 'Write about Smart Contracts',
        timestamp: format(new Date(2017, 11, 31), 'x'),
      }))
    ).toString('hex')}`

    // create a new instance of the Todo contract
    Todo = new web3.eth.Contract(
      compiledContracts.Todo.abi, deployedAddresses.Todo
    )
  })

  describe('Todo.addTodo', () => {
    it('Should add a new todo', async () => {
      // use an Ethereum test account to send the transaction
      const address = accounts[1]

      // set the transaction `from` address, `gas` limit and todo deposit `value`
      const options = { from: address, gas: 4700000, value: 1 }

      // add a new todo!
      const actual = await Todo.methods.addTodo(todoId).send(options)
      const expected = todoId

      // test that the returned `todoId` matches the provided `todoId`
      expect(actual.events.TodoAdded.returnValues.todoId).toEqual(expected)
    })

    describe('Todo.getTodo', () => {
      it('Should get the user\'s first todo', async () => {
        // use the same Ethereum test account to send the transaction
        const address = accounts[1]

        // set the transaction `from` address and `gas` limit
        const options = { from: address, gas: 4700000 }

        // get the first todo for this user
        const actual = await Todo.methods.getTodo(0).call(options)
        const expected = todoId

        // test that the returned `todoId` matches the provided `todoId`
        expect(actual).toEqual(expected)
      })
    })
  })
})
