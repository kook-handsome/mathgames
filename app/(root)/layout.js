"use client"
import React from 'react'
import {AiOutlinePlayCircle, AiOutlinePauseCircle} from 'react-icons/ai';
import {HiOutlineBellAlert} from 'react-icons/ai';
import {TbAlertHexagonOff} from 'react-icons/tb';
import {howl} from 'howler';
import { useState, useEffect } from 'react';
import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi';
const Layout = ({children}) => {
  const [isMusicPlay, stopMusic] = useState(true);
  useEffect(()=>{
    if(isMusicPlay){
      const sound = new Howl({
        src:['/music.mp3'],
        loop:true,
      })
      sound.play();
      sound.on('end',()=>{

          sound.play();
      });
      return ()=>{sound.stop();}
    }
  },[isMusicPlay]);
  return (
    <>
      <header>
        <nav className="w-full flex items-end">
          <ul className='flex items-end gap-x-5 px-5 py-3'>
            <li onClick={()=>{stopMusic(!isMusicPlay);}}>{isMusicPlay?<BiPauseCircle className='text-secondary' size={30}/>:<BiPlayCircle className='text-secondary' size={30}/>}</li>
            <li className='text-primary-content border-neutral-focus shadow-2xl'>light</li>
          </ul>
        </nav>
      </header>
      <main>
          {children}
      </main>
    </>
  )
}

export default Layout