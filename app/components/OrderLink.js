'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const OrderLink = ({ label, category, itemCategory }) => {
  const { store } = useContext(StoreContext);
  const { isNavLocatorActive, setIsNavLocatorActive } = useContext(NavLocatorContext);

  let formattedCategory = '';
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or return a loading spinner, placeholder, etc.
  }

  if (!store || store === 'null') {
    return (
      <button onClick={() => setIsNavLocatorActive(!isNavLocatorActive)} className='text-link'>
        {label}
      </button>
    );
  } else {
    if (category != null) {
      // Replace all hyphens in category with "%20"
      formattedCategory = category.replace(/-/g, "%20").replace(/\b\w/g, char => char.toUpperCase());

      if (category === "pizza") {
        formattedCategory = "Sarpino's%20Specialty%20Pizzas";
      }
      if (category === "deep-dish") {
        formattedCategory = "Deep%20Dish%20Pizzas";
      }
      if (category === "build-your-own") {
        formattedCategory = "Create%20your%20own";
      }
      if (category === "Vegan") {
        formattedCategory = "Vegan%20Options";
      }
    }
    if (itemCategory != null) {
      if (itemCategory != "Vegan") {

        if (itemCategory === "Wings") {
          formattedCategory = "Wings";
        }
        if (itemCategory === "Appetizers") {
          formattedCategory = "Appetizers";
        }
      }
    }
    if (itemCategory != null) {
      // Check if itemCategory is "Vegan" last, so it overwrites all other conditionals
      if (itemCategory === "Vegan") {
        formattedCategory = "Vegan%20Options";
      }
    }
    return (
      <a href={`https://${store}.gosarpinos.com/ordering/menu/${formattedCategory}`} className='text-link'>
        {label}
      </a>
    );
  }
}
export default OrderLink;