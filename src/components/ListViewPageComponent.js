import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setListsToShow } from '../redux'
import './ListViewPageComponent.css'
import ListViewComponent from './ListViewComponent'

function ListViewPageComponent () {
  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState([])
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
