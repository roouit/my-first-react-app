import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setListsToShow, updateTodo } from '../redux'
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
    const numOfLists = Math.min(
      listCount,
      Object.keys(listData.lists).length
    )
    const newLists = listData.listOrder.slice(0, numOfLists)
    while (newLists.length < listCount) {
      newLists.push('empty')
    }
    dispatch(setListsToShow(newLists))
  }, [])

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
      dispatch(setListsToShow(newLists.slice(0, listCount)))
    } else {
      listData.listOrder.forEach(list => {
        if (!newLists.includes(list) && newLists.length < listCount) {
          newLists.push(list)
        }
      })
      while (newLists.length < listCount) {
        newLists.push('empty')
      }
      dispatch(setListsToShow(newLists))
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
