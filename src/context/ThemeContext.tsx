import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'academic' | 'paper' | 'dark';

export interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  toggleHighContrast: () => void;
  fontSize: 'normal' | 'large';
  setFontSize: (size: 'normal' | 'large') => void;
  toggleFontSize: () => void;
  readingMode: boolean;
  setReadingMode: (enabled: boolean) => void;
  toggleReadingMode: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('kwin_portal_theme');
    if (saved === 'academic' || saved === 'paper' || saved === 'dark') {
      return saved;
    }
    return 'academic'; // Default: lighter academic theme
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('kwin_high_contrast') === 'true';
  });

  const [fontSize, setFontSizeState] = useState<'normal' | 'large'>(() => {
    return (localStorage.getItem('kwin_font_size') as 'normal' | 'large') || 'normal';
  });

  const [readingMode, setReadingModeState] = useState<boolean>(() => {
    return localStorage.getItem('kwin_reading_mode') === 'true';
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('kwin_portal_theme', newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'academic') setTheme('paper');
    else if (theme === 'paper') setTheme('dark');
    else setTheme('academic');
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
    localStorage.setItem('kwin_high_contrast', String(enabled));
  };

  const toggleHighContrast = () => setHighContrast(!highContrast);

  const setFontSize = (size: 'normal' | 'large') => {
    setFontSizeState(size);
    localStorage.setItem('kwin_font_size', size);
  };

  const toggleFontSize = () => setFontSize(fontSize === 'normal' ? 'large' : 'normal');

  const setReadingMode = (enabled: boolean) => {
    setReadingModeState(enabled);
    localStorage.setItem('kwin_reading_mode', String(enabled));
  };

  const toggleReadingMode = () => setReadingMode(!readingMode);

  // Synchronize CSS attributes on root document
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-contrast', highContrast ? 'high' : 'normal');
    root.setAttribute('data-font-size', fontSize);
    root.setAttribute('data-reading-mode', readingMode ? 'on' : 'off');

    // Class list updates for global CSS compatibility
    root.classList.remove('theme-academic', 'theme-paper', 'theme-dark', 'dark', 'high-contrast', 'font-large');
    
    if (theme === 'academic') {
      root.classList.add('theme-academic');
    } else if (theme === 'paper') {
      root.classList.add('theme-paper');
    } else {
      root.classList.add('theme-dark', 'dark');
    }

    if (highContrast) {
      root.classList.add('high-contrast');
    }

    if (fontSize === 'large') {
      root.classList.add('font-large');
    }
  }, [theme, highContrast, fontSize, readingMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        toggleFontSize,
        readingMode,
        setReadingMode,
        toggleReadingMode,
        isDark: theme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
