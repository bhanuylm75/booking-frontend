import  { useState } from 'react';
import './filter.css';

const Filterbox = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    propertyType: [],
    amenities: [],
    priceRange: [],
  });

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prevState) => {
      const updatedCategory = prevState[category].includes(value)
        ? prevState[category].filter((item) => item !== value)
        : [...prevState[category], value];
      return { ...prevState, [category]: updatedCategory };
    });
  };

  const filters = {
    propertyType: ['House', 'Apartment', 'Villa', 'Cabin'],
    amenities: ['WiFi', 'Parking', 'Pool', 'Gym'],
    priceRange: ['Under $100', '$100-$200', 'Above $200'],
  };

  return (
   <div className='filterbox'>
     <div className="filterContainer">
      <h2 className="filterHeading">Filter by</h2>
      <div className="filterSection">
        <h3 className="subHeading">Property Type</h3>
        <ul className="filterList">
          {filters.propertyType.map((type) => (
            <li key={type}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.propertyType.includes(type)}
                  onChange={() => handleCheckboxChange('propertyType', type)}
                />
                {type}
              </label>
            </li>
          ))}
        </ul>
        <hr />
      </div>

      <div className="filterSection">
        <h3 className="subHeading">Amenities</h3>
        <ul className="filterList">
          {filters.amenities.map((amenity) => (
            <li key={amenity}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.amenities.includes(amenity)}
                  onChange={() => handleCheckboxChange('amenities', amenity)}
                />
                {amenity}
              </label>
            </li>
          ))}
        </ul>
        <hr />
      </div>

      <div className="filterSection">
        <h3 className="subHeading">Price Range</h3>
        <ul className="filterList">
          {filters.priceRange.map((range) => (
            <li key={range}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.priceRange.includes(range)}
                  onChange={() => handleCheckboxChange('priceRange', range)}
                />
                {range}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
   </div>
  );
};

export default Filterbox;
