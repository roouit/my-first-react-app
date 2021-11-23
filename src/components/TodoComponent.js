import './TodoComponent.css'
import moment from 'moment'
import { updateIsDone } from './database'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import { selectLists } from "../features/listSlice"
import { Draggable } from 'react-beautiful-dnd';

const TodoComponent = ({ todo, deleteTodo, editTodo, index, todoId }) => {
  const lists = useSelector(selectLists)
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
    await updateIsDone(todo.id)
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
          <select defaultValue={editedData.list} name="todoList" className="edit-todo-list">
            {lists.map(list => <option key={list.id.toString()} value={list.name.toLowerCase()}>{list.name}</option>)}
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
    <Draggable draggableId={todoId} index={index}>
      {(provided) => (
        <li className={isDone ? 'todo done' : 'todo'} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        <label>
          <input
            className="todo-isdone"
            type="checkbox"
            defaultChecked={isDone}
            onChange={() => handleUpdateIsDone()}
          ></input>
          {todo.text}
        </label>
        {editedData.due ? <span>{editedData.due}</span> : ''}
        {editedData.list ? <span>{editedData.list}</span> : ''}
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
      )}
    </Draggable>
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
