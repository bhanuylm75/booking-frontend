import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Filterbox from '../../components/filterbox/Filterbox';
import "./stays.css";
import Customheader from '../../components/customheader/Customheader';

const Stays = () => {
  const location = useLocation();
  const { searchValue } = location.state || "chennai"; // Default value for testing
  const [hotels, setHotels] = useState([]);
  console.log(searchValue)
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // Helper to get the photo URL
  const getPhotoUrl = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  };

  // Function to fetch places based on the search value and optional page token
 // Function to fetch places based on the search value and optional page token
const fetchPlaces = async (pageToken = null) => {
  setIsFetching(true);
  
  const url = `https://treepr.in/api/gethotels?searchValue=${searchValue}${pageToken ? `&nextPageToken=${pageToken}` : ''}`;

  try {
    const response = await axios.get(url);
    console.log(response)
    const fetchedHotels = response.data.results;

    if (pageToken) {
      setHotels((prevHotels) => [...prevHotels, ...fetchedHotels]);
    } else {
      setHotels(fetchedHotels);
    }

    // Check if there is a next page token for pagination
    if (response.data.next_page_token) {
      setTimeout(() => {
        setNextPageToken(response.data.next_page_token);
      }, 2000); // Slight delay for next_page_token to become valid
    } else {
      setNextPageToken(null);
    }
  } catch (error) {
    console.error('Error fetching places:', error);
  } finally {
    setIsFetching(false);
  }
};


  // Fetch the first set of places when the component mounts or when searchValue changes
  useEffect(() => {
    setHotels([]); // Reset the hotels when a new search is triggered
    fetchPlaces();
  }, [searchValue]);

  // Fetch additional results when nextPageToken changes
  useEffect(() => {
    if (nextPageToken) {
      fetchPlaces(nextPageToken);
    }
  }, [nextPageToken]);

  return (
    <>
      <Navbar />
      <Header type="list" />
      <Customheader/>
      <div className="searchresult-con">
        <Filterbox />
        <div className="searchitem-container">
          {hotels?.map((hotel, index) => (
           <Link to={`/${hotel.place_id
           }`} key={index} className="no-underline">
            <div key={index} className="searchItem">
              <img
                src={hotel.photos && hotel.photos.length > 0
                  ? getPhotoUrl(hotel.photos[0].photo_reference)
                  : "https://via.placeholder.com/400"} // Fallback image
                alt={hotel.name}
                className="siImg"
              />
              <div className="siDesc">
                <h1 className="siTitle">{hotel.name}n</h1>
                <span className="siDistance">500m from center</span>
                
                <span className="siFeatures">{hotel.formatted_address}</span>
                <span className="siCancelOp">Free cancellation</span>
                <span className="siCancelOpSubtitle">
                  You can cancel later, so lock in this great price today!
                </span>
              </div>
              <div className='sicon'>
              <div className="siDetails">
                <div className="siRating">
                  <div className="rate-con">
                    <span className="score">Review Score</span>
                    <span className="reviewtext">{hotel.user_ratings_total} reviews</span>
                  </div>
                  <button className='ratingbtn'>{hotel.rating}</button>
                </div>
                <div className="siDetailTexts">
                  <span className="siPrice">$112</span>
                  <span className="siTaxOp">Includes taxes and fees</span>
                  <button className="siCheckButton">See availability</button>
                </div>
              </div>
              </div>
            </div>
           </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stays;
