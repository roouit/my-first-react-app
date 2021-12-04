import React, { useState } from 'react'
import PropTypes from 'prop-types'

function ListItemComponent ({ list, handleRemoveList, handleEditList }) {
  const [editView, setEditView] = useState(false)

  ListItemComponent.propTypes = {
    list: PropTypes.object.isRequired,
    handleRemoveList: PropTypes.func.isRequired,
    handleEditList: PropTypes.func.isRequired
  }

  return editView
    ? (
    <li>
      <form onSubmit={(e) => {
        handleEditList(e, list.name)
        setEditView(!editView)
      }}>
        <input
          type='text'
          className='edit-list-text-input'
          name='newListName'
          defaultValue={list.name}
        ></input>
      </form>
      <img
        className='edit-list-button'
        src='pencil-fill.png'
        alt='muokkaa ikoni'
        onClick={() => setEditView(!editView)}
      ></img>
    </li>
      )
    : (
    <li>
      <span>{list.name}</span>
      <img
        className='edit-list-button'
        src='pencil-fill.png'
        alt='muokkaa ikoni'
        onClick={() => setEditView(!editView)}
      ></img>
      <img
        className='delete-list-button'
        src='delete-bin-fill.png'
        alt='poista lista'
        onClick={() => handleRemoveList(list.name)}
      ></img>
    </li>
      )
}

export default ListItemComponent
