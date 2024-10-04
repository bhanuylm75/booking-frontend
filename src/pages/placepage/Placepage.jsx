import {useState,useRef} from 'react'
import { useLocation,useNavigate,useParams } from "react-router-dom";
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./placepage.css"
import Thingstodo from '../../components/thingstodosection/Thingstodo';
import Customheader from '../../components/customheader/Customheader';
//import { useLocation } from 'react-router-dom';




const Placepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 

  const location = useLocation();
  //const navigate = useNavigate();
  const place = location.state;
  console.log(place)
  //const { index, name } = useParams();
  const deviceWidth = window.innerWidth;
  console.log("Current device width:", deviceWidth);
  let photosperpage = 3;
  if (deviceWidth <768){
    photosperpage = place.images.length
  }
  else{
    photosperpage = 3;
  }
  //console.log(place.images.length)
  const handlePrevClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
    else {
      setCurrentImageIndex(0); // Optional: Loop back to the first image
    }
   
  };


  const handleNextClick = () => {
    if (currentImageIndex + photosperpage < place.images.length) {
      setCurrentImageIndex(currentImageIndex+ 1);
    }
    else {
      setCurrentImageIndex(place.images.length - photosperpage); // Optional: Loop to the last set
    }
  };
  const visiblephotos = place.images.slice(currentImageIndex, currentImageIndex + photosperpage);
  //console.log(visiblephotos)
  
  // Handle right arrow click
  
  return (
    <>
     <Navbar />
     <Header type={"list"}/>
     <Customheader/>
    <div className='main-place' >
          <div className='first-con'>
          <h3 className='place-name'>{place.name}</h3>
          <p className='place-description'>{place.description}</p>
          </div>
          <div className='arrow-left'  onClick={handlePrevClick}><FaChevronLeft  /></div>
          <div className='second-con' >
            {visiblephotos.map((image,index)=>(
             <img key={index}  className='place-image' src={image} alt={place.name} />
            ))}
          </div>
          <div onClick={handleNextClick} className='arrow-right'>< FaChevronRight   /></div>
      </div>
      <Thingstodo className="things-display" place={place}/>
    </>
  )
}

export default Placepage