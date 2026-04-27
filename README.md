# Mohit Aggarwal Portfolio

A premium dark-theme portfolio built with Next.js + Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

## Before Deploying — Checklist

### 1. Replace YouTube Video IDs
Open `app/components/YouTube.tsx` and replace the `id` fields in the `videos` array with your actual YouTube video IDs.

Example: For `https://www.youtube.com/watch?v=abc123xyz` the ID is `abc123xyz`.

Also update `href` links to your actual YouTube channel URL.

### 2. Update Social Links
Open `app/components/Footer.tsx` and update:
- GitHub URL: `https://github.com/YOUR_USERNAME`
- YouTube URL: your channel
- Twitter/X: your handle
- LinkedIn: your profile

### 3. Update Project Links
Open `app/components/Projects.tsx` and update:
- `github` links to your actual repos
- `demo` links to your live projects

### 4. Replace Project Screenshots
Put your project screenshots in `/public/projects/`:
- `project-1.png` for Innovix
- `project-2.png` for MindCare

### 5. Your Photo
Your photo is already at `/public/assets/mohit.png`.
For a premium look, remove the background using https://remove.bg and replace the file.

## Deploy to Vercel

1. Push to GitHub
2. Import repo on https://vercel.com
3. Click Deploy

That's it.
