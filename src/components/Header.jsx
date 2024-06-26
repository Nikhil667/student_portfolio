import React from 'react'
import home from "/icons/House.svg"
import menu from "/icons/List.svg"
import { Link } from 'react-router-dom'

export default function Header({ title, bgColor, textColor }) {
  return (
    <header className={`header-container flex justify-between p-6 text-center ${bgColor}`}>
    <Link to="/">
                <img
                  src={menu}
                  alt="menu-button"
                />
              </Link>
    <h2 className={`logo font-bold text-xl ${textColor}`}>{title}</h2>
    <Link to="/">
                <img
                  src={home}
                  alt="home-button"
                />
              </Link>
  </header>
  )
}
