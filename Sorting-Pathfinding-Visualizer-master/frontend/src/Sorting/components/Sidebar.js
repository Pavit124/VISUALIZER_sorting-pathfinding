/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Sidebar.css';
import { Slider } from '@mui/material';

const info = {
   'bubble': '<strong>Bubble sort</strong> is a sorting algorithm that <u><i>compares</i></u> two adjacent elements and swaps them until they are in the intended order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.',
   'merge': '<strong>Merge sort</strong> is a sorting algorithm that works by dividing an array into smaller subarrays, sorting each subarray, and then merging the sorted subarrays back together to form the final sorted array.',
   'insertion': '<strong>Insertion sort</strong> is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.',
   'quick': '<strong>Quick Sort</strong> is a <u><i>Divide and Conquer</i></u> algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways. '
}

function Sidebar() {

   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();

   const [algorithm, setAlgorithm] = useState("Bubble Sort")
   const [information, setInformation] = useState(info.bubble)

   const [max,setMax] = useState(100);

   const handleAlgo = (algo) => {
      dispatch({
         type: 'UPDATE_ALGORITHM',
         algorithm: algo
      })

      if(algo === 'bubble') {
         setAlgorithm('Bubble Sort');
         setInformation(info.bubble);
      }
      else if(algo === 'merge') {
         setAlgorithm('Merge Sort');
         setInformation(info.merge)
      }
      else if(algo === 'insertion') {
         setAlgorithm('Insertion Sort');
         setInformation(info.insertion);
      }
      else {
         setAlgorithm('Quick Sort');
         setInformation(info.quick);
      }
   }

   const resetColor = () => {
      dispatch({
         type:'UPDATE_COLOR',
         color:document.getElementById('color').value
      })
   }

   const handleRange = (_range) => {

      let new_arr = [...myState.values];
      for(let i = 0; i < new_arr.length; i++)
         document.getElementById(i).style.transform = `translateX(${i*11}px)`;

      resetColor();
      
      dispatch({
         type: 'UPDATE_RANGE',
         range: _range
      })
      dispatch({
         type:'CHANGE_VALUES'
      })
   }

   const handleColor = (_color) => {
      dispatch({
         type: 'UPDATE_COLOR',
         color: _color
      })
   }

   const handleSpeed = (_speed) => {
      dispatch({
         type: 'UPDATE_SPEED',
         speed: _speed
      })
   }

   useEffect(() => {
      handleRange(100);
   },[]);

   useEffect(() => {
      dispatch({
         type:'UPDATE_COLOR',
         color:document.getElementById('color').value
      })
   },[myState.values]);

   const handleWidth = () => {
      if(window.innerWidth>1300)
         setMax(100);
      else if(window.innerWidth>1200)
         setMax(80);
      else if(window.innerWidth>1100)
         setMax(60);
      else if(window.innerWidth>900)
         setMax(40);
      else if(window.innerWidth>800)
         setMax(20);
      else if(window.innerWidth>500)
         setMax(10);
      else
         setMax(0);
   }

   useEffect(() => {
      handleWidth();
      window.addEventListener('resize',handleWidth);
      return () => window.removeEventListener('resize',handleWidth);
   },[]);

  return (
    <div className="sidebar">

      <div className="sidebar__option">
         <label htmlFor="algo">Algorithm: </label>
         <select name="algo" id="algo" onChange={(e) => handleAlgo(e.target.value)} disabled = {myState.play? true: false}>
            <option value="bubble">Bubble Sort </option> 
            <option value="merge">Merge Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="quick">Quick Sort</option>
         </select>
      </div>

      <div className="sidebar__option">
         <label htmlFor="range">Range: </label>
         <Slider 
            style={{width:'180px'}}
            size="small"
            defaultValue={100}
            id = 'slider'
            min={1}
            className = 'slider'
            disabled={myState.play? true: false}
            max={max}
            onChange = {(e) => handleRange(e.target.value)}
            valueLabelDisplay="auto"
         />
      </div>

      <div className="sidebar__option">
         <label htmlFor="color">Color: </label>
         <select name="color" id="color" onChange = {(e) => handleColor(e.target.value)} disabled = {myState.play? true: false}>
            <option value="#F70776" style={{color:'#F70776'}}>Pink</option> 
            <option value='rgb(85, 212, 0)' style={{color:'rgb(10,200,20)'}}>Green</option>
            <option value="#D21312" style={{color:'red'}}>Red</option>
            <option value="#000000" style={{color:'grey'}}>Black</option>
            <option value="#ddd902" style={{color:'#ddd902'}}>Yellow</option>
         </select>
      </div>

      <div className="sidebar__option">
         <label htmlFor="speed">Speed: </label>
         <select name="speed" defaultValue={100} id="speed" onChange = {(e) => handleSpeed(e.target.value)} disabled = {myState.play? true: false}>
            <option value={500} >Slow</option> 
            <option value={200} >Medium</option>
            <option value={100} >Fast</option>
            <option value={20} >Super Fast</option>
            <option value={5} >Ultra Fast</option>
         </select>
      </div>
      
      <div className="information">
         <h2 className="title">{algorithm}</h2>
         <p className="content" dangerouslySetInnerHTML={{ __html: information }}></p>
      </div>
   </div>
  )
}

export default Sidebar;