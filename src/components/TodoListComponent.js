import TodoComponent from "./TodoComponent"
import "./TodoListComponent.css"
import {useState, useEffect, useCallback} from 'react'
import db from "./database"
import moment from "moment"
import { useSelector } from "react-redux";
import { selectLists } from "../features/listSlice"
import { Droppable } from "react-beautiful-dnd"

const TodoListComponent = ({data, addToListData}) => {
  const lists = useSelector(selectLists)
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
      due: null,
      list: null,
      isDone: false,
    }
    let newTodo = await db.addTodo(newTodoData)
    addToListData(newTodo)
    // setTodoItems([...todoItems, newTodo])
    // setAddTodoView(!addTodoView)
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
              
              // todoItems.map((todo, index) => {
              //     return (
              //       <TodoComponent
              //         key={todo.id.toString()}
              //         todo={todo}
              //         deleteTodo={deleteTodo}
              //         editTodo={editTodo}
              //         index={index}
              //       />
              //     )
              //   })
            }
            {provided.placeholder}
          </ul>
        )}
      
      </Droppable>
      {/* {!addTodoView ? (
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
              {lists.map(list => <option key={list.id.toString()} value={list.name.toLowerCase()}>{list.name}</option>)}
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
      )} */}
    </div>
  )
}

export default TodoListComponent