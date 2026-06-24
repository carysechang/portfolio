# Local Development

## Prerequisites

- Hugo extended (`hugo version`)
- Go (`go version`) for Hugo modules
- Node.js and npm (`node -v`, `npm -v`)

## First-time setup

Install the frontend dependencies:

```bash
npm install
```

Refresh Hugo module dependencies if needed:

```bash
hugo mod tidy
```

## Start the site locally

Open a terminal in the project folder. In Cursor, use **Terminal → New Terminal** (or `` Ctrl+` ``). In macOS, you can also use the **Terminal** app.

Make sure you are in the project directory:

```bash
cd /Users/caryse/Documents/git/caryse-website
```

Then start the dev server:

```bash
npm run dev
```

The site will be available at [http://localhost:1313](http://localhost:1313).

Press `Ctrl+C` in the same terminal window to stop the server.

### If you see "go not found in PATH"

This project keeps local copies of Hugo and Go in `.bin/` and `.go/`. The npm scripts add those automatically. If those folders are missing on your machine, ask for help running the one-time setup, or install Hugo extended and Go system-wide and run `hugo mod tidy` once before `npm run dev`.

## Production build

Create a production build in `public/`:

```bash
npm run build
```

## Where to edit content

- Homepage sections: `content/home/home.md`
- Resume page: `content/cv.md` (styled HTML resume; edit in Obsidian source mode)
- Experience entries: `content/experience/`
- Education entries: `content/education/`
- Research/project entries: `content/projects/`
- Site configuration and menus: `hugo.toml`

## Notes

- Several sections still contain placeholder text in brackets like `[University Name]`.
- Replace sample contact info before publishing.
- SVG illustrations live in `assets/images/` and can be swapped without changing theme code.
