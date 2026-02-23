# Clerk Setup Guide

## 0. Enable Login Methods (Required for Google, Apple, Email, Phone)

In **Clerk Dashboard** → **Configure** → **User & Authentication**:

1. **Social connections**: Enable **Google** and **Apple** (add OAuth credentials for production)
2. **Email, Phone, Username**: Enable **Email address** and **Phone number** as sign-in options
3. **Domains**: Add **skyreviews.us** (and www.skyreviews.us) under **Configure** → **Domains** so Clerk works on your live site

Without these, the sign-in page will show but may have limited options.

---

## 1. Get API Keys

1. Go to [Clerk Dashboard → API Keys](https://dashboard.clerk.com/last-active?path=api-keys)
2. Copy your **Publishable Key** and **Secret Key**
3. Use **test** keys for development, **live** keys for production

## 2. Environment Variables

### Frontend (`.env.local` or build args)

```
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
```

### Backend (`.env` or docker-compose)

```
CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY
```

When `CLERK_SECRET_KEY` is set, the backend uses Clerk for auth instead of JWT.

## 3. Optional: Set User Roles in Clerk

To make a user an **admin**, add `role: "admin"` to their **Public metadata** in the Clerk Dashboard:

1. Clerk Dashboard → Users → select user → Public metadata
2. Add: `{ "role": "admin" }`

## 4. For API Calls with Auth

Components that call protected APIs (payments, enrollments) need to pass the Clerk token:

```js
import { useAuth } from '@clerk/clerk-react';

const { getToken } = useAuth();
const token = await getToken();

fetch('/api/payments/create-intent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({ courseId: '...' }),
});
```

Or use the `useApi` hook from `./hooks/useApi.js`.
