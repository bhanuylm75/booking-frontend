import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Thingstodo from '../../components/thingstodosection/Thingstodo';
import Customheader from '../../components/customheader/Customheader';
import "./placepage.css";

const Placepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  const place = location.state;
  console.log(location)
  
  const deviceWidth = window.innerWidth;
  let photosperpage = 1;

  if (deviceWidth < 1024) {
    photosperpage = place?.images?.length;
  } else {
    photosperpage = 2;
  }

  const handlePrevClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentImageIndex + photosperpage < place.images.length) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const visiblephotos = place.images.slice(currentImageIndex, currentImageIndex + photosperpage);

  const isPrevDisabled = currentImageIndex === 0; // Disable left arrow if at the first image
  const isNextDisabled = currentImageIndex + photosperpage >= place.images.length; // Disable right arrow if at the last image

  return (
    <>
      <Navbar />
      
      <div className='main-place'>
        <div className='first-con'>
          <h3 className='place-name'>{place.name}</h3>
          <p className='place-description'>{place.description}</p>
        </div>

        {/* Left arrow */}
        <div className={`arrow-left ${isPrevDisabled ? 'disabled' : ''}`} onClick={!isPrevDisabled ? handlePrevClick : null}>
          <FaChevronLeft />
        </div>

        {/* Images */}
        <div className='second-con'>
          {visiblephotos.map((image, index) => (
            <img key={index} className='place-image' src={image} alt={place.name} loading='lazy' />
          ))}
        </div>

        {/* Right arrow */}
        <div className={`arrow-right ${isNextDisabled ? 'disabled' : ''}`} onClick={!isNextDisabled ? handleNextClick : null}>
          <FaChevronRight />
        </div>
      </div>

      <Thingstodo className="things-display" place={place} />
    </>
  );
};

export default Placepage;
