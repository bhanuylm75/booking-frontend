import "./placedetails.css";
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaceDetails } from "../../components/utils/Apidata";
import Review from "../../components/review/Review";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios";


const Placedetails = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { id } = useParams();
  console.log(id)
  const [propertie,setpropertie]=useState([])

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`https://treepr.in/api/getplacedetails`, {
        params: {
          id:id
        },
      })
      setpropertie(res?.data)
      console.log(res)
        
    };

    fetch();
  }, [id]);

  const handleMove = (direction) => {
    let newSlideNumber = slideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 0 : slideNumber - 1;
    } else if (direction === "r") {
      newSlideNumber = slideNumber === propertie.photos.length - 1 ? slideNumber : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  
  const getPhotoUrl = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

  };
  console.log(slideNumber)
  
  return (
    <div>
     <Navbar/>
      <div className="hotelContainer">
       
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{propertie.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{propertie.formatted_address
            }</span>
          </div>
          <span className="hotelDistance">
            Map –  <a href={propertie.url}>{propertie.url} </a>
          </span>
          <span className="hotelPriceHighlight">
          {propertie.editorial_summary?.overview}
          </span>
          <div className="fpRating">
            <button>{propertie.rating}</button>
            <span>Excellent {propertie?.user_ratings_total
            } Reviews</span>
          </div>
          <div className="hotelImages">
          {windowWidth > 1024 ? (
            propertie.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  src={getPhotoUrl(photo.photo_reference)}
                  alt=""
                  className={`hotelImg item${i}`}
                  
                />
              </div>
            ))
          ) : (
            <>
              {propertie.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    src={getPhotoUrl(propertie.photos[slideNumber].photo_reference)}
                    alt=""
                    className={`hotelImg item${i}`}
                    
                  />
                </div>
              ))}
              <div className="arrow-con">
                <FontAwesomeIcon
                  onClick={() => handleMove("l")}
                  className={`detail-arrow ${slideNumber === 0 ? "disabled" : ""}`}
                  icon={faChevronLeft}
                  disabled={slideNumber === 0}
                />
                <FontAwesomeIcon
                  onClick={() => handleMove("r")}
                  className={`detail-arrow ${
                    slideNumber === propertie.photos?.length - 1 ? "disabled" : ""
                  }`}
                  icon={faChevronRight}
                  disabled={slideNumber === propertie?.photos?.length - 1}
                />
              </div>
            </>
          )}
        </div>

          
         

          <h3>Guest who stayed here loved </h3>
         <div className="review-con">
        {propertie?.reviews?.map((review,index)=>(
          review?.rating >= 4 ? <Review key={index} review={review} /> : null
          
        ))}
         </div>
        </div>
      </div>
     
    </div>
  );
};

export default Placedetails;