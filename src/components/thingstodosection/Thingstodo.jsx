/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { FaStar, FaUser } from "react-icons/fa";
import "./thingstodo.css";
import Skeleton from "../skeleton/skeleton";

const para = ["MostLovedPlaces", "TouristAttractions", "Stays", "Restaurants", "Nightlife"];

const Thingstodo = ({ place }) => {
  const [statedata, setstatedata] = useState([]);
  const [selected, setSelected] = useState("MostLovedPlaces");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch("MostLovedPlaces");
  }, []);

  const handleSearch = async (ptext) => {
    setSelected(ptext);
    setLoading(true); // Set loading to true when switching
    if (ptext === "Stays") {
      navigate("/stays", { state: { searchValue: place.name } });
      return;
    }

    const query = `${ptext} in ${place.name}`;
    try {
      const response = await axios.get(`https://treepr.in/api/thingstodo`, {
        params: {
          lat: place.latitude,
          lng: place.longtitude,
          query: query,
        },
      });
      setstatedata(response.data.results);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  const getPhotoUrl = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  };

  return (
    <div className="banner-con">
      <h2>Things To See & Do</h2>
      <div className="banner-sub">
        {para.map((ptext, i) => (
          <motion.p
            key={i}
            className={selected === ptext ? "selected" : ""}
            onClick={() => handleSearch(ptext)}
            whileHover={{
              y: -5, // Move slightly up on hover
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            {ptext}
          </motion.p>
        ))}
      </div>
      <hr className="thin-line" />
      <div className="customcardmain">
        {loading
          ? // Show skeletons when loading
          (
            // Show skeletons when loading
            <Skeleton />
          ) 
          : // Show actual data when not loading
            statedata.map((place, index) => (
              <div key={index} className="custom-card">
                {place.photos && place.photos.length > 0 ? (
                  <img
                    src={getPhotoUrl(place.photos[0].photo_reference)}
                    alt={place.name}
                    loading="lazy"
                    className="custom-card-image"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/400"
                    alt="No Image Available"
                    className="fpImg"
                  />
                )}
                <h3 className="custom-card-title">{place.name}</h3>
                <hr className="thin-line" />
                <div className="card-bottom">
                  <div className="left">
                    <p className="rating">
                      <FaStar className="star-icon" /> {place.rating || "N/A"}
                    </p>
                    <p className="reviews">
                      <FaUser className="user-icon" /> {place.user_ratings_total} Reviews
                    </p>
                  </div>
                  <div className="right">
                    <Link to={`/${place.place_id}`}>
                      <button className="explore-btn">Explore More</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Thingstodo;
