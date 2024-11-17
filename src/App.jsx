import { useEffect, useState } from 'react'
//import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import axios from "axios"
import {  Route, Routes, Link } from 'react-router-dom';
import './App.css'

import Placepage from './pages/placepage/Placepage';
import Stays from './pages/stays/Stays';
import Placedetails from './pages/placedetails/Placedetails';
import Collection from './components/collections/Collection';
//import { fetchNearbyAttractions } from './components/utils/Apidata';
//import Test from './components/test/Test';
//import { Test1,CarouselSize } from './components/test/Test2';
function App() {
 
  
 return (
    <div className='con'>
      <Routes>
        <Route path='/' element={<Home />} />
      <Route path="/:index/:name" element={<Placepage/>} />
      <Route path="/:id" element={<Placedetails/>} />
      <Route path="/stays" element={<Stays/>} />
      <Route path="/collections/:collectionName" element={<Collection />} />
      
      </Routes>
    </div>
  )
}

export default App
