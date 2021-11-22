import TodoComponent from "./TodoComponent"
import "./TodoListComponent.css"
import {useState, useEffect, useCallback} from 'react'
import db from "./database"
import moment from "moment"

const TodoListComponent = () => {
  const [todoItems, setTodoItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [addTodoView, setAddTodoView] = useState(false)

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
      due: e.target.todoDue.value,
      list: e.target.todoList.value,
      isDone: false,
    }
    let newTodo = await db.addTodo(newTodoData)
    setTodoItems([...todoItems, newTodo])
    setAddTodoView(!addTodoView)
  }

  const deleteTodo = async (id) => {
    let newTodoItems = todoItems.filter(todo => {
      return todo.id !== id
    })
    setTodoItems(newTodoItems)
    await db.deleteTodo(id)
  }

  const editTodo = useCallback(
    async (todo) => {
      await db.updateTodo(todo)
      let newTodos = await db.getAllTodos()
      setTodoItems(newTodos)
    },
    [setTodoItems]
  )

  return (
    <div className="todo-wrapper">
      <ul className="todo-list">
        {!isLoaded
          ? 'Ladataan tehtäviä..'
          : todoItems.map((todo) => {
              return (
                <TodoComponent
                  key={todo.id.toString()}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              )
            })}
      </ul>
      {!addTodoView ? (
        <button
          className="add-todo-button"
          onClick={() => setAddTodoView(!addTodoView)}
        >
          Lisää
        </button>
      ) : (
        <form className="add-todo-form" onSubmit={(e) => handleAddTodo(e)}>
          <label>
            <span>Kuvaus</span>
            <input
              type="text"
              name="todoText"
              className="add-todo-text"
              placeholder="Anna tehtävälle kuvaus.."
            ></input>
          </label>
          <label>
            <span>Määräaika</span>
            <input
              type="datetime-local"
              name="todoDue"
              defaultValue={moment().format('YYYY-MM-DDTHH:mm')}
              min={moment().format('YYYY-MM-DDTHH:mm')}
              className="add-todo-due"
            ></input>
          </label>
          <label>
            <span>Lista</span>
            <select
              defaultValue="työ"
              name="todoList"
              className="add-todo-list"
            >
              <option value="opiskelu">Opiskelu</option>
              <option value="työ">Työ</option>
              <option value="muu">Muu</option>
            </select>
          </label>
          <span>
            <button className="add-todo-save-button">Tallenna</button>
            <button
              className="add-todo-cancel-button"
              onClick={() => setAddTodoView(!addTodoView)}
            >
              Peruuta
            </button>
          </span>
        </form>
      )}
    </div>
  )
}

export default TodoListComponent