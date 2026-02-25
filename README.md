# BloomStudy Planner

A floral, classy, minimalistic multi-page study website.

## Pages

- `index.html` — Home page (landing + feature highlights)
- `planner.html` — Interactive planner widgets (to-do, pomodoro, syllabus/energy, schedule)
- `about.html` — About page you can personalize with your story
- `styles.css` — Shared design system and page styling
- `app.js` — Planner logic only

## Run locally

```bash
python3 -m http.server 5173
```

Open:
- `http://localhost:5173/index.html`
- `http://localhost:5173/planner.html`
- `http://localhost:5173/about.html`

## Customize quickly

1. Edit your personal text in `about.html` under **Who I Am**, **Why This Website Exists**, and **My Goals**.
2. Adjust colors in `styles.css` (`:root` variables).
3. Add or replace motivational lines in `app.js` (`motivationLines` array).
