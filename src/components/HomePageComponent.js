import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTodo, addTodo } from '../redux'
import TodoListComponent from './TodoListComponent'
import CalendarComponent from './CalendarComponent'
import './HomePageComponent.css'
import moment from 'moment'

const HomePageComponent = () => {
  const [filters, setFilters] = useState([])
  const [sortByLastModified, setSortByLastModified] = useState(false)
  const [update, setUpdate] = useState(false)
  const listData = useSelector((state) => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    handleSortTodos()
  }, [])

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
            checked={sortByLastModified}
            onChange={() => handleSortTodos()}
          ></input>
          Näytä viimeksi muokatut ensin
        </label>
        <div className='search-bar'>
          <form
            className='filter-todos-form'
            onSubmit={(e) => handleAddFilters(e)}
          >
            <input
              type='text'
              name='todoFilters'
              className='filter-todos'
              placeholder='Hae tehtävistä..'
            ></input>
            <span>
              <button className='add-filter-button'>Hae</button>
            </span>
            <div className='filters-list'>
              {filters.map((filter) => {
                return (
                  <span
                    className='filter-item'
                    key={filter}
                    onClick={(e) => handleRemoveFilter(e)}
                  >
                    {filter}
                    <br></br>
                  </span>
                )
              })}
            </div>
          </form>
          <form className='add-todo-form' onSubmit={(e) => handleAddTodo(e)}>
            <input
              type='text'
              name='todoText'
              className='add-todo-text'
              placeholder='Lisää uusi tehtävä..'
            ></input>
            <span>
              <button className='add-todo-save-button'>Lisää</button>
            </span>
          </form>
        </div>
        {!listData.loading
          ? (
          <TodoListComponent
            listName='all'
            filters={filters}
            setUpdate={setUpdate}
          />
            )
          : (
              'Ladataan...'
            )}
      </div>
      <CalendarComponent />
    </div>
  )
}

export default HomePageComponent
