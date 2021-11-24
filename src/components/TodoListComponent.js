import TodoComponent from './TodoComponent'
import './TodoListComponent.css'
import React from 'react'
import PropTypes from 'prop-types'
// import { useSelector } from 'react-redux'
// import { selectLists } from '../features/listSlice'
import { Droppable } from 'react-beautiful-dnd'

const TodoListComponent = ({ data, deleteTodo, editTodo }) => {
  // const lists = useSelector(selectLists)

  TodoListComponent.propTypes = {
    data: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
  }

  return (
    <div className="todo-wrapper">
      <Droppable droppableId="tehtävät">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className="todo-list">
            {data.lists['tehtävät'].todoIds.map((todoId, index) => {
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
