import React from 'react'
import './ListHandlerComponent.css'
import { useSelector, useDispatch } from 'react-redux'
import { addList, deleteList, editList } from '../redux'
import ListItemComponent from './ListItemComponent'

function ListHandlerComponent () {
  const lists = useSelector((state) => state.list)
  const dispatch = useDispatch()

  const handleAddList = (e) => {
    e.preventDefault()
    const newListName = e.target.newListText.value
    if (!lists.lists.map((item) => item.name).includes(newListName)) {
      dispatch(addList(newListName))
      e.target.newListText.value = ''
    } else {
      alert('Kyseinen lista on jo olemassa!')
    }
  }

  const handleRemoveList = (listNameToDel) => {
    dispatch(deleteList(listNameToDel))
  }

  const handleEditList = (e, oldListName) => {
    e.preventDefault()
    const newListName = e.target.newListName.value
    dispatch(editList(oldListName, newListName))
  }

  return (
    <div className='list-handler'>
      {lists.loading
        ? (
        <div>Lataa listoja...</div>
          )
        : (
        <ul className='listname-list'>
          {lists.lists.map((list) => (
            <ListItemComponent key={list.name} list={list} handleRemoveList={handleRemoveList} handleEditList={handleEditList}/>
          ))}
        </ul>
          )}
      <form className='new-list-form' onSubmit={(e) => handleAddList(e)}>
        <input
          type='text'
          name='newListText'
          placeholder='Lisää uusi lista'
        ></input>
      </form>
    </div>
  )
}

export default ListHandlerComponent
