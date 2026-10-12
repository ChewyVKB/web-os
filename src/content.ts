import type { IconType } from 'react-icons'
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import avatar from './assets/profilepic.jpg'

/**
 * Everything on the site that's "about you" lives in this file.
 * Edit the values below and the desktop, dock, windows and mobile view all update.
 */

export interface IconStyle {
  Icon: IconType
  /** Any CSS background (color or gradient) for the rounded icon tile. */
  background: string
  color?: string
}

export interface SocialLink {
  id: string
  label: string
  href: string
  icon: IconStyle
}

export interface Job {
  role: string
  company: string
  period: string
  summary: string
  highlights?: string[]
}

export const profile = {
  name: 'Austin Pizano',
  title: 'Jr. Web Developer',
  location: 'Nashville, TN',
  avatar,
  githubUsername: 'ChewyVKB',
  // TODO: write a few sentences about yourself.
  bio: [
    "Hi, I'm Austin — a junior web developer based in Nashville, TN.",
    'This site is a little desktop OS I built with React and TypeScript. Click around: open the apps on the desktop, drag the windows, and check out the dock.',
  ],
}

// TODO: adjust to the things you actually like working with.
export const skills = ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Python', 'Git']

// TODO: replace with your real work history (most recent first).
export const experience: Job[] = [
  {
    role: 'Jr. Web Developer',
    company: 'Company Name',
    period: '20XX – Present',
    summary: 'Replace this with a short description of what you worked on.',
    highlights: ['Something you built or improved', 'A result you are proud of'],
  },
]

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/ChewyVKB',
    icon: { Icon: FaGithub, background: 'linear-gradient(180deg, #3a3f47, #16181c)' },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    // TODO: replace with your LinkedIn profile URL.
    href: 'https://www.linkedin.com',
    icon: { Icon: FaLinkedinIn, background: 'linear-gradient(180deg, #1a8ad4, #0a66c2)' },
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/chewyvkb',
    icon: {
      Icon: FaInstagram,
      background:
        'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)',
    },
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    href: 'https://x.com/flawlesschewyy',
    icon: { Icon: FaXTwitter, background: 'linear-gradient(180deg, #2b2b2b, #000)' },
  },
  {
    id: 'facebook',
    label: 'Facebook',
    // TODO: replace with your Facebook profile URL.
    href: 'https://www.facebook.com',
    icon: { Icon: FaFacebookF, background: 'linear-gradient(180deg, #2aa4f4, #0866ff)' },
  },
  {
    id: 'youtube',
    label: 'YouTube',
    // TODO: replace with your YouTube channel URL.
    href: 'https://www.youtube.com',
    icon: { Icon: FaYoutube, background: 'linear-gradient(180deg, #ff3b3b, #d90000)' },
  },
]
