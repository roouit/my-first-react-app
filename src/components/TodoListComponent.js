import TodoComponent from './TodoComponent'
import './TodoListComponent.css'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'

const TodoListComponent = ({ listName, filters }) => {
  const lists = useSelector(state => state.list)
  const todos = useSelector(state => state.todo)

  TodoListComponent.propTypes = {
    listName: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired
  }

  const getFilteredTodos = () => {
    const filteredTodoIds = []
    const tagFilters = filters
      .filter(item => item.startsWith('#'))
      .map(tag => tag.substring(1))
    const textFilters = filters.filter((item) => !item.startsWith('#'))
    if (filters.length !== 0) {
      todos.lists[listName].todoIds.forEach((todoId) => {
        const tags = todos.todos[todoId].tags
        const text = todos.todos[todoId].text
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
      return todos.lists[listName].todoIds
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
                        todo={todos.todos[todoId]}
                        lists={lists}
                        listName={listName}
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
