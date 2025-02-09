import "./collection.css";
import { Link, useParams, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import Skeleton from "../skeleton/skeleton";

const fetchCollectionData = async (collectionName) => {
  const response = await axios.get(`https://treepr.in/api/collections/${collectionName}`);
  return response.data.trips;
};

const Collection = () => {
  const { collectionName } = useParams();
  const location = useLocation();
  const name = location.state || collectionName;

  const { data, error, isLoading } = useQuery(
    ["collection", collectionName],
    () => fetchCollectionData(collectionName),
    { staleTime: Infinity }
  );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Navbar />
      <div className='banner-con'>
        <h1 className="col-head">{name}</h1>
        <hr className="thin-line" />
        <div className='customcardmain'>
          {isLoading ? <Skeleton /> : data?.map((place, index) => (
            <Link className="custom-card" key={index} to={`/${index}/${encodeURIComponent(place.name)}`} state={place}>
              <img
                src={place?.images[0]}
                alt={place.name}
                loading='lazy'
                className="custom-card-image"
              />
              <h1>{place.name}</h1>
              <p className="description-text">{place.description.slice(0, 73)}...</p>
              <hr className="thin-line" />
              <div className="card-bottom">
                <Link to={`/stays?placeName=${encodeURIComponent(place?.name)}`}>
                  <button className="explore-btn">Book Hotels</button>
                </Link>
                <Link to={`/${index}/${encodeURIComponent(place.name)}`} state={place}>
                  <button className="explore-btn">Explore More</button>
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Collection;
