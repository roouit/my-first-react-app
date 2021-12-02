import './TodoComponent.css'
import moment from 'moment'
import db from './database'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { deleteTodo, editTodo } from '../redux'

const TodoComponent = ({ todo, index, todoId, lists, listName }) => {
  const [isDone, setIsDone] = useState(todo.isDone)
  const [editView, setEditView] = useState(false)
  const [tags, setTags] = useState(todo.tags)
  const dispatch = useDispatch()

  TodoComponent.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    todoId: PropTypes.string.isRequired,
    lists: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired
  }

  const handleUpdateIsDone = async () => {
    await db.updateIsDone(todo.id)
    setIsDone(!isDone)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.todoTags.value === '') {
      dispatch(editTodo(todo, tags, e))
      setEditView(!editView)
    } else {
      e.target.todoTags.value = ''
    }
  }

  const handleAddTag = e => {
    if (e.target.value && e.key === 'Enter') {
      if (!tags.includes(e.target.value)) {
        setTags([
          ...tags,
          e.target.value
        ])
      } else {
        alert('Samanniminen tagi')
      }
    }
  }

  const handleRemoveTag = (e) => {
    const newTags = [...tags].filter(tag => {
      return tag !== e.target.textContent.substring(1)
    })
    setTags(newTags)
  }

  return editView
    ? (
    <li className={isDone ? 'todo done' : 'todo'}>
      <form className='edit-todo-form' onSubmit={(e) => handleSubmit(e)}>
        <label>
          <span>Kuvaus</span>
          <input
            type='text'
            name='todoText'
            className='edit-todo-text'
            defaultValue={todo.text}
          ></input>
        </label>
        <label>
          <span>Määräaika</span>
          <input
            type='datetime-local'
            name='todoDue'
            defaultValue={todo.due}
            min={moment().format('YYYY-MM-DDTHH:mm')}
            className='edit-todo-due'
          ></input>
        </label>
        <label>
          <span>Lista</span>
          <select
            defaultValue={todo.list}
            name='todoList'
            className='edit-todo-list'
          >
            {lists.lists.map((list) => (
              <option key={list.name} value={list.name.toLowerCase()}>
                {list.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Tagit</span>
          <input
            type='tags'
            name='todoTags'
            className='edit-todo-tags'
            placeholder='Lisää tagi..'
            onKeyPress={(e) => handleAddTag(e)}
          ></input>
        </label>
        {tags
          ? tags.map((tag) => {
            return (
                <span key={tag} onClick={(e) => handleRemoveTag(e)}>
                  #{tag}
                </span>
            )
          })
          : ''}
        <span>
          <button className='edit-todo-save-button'>Tallenna</button>
          <button
            className='edit-todo-cancel-button'
            onClick={() => setEditView(!editView)}
          >
            Peruuta
          </button>
        </span>
      </form>
      <img
        className='todo-delete-button'
        src='delete-bin-fill.png'
        alt='poista ikoni'
        onClick={() => dispatch(deleteTodo(todo.id))}
      ></img>
      <img
        className='todo-edit-button'
        src='pencil-fill.png'
        alt='muokkaa ikoni'
        onClick={() => setEditView(!editView)}
      ></img>
    </li>
      )
    : (
    <Draggable draggableId={todoId + listName} index={index}>
      {(provided) => (
        <li
          className={isDone ? 'todo done' : 'todo'}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <label>
            <input
              className='todo-isdone'
              type='checkbox'
              defaultChecked={isDone}
              onChange={() => handleUpdateIsDone()}
            ></input>
            {todo.text}
          </label>
          {todo.due ? <span>{todo.due}</span> : ''}
          {todo.list ? <span>{todo.list}</span> : ''}
          {todo.tags
            ? todo.tags.map((tag) => <span key={tag}>#{tag}</span>)
            : ''}
          <img
            className='todo-delete-button'
            src='delete-bin-fill.png'
            alt='poista ikoni'
            onClick={() => dispatch(deleteTodo(todo.id))}
          ></img>
          <img
            className='todo-edit-button'
            src='pencil-fill.png'
            alt='muokkaa ikoni'
            onClick={() => setEditView(!editView)}
          ></img>
        </li>
      )}
    </Draggable>
      )
}

export default TodoComponent
