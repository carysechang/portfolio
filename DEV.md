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

Run the local development server:

```bash
npm run dev
```

The site will be available at [http://localhost:1313](http://localhost:1313).

## Production build

Create a production build in `public/`:

```bash
npm run build
```

## Where to edit content

- Homepage sections: `content/home/home.md`
- Resume page: `content/cv.md`
- Experience entries: `content/experience/`
- Education entries: `content/education/`
- Research/project entries: `content/projects/`
- Site configuration and menus: `hugo.toml`

## Notes

- Several sections still contain placeholder text in brackets like `[University Name]`.
- Replace sample contact info before publishing.
- SVG illustrations live in `assets/images/` and can be swapped without changing theme code.
