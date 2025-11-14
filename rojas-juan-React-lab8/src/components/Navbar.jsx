import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

function Navbar() {
  const { theme, toggleTheme, preferred } = useTheme()
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <div className="brand">My Blog</div>
        <nav className="nav">
          <NavLink to="/">Posts</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch theme (system: ${preferred})`}>
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>
      </div>
    </header>
  )
}
export default Navbar
