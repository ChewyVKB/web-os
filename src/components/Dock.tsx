import { useRef, type MouseEvent } from 'react'
import { apps, type AppId } from '../apps'
import { socialLinks } from '../content'
import { scaleValue } from '../utils/scales'
import AppIcon from './AppIcon'

const MAX_ADDITIONAL_SIZE = 5

interface Props {
  openIds: Set<AppId>
  onActivate: (id: AppId) => void
}

export default function Dock({ openIds, onActivate }: Props) {
  const dockRef = useRef<HTMLElement>(null)

  // Shift neighbor sizes based on where the cursor is within the hovered icon,
  // so the magnification feels continuous instead of jumping between icons.
  const handleHover = (event: MouseEvent<HTMLLIElement>) => {
    if (!dockRef.current) return
    const { left, width } = event.currentTarget.getBoundingClientRect()
    const offset = scaleValue((event.clientX - left) / width, [0, 1], [-MAX_ADDITIONAL_SIZE, MAX_ADDITIONAL_SIZE])
    dockRef.current.style.setProperty('--dock-offset-left', `${-offset}px`)
    dockRef.current.style.setProperty('--dock-offset-right', `${offset}px`)
  }

  return (
    <nav ref={dockRef} className="dock glass" aria-label="Dock">
      <ul>
        {apps.map((app) => (
          <li key={app.id} className="dock-item" onMouseMove={handleHover}>
            <button type="button" aria-label={app.title} onClick={() => onActivate(app.id)}>
              <AppIcon icon={app.icon} />
              <span className="tooltip" aria-hidden="true">
                {app.title}
              </span>
              {openIds.has(app.id) && <span className="dock-indicator" />}
            </button>
          </li>
        ))}
        <li className="dock-divider" aria-hidden="true" />
        {socialLinks.map((link) => (
          <li key={link.id} className="dock-item" onMouseMove={handleHover}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
              <AppIcon icon={link.icon} />
              <span className="tooltip" aria-hidden="true">
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
