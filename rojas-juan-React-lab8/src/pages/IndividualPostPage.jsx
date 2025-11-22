import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function IndividualPostPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    async function loadData() {
      try {
        const [postRes, commentsRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
        ])

        if (!postRes.ok) {
          throw new Error('Failed to load post.')
        }
        if (!commentsRes.ok) {
          throw new Error('Failed to load comments.')
        }

        const postData = await postRes.json()
        const commentsData = await commentsRes.json()

        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`)
        if (!userRes.ok) {
          throw new Error('Failed to load author.')
        }
        const userData = await userRes.json()

        if (!cancelled) {
          setPost(postData)
          setAuthor(userData)
          setComments(commentsData)
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) {
          setError('Something went wrong while loading this post.')
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [id])

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      setSubmitError('Please log in to leave a comment.')
      return
    }
    const trimmed = newComment.trim()
    if (!trimmed) {
      setSubmitError('Please enter a comment before submitting.')
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    const displayName = user.username
    const emailName = displayName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'user'

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: displayName,
          body: trimmed,
          email: `${emailName}@example.com`,
          postId: Number(id),
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to submit comment.')
      }

      const data = await res.json()
      setComments((prev) => [data, ...prev])
      setNewComment('')
    } catch (err) {
      console.error(err)
      setSubmitError('There was a problem saving your comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <article className="card">
        <p>Loading post…</p>
      </article>
    )
  }

  if (error) {
    return (
      <article className="card">
        <p style={{ color: 'salmon' }}>{error}</p>
      </article>
    )
  }

  if (!post) {
    return null
  }

  return (
    <article className="card">
      <header className="actions" style={{ justifyContent: 'space-between' }}>
        <div>
          <h2 className="post-title">{post.title}</h2>
          {author && (
            <p className="post-meta">
              By <strong>{author.name}</strong>
              <span className="dot">•</span>
              <span>{author.email}</span>
            </p>
          )}
        </div>
        <p className="post-meta">
          <Link to="/posts">← Back to posts</Link>
        </p>
      </header>

      <section>
        <p className="post-content">{post.body}</p>
      </section>

      <section className="comments">
        <h3>Comments</h3>

        {!isAuthenticated ? (
          <p style={{ color: 'var(--muted)' }}>
            Please <Link to="/login">log in</Link> to add a comment.
          </p>
        ) : (
          <form className="comment-form form-stacked" onSubmit={handleAddComment}>
            <textarea
              placeholder="Write your comment…"
              rows="3"
              aria-label="Comment text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Posting…' : 'Post comment'}
            </button>
          </form>
        )}

        {submitError && (
          <p style={{ color: 'salmon', marginTop: '6px' }}>
            {submitError}
          </p>
        )}

        <div className="existing">
          <h4>Existing comments</h4>
          {comments.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>No comments yet. Be the first to comment!</p>
          ) : (
            <ul>
              {comments.map((c) => (
                <li key={c.id}>
                  <strong>{c.name}:</strong> {c.body}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </article>
  )
}
