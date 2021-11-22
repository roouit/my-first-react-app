import './TodoComponent.css'
import moment from 'moment'
import { updateIsDoneDb } from './database'
import React, { useState, useEffect, useRef } from 'react'

const TodoComponent = ({ todo, deleteTodo, editTodo }) => {
  const [editedData, setEditedData] = useState(todo)
  const [isDone, setIsDone] = useState(todo.isDone)
  const [editView, setEditView] = useState(false)
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      editTodo(editedData)
    } else {
      isMounted.current = true
    }
  }, [editedData, editTodo])

  const handleUpdateIsDone = async () => {
    await updateIsDoneDb(todo.id)
    setIsDone(!isDone)
  }

  const handleEditTodo = e => {
    e.preventDefault()
    setEditedData({
      id: editedData.id,
      text: e.target.todoText.value,
      due: e.target.todoDue.value,
      list: e.target.todoList.value,
      isDone: editedData.isDone,
    })
    // setTimeout(() => {
    //   setEditView(!editView)
    // }, 500);
    setEditView(!editView)
  }

  return editView ? (
    <li className={isDone ? 'todo done' : 'todo'}>
      <form className="edit-todo-form" onSubmit={(e) => handleEditTodo(e)}>
        <label>
          <span>Kuvaus</span>
          <input
            type="text"
            name="todoText"
            className="edit-todo-text"
            defaultValue={editedData.text}
          ></input>
        </label>
        <label>
          <span>Määräaika</span>
          <input
            type="datetime-local"
            name="todoDue"
            defaultValue={editedData.due}
            min={moment().format('YYYY-MM-DDTHH:mm')}
            className="edit-todo-due"
          ></input>
        </label>
        <label>
          <span>Lista</span>
          <select defaultValue="työ" name="todoList" className="edit-todo-list">
            <option value="opiskelu">Opiskelu</option>
            <option value="työ">Työ</option>
          </select>
        </label>
        <span>
          <button className="edit-todo-save-button">Tallenna</button>
          <button
            className="edit-todo-cancel-button"
            onClick={() => setEditView(!editView)}
          >
            Peruuta
          </button>
        </span>
      </form>
      <img
        className="todo-delete-button"
        src="delete-bin-fill.png"
        alt="poista ikoni"
        onClick={() => deleteTodo(todo.id)}
      ></img>
      <img
        className="todo-edit-button"
        src="pencil-fill.png"
        alt="muokkaa ikoni"
        onClick={() => setEditView(!editView)}
      ></img>
    </li>
  ) : (
    <li className={isDone ? 'todo done' : 'todo'}>
      <input
        className="todo-isdone"
        type="checkbox"
        defaultChecked={isDone}
        onChange={() => handleUpdateIsDone()}
      ></input>
      <span>{todo.text}</span>
      <img
        className="todo-delete-button"
        src="delete-bin-fill.png"
        alt="poista ikoni"
        onClick={() => deleteTodo(todo.id)}
      ></img>
      <img
        className="todo-edit-button"
        src="pencil-fill.png"
        alt="muokkaa ikoni"
        onClick={() => setEditView(!editView)}
      ></img>
    </li>
  )
}
// , (prevProps, nextProps) => {

//   for (const prop in prevProps.todo) {
//     if (prevProps.todo[prop] !== nextProps.todo[prop]) {
//       return false
//     }
//   }
//   return true
// })

export default TodoComponent
