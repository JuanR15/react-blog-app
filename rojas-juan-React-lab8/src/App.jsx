import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BlogPostsPage from './pages/BlogPostsPage.jsx'
import IndividualPostPage from './pages/IndividualPostPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<BlogPostsPage />} />
          <Route path="/posts/:id" element={<IndividualPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<p style={{padding:'2rem'}}>404 — Page not found.</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
