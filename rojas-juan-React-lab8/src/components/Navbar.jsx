import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { theme, toggleTheme, preferred } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <div className="brand">My Blog</div>
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {isAuthenticated ? (
            <>
              <span className="nav-user">Hi, {user.username}</span>
              <button
                type="button"
                className="nav-auth-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-auth-link">
              Login
            </NavLink>
          )}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch theme (system: ${preferred})`}
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>
      </div>
    </header>
  )
}
export default Navbar
