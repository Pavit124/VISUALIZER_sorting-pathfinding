
import React from 'react'
import Login from './Login/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup/Signup'
import Homepage from './Homepage/Homepage'
import Sorting from './Sorting/Sorting'
import Pathfinding from './Pathfinding/Pathfinding'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/Signup' element={<Signup />}></Route>
      <Route path='/Homepage' element={<Homepage />}></Route>
      <Route path='/Sorting' element={<Sorting />}></Route>
      <Route path='/Pathfinding' element={<Pathfinding />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
