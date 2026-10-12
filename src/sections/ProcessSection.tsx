import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../app/preferences/PreferencesContext'
import SectionFrame from '../components/SectionFrame'
import './ProcessSection.css'

const processSteps = [
  ['Planning', 'Briefing, references, story arc, treatment and pacing direction.'],
  ['Editing', 'Selective cuts, sound design, rhythm and a precise narrative spine.'],
  ['Motion Design', 'Kinetic typography, transitions and a custom motion identity.'],
  ['Delivery', 'Color, masters, platform-ready exports and revision passes.'],
]

const desktopJourney = 'M 125 23 C 205 18 300 4 375 23 C 455 45 535 42 625 23 C 710 7 800 11 875 23 C 936 32 950 84 950 147 C 950 243 842 276 724 304 C 628 327 566 344 500 360 C 435 390 442 480 500 620'
const mobileJourney = 'M 55 20 C 55 75 55 130 55 185 S 55 290 55 345 S 55 450 55 505 C 55 650 106 722 248 790 C 360 872 400 1085 500 1200'

export default function ProcessSection() {
  const { locale } = usePreferences()
  const isArabic = locale === 'ar'
  const [hasEntered, setHasEntered] = useState(false)
  const journeyRef = useRef<HTMLDivElement>(null)
  const steps = isArabic
    ? [
        ['التخطيط', 'مراجعة الموجز والمراجع، وبناء مسار القصة، وتحديد المعالجة والإيقاع.'],
        ['المونتاج', 'اختيار اللقطات، وتصميم الصوت، وضبط الإيقاع، وبناء مسار سردي دقيق.'],
        ['تصميم الحركة', 'خطوط حركية، وانتقالات، وهوية حركة مخصصة.'],
        ['التسليم', 'تصحيح الألوان، والنسخ النهائية، وتصدير ملائم للمنصات، وجولات المراجعة.'],
      ]
    : processSteps

  useEffect(() => {
    const journey = journeyRef.current
    if (!journey) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setHasEntered(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(journey)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionFrame id="process" label={isArabic ? 'الخطوات' : 'Process'}>
      <div className="portfolio-section process-section process-cinematic" data-visible={hasEntered}>
        <div className="section-shell">
          <div className="process-cinematic__intro">
            <p className="section-eyebrow">{isArabic ? 'الخطوات' : 'PROCESS'}</p>
            <h2 className="section-title">
              {isArabic ? (
                <>من صفحة فارغة إلى <em>إطار مكتمل.</em></>
              ) : (
                <>From blank canvas to a <em>finished frame</em></>
              )}
            </h2>
          </div>

          <div
            className="process-journey"
            dir={isArabic ? 'rtl' : 'ltr'}
            ref={journeyRef}
          >
            <svg className="process-journey__route process-journey__route--desktop" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="process-route-gradient-desktop" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-accent)" />
                  <stop offset="56%" stopColor="var(--color-accent-soft)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
              <path className="process-journey__route-base" d={desktopJourney} pathLength="1" />
              <path className="process-journey__route-draw" d={desktopJourney} pathLength="1" />
            </svg>

            <svg className="process-journey__route process-journey__route--mobile" viewBox="0 0 1000 1200" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="process-route-gradient-mobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" />
                  <stop offset="58%" stopColor="var(--color-accent-soft)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
              <path className="process-journey__route-base" d={mobileJourney} pathLength="1" />
              <path className="process-journey__route-draw" d={mobileJourney} pathLength="1" />
            </svg>

            <div className="process-journey__stages">
              {steps.map(([title, description], index) => (
                <article className="process-journey__stage" key={title}>
                  <span className="process-journey__number">0{index + 1}</span>
                  <div className="process-journey__copy">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>
      </div>
    </SectionFrame>
  )
}
