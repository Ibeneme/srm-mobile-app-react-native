import React, {createContext, useContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isDarkModeEnabled: boolean;
  toggleTheme: () => void;
  theme: Record<string, string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightThemeColors = {
  background: '#f4f4f4',
  text: '#000000',
  views: '#ffffff',
  walletViews: '#ffffff',
  backgroundAuth: '#ffffff',
  backgroundDark: '#fff',
};

const darkThemeColors = {
  background: '#131418',
  text: '#CDD1D6',
  views: '#ffffff09',
  walletViews: '#ffffff10',
  backgroundAuth: '#131418',
  backgroundDark: '#121212',
};

export const ThemeProvider: React.FC<{children: any}> = ({children}) => {
  const deviceColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState<boolean>(
    deviceColorScheme === 'dark',
  );

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedThemePreference = await AsyncStorage.getItem(
          'themePreference',
        );
        if (storedThemePreference !== null) {
          setDarkMode(storedThemePreference === 'dark');
        } else {
          setDarkMode(deviceColorScheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadThemePreference();
  }, [deviceColorScheme]);

  const saveThemePreference = async (isDarkModeEnabled: boolean) => {
    try {
      await AsyncStorage.setItem(
        'themePreference',
        isDarkModeEnabled ? 'dark' : 'light',
      );
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    saveThemePreference(newDarkMode);
  };

  const theme = darkMode ? darkThemeColors : lightThemeColors;

  return (
    <ThemeContext.Provider
      value={{isDarkModeEnabled: darkMode, toggleTheme, theme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
