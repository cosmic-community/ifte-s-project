# Ifte's Project - Donation Platform

![App Preview](https://imgix.cosmicjs.com/5eb50dd0-510b-11f1-a7ac-13b65189cb4c-autopilot-photo-1516026672322-bc52d61a55d5-1778924470051.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern donation platform built with Next.js 16 and Cosmic CMS, featuring causes, campaigns, and donation tracking.

## Features

- 🏢 Browse charitable causes with rich descriptions
- 💝 Active campaigns with real-time funding progress
- 💌 View recent donations and supporter messages
- 📱 Fully responsive design
- ⚡ Server-side rendering for optimal performance
- 🎨 Beautiful, modern UI with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a083b6724cea58bf3251482&clone_repository=6a083c6124cea58bf32514b8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: donation project"

### Code Generation Prompt

> Build a Next.js application for a website called "Ifte's Project". The content is managed in Cosmic CMS with the following object types: causes, campaigns, donations. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: donation project

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS SDK

## Getting Started

### Prerequisites

- Bun (or Node.js 18+)
- A Cosmic account and bucket

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all causes
const { objects } = await cosmic.objects
  .find({ type: 'causes' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch campaigns with related causes
const { objects } = await cosmic.objects
  .find({ type: 'campaigns' })
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content types: **causes**, **campaigns**, and **donations**, with object relationships managed via Cosmic's depth queries.

## Deployment

Deploy to Vercel or Netlify. Configure these environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->