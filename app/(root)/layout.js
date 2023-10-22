"use client"
import React from 'react'
import {BiMoon, BiAlarm, BiAbacus, BiAlbum} from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi';
const themes=[
  {themeName:"light",themeIcon:<BiMoon size={30} className='text-secondary'/>},
  {themeName:"night",themeIcon:<BiAlarm size={30} className='text-secondary'/>},
  {themeName:"dark",themeIcon:<BiAbacus size={30} className='text-secondary'/>},
  {themeName:"forest",themeIcon:<BiMoon size={30} className='text-secondary'/>},
  {themeName:"valentine",themeIcon:<BiMoon size={30} className='text-secondary'/>}
]
const Layout = ({children}) => {
  const [theme, setTheme] = useState("light");

  return (
    <div data-theme={theme}>
      <header>
        <nav className="w-full flex items-end justify-end">
          <ul className='flex items-end gap-x-5 px-5 py-3'>
          <li className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">Themes</label>
            <ul tabIndex={0} className="dropdown-content z-[1] p-5 grid gap-2 shadow-2xl bg-base-100 rounded-box w-52">
              {themes.map((element)=>(
                <li className='flex items-center gap-x-4 text-secondary font-bold active:bg-neutral-focus p-3 rounded-md' onClick={()=>{setTheme(element.themeName)}}>
                    {element.themeIcon}
                    <span>{element.themeName}</span>
                </li>
              ))}
            </ul>
          </li>
          </ul>
        </nav>
      </header>
      <main>
          {children}
      </main>
    </div>
  )
}

export default Layout;