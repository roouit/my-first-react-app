/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addList, deleteList, fetchLists, fetchTodos } from '../redux'
import './ListViewPageComponent.css'
import TodoListComponent from './TodoListComponent'
import ListViewComponent from './ListViewComponent'

function ListViewPageComponent () {
  const [filters, setFilters] = useState([])
  // const [listCount, setListCount] = useState(3)
  const [listsToShow, setListsToShow] = useState([])
  const lists = useSelector(state => state.list)
  const listData = useSelector(state => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    const defaultListCount = 3
    const numOfLists = Math.min(
      defaultListCount,
      Object.keys(listData.lists).length
    )
    setListsToShow(listData.listOrder.slice(0, numOfLists))
  }, [])

  const handleAddList = e => {
    e.preventDefault()
    const newListName = e.target.newListText.value
    if (!lists.lists.map(item => item.name).includes(newListName)) {
      dispatch(addList(newListName))
      e.target.newListText.value = ''
    } else {
      alert('Kyseinen lista on jo olemassa!')
    }
  }

  const handleRemoveList = (e) => {
    dispatch(deleteList(e.target.innerText))
  }

  // const getListsToShow = () => {
  //   const numOfLists = Math.min(listCount, Object.keys(listData.lists).length)
  //   const listsToShow = listData.listOrder.slice(0, numOfLists)
  //   return listsToShow
  // }

  return (
    <div className='list-view-wrapper'>
      <div className='list-view-header'>
        <h1>Listat</h1>
        {lists.loading
          ? (
          <div>Lataa listoja...</div>
            )
          : (
              lists.lists.map((list) => (
            <span key={list.name} onClick={(e) => handleRemoveList(e)}>
              {list.name}
            </span>
              ))
            )}
        <form onSubmit={(e) => handleAddList(e)}>
          <input type='text' name='newListText'></input>
        </form>
      </div>
      <div className='list-view-lists'>
        {listsToShow.map((list) => <ListViewComponent key={list} listName={list} filters={filters} listsToShow={listsToShow} setListsToShow={setListsToShow}/>)}
      </div>
    </div>
  )
}

export default ListViewPageComponent
