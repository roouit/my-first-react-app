import React from 'react'
import toast from 'react-hot-toast'

function AlarmToast (todo) {
  const alarm = new Date(todo.due)
  return toast(
    (t) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span>
          <b>{`Hälytys (${alarm.getHours()}:${alarm.getMinutes()}): `}</b>
          <i>{todo.text}</i>
        </span>
        <img
          className='dismiss-notification-button'
          src='close-line.png'
          alt='sulje'
          style={{
            marginLeft: '10px',
            width: '16px',
            height: '16px',
            cursor: 'pointer'
          }}
          onClick={() => toast.dismiss(t.id)}
        ></img>
      </div>
    ),
    {
      duration: Infinity,
      position: 'top-center',
      // Styling
      style: {
        border: '2px solid yellow'
      },
      icon: '⏰'
    }
  )
}

export default AlarmToast
