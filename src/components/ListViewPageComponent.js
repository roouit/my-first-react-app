import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateListsToShow, updateTodo, addTodo } from '../redux'
import moment from 'moment'
import './ListViewPageComponent.css'
import ListViewComponent from './ListViewComponent'

function ListViewPageComponent () {
  const [filters, setFilters] = useState([])
  const [sortByLastModified, setSortByLastModified] = useState(false)
  const [update, setUpdate] = useState(false)
  const [listCount, setListCount] = useState(3)
  const listData = useSelector(state => state.todo)
  const lists = useSelector((state) => state.list)
  const dispatch = useDispatch()

  useEffect(() => {
    if (sortByLastModified && update) {
      const newListData = getSortedTodoList()
      setUpdate(false)
      dispatch(updateTodo(newListData))
    }
  }, [listData])

  useEffect(() => {
    const newLists = [...lists.listsToShow]
    if (newLists.length > listCount) {
      dispatch(updateListsToShow(newLists.slice(0, listCount)))
    } else {
      listData.listOrder.forEach(list => {
        if (!newLists.includes(list) && newLists.length < listCount) {
          newLists.push(list)
        }
      })
      while (newLists.length < listCount) {
        newLists.push('empty')
      }
      dispatch(updateListsToShow(newLists))
    }
  }, [listCount])

  const getSortedTodoList = () => {
    const newListData = {
      ...listData
    }
    lists.listsToShow.forEach(list => {
      if (list !== 'empty') {
        const sortedArray = listData.lists[list].todoIds.sort(
          (a, b) =>
            moment(listData.todos[b].last_modified).valueOf() -
            moment(listData.todos[a].last_modified).valueOf()
        )
        newListData.lists[list].todoIds = sortedArray
      }
    })
    return newListData
  }

  const handleAddTodo = (e) => {
    e.preventDefault()
    dispatch(addTodo(e.target.todoText.value, listData))
    e.target.todoText.value = ''
    setUpdate(true)
  }

  const handleSortTodos = () => {
    if (sortByLastModified === false) {
      const newListData = getSortedTodoList()
      dispatch(updateTodo(newListData))
      setUpdate(true)
    }
    setSortByLastModified(!sortByLastModified)
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
    <div className='list-view-wrapper'>
      <div className='list-view-header'>
        <div className='layout-icons'>
          <img
            className='layout-icon'
            src='single-column.png'
            alt='yksi palsta'
            onClick={() => setListCount(1)}
          ></img>
          <img
            className='layout-icon'
            src='double-column.png'
            alt='kaksi palstaa'
            onClick={() => setListCount(2)}
          ></img>
          <img
            className='layout-icon'
            src='triple-column.png'
            alt='kolme palstaa'
            onClick={() => setListCount(3)}
          ></img>
        </div>
        <div className='sort-options'>
          <label>
            <input
              className='todo-sort-by-edit'
              type='checkbox'
              defaultChecked={sortByLastModified}
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
                    <span className='filter-item' key={filter} onClick={(e) => handleRemoveFilter(e)}>
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
        </div>
      </div>
      <div className='list-view-lists'>
        {lists.listsToShow.map((list, index) => (
          <ListViewComponent
            key={list + index}
            listName={list}
            filters={filters}
            listsToShow={lists.listsToShow}
          />
        ))}
      </div>
    </div>
  )
}

export default ListViewPageComponent
