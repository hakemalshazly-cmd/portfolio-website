import { usePreferences } from '../app/preferences/PreferencesContext'
import SectionFrame from '../components/SectionFrame'
import './AboutSection.css'

export default function AboutSection() {
  const { locale } = usePreferences()
  const isArabic = locale === 'ar'

  return (
    <SectionFrame id="about" label={isArabic ? 'نبذة' : 'About'}>
      <div className="portfolio-section about-section">
        <div className="section-shell about-layout">
          <div>
            <p className="section-eyebrow">{isArabic ? 'نبذة' : 'ABOUT'}</p>
            <h2 className="section-title">
              {isArabic ? <>حكايات تُروى <em>بإحساس.</em></> : <>Crafting stories with <em>intention.</em></>}
            </h2>
          </div>
          <div className="glass-panel about-card">
            <div className="about-card__copy">
              <p>
                {isArabic ? (
                  <>أنا <strong>عبد الحكيم الشاذلي</strong>، وأُعرف مهنيًا باسم <strong>عبده</strong>، محرر فيديو مستقل.</>
                ) : (
                  <>I’m <strong>Abdul Hakim Al-Shazly</strong>, professionally known as <strong>Abdo</strong> — a freelance Video Editor.</>
                )}
              </p>
              <p>
                {isArabic
                  ? 'أقدّم مونتاجًا سينمائيًا، ومحتوى قصيرًا جذابًا، وقصصًا بصرية متقنة.'
                  : 'I craft cinematic edits, engaging short-form content, and polished visual stories.'}
              </p>
              <p>
                {isArabic
                  ? 'يتجاوز أسلوبي مجرد وصل اللقطات؛ أركّز على الإيقاع وتدفّق الصورة ليبدو كل مونتاج مقصودًا وجذابًا.'
                  : 'My approach goes beyond simply cutting clips together. I focus on pacing, rhythm, and visual flow to make every edit feel intentional and engaging.'}
              </p>
              <p>
                {isArabic
                  ? 'من اختيار اللحظات المناسبة إلى تهذيب الانتقالات والصوت، أهتم بالتفاصيل التي تمنح الفيديو تكامله.'
                  : 'From selecting the right moments to refining transitions and sound, I pay attention to the details that bring a video together.'}
              </p>
              <p>
                {isArabic
                  ? 'أسعى إلى تحويل اللقطات الخام والأفكار الإبداعية إلى فيديوهات متقنة توصل الفكرة بوضوح وتحافظ على اهتمام المشاهد.'
                  : 'My goal is to turn raw footage and creative ideas into polished videos that communicate clearly and keep viewers interested.'}
              </p>
            </div>
            <div className="about-stats" aria-label={isArabic ? 'الخبرة والمشاريع' : 'Experience and projects'}>
              <div className="about-stat">
                <strong className="about-stat__value">{isArabic ? '٣' : '3'}</strong>
                <span className={`about-stat__label${isArabic ? ' about-stat__label--rtl' : ''}`}>
                  {isArabic ? 'سنوات من الخبرة' : 'Years experience'}
                </span>
              </div>
              <div className="about-stat">
                <strong className="about-stat__value">{isArabic ? '+٦٠' : '60+'}</strong>
                <span className={`about-stat__label${isArabic ? ' about-stat__label--rtl' : ''}`}>
                  {isArabic ? 'مشروعًا منجزًا' : 'Completed projects'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}
