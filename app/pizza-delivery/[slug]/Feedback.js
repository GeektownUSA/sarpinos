'use client';
import { useEffect, useContext } from 'react';
import { StoreContext } from '@/app/context/useStoreContext';
import Script from 'next/script';
import styles from './Feedback.module.css';

const Feedback = ({ post }) => {
  const { setStore } = useContext(StoreContext); 

  useEffect(() => {
    if (post?.acf?.name) {
      setStore(post.acf.name); // Set the store context to the ACF "name"
    }

    // Function to inject the script dynamically
    const injectScript = () => {
      const script = document.createElement('script');
      script.src = "https://amplify.review-alerts.com/widget-init.js";
      script.async = true;
      script.onload = () => {
        // Reinitialize the widget after the script is loaded
        if (globalThis.AmplifyWidget) {
          globalThis.AmplifyWidget.init();
        }
      };
      document.body.appendChild(script);
    };

    // Inject the script
    injectScript();

    // Clean up the script when the component unmounts
    return () => {
      const script = document.querySelector(`script[src="https://amplify.review-alerts.com/widget-init.js"]`);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [post, setStore]);

  return (
    <div className={styles.container}>
      <div className="amplify-widget" 
           data-token={globalThis.NEXT_PUBLIC_REVIEW_TOKEN ?? process.env.NEXT_PUBLIC_REVIEW_TOKEN}
           data-widget-id="11226"
           data-widget-type="full_page"
           data-external-id={post.acf.review_tracker_id}></div>
    </div>
  );
}

export default Feedback;