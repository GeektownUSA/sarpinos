'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useContext } from 'react';
import { ThemeContext } from '../context/useThemeProvider';

import Link from 'next/link'
import Image from 'next/image'
import styles from '../menu/MenuNavigation.module.css'
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
    { id: "pizza", label: "Pizza", handler: handleNav("sarpinos-specialty-pizza", "/vegan-menu/vegan-pizza"), href: "/vegan-menu/vegan-pizza" },
    { id: "deep-dish", label: "Deep Dish", handler: handleNav("deep-dish-pizza", "/vegan-menu/vegan-deep-dish-pizza"), href: "/vegan-menu/vegan-deep-dish-pizza" },
    { id: "calzones", label: "Calzones", handler: handleNav("calzones", "/vegan-menu/vegan-calzones"), href: "/vegan-menu/vegan-calzones" },
    { id: "wings-apps", label: "Wings & Appetizers", handler: handleNav("wings-apps", "/vegan-menu/vegan-wings-apps"), href: "/vegan-menu/vegan-wings-apps" },
    { id: "salads", label: "Salads", handler: handleNav("salads", "/vegan-menu/vegan-salads"), href: "/vegan-menu/vegan-salads" },
    { id: "sandwiches", label: "Sandwiches", handler: handleNav("sandwiches", "/vegan-menu/vegan-sandwiches"), href: "/vegan-menu/vegan-sandwiches" },
    { id: "pastas", label: "Pastas", handler: handleNav("pastas", "/vegan-menu/vegan-pastas"), href: "/vegan-menu/vegan-pastas" },
    { id: "breadsticks", label: "Breadsticks", handler: handleNav("breadsticks", "/vegan-menu/vegan-breadsticks"), href: "/vegan-menu/vegan-breadsticks" },
    { id: "desserts", label: "Desserts", handler: handleNav("desserts", "/vegan-menu/vegan-desserts"), href: "/vegan-menu/vegan-desserts" }
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
            className={styles.menuLabelVegan}
            src="/menu-label-vegan.png"
            alt="Vegan Menu"
            width={150}
            height={50}
          />
        </div>
        <ul className={styles.menuNavigation}>
          {subnav.map((nav, index) => (
            <li key={index} ref={activeNav === nav.id ? activeRef : null}>
              <Link
                href={nav.href}
                className={`${styles.navItem} ${activeNav === nav.id ? styles.active : ""} ${nav.id === "vegan-menu" ? styles.vegan : ""}`}
                onClick={nav.handler}>{nav.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Breadcrumbs location={mode === "light" ? "white-text" : "green-text"} />
    </>
  );
}
