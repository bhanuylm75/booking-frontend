import {useState}from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa';
import "./customheader.css"

const Customheader = () => {
  const [inputValue, setInputValue] = useState('');
  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log('Selected Place:', place);
      if (place && place.formatted_address) {
        setInputValue(place.formatted_address); // Set the selected place as the input value
      }
    }
  };
  return (
    <div className="header-wrapper">
      {/* Heading and Description outside the yellow border */}
      <h1 className="header-title">Find your next stay</h1>
      <p className="header-description">Search low prices on hotels, homes and much more...</p>

      {/* Search container with border */}
      <div className="header-container">
        <div className="header-search-container">
          <div className="header-search-box">
            <FaSearch className="header-search-icon" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="header-search-input"
            />
            <FaTimes className="header-clear-icon" />
          </div>
        </div>

        <div className="header-date-inputs">
          <input type="date" className="header-input" placeholder="Check-in" />
          <input type="date" className="header-input" placeholder="Check-out" />
        </div>

        <div className="header-search-button">
          <button className="header-button">Search</button>
        </div>
      </div>
    </div>
  );
  
}

export default Customheader