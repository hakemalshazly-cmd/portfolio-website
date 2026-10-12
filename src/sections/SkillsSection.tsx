import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../app/preferences/PreferencesContext'
import SectionFrame from '../components/SectionFrame'
import './SkillsSection.css'

export default function SkillsSection() {
  const { locale } = usePreferences()
  const isArabic = locale === 'ar'
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionFrame id="skills" label={isArabic ? 'آراء العملاء' : 'Client Feedback'}>
      <div className="portfolio-section client-feedback-section" data-visible={isVisible} ref={sectionRef}>
        <div className="section-shell client-feedback-section__content">
          <div className="client-feedback-section__heading">
            <p className="section-eyebrow">{isArabic ? 'آراء العملاء' : 'CLIENT FEEDBACK'}</p>
            <h2 className="section-title">
              {isArabic ? <>كلماتٌ تتحدث <em>عن العمل.</em></> : <>Words that speak <em>for the work.</em></>}
            </h2>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}
