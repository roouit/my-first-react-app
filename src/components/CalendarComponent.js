import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useSelector } from 'react-redux'

function CalendarComponent () {
  const todos = useSelector((state) => state.todo.todos)

  const getEvents = () => {
    const events = []
    Object.keys(todos).forEach(todoId => {
      const todo = todos[todoId]
      console.log(todo)
      if (todo.due) {
        events.push({
          title: todo.text,
          start: todo.due
        })
      }
    })
    console.log(events)
    return events
  }

  return (
    <div className='calendar'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        // height={400}
        headerToolbar={{
          left: 'today',
          right: 'prev,next'
        }}
        views={{
          threeDayView: {
            type: 'dayGrid',
            duration: { days: 3 }
          }
        }}
        initialView='threeDayView'
        events={getEvents()}
      />
    </div>
  )
}

export default CalendarComponent
