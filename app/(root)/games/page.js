import React from 'react';
import AppCard from './my_components/AppCard';
const Page = () => {
  return (
    <section className='min-h-screen'>
        <div>
            <div className=''>
                <h1 className='mt-12 text-center font-bold text-primary'>Games | Developed by LoveCode's Developer</h1>
                <div className='mt-8 p-5'>
                    <AppCard appName="Calculator" appDescription="here you can Learn and Practice Math Tables, Limits upto You" appPath="/games/math_tables/"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Page