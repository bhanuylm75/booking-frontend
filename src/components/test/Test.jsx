/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Autocomplete } from '@react-google-maps/api';
import './test.css';

const libraries = ['places'];

const Test= () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:import.meta.env.VITE_GOOGLE_API_KEY, // Replace with your Google Maps API Key
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place) {
      console.log('Selected Place:', place);
      // Handle the selected place (like updating the state, making API calls, etc.)
    }
  };

  const handleAutocompleteLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="autocomplete-container">
      <Autocomplete
        onLoad={handleAutocompleteLoad}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search for places..."
          className="search-input"
          value={inputValue}
          options={{
            types: ["(cities)"], // Restrict to cities, towns, villages
            // Restrict to specific country (optional)
          }}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Autocomplete>
    </div>
  );
};

export default Test;
