import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../app/preferences/PreferencesContext'
import SectionFrame from '../components/SectionFrame'
import './ToolsSection.css'

const tools = [
  { name: 'Premiere Pro', abbreviation: 'Pr', percentage: 95 },
  { name: 'After Effects', abbreviation: 'Ae', percentage: 90 },
  { name: 'Higgsfield AI', abbreviation: 'Hf', percentage: 95 },
  { name: 'Veo 3', abbreviation: 'V3', percentage: 92 },
  { name: 'Kling AI', abbreviation: 'Kl', percentage: 90 },
]

export default function ToolsSection() {
  const { locale } = usePreferences()
  const isArabic = locale === 'ar'
  const gridRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    let animationFrame: number | null = null
    let startedAt: number | null = null
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

    const finishImmediately = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = null
      }
      setAnimationProgress(1)
    }

    const handleMotionPreference = () => {
      if (motionPreference.matches && hasAnimated.current) finishImmediately()
    }

    motionPreference.addEventListener('change', handleMotionPreference)

    if (!('IntersectionObserver' in window)) {
      hasAnimated.current = true
      finishImmediately()
    } else {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting || hasAnimated.current) return

        hasAnimated.current = true
        observer.disconnect()

        if (motionPreference.matches) {
          finishImmediately()
          return
        }

        const duration = 1350
        const animate = (timestamp: number) => {
          startedAt ??= timestamp
          const linearProgress = Math.min((timestamp - startedAt) / duration, 1)
          const easedProgress = 1 - (1 - linearProgress) ** 3
          setAnimationProgress(easedProgress)

          if (linearProgress < 1) {
            animationFrame = window.requestAnimationFrame(animate)
          } else {
            animationFrame = null
          }
        }

        animationFrame = window.requestAnimationFrame(animate)
      }, { threshold: 0.2 })

      observer.observe(grid)

      return () => {
        observer.disconnect()
        motionPreference.removeEventListener('change', handleMotionPreference)
        if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      }
    }

    return () => {
      motionPreference.removeEventListener('change', handleMotionPreference)
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <SectionFrame id="tools" label={isArabic ? 'الأدوات' : 'Tools'}>
      <div className="portfolio-section tools-section toolkit-section">
        <div className="section-shell">
          <div className="tools-intro">
            <p className="section-eyebrow">{isArabic ? 'مجموعة الأدوات' : 'TOOLKIT'}</p>
            <h2 className="section-title">
              {isArabic ? <>الأدوات وراء <em>الحرفة</em></> : <>The instruments behind the <em>craft</em></>}
            </h2>
          </div>
          <div className="toolkit-grid" ref={gridRef}>
            {tools.map(({ name, abbreviation, percentage }) => {
              const currentPercentage = Math.round(percentage * animationProgress)

              return (
                <article className="toolkit-item" key={name}>
                  <span className="toolkit-item__mark" aria-hidden="true" dir="ltr">{abbreviation}</span>
                  <div className="toolkit-item__content">
                    <div className="toolkit-item__heading">
                      <h3 dir="ltr">{name}</h3>
                      <span className="toolkit-item__percentage" dir="ltr">{currentPercentage}%</span>
                    </div>
                    <span
                      className="toolkit-item__track"
                      role="progressbar"
                      aria-label={`${name} proficiency`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={currentPercentage}
                    >
                      <span className="toolkit-item__fill" style={{ width: `${percentage * animationProgress}%` }} />
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}
