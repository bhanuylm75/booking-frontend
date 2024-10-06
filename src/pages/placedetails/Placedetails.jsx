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
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  console.log(id)
  const [propertie,setpropertie]=useState([])

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:5000/api/getplacedetails`, {
        params: {
          id:id
        },
      })
      setpropertie(res?.data)
      console.log(res)
        
    };

    fetch();
  }, [id]);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
  const getPhotoUrl = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  };
  
  return (
    <div>
     <Navbar/>
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
           
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
           
          </div>
        )}
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
            {propertie.photos?.slice(0,9).map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={getPhotoUrl(photo.photo_reference)}
                  alt=""
                  className={`hotelImg item${i}`}
                />
              </div>
            ))}
            <div className="arrow-con">
              
            <ArrowBackIcon 
    className="detail-arrow" 
    onClick={() => handleMove("l")}
  />
  <ArrowForwardIcon 
    className="detail-arrow" 
    onClick={() => handleMove("r")}
  />
           
           
            </div>
            
          </div>
          <h3>Guest who stayed here loved  <div className="arrow-con"></div></h3>
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