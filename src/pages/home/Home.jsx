
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import { useEffect,useState } from "react"
import "./home.css"
//import { Featured } from "../../components/Featured/Featured"
import { fetchNearbyAttractions,attractions } from "../../components/utils/Apidata"
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
        const fetchedStays = await fetchNearbyAttractions(location.lat, location.lng,"lodging");
        setStays(fetchedStays);
        console.log(fetchedStays)
        const weekendgateways = await attractions(location.lat, location.lng);
        //console.log(weekendgateways)
        setweekendgateways(weekendgateways)
        //console.log(weekendgateways);
      }
    };

    fetchStays();
  }, [location]);
  
  useEffect(() => {
    const fetchtrips = async () => {
        
        const {data}= await axios.get("http://16.170.215.126:5002/gettrips/")
        settrips(data.trips)
        //console.log(data)
    };

    fetchtrips();
  }, []);
  
  return (
    <div className="">
      <Navbar/>
      <Header/>
      <Customheader/>
      <div className="homeContainer">
      
        <Placescard stays={trips}/>
      
      </div>
    </div>
  )
}

export default Home
