/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import "./places.css"
import axios from "axios"
const Placescard = ({stays }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  //const staysPerPage = 4;
  console.log(stays)
  let screenWidth = window.innerWidth;
  console.log("Screen width: " + screenWidth + "px");
  
 
  const handleLeftArrow = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust the value to change scroll distance
        behavior: 'smooth'
      });
    }
  };

  // Handle right arrow click
  const handleRightArrow = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust the value to change scroll distance
        behavior: 'smooth'
      });
    }
  };


  const [prefetchedData, setPrefetchedData] = useState(null);

  // Function to prefetch data
  const prefetchData = async () => {
    try {
      const response = await axios.get(`https://treepr.in/api/thingstodo`, {
        params: {
          lat: place.latitude,
          lng: place.longtitude,
          query:query,
        },
      });
      console.log(response);
      setPrefetchedData(response.data.results)
  } catch (error) {
      console.error('Error fetching places:', error);
  }
  };

  // Detect when the page is idle and prefetch data
  useEffect(() => {
    if (typeof requestIdleCallback !== "undefined") {
      // Use requestIdleCallback if available
      requestIdleCallback(() => {
        prefetchData();
      });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => {
        prefetchData();
      }, 100); // Delay fetching for a little after load
    }
  }, []);

  const handleNavigation = (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    // Navigate to the next page and pass the prefetched data
    navigate("/next-page", { state: { prefetchedData } });
  };

  


  return (
    <div className="trip-con">
    <div className="conn">
    <div>
    <div className="para">Explore India</div>
    </div>
    <div className="top">
    <button className="arrow" onClick={handleLeftArrow}>
     &#10094;
   </button>
   <button className="arrow" onClick={handleRightArrow}>
     &#10095;
   </button>
    </div>
    </div>
    <p2>These popular destinations have a lot to offer</p2>
    <div className="abc" ref={scrollContainerRef}>
    {stays?.map((place,index) => (
      <Link className="no-underline" to={`/${index}/${encodeURIComponent(place?.name)}`} state={place}>
      <div className="maintrip-card" key={index}>
         {place?.images?.slice(0,1).map((image,index)=>(
          <img key={index}  className="trip-img" src={image}/>
        ))}
        <p className="tdesc">{place?.name} </p>
      </div>
      </Link>
     ))}
 
    </div>
    
 </div>
  )
}

export default Placescard