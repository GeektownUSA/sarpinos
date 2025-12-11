'use client'
import dynamic from 'next/dynamic'
import { useContext } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { ThemeContext } from '../context/useThemeProvider';
import { NavLocatorContext } from '../context/useNavLocatorContext';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useLocation } from '../context/useLocation';
import React, { useState, useEffect, useRef } from 'react';
import { fetchPageData, fetchCPTData, fetchACFImage, fetchLocations } from '@/app/lib/utils';
import { APIProvider } from '@vis.gl/react-google-maps';

import Link from 'next/link';
import Image from 'next/image';
import OrderBtn from './OrderBtn';
import './Navigation.css';
import stylesMobile from './NavigationMobile.module.css';

import NavLocatorPanel from './NavLocatorPanel';
const DynamicSearchPanel = dynamic(() => import('./SearchPanel'));

export default function Navigation() {

  const theme = useContext(ThemeContext);
  const isDay = theme === 'day';

  const { store } = useContext(StoreContext);

  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const { getUserLocation, selectedLocation, setSelectedLocation, locations, setSelectedStore } = useLocation();
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [featuredCouponTitle, setFeaturedCouponTitle] = useState(null);
  const [featuredCouponName, setFeaturedCouponName] = useState(null);
  const [locationsData, setLocationsData] = useState([]);
  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const data = await fetchLocations();
        setLocationsData(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocationsData();
  }, []);
  const metroAreas = [...new Set(locationsData.map(location =>
    typeof location.acf.metro_area[0] === 'string' ? location.acf.metro_area[0].trim() : ''
  ))];
  const handleMetroSelect = (area) => {
    setSelectedLocation(area);
    router.push(`/pizza-delivery?location=${encodeURIComponent(area)}`);
  };
  const handleMetroReplace = (area) => {
    setSelectedLocation(area);
    window.location.href = `/pizza-delivery?location=${encodeURIComponent(area)}`;
  };


  // Get the selected location from the URL query parameters
  useEffect(() => {
    if (router.query && router.query.location) {
      setSelectedLocation(decodeURIComponent(router.query.location));
    }
  }, [router.query, setSelectedLocation]);

  const [featuredImages, setFeaturedImages] = useState({});
  useEffect(() => {
    const pageIds = [91, 34, 1022];

    pageIds.forEach(async (id) => {
      try {
        const pageData = await fetchPageData(id);

        // Assuming the ACF image ID is stored in a field named 'acf_image'
        const acfImageId = pageData.acf?.hero_image;
        if (acfImageId) {
          const acfImageData = await fetchACFImage(acfImageId);
          if (acfImageData) {
            setFeaturedImages(prevImages => ({
              ...prevImages,
              [id]: {
                url: acfImageData.sourceUrl,
                alt: acfImageData.altText
              }
            }));
          }
        }
      } catch (error) {
        console.error(`Error fetching data for page ${id}:`, error);
      }
    });
  }, []);

  // handle desktopmenu dropdowns
  const { isNavLocatorActive, setIsNavLocatorActive } = useContext(NavLocatorContext);
  const navLocatorRef = useRef(null);
  const [activeMenus, setActiveMenus] = useState({});
  const myRef1 = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const myRef4 = useRef(null);
  const handleSubmenu = (menu) => {
    setActiveMenus(prevState => {
      // Create a new state object with all menus inactive
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // If the clicked menu was already active, keep it inactive
      // Otherwise, set it to active
      newState[menu] = !prevState[menu];

      return newState;
    });
  };

  // handle mobile menu
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleMobile = () => {
    setToggleMenu(!toggleMenu);
  };

  const [activeMobileMenus, setActiveMobileMenus] = useState({});
  const handleMobileSubmenu = (menu) => {
    setActiveMobileMenus(prevState => {
      // Create a new state object with all menus inactive
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Set the clicked menu to active
      newState[menu] = true;

      return newState;
    });
  };

  // close menu dropdowns when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !myRef1.current?.contains(event.target) &&
        !myRef2.current?.contains(event.target) &&
        !myRef3.current?.contains(event.target) &&
        !myRef4.current?.contains(event.target) &&
        !navLocatorRef.current?.contains(event.target)
      ) {
        setActiveMenus({
          About: false,
          Menu: false,
          Locations: false,
        });
        setIsNavLocatorActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, { passive: true });
    };
  }, [setIsNavLocatorActive]);

  useEffect(() => {
    if (pathname === '/pizza-delivery') {
      setActiveMenus(prevMenus => ({ ...prevMenus, Locations: false }));
    }
  }, [pathname]);

  // get specials data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await fetchCPTData(['specials']);

        const featuredCoupons = posts
          .filter(post => post.acf?.menu_category?.includes('Featured Specials'));

        const featuredCoupon = featuredCoupons
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        if (featuredCoupon) {
          setFeaturedCouponTitle(featuredCoupon.title.rendered);
          setFeaturedCouponName(featuredCoupon.acf?.title_of_special);
        }
      } catch (error) {
        console.error('Error fetching Coupons:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <nav className={`main-navigation ${featuredCouponName && isHomePage ? 'homepage-nav' : ''}`}>
      {featuredCouponName && <div className={`coupon-callout ${isDay === false ? 'night-theme' : ''}`}>
        <span><span className='coupon-name'><strong>{featuredCouponName || ''}&nbsp;</strong></span><span>{featuredCouponName && ' with code '} <strong className='coupon-code'>{featuredCouponTitle || ''}</strong></span></span><span>{featuredCouponName && <OrderBtn location="coupon" />}</span> 
      </div>}
      <div className={`navbar ${isDay === false ? 'night-theme' : ''}`}>
        <Link href="/" className="logo" title="Go to Sarpino&apos;s Home page">
          <Image
            src={'/sarpinos-logo.svg'}
            width={165}
            height={50}
            alt="Sarpino&apos;s Pizzeria Logo"
          />
        </Link>
        <button
          className={`hamburger hamburger--squeeze ${toggleMenu ? 'is-active' : ''}`}
          aria-expanded={toggleMenu}
          aria-haspopup="true"
          aria-controls="mobilemenu"
          aria-label="Toggle mobile navigation menu"
          aria-labelledby="mobilemenu"
          role="button"
          onClick={handleMobile}>
          <span aria-hidden="true">&#x2630;</span>
        </button>
        <ul className="desktopmenu">
          <li className="item has-submenu">
            <Link
              className={`${activeMobileMenus['About'] ? 'active' : ''}`}
              href="/company" onClick={(e) => { e.preventDefault(); handleSubmenu('About') }}>About Us</Link>
          </li>
          <li className="item has-submenu">
            <Link
              className={`${activeMobileMenus['Menu'] ? 'active' : ''}`}
              href="/menu/sarpinos-specialty-pizza" onClick={(e) => { e.preventDefault(); handleSubmenu('Menu') }}>Menu</Link>
          </li>
          <li className="item"><Link href="/catering">Catering</Link></li>
          <li className="item has-submenu">
            <Link
              className={`${activeMobileMenus['Locations'] ? 'active' : ''}`}
              href="/pizza-delivery" onClick={(e) => { e.preventDefault(); handleSubmenu('Locations') }}>Find Locations</Link>
          </li>
		  <li className="item"><Link href="/contact-corporate">Contact</Link></li>
		  <li className="item"><Link href="/employment">Employment</Link></li>
        </ul>
        <ul className="desktoplinks">
          <li className="item button heart">
            <Link href="/loyalty-program">Loyalty Sign-In</Link>
          </li>
          <li className="item button">
            <OrderBtn />
          </li>
        </ul>
      </div>
      <div className={`navbar-dropdowns ${Object.values(activeMenus).some(value => value) ? 'dropdown-active' : ''} ${isNavLocatorActive ? 'navlocator-active' : ''} ${isDay === false ? 'night-theme' : ''}`}>
        {activeMenus['About'] && (
          <ul ref={myRef1} className={`item submenu about ${activeMenus['About'] ? 'active' : ''}`}>
            <li className="subitem"><Link href="/company" onClick={() => handleSubmenu('About')}>Company Info</Link></li>
            <li className="subitem"><Link href="/why-sarpinos" onClick={() => handleSubmenu('About')}>Why Sarpino&apos;s?</Link></li>
            <li className="subitem"><Link href="/blog" onClick={() => handleSubmenu('About')}>Sarpino&apos;s Blog</Link></li>
          </ul>
        )}
        {activeMenus['Menu'] && (
          <ul ref={myRef2} className={`item submenu menu ${activeMenus['Menu'] ? 'active' : ''}`}>
            <li className="subitem has-submenu with-thumbs">
              <ul>
                <li className="subitem">
                  <Link href="/menu/create-your-own" onClick={() => handleSubmenu('Menu')}>
                    {featuredImages[91] && (
                      <Image
                        className="featured-image"
                        src={featuredImages[91].url}
                        alt={featuredImages[91].alt}
                        width={191}
                        height={43}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    )}
                    Create Your Own
                  </Link>
                </li>
                <li className="subitem">
                  <Link href="/menu/sarpinos-specialty-pizza" onClick={() => handleSubmenu('Menu')}>
                    {featuredImages[34] && (
                      <Image
                        className="featured-image"
                        src={featuredImages[34].url}
                        alt={featuredImages[34].alt}
                        width={191}
                        height={43} />
                    )}
                    Specialty Pizza
                  </Link>
                </li>
                <li className="subitem">
                  <Link
                    href="/vegan-menu/vegan-pizza"
                    onClick={() => { handleSubmenu('Menu'); }}
                  >
                    {featuredImages[1022] && (
                      <Image
                        className="featured-image"
                        src={featuredImages[1022].url}
                        alt={featuredImages[1022].alt}
                        width={191}
                        height={43} />
                    )}
                    Vegan Pizza
                  </Link>
                </li>
              </ul>
            </li>
            <li className="subitem has-submenu without-thumbs">
              <ul>
                <li className="subitem"><Link href="/menu/sarpinos-specialty-pizza" onClick={() => handleSubmenu('Menu')}>Full Menu</Link></li>
                <li className="subitem"><Link href="/menu/create-your-own" onClick={() => handleSubmenu('Menu')}>Create Your Own</Link></li>
                <li className="subitem"><Link href="/vegan-menu/vegan-pizza" onClick={() => handleSubmenu('Menu')}>Vegan Menu</Link></li>
                <li className="subitem"><Link href="/menu/national-specials" onClick={() => handleSubmenu('Menu')}>Specials & Promotions</Link></li>
              </ul>
            </li>
          </ul>
        )}
        {pathname !== '/pizza-delivery' && activeMenus['Locations'] && (
          // If Not Locations page
          <ul ref={myRef3} className={`item submenu locations ${activeMenus['Locations'] ? 'active' : ''}`}>
            <li className="subitem has-submenu without-thumbs">
              <ul>
                <li className="subitem">
                  <h6 className="subitem-title">Search Sarpino&apos;s Locations</h6>
                </li>

                <li className="subitem">
                  <APIProvider
                    async={true}
                    apiKey={globalThis.NEXT_PUBLIC_GOOGLEMAPS_API_KEY ?? (process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY)}
                    libraries={['places']}
                  ><DynamicSearchPanel
                      id="autocomplete-nav"
                      getUserLocation={getUserLocation}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                      setSelectedStore={setSelectedStore}
                      locations={locations}
                      setInfoWindowOpen={setInfoWindowOpen} />
                  </APIProvider>
                </li>
              </ul>
            </li>
            <li className="subitem has-submenu">
              <ul>
                <li>
                  <h6 className="subitem-title">Search By Metro Area</h6>
                </li>
                <li>
                  <ul className="areas-list">{metroAreas.map((area, index) => (
                    <li key={index}>
                      <button className="area-button" onClick={() => handleMetroSelect(area)}>{area}</button>
                    </li>
                  ))}</ul>
                </li>
              </ul>
            </li>
          </ul>
        )}
        {pathname === '/pizza-delivery' && activeMenus['Locations'] && (
          // If Locations page
          <ul ref={myRef4} className={`item submenu locations ${activeMenus['Locations'] ? 'active' : ''}`}>
            <li className="subitem has-submenu">
              <ul style={{ maxWidth: '650px', padding: '0 2rem' }}>
                <li>
                  <h6 className="subitem-title">Search By Metro Area</h6>
                </li>
                <li>
                  <ul className="areas-list">{metroAreas.map((area, index) => (
                    <li key={index}>
                      <button className="area-button" onClick={() => handleMetroReplace(area)}>{area}</button>
                    </li>
                  ))}</ul>
                </li>
              </ul>
            </li>
          </ul>
        )}
        {isNavLocatorActive && (
          <ul ref={navLocatorRef} className={`item submenu navlocator ${isNavLocatorActive ? 'active' : ''}`}>
            <li className="subitem has-submenu without-thumbs">
              <ul>
                <li className="subitem">
                  <h6 className="subitem-title-large">Please choose your restaurant first:</h6>
                </li>

                <li className="subitem">
                  <NavLocatorPanel
                    id="autocomplete-nav"
                    getUserLocation={getUserLocation}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    setSelectedStore={setSelectedStore}
                    locations={locations}
                    setInfoWindowOpen={setInfoWindowOpen} />
                  {store || !store === 'null' ? <p className='white-text'>Thank you! You have chosen Sarpino&apos;s {store} as your local restaurant.</p> : ''}
                </li>
              </ul>
            </li>
          </ul>
        )}
      </div>
      <ul className={`${stylesMobile.dropdown} ${toggleMenu ? stylesMobile.active : ''} ${isDay === false ? stylesMobile.nightTheme : ''}`}>
        <li className={`${stylesMobile.item} button heart`}><Link href="/loyalty-program" onClick={handleMobile}>Loyalty Sign-In</Link></li>
        <li className={stylesMobile.sliderItems}>
          <ul className={`${stylesMobile.slider} ${(activeMobileMenus['About'] || activeMobileMenus['Menu']) ? stylesMobile.active : ''}`}>
            <li className={`${stylesMobile.item} has-submenu`}>
              <Link
                className={`${activeMobileMenus['About'] ? stylesMobile.active : ''}`}
                href="/company" onClick={(e) => { e.preventDefault(); handleMobileSubmenu('About') }}>
                About Us
              </Link>
            </li>
            <li className={`${stylesMobile.item} has-submenu`}>
              <Link
                className={`${activeMobileMenus['Menu'] ? stylesMobile.active : ''}`}
                href="/menu/sarpinos-specialty-pizza" onClick={(e) => { e.preventDefault(); handleMobileSubmenu('Menu') }}>
                Menu
              </Link>
            </li>
            <li className={`${stylesMobile.item}`}><Link href="/catering" onClick={handleMobile}>Catering</Link></li>
            <li className={`${stylesMobile.item}`}><Link href="/pizza-delivery" onClick={handleMobile}>Find Locations</Link></li>
			<li className={`${stylesMobile.item}`}><Link href="/contact-corporate" onClick={handleMobile}>Contact</Link></li>
			<li className={`${stylesMobile.item}`}><Link href="/employment" onClick={handleMobile}>Employment</Link></li>
          </ul>
          <ul className={`${stylesMobile.item} ${stylesMobile.sliderSubmenu} ${activeMobileMenus['About'] ? stylesMobile.active : ''}`}>
            <li className={`subitem ${stylesMobile.closeSubmenu}`}>
              <Link href="/company" onClick={(e) => { e.preventDefault(); handleMobileSubmenu('') }}>
                About Us
              </Link>
            </li>
            <li className="subitem"><Link href="/company" onClick={handleMobile}>Company Info</Link></li>
            <li className="subitem"><Link href="/why-sarpinos" onClick={handleMobile}>Why Sarpino&apos;s?</Link></li>
            <li className="subitem"><Link href="/blog" onClick={handleMobile}>Sarpino&apos;s Blog</Link></li>
          </ul>
          <ul className={`${stylesMobile.item} ${stylesMobile.sliderSubmenu} ${activeMobileMenus['Menu'] ? stylesMobile.active : ''}`}>
            <li className={`subitem ${stylesMobile.closeSubmenu}`}>
              <Link href="/menu/sarpinos-specialty-pizza" onClick={(e) => { e.preventDefault(); handleMobileSubmenu('') }}>
                Menu
              </Link>
            </li>
            <li className="subitem"><Link href="/menu/sarpinos-specialty-pizza" onClick={handleMobile}>Full Menu</Link></li>
            <li className="subitem"><Link href="/menu/create-your-own" onClick={handleMobile}>Create Your Own</Link></li>
            <li className="subitem"><Link href="/vegan-menu/vegan-pizza" onClick={handleMobile}>Vegan Menu</Link></li>
            <li className="subitem"><Link href="/menu/national-specials" onClick={handleMobile}>Specials & Promotions</Link></li>
          </ul>
        </li>
      </ul>

    </nav>
  );
}