# Sky States – Security Checklist for Payment-Enabled Site

## CRITICAL (Fix Before Accepting Payments)

### 1. Password Hashing
**Current:** Passwords are stored in **plain text** and compared directly.
**Fix:** Use bcrypt to hash passwords on registration and verify on login.
- Register: `bcrypt.hash(password, 10)` before saving
- Login: `bcrypt.compare(password, user.password)` instead of `===`

### 2. Remove Sensitive Logging
**Current:** `console.log` for email, password, and comparison in auth routes.
**Fix:** Remove all logs containing credentials. Use generic messages like "Login failed" instead.

### 3. Payment Amount – Never Trust Client
**Current:** `const paymentAmount = amount || course.price * 100` – client can pass a lower `amount`.
**Fix:** Always use server-side course price: `const paymentAmount = Math.round(course.price * 100)`.

### 4. Stripe Webhook Body Parsing
**Current:** Webhook uses `express.raw({ type: 'application/json' })` but may conflict with global `express.json()`.
**Fix:** Mount the webhook route BEFORE `express.json()` so the body stays raw for signature verification. Use a separate router or ordering in server.js.

### 5. Strong JWT Secret
**Current:** Default/placeholder secret.
**Fix:** Generate a strong secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Store in `.env` as `JWT_SECRET` and never commit it.

### 6. HTTPS Only
- Ensure the site is served over HTTPS (Certbot/Let's Encrypt).
- Set `Secure` on cookies.
- Consider `Strict-Transport-Security` header.

---

## IMPORTANT (High Priority)

### 7. Stricter Rate Limiting
**Current:** 100 requests per 15 minutes (global).
**Fix:** Add separate limits for sensitive routes:
- `/api/auth/login`: 5 attempts per 15 min
- `/api/auth/register`: 3 per hour
- `/api/payments/*`: 20 per 15 min

### 8. CORS Restriction
**Current:** Uses `FRONTEND_URL` or `http://localhost:3000`.
**Fix:** In production, set `FRONTEND_URL=https://skyreviews.us` (or your domain). Do not use `*`.

### 9. Stripe Production Keys
- Use **live** API keys (`pk_live_`, `sk_live_`) in production.
- Never use test keys (`sk_test_`) for real payments.
- Set `STRIPE_WEBHOOK_SECRET` from Stripe Dashboard for the webhook endpoint.

### 10. Admin Route Protection
- `/api/admin/design` returns mock data – consider protecting with `protect` + `adminOnly` if it later exposes real data.
- Ensure coupon create/update/delete routes require admin.

### 11. Environment Variables
- Never commit `.env` (already in .gitignore).
- Use a secrets manager or secure env injection in production.
- Rotate `JWT_SECRET`, Stripe keys, and other secrets periodically.

---

## RECOMMENDED (Best Practice)

### 12. Security Headers
- Keep Helmet enabled.
- Add `Content-Security-Policy` for XSS protection.
- Add `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`.

### 13. Input Validation
- You use express-validator – keep it for all user input.
- Add validation for payment-related payloads (courseId, etc.).
- Sanitize any HTML/user content to prevent XSS.

### 14. Error Messages
- Avoid exposing stack traces or internal errors to clients in production.
- Use generic messages like "An error occurred" for 500 responses.

### 15. Database
- When moving from in-memory mock to PostgreSQL/MongoDB:
  - Use parameterized queries to prevent SQL/NoSQL injection.
  - Ensure connections use TLS where possible.
  - Restrict DB access to app server only.

### 16. Monitoring & Logging
- Log failed logins, payment failures, and suspicious activity.
- Never log full card data or passwords.
- Set up alerts for unusual traffic or errors.

### 17. PCI Compliance (Stripe)
- Use Stripe Elements / Checkout – card data should never touch your server.
- Avoid storing card numbers; rely on Stripe tokens/intents.
- Review [Stripe security best practices](https://stripe.com/docs/security/guide).

---

## INFRASTRUCTURE

### 18. Server Hardening
- Keep OS and Node.js updated.
- Use a firewall (e.g. ufw) and allow only required ports (80, 443, 22).
- Disable unnecessary services.

### 19. Backups
- Regular automated backups of database and config.
- Encrypt backups at rest.

### 20. DDoS / WAF
- Consider Cloudflare or similar for DDoS protection and WAF rules.
- Rate limiting at the reverse proxy level.

---

## Quick Reference

| Priority   | Item                | Status     |
|-----------|---------------------|-----------|
| CRITICAL  | Hash passwords      | Must fix  |
| CRITICAL  | Remove password logs| Must fix  |
| CRITICAL  | Server-side amount  | Must fix  |
| CRITICAL  | JWT secret          | Must fix  |
| CRITICAL  | HTTPS               | Configure |
| IMPORTANT | Auth rate limits    | Recommended |
| IMPORTANT | Stripe live keys    | Production |
| IMPORTANT | Webhook body order  | Verify    |
