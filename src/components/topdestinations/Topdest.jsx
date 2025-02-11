import "./topdest.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { useQuery } from "react-query";
import axios from "axios";

const fetchCollections = async () => {
  const response = await axios.get("https://treepr.in/api/collections");
  console.log(response)
  return response.data;
};

const Topdest = () => {
  const scrollContainerRef = useRef(null);

  const { data, isLoading, isError, error } = useQuery(
    "collections",
    fetchCollections,
    {
      staleTime: Infinity, // Cache forever (until manual invalidation)
      cacheTime: 5 * 60 * 1000, // Time to keep in cache after unused (optional)
    }
  );

  const handleLeftArrow = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const handleRightArrow = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="destdiv" ref={scrollContainerRef}>
    <div className="conn">
      <p className="para">Handpicked Collections For You</p>
      <div className="top">
        <button className="arrow" onClick={handleLeftArrow}>
          &#10094;
        </button>
        <button className="arrow" onClick={handleRightArrow}>
          &#10095;
        </button>
      </div>
    </div>

    <div className="scroll-wrapper">
      <div className="destcarddiv">
        {data?.map((each, i) => {
          return (
            <Link
              to={`/collections/${each?.collectionName}`}
              state={each?.name}
              key={i}
            >
              <motion.div className="stack-container">
                <div className="image-stack image1">
                  <img src={each?.dataone?.images[0]} alt="Image 1" />
                </div>

                <div className="image-stack image2">
                  
                </div>

                <div className="image-stack image3">
                  
                </div>

                <div className="text-div">
                  <div className="text">Top</div>
                  <p className="name">{each.name}</p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  </div>
  );
};

export default Topdest;
