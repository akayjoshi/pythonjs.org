'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '@/context/ThemeContext';
import ThemePicker from './ThemePicker';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <Link href="/" className={styles.logo}>
          PythonJS
        </Link>
        <div className={styles.navItems}>
          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className={styles.themeControls}>
            <ThemePicker />
            <div className={styles.themeSwitcher} onClick={toggleTheme}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
