import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addList, deleteList, fetchLists } from '../redux'
import './ListViewComponent.css'

function ListViewComponent () {
  const lists = useSelector(state => state.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLists())
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

  return (
    <div className='list-view-wrapper'>
      <h1>Listat</h1>
      {lists.loading
        ? <div>Lataa listoja...</div>
        : (lists.lists.map((list) => (
          <span
            key={list.name}
            onClick={(e) => handleRemoveList(e)}>{list.name}</span>
          )))}
      <form onSubmit={(e) => handleAddList(e)}>
        <input type='text' name='newListText'></input>
      </form>
    </div>
  )
}

export default ListViewComponent
