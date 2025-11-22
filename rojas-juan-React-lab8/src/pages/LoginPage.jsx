import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/posts" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const result = login(username, password)
    setSubmitting(false)

    if (!result.ok) {
      setError(result.message || 'Login failed.')
      return
    }
    navigate('/posts')
  }

  return (
    <article className="card" role="region" aria-label="Login form">
      <h2 className="post-title">Login</h2>
      <p className="post-meta">Use any username and password to log in for this demo.</p>
      <form className="comment-form form-stacked" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          aria-label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Logging in…' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'salmon', marginTop: '8px' }}>{error}</p>}
    </article>
  )
}
