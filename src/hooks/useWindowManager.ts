import { useCallback, useMemo, useReducer } from 'react'
import type { AppId } from '../apps'

export interface WindowState {
  id: AppId
  x: number
  y: number
  z: number
  minimized: boolean
  maximized: boolean
}

interface State {
  windows: WindowState[]
  topZ: number
}

type Action =
  | { type: 'open' | 'focus' | 'close' | 'minimize' | 'toggleMaximize' | 'activate'; id: AppId }
  | { type: 'move'; id: AppId; x: number; y: number }

const CASCADE_START = { x: 160, y: 60 }
const CASCADE_STEP = 32

function topVisible(windows: WindowState[]) {
  return windows
    .filter((w) => !w.minimized)
    .reduce<WindowState | null>((top, w) => (!top || w.z > top.z ? w : top), null)
}

function update(state: State, id: AppId, patch: Partial<WindowState>): State {
  return { ...state, windows: state.windows.map((w) => (w.id === id ? { ...w, ...patch } : w)) }
}

function bringToFront(state: State, id: AppId, patch: Partial<WindowState> = {}): State {
  const z = state.topZ + 1
  return { ...update(state, id, { ...patch, minimized: false, z }), topZ: z }
}

function reducer(state: State, action: Action): State {
  const existing = state.windows.find((w) => w.id === action.id)

  switch (action.type) {
    case 'open': {
      if (existing) return bringToFront(state, action.id)
      const offset = CASCADE_STEP * (state.windows.length % 6)
      const z = state.topZ + 1
      return {
        topZ: z,
        windows: [
          ...state.windows,
          {
            id: action.id,
            x: CASCADE_START.x + offset,
            y: CASCADE_START.y + offset,
            z,
            minimized: false,
            maximized: false,
          },
        ],
      }
    }
    case 'focus':
      if (!existing || topVisible(state.windows)?.id === action.id) return state
      return bringToFront(state, action.id)
    case 'close':
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) }
    case 'minimize':
      return update(state, action.id, { minimized: true })
    case 'toggleMaximize':
      return existing ? bringToFront(state, action.id, { maximized: !existing.maximized }) : state
    case 'move':
      return update(state, action.id, { x: action.x, y: action.y })
    case 'activate':
      // Dock click: open, restore, minimize if already in front, or bring to front.
      if (!existing) return reducer(state, { type: 'open', id: action.id })
      if (!existing.minimized && topVisible(state.windows)?.id === action.id) {
        return update(state, action.id, { minimized: true })
      }
      return bringToFront(state, action.id)
  }
}

export function useWindowManager() {
  const [state, dispatch] = useReducer(reducer, { windows: [], topZ: 0 })

  const focusedId = useMemo(() => topVisible(state.windows)?.id ?? null, [state.windows])

  const open = useCallback((id: AppId) => dispatch({ type: 'open', id }), [])
  const focus = useCallback((id: AppId) => dispatch({ type: 'focus', id }), [])
  const close = useCallback((id: AppId) => dispatch({ type: 'close', id }), [])
  const minimize = useCallback((id: AppId) => dispatch({ type: 'minimize', id }), [])
  const toggleMaximize = useCallback((id: AppId) => dispatch({ type: 'toggleMaximize', id }), [])
  const activate = useCallback((id: AppId) => dispatch({ type: 'activate', id }), [])
  const move = useCallback(
    (id: AppId, x: number, y: number) => dispatch({ type: 'move', id, x, y }),
    [],
  )

  return { windows: state.windows, focusedId, open, focus, close, minimize, toggleMaximize, activate, move }
}
