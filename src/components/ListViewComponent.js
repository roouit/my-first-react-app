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

  const getListName = () => {
    if (listName === 'all') return 'Kaikki'
    return todos.lists[listName].id
  }

  const handleListChange = (e) => {
    const newListsToShow = [...listsToShow]
    const indexToAdd = newListsToShow.indexOf(listName)
    let indexToDel = null
    if (newListsToShow.includes(e.target.value.toLowerCase())) {
      indexToDel = newListsToShow.indexOf(e.target.value.toLowerCase())
    }
    newListsToShow[indexToAdd] = e.target.value.toLowerCase()
    newListsToShow.splice(indexToDel, 1)
    setListsToShow(newListsToShow)
  }

  return (
    <div className='list-view-item' key={listName}>
      <h2>{getListName()}</h2>
      <select
        defaultValue={getListName()}
        name='todoList'
        className='selected-list'
        onChange={e => handleListChange(e)}
      >
        {Object.keys(todos.lists).map((list) => {
          const id = todos.lists[list].id
          return <option key={id} value={id}>{id}</option>
        })}
      </select>
      <TodoListComponent key={listName} listName={listName} filters={filters} />
    </div>
  )
}

export default ListViewComponent
