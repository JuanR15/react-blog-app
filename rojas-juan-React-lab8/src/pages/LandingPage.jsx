import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth()

  const primaryLabel = isAuthenticated ? 'Go to posts' : 'Login to get started'
  const primaryTo = isAuthenticated ? '/posts' : '/login'

  return (
    <section className="landing">
      <div className="landing-hero">
        <p className="landing-kicker">Welcome to My Blog</p>
        <h1 className="landing-title">Short reads, big ideas.</h1>
        <p className="landing-text">
          Explore sample posts, practice commenting, and see how a simple blog can come to life
          with React, routing, and theme toggles.
        </p>
        <div className="landing-actions">
          <Link to={primaryTo} className="primary-btn">
            {primaryLabel}
          </Link>
          <Link to="/posts" className="secondary-btn">
            Explore posts
          </Link>
        </div>
        {isAuthenticated ? (
          <p className="landing-note">
            You are logged in as <strong>{user.username}</strong>. You can comment on any post.
          </p>
        ) : (
          <p className="landing-note">
            Log in to unlock commenting on posts. You can still browse everything without an account.
          </p>
        )}
      </div>
      <aside className="landing-aside">
        <h3>About this app</h3>
        <p>
          This project shows a basic blog setup using React, React Router, context for theming and login,
          and API data from JSONPlaceholder.
        </p>
        <ul className="landing-list">
          <li>Toggle between light and dark themes.</li>
          <li>Log in with any username and password (demo only).</li>
          <li>Leave comments on posts when logged in.</li>
        </ul>
      </aside>
    </section>
  )
}
