export const checkAlarms = (todos) => {
  const current = new Date()
  Object.keys(todos).forEach(todoId => {
    if (todos[todoId].due) {
      const alarm = new Date(todos[todoId].due)
      if (+(current.getMinutes()) >= alarm.getMinutes() &&
         +(current.getHours()) >= alarm.getHours() &&
         +(current.getDate()) >= alarm.getDate() &&
         +(current.getMonth()) >= alarm.getMonth() &&
         +(current.getFullYear()) >= alarm.getFullYear()) {
        console.log('yli')
        console.log('due', alarm)
        console.log('now', current)
      }
    }
  })
}
