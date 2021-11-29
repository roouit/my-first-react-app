import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, updateTodo, addTodo } from '../redux'
import TodoListComponent from './TodoListComponent'
import './HomeComponent.css'
import moment from 'moment'
import { DragDropContext } from 'react-beautiful-dnd'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const HomeComponent = () => {
  const [filters, setFilters] = useState([])
  const [sortByLastModified, setSortByLastModified] = useState(false)
  const listData = useSelector((state) => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const getSortedTodoList = () => {
    const sortedArray = listData.lists['tehtävät'].todoIds.sort(
      (a, b) =>
        moment(listData.todos[b].last_modified).valueOf() -
        moment(listData.todos[a].last_modified).valueOf()
    )
    const newListData = {
      ...listData
    }
    newListData.lists['tehtävät'].todoIds = sortedArray
    return newListData
  }

  const handleSortTodos = () => {
    if (sortByLastModified === false) {
      const newListData = getSortedTodoList()
      dispatch(updateTodo(newListData))
    }
    setSortByLastModified(!sortByLastModified)
  }

  const handleAddTodo = (e) => {
    e.preventDefault()
    dispatch(addTodo(e.target.todoText.value, listData))
    e.target.todoText.value = ''
    // TO FIX
    // if (sortByLastModified) {
    //   const sortedListData = getSortedTodoList()
    //   setListData(sortedListData)
    // }
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
    dispatch(updateTodo(newListData))
  }

  return (
    <div className='home-wrapper'>
      <div className='todos-today'>
        <h1>Tehtävät</h1>
        <label>
          <input
            className='todo-sort-by-edit'
            type='checkbox'
            defaultChecked={sortByLastModified}
            onChange={() => handleSortTodos()}
          ></input>
          Järjestä automaattisesti muokkausajan mukaan
        </label>
        <form
          className='filter-todos-form'
          onSubmit={(e) => handleAddFilters(e)}
        >
          <input
            type='text'
            name='todoFilters'
            className='filter-todos'
            placeholder='Suodata tehtäviä..'
          ></input>
        </form>
        <div>
          {filters.map((filter) => {
            return (
              <span key={filter} onClick={(e) => handleRemoveFilter(e)}>
                {filter}
                <br></br>
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
          {!listData.loading
            ? (
            <TodoListComponent
              data={listData}
              listName='tehtävät'
              filters={filters}
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
