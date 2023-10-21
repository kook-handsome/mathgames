import React from 'react'
import Link from 'next/link'
const AppCard = (props) => {
  return (
    <div className='p-5 shadow-2xl w-full grid gap-3'>
      <h1 className='text-2xl font-bold text-secondary'>{props.appName}</h1>
      <p className='text-sm text-primary-content'>{props.appDescription}</p>
      <div className='grid justify-end'>
        <Link href={props.appPath} className='border-[1px] border-neutral rounded-md px-4 py-1 text-secondary'>Use</Link>
      </div>
    </div>
  )
}

export default AppCard