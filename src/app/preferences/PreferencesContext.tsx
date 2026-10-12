import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'dark' | 'light'
export type Locale = 'en' | 'ar'

type Preferences = {
  theme: Theme
  locale: Locale
  setTheme: (theme: Theme) => void
  setLocale: (locale: Locale) => void
}

const PreferencesContext = createContext<Preferences | null>(null)

function readStoredValue<T extends string>(key: string, fallback: T, allowed: T[]): T {
  const stored = window.localStorage.getItem(key)
  return stored && allowed.includes(stored as T) ? (stored as T) : fallback
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => readStoredValue('portfolio-theme', 'dark', ['dark', 'light']))
  const [locale, setLocale] = useState<Locale>(() => readStoredValue('portfolio-locale', 'en', ['en', 'ar']))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem('portfolio-locale', locale)
  }, [locale])

  const value = useMemo(() => ({ theme, locale, setTheme, setLocale }), [theme, locale])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const preferences = useContext(PreferencesContext)
  if (!preferences) throw new Error('usePreferences must be used within PreferencesProvider')
  return preferences
}
