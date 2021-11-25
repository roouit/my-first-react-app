import TodoComponent from './TodoComponent'
import './TodoListComponent.css'
import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'

const TodoListComponent = ({ data, listName, filters, deleteTodo, editTodo }) => {
  TodoListComponent.propTypes = {
    data: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
  }

  const getFilteredTodos = () => {
    const tagFilters = filters
      .filter(item => item.startsWith('#'))
      .map(tag => tag.substring(1))
    // const textFilters = filters.filter((item) => !item.startsWith('#'))
    const filteredTodoIds = tagFilters.length !== 0
      ? data.lists['tehtävät'].todoIds.filter((todoId) => {
        return data.todos[todoId].tags.some((tag) => tagFilters.includes(tag))
      })
      : data.lists['tehtävät'].todoIds
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
                    deleteTodo={deleteTodo}
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
