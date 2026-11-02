# briz-portfolio

Personal portfolio of Jemarco Briz, Data Engineer. The site is organized like a medallion pipeline:
**Bronze** (foundations), **Silver** (experience), and **Gold** (engineering).

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion, and Lucide. Every page is
statically prerendered. There is no database or backend.

## Run locally

Requires Node.js 20.9+ and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build (also type-checks)
pnpm start        # serve the production build
pnpm lint
```

## Project structure

```
src/
  app/                       routes, metadata, OG image, sitemap, robots
    experience/[slug]/       experience case studies
    projects/[slug]/         project case studies
  content/                   ← all site content lives here
  components/
    sections/                home page sections
    architecture/            interactive SVG diagram + tabbed showcase
    case-study/              shared case-study layout
    experience/              expandable timeline entry
    layout/                  header and footer
    ui/                      small primitives (tags, badges, buttons…)
  lib/                       tier colours, nav items, helpers
public/
  resume.pdf                 downloadable resume
```

## Updating content

All content is typed data in `src/content/`. Edit the data, not the components.

| What | File | Notes |
| --- | --- | --- |
| Name, headline, links | `profile.ts` | Set `siteUrl` to the deployed URL. |
| Experience | `experience.ts` | Add `caseStudy` to generate `/experience/<slug>`. Add `logo: "/logos/x.svg"` to replace the monogram. |
| Projects | `projects.ts` | Projects with `caseStudy` get `/projects/<slug>`. Set `experienceSlug` to link to an experience case study instead. |
| Diagrams | `architecture.ts` | Nodes sit on a grid (`col`, `row`). Reference a diagram by `id` from a project or case study. |
| Skills | `skills.ts` | `usedIn` decides the marker: professional, project, or familiar. Add items to `learning` to show "Currently learning". |
| Notes | `notes.ts` | Add `href` and `published` when an article goes live. |
| Education | `education.ts` | Add `certifications` entries to show them. |
| Resume | `public/resume.pdf` | Replace the file and keep the name. |

Accuracy conventions:

- `status` is `built`, `in-progress`, or `planned`. Never mark unfinished work as built.
- `scope` on contributions is `personal` (I built it), `participated` (I contributed), or `team` (the team delivered it).
- Architecture diagrams only contain components that really exist, with no proprietary details.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. The framework preset is
   detected as Next.js, and the default settings work as they are.
3. Deploy, then set `profile.siteUrl` in `src/content/profile.ts` to the final URL (or custom domain)
   so canonical URLs, the sitemap, and Open Graph tags are correct. Push again to redeploy.
