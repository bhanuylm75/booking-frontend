import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import axios from "axios";
import Customheader from "../../components/customheader/Customheader";
import Properties from "../../components/properties/Properties";
import Placescard from "../../components/places/Placescard";
import Maillist from "../../components/maillist/Maillist";
import Topdest from "@/components/topdestinations/Topdest";
import "./home.css";
import Footer from "@/components/footer/Footer";

const fetchTrips = async () => {
  const { data } = await axios.get("https://treepr.in/gettrips");
  console.log(data);
  return data.trips;
};

const fetchProperties = async (lat, lng) => {
  const { data } = await axios.get("https://treepr.in/api/getstaysaround", {
    params: { lat, lng },
  });
  console.log("Fetched Properties:", data);
  return data;
};

const Home = () => {
  const [location, setLocation] = useState({ lat: 15.2993, lng: 74.1240 });
  console.log(import.meta.env.VITE_GOOGLE_API_KEY)

  // Fetch user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  // Fetch Trips using React Query
  const { data: trips, isLoading: isTripsLoading } = useQuery('trips', fetchTrips, {
    staleTime: 10 * 60 * 1000, // Cache trips data for 10 minutes
  });

  // Fetch Properties using React Query
  const { data: stays, isLoading: isPropertiesLoading } = useQuery(
    ['properties', location.lat, location.lng],
    () => fetchProperties(location.lat, location.lng),
    {
      enabled: !!location.lat && !!location.lng, // Only fetch when location is available
      staleTime: 10 * 60 * 1000, // Cache properties data for 10 minutes
    }
  );

  if (isTripsLoading || isPropertiesLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Header />
      <Customheader />
      <div className="homeContainer">
        {/* Pass stays data to Properties component */}
        <Properties stays={stays}/>
        <Topdest />
        {/* Pass trips data to Placescard component */}
        <Placescard stays={trips} />
      </div>
      <div> <Footer/></div>
    </div>
  );
};

export default Home;
