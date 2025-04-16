'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'
import { useLocation } from '../context/useLocation';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { fetchLocations } from '@/app/lib/utils';
import { geocode, calculateDistance } from '@/app/lib/geocode';
import styles from './Map.module.css';
import MarkerWithInfoWindow from './MarkerWithInfowindow';
import Header from './Header';

const DynamicSearchPanel = dynamic(() => import('@/app/components/SearchPanel'));
// import List from './List';
const DynamicList = dynamic(() => import('./List'));
import he from 'he';

const MapHero = ({ posts, data, urlSearchLocation }) => {
  const { store } = useContext(StoreContext);
  const router = useRouter();
  const { selectedLocation, setSelectedLocation, userLocation, setUserLocation, locations, setLocations, getUserLocation, sortLocationsByDistance, setSelectedStore } = useLocation();
  const [mapCenter, setMapCenter] = useState({ lat: 41, lng: -94 }); // Initial map center
  const [mapZoom, setMapZoom] = useState(5); // Initial zoom level
  const markerRefs = useRef([]); // Create a reference for markerRefs
  const [openInfoWindowId, setOpenInfoWindowId] = useState(null); // Store the ID instead of the index

  const [isLoading, setIsLoading] = useState(true);
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  useEffect(() => {
    // Simulate a delay before the map is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Get the selected location from the URL query parameters
  useEffect(() => {
    
    if (urlSearchLocation) {
      //console.log("url location set");
      setSelectedLocation(decodeURIComponent(urlSearchLocation));
    }
  }, [urlSearchLocation, setSelectedLocation]);


  useEffect(() => {
    const geocodeLocation = async () => {
      if (selectedLocation) {
        const coordinates = await geocode(selectedLocation);
        if (coordinates) {
          setSelectedCoordinates(coordinates);
          setMapCenter(coordinates);
          setMapZoom(10);
          // Find the selected location and open its InfoWindow
          const selected = locations.find(location => he.decode(location.title.rendered) + ', ' + location.acf.city + ', ' + location.acf.state + ' ' + location.acf.zip === selectedLocation);
          if (selected) {
            setOpenInfoWindowId(selected.id);

          }

        }
      }
    };

    geocodeLocation();
  }, [locations, selectedLocation]);

  // refocus the center of the map whenever the user's location is set
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
      setMapZoom(10);
    }
  }, [userLocation]);

  // refocus the center of the map whenever the list of locations is clicked
  useEffect(() => {
    const getLocations = async () => {
      const locationsData = await fetchLocations();
      locationsData.forEach((location, index) => {
        location.id = index;
      });
      setLocations(locationsData);
      // Initialize markerRefs array
      markerRefs.current = locationsData.map((_, i) => markerRefs.current[i] ?? React.createRef());
    };

    getLocations();
  }, [setLocations]);

  // check if selectedCoordinates is not empty, 
  // then filter by selectedCoordinates, 
  // otherwise filter by userLocation

  const filteredLocations = locations.filter(location => {
    if (selectedCoordinates) {
      return calculateDistance(selectedCoordinates, { lat: location.acf.latitude, lng: location.acf.longitude }) <= 90000;
    } else if (userLocation) {
      return calculateDistance(userLocation, { lat: location.acf.latitude, lng: location.acf.longitude }) <= 50000;
    }
    return true;
  });

  const sortedLocations = sortLocationsByDistance(filteredLocations, selectedCoordinates || userLocation);

  useEffect(() => {
    if (!selectedLocation) {
      setSelectedCoordinates(null);
      setMapZoom(5);
      setMapCenter({ lat: 41, lng: -94 });
    }
  }, [selectedLocation]);

  return (
    <section className={styles.mapContainer}>
      <div className="responsive-column-container cream-color" style={{ height: '100%' }}>
        <div className={styles.map}>
          <APIProvider
            async={true}
            apiKey={globalThis.NEXT_PUBLIC_GOOGLEMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY)}
            libraries={['places']}>
            <Map
              mapId={data.acf?.map_style_id}
              zoom={mapZoom}
              // scrollwheel={false}
              center={mapCenter}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              <MarkerWithInfoWindow
                filteredLocations={sortedLocations}
                openInfoWindowId={openInfoWindowId}
                setOpenInfoWindowId={setOpenInfoWindowId}
                store={store}
                isLoading={isLoading}
                infoWindowOpen={infoWindowOpen}
                setInfoWindowOpen={setInfoWindowOpen} />

            </Map>
          </APIProvider>
        </div>
        <div className={styles.list}>
          <div className={styles.listContainer}>
            <DynamicSearchPanel
              id="autocomplete-map"
              theme="map"
              getUserLocation={getUserLocation}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              setSelectedStore={setSelectedStore}
              locations={locations}
              setInfoWindowOpen={setInfoWindowOpen} />
            <Header filteredLocations={sortedLocations} selectedLocation={selectedLocation} />
            <DynamicList
              posts={posts}
              locations={locations}
              filteredLocations={sortedLocations}
              openInfoWindowId={openInfoWindowId}
              setOpenInfoWindowId={setOpenInfoWindowId}
              setSelectedStore={setSelectedStore}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              store={store}
              infoWindowOpen={infoWindowOpen}
              setInfoWindowOpen={setInfoWindowOpen} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapHero;