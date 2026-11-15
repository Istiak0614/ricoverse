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
