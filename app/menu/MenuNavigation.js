'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useContext } from 'react';
import { ThemeContext } from '../context/useThemeProvider';

import Link from 'next/link'
import Image from 'next/image'
import styles from './MenuNavigation.module.css'
import Breadcrumbs from '@/app/components/Breadcrumbs'

export default function MenuNavigation({ mode, activeItem }) {
  const theme = useContext(ThemeContext);
  let navClass = mode === "light" ? styles.light : styles.dark;
  if (mode === "light" && theme === 'night') {
    navClass = ` ${styles.night}`;
  }
  const router = useRouter();
  const [activeNav, setActiveNav] = useState(activeItem);
  const activeRef = useRef(null);

  //  Functions to handle nav Switching
  const handleNav = (navId, href) => (event) => {
    try {
      if (typeof href !== 'string') {
        console.error('Invalid href:', href);
        return;
      }
      setActiveNav(navId);
      router.push(href);
    } catch (error) {
      console.error(error);
    }
  };

  const subnav = [
    { id: "build-your-own", label: "Create Your Own", handler: handleNav("build-your-own", "/menu/create-your-own"), href: "/menu/create-your-own" },
    { id: "pizza", label: "Pizza", handler: handleNav("sarpinos-specialty-pizza", "/menu/sarpinos-specialty-pizza"), href: "/menu/sarpinos-specialty-pizza" },
    { id: "deep-dish", label: "Deep Dish", handler: handleNav("deep-dish-pizza", "/menu/deep-dish-pizza"), href: "/menu/deep-dish-pizza" },
    { id: "calzones", label: "Calzones", handler: handleNav("calzones", "/menu/calzones"), href: "/menu/calzones" },
    { id: "wings-apps", label: "Wings & Appetizers", handler: handleNav("wings-apps", "/menu/wings-apps"), href: "/menu/wings-apps" },
    { id: "salads", label: "Salads", handler: handleNav("salads", "/menu/salads"), href: "/menu/salads" },
    { id: "sandwiches", label: "Sandwiches", handler: handleNav("sandwiches", "/menu/sandwiches"), href: "/menu/sandwiches" },
    { id: "pastas", label: "Pastas", handler: handleNav("pastas", "/menu/pastas"), href: "/menu/pastas" },
    { id: "breadsticks", label: "Breadsticks", handler: handleNav("breadsticks", "/menu/breadsticks"), href: "/menu/breadsticks" },
    { id: "desserts", label: "Desserts", handler: handleNav("desserts", "/menu/desserts"), href: "/menu/desserts" },
	{ id: "neighborhood-favs", label: "Neighborhood Favorites", handler: handleNav("neighborhood-favs", "/menu/neighborhood-favs"), href: "/menu/neighborhood-favs" }
  ];

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  }, []);

  return (
    <>
      <nav className={navClass}>
        <div className={styles.menuLabel}>
          <Image
            className={styles.menuLabelFull}
            src="/menu-label-full.png"
            alt="Full Menu"
            width={135}
            height={50}
          />
        </div>
        <ul className={styles.menuNavigation}>
          {subnav.map((nav, index) => (
            <li key={index} ref={activeNav === nav.id ? activeRef : null}>
              <Link
                href={nav.href}
                className={`${styles.navItem} ${activeNav === nav.id ? styles.active : ""}`}
                onClick={nav.handler}>{nav.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Breadcrumbs location={mode === "light" ? "white-text" : "green-text"} />
    </>
  );
}
