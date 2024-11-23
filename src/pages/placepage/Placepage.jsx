import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import Thingstodo from "../../components/thingstodosection/Thingstodo";
import "./placepage.css";
import { motion } from "framer-motion";

const Placepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  const place = location.state;
  
  const deviceWidth = window.innerWidth;
  const photosPerPage = deviceWidth < 1024 ? place?.images?.length : 2;
  const isSmallOrMedium = deviceWidth < 1024;


  const handlePrevClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentImageIndex + photosPerPage < place.images.length) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(place.images.length - photosPerPage); // Ensures we stop at the last full set
    }
  };

  const isPrevDisabled = currentImageIndex === 0;
  const isNextDisabled =
    currentImageIndex + photosPerPage >= place.images.length;

  return (
    <>
      <Navbar />
      <div className="main-place">
        <div className="first-con">
          <motion.h3 className="place-name">{place.name}</motion.h3>
          <p className="place-description">{place.description}</p>
        </div>

        {/* Left Arrow */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`arrow-left ${isPrevDisabled ? "disabled" : ""}`}
          onClick={!isPrevDisabled ? handlePrevClick : null}
        >
          <FaChevronLeft />
        </motion.div>

        {/* Images */}
        {isSmallOrMedium?  <div className="second-con">
  {place.images
    .slice(currentImageIndex, currentImageIndex + photosPerPage)
    .map((image, index) => (
      <img
        key={index}
        className="place-image"
        src={image}
        alt={place.name}
        loading="lazy"
      />
    ))}
</div>: <motion.div
          className="second-con"
          style={{ display: "flex", overflow:"hidden" }}
        >
          <motion.div
            className="image-slider"
           
             
            style={{
              display: "flex",
              gap: "5px",
             
              
              cursor:"grab"
            }}
            animate={{
              x: `-${currentImageIndex * (50 + (9 / deviceWidth) * 100)}%`, // Accounts for gap and width
            }}
            whileTap={{ cursor: "grabbing" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 15,
            }}
          >
            {place.images.map((image, index) => (
              <img
                key={index}
                className="place-image"
                src={image}
                alt={place.name}
                loading="lazy"
                
              />
            ))}
          </motion.div>
        </motion.div>
}

        {/* Right Arrow */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`arrow-right ${isNextDisabled ? "disabled" : ""}`}
          onClick={!isNextDisabled ? handleNextClick : null}
        >
          <FaChevronRight />
        </motion.div>
      </div>

      <Thingstodo className="things-display" place={place} />
    </>
  );
};

export default Placepage;
