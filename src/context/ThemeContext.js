'use client';

import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

// Available color themes
export const COLOR_THEMES = {
  ocean: { name: 'Ocean Blue', icon: '🌊' },
  purple: { name: 'Purple Night', icon: '🌌' },
  forest: { name: 'Forest Green', icon: '🌲' },
  sunset: { name: 'Sunset Orange', icon: '🌅' },
  crimson: { name: 'Crimson Red', icon: '🌹' },
  mint: { name: 'Mint Fresh', icon: '🍃' },
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark'); // 'dark' or 'light'
  const [colorTheme, setColorTheme] = useState('ocean'); // Color theme

  useEffect(() => {
    // Load theme preferences from localStorage on mount
    const savedMode = localStorage.getItem('themeMode');
    const savedColorTheme = localStorage.getItem('colorTheme');

    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    } else {
      setMode('light');
    }

    if (savedColorTheme && COLOR_THEMES[savedColorTheme]) {
      setColorTheme(savedColorTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme classes to body and save to localStorage
    document.body.className = `${mode}-theme theme-${colorTheme}`;
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('colorTheme', colorTheme);
  }, [mode, colorTheme]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const changeColorTheme = (newColorTheme) => {
    if (COLOR_THEMES[newColorTheme]) {
      setColorTheme(newColorTheme);
    }
  };

  // Legacy support for existing code
  const theme = mode;
  const toggleTheme = toggleMode;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        colorTheme,
        toggleMode,
        changeColorTheme,
        // Legacy support
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
