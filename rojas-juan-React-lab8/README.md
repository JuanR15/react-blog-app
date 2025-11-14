# Lab 8 — Fetch Data (Juan Rojas)

## Run
```
npm install
npm run dev
```

## What’s implemented
- **BlogPostsPage**: fetches posts from `https://jsonplaceholder.typicode.com/posts` (shows first 12). Loading + error states.
- **IndividualPostPage**: uses URL id to fetch a post, then fetches the **user** (author) and **comments**. Loading + error states.
- **Dynamic comments**: form posts to `.../posts/:id/comments` via `POST`, validates inputs, and updates the list on success.
- **Routing**: `/`, `/posts/:id`, `/contact`
- **Theme**: Light/Dark via Context with localStorage + system preference.

## Notes
I’m displaying the first 12 posts from JSONPlaceholder for readability on the Blog Posts page; I know the API returns 100 posts total and this limit is just a UI choice which I can change freely.
This was not specified in the lab instructions so you are welcome to change it if you want to see more posts.
