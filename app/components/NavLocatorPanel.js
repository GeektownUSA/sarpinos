import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from './NavLocatorPanel.module.css';
import { StyledAutocomplete } from './SearchPanel.styles';
import he from 'he';

const SearchPanel = ({ id, theme, locations, setInfoWindowOpen, getUserLocation, selectedLocation, setSelectedLocation }) => {
  const router = useRouter();
  const { setStore } = useContext(StoreContext);
  const [inputValue, setInputValue] = useState('');
  // const options = useGooglePlacesAutocomplete(inputValue);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setStore(locationStore[locationNames.indexOf(location)]);
    // router.push(`/pizza-delivery?location=${encodeURIComponent(location)}`);
    // setInfoWindowOpen(true);
  };

  // const handleUseCurrentLocation = async () => {
  //   await getUserLocation();
  //   router.push('/pizza-delivery');
  // };

  const locationNames = locations.map(location => he.decode(location.title.rendered) + ', ' + location.acf.city + ', ' + location.acf.state + ' ' + location.acf.zip);
  const locationStore = locations.map(location => location.acf.name);

  return (
    <div className={styles.navSearch}>
      <StyledAutocomplete>
        <Autocomplete
          disablePortal
          noOptionsText="Choose a location"
          id={id}
          options={locationNames.map((option) => option)}
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
          renderInput={(params) => <TextField {...params} label="Your current restaurant:" />}
        />
      </StyledAutocomplete>
      <span style={{ whiteSpace: 'nowrap' }}>-OR-</span>
      <Link href="/pizza-delivery" className='btn primary-btn navlocator-btn'><span>SEARCH LOCATIONS</span></Link>

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