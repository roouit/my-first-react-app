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

  const addToListData = (newTodo) => {
    let newListData = {
      ...listData
    }
    let keys = Object.keys(newListData.todos)
    let lastTodoIdNum = Number(keys[keys.length - 1].split('-')[1])
    let newTodoId = `todo-${lastTodoIdNum + 1}`
    newListData.todos[newTodoId] = newTodo
    newListData.lists['tehtävät'].todoIds.push(newTodoId)
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
        {isLoaded ? <TodoListComponent data={listData} addToListData={addToListData}/> : "Loading"}
      </DragDropContext>
    </div>
  )
}

export default HomeComponent