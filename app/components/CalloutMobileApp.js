'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CalloutMobileApp.module.css';
import stylesF from './Footer.module.css';

const CalloutMobileApp = ({ calloutImage, calloutItem }) => {

  return (
    <>
      <section className={`viewport gray-color ${styles.bkg}`}>
        <Image
          src={calloutImage ? calloutImage.sourceUrl : '/pizza-background-callout.jpg'}
          alt="Pizza Background"
          fill
          className={styles.bkgImage}
        />
        <div className={styles.callout}>
          <div className="responsive-column-container">
            <div className={styles.column}>
              <h3 className={styles.title}>
                {'Order on our Mobile App'}
              </h3>
              <p>{`Get $10 off your next order by earning loyalty points while enjoying our delicious ${calloutItem ? calloutItem + ' and pizzas' : 'pizzas'}.`} </p>
              <div className={stylesF.appStoreLinks}>
                <div>
                 <a href={'https://apps.apple.com/us/app/sarpinos-pizzeria/id1334667520'} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={"/icon-app-store.png"}
                      alt="App Store"
                      width={136}
                      height={40}
                      style={{ paddingBottom: '1rem' }}
                    />
                    </a>
                 <a href={'https://play.google.com/store/apps/details?id=com.foodtec.sarpinosusa&hl=en_US'} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={"/icon-google-play.png"}
                      alt="App Store"
                      width={136}
                      height={40}
                    />
                    </a>
                </div>

                <Image
                  src={"/qr-code-app.png"}
                  alt="Scan the QR Code"
                  width={78}
                  height={97}
                  className={stylesF.qrCode}
                />
              </div>
            </div>
            <div className={styles.column}>
              <Image
                src={"/mobile-order-coupon.webp"}
                alt="Mobile Order Coupon"
                width={200}
                height={200}
                className={styles.coupon}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalloutMobileApp;