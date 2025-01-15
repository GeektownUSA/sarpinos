'use client';
import {useState} from 'react';
import Image from 'next/image';
import ShareThis from './ShareThis';
import styles from './ShareToggle.module.css';

const ShareToggle = ({post}) => {
  const [showShare, setShowShare] = useState(false);

  return (
    <div className={styles.shareToggle}>
      <button 
        className={styles.btnText} 
        onClick={() => setShowShare(!showShare)}>
          <span>Share</span> <Image src="/icon-share.svg" width={14} height={14} alt="Share" />
      </button>
      {showShare && 
        <div className={styles.shareThis}>
        <ShareThis post={post}  />
        </div>
      }
    </div>
  );
}

export default ShareToggle;