/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./properties.css"
import { useState,useRef } from "react";
import SlideArrows from "../slidearrows/Slidearrow";

const Properties = ({stays}) => {
  //const landstays=stays?.slice(0, 4)
  //consoe.log(import.meta.env.VITE_GOOGLE_API_KEY)
  const scrollContainerRef = useRef(null);

  
 
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
  //console.log(visibleStays)

  const getPhotoUrl = (photoReference) => {
    console.log(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
    
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  };
  return (
    <div className="stay-con">
    <div className="conn">
       <p className="para">Flagship Stays Around you</p>
       <div className="top">
     <button className="arrow" onClick={handleLeftArrow}>
        &#10094;
      </button>
      <button className="arrow" onClick={handleRightArrow}>
        &#10095;
      </button>
       </div>
       </div>
    
     <div className="fp" ref={scrollContainerRef}>
      {stays?.map((place,index) => (
         <Link className="no-underline" key={index}  to={`/${place.place_id
         }`}>
          <div  className="fpItem">
         {place.photos && place.photos.length > 0 ? (
              <img
                src={getPhotoUrl(place?.photos[0]?.photo_reference)}
                alt={place.name}
                className="fpImg"
              />
            ) : (
              <img
                src="https://via.placeholder.com/400"
                alt="No Image Available"
                className="fpImg"
                loading="lazy"
              />
            )}
          <div className="propcardbottom">
          <span className="fpName">{place.name.slice(0,28)}</span>
          <span className="fpCity">{place.plus_code?.compound_code?.slice(8)
          }</span>
          <div className="fpRating">
            <button>{place.rating}</button>
            <span>Excellent {place.user_ratings_total
            } Reviews</span>
          </div>
            </div>
        </div>
         </Link>
        ))}
    </div>
    </div>
  )
}

export default Properties