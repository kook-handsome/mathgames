import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Pumpkin from './pumpkin';
const Hero = () => {
  return (
    <section className=''>
      <div className='w-fit h-fit mt-32 grid gap-10 mx-auto'>
        {/* <Image src="/pump.svg" height={300} width={300} alt='image Error' className='mx-auto text-purple-700'/> */}
        <Pumpkin/>
        <h1 className="text-center font-extrabold text-5xl text-primary">Math Games</h1>
        <Link href="/games" className='bg-primary rounded-md p-2 w-fit mx-auto'>GoToGames</Link>
      </div>
    </section>
  )
}

export default Hero