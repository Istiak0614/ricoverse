# RICOVERSE API Contract

Base URL: `http://localhost:5000/api/v1` (dev) · `https://<render-app>.onrender.com/api/v1` (prod)

Every response uses one shape:

```json
{
  "success": true,
  "message": "Human readable message",
  "data": {},
  "meta": { "page": 1, "limit": 12, "total": 120, "totalPage": 10 }
}
```

Errors:

```json
{
  "success": false,
  "message": "Validation failed",
  "errorSources": [{ "path": "email", "message": "Invalid email" }]
}
```

Auth: send `Authorization: Bearer <accessToken>`. The refresh token lives in an httpOnly cookie.

---

## Health

### GET /health — public

Response `200`:

```json
{
  "success": true,
  "message": "RICOVERSE API is running",
  "data": { "status": "ok", "env": "development", "db": "connected", "uptime": 12.3 }
}
```

<!-- Backend: add every new endpoint below this line, module by module. -->

---

## Auth (WEB-3)

`PublicUser` (returned wherever a user appears; never includes the password):

```json
{
  "_id": "673a1f...",
  "name": "Jawadul Hasan",
  "email": "jawad@example.com",
  "role": "customer",
  "phone": "01712345678",
  "avatar": null,
  "createdAt": "2026-11-16T10:00:00.000Z"
}
```

The refresh token is set as an **httpOnly cookie** named `refreshToken` (path `/api/v1/auth`, 7 days).
The client never reads it; it only has to send requests with `withCredentials: true`.
The access token (15 min) is returned in the body and kept **in memory** on the client.

### POST /auth/register — public (rate limited)

Request:

```json
{ "name": "Jawadul Hasan", "email": "jawad@example.com", "password": "Secret123", "phone": "01712345678" }
```

- `password`: 8–72 chars, at least one letter and one number
- `phone`: optional, Bangladeshi mobile (`01XXXXXXXXX` or `+8801XXXXXXXXX`)
- Any `role` sent is ignored: new accounts are always `customer`

Response `201` (+ `Set-Cookie: refreshToken=...`):

```json
{ "success": true, "message": "Account created", "data": { "user": { "...PublicUser" }, "accessToken": "eyJ..." } }
```

Errors: `400` validation (`errorSources[].path` = field name), `409` email already exists, `429` too many attempts.

### POST /auth/login — public (rate limited)

Request: `{ "email": "jawad@example.com", "password": "Secret123" }`

Response `200` (+ cookie): same `data` shape as register, message `"Signed in"`.

Errors: `400` validation, `401` `"Incorrect email or password"`, `403` account blocked, `429` too many attempts.

### POST /auth/refresh-token — cookie

No body. Uses the `refreshToken` cookie.

Response `200`: `{ "data": { "user": { "...PublicUser" }, "accessToken": "eyJ..." } }`

Errors: `401` no/invalid/expired cookie (the cookie is also cleared). The client calls this on app load to restore the session, and whenever a request returns 401.

### POST /auth/logout — public

Clears the cookie. Response `200`, `data: null`.

### GET /auth/me — customer, admin

Header `Authorization: Bearer <accessToken>`. Response `200`: `data` = `PublicUser`.

### Protecting other routes (for every future module)

```ts
router.get('/orders/my', auth(), OrderController.getMyOrders);              // any signed-in user
router.post('/products', auth(USER_ROLE.admin), ProductController.create);  // admin only
// req.user = { userId, role, iat, exp }
```
