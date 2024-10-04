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
import Placedetails from './pages/placedetails/placedetails';

function App() {
  const [stays, setStays] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const fetchNearbyAttractions = async (latitude, longitude) => {
    const apiKey = 'AIzaSyBJAbu7x6Wfvc971T8DFTD0J7i8ruzXqgw';
    const radius = 500000; // Search radius in meters
    const type = "tourist_attraction";
    const keyword = 'sightseeing';
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Leh-Ladakh&inputtype=textquery&key=${apiKey}`;
    const a={
      "includedTypes": [
        "restaurant"
        
      ],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": 37.7937,
            "longitude": -122.3965
          },
          "radius": 500
        }
      }
      
    }
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };

    try{
      const {data}= await axios.get(url)
      console.log(data?.results)
     

    }
    catch(err){
      console.log(err)

    }
  
    
  };
  const fetchTouristAttractions = async () => {
    const apiKey = 'AIzaSyBJAbu7x6Wfvc971T8DFTD0J7i8ruzXqgw';
    const radius = 1000000; // Search radius in meters
    const type = "tourist_attraction";
    const keyword = 'sightseeing';
    const query="weekend getaways"
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location.lat},${location.lng}&radius=${radius}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      console.log(response)
  
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
    fetchTouristAttractions()
    //fetchNearbyAttractions(location?.lat,location?.lng);

  },[location?.lat,location?.lng])



 
  
  
  
  
  

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
