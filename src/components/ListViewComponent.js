import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoListComponent from './TodoListComponent'
import { updateListsToShow } from '../redux'
import PropTypes from 'prop-types'

function ListViewComponent ({ listName, filters, listsToShow, setUpdate }) {
  const todos = useSelector((state) => state.todo)
  const dispatch = useDispatch()

  ListViewComponent.propTypes = {
    listName: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired,
    listsToShow: PropTypes.array.isRequired,
    setUpdate: PropTypes.func.isRequired
  }

  const getListName = (listId) => {
    if (listId === 'all') return 'Kaikki'
    if (listId === 'empty') return '-'
    return listId
  }

  const handleListChange = (e) => {
    console.log(e)
    const newListName = e.target.value
    const newListsToShow = [...listsToShow]
    const indexToAdd = newListsToShow.indexOf(listName)
    let indexToDel = null
    if (newListsToShow.includes(newListName)) {
      indexToDel = newListsToShow.indexOf(newListName)
    }
    newListsToShow[indexToAdd] = newListName
    if (typeof indexToDel === 'number') {
      newListsToShow[indexToDel] = 'empty'
    }
    dispatch(updateListsToShow(newListsToShow))
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
            setUpdate={setUpdate}
          />
        </>
          )}
    </div>
  )
}

export default ListViewComponent
