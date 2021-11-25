import './HomeComponent.css'
import TodoListComponent from './TodoListComponent'
import { DragDropContext } from 'react-beautiful-dnd'
import db from './database'
import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const HomeComponent = () => {
  const [listData, setListData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [filters, setFilters] = useState([])

  useEffect(() => {
    async function f () {
      const todos = await db.getAllTodos()
      const listData = {
        todos: {},
        lists: {
          tehtävät: {
            id: 'tehtävät',
            title: 'All todos',
            todoIds: []
          }
        },
        listOrder: ['tehtävät']
      }
      todos.forEach((todo, index) => {
        const todoId = `todo-${index}`
        listData.todos[todoId] = todo
        listData.lists['tehtävät'].todoIds.push(todoId)
      })
      setListData(listData)
      setIsLoaded(true)
    }
    f()
  }, [])

  const handleAddTodo = async (e) => {
    e.preventDefault()
    const newTodoData = {
      text: e.target.todoText.value,
      due: null,
      list: null,
      isDone: false,
      tags: []
    }
    e.target.todoText.value = ''
    const newTodo = await db.addTodo(newTodoData)
    const newListData = {
      ...listData
    }
    const keys = Object.keys(listData.todos)
    const lastTodoIdNum = Number(keys[keys.length - 1].split('-')[1])
    const newTodoId = `todo-${lastTodoIdNum + 1}`
    newListData.todos[newTodoId] = newTodo
    newListData.lists['tehtävät'].todoIds.push(newTodoId)
    setListData(newListData)
  }

  const handleAddFilters = (e) => {
    e.preventDefault()
    if (e.target.todoFilters.value) {
      setFilters([...filters, e.target.todoFilters.value])
      e.target.todoFilters.value = ''
    }
  }

  const handleRemoveFilter = (e) => {
    const newFilters = [...filters].filter((filter) => {
      return filter !== e.target.textContent
    })
    setFilters(newFilters)
  }

  const deleteTodo = async (id) => {
    const newListData = {
      ...listData
    }
    const todoIdToDelete = Object.keys(listData.todos).find((key) => {
      return listData.todos[key].id === id
    })
    delete newListData.todos[todoIdToDelete]
    newListData.lists['tehtävät'].todoIds = Object.keys(listData.todos).filter(
      (key) => {
        return listData.todos[key].id !== id
      }
    )
    setListData(newListData)
    await db.deleteTodo(id)
  }

  const editTodo = async (todo) => {
    const newListData = {
      ...listData
    }
    const newTodo = await db.updateTodo(todo)
    const todoIdToEdit = Object.keys(listData.todos).find((key) => {
      return listData.todos[key].id === newTodo.id
    })
    newListData.todos[todoIdToEdit] = newTodo
    setListData(newListData)
  }

  const onDragEnd = (result) => {
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
    <div className='home-wrapper'>
      <div className='todos-today'>
        <h1>Tehtävät</h1>
        <form className='filter-todos-form' onSubmit={(e) => handleAddFilters(e)}>
          <input
            type='text'
            name='todoFilters'
            className='filter-todos'
            placeholder='Suodata tehtäviä..'
          ></input>
        </form>
        <div>
          {filters.map(filter => {
            return (
              <span key={filter} onClick={(e) => handleRemoveFilter(e)}>
                {filter}<br></br>
              </span>
            )
          })}
        </div>
        <form className='add-todo-form' onSubmit={(e) => handleAddTodo(e)}>
          <input
            type='text'
            name='todoText'
            className='add-todo-text'
            placeholder='Lisää uusi tehtävä..'
          ></input>
          <span>
            <button className='add-todo-save-button'>Tallenna</button>
          </span>
        </form>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {isLoaded
            ? (
            <TodoListComponent
              data={listData}
              listName='tehtävät'
              filters={filters}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
              )
            : (
                'Ladataan...'
              )}
        </DragDropContext>
      </div>
      <div className='calendar'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridWeek'
          weekends={false}
          events={[
            { title: 'Käy kaupassa', date: '2021-11-29' },
            { title: 'Treenit', date: '2021-12-01' }
          ]}
        />
      </div>
    </div>
  )
}

export default HomeComponent
