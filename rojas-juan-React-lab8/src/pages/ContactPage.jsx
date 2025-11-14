export default function ContactPage() {
  return (
    <article className="card" role="region" aria-label="Contact form">
      <h2 className="post-title">Contact</h2>
      <p className="post-meta">Have a question? Send a message below.</p>
      <form className="comment-form" onSubmit={(e)=>e.preventDefault()}>
        <input type="text" placeholder="Your name" aria-label="Your name" required />
        <input type="email" placeholder="Your email" aria-label="Your email" required />
        <textarea placeholder="Your message" rows="4" aria-label="Your message" required></textarea>
        <button type="submit" className="submit-btn">Send</button>
      </form>
    </article>
  )
}
