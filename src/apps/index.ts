import type { ComponentType } from 'react'
import { FaBriefcase, FaCode, FaUser } from 'react-icons/fa6'
import type { IconStyle } from '../content'
import AboutMe from './AboutMe'
import PreviousWork from './PreviousWork'
import Projects from './Projects'

export type AppId = 'about' | 'work' | 'projects'

export interface AppDefinition {
  id: AppId
  title: string
  icon: IconStyle
  Content: ComponentType
  size: { width: number; height: number }
}

export const apps: AppDefinition[] = [
  {
    id: 'about',
    title: 'About Me',
    icon: { Icon: FaUser, background: 'linear-gradient(180deg, #5ea2ff, #2f6bff)' },
    Content: AboutMe,
    size: { width: 620, height: 560 },
  },
  {
    id: 'work',
    title: 'Previous Work',
    icon: { Icon: FaBriefcase, background: 'linear-gradient(180deg, #ffb547, #ff8a00)' },
    Content: PreviousWork,
    size: { width: 600, height: 500 },
  },
  {
    id: 'projects',
    title: 'My Projects',
    icon: { Icon: FaCode, background: 'linear-gradient(180deg, #4ade80, #16a34a)' },
    Content: Projects,
    size: { width: 680, height: 540 },
  },
]

export const appsById = Object.fromEntries(apps.map((app) => [app.id, app])) as Record<
  AppId,
  AppDefinition
>
