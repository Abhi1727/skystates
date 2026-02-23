# Environment Variables & Database

## Current Status

### Database: **In-Memory (No SQL)**
The project uses an **in-memory mock** in `backend/config/database.js`. No PostgreSQL or other database is connected.

- **Data is lost** when the server restarts
- Users, courses, enrollments, payments, etc. are stored in memory only
- Suitable for **testing/demo only** – not for production with real payments

### Do You Need a Database?

**Yes, for production with payments.** You need persistent storage for:
- User accounts
- Enrollments and payment records
- Courses and jobs
- Audit trails

---

## Environment Variables Used

| Variable | Required | Purpose |
|----------|----------|---------|
| `NODE_ENV` | No (default: development) | Set to `production` for live |
| `PORT` | No (default: 5000) | Backend port |
| `FRONTEND_URL` | Yes (production) | CORS origin, e.g. `https://skyreviews.us` |
| `JWT_SECRET` | **Yes** | Sign/verify tokens. Generate: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `JWT_EXPIRE` | No (default: 7d) | Token expiry |
| `STRIPE_SECRET_KEY` | Yes (for payments) | From [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | Yes (for webhooks) | From Stripe webhook settings |

---

## External Services

| Service | Status | Notes |
|---------|--------|-------|
| **Stripe** | Optional (for payments) | Without it, checkout will fail. Use test keys (`sk_test_`) for dev. |
| **Database** | None connected | In-memory store only. Add PostgreSQL for production. |
| **Email** | Not configured | Forgot/reset password and confirmations need an email provider. |
| **Cloudinary** | In package.json | Used for image uploads if implemented. |

---

## Adding PostgreSQL (When Ready)

1. Install PostgreSQL and create a database
2. Replace `backend/config/database.js` with real Sequelize config:
   ```js
   const { Sequelize } = require('sequelize');
   const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });
   ```
3. Define proper models (User, Course, Enrollment, etc.) with Sequelize
4. Run migrations
5. Add `DATABASE_URL` to `.env`

The backend already uses `pg` and `sequelize` – the models just need to point at a real DB instead of the mock.
