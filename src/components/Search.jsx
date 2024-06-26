import React from 'react'
import search from "/icons/MagnifyingGlass.svg"

export default function Search() {
  return (
    <div className="search-container relative flex items-center">
      <img src={search} className='absolute bg-teal-900 p-4 rounded-full'/>
      <input type="text" className="search w-full border-2 border-gray-300 rounded-full py-4 pl-16 pr-4" />
    </div>
  )
}
