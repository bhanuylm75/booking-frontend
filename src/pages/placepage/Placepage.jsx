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
        <motion.div
          className="second-con"
          style={{ display: "flex", overflow: "auto" }}
        >
          <motion.div
            className="image-slider"
            drag="x"
            dragConstraints={{
              left: -(place.images.length - photosPerPage) * 200, // Adjust based on image width
              right: 0,
            }}
            dragElastic={0.1}
             
            style={{
              display: "flex",
              gap: "10px",
             
              
              cursor:"grab"
            }}
            animate={{
              x: `-${currentImageIndex * (90 / photosPerPage)}%`,
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
