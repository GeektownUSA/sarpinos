'use client';
import React, { useContext, useState, useEffect, useRef, memo, useCallback } from 'react';
import { StoreContext } from '../context/useStoreContext';
import Image from 'next/image';
import styleInfo from './MarkerInfo.module.css';
import OrderBtn from '@/app/components/OrderBtn';
import { checkOpenStatus } from '@/app/lib/checkOpenStatus';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
} from '@vis.gl/react-google-maps';
import he from 'he';

const MarkerWithInfoWindow = memo(({ isLoading, filteredLocations, infoWindowOpen, setInfoWindowOpen, openInfoWindowId, setOpenInfoWindowId, store }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOpenTime, setCurrentOpenTime] = useState('');
  const [currentCloseTime, setCurrentCloseTime] = useState('');
  const [nextOpenTime, setNextOpenTime] = useState('');

  const { setStore } = useContext(StoreContext);


  const handleLocationSelect = useCallback((location) => {
    setStore(location.acf.name);
    setInfoWindowOpen(true);
    const status = checkOpenStatus(location);
    console.log('checkOpenStatus result:', status); // Debugging line
    setIsOpen(status.isOpen);
    setCurrentOpenTime(status.currentOpenTime || '');
    setCurrentCloseTime(status.currentCloseTime || '');
    setNextOpenTime(status.nextOpenTime || '');
  }, [setStore, setInfoWindowOpen]);

  const handleWindowClose = () => {
    setOpenInfoWindowId(null);
    setInfoWindowOpen(false);
    setIsOpen(false);
    setCurrentOpenTime('');
    setCurrentCloseTime('');
    setNextOpenTime('');
  };

  useEffect(() => {
    const selectedLocation = filteredLocations.find(filteredLocation => filteredLocation.acf.name === store);
    if (selectedLocation) {
      setOpenInfoWindowId(selectedLocation.id);
      setInfoWindowOpen(true); 
      handleLocationSelect(selectedLocation);
    }
  }, [store, filteredLocations, setOpenInfoWindowId, setInfoWindowOpen, handleLocationSelect]);

  // Create a ref for each marker
  const markerRefs = useRef([]); // Create a ref for the markerRefs array
  useEffect(() => {
    markerRefs.current = filteredLocations.map((_, i) => markerRefs.current[i] ?? React.createRef());
  }, [filteredLocations]);

  const selectedLocation = filteredLocations.find(location => location.id === openInfoWindowId);

  return (
    <>
      {filteredLocations.map((location, index) => (
        <React.Fragment key={location.id}>
          <AdvancedMarker
            ref={markerRefs.current[index]}
            onClick={() => {
              handleLocationSelect(location);
            }}
            position={{ lat: parseFloat(location.acf.latitude), lng: parseFloat(location.acf.longitude) }}
            title={he.decode(location.title.rendered)}>
            <Pin>
              <Image
                src="/sarpinos-heart.svg"
                alt="map icon"
                width={57}
                height={50} />
            </Pin>
          </AdvancedMarker>
        </React.Fragment>
      ))}
      {(!isLoading && infoWindowOpen && selectedLocation) && (
        <InfoWindow
          className={styleInfo.infoWindow}
          anchor={markerRefs.current[filteredLocations.indexOf(selectedLocation)]?.current}  // Use the current marker ref as the anchor
          maxWidth={200}
          onCloseClick={() => handleWindowClose(selectedLocation.id)}
        >
          <h5 className={styleInfo.iwTitle}>{he.decode(selectedLocation.title.rendered)}</h5>
          <p className={styleInfo.iwHours}>
            {isOpen 
              ? `Open Now: ${currentOpenTime} - ${currentCloseTime}` 
              : (nextOpenTime && nextOpenTime !== '' 
                ? `Opens at: ${nextOpenTime}` 
                : null)}
          </p>
          <p className={styleInfo.iwAddress}>
            {selectedLocation.acf.address}<br />
            {selectedLocation.acf.city}, {selectedLocation.acf.state} {selectedLocation.acf.zip}
          </p>
          <OrderBtn btnColor="dark" />
        </InfoWindow>
      )}
    </>
  );
});

MarkerWithInfoWindow.displayName = 'MarkerWithInfoWindow';

export default MarkerWithInfoWindow;