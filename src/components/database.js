import moment from 'moment'

async function getAllLists () {
  let lists = await fetch('http://localhost:3010/lists')
  lists = await lists.json()
  return lists
}

async function getAllTodos () {
  let todos = await fetch('http://localhost:3010/todos')
  todos = await todos.json()
  return todos
}

async function getById (id) {
  let todos = await fetch(`http://localhost:3010/todos/${id}`)
  todos = await todos.json()
  return todos
}

async function addTodo (data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
  const newTodo = await fetch('http://localhost:3010/todos', requestOptions)
  return await newTodo.json()
}

async function addList (data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
  const newTodo = await fetch('http://localhost:3010/lists', requestOptions)
  return await newTodo.json()
}

async function deleteTodo (id) {
  await fetch(`http://localhost:3010/todos/${id}`, {
    method: 'DELETE'
  })
}

async function deleteList (id) {
  await fetch(`http://localhost:3010/lists/${id}`, {
    method: 'DELETE'
  })
}

async function updateIsDone (id) {
  const todo = await getById(id)
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: todo.text,
      due: todo.due,
      isDone: !todo.isDone,
      list: todo.list,
      tags: todo.tags,
      last_modified: todo.last_modified
    })
  }
  await fetch(`http://localhost:3010/todos/${id}`, requestOptions)
}

async function updateTodo (todo) {
  const obj = {
    text: todo.text,
    due: todo.due,
    isDone: todo.isDone,
    list: todo.list,
    tags: todo.tags,
    last_modified: moment().format('YYYY-MM-DDTHH:mm:ss')
  }
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  }
  const result = await fetch(
    `http://localhost:3010/todos/${todo.id}`,
    requestOptions
  )
  return await result.json()
}

const functions = {
  getAllLists: getAllLists,
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  addList: addList,
  updateIsDone: updateIsDone,
  deleteTodo: deleteTodo,
  deleteList: deleteList,
  updateTodo: updateTodo
}
export default functions
