import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BlogPostsPage from './pages/BlogPostsPage.jsx'
import IndividualPostPage from './pages/IndividualPostPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/posts" element={<BlogPostsPage />} />
          <Route path="/posts/:id" element={<IndividualPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<p style={{ padding: '2rem' }}>404 — Page not found.</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
