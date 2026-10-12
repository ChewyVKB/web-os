import { useEffect, useState } from 'react'
import { FaArrowUpRightFromSquare, FaStar } from 'react-icons/fa6'
import { profile } from '../content'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  fork: boolean
  pushed_at: string
}

type Status = { state: 'loading' } | { state: 'error' } | { state: 'ready'; repos: Repo[] }

const profileUrl = `https://github.com/${profile.githubUsername}`

// Shared across window opens so we don't burn through GitHub's rate limit.
let reposRequest: Promise<Repo[]> | null = null

function loadRepos(): Promise<Repo[]> {
  reposRequest ??= fetch(
    `https://api.github.com/users/${profile.githubUsername}/repos?sort=pushed&per_page=100`,
  )
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
      return res.json() as Promise<Repo[]>
    })
    .then((repos) => repos.filter((repo) => !repo.fork))
    .catch((err) => {
      reposRequest = null
      throw err
    })
  return reposRequest
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

export default function Projects() {
  const [status, setStatus] = useState<Status>({ state: 'loading' })

  useEffect(() => {
    let cancelled = false
    loadRepos()
      .then((repos) => !cancelled && setStatus({ state: 'ready', repos }))
      .catch(() => !cancelled && setStatus({ state: 'error' }))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <article className="app-content">
      <h1>My Projects</h1>
      <p className="muted">
        Pulled live from{' '}
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
          my GitHub
        </a>
        .
      </p>

      {status.state === 'loading' && <p className="muted">Loading repositories…</p>}

      {status.state === 'error' && (
        <p>
          Couldn&apos;t load projects right now.{' '}
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            See them on GitHub
          </a>
          .
        </p>
      )}

      {status.state === 'ready' && (
        <ul className="repo-list">
          {status.repos.map((repo) => (
            <li key={repo.id} className="repo-card">
              <a className="repo-name" href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              {repo.description && <p className="muted">{repo.description}</p>}
              <div className="repo-meta small">
                {repo.language && <span>{repo.language}</span>}
                <span>
                  <FaStar aria-label="Stars" /> {repo.stargazers_count}
                </span>
                <span>Updated {formatDate(repo.pushed_at)}</span>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    Live <FaArrowUpRightFromSquare aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
