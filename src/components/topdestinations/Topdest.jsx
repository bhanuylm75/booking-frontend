import "./topdest.css"
import  { useEffect, useState,useRef } from "react";
import { Link  } from "react-router-dom";
import axios from "axios";

const Topdest = () => {
  const [data, setData] = useState(null);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://treepr.in/api/collections");
        //console.log(response)
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        //setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);
  console.log(data)

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
    {data?.map((each,i)=> {
      return (
       <Link to={`/collections/${each?.collectionName}`} state={each?.name} key={i}>
        <div   className="stack-container">
        <div className="image-stack image1">
          <img src={each?.dataone?.images[0]} alt="Image 1"/>
          
        </div>
        <div className="image-stack image2">
          <img src="https://via.placeholder.com/200x150" alt="Image 2"/>
        
        </div>
        <div className="image-stack image3">
          <img src="https://via.placeholder.com/200x150" alt="Image 3"/>
          
        </div>
        <div className="text-div">
          <div className="text">Top</div>
          <p className="name">{each.name}</p>
        </div>
      </div>
       </Link>
       
      )
    })}
    </div>
   </div>
    </div>

  )
}

export default Topdest
