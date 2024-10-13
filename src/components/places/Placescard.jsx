/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useState,useRef } from "react";
import "./places.css"

const Placescard = ({stays }) => {
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
  //const visibleStays = stays.slice(currentIndex, currentIndex + staysPerPage);
  //console.log(visibleStays[0]?.images[0])
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
      <Link className="no-underline" to={`/${index}/${encodeURIComponent(place.name)}`} state={place}>
      <div className="maintrip-card" key={index}>
         {place?.images?.slice(0,1).map((image,index)=>(
          <img key={index}  className="trip-img" src={image}/>
        ))}
        <p className="tdesc">{place.name}</p>
      </div>
      </Link>
     ))}
 
    </div>
    
 </div>
  )
}

export default Placescard