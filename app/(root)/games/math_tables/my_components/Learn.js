"use client";
import React, { useState } from 'react'
import {BsArrowRight} from 'react-icons/bs';
import {BsArrowLeft} from 'react-icons/bs';
import { useEffect } from 'react';
const Learn = (props) => {
    const [tableNum, setTableNum] = useState(2);
    const [aRa, setArA] = useState(2);
    const [aRb, setArB] = useState(10);
    const [myScreen, setMyScreen] = useState('learn');
    const [options, setOptions] = useState([0,1,2,3]);
    const [answer, setAnswer] = useState(0);
    const [isGameStop, stopGame] = useState(true);
    const [isGameOver, overGame] = useState(false);
    const [question, writeQuestion] = useState('');
    const [time, updateTime] = useState(10);
    const [score, updateScore] = useState(0);
    const [timeStored, storeTime] = useState(10);
    const [isMusicPlay, stopMusic] = useState(true);
    const [wrong, setWrong] = useState(5);
    const [right, setRight] = useState(5);
    const tableQuestion = ()=>{
        let multiplyBy = generateNum(aRb, aRa);
        writeQuestion(`${tableNum} x ${multiplyBy}`);
        setAnswer(tableNum*multiplyBy);
        setWrong(5);
        const sound = new Howl({
          src:['/attention.wav']
        });
        sound.play();
        sound.on('end',()=>{sound.stop();})
    }
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
              stopGame(true);
            }
          }, 1000);
          return ()=>clearInterval(timer);
        }
    },[isGameStop, time]);
    const shuffleArray = (array) =>{
        array.sort(() => Math.random() - 0.5);
    }
    const checkAnswer=(selectedAnswer)=>{
        if(!isGameStop){
            if(options[selectedAnswer]===answer){
              setRight(selectedAnswer);
              setTimeout(() => {
                  setRight(5);
                  updateScore(score+1);
                  tableQuestion();
                  updateTime(timeStored);
              }, 100);
            }else{
              setWrong(selectedAnswer);
            }
        }
    }
    const generateNum = (max, min) => Math.floor(Math.random()*(max-min)+min);
  return (
    <>
      {myScreen==='learn'?(
        <section className='w-full grid justify-center items-center min-h-screen'>
          <div className='p-5 grid gap-5'>
            <h1 className='text-3xl font-bold text-primary'>Learn</h1>
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
             <button className='bg-primary flex justify-center gap-2 items-center  rounded-md px-3 w-full py-2' onClick={()=>{setMyScreen('learn-start');tableQuestion();stopGame(false)}}>PlayGame <BsArrowRight/></button>
             <button className='bg-primary flex justify-center gap-2 items-center  rounded-md px-3 w-full py-2' onClick={()=>{props.setScreen('menu');}}><BsArrowLeft/> BackToMenu</button>
           </div>
        </section>
      ):''}
      {myScreen==='learn-start'?(
         <section className='w-full h-[100vh] grid items-center justify-center'>
           <div className='w-[80vw] sm:w-[50vw] p-2'>
            <h1 className='text-3xl font-bold'>Learn</h1>
             <div className='flex gap-2 items-center bg-primary rounded-md p-4 mt-12'> 
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
                     <button className='border-[2px] rounded-md border-neutral-focus px-3 py-2' onClick={()=>{setMyScreen('learn')}}>ResetGame</button>
                   </>
                 ):(
                   <>
                     <span className={`${wrong===0?'bg-error':''} ${right===0?'bg-success':''} flex items-center cursor-pointer justify-center font-bold text-3xl h-20 border-2 rounded-md`} onClick={()=>{checkAnswer(0)}}>{options[0]}</span>
                     <span className={`${wrong===1?'bg-error':''} ${right===1?'bg-success':''} flex items-center cursor-pointer justify-center font-bold text-3xl h-20 border-2 rounded-md`} onClick={()=>{checkAnswer(1)}}>{options[1]}</span>
                     <span className={`${wrong===2?'bg-error':''} ${right===2?'bg-success':''} flex items-center cursor-pointer justify-center font-bold text-3xl h-20 border-2 rounded-md`} onClick={()=>{checkAnswer(2)}}>{options[2]}</span>
                     <span className={`${wrong===3?'bg-error':''} ${right===3?'bg-success':''} flex items-center cursor-pointer justify-center font-bold text-3xl h-20 border-2 rounded-md`} onClick={()=>{checkAnswer(3)}}>{options[3]}</span>
                   </>
                 )}
               </div> 
             </div>
             <button className='mt-10 w-full text-center px-3 py-2 bg-neutral-focus rounded-md' onClick={()=>{stopGame(!isGameStop)}}>{isGameStop?'Resume':'Pause'}</button>
             <button className='border-[2px] rounded-md w-full mt-2 border-neutral-focus px-3 py-2' onClick={()=>{stopGame(true);setMyScreen('learn');}}>Leave Game</button>
           </div>
         </section>
      ):''}
    </>
    )
}

export default Learn;