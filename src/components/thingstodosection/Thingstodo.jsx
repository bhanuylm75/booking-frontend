/* eslint-disable react/prop-types */
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "./thingstodo.css"
import { FaStar, FaUser } from "react-icons/fa"; 
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
const para=["MostLovedPlaces","Tourist Attractions", "Stays","Restaurants","Nightlife"]

const Thingstodo = ({place}) => {
  const [statedata,setstatedata]=useState([])
  const [selected, setSelected] = useState("MostLovedPlaces");
  const navigate = useNavigate();
  console.log(place,place.latitude)
  useEffect(()=>{
    handleSearch("MostLovedPlaces")
  },[])

  const handleSearch = async (ptext) => {
    setSelected(ptext);
    if (ptext === "Stays") {
      navigate('/stays', { state: { searchValue: place.name } });
      return; // Exit the function, no API call needed
    }
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    //const latitude="15.2993"
    //const longitude="74.1240"

    const query = `best ${ptext} in ${place.name}`;
    //console.log(query)
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${place.latitude},${place.longitude}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log(response.data.results);
        setstatedata(response.data.results)
    } catch (error) {
        console.error('Error fetching places:', error);
    }
};

const getPhotoUrl = (photoReference) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
};

  return (
    <div className='banner-con'>
      <h2>Things To See & Do</h2>
      <div className='banner-sub'>
        {para.map((ptext,i)=>(
          <p  className={selected === ptext ? "selected" : ""} onClick={(()=>handleSearch(ptext))} key={i}>{ptext}</p>
        ))}
      </div>
      <hr className="thin-line"></hr>
      <div className='customcardmain'>
      {statedata.map((place,index)=>(
        <div key={index} className="custom-card">
           {place.photos && place.photos.length > 0 ? (
              <img
                src={getPhotoUrl(place.photos[0].photo_reference)}
                alt={place.name}
                className="custom-card-image"
              />
            ) : (
              <img
                src="https://via.placeholder.com/400"
                alt="No Image Available"
                className="fpImg"
              />
            )}

        <h3 className="custom-card-title">{place.name}</h3>        
        <hr className="thin-line"></hr>
        <div className="card-bottom">
        <div className="left">
                <p className="rating">
                  <FaStar className="star-icon" /> {place.rating || "N/A"}
                </p>
                <p className="reviews">
                  <FaUser className="user-icon" /> {place.user_ratings_total} Reviews
                </p>
              </div>
              <div className="right">
                <Link to={`/${place.place_id
         }`}><button className="explore-btn">Explore More</button></Link>
              </div>
            </div>
    </div>
      ))}
      </div>
      </div>
  )
}

export default Thingstodo