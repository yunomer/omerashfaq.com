# omerashfaq.com

<!-- <img src="path/to/your/image.png" alt="omerashfaq.com — Omer Ashfaq" style="border-radius: 12px; border: 1px solid #e5e7eb" /> -->

<br>
<br>

My personal website, `omerashfaq.com`. This repository contains the source code for my personal online presence,
showcasing my projects, writings, and professional journey.

## Overview

The site includes the following main sections and functionalities:

- `/` — The main landing page.
- `/[slug]` — Dynamically generated pages for various content (e.g., `/about`, `/stack`).
- `/api` — Backend API endpoints.
- `/bookmarks` — A collection of curated bookmarks.
  - `/bookmarks/[slug]` — Detail pages for individual bookmark collections or items.
- `/bookmarks.xml` — An XML feed for bookmarks.
- `/career` — Information about my professional career and experience.
- `/journey` — A timeline or overview of my personal and professional journey.
- `/workspace` — Details about my development workspace and setup.
- `/writing` — My blog or collection of articles.
  - `/writing/[slug]` — Individual blog posts or articles.
- `/writing.xml` — An XML feed for writings.

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yunomer/omerashfaq.com.git
   ```
2. Navigate to the project directory:
   ```bash
   cd omerashfaq.com
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Then, fill in the necessary environment variables as defined in `.env.example`.

## Tech Stack

This project is built with the following technologies:

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Contentful](https://www.contentful.com)
- [Raindrop](https://raindrop.io)
- [Supabase](https://supabase.com)
- Deployed on [Vercel](https://vercel.com)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
