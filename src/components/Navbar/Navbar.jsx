import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (

    <div className='navbar'>
      <ul className='logo'>CryptoVerse</ul>
      <div className="nav-right">
        <select>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div>
    </div>
  )
}

export default Navbar
