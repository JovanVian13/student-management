# Student Management

A simple student management dashboard built with Next.js, React, TypeScript, Tailwind CSS, and Zustand.

## Features

- Student list table with NIM, name, email, and department.
- Search students by NIM or email.
- Add, edit, and remove student records using client-side state.
- Responsive UI with reusable components for buttons, inputs, badges, modals, and pagination.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand for client state management
- Zod and React Hook Form for validation

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production app
- `npm run start` - Start the production server after build
- `npm run lint` - Run ESLint

## Project Structure

- `src/app` - Next.js app routes and layout
  - `(dashboard)` - Route group for dashboard pages
    - `mahasiswa` - Student management pages
      - `[id]` - Dynamic route for individual student
        - `edit` - Edit student page
  - `globals.css` - Global styles
  - `layout.tsx` - Root layout
  - `page.tsx` - Home page
- `src/components` - UI and feature components
  - `layout` - Navigation components (navbar, sidebar)
  - `mahasiswa` - Student-related components (table, search bar)
  - `ui` - Shared UI primitives (button, input, modal, etc.)
- `src/lib/store` - Zustand stores for student data
- `src/lib/data` - Sample student data
- `src/lib/types` - TypeScript models
- `src/lib/utils` - Utility functions and constants
- `src/lib/hooks` - Custom React hooks (pagination)

## Notes

This app uses client-side state only and does not persist data between page reloads. The initial student dataset is loaded from `src/lib/data/mahasiswa.json`.
