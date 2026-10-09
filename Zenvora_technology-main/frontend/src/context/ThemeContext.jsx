import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'zenvora_theme'
const THEMES = {
  'royal-brown': { label: 'Royal Brown & Gold' },
  'royal-blue': { label: 'Royal Blue & Gold' },
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'royal-brown'
    return localStorage.getItem(STORAGE_KEY) || 'royal-brown'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = (next) => {
    if (THEMES[next]) setThemeState(next)
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'royal-brown' ? 'royal-blue' : 'royal-brown'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
