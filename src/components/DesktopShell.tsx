import { useMemo } from 'react'
import { appsById } from '../apps'
import { useWindowManager } from '../hooks/useWindowManager'
import Desktop from './Desktop'
import Dock from './Dock'
import TopBar from './TopBar'
import Window from './Window'

export default function DesktopShell() {
  const wm = useWindowManager()
  const openIds = useMemo(() => new Set(wm.windows.map((w) => w.id)), [wm.windows])

  return (
    <div className="shell">
      <TopBar activeTitle={wm.focusedId && appsById[wm.focusedId].title} onOpen={wm.open} />
      <main className="workspace">
        <Desktop onOpen={wm.open} />
        {wm.windows.map((w) => (
          <Window
            key={w.id}
            app={appsById[w.id]}
            state={w}
            focused={w.id === wm.focusedId}
            onFocus={() => wm.focus(w.id)}
            onClose={() => wm.close(w.id)}
            onMinimize={() => wm.minimize(w.id)}
            onToggleMaximize={() => wm.toggleMaximize(w.id)}
            onMove={(x, y) => wm.move(w.id, x, y)}
          />
        ))}
      </main>
      <Dock openIds={openIds} onActivate={wm.activate} />
    </div>
  )
}
