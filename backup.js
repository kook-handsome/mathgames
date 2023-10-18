"use client";
import React, { useEffect, useState } from 'react'
import Keyboard from './my_components/Keyboard';
import { stagger } from 'framer-motion';
import {BiArrowBack} from 'react-icons/bi';
import {HiPause} from 'react-icons/hi';
import {RxResume} from 'react-icons/rx'; 
import {FiSettings} from 'react-icons/fi';
import {BsMenuButtonWide} from 'react-icons/bs';
const Page = () => {

  
  const [screen, setScreen] = useState('menu');
  const [input, writeInput] = useState('23');

  const [isGameStop, stopGame] = useState(true);

  const [score, updateScore] = useState(0);
  const [isGameOver, overGame] = useState(false);
  const [question, writeQuestion] = useState('23 * 223');
  const [answer, setAnswer] = useState(0);
  
  const [options, setOptions] = useState([0,1,2,3]);

  const [tableNum, setTableNum] = useState(2);
  const [aRa, setArA] = useState(2);
  const [aRb, setArB] = useState(10);
  const [bRa, setBrA] = useState(2);
  const [bRb, setBrB] = useState(20);

  const [time, updateTime] = useState(10);
  const [timeStored, storeTime] = useState(10);

  const [wrong, setWrong] = useState(5);

  useEffect(()=>{
    let opts=[];
    for(let i=0; i<3; i++){
      opts.push(tableNum*(generateNum(aRb, aRa)));
    }
    opts.push(answer);
    shuffleArray(opts);
    setOptions(opts);
  },[answer]);
  useEffect(()=>{
    if(!isGameStop){
      let timer;
      timer = setInterval(() => {
        if(time>0){
          updateTime(time-1);
          document.querySelector('#my-time-graph').style.width=`${time*(parseInt(100/timeStored))}%`;
        }else if(time==0){
          overGame(true);
        }
      }, 1000);
      return ()=>clearInterval(timer);
    }
  },[isGameStop, time]);
  const updateInput = (key)=>{
    if(key==='x'){
      writeInput('');
    }else{
      writeInput(`${input}${key}`);
    }
  }
  const shuffleArray = (array) =>{
      array.sort(() => Math.random() - 0.5);
  }
  const checkAnswer=(selectedAnswer)=>{
    if(options[selectedAnswer]===answer){
      updateScore(score+1);
      tableQuestion();
      updateTime(timeStored);
      setWrong(5);
    }else{
      setWrong(selectedAnswer);
    }
  }
  const generateNum = (max, min) => Math.floor(Math.random()*(max-min)+min);
  const tableQuestion = ()=>{
    let multiplyBy = generateNum(aRb, aRa);
    writeQuestion(`${tableNum} x ${multiplyBy}`);
    setAnswer(tableNum*multiplyBy);
  }
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
      {screen==='learn'?(
        <section className='w-full h-[100vh] grid justify-center items-center'>
          <div className='p-5 grid gap-5'>
            <div className='grid gap-2'>
              <label htmlFor="">Number</label>
              <input type="text" value={tableNum} onChange={(e)=>{setTableNum(e.target.value)}} inputMode='numeric' className='bg-transparent px-3 py-2 border-[1px] rounded-md font-bold focus:outline-none' />
            </div>
            <div className='grid gap-2'>
              <label htmlFor="#">Range</label>
              <div className='flex gap-2'>
                <input type="text" value={aRa} onChange={(e)=>{setArA(e.target.value)}} inputMode='numeric' className='bg-transparent w-32 px-3 py-2 border-[1px] rounded-md font-bold focus:outline-none' />
                <input type="text" value={aRb} onChange={(e)=>{setArB(e.target.value)}} inputMode='numeric' className='bg-transparent w-32 px-3 py-2 border-[1px] rounded-md font-bold focus:outline-none' />
              </div>
            </div>
            <button className='bg-primary rounded-md px-3 w-full py-2' onClick={()=>{setScreen('learn-start');tableQuestion();stopGame(false)}}>PlayGame</button>
            <button className='bg-primary rounded-md px-3 w-full py-2' onClick={()=>{setScreen('menu');}}>BackToMenu</button>
          </div>
        </section>
      ):''}
      {screen==='learn-start'?(
        <section className='w-full h-[100vh] grid items-center justify-center'>
          <div className='w-[80vw] sm:w-[50vw] p-2'>
            <div className='flex gap-2 items-center bg-primary rounded-md p-4'> 
              <div className='w-full'><div className='w-full h-5 bg-neutral-focus rounded-md' id='my-time-graph'></div></div>
              <span>{time}</span>
            </div>
            <div className='text-right mt-3'>score : <span>{score}</span></div>
            <div className='mt-10'>
              <p className='text-3xl text-primary font-bold text-center'>{question}</p>
              <div className='grid grid-cols-2 gap-4 mt-10'>
                {isGameOver?(
                  <>
                    <button className='border-[2px] rounded-md border-neutral-focus px-3 py-2' onClick={()=>{tableQuestion();overGame(false);updateTime(timeStored)}}>PlayAgain</button>
                    <button className='border-[2px] rounded-md border-neutral-focus px-3 py-2' onClick={()=>{setScreen('learn')}}>ResetGame</button>
                  </>
                ):(
                  <>
                    <span className={`${wrong===0?'bg-error':''} flex items-center cursor-pointer justify-center font-bold text-3xl h-20 border-2 rounded-md`} onClick={()=>{checkAnswer(0)}}>{options[0]}</span>
                    <span className={`${wrong===1?'bg-error':''} flex items-center cursor-pointer justify-center font-bold text-3xl h-20 border-2 rounded-md`} onClick={()=>{checkAnswer(1)}}>{options[1]}</span>
                    <span className={`${wrong===2?'bg-error':''} flex items-center cursor-pointer justify-center font-bold text-3xl h-20 border-2 rounded-md`} onClick={()=>{checkAnswer(2)}}>{options[2]}</span>
                    <span className={`${wrong===3?'bg-error':''} flex items-center cursor-pointer justify-center font-bold text-3xl h-20 border-2 rounded-md`} onClick={()=>{checkAnswer(3)}}>{options[3]}</span>
                  </>
                )}
              </div> 
            </div>
            <button className='mt-10 w-full text-center px-3 py-2 bg-neutral-focus rounded-md' onClick={()=>{stopGame(!isGameStop)}}>{isGameStop?'Pause':'Resume'}</button>
          </div>
        </section>
      ):''}
      {screen==='play'?(
        <section className='h-[100vh] w-full flex items-center justify-center p-5'>
          <div className='w-fit grid gap-5'>
            <h1 className='text-center text-3xl font-bold text-primary'>set game</h1>
            <div className='grid gap-3'>
              <div className='grid gap-1'>
                <label htmlFor="#">Number</label>
                <div className='flex gap-2'>
                  <input type="text" onChange={(e)=>{setArA(e.target.value)}} value={aRa} className='border-[1px] text-primary-focus bg-transparent px-3 w-32 py-2 rounded-md font-bold focus:outline-none' />
                  <input type="text" onChange={(e)=>{setArB(e.target.value)}} value={aRb} className='border-[1px] text-primary-focus bg-transparent px-3 w-32 py-2 rounded-md font-bold focus:outline-none' />
                </div>
              </div>
              <div className='grid gap-1'>
                <label htmlFor="#">Number</label>
                <div className='flex gap-2'>
                  <input type="text" onChange={(e)=>{setBrA(e.target.value)}} value={bRa} className='border-[1px] text-primary-focus bg-transparent px-3 w-32 py-2 rounded-md font-bold focus:outline-none' />
                  <input type="text" onChange={(e)=>{setBrB(e.target.value)}} value={bRb} className='border-[1px] text-primary-focus bg-transparent px-3 w-32 py-2 rounded-md font-bold focus:outline-none' />
                </div>
              </div>
              <div>
                <label htmlFor="#">Number</label>
                <div>
                  <input type="text" onChange={(e)=>{updateTime(e.target.value)}} value={time} className='border-[1px] bg-transparent px-3 py-2 w-32 rounded-md font-bold focus:outline-none' />
                </div>
              </div>  
            </div>
            <div className='grid gap-2'>
              <button onClick={()=>{setScreen('play-start')}} className='w-full bg-primary px-3 py-2 rounded-md'>Play</button>
              <button onClick={()=>{setScreen('menu')}} className='w-full bg-primary px-3 py-2 rounded-md'>Back</button>
            </div>
          </div>
        </section>
      ):''}
      {screen==='play-start'?(
        <section className='w-full h-[100vh] grid items-center justify-center p-5'>
          <div className='w-[70vw]'>
            <div className='flex gap-2 bg-primary p-3 rounded-xl'>
              <div className='w-full'><div className='w-full bg-neutral-focus h-full rounded-xl'></div></div>
              <span>{time}</span>
            </div>
            <div className='text-right mt-2'>score : <span>{score}</span></div>
            <div className='grid gap-2 mt-10'>
              <p className='text-3xl font-bold text-center'>{question}</p>
              <p className='text-center border-[1px] border-neutral-focus rounded-xl px-3 py-2 font-bold '>{input}</p>
              <div className='h-52 flex items-center justify-center border-[1px] rounded-xl border-neutral-focus'>
                {!isGameOver?(<Keyboard updateInput={updateInput}/>):(<div className='flex gap-5'>
                  <button className='border-[1px] px-3 py-2 font-bold text-primary rounded-md border-neutral-focus shadow-2xl' onClick={()=>{overGame(false);}}>PlayAgain</button>
                </div>)}
              </div>
            </div>
            <div className='flex justify-between p-5 mt-10'>
              <button className='border-[1px] border-neutral-focus hover:bg-primary rounded-md px-3 py-2' onClick={()=>{stopGame(false);}}>{isGameStop?<RxResume/>:<HiPause/>}</button>
              <button className='border-[1px] border-neutral-focus hover:bg-primary rounded-md px-3 py-2' onClick={()=>{setScreen('menu');}}><BsMenuButtonWide/></button>
              <button className='border-[1px] border-neutral-focus hover:bg-primary rounded-md px-3 py-2' onClick={()=>{setScreen('play-start');}}><FiSettings/></button>
            </div>
          </div>
        </section>
      ):''} 
    </>
  )
}

export default Page