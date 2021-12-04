import React, { useEffect } from 'react'
import './App.css'
import NavComponent from './components/NavComponent'
import HomePageComponent from './components/HomePageComponent'
import InfoPageComponent from './components/InfoPageComponent'
import ListViewPageComponent from './components/ListViewPageComponent'
import { Routes, Route } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLists, fetchTodos, updateTodo } from './redux'
import db from './components/database'

const App = () => {
  const listData = useSelector((state) => state.todo)
  const lists = useSelector((state) => state.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
    dispatch(fetchLists())
  }, [])

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    const dragIdTodo = draggableId.match(/todo-[0-9]+/)[0]

    // Dragging conditions with no action
    if (destination === null) return
    if (listData.lists[destination.droppableId].todoIds.includes(dragIdTodo)) {
      if (source.droppableId === 'all' && destination.droppableId !== 'all') return
      if (source.droppableId !== 'all' && destination.droppableId === 'all') return
    }

    const newListData = {
      ...listData
    }
    const sourceTodoIds = [...listData.lists[source.droppableId].todoIds]
    const destinationTodoIds = [
      ...listData.lists[destination.droppableId].todoIds
    ]

    if (source.droppableId === destination.droppableId) {
      sourceTodoIds.splice(source.index, 1)
      sourceTodoIds.splice(destination.index, 0, dragIdTodo)
    } else {
      if (source.droppableId === 'all') {
        destinationTodoIds.splice(destination.index, 0, dragIdTodo)
        // find list where this todo was previously
        // const oldList = listData.todos[dragIdTodo].list
        const oldListIndex =
          newListData.lists.all.todoIds.indexOf(dragIdTodo)
        // remove it from that list + set new list value
        newListData.lists.all.todoIds.splice(oldListIndex, 1)
        // update to database
      } else {
        sourceTodoIds.splice(source.index, 1)
        destinationTodoIds.splice(destination.index, 0, dragIdTodo)
      }
      newListData.lists[destination.droppableId].todoIds = destinationTodoIds // set destination to state
      newListData.todos[dragIdTodo].list = destination.droppableId // set new list value
      await db.updateTodo({
        ...newListData.todos[dragIdTodo]
      })
    }
    newListData.lists[source.droppableId].todoIds = sourceTodoIds
    dispatch(updateTodo(newListData))
  }

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <div className='App'>
        <NavComponent />
        <div className='content'>
          {!listData.loading && !lists.loading
            ? <Routes>
                <Route path='/' element={<HomePageComponent />} />
                <Route path='/listat' element={<ListViewPageComponent />} />
                <Route path='/tietoa' element={<InfoPageComponent />} />
              </Routes>
            : null}

        </div>
      </div>
    </DragDropContext>
  )
}

export default App
