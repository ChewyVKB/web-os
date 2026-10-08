import type { IconStyle } from '../content'

export default function AppIcon({ icon }: { icon: IconStyle }) {
  const { Icon, background, color = '#fff' } = icon
  return (
    <span className="app-icon" style={{ background, color }} aria-hidden="true">
      <Icon />
    </span>
  )
}
