import './HomeComponent.css'
import TodoListComponent from './TodoListComponent'
import { DragDropContext } from 'react-beautiful-dnd'

const HomeComponent = () => {
  const onDragEnd = () => {
    // Update what happens after drag end (reorder)
  }

  return (
    <div className="todos-today">
      <h1>Tehtävät</h1>
      <DragDropContext onDragEnd={() => onDragEnd}>
        <TodoListComponent />
      </DragDropContext>
    </div>
  )
}

export default HomeComponent