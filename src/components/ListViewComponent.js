import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addList } from '../redux'

function ListViewComponent () {
  const lists = useSelector(state => state.list.lists)
  const dispatch = useDispatch()

  const handleAddList = e => {
    e.preventDefault()
    const newListName = e.target.newListText.value
    if (!lists.map(item => item.name).includes(newListName)) {
      dispatch(addList(newListName))
      e.target.newListText.value = ''
    } else {
      alert('Kyseinen lista on jo olemassa!')
    }
  }

  return (
    <div className='list-view-wrapper'>
      <h1>Listat</h1>
      {lists.map((list) => (
        <span key={list.name}>{list.name}</span>
      ))}
      <form onSubmit={(e) => handleAddList(e)}>
        <input type='text' name='newListText'></input>
      </form>
    </div>
  )
}

export default ListViewComponent
