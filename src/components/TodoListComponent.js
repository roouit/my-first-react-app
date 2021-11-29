import TodoComponent from './TodoComponent'
import './TodoListComponent.css'
import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'

const TodoListComponent = ({ data, listName, filters, editTodo }) => {
  TodoListComponent.propTypes = {
    data: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired,
    editTodo: PropTypes.func.isRequired
  }

  const getFilteredTodos = () => {
    const filteredTodoIds = []
    const tagFilters = filters
      .filter(item => item.startsWith('#'))
      .map(tag => tag.substring(1))
    const textFilters = filters.filter((item) => !item.startsWith('#'))
    if (filters.length !== 0) {
      data.lists['tehtävät'].todoIds.forEach((todoId) => {
        const tags = data.todos[todoId].tags
        const text = data.todos[todoId].text
        if (tags.some((tag) => tagFilters.includes(tag))) {
          filteredTodoIds.push(todoId)
        } else if (textFilters.some((filter) => text.toLowerCase().includes(filter.toLowerCase()))) {
          filteredTodoIds.push(todoId)
        }
      })
    } else {
      return data.lists['tehtävät'].todoIds
    }
    return filteredTodoIds
  }

  return (
    <div className='todo-wrapper'>
      <Droppable droppableId='tehtävät'>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='todo-list'
          >
            {getFilteredTodos().map((todoId, index) => {
              return (
                  <TodoComponent
                    key={todoId}
                    index={index}
                    todoId={todoId}
                    todo={data.todos[todoId]}
                    editTodo={editTodo}
                  />
              )
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}

export default TodoListComponent
