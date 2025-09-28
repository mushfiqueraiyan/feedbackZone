# Feedback Zone

A simple **Next.js 13+ (App Router)** web app where users can submit feedback and view all submissions. This project demonstrates the use of **API routes** for handling backend logic, as well as frontend state management and optional `localStorage` persistence.

Live Link: https://feedbackzone-omega.vercel.app/

## Features

- **Submit Feedback:** Users can enter their **Name**, **Email**, and **Feedback message**.
- **View Feedback:** All submitted feedback is displayed below the form.
- **Timestamp:** Each feedback stores the date and time it was submitted.
- **Backend API Routes:**
  - `GET /api/feedback` → Retrieve all feedback.
  - `POST /api/feedback` → Save new feedback.
- **LocalStorage (Bonus):** Feedback persists in the browser after reload (per device).

---

## Tech Stack

- **Frontend:** Next.js 13+, React, TailwindCSS
- **Backend:** Next.js API Routes (`/api/feedback`)
- **Storage:** In-memory array (demo purposes), optional localStorage persistence

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/feedback-app.git
cd feedback-app
```
