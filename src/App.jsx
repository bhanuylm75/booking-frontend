import { useEffect, useState } from 'react'
//import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import axios from "axios"
import {  Route, Routes, Link } from 'react-router-dom';
import './App.css'
import Test from './components/test/Test';
//import Header from './components/header/Header'
import Placepage from './pages/placepage/Placepage';
import Stays from './pages/stays/Stays';
import Placedetails from './pages/placedetails/Placedetails';

function App() {
  const [stays, setStays] = useState([]);
  const [error, setError] = useState(null);
 

 
   
     
  
  



 
  
  
  
  
  

  return (
    <div className='con'>
      <Routes>
        <Route path='/' element={<Home />} />
      <Route path="/:index/:name" element={<Placepage/>} />
      <Route path="/:id" element={<Placedetails/>} />
      <Route path="/stays" element={<Stays/>} />
     
      </Routes>
    </div>
  )
}

export default App
