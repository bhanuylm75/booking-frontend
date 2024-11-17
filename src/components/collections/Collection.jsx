/* eslint-disable react/no-unknown-property */
import "./collection.css";
import { Link, useParams,useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useQuery } from "react-query";
import axios from "axios";

const fetchCollectionData = async (collectionName) => {
  const response = await axios.get(`https://treepr.in/api/collections/${collectionName}`);
  return response.data.trips; // Adjust if response structure is different
};

const Collection = () => {
  const { collectionName } = useParams();
  const location = useLocation();
  const name = location.state; // This will contain `each.name` or `each` if you passed the entire o
  console.log(name)

  
  // Using React Query
  const { data, error, isLoading } = useQuery(
    ["collection", collectionName],
    () => fetchCollectionData(collectionName),
    {
      staleTime: Infinity, // Data will remain fresh indefinitely
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Navbar />
      <div className='banner-con'>
        <h1 className="col-head">{name}</h1>
        <hr className="thin-line"></hr>
        <div className='customcardmain'>
          {data?.map((place, index) => (
            <Link className="custom-card" key={index} to={`/${index}/${encodeURIComponent(place.name)}`} state={place}>
              <div>
                <img
                  src={place?.images[0]}
                  alt={place.name}
                  loading='lazy'
                  className="custom-card-image"
                />
                <h1>{place.name}</h1>
                <p className="description-text">{place.description.slice(0, 73)}</p>
                <hr className="thin-line"></hr>
                <div className="card-bottom">
                  <div className="left">
                    <Link to={`/stays?placeName=${encodeURIComponent(place?.name)}`}>
                      <button className="explore-btn">Book Hotels</button>
                    </Link>
                  </div>
                  <div className="right">
                    <Link to={`/${index}/${encodeURIComponent(place.name)}`} state={place}>
                      <button className="explore-btn">Explore More</button>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Collection;
