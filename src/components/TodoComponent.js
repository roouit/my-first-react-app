import './TodoComponent.css'
import moment from 'moment'
import { updateIsDone } from './database'
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { selectLists } from "../features/listSlice"
import { selectTags } from '../features/tagSlice';
import { Draggable } from 'react-beautiful-dnd';

const TodoComponent = ({ todo, deleteTodo, editTodo, index, todoId }) => {
  const lists = useSelector(selectLists)
  const [isDone, setIsDone] = useState(todo.isDone)
  const [editView, setEditView] = useState(false)
  const [tags, setTags] = useState(todo.tags)

  const handleUpdateIsDone = async () => {
    await updateIsDone(todo.id)
    setIsDone(!isDone)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e.screenX)
    if (e.target.todoTags.value) {  
      handleAddTag(e.target.todoTags)
    } else {
      editTodo({
        id: todo.id,
        text: e.target.todoText.value,
        due: e.target.todoDue.value,
        list: e.target.todoList.value,
        isDone: todo.isDone,
        tags: todo.tags
      })
      setEditView(!editView)
    }
    
  }

  const handleAddTag = target => {
    if (target.value) {
      if (!tags.includes(target.value)) {
        setTags([
          ...tags,
          target.value
        ])
        target.value = ''
      } else {
        alert("Samanniminen tagi")
      }
    }
  }

  return editView ? (
    <li className={isDone ? 'todo done' : 'todo'}>
      <form className="edit-todo-form" onSubmit={(e) => handleSubmit(e)}>
        <label>
          <span>Kuvaus</span>
          <input
            type="text"
            name="todoText"
            className="edit-todo-text"
            defaultValue={todo.text}
          ></input>
        </label>
        <label>
          <span>Määräaika</span>
          <input
            type="datetime-local"
            name="todoDue"
            defaultValue={todo.due}
            min={moment().format('YYYY-MM-DDTHH:mm')}
            className="edit-todo-due"
          ></input>
        </label>
        <label>
          <span>Lista</span>
          <select defaultValue={todo.list} name="todoList" className="edit-todo-list">
            {lists.map(list => <option key={list.id.toString()} value={list.name.toLowerCase()}>{list.name}</option>)}
          </select>
        </label>
        <label>
          <span>Tagit</span>
          <input
            type="tags"
            name="todoTags"
            className="edit-todo-tags"
            placeholder="Lisää tagi.."
            onBlur={(e) => handleAddTag(e.target)}
            // onKeyPress={(e) => handleAddTag(e)}
          ></input>
        </label>
        {tags ? tags.map(tag => {
          return <span key={tag}>#{tag}</span>
        }) : ''}
        
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
        {todo.due ? <span>{todo.due}</span> : ''}
        {todo.list ? <span>{todo.list}</span> : ''}
        {todo.tags ? todo.tags.map(tag => <span key={tag}>#{tag}</span>) : ''}
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

export default TodoComponent
