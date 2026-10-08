import { useState } from 'react'
import { FaBatteryThreeQuarters, FaChevronLeft, FaLocationDot, FaWifi } from 'react-icons/fa6'
import { apps, appsById, type AppId } from '../apps'
import { profile, socialLinks } from '../content'
import { useNow } from '../hooks/useNow'
import AppIcon from './AppIcon'

export default function MobileHome() {
  const now = useNow()
  const [openId, setOpenId] = useState<AppId | null>(null)
  const openApp = openId && appsById[openId]

  return (
    <div className="mobile">
      <div className="mobile-statusbar">
        <span>{now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        <span className="mobile-status-icons" aria-hidden="true">
          <FaWifi />
          <FaBatteryThreeQuarters />
        </span>
      </div>

      <main className="mobile-home">
        <section className="mobile-widget glass">
          <img className="avatar" src={profile.avatar} alt={`Photo of ${profile.name}`} />
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
            <p className="muted small">
              <FaLocationDot aria-hidden="true" /> {profile.location}
            </p>
          </div>
        </section>

        <ul className="mobile-grid">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a className="mobile-app" href={link.href} target="_blank" rel="noopener noreferrer">
                <span className="mobile-icon">
                  <AppIcon icon={link.icon} />
                </span>
                <span className="mobile-label">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </main>

      <nav className="mobile-dock glass" aria-label="Apps">
        <ul>
          {apps.map((app) => (
            <li key={app.id}>
              <button type="button" className="mobile-app" onClick={() => setOpenId(app.id)}>
                <span className="mobile-icon">
                  <AppIcon icon={app.icon} />
                </span>
                <span className="mobile-label">{app.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {openApp && (
        <div className="mobile-sheet" role="dialog" aria-label={openApp.title}>
          <header className="mobile-sheet-header">
            <button type="button" className="mobile-back" onClick={() => setOpenId(null)}>
              <FaChevronLeft aria-hidden="true" /> Home
            </button>
            <h2>{openApp.title}</h2>
          </header>
          <div className="mobile-sheet-body">
            <openApp.Content />
          </div>
        </div>
      )}
    </div>
  )
}
