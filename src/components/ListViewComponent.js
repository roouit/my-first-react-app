import React from 'react'
import { connect } from 'react-redux'
import { addList } from '../redux'
import PropTypes from 'prop-types'

function ListViewComponent (props) {
  ListViewComponent.propTypes = {
    lists: PropTypes.array.isRequired,
    addList: PropTypes.func.isRequired
  }

  const handleAddList = e => {
    e.preventDefault()
    const newListName = e.target.newListText.value
    if (!props.lists.map(item => item.name).includes(newListName)) {
      props.addList(newListName)
      e.target.newListText.value = ''
    } else {
      alert('Kyseinen lista on jo olemassa!')
    }
  }

  return (
    <div className='list-view-wrapper'>
      <h1>Listat</h1>
      {props.lists.map((list) => (
        <span key={list.name}>{list.name}</span>
      ))}
      <form onSubmit={(e) => handleAddList(e)}>
        <input type='text' name='newListText'></input>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addList: (data) => dispatch(addList(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListViewComponent)
