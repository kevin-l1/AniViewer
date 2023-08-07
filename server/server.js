import 'dotenv/config';
import pg from 'pg';
import argon2 from 'argon2';
import express from 'express';
import jwt from 'jsonwebtoken';
import {
  ClientError,
  errorMiddleware,
  authorizationMiddleware,
} from './lib/index.js';
// import ClientError from './lib/client-error.js';
// import authorizationMiddleware from './lib/authorization-middleware.js';
// import errorMiddleware from './lib/error-middleware.js';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "account" ("username", "hashedPassword")
      values ($1, $2)
      returning *
    `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "hashedPassword"
        from "account"
      where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

// app.get('/api/entries', authorizationMiddleware, async (req, res, next) => {
//   try {
//     const sql = `
//       select * from "entries"
//         where "userId" = $1
//         order by "entryId" desc;
//     `;
//     const result = await db.query(sql, [req.user.userId]);
//     res.status(201).json(result.rows);
//   } catch (err) {
//     next(err);
//   }
// });

// app.post('/api/entries', authorizationMiddleware, async (req, res, next) => {
//   try {
//     const { title, notes, photoUrl } = req.body;
//     if (!title || !notes || !photoUrl) {
//       throw new ClientError(
//         400,
//         'title, notes, and photoUrl are required fields'
//       );
//     }
//     const sql = `
//       insert into "entries" ("userId", "title", "notes", "photoUrl")
//         values ($1, $2, $3, $4)
//         returning *;
//     `;
//     const params = [req.user.userId, title, notes, photoUrl];
//     const result = await db.query(sql, params);
//     const [entry] = result.rows;
//     res.status(201).json(entry);
//   } catch (err) {
//     next(err);
//   }
// });

// app.put('/api/entries/:entryId', authorizationMiddleware, async (req, res, next) => {
//   try {
//     const entryId = Number(req.params.entryId);
//     const { title, notes, photoUrl } = req.body;
//     if (!Number.isInteger(entryId) || !title || !notes || !photoUrl) {
//       throw new ClientError(
//         400,
//         'entryId, title, notes, and photoUrl are required fields'
//       );
//     }
//     const sql = `
//       update "entries"
//         set "title" = $1,
//             "notes" = $2,
//             "photoUrl" = $3
//         where "entryId" = $4 and "userId" = $5
//         returning *;
//     `;
//     const params = [title, notes, photoUrl, entryId, req.user.userId];
//     const result = await db.query(sql, params);
//     const [entry] = result.rows;
//     if (!entry) {
//       throw new ClientError(404, `Entry with id ${entryId} not found`);
//     }
//     res.status(201).json(entry);
//   } catch (err) {
//     next(err);
//   }
// });

// app.delete('/api/entries/:entryId', authorizationMiddleware, async (req, res, next) => {
//   try {
//     const entryId = Number(req.params.entryId);
//     if (!Number.isInteger(entryId)) {
//       throw new ClientError(400, 'entryId must be an integer');
//     }
//     const sql = `
//       delete from "entries"
//         where "entryId" = $1 and "userId" = $2
//         returning *;
//     `;
//     const params = [entryId, req.user.userId];
//     const result = await db.query(sql, params);
//     const [deleted] = result.rows;
//     if (!deleted) {
//       throw new ClientError(404, `Entry with id ${entryId} not found`);
//     }
//     res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);
app.use(authorizationMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
