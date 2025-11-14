import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function IndividualPostPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true); setError(null)
        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if (!postRes.ok) throw new Error('Failed to load post')
        const p = await postRes.json()
        setPost(p)

        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${p.userId}`)
        if (userRes.ok) setUser(await userRes.json())

        const comRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        if (comRes.ok) setComments(await comRes.json())
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const addComment = async (e) => {
    e.preventDefault()
    setSubmitError(null)
    const n = name.trim(), t = text.trim()
    if (!n || !t) { setSubmitError('Please enter both name and comment.'); return }
    try {
      setSubmitting(true)
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: n, body: t, email: `${n.replace(/\s+/g,'').toLowerCase()}@example.com`, postId: Number(id) })
      })
      if (!res.ok) throw new Error('Failed to post comment')
      const created = await res.json()
      // Update local list immediately
      setComments(prev => [created, ...prev])
      setName(''); setText('')
    } catch (e) {
      setSubmitError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p style={{padding:'1rem'}}>Loading post…</p>
  if (error) return <p style={{padding:'1rem', color:'crimson'}}>Error: {error}</p>
  if (!post) return null

  return (
    <article className="card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-meta">
        <strong>Author:</strong> {user ? user.name : 'Loading…'} {user && <> <span className="dot">•</span> <strong>Email:</strong> {user.email}</>}
      </p>
      <p className="post-content">{post.body}</p>

      <section className="comments">
        <h3>Comments</h3>
        <form onSubmit={addComment} className="comment-form">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Your name"
          />
          <input
            type="text"
            placeholder="Add a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Add a comment"
          />
          <button type="submit" className="submit-btn" disabled={submitting}>{submitting ? 'Posting…' : 'Submit'}</button>
        </form>
        {submitError && <p style={{ color: 'crimson' }}>{submitError}</p>}

        <div className="existing">
          <h4>Existing Comments:</h4>
          {comments.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>No comments yet. Be the first to comment!</p>
          ) : (
            <ul>
              {comments.map((c) => (
                <li key={c.id}><strong>{c.name}:</strong> {c.body}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </article>
  )
}
