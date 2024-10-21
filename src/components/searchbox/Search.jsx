import { useState } from 'react';
import { format } from 'date-fns';
import {
  faBed,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const libraries = ['places'];

const Search = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, // Replace with your actual API key
    libraries,
  });

  const handleAutocompleteLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setInputValue(place.formatted_address);
        console.log('Selected Place:', place.formatted_address);
      } else {
        console.log('Place details incomplete.');
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
    }));
  };

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSearch = () => {
    if (inputValue !== '') {
      navigate('/stays', { state: { searchValue: inputValue } });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="headersearch">
      <div className="headersearchitem">
        <FontAwesomeIcon icon={faBed} className="headericon" />
        <Autocomplete
          onLoad={handleAutocompleteLoad}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="search"
            placeholder="Where are you going?"
            className="headerSearchInput"
            value={inputValue}
            onChange={handleInputChange} // Handle typing here
            required
          />
        </Autocomplete>
      </div>

      <div className="headersearchitem">
        <FontAwesomeIcon icon={faCalendarDays} className="headericon" />
        <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
          {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
        </span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="date"
            minDate={new Date()}
          />
        )}
      </div>

      <div className="headersearchitem">
        <FontAwesomeIcon icon={faPerson} className="headericon" />
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className="headerSearchText"
        >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
        {openOptions && (
          <div className="options">
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
                <button
                  disabled={options.adult <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption('adult', 'd')}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption('adult', 'i')}
                >
                  +
                </button>
              </div>
            </div>

            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                <button
                  disabled={options.children <= 0}
                  className="optionCounterButton"
                  onClick={() => handleOption('children', 'd')}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.children}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption('children', 'i')}
                >
                  +
                </button>
              </div>
            </div>

            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
                <button
                  disabled={options.room <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption('room', 'd')}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.room}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption('room', 'i')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="headersearchitem">
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;
