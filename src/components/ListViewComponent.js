import React from 'react'
import { useSelector } from 'react-redux'
import TodoListComponent from './TodoListComponent'
import PropTypes from 'prop-types'

function ListViewComponent ({ listName, filters }) {
  const todos = useSelector((state) => state.todo)
  console.log(todos.lists[listName])

  ListViewComponent.propTypes = {
    listName: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired
  }

  const getListName = () => {
    if (listName === 'all') return 'Kaikki'
    return todos.lists[listName].id
  }

  return (
    <div className='list-view-item' key={listName}>
      <h2>{getListName()}</h2>
      <TodoListComponent key={listName} listName={listName} filters={filters} />
    </div>
  )
}

export default ListViewComponent
