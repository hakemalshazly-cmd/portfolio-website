import { useEffect, useState } from 'react'
import { usePreferences } from '../app/preferences/PreferencesContext'
import SectionFrame from '../components/SectionFrame'

const email = 'hakemalshazly@gmail.com'
const whatsapp = 'https://wa.me/201027155151'

export default function FooterSection() {
  const { locale } = usePreferences()
  const [hasScrolled, setHasScrolled] = useState(false)
  const isArabic = locale === 'ar'

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 400)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <SectionFrame id="footer" label={isArabic ? 'التذييل' : 'Footer'}>
      <footer className="site-footer">
        <div className="site-footer__inner" dir={isArabic ? 'rtl' : 'ltr'}>
          <p>© 2026 ABDUL HAKIM AL-SHAZLY</p>
          <p>{isArabic ? 'القاهرة · مصر' : 'CAIRO · EGYPT'}</p>
        </div>
      </footer>
      <div className="floating-actions" dir="ltr">
        {hasScrolled ? (
          <a href="#home" aria-label={isArabic ? 'العودة إلى الأعلى' : 'Back to top'}>↑</a>
        ) : (
          <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={isArabic ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 11.7a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4a8.2 8.2 0 1 1 15.2-4.3Z" /><path d="M8.9 8.3c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4 0 .6.4.8 1.1 1.4 1.9 1.8.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.3.6c.2.1.4.2.4.4 0 .3-.2 1.1-.7 1.4-.5.4-1.1.5-1.7.3-.6-.2-1.4-.5-2.4-1.1-1.3-.8-2.2-1.9-2.5-2.4-.3-.5-.7-1.3-.7-2 0-.6.3-1.1.6-1.3Z" /></svg>
          </a>
        )}
        <a href={`mailto:${email}`} aria-label={isArabic ? 'إرسال بريد إلكتروني' : 'Send an email'}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></svg>
        </a>
      </div>
    </SectionFrame>
  )
}
