# BloomStudy Planner

A floral, classy, minimalistic multi-page study website.

## Pages

- `index.html` — Home page (landing + feature highlights)
- `planner.html` — Interactive planner widgets (to-do, pomodoro, syllabus/energy, schedule)
 main
- `about.html` — About page you can personalize with your story
- `styles.css` — Shared design system and page styling
- `app.js` — Planner logic only

- `learn.html` — Dedicated page explaining how planning improves motivation and study consistency
- `about.html` — About page with Ria's profile, purpose, and goals
- `login.html` — Admin login
- `admin.html` — Admin dashboard to manage announcement banner + motivational lines
- `styles.css` — Shared design system and page styling
- `app.js` — Planner + login/admin logic
 codex/start-coding-website-product-layout-0e4t4u

## Run locally

```bash
python3 -m http.server 5173
```

Open:
- `http://localhost:5173/index.html`
- `http://localhost:5173/planner.html`
- `http://localhost:5173/learn.html`
- `http://localhost:5173/about.html`
- `http://localhost:5173/login.html`

## Customize quickly

1. Edit your personal text in `about.html` under **Who I Am**, **Why This Website Exists**, and **My Goals**.
2. Adjust colors in `styles.css` (`:root` variables).
3. Add or replace motivational lines in `app.js` (`motivationLines` array).

## Admin demo credentials

- Username: `ria`
- Password: `bloomstudy123`

## Publish (GitHub Pages)

This repo includes a GitHub Pages workflow at `.github/workflows/deploy.yml`.

1. Push this repository to GitHub.
2. Make sure you push to `main` or `work` (the workflow deploys on pushes to either branch).
3. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push to `main` or `work` and the site will deploy automatically.

After deploy, your site will be available at:
- `https://<your-username>.github.io/<your-repo>/`
