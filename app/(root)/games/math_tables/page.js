"use client";
import React, { useEffect, useState } from 'react';
import Keyboard from './my_components/keyboard';
import { stagger } from 'framer-motion';
import Learn from './my_components/Learn';
import Play from './my_components/Play';
const Page = () => {
  const [screen, setScreen] = useState('menu');
  return (
    <>
      {screen==='menu' ? (
        <section className='h-[100vh] grid justify-center items-center'>
          <div>
            <div className='flex gap-2'>
              <button className='border-[1px] text-3xl font-extrabold border-neutral text-primary rounded-md px-3 py-1' onClick={()=>{setScreen('learn')}}>Learn</button>
              <button className='border-[1px] text-3xl font-extrabold border-neutral text-primary rounded-md px-3 py-1' onClick={()=>{setScreen('play')}}>Play</button>
            </div>
          </div>
        </section>
      ):''}
      {screen==='learn'?<Learn setScreen={setScreen}/>:''}
      {screen==='play'?<Play setScreen={setScreen}/>:''}
    </>
  )
}

export default Page