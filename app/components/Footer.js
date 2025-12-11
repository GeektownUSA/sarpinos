import Link from 'next/link';
import Image from 'next/image';
import FooterForm from './FooterForm';
import OrderGiftCard from './OrderGiftCard'
import FeedbackBtn from './FeedbackBtn';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div style={{ width: '100%' }}>
        <div className={styles.columns}>
          <div className={styles.order2}>
            <h3>Get our newsletter</h3>
            <p>See the latest updates, deals and information from Sarpino&apos;s.</p>
            <FooterForm />
            <h3>DOWNLOAD <br />OUR MOBILE APP</h3>
            <p style={{ maxWidth: '290px' }}>Get $10 off your next order by earning loyalty points while enjoying our delicious pizzas. </p>
            <div className={styles.appStoreLinks}>
              <div>
                <a href="https://apps.apple.com/us/app/sarpinos-pizzeria/id1334667520" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={"/icon-app-store.png"}
                    alt="App Store"
                    width={136}
                    height={40}
                    style={{ paddingBottom: '1rem' }}
                  />
                </a>
                {/*<a href="https://play.google.com/store/apps/details?id=com.foodtec.sarpinosusa&hl=en_US" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={"/icon-google-play.png"}
                    alt="App Store"
                    width={136}
                    height={40}
                  />
                </a>*/}
              </div>

              <Image
                src={"/qr-code-app.png"}
                alt="Scan the QR Code"
                width={95}
                height={118}
                className={styles.qrCode}
              />
            </div>
            <div style={{ display: 'flex', margin: '3rem 0' }}>
              <Image
                src={"/sarpinos-heart.svg"}
                width={66}
                height={58}
                alt="Sarpino's Heart"
              />
              <div style={{ paddingLeft: '2rem' }}>
                <p>Follow Us</p>
                <div className={styles.iconLinks}>
                  <a href="https://www.facebook.com/SarpinosPizza/" target="_blank" rel="noopener noreferrer">
                    <Image
                      src={"/icon-facebook.svg"}
                      width={20}
                      height={20}
                      alt="Facebook"
                    />
                    </a>
                  <a href="https://www.instagram.com/sarpinos_pizzeria/" target="_blank" rel="noopener noreferrer">
                    <Image
                      src={"/icon-instagram.svg"}
                      width={20}
                      height={20}
                      alt="Instagram"
                    />
                    </a>
                  {/*<a href="https://x.com/sarpinos_pizza" target="_blank" rel="noopener noreferrer">
                    <Image
                      src={"/icon-x.svg"}
                      width={20}
                      height={20}
                      alt="Twitter"
                    />
                    </a>*/}
                  <a href="https://www.youtube.com/@GosarpinosPizzeria/videos" target="_blank" rel="noopener noreferrer">
                    <Image
                      src={"/icon-youtube.svg"}
                      width={20}
                      height={20}
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.order1}>
            <div className={styles.footerMenu}>
              <div>
                <h4 className={styles.header}>Our Menu</h4>
                <ul>
                  <li><Link href="/menu/sarpinos-specialty-pizza">Full Menu</Link></li>
                  <li><Link href="/vegan-menu/vegan-pizza">Vegan Menu</Link></li>
                  <li><Link href="/catering">Catering</Link></li>
                  <li><Link href="/SarpinosPizzeria_AllergenChart.pdf" target="_blank">Allergens</Link></li>
                </ul>
                <h4 className={styles.header}>Customer Service</h4>
                <ul>
                  <li><Link href="/loyalty-program">Loyalty Program</Link></li>
                  <li><OrderGiftCard /></li>
                  <li><Link href="/pizza-delivery">Location Finder</Link></li>
                  <li><FeedbackBtn /></li>
                  <li><Link href="/sitemap">Site Map</Link></li>
                </ul>
              </div>
              <div>
                <h4 className={styles.header}>About Us</h4>
                <ul>
                  <li><a href="https://sarpinosfranchise.com/" target="_blank" rel="noopener noreferrer">Franchising Information</a></li>
                  <li><Link href="/pizza-delivery">Location Finder</Link></li>
                  <li><Link href="/download-pizza-app">Mobile App</Link></li>
                </ul>
                <h4 className={styles.header}>Contact Us</h4>
                <ul>
                  <li>Phone: <Link href="tel:018473746300">847.374.6300</Link></li>
                  <li>Email: <Link href="mailto:us@gosarpinos.com">us@gosarpinos.com</Link></li>
                </ul>
                <h4 className={styles.header}>Address</h4>
                <ul>
                  <li>200 Tri State International, Suite 550 <br />Lincolnshire, IL 60069</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-align-center" style={{ margin: '2rem auto 0' }}>
          <p>&copy;{year} Sarpino&apos;s USA, Inc. All Rights Reserved</p>
          {/*<a href="https://admin-v1.gosarpinos.com/admin/" target="_blank" className="textBtn" rel="noopener noreferrer">Franchise Login</a> | */}<Link href="/privacy" className="textBtn">Privacy Policy</Link> | <Link href="/tos" className="textBtn">Website Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}