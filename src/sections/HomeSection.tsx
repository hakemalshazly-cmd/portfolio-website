import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { usePreferences } from '../app/preferences/PreferencesContext'
import './HomeSection.css'

const portraitPath = `${import.meta.env.BASE_URL}assets/abdo/portrait.png`
const marqueeItems = ['CINEMATIC EDITS', 'SHORT-FORM CONTENT', 'VISUAL STORIES']

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
  const section = document.getElementById(sectionId)
  if (!section) return

  event.preventDefault()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  window.history.pushState(null, '', `#${sectionId}`)
}

export default function HomeSection() {
  const { locale } = usePreferences()
  const isArabic = locale === 'ar'
  const [portraitLoaded, setPortraitLoaded] = useState(false)

  useEffect(() => {
    const portrait = new Image()
    portrait.onload = () => setPortraitLoaded(true)
    portrait.onerror = () => setPortraitLoaded(false)
    portrait.src = portraitPath

    return () => {
      portrait.onload = null
      portrait.onerror = null
    }
  }, [])

  const copy = isArabic
    ? {
        location: 'القاهرة · مصر',
        description: 'محرر فيديو مستقل أقدّم مونتاجًا سينمائيًا، ومحتوى قصيرًا جذابًا، وقصصًا بصرية متقنة.',
        role: 'مونتير فيديو',
        work: 'شاهد أعمالي',
        contact: 'تواصل معي',
        portrait: 'الصورة الشخصية لعبده',
        marqueeLabel: 'أنواع أعمال المونتاج',
        marquee: ['مونتاج سينمائي', 'محتوى قصير', 'قصص بصرية'],
      }
    : {
        location: 'CAIRO · EGYPT',
        description: 'Freelance video editor crafting cinematic edits, engaging short-form content, and polished visual stories.',
        role: 'Video Editor',
        work: 'VIEW MY WORK',
        contact: 'CONTACT ME',
        portrait: 'Portrait of Abdo',
        marqueeLabel: 'Video editing work',
        marquee: marqueeItems,
      }

  return (
    <section
      id="home"
      className="home-hero"
      aria-label={isArabic ? 'الرئيسية' : 'Home'}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="hero-layout">
        <div className="hero-content">
          <p className="hero-location">
            <span className="hero-location__line" aria-hidden="true" />
            {copy.location}
          </p>

          <h1 className={`hero-title${isArabic ? ' hero-title--arabic' : ''}`}>
            {isArabic ? (
              <>
                <span className="hero-title__line">عبد</span>
                <span className="hero-title__line hero-title__accent">الحكيم</span>
              </>
            ) : (
              <>
                <span className="hero-title__line">ABDUL</span>
                <span className="hero-title__line hero-title__accent">HAKIM</span>
              </>
            )}
          </h1>

          <p className="hero-role">
            <span className="hero-role__dot" aria-hidden="true" />
            {copy.role}
          </p>

          <p className="hero-description">{copy.description}</p>

          <div className="hero-actions">
            <a
              className="hero-action hero-action--primary"
              href="#selected-work"
              onClick={(event) => scrollToSection(event, 'selected-work')}
            >
              {copy.work}
              <span className="hero-action__arrow" aria-hidden="true">↗</span>
            </a>
            <a
              className="hero-action hero-action--secondary"
              href="#contact"
              onClick={(event) => scrollToSection(event, 'contact')}
            >
              {copy.contact}
              <span className="hero-action__arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <figure className={`hero-portrait${portraitLoaded ? ' hero-portrait--loaded' : ''}`} aria-label={copy.portrait}>
          <div className="hero-portrait__placeholder" aria-hidden="true">{isArabic ? 'عبده' : 'ABDO'}</div>
          {portraitLoaded && <img className="hero-portrait__image" src={portraitPath} alt="" />}
        </figure>
      </div>

      <div className="hero-marquee" aria-label={copy.marqueeLabel}>
        <div className="hero-marquee__track" aria-hidden="true">
          {[0, 1].map((repeat) => (
            <div className="hero-marquee__group" key={repeat}>
              {copy.marquee.map((item, index) => (
                <span className="hero-marquee__item" key={`${item}-${index}`}>
                  <span>{item}</span>
                  <span className="hero-marquee__separator">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
