# Sky States – Senior Engineer Code Review

**Date:** February 2025  
**Scope:** Full testing, bug analysis, and fixes for EdTech course sales platform

---

## Executive Summary

The platform sells EdTech courses in the US market. Users browse on a landing page, must log in before purchase, then complete checkout. Post-login, users should see their profile, orders, and benefits. After payment, users should receive an order success and welcome email.

**Implemented in this review:**
- ✅ Checkout now requires login (redirects to sign-in if not authenticated)
- ✅ User dashboard at `/dashboard` (profile, orders, benefits)
- ✅ Post-payment email (order confirmation + welcome) via webhook and confirm route
- ✅ Profile management via Clerk at `/user`

**Remaining critical issues:**
- ⚠️ Payment flow is simulated – frontend does not call backend Stripe APIs
- ⚠️ Backend routes (payments, users, courses, enrollments, jobs) use Mongoose APIs but models are Sequelize – will crash when called
- ⚠️ Email sending requires SMTP env vars to be configured

---

## 1. Architecture Overview

| Layer       | Stack                  |
|------------|------------------------|
| Frontend   | React, Clerk, Stripe JS |
| Backend    | Node/Express, Sequelize (mock), Stripe |
| Auth       | Clerk (frontend + backend) |
| DB         | In-memory mock (no production DB) |

---

## 2. Bugs and Issues Found

### Critical

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | **Checkout not login-gated** | `App.js` | Users could complete checkout without logging in. **FIXED** – Checkout wrapped in `ProtectedRoute`. |
| 2 | **Payment is simulated** | `Checkout.jsx` `processPayment` | No real Stripe charge. Uses `setTimeout` and `clearCart()` only. Backend `/api/payments/create-intent` and `/api/payments/confirm` exist but are never called. |
| 3 | **DB / ORM mismatch** | `backend/routes/*`, `models/*` | Routes use Mongoose: `findById`, `findOne`, `populate`, `countDocuments`, `findByIdAndUpdate`. Models are Sequelize with `findAll`, `findByPk`, `create`. These routes will throw when invoked. |
| 4 | **No user dashboard** | Missing | No post-login dashboard for profile/orders/benefits. **FIXED** – Added `UserDashboard` at `/dashboard`. |

### High

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 5 | **No post-payment email** | `payments.js` webhook | `payment_intent.succeeded` handler was empty. **FIXED** – Added nodemailer + HTML template. Requires SMTP env vars. |
| 6 | **Hardcoded Stripe publishable key** | `Checkout.jsx` | Key in source. Should use `REACT_APP_STRIPE_PUBLISHABLE_KEY`. |
| 7 | **Auth forgot-password uses Mongoose** | `auth.js` | `User.findOne`, `user.save` – will fail with Sequelize model. |

### Medium

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 8 | **Clerk vs backend user sync** | `clerkAuth.js`, payments | Clerk `req.user` has `{ id, _id, role }`. Payment routes expect MongoDB user with `enrolledCourses`. Need mapping or dual storage. |
| 9 | **Sign-in redirect** | `SignInPage.js` | After login from protected checkout, redirect to `/checkout` may not always work. Added `redirect_url` handling. |
| 10 | **Checkout cart items shape** | `Checkout.jsx`, `directProgram` | `directProgram` has `{ name, price, duration }` but backend expects `courseId`. No mapping to backend courses. |

---

## 3. What Was Fixed

### 3.1 Checkout Login Gate
- Wrapped `/checkout` in `ProtectedRoute`
- Unauthenticated users are redirected to sign-in, then back to checkout after login

### 3.2 User Dashboard (`/dashboard`)
- Profile section (name, email, avatar from Clerk)
- Orders section (from `/api/payments/history`)
- Benefits section (static)
- “Manage Account” links to Clerk profile (`/user`)

### 3.3 Post-Payment Email
- `backend/services/emailService.js` – HTML template with order details and welcome message
- Webhook `payment_intent.succeeded` – sends email using metadata (customerEmail, courseName, etc.)
- Confirm route – sends email after enrollment creation
- Requires `SMTP_*` in `.env` (see `.env.example`)

### 3.4 Create-intent Metadata
- Added `customerEmail`, `customerName`, `courseName` to metadata for webhook email

---

## 4. Recommended Next Steps

### Immediate
1. **Wire real Stripe flow in frontend**
   - Replace `processPayment` with:
     - Call `POST /api/payments/create-intent` with `courseId`, `customerEmail`, `customerName`
     - Use `clientSecret` with Stripe Elements `confirmCardPayment`
     - Call `POST /api/payments/confirm` with `paymentIntentId`, `courseId`
2. **Resolve DB/ORM mismatch**
   - Either switch backend to Mongoose + MongoDB, or rewrite routes to use Sequelize APIs (`findByPk`, `findAll`, etc.).
3. **Configure SMTP** (SendGrid, Mailgun, Gmail) and set `SMTP_*` in `.env`.

### Short-term
4. Map Clerk users to backend users (sync or lookup on first purchase)
5. Add `REACT_APP_STRIPE_PUBLISHABLE_KEY` and use it in Checkout
6. Fix forgot-password route to use Sequelize or remove until DB is settled

### Long-term
7. Add real database (PostgreSQL or MongoDB) and migrations
8. Add E2E tests for auth → browse → login → checkout → email
9. Add basic monitoring and logging

---

## 5. File Changes Summary

| File | Change |
|------|--------|
| `frontend/src/App.js` | Protected checkout, added `/dashboard`, `/user/*` |
| `frontend/src/pages/UserDashboard.js` | New dashboard page |
| `frontend/src/pages/UserDashboard.css` | Styles for dashboard |
| `frontend/src/pages/UserProfilePage.js` | Clerk UserProfile wrapper |
| `frontend/src/pages/SignInPage.js` | `redirect_url` support for post-login redirect |
| `frontend/src/components/Header.js` | “Dashboard” link for signed-in users |
| `backend/routes/payments.js` | Email in webhook + confirm, metadata in create-intent |
| `backend/services/emailService.js` | New email service |
| `backend/.env.example` | SMTP env vars documented |
| `CODE_REVIEW.md` | This document |

---

## 6. How to Test

1. **Checkout login gate**
   - Log out → go to `/checkout` → should redirect to sign-in
   - Sign in → should land back on checkout
2. **Dashboard**
   - Sign in → click “Dashboard” → should see profile, orders, benefits
3. **Email**
   - Set `SMTP_*` in `.env`
   - Trigger a real Stripe payment (or add a manual test endpoint)
   - Confirm receipt of order confirmation + welcome email
