'use client';

import React, { useContext, useState } from 'react';
import { ThemeContext, COLOR_THEMES } from '@/context/ThemeContext';
import styles from './ThemePicker.module.css';
import { FaPalette, FaTimes } from 'react-icons/fa';

const ThemePicker = () => {
  const { colorTheme, changeColorTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme) => {
    changeColorTheme(theme);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={styles.pickerButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Choose color theme"
        title="Choose color theme"
      >
        <FaPalette />
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.pickerModal}>
            <div className={styles.modalHeader}>
              <h3>Choose Your Theme</h3>
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
            <div className={styles.themeGrid}>
              {Object.entries(COLOR_THEMES).map(([key, { name, icon }]) => (
                <button
                  key={key}
                  className={`${styles.themeCard} ${
                    colorTheme === key ? styles.active : ''
                  } ${styles[`theme-${key}`]}`}
                  onClick={() => handleThemeChange(key)}
                  aria-label={`Select ${name} theme`}
                >
                  <div className={styles.themeIcon}>{icon}</div>
                  <div className={styles.themeName}>{name}</div>
                  {colorTheme === key && (
                    <div className={styles.activeIndicator}>✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ThemePicker;
