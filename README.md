# 🐾 PawPal — Pet Care Appointment Portal

A modern, full-stack pet care appointment portal with a premium UI inspired by Apple, Linear, Stripe, and Airbnb.

- **Frontend** — React 19, TypeScript, Vite, TanStack Router, Tailwind CSS v4, Framer Motion, shadcn/ui, Lucide icons, Sonner toasts.
- **Backend** — Node.js, Express, MongoDB (Mongoose), JWT authentication, bcrypt password hashing.
- **Design** — Beautiful gradients, glassmorphism, soft shadows, dark/light mode, smooth animations, floating navbar, custom scrollbar.

## ✨ Features

- Landing page with hero, features, services, about, testimonials, FAQ, contact & footer
- Auth: Login / Register / Forgot Password UI
- User Dashboard with stats, upcoming appointment, recent activity & quick actions
- **My Pets** — full CRUD
- **Services** — Vet consultation, Grooming, Vaccination, Training, Day Care
- 5-step **Appointment Booking** wizard with a delightful success animation
- **My Appointments** — view & cancel
- **Profile** — edit name, phone, address, avatar
- **Admin Dashboard** — view users, pets & appointments; delete appointments
- Toasts, skeletons, loading spinners, empty states, animated stats
- Fully responsive & fully accessible

## 🖥 Running the frontend (demo mode)

The frontend ships with a **built-in mock backend** using `localStorage`, seeded with realistic data — so the app runs immediately with no backend needed. This is the recommended path for evaluation.

```bash
bun install     # or npm install
bun dev         # or npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

**Demo credentials** (also shown on the login page):

| Role  | Email                | Password  |
| ----- | -------------------- | --------- |
| User  | `demo@pawpal.com`    | `demo123` |
| Admin | `admin@pawpal.com`   | `admin123` |

## 🛠 Running the full Express + MongoDB backend

The full backend lives in `/server` and follows the exact schemas below.

### 1. Requirements

- Node.js ≥ 18
- MongoDB running locally at `mongodb://localhost:27017` (or a MongoDB Atlas URI)

### 2. Install & configure

```bash
cd server
cp .env.example .env    # then edit values
npm install
```

`.env` example:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pawpal
JWT_SECRET=change-me-to-a-long-random-string
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Seed dummy data

```bash
npm run seed
```

### 4. Start the API

```bash
npm run dev     # nodemon
# or
npm start
```

The API listens on `http://localhost:5000` and exposes:

| Method | Route                              | Auth  | Description                        |
| ------ | ---------------------------------- | ----- | ---------------------------------- |
| GET    | `/api/health`                      | –     | Health check                       |
| POST   | `/api/auth/register`               | –     | Create account                     |
| POST   | `/api/auth/login`                  | –     | Sign in, returns JWT               |
| GET    | `/api/auth/me`                     | user  | Current profile                    |
| PATCH  | `/api/auth/me`                     | user  | Update profile                     |
| GET    | `/api/pets`                        | user  | List my pets                       |
| POST   | `/api/pets`                        | user  | Create pet                         |
| PATCH  | `/api/pets/:id`                    | user  | Update pet                         |
| DELETE | `/api/pets/:id`                    | user  | Delete pet                         |
| GET    | `/api/services`                    | –     | List services                      |
| GET    | `/api/appointments`                | user  | My appointments                    |
| POST   | `/api/appointments`                | user  | Book an appointment                |
| PATCH  | `/api/appointments/:id/cancel`     | user  | Cancel an appointment              |
| GET    | `/api/appointments/all`            | admin | All appointments                   |
| DELETE | `/api/appointments/:id`            | admin | Delete an appointment              |
| GET    | `/api/users`                       | admin | List all users                     |
| GET    | `/api/users/pets`                  | admin | List all pets                      |

## 📁 Folder structure

```
.
├── src/                    # Frontend (React + Vite + TanStack)
│   ├── assets/             # Static images
│   ├── components/         # Reusable components + shadcn/ui
│   ├── lib/
│   │   ├── store.ts        # Mock backend on localStorage
│   │   ├── seed.ts         # Dummy pets / users / appointments
│   │   ├── types.ts        # Shared TS types
│   │   └── use-auth.ts     # Auth + reactivity hooks
│   ├── routes/             # File-based routes
│   │   ├── __root.tsx
│   │   ├── index.tsx           # Landing page
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── forgot-password.tsx
│   │   ├── dashboard.tsx       # Dashboard layout
│   │   ├── dashboard.index.tsx
│   │   ├── dashboard.pets.tsx
│   │   ├── dashboard.services.tsx
│   │   ├── dashboard.book.tsx
│   │   ├── dashboard.appointments.tsx
│   │   ├── dashboard.profile.tsx
│   │   └── dashboard.admin.tsx
│   └── styles.css          # Design system tokens
└── server/                 # Backend (Express + MongoDB)
    ├── src/
    │   ├── index.js        # App entry
    │   ├── seed.js         # Seed script
    │   ├── middleware/auth.js
    │   ├── models/         # User, Pet, Service, Appointment
    │   └── routes/         # auth, pets, services, appointments, users
    ├── .env.example
    └── package.json
```

## 🎨 Theme

| Token       | Value      |
| ----------- | ---------- |
| Primary     | `#6366F1` |
| Secondary   | `#8B5CF6` |
| Accent      | `#06B6D4` |
| Background  | `#F8FAFC` |
| Dark        | `#0F172A` |

All colors are defined as `oklch` design tokens in `src/styles.css` and exposed as Tailwind utilities (`bg-primary`, `gradient-text`, `glass`, `hover-lift`, …).

## 📄 License

MIT — built with ❤️ for pets everywhere.
