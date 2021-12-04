/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addList, deleteList, fetchLists, fetchTodos } from '../redux'
import './ListViewPageComponent.css'
import TodoListComponent from './TodoListComponent'
import ListViewComponent from './ListViewComponent'

function ListViewPageComponent () {
  const [filters, setFilters] = useState([])
  const [listCount, setListCount] = useState(3)
  const [listsToShow, setListsToShow] = useState([])
  const lists = useSelector(state => state.list)
  const listData = useSelector(state => state.todo)
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
    setListsToShow(newLists)
  }, [])

  useEffect(() => {
    // const numOfLists = Math.min(
    //   listCount,
    //   Object.keys(listData.lists).length
    // )
    const newLists = [...listsToShow]
    if (newLists.length > listCount) {
      setListsToShow(newLists.slice(0, listCount))
    } else {
      listData.listOrder.forEach(list => {
        if (!newLists.includes(list) && newLists.length < listCount) {
          newLists.push(list)
        }
      })
      while (newLists.length < listCount) {
        newLists.push('empty')
      }
      setListsToShow(newLists)
    }
  }, [listCount])

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

  console.log(listsToShow)

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
          <input type='text' name='newListText' placeholder='Lisää uusi lista'></input>
        </form>
      </div>
      <div className='list-view-lists'>
        {listsToShow.map((list, index) => (
          <ListViewComponent
            key={list + index}
            listName={list}
            filters={filters}
            listsToShow={listsToShow}
            setListsToShow={setListsToShow}
          />
        ))}
      </div>
    </div>
  )
}

export default ListViewPageComponent
