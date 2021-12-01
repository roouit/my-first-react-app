import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addList, deleteList, fetchLists, fetchTodos } from '../redux'
import './ListViewComponent.css'
import TodoListComponent from './TodoListComponent'

function ListViewComponent () {
  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState([])
  const lists = useSelector(state => state.list)
  const listData = useSelector(state => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLists())
    dispatch(fetchTodos())
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
        <div>
          {!listData.loading
            ? (
            <TodoListComponent
              key='0'
              data={listData}
              listName='opiskelu'
              filters={filters}
            />
              )
            : (
                'Ladataan...'
              )}
        </div>
        <div>
          {!listData.loading
            ? (
            <TodoListComponent
              key='1'
              data={listData}
              listName='työ'
              filters={filters}
            />
              )
            : (
                'Ladataan...'
              )}
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ListViewComponent
