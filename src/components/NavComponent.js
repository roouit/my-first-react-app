import React from 'react'
import './NavComponent.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavComponent = () => {
  const lists = useSelector(state => state.list)
  return (
    <div className="navigation">
      <Link to="/">
        <img className="logo" src="logo.png" alt="logo"></img>
      </Link>
      <div className="link-element">
        <img className="link-icon" src="home-smile-line.png" alt="koti ikoni"></img>
        <Link className="nav-link" to="/">
          Aloitus
        </Link>
      </div>
      <div className="link-element">
        <img className="link-icon" src="list-check.png" alt="lista ikoni"></img>
        <Link className="nav-link" to="/listat">
          Listat
        </Link>
      </div>
      {!lists.loading
        ? lists.lists.map(list => <Link key={list.name} className="list-link" to={`/listat/${list.name.toLowerCase()}`}>{list.name}</Link>)
        : ''}
      <div className="link-element">
        <img
          className="link-icon"
          src="information-line.png"
          alt="informaatio ikoni"
        ></img>
        <Link className="nav-link" to="/tietoa">
          Tietoa
        </Link>
      </div>
    </div>
  )
}

export default NavComponent
