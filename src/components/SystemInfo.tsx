import { version as reactVersion } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import type { AppId } from '../apps'
import { profile } from '../content'

const bootTime = Date.now()

function formatUptime(ms: number) {
  const minutes = Math.floor(ms / 60_000)
  if (minutes < 1) return 'just booted'
  if (minutes < 60) return `${minutes} min`
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`
}

interface Props {
  now: Date
  onOpen: (id: AppId) => void
}

export default function SystemInfo({ now, onOpen }: Props) {
  return (
    <div className="popover system-info glass" role="dialog" aria-label="System info">
      <div className="system-info-header">
        <img className="avatar" src={profile.avatar} alt="" />
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.title}</p>
          <p className="muted small">
            <FaLocationDot aria-hidden="true" /> {profile.location}
          </p>
        </div>
      </div>
      <dl className="system-info-specs">
        <dt>OS</dt>
        <dd>web-os 1.0</dd>
        <dt>Kernel</dt>
        <dd>React {reactVersion}</dd>
        <dt>Shell</dt>
        <dd>TypeScript</dd>
        <dt>Uptime</dt>
        <dd>{formatUptime(now.getTime() - bootTime)}</dd>
      </dl>
      <div className="system-info-actions">
        <button type="button" className="pill-button" onClick={() => onOpen('about')}>
          About Me
        </button>
        <a
          className="pill-button"
          href={`https://github.com/${profile.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}
