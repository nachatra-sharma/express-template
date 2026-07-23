# Express + TypeScript Starter Template

A layered Express 5 backend template with TypeScript, Zod validation, structured logging, per-request correlation IDs, and centralized error handling.

Built as a reusable starting point so a new API doesn't begin with wiring the same plumbing again.

## Stack

| Concern    | Choice                             |
| ---------- | ---------------------------------- |
| Runtime    | Node.js (ESM, `"type": "module"`)  |
| Framework  | Express 5                          |
| Language   | TypeScript (strict, `nodenext`)    |
| Validation | Zod v4                             |
| Logging    | Winston (console + file transport) |
| Tracing    | `AsyncLocalStorage` + `uuid`       |
| Dev runner | `tsx watch`                        |

## Getting started

```bash
npm install
cp .env.example .env    # then edit values
npm run dev             # http://localhost:3000
```

### Scripts

| Script          | What it does                                                  |
| --------------- | ------------------------------------------------------------- |
| `npm run dev`   | Runs `src/` with `tsx watch`, reloads on change, loads `.env` |
| `npm run build` | Compiles TypeScript to `dist/`                                |
| `npm start`     | Runs the compiled build from `dist/`                          |

### Environment

| Variable | Required | Default | Notes                                                                                                                      |
| -------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `PORT`   | No       | `3000`  | Must be a positive integer. Validated at boot — an invalid value crashes the process instead of starting on a broken port. |

Environment variables are parsed through a Zod schema in `src/validators/env.validator.ts` before the server starts. Fail fast, don't limp.

## Project structure

```
src/
├── index.ts                 # app entry: middleware order, route mounting, listen
├── config/
│   ├── index.ts             # loads + validates env, exports ServerConfig
│   └── logger.config.ts     # winston logger, injects correlation ID into every line
├── routers/v1/
│   ├── index.router.ts      # v1 router aggregator
│   ├── ping.router.ts
│   └── user.router.ts
├── controllers/             # request handlers
├── validators/
│   ├── validator.ts         # generic body/params/query validation middleware
│   ├── env.validator.ts
│   └── user.validator.ts    # per-route schemas
├── middlewares/
│   ├── correlation.middleware.ts   # assigns a request ID, stored in AsyncLocalStorage
│   ├── error.middleware.ts         # centralized error handler
│   └── notfound.middleware.ts      # 404 catch-all
└── utils/
    ├── error.utils.ts       # typed error classes with HTTP status codes
    └── helpers/
```

The layering is deliberate: **router** decides the path, **validator** guards the input, **controller** does the work, **error handler** owns the response when something fails.

## API

All routes are mounted under `/api/v1`.

| Method | Route              | Body                 | Description                  |
| ------ | ------------------ | -------------------- | ---------------------------- |
| `GET`  | `/api/v1/ping`     | —                    | Health check, returns `pong` |
| `POST` | `/api/v1/user`     | `{ "name": string }` | Validated example route      |
| `GET`  | `/api/v1/user/:id` | —                    | Example URL-param route      |

### Response shape

Success:

```json
{ "success": true, "message": "pong", "error": {} }
```

Validation failure (`400`):

```json
{
  "success": false,
  "message": "Not a valid request",
  "error": {
    "error": [{ "code": "invalid_type", "path": ["name"], "message": "..." }]
  }
}
```

Handled error (status from the thrown error class):

```json
{
  "success": false,
  "message": "The file was not found",
  "data": {},
  "error": {}
}
```

Unhandled error (`500`) returns a generic `"Internal Server Error"` message — internals are logged, never sent to the client.

## Error handling

`src/utils/error.utils.ts` defines error classes that each carry an HTTP status code: `BadRequest` (400), `UnauthorizedError` (401), `ForbiddenError` (403), `NotFoundError` (404), `ConflictError` (409), `InternalServerError` (500), `NotImplementedError` (501).

Throw one from anywhere and the centralized handler in `src/middlewares/error.middleware.ts` turns it into a response:

```ts
throw new NotFoundError("The file was not found");
```

Errors without a status code are treated as unexpected: logged with the correlation ID, answered with a generic 500.

## Logging & correlation IDs

Every incoming request gets a UUID stored in `AsyncLocalStorage`. The Winston formatter reads it automatically, so **every log line carries the correlation ID without passing it around manually**:

```json
{
  "timestamp": "23-07-2026 18:08:14",
  "message": "req body validated successfully.",
  "correlationID": "16f6321c-1b8c-4b49-995e-82f7526d3d2e",
  "level": "info",
  "data": {}
}
```

Logs go to the console and to `logs/app.log` (gitignored).
