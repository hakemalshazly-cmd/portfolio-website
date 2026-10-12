import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../app/preferences/PreferencesContext'
import SectionFrame from '../components/SectionFrame'
import './SelectedWorkSection.css'

type WorkVideo = {
  fileName: string
  title: string
  thumbnail: string
}

const workVideos: WorkVideo[] = Array.from({ length: 9 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')

  return {
    fileName: `${index + 1}.mp4`,
    title: `Project ${number}`,
    thumbnail: `${import.meta.env.BASE_URL}assets/abdo/work/project-${number}.webp`,
  }
})

export default function SelectedWorkSection() {
  const { locale } = usePreferences()
  const isArabic = locale === 'ar'
  const [selectedVideo, setSelectedVideo] = useState<WorkVideo | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (selectedVideo && !dialog.open) dialog.showModal()
    if (!selectedVideo && dialog.open) dialog.close()
  }, [selectedVideo])

  const videoLabel = isArabic ? 'مونتاج فيديو' : 'VIDEO EDITING'
  return (
    <SectionFrame id="selected-work" label={isArabic ? 'الأعمال المختارة' : 'Selected Work'}>
      <div className="portfolio-section work-section">
        <div className="section-shell">
          <div className="work-heading-row">
            <div>
              <p className="section-eyebrow">{isArabic ? 'أعمال مختارة' : 'FEATURED WORK'}</p>
              <h2 className="section-title">
                {isArabic ? <>أعمال <em>مختارة</em></> : <>Selected <em>work</em></>}
              </h2>
            </div>
            <span className="work-tag">{videoLabel}</span>
          </div>

          <div className="work-grid">
            {workVideos.map((video) => (
              <article className="work-card" key={video.fileName}>
                <button
                  className="selected-work__trigger"
                  type="button"
                  aria-label={isArabic ? `فتح ${video.title}` : `Open ${video.title}`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="work-card__visual" aria-hidden="true">
                    <img
                      className="work-card__image"
                      src={video.thumbnail}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="work-card__category">{videoLabel}</span>
                  </div>
                  <div className="work-card__caption">
                    <h3>{video.title}</h3>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      <dialog
        className="project-modal"
        ref={dialogRef}
        aria-label={isArabic ? 'مشاهدة فيديو العمل' : 'Work video'}
        onClose={() => setSelectedVideo(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close()
        }}
      >
        {selectedVideo && (
          <div className="project-modal__layout">
            <div className="project-modal__media">
              <video
                key={selectedVideo.fileName}
                src={`${import.meta.env.BASE_URL}assets/abdo/work/${selectedVideo.fileName}`}
                controls
                playsInline
                preload="metadata"
                aria-label={selectedVideo.fileName}
              />
            </div>
            <div className="project-modal__details" dir={isArabic ? 'rtl' : 'ltr'}>
              <button
                className="project-modal__close"
                type="button"
                onClick={() => dialogRef.current?.close()}
              >
                {isArabic ? 'إغلاق' : 'CLOSE'}
                <span aria-hidden="true">×</span>
              </button>
              <p className="section-eyebrow">{isArabic ? 'آراء العملاء' : 'CLIENT FEEDBACK'}</p>
              <p className="project-modal__feedback-empty">
                {isArabic ? 'لا توجد آراء موثقة لهذا المشروع بعد.' : 'No verified feedback is available for this project yet.'}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </SectionFrame>
  )
}
