import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import listContext from './listContext'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <listContext.Provider value={["Opiskelu", "Työ"]}>
        <App />
      </listContext.Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
)
