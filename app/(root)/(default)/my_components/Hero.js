import React from 'react'
import Link from 'next/link';
const Hero = () => {
  return (
    <section className=''>
      <div className='w-fit h-fit mt-32 grid gap-10 mx-auto'>
        <h1 className="text-center font-extrabold text-5xl text-primary">Math Games</h1>
        <Link href="/games" className='bg-primary rounded-md p-2 w-fit mx-auto'>GoToGames</Link>
      </div>
    </section>
  )
}

export default Hero