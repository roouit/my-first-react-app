import TodoComponent from './TodoComponent'
import './TodoListComponent.css'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import { fetchLists } from '../redux'

const TodoListComponent = ({ data, listName, filters }) => {
  const lists = useSelector((state) => state.list)
  const dispatch = useDispatch()

  TodoListComponent.propTypes = {
    data: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired
  }

  useEffect(() => {
    dispatch(fetchLists())
  }, [])

  const getFilteredTodos = () => {
    const filteredTodoIds = []
    const tagFilters = filters
      .filter(item => item.startsWith('#'))
      .map(tag => tag.substring(1))
    const textFilters = filters.filter((item) => !item.startsWith('#'))
    if (filters.length !== 0) {
      data.lists[listName].todoIds.forEach((todoId) => {
        const tags = data.todos[todoId].tags
        const text = data.todos[todoId].text
        if (tags.some((tag) => tagFilters.includes(tag))) {
          filteredTodoIds.push(todoId)
        } else if (
          textFilters.some((filter) =>
            text.toLowerCase().includes(filter.toLowerCase())
          )
        ) {
          filteredTodoIds.push(todoId)
        }
      })
    } else {
      return data.lists[listName].todoIds
    }
    return filteredTodoIds
  }

  return (
    <div className='todo-wrapper'>
      <Droppable droppableId={listName}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='todo-list'
          >
            {lists.loading
              ? (<div>Lataa listoja...</div>)
              : (
                  getFilteredTodos().map((todoId, index) => {
                    return (
                  <TodoComponent
                    key={todoId}
                    index={index}
                    todoId={todoId}
                    todo={data.todos[todoId]}
                    lists={lists}
                  />
                    )
                  }))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}

export default TodoListComponent
