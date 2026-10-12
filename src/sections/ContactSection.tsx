import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../app/preferences/PreferencesContext'
import SectionFrame from '../components/SectionFrame'
import './ContactSection.css'

const email = 'hakemalshazly@gmail.com'
const whatsapp = 'https://wa.me/201027155151'

export default function ContactSection() {
  const { locale } = usePreferences()
  const [copied, setCopied] = useState(false)
  const [connector, setConnector] = useState<{ width: number; height: number; path: string } | null>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const isArabic = locale === 'ar'

  useEffect(() => {
    const contact = contactRef.current
    const eyebrow = eyebrowRef.current
    if (!contact || !eyebrow) return

    const updateConnector = () => {
      const sectionRect = contact.getBoundingClientRect()
      const eyebrowRect = eyebrow.getBoundingClientRect()
      const labelRange = document.createRange()
      labelRange.selectNodeContents(eyebrow)
      const labelTextRect = labelRange.getBoundingClientRect()
      const eyebrowStyle = window.getComputedStyle(eyebrow)
      const labelGap = Number.parseFloat(eyebrowStyle.columnGap) || 0
      const direction = eyebrowStyle.direction
      const endX = direction === 'rtl'
        ? labelTextRect.right - sectionRect.left + labelGap
        : labelTextRect.left - sectionRect.left - labelGap
      const endY = eyebrowRect.top - sectionRect.top + eyebrowRect.height / 2
      const startX = sectionRect.width / 2
      const isMobile = window.matchMedia('(max-width: 60rem)').matches
      const incomingDirection = direction === 'rtl' ? -1 : 1
      const endDirection = Math.sign(endX - startX) || -incomingDirection
      const firstControlY = endY * (isMobile ? 0.36 : 0.34)
      const incomingSlope = isMobile ? 0.34 : 0.49
      const firstControlX = startX + incomingDirection * incomingSlope * firstControlY
      const secondControlX = endX - endDirection * 32

      setConnector({
        width: sectionRect.width,
        height: sectionRect.height,
        path: `M ${startX} 0 C ${firstControlX} ${firstControlY}, ${secondControlX} ${endY}, ${endX} ${endY}`,
      })
    }

    updateConnector()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateConnector)
    observer?.observe(contact)
    observer?.observe(eyebrow)
    window.addEventListener('resize', updateConnector)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateConnector)
    }
  }, [isArabic])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <SectionFrame id="contact" label={isArabic ? 'تواصل' : 'Contact'}>
      <div className="portfolio-section contact-section" ref={contactRef}>
        {connector && (
          <svg
            className="contact-section__connector"
            viewBox={`0 0 ${connector.width} ${connector.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="contact-section__connector-path" d={connector.path} />
          </svg>
        )}
        <div className="section-shell">
          <p className="section-eyebrow" ref={eyebrowRef}>{isArabic ? 'تواصل' : 'CONTACT'}</p>
          <h2 className="section-title">
            {isArabic ? <>لنصنع حكاية<br /><em>سينمائية.</em></> : <>Let’s build something<br /><em>cinematic.</em></>}
          </h2>
          <p className="contact-description">
            {isArabic
              ? 'متاح لمشاريع مونتاج الفيديو. أرسل تفاصيل فكرتك لنتحدث عنها.'
              : 'Available for freelance video editing. Reach out and let’s discuss your project.'}
          </p>
          <div className="contact-actions">
            <a className="contact-action contact-action--primary" href={whatsapp} target="_blank" rel="noreferrer">
              <span aria-hidden="true">↗</span>{isArabic ? 'واتساب' : 'WHATSAPP'}
            </a>
            <a className="contact-action" href={`mailto:${email}`}>
              <span aria-hidden="true">✉</span>{isArabic ? 'البريد الإلكتروني' : 'EMAIL'}
            </a>
            <button className="contact-action" type="button" onClick={copyEmail}>
              <span aria-hidden="true">⧉</span>{isArabic ? 'نسخ البريد' : 'COPY EMAIL'}
            </button>
          </div>
          <a className="contact-email" href={`mailto:${email}`}>{email}</a>
          <p className="contact-copy-status" aria-live="polite">
            {copied ? (isArabic ? 'تم نسخ البريد الإلكتروني' : 'Email copied') : ''}
          </p>
        </div>
      </div>
    </SectionFrame>
  )
}
