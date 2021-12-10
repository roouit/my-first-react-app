import { useDispatch } from 'react-redux'
import { updateNotified } from '../redux'
import moment from 'moment'
import AlarmToast from './alarm-toast'

function useCheckAlarms (todos) {
  const dispatch = useDispatch()
  const newTodos = {
    ...todos
  }
  return () => {
    const current = new Date()
    let toUpdate = []
    Object.keys(newTodos.todos).forEach((todoId) => {
      if (newTodos.todos[todoId].due) {
        const alarm = new Date(newTodos.todos[todoId].due)
        if (
          moment(current).valueOf() - moment(alarm).valueOf() > 0 &&
          !newTodos.todos[todoId].notified
        ) {
          toUpdate.push(todoId)
        }
      }
    })
    if (toUpdate.length > 0) {
      toUpdate.forEach(todoId => {
        newTodos.todos[todoId].notified = true
        dispatch(updateNotified(newTodos, newTodos.todos[todoId]))
        AlarmToast(newTodos.todos[todoId])
      })
      toUpdate = []
    }
  }
}

export default useCheckAlarms
