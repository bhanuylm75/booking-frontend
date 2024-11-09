/* eslint-disable no-unreachable */
import axios from "axios";
const apiKey = "AIzaSyAku6tI07bWnwDnsvw4oi2iZpr6kfiCIbw" 
export const fetchNearbyAttractions = async () => {
  //console.log(latitude,longitude)
  const latitude=13.0843
  const longitude=80.2705
  const radius = 5000;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`;
  
  try{
    const {data}= await axios.get(url)
    console.log(data?.results)
    return data?.results;
   

  }
  catch(err){
    console.log(err)

  }

  
};


export const attractions = async (latitude, longitude) => { 
  const query = "tourist attractions aroumd me";
  const radius = 100000;  // Set a search radius of 5 kilometers (you can adjust this)
  
  // Google Places API URL with additional parameters (radius and type)
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${latitude},${longitude}&radius=${radius}&type=tourist_attraction&key=${apiKey}`;

  try {
      //let results = [];
      let response = await axios.get(url);
      const results = response?.data?.results;
      console.log(response?.data?.next_page_token)

      // Check if there's a next page token for more results and handle pagination
      

      return results;
      
  } catch (error) {
      console.error('Error fetching places:', error?.response?.data?.error_message || error.message);
      return [];
  }
};



export const getPlaceDetails = async (placeId) => {
 
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const details = response?.data?.result;
    return details
  } catch (error) {
    console.error('Error fetching place details:', error);
  }
};
