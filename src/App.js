import React, { useEffect } from 'react'
import './App.css'
import NavComponent from './components/NavComponent'
import HomeComponent from './components/HomeComponent'
import InfoComponent from './components/InfoComponent'
import ListViewComponent from './components/ListViewComponent'
import { Routes, Route } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, updateTodo } from './redux'
import db from './components/database'

const App = () => {
  const listData = useSelector((state) => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    if (destination === null) return
    const newListData = {
      ...listData
    }

    const sourceTodoIds = [...listData.lists[source.droppableId].todoIds]
    sourceTodoIds.splice(source.index, 1)
    if (source.droppableId === destination.droppableId) {
      sourceTodoIds.splice(destination.index, 0, draggableId)
    } else {
      const destinationTodoIds = [...listData.lists[destination.droppableId].todoIds]
      destinationTodoIds.splice(destination.index, 0, draggableId)
      newListData.lists[destination.droppableId].todoIds = destinationTodoIds
      newListData.todos[draggableId].list = destination.droppableId
      await db.updateTodo({
        ...newListData.todos[draggableId]
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
          <Routes>
            <Route path='/' element={<HomeComponent />} />
            <Route path='/listat' element={<ListViewComponent />} />
            <Route path='/tietoa' element={<InfoComponent />} />
          </Routes>
        </div>
      </div>
    </DragDropContext>
  )
}

export default App
