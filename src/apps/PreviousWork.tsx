import { experience } from '../content'

export default function PreviousWork() {
  return (
    <article className="app-content">
      <h1>Previous Work</h1>
      <ol className="timeline">
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}-${job.period}`}>
            <p className="muted small">{job.period}</p>
            <h3>{job.role}</h3>
            <p className="lead">{job.company}</p>
            <p>{job.summary}</p>
            {job.highlights && (
              <ul>
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </article>
  )
}
