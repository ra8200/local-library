# Local Library

A Next.js 13 (App Router) web application for managing books in a library. Users can sign up, borrow books, and view their profile. The app uses:

- **Postgres** database hosted on [Neon](https://neon.tech/)
- **Drizzle ORM** (`@neondatabase/serverless` + `drizzle-orm/neon-http`)
- **Next.js 13** with the App Router
- **Day.js** for date/time utilities
- **ImageKit** for image (and video) uploads
- **NextAuth** (Credentials Provider) for authentication (optional)
- **TailwindCSS** for styling
- **Sonner** for toasts/notifications
- **Upstash QStash** for scheduling workflows (e.g. sending emails)
- **Resend** (or another email service) for sending emails

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup & Migrations](#database-setup--migrations)
- [Seeding the Database](#seeding-the-database)
- [Upstash QStash Workflows](#upstash-qstash-workflows)
- [Running the App](#running-the-app)
- [Usage Notes](#usage-notes)
- [Known Caveats](#known-caveats)
- [License](#license)

---

## Features

- **User Authentication (Credentials)**
  Users can sign in/out, or create an account depending on your NextAuth configuration.

- **Book Management**
  Add, remove, and view books in the collection. Each book has a title, author, genre, rating, cover image, and an optional trailer video link.

- **Borrowing/Returning Books**
  Maintains a `borrowRecords` table referencing users and books.

- **Image/File Upload**
  Uses **ImageKit** to upload book cover images and video trailers.

- **Admin/Regular Users**
  Admin routes and user routes (depending on your NextAuth or custom logic).

- **Styling**
  TailwindCSS for UI components and Sonner for toasts.

- **Scheduling & Emails**
  Upstash QStash workflows (e.g. CRON tasks) and email sending via Resend or another service.

---

## Project Structure

```
local-library/
|-- app
|   |-- (auth)
|   |   |-- layout.tsx
|   |   |-- sign-in
|   |   |   `-- page.tsx
|   |   `-- sign-up
|   |       `-- page.tsx
|   |-- (root)
|   |   |-- books
|   |   |   `-- [id]
|   |   |       `-- page.tsx
|   |   |-- layout.tsx
|   |   |-- my-profile
|   |   |   `-- page.tsx
|   |   `-- page.tsx
|   |-- admin
|   |   |-- books
|   |   |   |-- new
|   |   |   |   `-- page.tsx
|   |   |   `-- page.tsx
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- api
|   |   |-- auth
|   |   |   |-- auth
|   |   |   |   `-- [...nextauth]
|   |   |   |       `-- route.ts
|   |   |   `-- imagekit
|   |   |       `-- route.ts
|   |   `-- workflows
|   |       `-- onboarding
|   |           `-- route.ts
|   |-- globals.css
|   |-- layout.tsx
|   `-- too-fast
|       `-- page.tsx
|-- auth.ts
|-- components
|   |-- AuthForm.tsx
|   |-- BookCard.tsx
|   |-- BookCover.tsx
|   |-- BookCoverSvg.tsx
|   |-- BookList.tsx
|   |-- BookOverview.tsx
|   |-- BookVideo.tsx
|   |-- BorrowBook.tsx
|   |-- FileUpload.tsx
|   |-- Header.tsx
|   |-- admin
|   |   |-- ColorPicker.tsx
|   |   |-- Header.tsx
|   |   |-- Sidebar.tsx
|   |   `-- forms
|   |       `-- BookForm.tsx
|   `-- ui
|       |-- avatar.tsx
|       |-- button.tsx
|       |-- form.tsx
|       |-- input.tsx
|       |-- label.tsx
|       |-- sonner.tsx
|       `-- textarea.tsx
|-- components.json
|-- constants
|   `-- index.ts
|-- database
|   |-- drizzle.ts
|   |-- redis.ts
|   |-- schema.ts
|   `-- seed.ts
|-- drizzle.config.ts
|-- eslint.config.mjs
|-- hooks
|-- lib
|   |-- actions
|   |   |-- auth.ts
|   |   `-- book.ts
|   |-- admin
|   |   `-- actions
|   |       `-- book.ts
|   |-- config.ts
|   |-- ratelimit.ts
|   |-- utils.ts
|   |-- validations.ts
|   `-- workflow.ts
|-- next.config.ts
|-- postcss.config.mjs
|-- styles
|   `-- admin.css
|-- tailwind.config.ts
|-- tsconfig.json
`-- types.d.ts
```

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **Neon Postgres** account (or similar Postgres DB)
- **ImageKit** account for cover/video uploads (optional if you store elsewhere)
- **Upstash QStash** for scheduling tasks
- **Email Service** (Resend or similar) for sending emails
- **Environment Variables** in `.env.local`

---

## Installation

1. **Clone this repo**  
   ```bash
   git clone https://github.com/<your-repo>/local-library.git
   cd local-library
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

---

## Environment Variables

Create a **`.env.local`** in the project root (never commit this). Example:

```bash
# Postgres DB (Neon)
DATABASE_URL="postgres://user:pass@host.neon.tech/db?sslmode=require"

# NextAuth (optional)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="some_long_random_string"

# ImageKit
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/<account>"
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="public_xyz"
IMAGEKIT_PRIVATE_KEY="private_xyz"

# Upstash QStash
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="<your-token>"

# Resend or other mail service
RESEND_TOKEN="<your-token>"
```

---

## Database Setup & Migrations

We use **Drizzle** + **Neon**:

1. **Generate migration** if schema changed:
   ```bash
   npm run db:generate
   ```

2. **Apply (run) the migration**:
   ```bash
   npm run db:up
   ```

---

## Seeding the Database

If you have a `seed.ts` in `/database/seed.ts`:

```bash
npm run seed
```

---

## Upstash QStash Workflows

- **Create** a workflow in `/workflows` that uses QStash to schedule tasks (e.g. daily email reminders).
- **Configure** your QStash tokens (`QSTASH_URL`, `QSTASH_TOKEN`) in `.env.local`.
- **Implement** an API route or server action to be triggered by QStash. That route can send emails via Resend or handle other scheduled logic.

---

## Running the App

1. **Dev server**  
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

2. **Production**  
   ```bash
   npm run build
   npm run start
   ```
   Deploy to Vercel or your hosting platform.

---

## License

Use whatever license you prefer (MIT, Apache, etc.). For example:

```text
MIT License
```
