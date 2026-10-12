import { useCallback, useRef, useState } from 'react'
import { FaBatteryThreeQuarters, FaDebian, FaVolumeHigh, FaWifi } from 'react-icons/fa6'
import type { AppId } from '../apps'
import { useClickOutside } from '../hooks/useClickOutside'
import { useNow } from '../hooks/useNow'
import CalendarPopover from './CalendarPopover'
import SystemInfo from './SystemInfo'

type Menu = 'system' | 'calendar' | null

interface Props {
  activeTitle: string | null
  onOpen: (id: AppId) => void
}

export default function TopBar({ activeTitle, onOpen }: Props) {
  const now = useNow()
  const [menu, setMenu] = useState<Menu>(null)
  const barRef = useRef<HTMLElement>(null)

  const closeMenu = useCallback(() => setMenu(null), [])
  useClickOutside(barRef, closeMenu, menu !== null)

  const toggle = (next: Menu) => setMenu((current) => (current === next ? null : next))
  const buttonClass = (name: Menu) => `topbar-button${menu === name ? ' is-active' : ''}`

  return (
    <header ref={barRef} className="topbar glass">
      <div className="topbar-left">
        <div className="menu">
          <button
            type="button"
            className={`${buttonClass('system')} strong`}
            aria-expanded={menu === 'system'}
            onClick={() => toggle('system')}
          >
            <FaDebian aria-hidden="true" /> System Info
          </button>
          {menu === 'system' && (
            <SystemInfo
              now={now}
              onOpen={(id) => {
                closeMenu()
                onOpen(id)
              }}
            />
          )}
        </div>
        {activeTitle && <span className="topbar-app-title">{activeTitle}</span>}
      </div>

      <div className="topbar-center menu">
        <button
          type="button"
          className={buttonClass('calendar')}
          aria-expanded={menu === 'calendar'}
          onClick={() => toggle('calendar')}
        >
          <span>{now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          <span>{now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        </button>
        {menu === 'calendar' && <CalendarPopover now={now} />}
      </div>

      <div className="topbar-right" aria-hidden="true">
        <FaWifi />
        <FaVolumeHigh />
        <FaBatteryThreeQuarters />
      </div>
    </header>
  )
}
