/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BubbleSort = () =>{
   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();
   let timeoutIds = [];

   let values = myState.values.map((item) => item[0]);
   let ids = myState.values.map((item) => item[1]);
   
   const solve = () => {
      for(let i = values.length,timer = 0; i > 0;timer += i-1, i--) {
         const timeoutId1 = setTimeout(() => {
            for(let j = 1; j < i; j++){
               const timeoutId2 = setTimeout(() => {
                  document.getElementById(ids[j]).childNodes[1].style.backgroundColor = 'black';
                  document.getElementById(ids[j-1]).childNodes[1].style.backgroundColor = 'black';
                  
                  const timeoutId3 = setTimeout(() => {
                     document.getElementById(ids[j]).childNodes[1].style.backgroundColor = myState.color;
                     document.getElementById(ids[j-1]).childNodes[1].style.backgroundColor = myState.color;
                     if(myState.play === false) {
                        for(let i = 0; i < timeoutIds.length; i++) {
                           clearTimeout(timeoutIds[i]);
                           timeoutIds.pop(timeoutIds[timeoutIds.length - 1]);
                        }
                     }
                  },myState.speed-10);
                  timeoutIds.push(timeoutId3);
                     
                  if(values[j]<values[j-1]){
                     let temp = values[j];
                     values[j] = values[j-1];
                     values[j-1] = temp;

                     temp = ids[j];
                     ids[j] = ids[j-1];
                     ids[j-1] = temp;
                     
                     document.getElementById(ids[j]).style.transform = `translateX(${j*11}px)`;
                     
                     document.getElementById(ids[j-1]).style.transform = `translateX(${(j-1)*11}px)`;
                  }
               },(j-1)*(myState.speed));
               timeoutIds.push(timeoutId2);
            }
         }
         ,(timer)*(myState.speed));
         timeoutIds.push(timeoutId1);
      }
      
      setTimeout(() => {
         dispatch({
            type:'PLAY_PAUSE',
            _play: false
         })

         dispatch({
            type:'UPDATE_COLOR',
            color: 'rgb(0, 182, 0)'
         })

      },(((myState.values.length-1)*(myState.values.length))/2)*myState.speed+50);
   }
   
   useEffect(() => {
      if(myState.algorithm==='bubble'){
         if(myState.play)
            solve();
      }
   },[myState.play]);

   return <></>;
}

export default BubbleSort;