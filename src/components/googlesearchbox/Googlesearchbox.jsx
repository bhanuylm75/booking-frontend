/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const AutoCompleteInput = ({ inputValue, setInputValue, onPlaceChanged }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const handleAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Handle typing in the input field
  };

  return (
    <Autocomplete
      onLoad={handleAutocompleteLoad}
      onPlaceChanged={() => onPlaceChanged(autocomplete)}
      options={{
        types: ['(cities)'], // Restrict suggestions to cities, towns, villages
      }}
    >
      <input
        type="text"
        placeholder="Where are you going?"
        className="headerSearchInput"
        value={inputValue}
        onChange={handleInputChange} // Handle typing here
        required
      />
    </Autocomplete>
  );
};

export default AutoCompleteInput;
