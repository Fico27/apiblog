# Blog API – Full-Stack Blog with Separate Reader & Admin Frontends

This project is the **Blog API** assignment from The Odin Project's Node.js course.

**The goal** was to build a **RESTful API-only backend** and then create **two completely separate frontends** that consume the same API:

- One public site for readers to view posts and leave comments  
- One private admin dashboard for the author to manage everything

### Why two frontends?

To demonstrate the real power of API-first design:
- Separation of concerns  
- Independent deployment  
- Different security models  
- Easy to scale or replace either frontend later

## Features

### Public Reader Site (frontend-user)
- View list of published posts
- View single post with full content & all comments
- Add new comments (requires login)
- Edit own comments
- Delete own comments  
- **Admin can delete any comment**

### Admin Dashboard (frontend-admin)
- List **all** posts (published + drafts)
- Create new post
- Edit existing post (title, content, publish status)
- Delete posts
- Toggle publish / unpublish
- Delete any comment

### Authentication
- Local email/password registration & login
- Google OAuth ("Sign in with Google")
- JWT (stored in localStorage)
- Role-based authorization (`user` vs `admin`)
- Protected routes (admin-only + comment ownership)

### Tech Stack

**Backend**
- Node.js + Express
- Prisma (PostgreSQL)
- JWT (jsonwebtoken)
- Passport + Google OAuth2
- Bcrypt for password hashing

**Frontend** (both apps)
- React (Vite)
- React Router v6
- Fetch API
- CSS (no frameworks / Tailwind)

**Database**  
PostgreSQL (local dev + Railway)

### Project Structure (Monorepo)

apiblog/
├── backend/               # Express + Prisma API
├── frontend-user/         # Public reader site (Vite + React)
└── frontend-admin/        # Private admin dashboard (Vite + React)

## Live Links

- **Public Reader Site** → https://apibloguser.netlify.app  
- **Admin Dashboard** → https://apiblogadmin.netlify.app  
