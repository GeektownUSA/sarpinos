import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';

import { useRouter } from 'next/navigation'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from './SearchPanel.module.css';
import { StyledAutocomplete } from './SearchPanel.styles';
import he from 'he';

const SearchPanel = ({ id, theme, locations, setInfoWindowOpen, getUserLocation, selectedLocation, setSelectedLocation }) => {
  const router = useRouter();
  const { setStore } = useContext(StoreContext);
  const [inputValue, setInputValue] = useState('');
  const options = useGooglePlacesAutocomplete(inputValue);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setStore(locationStore[locationNames.indexOf(location)]);
    router.push(`/pizza-delivery?location=${encodeURIComponent(location)}`);
    setInfoWindowOpen(true);
  };

  const handleUseCurrentLocation = async () => {
    await getUserLocation();
    router.push('/pizza-delivery');
  };

  const locationNames = locations.map(location => he.decode(location.title.rendered) + ', ' + location.acf.city + ', ' + location.acf.state + ' ' + location.acf.zip);
  const locationStore = locations.map(location => location.acf.name);

  return (
    <div className={theme === "map" ? styles.listSearch : styles.navSearch}>
      <button className={styles.searchBtn} onClick={handleUseCurrentLocation} style={{ whiteSpace: 'nowrap' }}>Use Current Location</button>
      <span style={{ whiteSpace: 'nowrap' }}>-OR-</span>
      <StyledAutocomplete>
        <Autocomplete
          disablePortal
          noOptionsText="Enter City, State or Zip"
          id={id}
          options={options.map((option) => option.description)}
          value={selectedLocation || null}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              handleLocationSelect(newValue);
            } else {
              localStorage.removeItem('selectedLocation');
              localStorage.removeItem('selectedStore');
              localStorage.removeItem('userLocation');
              setSelectedLocation(null);
              setStore(null);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
      </StyledAutocomplete>
      <button type="submit" className={styles.goBtn} onClick={() => router.push('/pizza-delivery')}><span className="screen-reader-text">Go</span></button>
    </div>

  );
}

export default SearchPanel;

const useGooglePlacesAutocomplete = (inputValue) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let active = true;

    if (inputValue === '' || !window?.google?.maps?.places) {
      setOptions([]);
      return undefined;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: inputValue }, (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        console.error(`Failed to get place predictions: ${status}`);
        return;
      }

      if (active) {
        setOptions(predictions || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue]);

  return options;
};