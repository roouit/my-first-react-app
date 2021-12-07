import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTodo, addTodo } from '../redux'
import TodoListComponent from './TodoListComponent'
import './HomePageComponent.css'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const HomePageComponent = () => {
  const [filters, setFilters] = useState([])
  const [sortByLastModified, setSortByLastModified] = useState(false)
  const [update, setUpdate] = useState(false)
  const listData = useSelector((state) => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    if (sortByLastModified && update) {
      const newListData = getSortedTodoList()
      setUpdate(false)
      dispatch(updateTodo(newListData))
    }
  }, [listData])

  const getSortedTodoList = () => {
    const sortedArray = listData.lists.all.todoIds.sort(
      (a, b) =>
        moment(listData.todos[b].last_modified).valueOf() -
        moment(listData.todos[a].last_modified).valueOf()
    )
    const newListData = {
      ...listData
    }
    newListData.lists.all.todoIds = sortedArray
    return newListData
  }

  const handleSortTodos = () => {
    if (sortByLastModified === false) {
      const newListData = getSortedTodoList()
      dispatch(updateTodo(newListData))
      setUpdate(true)
    }
    setSortByLastModified(!sortByLastModified)
  }

  const handleAddTodo = (e) => {
    e.preventDefault()
    dispatch(addTodo(e.target.todoText.value, listData))
    e.target.todoText.value = ''
    setUpdate(true)
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
          {!listData.loading
            ? (
            <TodoListComponent
              // data={listData}
              listName='all'
              filters={filters}
            />
              )
            : (
                'Ladataan...'
              )}
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

export default HomePageComponent
