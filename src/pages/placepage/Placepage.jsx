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
const placee={name: 'Goa', description: 'Famous for its pristine beaches, vibrant nightlife, Portuguese heritage, and laid-back atmosphere.', images: ["https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AXCi2Q698VZrQcr6oeG0IXHaV7A7H-huqyAEDIsG3FHaMfquersNHn5h3If5tlR72GufU_suPpdRjuTp6i2_HZieApEqXjrs_RBegaBn2XRkf-rg11y1GQ7U6oykBzR8jW2-xbCCmMSl8Q4gYYCWJtLDqtS0zqWCbyM7I1ahDpLWM_VO7mTG&key=AIzaSyBJAbu7x6Wfvc971T8DFTD0J7i8ruzXqgw"
  ,"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AXCi2Q5QX069msI5YF9Nqw62YetCTL43AwzWz3blLK6azhV9ZLMAkQ-SvEtdXyjo6XKntgjpUjcPR_rg6xkdq3qfa5ECmSyCakNRBs4osd_TR_P81nEA5MKrrbWKmPVwgeK3zwQL7M4wXFUMdJdRVOgzmNm5KwN2dMYH3BIA44VlcLgssxPJ&key=AIzaSyBJAbu7x6Wfvc971T8DFTD0J7i8ruzXqgw","https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AXCi2Q6ulfriDj4rF4CIaW9BLGwDGTHAGKpULsIYwwyijJllxfdgp0Uxf6kFazaBm99EEJ9lClGiahrlwswKXLiSD_KSkLve34nObI0UVhc_LhmZri9uvUyii92E3hVb10UxFJuy6uiba2m6X8FJGkgcGOPqUeWiTU3hNSBCfYrvlOYieJZP&key=AIzaSyBJAbu7x6Wfvc971T8DFTD0J7i8ruzXqgw","https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AXCi2Q5QX069msI5YF9Nqw62YetCTL43AwzWz3blLK6azhV9ZLMAkQ-SvEtdXyjo6XKntgjpUjcPR_rg6xkdq3qfa5ECmSyCakNRBs4osd_TR_P81nEA5MKrrbWKmPVwgeK3zwQL7M4wXFUMdJdRVOgzmNm5KwN2dMYH3BIA44VlcLgssxPJ&key=AIzaSyBJAbu7x6Wfvc971T8DFTD0J7i8ruzXqgw","https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AXCi2Q6ulfriDj4rF4CIaW9BLGwDGTHAGKpULsIYwwyijJllxfdgp0Uxf6kFazaBm99EEJ9lClGiahrlwswKXLiSD_KSkLve34nObI0UVhc_LhmZri9uvUyii92E3hVb10UxFJuy6uiba2m6X8FJGkgcGOPqUeWiTU3hNSBCfYrvlOYieJZP&key=AIzaSyBJAbu7x6Wfvc971T8DFTD0J7i8ruzXqgw"

  

], latitude: 15.2993, longitude: 74.124}



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