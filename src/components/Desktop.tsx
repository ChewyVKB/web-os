import { apps, type AppId } from '../apps'
import AppIcon from './AppIcon'

export default function Desktop({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <div className="desktop-icons">
      {apps.map((app) => (
        <button key={app.id} type="button" className="desktop-icon" onClick={() => onOpen(app.id)}>
          <span className="desktop-icon-image">
            <AppIcon icon={app.icon} />
          </span>
          <span className="desktop-icon-label">{app.title}</span>
        </button>
      ))}
    </div>
  )
}
