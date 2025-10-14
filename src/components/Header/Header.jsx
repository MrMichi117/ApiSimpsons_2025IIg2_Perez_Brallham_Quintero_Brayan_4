import React from 'react'
import './Header.css'
import homero from '../../assets/homero.png'
const Header = () => {
  return (
    <header>

<img src={homero} alt="" />

        <h1>Simpsons APIs</h1>
        <h2>Api desarrollada en base a la API de Los Simpsons</h2>

    </header>
  )
}

export default Header
