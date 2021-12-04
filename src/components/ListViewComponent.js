import React from 'react'
import { useSelector } from 'react-redux'
import TodoListComponent from './TodoListComponent'
import PropTypes from 'prop-types'

function ListViewComponent ({ listName, filters, listsToShow, setListsToShow }) {
  const todos = useSelector((state) => state.todo)

  ListViewComponent.propTypes = {
    listName: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired,
    listsToShow: PropTypes.array.isRequired,
    setListsToShow: PropTypes.func.isRequired
  }

  const getListName = (listId) => {
    if (listId === 'all') return 'Kaikki'
    if (listId === 'empty') return '-'
    return todos.lists[listId].id
  }

  const handleListChange = (e) => {
    const newListName = e.target.value === 'Kaikki' ? 'all' : e.target.value.toLowerCase()
    console.log('newList', newListName)
    const newListsToShow = [...listsToShow]
    console.log('newLists', newListsToShow)
    const indexToAdd = newListsToShow.indexOf(listName)
    console.log('indexToAdd', indexToAdd)
    let indexToDel = null
    if (newListsToShow.includes(newListName)) {
      indexToDel = newListsToShow.indexOf(newListName)
      console.log('indexToDel', indexToDel)
    }
    newListsToShow[indexToAdd] = newListName
    if (typeof indexToDel === 'number') {
      newListsToShow.splice(indexToDel, 1)
    }
    setListsToShow(newListsToShow)
  }

  return (
    <div className='list-view-item' key={listName}>
      {listName === 'empty'
        ? (
        <>
          <h2>{getListName(listName)}</h2>
          <select
            defaultValue=''
            name='todoList'
            className='selected-list'
            onChange={(e) => handleListChange(e)}
          >
            <option disabled={true} key='' value=''></option>
            {Object.keys(todos.lists).map((list) => {
              const id = todos.lists[list].id
              return (
                <option key={id} value={id}>
                  {getListName(id)}
                </option>
              )
            })}
          </select>
        </>
          )
        : (
        <>
          <h2>{getListName(listName)}</h2>
          <select
            defaultValue={listName}
            name='todoList'
            className='selected-list'
            onChange={(e) => handleListChange(e)}
          >
            {Object.keys(todos.lists).map((list) => {
              const id = todos.lists[list].id
              return (
                <option key={id} value={id}>
                  {getListName(id)}
                </option>
              )
            })}
          </select>
          <TodoListComponent
            key={listName}
            listName={listName}
            filters={filters}
          />
        </>
          )}
    </div>
  )
}

export default ListViewComponent
