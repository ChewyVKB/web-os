import { useRef, type PointerEvent } from 'react'
import type { AppDefinition } from '../apps'
import type { WindowState } from '../hooks/useWindowManager'

const TOPBAR_HEIGHT = 28
const MIN_VISIBLE = 120

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const isOnButton = (event: { target: EventTarget }) =>
  (event.target as HTMLElement).closest('button') !== null

interface Props {
  app: AppDefinition
  state: WindowState
  focused: boolean
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onMove: (x: number, y: number) => void
}

export default function Window({
  app,
  state,
  focused,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
}: Props) {
  const dragOffset = useRef<{ x: number; y: number } | null>(null)

  const startDrag = (event: PointerEvent<HTMLElement>) => {
    if (state.maximized || event.button !== 0 || isOnButton(event)) return
    dragOffset.current = { x: event.clientX - state.x, y: event.clientY - state.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const drag = (event: PointerEvent<HTMLElement>) => {
    if (!dragOffset.current) return
    onMove(
      clamp(event.clientX - dragOffset.current.x, MIN_VISIBLE - app.size.width, window.innerWidth - MIN_VISIBLE),
      clamp(event.clientY - dragOffset.current.y, TOPBAR_HEIGHT, window.innerHeight - 60),
    )
  }

  const endDrag = () => {
    dragOffset.current = null
  }

  const classes = ['window', 'glass', focused && 'is-focused', state.maximized && 'is-maximized']
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={classes}
      style={{
        zIndex: state.z,
        ...(!state.maximized && {
          left: state.x,
          top: state.y,
          width: app.size.width,
          height: app.size.height,
        }),
      }}
      hidden={state.minimized}
      role="dialog"
      aria-label={app.title}
      onPointerDown={onFocus}
    >
      <header
        className="window-titlebar"
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(event) => !isOnButton(event) && onToggleMaximize()}
      >
        <div className="window-controls">
          <button type="button" className="window-control close" aria-label={`Close ${app.title}`} onClick={onClose} />
          <button type="button" className="window-control minimize" aria-label={`Minimize ${app.title}`} onClick={onMinimize} />
          <button
            type="button"
            className="window-control maximize"
            aria-label={state.maximized ? `Restore ${app.title}` : `Maximize ${app.title}`}
            onClick={onToggleMaximize}
          />
        </div>
        <span className="window-title">{app.title}</span>
      </header>
      <div className="window-body">
        <app.Content />
      </div>
    </section>
  )
}
