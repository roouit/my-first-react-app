import React from 'react'
import { useSelector } from 'react-redux'
import { selectLists } from '../features/listSlice'

function ListViewComponent () {
  const lists = useSelector(selectLists)
  return (
    <div className='list-view-wrapper'>
      <h1>Listat</h1>
      {lists.map((list) => (
        <span key={list.id.toString()}>{list.name}</span>
      ))}
    </div>
  )
}

export default ListViewComponent
