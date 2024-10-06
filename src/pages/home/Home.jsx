
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import { useEffect,useState } from "react"
import "./home.css"
//import { Featured } from "../../components/Featured/Featured"
//import { fetchNearbyAttractions,attractions } from "../../components/utils/Apidata"
import { fetchAllPlacePhotos } from "../../components/utils/Data"
//import { fetchAllPlacePhotos } from "../../components/utils/Data"
import axios from "axios"
import Customheader from "../../components/customheader/Customheader"
import Properties from "../../components/properties/Properties"
import Placescard from "../../components/places/Placescard"

const Home = () => {
  const [stays, setStays] = useState([]);
  const [trips,settrips]=useState([])
  const[weekendgateways,setweekendgateways] = useState([]);
  //const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        //console.log(longitude,latitude)
        
      },
      (error) => {
        console.error("Error getting location:", error);
      }
      
    );
   

  },[])

  useEffect(() => {
    const fetchStays = async () => {
      if (location.lat && location.lng) {
        try {
          const response = await axios.get(`https://16.170.215.126/api/getstaysaround`, {
            params: {
              lat: location.lat,
              lng: location.lng,
            },
          });
          console.log(response)
          setStays(response.data)
        } catch (error) {
          console.error('Error fetching stays:', error);
        }
      }
    };
  
    fetchStays();
  }, [location.lat, location.lng]);
  


  useEffect(() => {
    const fetchtrips = async () => {
        
        const {data}= await axios.get("https://16.170.215.126/gettrips/")
        settrips(data.trips)
        //console.log(data)
    };

    fetchtrips();
  }, []);
  
  useEffect(() => {
    const fetchpics = async () => {
        
        const data= await fetchAllPlacePhotos()
        
        //console.log(data)
    
    };

    fetchpics();
  }, []);
  
  return (
    <div className="">
      <Navbar/>
      <Header/>
      <Customheader/>
      <div className="homeContainer">
        <Properties stays={stays}/>
       
        <Placescard stays={trips}/>
      
      </div>
    </div>
  )
}

export default Home
