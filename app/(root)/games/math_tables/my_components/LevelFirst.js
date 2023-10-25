import React, { useEffect } from 'react';
import { useState } from 'react';
import Keyboard from './keyboard';
import {FiSettings} from 'react-icons/fi';
import {BsMenuButtonWide} from 'react-icons/bs';
import {BsArrowRight} from 'react-icons/bs';
import {PiPlayPauseBold} from 'react-icons/pi';
import {Howl} from 'howler';
import {PiPauseCircle} from 'react-icons/pi';
import {BsArrowLeft} from 'react-icons/bs';
import {SlReload} from 'react-icons/sl';
import {GrResume} from 'react-icons/gr';
const LevelFirst = (props) => {
  
  const [myScreen, setMyScreen] = useState('play');
  const [input, writeInput] = useState('');
  const [isGameStop, stopGame] = useState(true);

  const [score, updateScore] = useState(0);
  const [isGameOver, overGame] = useState(false);
  const [question, writeQuestion] = useState('23 * 223');
  const [answer, setAnswer] = useState(0);
  
  const [aRa, setArA] = useState(2);
  const [aRb, setArB] = useState(10);
  const [bRa, setBrA] = useState(2);
  const [bRb, setBrB] = useState(20);

  const [time, updateTime] = useState(10);
  const [timeStored, storeTime] = useState(10);
  const launchGame=()=>{
    setMyScreen('play-start');
    giveCrossEquation();
    storeTime(time);
    stopGame(false);
  }

  const updateInput = (key)=>{
    if(!isGameStop){
      if(key==='x'){
        writeInput('');
      }else{
        writeInput(`${input}${key}`);
      }
    }
  }
  const generateNum = (max, min) => Math.floor(Math.random()*(max-min)+min);
  const giveCrossEquation = ()=>{
    let first = generateNum(aRb, aRa);
    let second = generateNum(bRb, bRa);    
    let randomNess = generateNum(score*3, 1);

    writeQuestion(`${first} x ${second} + ${randomNess}`);

    setAnswer(first*second+randomNess);

    writeInput('');
    const sound = new Howl({
      src:['/attention.wav']
    });
    sound.play();
    sound.on('end',()=>{sound.stop();})
  }
  useEffect(()=>{
    if(parseInt(input)===answer){
      updateScore(score+1);
      giveCrossEquation();
      updateTime(timeStored);
    }
  },[input]);


  useEffect(()=>{
    if(!isGameStop){
      let timer;
      timer = setInterval(() => {
        if(time>0){
          updateTime(time-1);
          document.querySelector('#my-time-graph').style.width=`${time*(parseInt(100/timeStored))}%`;
        }else if(time==0){
          overGame(true);
          stopGame(true);
        }
      }, 1000);
      return ()=>clearInterval(timer);
    }
},[isGameStop, time]);

  return (  
    <>
      {myScreen==='play'?(
        <section className='h-[100vh] w-full flex items-center justify-center p-5'>
          <div className='w-fit grid gap-5'>
            <h1 className='text-center text-3xl font-bold text-primary'>set game</h1>
            <div className='grid gap-3'>
              <div className='grid gap-1'>
                <label htmlFor="#">Number</label>
                <div className='flex gap-2'>
                  <input type="text" onChange={(e)=>{setArA(e.target.value)}} value={aRa} inputMode='numeric' className='border-[1px] text-primary-focus bg-transparent px-3 w-32 py-2 rounded-md font-bold focus:outline-none' />
                  <input type="text" onChange={(e)=>{setArB(e.target.value)}} value={aRb} inputMode='numeric' className='border-[1px] text-primary-focus bg-transparent px-3 w-32 py-2 rounded-md font-bold focus:outline-none' />
                </div>
              </div>
              <div className='grid gap-1'>
                <label htmlFor="#">Number</label>
                <div className='flex gap-2'>
                  <input type="text" onChange={(e)=>{setBrA(e.target.value)}} value={bRa} className='border-[1px] text-primary-focus bg-transparent px-3 w-32 py-2 rounded-md font-bold focus:outline-none' inputMode='numeric' />
                  <input type="text" onChange={(e)=>{setBrB(e.target.value)}} value={bRb} className='border-[1px] text-primary-focus bg-transparent px-3 w-32 py-2 rounded-md font-bold focus:outline-none' inputMode='numeric' />
                </div>
              </div>
              <div>
                <label htmlFor="#">Number</label>
                <div>
                  <input type="text" onChange={(e)=>{updateTime(e.target.value)}} value={time} className='w-full border-[1px] bg-transparent px-3 py-2 rounded-md font-bold focus:outline-none' inputMode='numeric' />
                </div>
              </div>  
            </div>
            <div className='grid gap-2'>
              <button onClick={()=>{launchGame();}} className='flex justify-center items-center  gap-2 w-full bg-primary px-3 py-2 rounded-md'>Play <BsArrowRight/></button>
              <button onClick={()=>{props.setScreen('menu')}} className='flex justify-center items-center  gap-2 w-full bg-primary px-3 py-2 rounded-md'><BsArrowLeft/> Back</button>
            </div>
          </div>
        </section>
      ):''}
      {myScreen==='play-start'?(
        <section className='w-full h-[100vh] grid items-center justify-center p-5'>
          <div className='w-[70vw]'>
            <div className='flex gap-2 bg-primary p-3 rounded-xl'>
              <div className='w-full'><div id='my-time-graph' className='w-full bg-neutral-focus h-full rounded-xl'></div></div>
              <span>{time}</span>
            </div>
            <div className='text-right mt-2'>score : <span>{score}</span></div>
            <div className='grid gap-2 mt-10'>
              <p className='text-3xl font-bold text-center'>{question}</p>
              <p className='text-center border-[1px] border-neutral-focus rounded-xl px-3 py-2 font-bold h-11 '>{input}</p>
              <div className='h-52 flex items-center justify-center border-[1px] rounded-xl border-neutral-focus'>
                {!isGameOver?(<Keyboard updateInput={updateInput}/>):(<div className='flex gap-5'>
                  <button className='border-[1px] px-3 py-2 font-bold text-primary rounded-md border-neutral-focus shadow-2xl' onClick={()=>{overGame(false);updateTime(timeStored);writeInput('');}}>PlayAgain</button>
                </div>)}
              </div>
            </div>  
            <div className='flex justify-between p-5 mt-10'>
              <button className='border-[1px] border-neutral-focus hover:bg-primary rounded-md px-3 py-2' onClick={()=>{stopGame(!isGameStop);}}>{isGameStop?<PiPlayPauseBold/>:<PiPauseCircle/>}</button>
              <button className='border-[1px] border-neutral-focus hover:bg-primary rounded-md px-3 py-2' onClick={()=>{props.setScreen('menu');stopGame(true);}}><BsMenuButtonWide/></button>
              <button className='border-[1px] border-neutral-focus hover:bg-primary rounded-md px-3 py-2' onClick={()=>{setMyScreen('play');stopGame(true);}}><FiSettings/></button>
            </div>
          </div>
        </section>
      ):''} 
    </>
  )
}

export default LevelFirst;