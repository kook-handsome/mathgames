"use client";
import React, { useEffect, useState } from 'react';
import Keyboard from './my_components/keyboard';
import Learn from './my_components/Learn';
import LevelFirst from './my_components/LevelFirst';
import Play from './my_components/Play';
const Page = () => {
  const [screen, setScreen] = useState('menu');
  
  return (
    <>
      {screen==='menu' ? (
        <section className='min-h-screen flex justify-center'>
          <div>
            <div className='md:flex grid gap-2 mt-16 w-fit'>
              <button className='border-[1px] w-32 h-16 font-extrabold border-neutral text-primary rounded-md px-3 py-1' onClick={()=>{setScreen('learn')}}>Learn</button>
              <button className='border-[1px] w-32 h-16 font-extrabold border-neutral text-primary rounded-md px-3 py-1' onClick={()=>{setScreen('play')}}>Play</button>
              <button className='border-[1px] w-32 h-16 font-extrabold border-neutral text-primary rounded-md px-3 py-1' onClick={()=>{setScreen('altered')}}>Level-1</button>
            </div>
          </div>
        </section>
      ):''}
      {screen==='learn'?<Learn setScreen={setScreen}/>:''}
      {screen==='play'?<Play setScreen={setScreen}/>:''}
      {screen==='altered'?<LevelFirst setScreen={setScreen}/>:''}
    </>
  )
}

export default Page