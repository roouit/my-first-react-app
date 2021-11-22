import './HomeComponent.css'
import TodoListComponent from './TodoListComponent'

const HomeComponent = () => {
  return (
    <div className="todos-today">
      <h1>Tänään</h1>
      <TodoListComponent />
    </div>
  )
}

export default HomeComponent