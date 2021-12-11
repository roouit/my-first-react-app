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
      if (todo.due) {
        events.push({
          title: todo.text,
          start: todo.due
        })
      }
    })
    return events
  }

  return (
    <div className='calendar'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        height={200}
        headerToolbar={{
          left: 'today',
          right: 'prev,next'
        }}
        views={{
          twoDayView: {
            type: 'dayGrid',
            duration: { days: 2 }
          }
        }}
        initialView='twoDayView'
        events={getEvents()}
      />
    </div>
  )
}

export default CalendarComponent
