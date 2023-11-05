import React from 'react'

const Keyboard = ({updateInput}) => {
  return (
    <div className='grid grid-cols-3 w-full p-1 h-full gap-2'>
        <span onClick={()=>{updateInput(1)}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>1</span>
        <span onClick={()=>{updateInput(2)}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>2</span>
        <span onClick={()=>{updateInput(3)}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>3</span>
        <span onClick={()=>{updateInput(4)}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>4</span>
        <span onClick={()=>{updateInput(5)}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>5</span>
        <span onClick={()=>{updateInput(6)}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>6</span>
        <span onClick={()=>{updateInput(7)}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>7</span>
        <span onClick={()=>{updateInput(8)}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>8</span>
        <span onClick={()=>{updateInput(9)}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>9</span>
        <span onClick={()=>{updateInput(0)}} className='bg-primary h-full cursor-pointer col-span-2 text-center rounded-md flex items-center justify-center font-bold'>0</span>
        <span onClick={()=>{updateInput('x')}} className='h-full rounded-md flex items-center justify-center font-bold bg-primary text-center cursor-pointer'>x</span>
    </div>
  )
}

export default Keyboard