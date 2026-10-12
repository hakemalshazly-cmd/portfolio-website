import { useState } from 'react'
import { usePreferences } from '../app/preferences/PreferencesContext'

export default function SitePreferences() {
  const { theme, locale, setTheme, setLocale } = usePreferences()
  const [menuOpen, setMenuOpen] = useState(false)
  const isArabic = locale === 'ar'
  const navItems = isArabic
    ? [
        ['الأعمال', 'selected-work'],
        ['نبذة', 'about'],
        ['المهارات', 'skills'],
        ['الأدوات', 'tools'],
        ['الخطوات', 'process'],
        ['تواصل', 'contact'],
      ]
    : [
        ['WORK', 'selected-work'],
        ['ABOUT', 'about'],
        ['SKILLS', 'skills'],
        ['TOOLS', 'tools'],
        ['PROCESS', 'process'],
        ['CONTACT', 'contact'],
      ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header" dir={isArabic ? 'rtl' : 'ltr'}>
      <a className="site-header__brand" href="#home" aria-label={isArabic ? 'عبد الحكيم — الرئيسية' : 'Abdul Hakim — home'} onClick={closeMenu}>
        <span className="site-header__monogram">AH</span>
        <span className="site-header__brand-name">ABDUL HAKIM</span>
      </a>

      <nav className="site-header__nav" aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}>
        {navItems.map(([label, id]) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </nav>

      <div className="site-header__actions">
        <button
          className="site-header__language"
          type="button"
          aria-label={isArabic ? 'Switch language to English' : 'تغيير اللغة إلى العربية'}
          onClick={() => setLocale(isArabic ? 'en' : 'ar')}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.2" /><path d="M2.9 10h14.2M10 2.8c2 2 3 4.4 3 7.2s-1 5.2-3 7.2c-2-2-3-4.4-3-7.2s1-5.2 3-7.2Z" /></svg>
          <span>{isArabic ? 'English' : 'العربية'}</span>
        </button>
        <button
          className="site-header__theme"
          type="button"
          aria-label={theme === 'dark' ? (isArabic ? 'تفعيل المظهر الفاتح' : 'Switch to light theme') : (isArabic ? 'تفعيل المظهر الداكن' : 'Switch to dark theme')}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.2" /><path d="M10 1.8v2M10 16.2v2M18.2 10h-2M3.8 10h-2m14-5.8-1.4 1.4M5.6 14.4l-1.4 1.4m11.6 0-1.4-1.4M5.6 5.6 4.2 4.2" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16.8 12.4A7.2 7.2 0 0 1 7.6 3.2 7.3 7.3 0 1 0 16.8 12.4Z" /></svg>
          )}
        </button>
        <a className="site-header__availability" href="#contact">
          <span className="site-header__availability-dot" />
          {isArabic ? 'متاح' : 'AVAILABLE'}
        </a>
        <button
          className="site-header__menu-toggle"
          type="button"
          aria-label={menuOpen ? (isArabic ? 'إغلاق القائمة' : 'Close menu') : (isArabic ? 'فتح القائمة' : 'Open menu')}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`site-header__mobile-nav${menuOpen ? ' is-open' : ''}`} aria-label={isArabic ? 'التنقل' : 'Navigation'}>
        {navItems.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>
        ))}
      </nav>
    </header>
  )
}
