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

const App = () => {
  const listData = useSelector((state) => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    const list = listData.lists[source.droppableId]
    const newTodoIds = Array.from(list.todoIds)
    newTodoIds.splice(source.index, 1)
    newTodoIds.splice(destination.index, 0, draggableId)
    const newListData = {
      ...listData
    }
    newListData.lists[source.droppableId].todoIds = newTodoIds
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
