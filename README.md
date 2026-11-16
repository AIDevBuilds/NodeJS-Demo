# Node.js demo API

Express API with MongoDB (Mongoose) and JWT authentication.

## What it contains

- Routes: `/api/register`, `/api/auth`, `/api/refresh` (public); `/api/student` and `/api/users` (protected by `verifyJWT`)
- Middleware: request logger, CORS options, error handler, `verifyJWT`
- Models for users, profiles, students and comics (Mongoose)
- `bcrypt` for password hashing, `jsonwebtoken` for access and refresh tokens (the refresh token is sent in a `jwt` cookie), Joi validation on the student routes

## Stack

Node.js, Express 4.18, Mongoose 7, `jsonwebtoken` 9, `bcrypt` 5, Joi 17.

## Run

1. Start MongoDB locally. The connection string in `index.js` is `mongodb://127.0.0.1:27017/student`.
2. Create a `.env` file with `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` (long random strings) and, optionally, `port` (default 4000).
3. Then:

```sh
npm install
node index.js
```

## Notes

Request and error logs are written to `logs/`, which is not tracked.

## License

MIT. See [LICENSE](LICENSE).
