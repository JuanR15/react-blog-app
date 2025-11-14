import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load posts')
        return res.json()
      })
      .then(data => setPosts(data.slice(0, 12)))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{padding:'1rem'}}>Loading posts…</p>
  if (error) return <p style={{padding:'1rem', color:'crimson'}}>Error: {error}</p>

  return (
    <section className="grid">
      {posts.map(p => (
        <article key={p.id} className="card">
          <h2 className="post-title"><Link to={`/posts/${p.id}`}>{p.title}</Link></h2>
          <p className="post-meta"><strong>Post ID:</strong> {p.id}</p>
          <p className="post-content">{p.body?.slice(0, 140)}…</p>
          <p><Link to={`/posts/${p.id}`}>Read more →</Link></p>
        </article>
      ))}
    </section>
  )
}
