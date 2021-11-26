import React from 'react'
import './App.css'
import NavComponent from './components/NavComponent'
import { Routes, Route } from 'react-router-dom'
import HomeComponent from './components/HomeComponent'
import InfoComponent from './components/InfoComponent'
import ListViewComponent from './components/ListViewComponent'
import { Provider } from 'react-redux'
import store from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
