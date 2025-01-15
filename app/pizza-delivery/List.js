
import { useContext, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import styles from './List.module.css';
import Link from 'next/link';
import { checkOpenStatus } from '@/app/lib/checkOpenStatus';
import he from 'he';


const List = ({ locations, filteredLocations, setInfoWindowOpen, openInfoWindowId, setOpenInfoWindowId, store, selectedLocation, setSelectedLocation }) => {
  const listRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentOpenTime, setCurrentOpenTime] = useState('');
  const [currentCloseTime, setCurrentCloseTime] = useState('');
  const [nextOpenTime, setNextOpenTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { setStore } = useContext(StoreContext);

  const handleLocationSelect = (location) => {
    setStore(location.acf.name);
    setInfoWindowOpen(true);
  };
  const handleMetroSelect = (area) => {
    const filtered = locations.filter(location => location.acf.metro_area[0] === area);
    setSelectedLocation(area);
    setStore(null);
  };

  // Check the open status of each location
  useEffect(() => {
    filteredLocations.forEach(location => {
      const status = checkOpenStatus(location);
      location.isOpen = status.isOpen;
      location.currentOpenTime = status.currentOpenTime;
      location.currentCloseTime = status.currentCloseTime;
      location.nextOpenTime = status.nextOpenTime;
    });
  }, [filteredLocations]);

  // Set the selected location's InfoWindow to open when the store is selected
  useEffect(() => {
    const selectedLocation = locations.find(location => location.acf.name === store);
    if (selectedLocation) {
      setOpenInfoWindowId(selectedLocation.id);
      setIsLoading(false);
    }
  }, [store, setOpenInfoWindowId, locations]);

  const metroAreas = [...new Set(locations.map(location =>
    typeof location.acf.metro_area[0] === 'string' ? location.acf.metro_area[0].trim() : ''
  ))];

  useLayoutEffect(() => {
    const selectedMarkerIndex = filteredLocations.findIndex(location => location.id === openInfoWindowId);
    if (selectedMarkerIndex !== -1 && listRefs.current[selectedMarkerIndex]) {
      setTimeout(() => {
        if (listRefs.current[selectedMarkerIndex]) {
          listRefs.current[selectedMarkerIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    }
  }, [openInfoWindowId, filteredLocations]);

  return (
    <ul>
      {filteredLocations.length > 0 ? (
        filteredLocations.map((location, index) => (
          <li className={styles.listItem} key={location.id} ref={el => listRefs.current[index] = el}>
            <h5 className={styles.listTitle} onClick={() => handleLocationSelect(location)}>{he.decode(location.title.rendered)}</h5>
            <div className={styles.listColumns}>
              <div>
                <p><strong>{location.isOpen ? `Open Now: ${location.currentOpenTime || ''} - ${location.currentCloseTime || ''}` : 
                (nextOpenTime && nextOpenTime !== '' 
                ? `Opens at: ${nextOpenTime}` 
                : null)}</strong></p>
                <p>{location.acf.address}<br />
                  {location.acf.city}, {location.acf.state} {location.acf.zip}
                </p>
                <Link className="text-link" href={location.acf.google_url.url || `https://www.google.com/maps?saddr=Your+Location&daddr=${he.decode(location.title.rendered)}`} target="_blank">Directions</Link><br />
                <Link className="text-link" href={`/pizza-delivery/${location.slug}`} onClick={() => setStore(location.acf.name)}>See Store Info</Link>
              </div>
              <div>
              <p className={styles.phone}>
                  {location.acf.phone_number && (
                    <a href={`tel:01${location.acf.phone_number.replace(/-/g, '')}`}>
                      {location.acf.phone_number}
                    </a>
                  )}
                </p>
                <a href={`https://${location.acf.name}.gosarpinos.com/ordering/menu/`} onClick={() => handleLocationSelect(location)} className="btn primary-btn"><span>Order Now</span></a>

              </div>
            </div>

          </li>
        ))
      ) : (
        <li>
          {selectedLocation ? <h4>The closest Sarpino&apos;s store is more than 30 miles away. Try one of these metro areas:</h4> : <h4>No location selected, try one of these metro areas:</h4>}
          <ul>
            {metroAreas.map((area, index) => (
              <li key={index}>
                <button className={styles.areaBtn} onClick={() => handleMetroSelect(area)}>{area}</button>
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  );
};

export default List;