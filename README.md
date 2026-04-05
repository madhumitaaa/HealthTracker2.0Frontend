
---

# **Frontend README** – HealthTracker

```markdown
# HealthTracker Frontend

The frontend of **HealthTracker** is a React + Vite application providing a responsive and professional health dashboard. It interacts with the backend API for authentication, health entries, and AI-driven features.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Public Pages & Authentication](#public-pages--authentication)  
3. [Main App Layout](#main-app-layout)  
4. [Dashboard](#dashboard)  
5. [Add Entry](#add-entry)  
6. [History](#history)  
7. [Weekly Report](#weekly-report)  
8. [AI Chat](#ai-chat)  
9. [Daily Routine & Night Review](#daily-routine--night-review)  
10. [Core Infrastructure](#core-infrastructure)  
11. [Frontend Architecture](#frontend-architecture)  
12. [Environment Variables](#environment-variables)  
13. [Installation & Quick Start](#installation--quick-start)  
14. [Deployment](#deployment)  
15. [License](#license)  

---

## Project Overview

Frontend features:

- Landing page, login, register  
- Authenticated dashboards and protected routes  
- Health entry CRUD forms  
- AI-powered weekly reports, daily routines, night reviews  
- Charts, visualizations, and motivational panels  

Built with:

- React 18 + Vite  
- react-router-dom for routing  
- Axios for API requests  
- Context API for global state  

---

## Public Pages & Authentication

- Landing page with hero, feature highlights, CTA  
- Login page  
- Register page  
- Auth state stored in `localStorage`  
- Protected routes via `PrivateRoute`  
- Public route redirection via `PublicRoute`  
- Logout from sidebar redirects to `/login`  

---

## Main App Layout

- Persistent sidebar navigation: Dashboard, Add Entry, History, Weekly Report, AI Chat, Daily Routine, Night Review  
- Displays user email  
- Responsive overlay for smaller screens  

---

## Dashboard

- Metrics: Calories, Sleep, Steps, Heart Rate, Mood, Water Intake  
- Bar chart analytics  
- Motivation quote panel  
- Quick AI chat button  
- API-backed data fetching with loading and error handling  

---

## Add Entry

- Add or edit daily health entry  
- Inputs: Date, Calories, Sleep, Steps, Heart Rate, Mood, Water, Symptoms, Notes  
- Validation, loading, error handling  
- Delete entry when editing  

---

## History

- Past entries with expandable rows  
- Edit → navigates to Add Entry page  
- Delete with confirmation  
- Empty state support  

---

## Weekly Report

- Generate AI weekly health report  
- Single-button action  
- Loading, rate-limit, and fallback handling  

---

## AI Chat

- Real-time chat interface  
- User and assistant bubbles  
- Auto-scroll and typing indicator  
- Error handling and offline fallback  

---

## Daily Routine & Night Review

- AI-generated daily routine with task checkboxes  
- Night review: charts (pie, bar), completion rate, score  
- Protected authenticated pages  

---

## Core Infrastructure

- Centralized API modules (`axios`)  
- Global `AuthContext`  
- Reusable components: `Button`, `Loader`, `ErrorBanner`  
- Modern React + Vite  
- CSS modular styling  

---

## Frontend Architecture

```text
src/
├─ main.jsx          # React entrypoint
├─ App.jsx           # App routes & router
├─ index.css         # Global styles
├─ api/              # Axios API modules
│  ├─ auth.api.js
│  ├─ entries.api.js
│  └─ ai.api.js
├─ components/       # Shared UI components
│  ├─ common/
│  └─ layout/
├─ context/          # AuthContext & global state
├─ pages/            # Page views/routes
├─ routes/           # Route guard components
└─ styles/           # CSS files
