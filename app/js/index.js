import 'babel-polyfill' // Polyfill for async/await
import State from './state'
import * as todo from './todo'
import * as user from './user'

// Define the default application state
const initialState = {
  balance: 0, // Balance of current user's Ethereum account
  stake: 1, // Default todo stake of 1 Ether
  todos: {}, // Map of todos keyed by todo ID
  user: null, // Ethereum address of the current user
}

/**
 * Render todo list
 *
 * @param  {Object} el    DOM element of list
 * @param  {Array}  todos Todo list
 * @return {void}
 */
const renderTodos = (el, todos) => {
  // Teardown the current todo list
  el.innerHTML = ''

  // Render each todo to the DOM - this would be better with a virtual DOM!
  todos.map(todo => {
    // Convert todo complete value from String to Boolean
    const complete = (todo.complete == 'true')

    // Create todo list item elements
    const li = document.createElement('li')
    const task = document.createTextNode(todo.task)

    // Add classname to display todo status
    li.className = complete ? 'complete' : 'incomplete'

    // Append elements to DOM
    li.appendChild(task)
    el.appendChild(li)
  })
}

const init = async () => {
  // Get references to DOM elements
  const elAddTodo = document.getElementsByClassName('addTodo')[0]
  const elBalance = document.getElementsByClassName('balance')[0]
  const elInputTodo = document.getElementsByClassName('inputTodo')[0]
  const elStake = document.getElementsByClassName('stake')[0]
  const elTodos = document.getElementsByClassName('todos')[0]

  // Register add todo event listeners to button
  elAddTodo.addEventListener('click', async () => {
    // Add new todo to todo list
    await todo.addTodo(
      state.getState('stake'),
      elInputTodo.value,
      state.getState('user')
    )

    // Get the updated balance (adding a new todo costs Ether!)
    const balance = await user.getBalance(accounts[1])

    // Update the DOM with the balance
    elBalance.innerHTML = balance

    // Get the updated todo list
    const todos = await todo.getTodos(state.getState('user'))

    // Render the todo list to the DOM
    return renderTodos(elTodos, todos)
  })

  // Initialise the application state
  const state = new State(initialState)

  // Get the Ethereum accounts that are registered to the connected node
  const accounts = await user.getAccounts()

  // Use the account at index `1` as the user account
  // Usually this would be selected via the UI or a web wallet, like MetaMask
  state.setState({ user: accounts[1] })

  // Get the current user's account balance in Ether
  const balance = await user.getBalance(accounts[1])

  // Update the state with the current user's account balance
  state.setState({ balance: balance })

  // Update the DOM with the balance
  elBalance.innerHTML = balance

  // Update the DOM with the stake
  elStake.innerHTML = state.getState('stake')

  // Get current user's todo list
  const todos = await todo.getTodos(state.getState('user'))

  // Render the todo list to the DOM
  return renderTodos(elTodos, todos)
}

// Initialise the application
init()
