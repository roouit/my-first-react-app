import TodoComponent from "./TodoComponent"
import "./TodoListComponent.css"
import {useState, useEffect} from 'react'
import db from "./database"
import { useSelector } from "react-redux";
import { selectLists } from "../features/listSlice"
import { Droppable } from "react-beautiful-dnd"

const TodoListComponent = ({data, addTodo, deleteTodo, editTodo}) => {
  const lists = useSelector(selectLists)
  const [todoItems, setTodoItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function f() {
      let todos = await db.getAllTodos()
      setTodoItems(todos)
      setIsLoaded(true)
    }
    f()
  }, [])

  const handleAddTodo = async (e) => {
    e.preventDefault()
    const newTodoData = {
      text: e.target.todoText.value,
      due: null,
      list: null,
      isDone: false,
    }
    let newTodo = await db.addTodo(newTodoData)
    addTodo(newTodo)
  }

  return (
    <div className="todo-wrapper">
      <form className="add-todo-form" onSubmit={(e) => handleAddTodo(e)}>
            <input
              type="text"
              name="todoText"
              className="add-todo-text"
              placeholder="Lisää uusi tehtävä.."
            ></input>
          <span>
            <button className="add-todo-save-button">Tallenna</button>
          </span>
        </form>
      <Droppable droppableId="tehtävät">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className="todo-list">
            {!isLoaded
              ? 'Ladataan tehtäviä..'
              : data.lists['tehtävät'].todoIds.map((todoId, index) => {
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
              })
            }
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}

export default TodoListComponent