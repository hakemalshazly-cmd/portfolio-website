import SitePreferences from '../components/SitePreferences'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'
import FooterSection from '../sections/FooterSection'
import HomeSection from '../sections/HomeSection'
import ProcessSection from '../sections/ProcessSection'
import SelectedWorkSection from '../sections/SelectedWorkSection'
import SkillsSection from '../sections/SkillsSection'
import ToolsSection from '../sections/ToolsSection'
import { usePreferences } from '../app/preferences/PreferencesContext'
import '../styles/portfolio.css'

export default function PortfolioPage() {
  const { locale } = usePreferences()

  return (
    <>
      <SitePreferences />
      <main dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <HomeSection />
        <AboutSection />
        <SelectedWorkSection />
        <SkillsSection />
        <ToolsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
