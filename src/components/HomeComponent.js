import './HomeComponent.css'
import TodoListComponent from './TodoListComponent'
import { DragDropContext } from 'react-beautiful-dnd'
import db from './database'
import { useState, useEffect } from 'react'

const HomeComponent = () => {
  const [listData, setListData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function f() {
      let todos = await db.getAllTodos()
      let listData = {
        todos: {},
        lists: {
          'tehtävät': {
            id: 'tehtävät',
            title: 'All todos',
            todoIds: []
          }
        },
        listOrder: ['tehtävät']
      }
      todos.forEach((todo, index) => {
        let todoId = `todo-${index}`
        listData.todos[todoId] = todo
        listData.lists['tehtävät'].todoIds.push(todoId)
      });
      setListData(listData)
      setIsLoaded(true)
    }
    f()
  }, [])

  const addTodo = (newTodo) => {
    let newListData = {
      ...listData
    }
    let keys = Object.keys(listData.todos)
    let lastTodoIdNum = Number(keys[keys.length - 1].split('-')[1])
    let newTodoId = `todo-${lastTodoIdNum + 1}`
    newListData.todos[newTodoId] = newTodo
    newListData.lists['tehtävät'].todoIds.push(newTodoId)
    setListData(newListData)
  }

  const deleteTodo = async (id) => {
    let newListData = {
      ...listData
    }
    let todoIdToDelete = Object.keys(listData.todos).find(key => {
      return listData.todos[key].id === id
    })
    delete newListData.todos[todoIdToDelete]
    newListData.lists['tehtävät'].todoIds = Object.keys(listData.todos).filter(key => {
      return listData.todos[key].id !== id
    })
    setListData(newListData)
    await db.deleteTodo(id)
  }

  const editTodo = async (todo) => {
      let newListData = {
        ...listData
      }
      let newTodo = await db.updateTodo(todo)
      let todoIdToEdit = Object.keys(listData.todos).find(key => {
        return listData.todos[key].id === newTodo.id
      })
      newListData.todos[todoIdToEdit] = newTodo
      setListData(newListData)
    }

  const onDragEnd = result => {
    const { destination, source, draggableId } = result
    const list = listData.lists[source.droppableId]
    const newTodoIds = Array.from(list.todoIds)
    newTodoIds.splice(source.index, 1)
    newTodoIds.splice(destination.index, 0, draggableId)
    const newListData = {
      ...listData
    }
    newListData.lists[source.droppableId].todoIds = newTodoIds
    setListData(newListData)
  }

  return (
    <div className="todos-today">
      <h1>Tehtävät</h1>
      <DragDropContext onDragEnd={result => onDragEnd(result)}>
        {isLoaded ? <TodoListComponent data={listData} addTodo={addTodo} deleteTodo={deleteTodo} editTodo={editTodo}/> : "Loading"}
      </DragDropContext>
    </div>
  )
}

export default HomeComponent