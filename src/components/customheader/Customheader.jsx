import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

import "./customheader.css";
const libraries = ['places'];

const Customheader = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(''); // Controls user input
  const [autocomplete, setAutocomplete] = useState(null); // Manages Autocomplete instance
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
  };

  const [today, setToday] = useState(getCurrentDate); 

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, // Replace with your actual API key
    libraries,
  });

  const handleAutocompleteLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log('Selected Place:', place);
      if (place && place.formatted_address) {
        setInputValue(place.formatted_address); // Set the selected place as the input value
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value
  };

  const handleSearch = () => {
    if (inputValue !== '') {
      navigate('/stays', { state: { searchValue: inputValue } });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="header-wrapper">
      {/* Heading and Description */}
      <h1 className="header-title">Find your next stay</h1>
      <p className="header-description">Search low prices on hotels, homes, and much more...</p>

      {/* Search container */}
      <div className="header-container">
        <div className="header-search-container">
          <div className="header-search-box">
            
            {isLoaded && (
              <Autocomplete
                onLoad={handleAutocompleteLoad}
                onPlaceChanged={handlePlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="header-search-input"
                  value={inputValue}
                  onChange={handleInputChange} // Allow user typing here
                  required
                />
              </Autocomplete>
            )}
           <FaTimes className="header-clear-icon" onClick={() => setInputValue('')} />
         
          </div>
         
        </div>

        <div className="header-date-inputs">
          <input type="date" value={today} // Set value to today's date
        onChange={(e) => setToday(e.target.value)}  className="header-input" placeholder="Check-in" />
          <input type="date" className="header-input" placeholder="Check-out" value={today} // Set value to today's date
        onChange={(e) => setToday(e.target.value)}   />
        </div>

        <div className="header-search-button">
          <button className="header-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Customheader;
