import { FaLocationDot } from 'react-icons/fa6'
import { profile, skills, socialLinks } from '../content'

export default function AboutMe() {
  return (
    <article className="app-content">
      <header className="about-header">
        <img className="avatar avatar-lg" src={profile.avatar} alt={`Photo of ${profile.name}`} />
        <div>
          <h1>{profile.name}</h1>
          <p className="lead">{profile.title}</p>
          <p className="muted">
            <FaLocationDot aria-hidden="true" /> {profile.location}
          </p>
        </div>
      </header>

      {profile.bio.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <h2>Skills</h2>
      <ul className="tags">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h2>Find me online</h2>
      <ul className="link-list">
        {socialLinks.map(({ id, label, href, icon: { Icon } }) => (
          <li key={id}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon aria-hidden="true" /> {label}
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}
