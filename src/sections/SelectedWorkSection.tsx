import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../app/preferences/PreferencesContext'
import SectionFrame from '../components/SectionFrame'
import './SelectedWorkSection.css'

type WorkVideo = {
  fileName: string
  title: string
  thumbnail: string
  videasEmbedId: string
}

const videasEmbedIds = [
  '01a1fd64-0feb-7579-bd27-525ff65ce890',
  '01a1fd65-9c84-70fd-aa34-3bc218a544bd',
  '01a1fc9d-50e7-70e3-ae9b-46e12f7bbaa6',
  '01a1fd65-e317-7637-adca-e36efc919503',
  '01a1fd66-6e47-77de-94a7-a780ec73948f',
  '01a1fd66-9755-7120-93a7-13ff6f1754d2',
  '01a1fd66-c694-7828-973b-72c376b569f1',
  '01a1fd66-f15c-762f-a9a2-138a8bc431d9',
  '01a1fd67-1da5-72e0-82b4-bcde26aa1f66',
]

const workVideos: WorkVideo[] = Array.from({ length: 9 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')

  return {
    fileName: `${index + 1}.mp4`,
    title: `Project ${number}`,
    thumbnail: `${import.meta.env.BASE_URL}assets/abdo/work/project-${number}.webp`,
    videasEmbedId: videasEmbedIds[index],
  }
})

function VideasEmbed({ embedId }: { embedId: string }) {
  const embedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const embed = embedRef.current
    if (!embed) return

    const script = document.createElement('script')
    script.src = 'https://app.videas.com/embed.js'
    script.dataset.embed = embedId
    script.dataset.aspectRatio = '1.7778'
    script.async = true
    embed.appendChild(script)

    return () => {
      embed.replaceChildren()
    }
  }, [embedId])

  return <div className="videas-embed" ref={embedRef} />
}

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
              <VideasEmbed embedId={selectedVideo.videasEmbedId} />
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
