# LinkFlow Engineering Devlog — Month 1

## March 1–31, 2026 — Foundation

**Month 1 mission:** understand the primitives before allowing libraries and abstractions to hide them.

The roadmap divides March into four major stages: raw authentication and Express, PostgreSQL/Prisma, Better Auth integration, and finally monorepo/API hardening. By March 31, the intended milestone is a working application where a user can register, authenticate, use OAuth, and reach a protected dashboard.

For this devlog, I am keeping those dates and objectives intact. The debugging situations, failed implementations, assumptions, architectural discussions, and technical debt below are **realistic development scenarios added to make the devlog useful as an engineering record** rather than pretending every implementation worked perfectly on the first attempt.

---

# Week 1 — Raw Auth + Express Foundation

### March 1–7

The roadmap deliberately starts without Better Auth. The goal is to understand passwords, JWTs, cookies, authentication middleware, logout, and token security deeply enough that when we introduce an authentication library later, we understand what it is doing for us.

---

# Day 1 — March 1, 2026

## Building the Foundation

### Today's objective

Start LinkFlow.

The first goal wasn't to build a feature. It was to establish an architecture that wouldn't become painful once the application contained authentication, links, analytics, background workers, Redis, payments, and multiple deployment targets.

### What I built

I created the initial monorepo structure.

```text
linkflow/
├── apps/
│   ├── web/
│   └── api/
├── packages/
├── package.json
├── pnpm-workspace.yaml
└── .gitignore
```

`apps/web` contains the Next.js application.

`apps/api` contains the Express API.

Both applications can run independently while remaining inside the same repository.

I also created the first backend endpoint:

```http
GET /health
```

Expected response:

```json
{
  "status": "ok"
}
```

It looks trivial, but this endpoint will eventually become important for Docker health checks, deployment verification and CI/CD.

### First assumption that broke

I initially treated environment variables as something that could simply be read throughout the application:

```ts
process.env.DATABASE_URL
```

That creates a dangerous situation.

If `DATABASE_URL` is missing, the server might successfully start and only fail when the first database operation occurs.

That means:

```text
Server started successfully
        ↓
Deployment appears healthy
        ↓
User sends request
        ↓
Database configuration accessed
        ↓
💥 Runtime failure
```

Configuration errors should be startup errors.

### Improvement

I introduced fail-fast environment validation.

Conceptually:

```text
process.env
    ↓
environment schema
    ↓
validate
    ↓
typed configuration
    ↓
application starts
```

If required configuration is missing, the API refuses to boot.

### Intentional failure

I removed a required variable and restarted the server.

Instead of discovering the problem during a request, startup immediately failed.

Exactly what I wanted.

### Engineering lesson

**Configuration is an application boundary.**

Invalid configuration should prevent startup rather than creating partially functioning services.

### Technical debt discovered

Our `/health` endpoint currently proves only:

> The Node.js process is alive.

It does **not** prove:

- database connectivity;
- Redis connectivity;
- worker availability;
- application readiness.

Later I'll probably need to distinguish:

```text
/health/live
/health/ready
```

### End-of-day status

```text
Next.js                    ✅
Express                    ✅
pnpm workspace             ✅
Health endpoint            ✅
Environment validation     ✅
Database                   ⏳
Authentication             ⏳
```

### Commit

```text
chore: initialize LinkFlow monorepo
```

---

# Day 2 — March 2

## Raw SQL Day — No ORM Allowed

The roadmap specifically requires PostgreSQL in Docker, manual `Users` and `Links` tables, and hand-written `INSERT`, `SELECT`, and `JOIN` queries before Prisma is introduced.

### Why deliberately avoid Prisma?

Because this:

```ts
prisma.user.findUnique(...)
```

is convenient.

But I want to understand what eventually happens underneath it.

Today there was no ORM.

### PostgreSQL environment

I started PostgreSQL through Docker and connected using `psql`.

Then manually created the first tables.

Conceptually:

```text
users
 ├── id
 ├── email
 ├── password_hash
 └── created_at

links
 ├── id
 ├── user_id
 ├── title
 ├── url
 └── created_at
```

The important part was the relationship:

```text
users
  1
  │
  │
  N
links
```

A link belongs to a user.

### Queries practiced

I manually wrote operations such as:

```sql
INSERT INTO users ...
SELECT * FROM users ...
SELECT * FROM users WHERE email = ...
```

Then JOINs:

```sql
SELECT ...
FROM users
JOIN links ON ...
```

### Bug: Docker container works, application doesn't

`psql` inside the PostgreSQL container connected successfully.

My API couldn't.

That initially made it look like PostgreSQL was broken.

It wasn't.

### Root cause

I had confused:

```text
localhost from host machine
```

with:

```text
localhost from another Docker container
```

`localhost` always means **this machine/container**, not magically "my database."

This became my first real Docker networking lesson.

### Another issue

I destroyed and recreated the container and wondered why the database disappeared.

That led directly to understanding Docker volumes.

```text
Container
   ↓ can disappear

Volume
   ↓ persists

PostgreSQL data
```

### Engineering lesson

Using an ORM without understanding SQL makes database debugging unnecessarily mysterious.

Today removed some of that mystery.

### Technical debt

The schema is intentionally primitive.

Constraints, indexes and production schema design come later.

### Commit

```text
feat(db): add local postgres and raw database schema
```

---

# Day 3 — March 3

## Authentication Primitives — Registration From Scratch

The roadmap's Day 3 task is to implement registration manually using password hashing and duplicate-email protection.

### Registration flow

I wanted:

```text
POST /register
      ↓
validate request
      ↓
check existing email
      ↓
hash password
      ↓
create user
      ↓
return safe user
```

### Password storage

One rule became immediately clear:

**Never store passwords.**

Store password hashes.

I used bcrypt.

```text
password
   ↓
bcrypt + salt
   ↓
password hash
   ↓
database
```

### Mistake #1 — returning too much

My first implementation effectively returned the database user object.

That object contained the password hash.

The password wasn't exposed, but the hash should not leave the authentication layer either.

### Fix

Explicitly construct public user responses.

```text
Database User
 ├── id              → return
 ├── email           → return
 ├── passwordHash    → NEVER return
 └── createdAt       → return
```

### Race-condition thought experiment

My duplicate-email logic looked like:

```text
Does email exist?
       ↓ no
Create user
```

But imagine two requests:

```text
Request A → email doesn't exist
Request B → email doesn't exist

Request A → INSERT
Request B → INSERT
```

Application-level checks alone aren't enough.

### Correct protection

The database must enforce uniqueness too.

```text
Application validation
        +
Database UNIQUE constraint
```

The application check provides a nice error.

The database constraint provides correctness.

### Added failure scenario

Two registration requests were fired almost simultaneously.

The exercise demonstrated why database constraints are part of business correctness rather than merely database optimization.

### Lesson

> If correctness depends on uniqueness, enforce uniqueness where the data lives.

### Commit

```text
feat(auth): implement raw user registration
```

---

# Day 4 — March 4

## JWT Deep Dive

Today the roadmap moves registration into login and asks us to manually generate and inspect JWTs, understand `iat`, `exp`, payload visibility, and store the token in an `httpOnly` cookie.

### Login flow

```text
POST /login
    ↓
find user
    ↓
compare password
    ↓
generate JWT
    ↓
set cookie
    ↓
authenticated
```

### Important discovery

I decoded the token.

The payload was readable.

That killed an incorrect assumption:

> JWTs are encrypted.

Normally, they're not.

They're **encoded and signed**.

Therefore:

```text
JWT payload ≠ secret storage
```

Never put passwords, API keys or sensitive private data inside the payload just because the token is signed.

### Cookie storage

Instead of exposing the JWT directly to frontend JavaScript, I stored it in an `httpOnly` cookie.

That means:

```text
Browser stores token
        ↓
JavaScript cannot read it
        ↓
browser sends cookie with requests
```

### Cookie debugging problem

Authentication worked in one test but the browser didn't persist the cookie.

Potential suspects included:

- `secure`;
- `sameSite`;
- domain;
- path;
- CORS;
- credentials;
- HTTP vs HTTPS.

This was a useful preview of something I expect to encounter again once frontend/backend authentication is separated across origins.

### Security realization

Authentication isn't:

```text
"generate JWT"
```

It's an entire trust boundary involving:

```text
password hashing
token signing
expiration
transport
cookies
CORS
CSRF
revocation
session lifecycle
```

### Lesson

Libraries make auth look small.

The security problem isn't small.

### Commit

```text
feat(auth): implement JWT login and cookie session
```

---

# Day 5 — March 5

## Protected Routes and Authentication Middleware

Now I needed to prove authentication on every protected request.

### Desired flow

```text
Request
   ↓
read auth cookie
   ↓
verify JWT
   ↓
extract user identity
   ↓
attach authenticated context
   ↓
route handler
```

I created authentication middleware and then:

```http
GET /me
```

### First middleware design mistake

The middleware became responsible for too much:

- reading cookies;
- verifying JWT;
- fetching users;
- formatting responses;
- handling authorization.

Authentication and authorization started blending together.

### Separation

I wrote down a rule:

```text
Authentication:
"Who are you?"

Authorization:
"Are you allowed to do this?"
```

That distinction will become extremely important once users can modify links.

### Failure cases tested

I tested:

```text
No token
Malformed token
Invalid signature
Expired token
Valid token
```

Each should fail predictably.

### TypeScript issue

Attaching a user to Express's request object caused TypeScript complaints because `Request` doesn't know about our custom property.

That introduced declaration augmentation/custom request typing.

Small problem, useful lesson.

### Lesson

Middleware should establish authenticated identity.

Individual resources/services should enforce ownership and authorization.

### Commit

```text
feat(auth): add authentication middleware and me endpoint
```

---

# Day 6 — March 6

## Logout, Revocation and the Limits of JWT

Today's roadmap asks for logout, the Redis blacklist concept, and a design exercise around refresh tokens.

### Logout implementation

The simple implementation:

```text
POST /logout
      ↓
clear auth cookie
```

Done?

Not quite.

### Important realization

Clearing the browser cookie does **not** invalidate the JWT cryptographically.

If someone already possessed that token, it could potentially remain valid until expiration.

That exposed one of the major tradeoffs of stateless JWT authentication.

### Token blacklist idea

One possibility:

```text
logout
  ↓
store token identifier in Redis
  ↓
middleware checks blacklist
  ↓
reject revoked token
```

But now every supposedly "stateless" authentication request requires server-side state.

Interesting tradeoff.

### Refresh-token design exercise

I didn't implement refresh tokens today because the roadmap explicitly keeps this at the design level.

I mapped:

```text
Short-lived access token
        +
Long-lived refresh token
        ↓
access token expires
        ↓
refresh endpoint
        ↓
new access token
```

Then immediately found more questions:

- Where is the refresh token stored?
- Should refresh tokens rotate?
- What happens if one is stolen?
- How do we detect reuse?
- How do we revoke all sessions?
- How do multiple devices work?

Auth keeps expanding.

### Lesson

A feature called "logout" has very different semantics depending on the session architecture.

### Technical debt

Raw JWT auth is educational, not necessarily the final LinkFlow implementation.

That is intentional.

### Commit

```text
feat(auth): implement logout and document token lifecycle
```

---

# Day 7 — March 7

## Week 1 Review — Can I Explain Auth Without Code?

No new system today.

The roadmap requires reviewing the week and writing a README explaining authentication in my own words.

### Authentication model I can now explain

```text
REGISTER
password
   ↓ bcrypt
hash
   ↓
database


LOGIN
password + stored hash
        ↓
bcrypt compare
        ↓
JWT signed
        ↓
httpOnly cookie


PROTECTED REQUEST
cookie
  ↓
JWT verification
  ↓
authenticated identity
  ↓
route


LOGOUT
clear cookie
```

### Things that confused me this week

1. JWT signing vs encryption.
2. Cookies vs tokens aren't really competing concepts—a token can be transported using a cookie.
3. Application uniqueness checks don't replace database constraints.
4. Logout doesn't automatically revoke a stateless token.
5. Authentication and authorization are different responsibilities.

### First interview story

> I intentionally implemented authentication manually before introducing Better Auth so that session management, password hashing and middleware weren't black boxes.

### Week 1 status

```text
Raw registration        ✅
bcrypt                   ✅
Raw login                ✅
JWT                      ✅
httpOnly cookies         ✅
Protected endpoints      ✅
Logout                   ✅
Auth lifecycle understood much better
```

---

# Week 2 — PostgreSQL + Prisma Deep Dive

## March 8–14

The second week moves deeper into relational databases before introducing Prisma as the abstraction layer. The roadmap specifically includes SQL, indexes, transactions, race conditions, schema design, N+1 queries and database seeding.

---

# Day 8 — March 8

## PostgreSQL Mastery and the First Index

Today I wrote SQL manually again.

Queries included:

```text
SELECT
WHERE
ORDER BY
LIMIT
JOIN
COUNT
```

### Performance experiment

I queried users by email.

Then inspected how PostgreSQL found the row.

Without an appropriate index:

```text
Sequential Scan
```

After indexing:

```text
Index Scan
```

### Important lesson

An index isn't:

> "make database fast."

An index is a data structure with costs.

It can improve reads while adding:

- storage;
- write overhead;
- maintenance.

Therefore:

> Index what your actual query patterns require.

Not every column.

### Future connection

I expect this lesson to become much more important when analytics produces large numbers of click events.

### Commit

```text
perf(db): experiment with postgres indexes
```

---

# Day 9 — March 9

## Transactions and My First Deliberate Race Condition

The roadmap calls this "critical production knowledge."

I intentionally built a situation where multiple operations needed to succeed together.

Conceptually:

```text
Operation A
Operation B
Operation C
```

Without a transaction:

```text
A succeeds
B succeeds
C fails

Database = partially updated
```

With a transaction:

```text
BEGIN

A
B
C

COMMIT
```

or:

```text
ROLLBACK
```

### ACID

I reviewed:

```text
Atomicity
Consistency
Isolation
Durability
```

### Race-condition experiment

Two requests read the same state before either had finished writing.

That demonstrated:

> Correct code executed concurrently can still produce incorrect results.

This was a major mental shift.

### Future implications

I wrote down places where LinkFlow may eventually encounter concurrency:

- username registration;
- link limits;
- link ordering;
- Stripe webhooks;
- analytics counters;
- background jobs;
- account upgrades.

### Lesson

Transactions aren't only about "multiple SQL statements."

They're about maintaining invariants while the world is changing concurrently.

---

# Day 10 — March 10

## Prisma Enters the Project

Now that I had manually worked with SQL, I allowed the ORM in.

### Prisma setup

I installed Prisma in the API and created:

```text
schema.prisma
```

Then ran migrations.

### Important rule

I didn't want this:

```text
Prisma worked → move on
```

I inspected the generated migration SQL.

The goal was to connect:

```text
Prisma schema
      ↓
migration
      ↓
SQL
      ↓
PostgreSQL
```

### Migration problem scenario

During experimentation, I modified schema state manually and later encountered migration disagreement.

This introduced the idea of **migration drift**.

The lesson was immediate:

> Once migrations become the history of your database, casually changing the database behind the migration system creates trouble.

### Development rule created

Schema changes go through migrations.

Don't manually "fix" production schemas unless there is a deliberate migration/recovery procedure.

### Commit

```text
feat(db): integrate prisma and database migrations
```

---

# Day 11 — March 11

## Designing the LinkFlow Schema

The PDF calls for:

```text
User
Link
ClickEvent
Subscription
```

with relationships, indexes and constraints.

### Design exercise

Instead of immediately creating fields, I started with relationships.

```text
User
 ├── Links
 ├── ClickEvents
 └── Subscription
```

### Questions that appeared

Should `ClickEvent` belong directly to a user?

Or can user ownership be determined through:

```text
ClickEvent → Link → User
```

Should links be hard deleted?

If a link disappears, what happens to historical analytics?

Should subscription state live directly on `User`?

Or should billing history have its own model?

These weren't TypeScript questions.

They were domain-model questions.

### Important realization

Database schema design is really about deciding:

> What truths does the application need to preserve?

### Index planning

Rather than randomly indexing everything, I identified likely query patterns.

Examples:

```text
find user by email
find user by username
get links for user
get click events for link + date
```

Indexes should eventually follow those patterns.

### Technical debt

Analytics is months away.

Avoid overengineering its schema before we understand actual access patterns.

---

# Day 12 — March 12

## Prisma Queries vs Raw SQL

Today I recreated familiar operations through Prisma:

- find user;
- create link;
- get user's links;
- count clicks.

The interesting part wasn't writing the queries.

It was asking:

> What SQL is Prisma hiding from me?

### Comparison

What appears as:

```ts
await prisma.link.findMany(...)
```

may translate into database operations involving filters, joins, sorting and indexes.

### ORM rule

I wrote down:

> Prisma makes database access easier. It does not make database knowledge optional.

### Added debugging scenario

A query returned more data than needed.

The ORM made it extremely easy to fetch full objects.

That introduced another performance rule:

> Convenience can encourage over-fetching.

As datasets grow, selecting only required fields becomes relevant.

### Commit

```text
feat(db): add initial prisma repositories and queries
```

---

# Day 13 — March 13

## Creating the N+1 Problem on Purpose

This is one of my favorite days so far.

The roadmap explicitly asks me to deliberately create an N+1 query, observe roughly 100 database calls instead of one, and then fix it.

### Bad implementation

Conceptually:

```text
Get users                 → 1 query

for each user:
    get their links       → N queries
```

Total:

```text
1 + N queries
```

For 100 users:

```text
101 database queries
```

The code looked innocent.

That was the point.

### Fix

Load relationships appropriately rather than querying them individually.

Conceptually:

```text
Users + required link data
        ↓
small predictable number of queries
```

### Why this matters

The performance problem wasn't obvious from reading the route handler.

It became obvious when observing database activity.

### Lesson

Application performance can't be understood purely from application code.

You need visibility into what the database is actually doing.

### Interview note

**N+1 bugs are dangerous because the implementation often looks perfectly reasonable at small scale.**

---

# Day 14 — March 14

## Seed Data and the End of Week 2

The roadmap requires a seed script producing ten fake users with five links each.

### Why seed data matters

Without realistic data:

```text
Empty dashboard → looks fine
One user         → looks fine
One link         → looks fine
```

Realistic data exposes assumptions.

I created repeatable development data so the application could be reset to a known state.

### New problem

Running the seed multiple times could produce duplicate data.

That forced a decision:

Should seeding be:

- destructive;
- idempotent;
- environment-specific?

### Safety rule

Never allow development seed/reset behavior to accidentally target production.

### Week 2 status

```text
Raw SQL             ✅
Indexes             ✅
Transactions        ✅
Race conditions     ✅
Prisma              ✅
Schema design       ✅
N+1 understanding   ✅
Seed data           ✅
```

---

# Week 3 — Better Auth Integration

## March 15–21

This is where the roadmap intentionally replaces the raw authentication system with Better Auth. The point is no longer "avoid libraries"; it is to understand what the library abstracts because we already built the primitives ourselves.

---

# Day 15 — March 15

## Replacing My Authentication With Better Auth

Today was the payoff for Week 1.

I installed Better Auth and configured email/password authentication.

### The difference

Week 1 felt like:

```text
bcrypt
JWT
cookies
middleware
token expiration
session decisions
```

Now:

```text
Better Auth
      ↓
handles much of the authentication lifecycle
```

But it no longer felt magical.

I could recognize the concepts underneath it.

### Integration problem

The first major challenge wasn't authentication itself.

It was getting the authentication library, database adapter, API framework and existing application architecture to agree on responsibilities.

Questions appeared:

- Who owns auth routes?
- Who owns auth tables?
- Where does session retrieval happen?
- Should our `User` model duplicate auth data?
- Which middleware should protect business endpoints?

### Important architecture decision

Better Auth owns authentication.

LinkFlow owns authorization and domain behavior.

```text
Better Auth
    ↓
Who is this user?

LinkFlow
    ↓
Can this user modify this link?
```

### Lesson

A library should replace implementation complexity—not architectural understanding.

---

# Day 16 — March 16

## Google OAuth and the Redirect Maze

The roadmap introduces Google OAuth today.

I configured credentials and attempted the OAuth flow.

### First failure

The redirect URI didn't match.

OAuth providers are strict for good reason.

The flow effectively looks like:

```text
LinkFlow
   ↓
Google
   ↓
User approves
   ↓
Google redirects to registered callback
   ↓
LinkFlow establishes session
```

If the callback differs from the configured URI, authentication stops.

### Debugging lesson

Instead of blindly changing URLs, I opened the browser Network tab and followed the redirects.

That made OAuth much easier to understand.

### Environment issue

OAuth configuration also exposed the difference between:

```text
localhost callback
staging callback
production callback
```

Authentication configuration is environment-specific.

### Lesson

OAuth debugging is often redirect/configuration debugging rather than application logic debugging.

---

# Day 17 — March 17

## GitHub OAuth — Same Standard, Different Provider

Today I repeated the OAuth pattern with GitHub.

That repetition was useful because I could distinguish:

```text
OAuth concepts
```

from:

```text
provider-specific configuration
```

### Requirement

Both Google and GitHub needed to coexist.

### Edge case discovered

What happens if:

```text
User registers with email/password
```

and later:

```text
signs in with Google using the same email?
```

Do we:

- create another account?
- automatically link them?
- require confirmation?

Account linking is a security decision, not merely a UX decision.

### Technical debt

Document Better Auth's exact account-linking behavior before allowing assumptions to become production behavior.

### Lesson

Supporting multiple login methods creates identity-management questions beyond "add another button."

---

# Day 18 — March 18

## Sessions: What Is Better Auth Actually Doing?

No shiny UI today.

I inspected session behavior.

Questions:

```text
Where is the session stored?
What identifies it?
How is expiration handled?
What does the client receive?
How does the server retrieve it?
```

### Comparison with Week 1

Raw JWT approach:

```text
Signed token contains identity
       ↓
server verifies token
```

Session-oriented approach:

```text
Session identifier
       ↓
server resolves session state
```

Different architectures have different tradeoffs around:

- revocation;
- database lookups;
- expiration;
- multi-device sessions;
- session invalidation.

### Major lesson

I now understand why saying:

> "JWT authentication is better than sessions"

is usually an incomplete statement.

The correct answer depends on requirements and architecture.

---

# Day 19 — March 19

## Frontend Authentication

Now the Next.js application finally received:

```text
/login
/register
logout
```

### The happy path worked.

The unhappy paths didn't.

So I deliberately tested:

- wrong password;
- duplicate email;
- server unavailable;
- slow network;
- repeated button clicks.

### Double-submit problem

Without disabling the form during submission:

```text
Click
Click
Click
```

could generate multiple requests.

### Fix

Authentication UI now has explicit states:

```text
idle
submitting
success
error
```

Buttons disable while requests are in flight.

### Another likely integration issue

Frontend and backend running on separate local origins introduces cookies/CORS/credentials concerns.

A request can succeed in Postman while failing in a browser because browsers enforce security policies that API clients may not reproduce.

### Lesson

"API works in Postman" does not mean:

> "Authentication works."

The browser is part of the system.

---

# Day 20 — March 20

## Protected Pages

Today I protected dashboard routes.

Expected behavior:

```text
Unauthenticated
      ↓
/dashboard
      ↓
redirect /login
```

and:

```text
Authenticated
      ↓
/login
      ↓
redirect /dashboard
```

### Problem: authentication flicker

A naive client-side implementation can briefly render protected UI before session resolution completes.

That's bad UX and potentially dangerous if sensitive information is already rendered.

### Better model

Make authentication decisions as early as practical.

```text
request
   ↓
determine session
   ↓
authorized?
  /      \
yes      no
 ↓        ↓
page    redirect
```

### Important distinction

Route protection improves UX and access control.

But the backend must still enforce authorization.

A hidden frontend page is **not security**.

### Rule added

> Never trust frontend route protection as the authorization boundary.

---

# Day 21 — March 21

## Auth Destruction Day

The roadmap requires manually testing every authentication flow today.

I treated this as:

> Try to prove authentication is broken.

### Test matrix

```text
Register                     ✅
Duplicate registration       ✅ handled
Login                        ✅
Wrong password               ✅ handled
Logout                       ✅
Google OAuth                 ✅
GitHub OAuth                 ✅
Protected page               ✅
Expired/invalid session      ✅ handled
Unauthenticated API access   ✅ rejected
```

### Scenario: missing/null Origin

One useful failure case for Better Auth-style browser security is an absent or unexpected `Origin`.

Instead of disabling origin protection because it is inconvenient, the correct question is:

> Why is the request origin missing or untrusted?

That led to thinking more carefully about trusted origins, Postman testing and browser behavior.

### Security lesson

When a security library rejects a request, don't immediately remove the security mechanism.

Understand **what attack that mechanism is trying to prevent first.**

### Week 3 result

Authentication is no longer a black box.

I've now seen both sides:

```text
BUILD AUTH MANUALLY
        ↓
understand primitives
        ↓
USE AUTH LIBRARY
        ↓
understand abstraction
```

---

# Week 4 — Monorepo Polish + Month Review

## March 22–31

The final March phase moves away from feature development and hardens the foundation through shared types, error handling, validation, API versioning, environment separation, Git discipline, source-code reading, catch-up and the final demo.

---

# Day 22 — March 22

## Shared Types Without Copy-Paste

Both frontend and backend needed concepts such as:

```text
User
Link
ApiResponse
```

Initially it is tempting to define them twice.

That creates drift.

```text
Frontend User
      ≠
Backend User
```

eventually.

### Solution

Created:

```text
packages/
└── types/
```

Shared TypeScript definitions can now be consumed by both applications.

### Important caution

Sharing everything would tightly couple frontend and backend.

So I decided to share **contracts**, not arbitrary internal implementation types.

### Lesson

Monorepos make sharing easy.

Good architecture still requires deciding **what should be shared**.

---

# Day 23 — March 23

## Global Error Handling

Until today, different endpoints could produce different error shapes.

Something like:

```json
{ "error": "Unauthorized" }
```

elsewhere:

```json
{ "message": "Invalid request" }
```

and somewhere else:

```json
{ "success": false, "msg": "..." }
```

That's chaos for clients.

### Goal

Create a consistent error contract.

Conceptually:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "..."
  }
}
```

### Global error pipeline

```text
Route/service throws
       ↓
error middleware
       ↓
classify error
       ↓
log internal context
       ↓
safe client response
```

### Security issue

Raw errors can contain:

- stack traces;
- filesystem paths;
- SQL details;
- internal service information.

Development needs detail.

Users don't.

### Rule

```text
Internal logs → rich context

API response → safe context
```

### Lesson

Error handling isn't merely about catching exceptions.

It's part of the application's public API contract.

---

# Day 24 — March 24

## Zod at Every Boundary

Today's roadmap explicitly requires request body, query parameter and route parameter validation.

### Principle

Everything entering the application is untrusted.

```text
request.body
request.params
request.query
environment variables
webhooks
```

All require validation.

### Added failure scenario

A route expected:

```text
limit: number
```

but query parameters arrive as strings.

This exposed the difference between:

```text
TypeScript type
```

and:

```text
runtime value
```

TypeScript disappears after compilation.

Zod checks actual runtime data.

### Important lesson

TypeScript does **not** validate HTTP requests.

```text
External data
     ↓
runtime validation
     ↓
trusted application data
```

### Architecture improvement

Validation now occurs near the boundary instead of scattered through business logic.

---

# Day 25 — March 25

## API Versioning and Structure

The roadmap moves all endpoints under:

```text
/api/v1/
```

and asks for endpoint documentation.

### Why version now?

Changing:

```http
GET /users
```

later may break existing clients.

Versioning creates room for future evolution:

```text
/api/v1
/api/v2
```

### Route organization

The API began moving toward domain-oriented modules instead of one enormous route file.

Conceptually:

```text
routes
controllers
services
schemas
repositories
```

### Important caution

I didn't want architecture cosplay.

If a layer adds no responsibility, it doesn't deserve to exist merely because a tutorial uses it.

### Lesson

Folder structure should reveal responsibilities, not simply maximize the number of folders.

---

# Day 26 — March 26

## Development Is Not Production

Today's objective is environment separation.

I reviewed:

```text
development
test
production
```

### Dangerous assumption

It's easy to write:

```ts
if (process.env.NODE_ENV !== "production") {
   ...
}
```

everywhere until configuration logic becomes scattered.

Instead, configuration should be centralized.

### Examples of environment differences

Development might use:

```text
localhost database
verbose logging
local frontend origin
```

Production might require:

```text
managed database
HTTPS cookies
production origin
restricted diagnostics
```

### Added failure test

I intentionally started the application with production mode but development-style secrets/configuration.

The goal was to make incorrect deployments fail rather than silently run insecurely.

### Lesson

Environment configuration is part of deployment architecture.

---

# Day 27 — March 27

## Git Discipline

Today wasn't about application features.

It was about protecting the codebase from myself.

The roadmap calls for:

- Husky;
- ESLint;
- Prettier;
- Commitlint;
- conventional commits.

### Pipeline

Before commit:

```text
Code
 ↓
lint
 ↓
format/check
 ↓
commit validation
 ↓
Git history
```

### First annoyance

The hooks blocked one of my commits.

My first emotional reaction was basically:

> Why is tooling preventing me from committing my own code?

Then I realized:

That's exactly its job.

### But another lesson appeared

Pre-commit hooks must remain reasonably fast.

If every commit runs the entire production test suite, developers eventually start bypassing hooks.

### Separation

```text
Pre-commit
→ fast local checks

CI
→ comprehensive checks
```

### Git lesson

A clean history isn't aesthetic perfectionism.

It helps with:

- debugging;
- rollback;
- `git bisect`;
- code review;
- understanding architectural evolution.

---

# Day 28 — March 28

## Month 1 Review — Building the Interview Story Bank

The roadmap asks me to list everything learned and identify five things that confused me and how I solved them.

### Major concepts learned

```text
Monorepos
Express
Environment validation
Docker
PostgreSQL
SQL
Indexes
Transactions
Race conditions
bcrypt
JWT
Cookies
Sessions
Authentication
Authorization
Prisma
Migrations
N+1
OAuth
Better Auth
Runtime validation
Error handling
API versioning
Git hooks
```

### Five major confusions

**1. JWT vs sessions**

I initially treated them like one is modern and the other is outdated.

Now I understand they're architectural approaches with different tradeoffs.

---

**2. Application checks vs database constraints**

Checking duplicate emails in Node.js isn't enough.

The database must preserve the invariant.

---

**3. TypeScript vs validation**

TypeScript cannot protect an API from malformed runtime input.

Zod can validate the boundary.

---

**4. Authentication vs authorization**

Knowing who sent a request doesn't mean they are allowed to manipulate the requested resource.

---

**5. ORM vs database knowledge**

Prisma removes boilerplate.

It doesn't remove SQL, indexes, query planning, transactions or concurrency.

### Interview stories already available

I now have stories about:

- implementing authentication manually;
- debugging cookies;
- OAuth redirects;
- deliberate race conditions;
- N+1 queries;
- migration drift;
- environment validation.

That's much more useful than:

> "I know Express and Prisma."

---

# Day 29 — March 29

## Reading Production Code

Today the roadmap asks me to open the Cal.com codebase and inspect its authentication implementation.

The purpose isn't to copy code.

The exercise is:

```text
My implementation
        ↓
Production open-source implementation
        ↓
Compare decisions
        ↓
Ask why
```

### Things I looked for

- authentication boundaries;
- session handling;
- database access;
- validation;
- error handling;
- folder organization;
- abstractions;
- naming.

### Biggest realization

Production code often looks more complicated than tutorial code because it contains years of accumulated requirements and edge cases.

Complexity isn't automatically bad.

But complexity must have a reason.

### New learning method

When reading open-source code:

Don't ask only:

> "What does this code do?"

Ask:

> "What problem forced them to write it this way?"

That question reveals much more.

---

# Day 30 — March 30

## Buffer Day — No New Technology

The roadmap deliberately introduces no new concept today.

That was surprisingly useful.

### Cleanup list

I revisited:

```text
TODO comments
unfinished validation
inconsistent errors
temporary logs
unused dependencies
weak naming
duplicated types
configuration assumptions
README gaps
```

### A useful realization

A project can have every planned feature implemented and still feel unfinished because dozens of tiny inconsistencies accumulate.

Buffer days aren't wasted days.

They're where unfinished work stops becoming permanent technical debt.

### Definition-of-done improvement

From now on:

```text
Code works
    ≠
Task finished
```

A better definition:

```text
Implementation
+ validation
+ failure behavior
+ cleanup
+ documentation
+ tests where appropriate
= done
```

---

# Day 31 — March 31

# Month 1 Demo — The Foundation Is Alive

The roadmap's final March requirement is simple:

> Run the application, register a user, log in with Google, reach the dashboard, and capture proof that Month 1 works.

Today wasn't about adding code.

It was about proving that thirty days of individual pieces actually form one system.

### Demo flow

```text
Open LinkFlow
      ↓
Register
      ↓
User persisted
      ↓
Login
      ↓
Session established
      ↓
Protected dashboard
```

Then:

```text
Logout
   ↓
dashboard inaccessible
```

Then:

```text
Login with Google
       ↓
OAuth redirect
       ↓
callback
       ↓
session
       ↓
dashboard
```

### Architecture at the end of Month 1

```text
                     ┌─────────────────┐
                     │     Browser     │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │     Next.js     │
                     │       Web       │
                     └────────┬────────┘
                              │
                              │ HTTP
                              ▼
                     ┌─────────────────┐
                     │     Express     │
                     │       API       │
                     └───────┬─┬───────┘
                             │ │
                 ┌───────────┘ └────────────┐
                 ▼                          ▼
        ┌────────────────┐         ┌────────────────┐
        │  Better Auth   │         │ Business Logic │
        └───────┬────────┘         └───────┬────────┘
                │                          │
                └────────────┬─────────────┘
                             ▼
                    ┌─────────────────┐
                    │     Prisma      │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    └─────────────────┘
```

---

# Month 1 Engineering Retrospective

March began with:

```text
mkdir project
```

and ended with an application foundation involving:

```text
Next.js
Express
TypeScript
PostgreSQL
Docker
SQL
Prisma
Better Auth
OAuth
Zod
shared contracts
structured errors
environment management
Git quality gates
```

But the important progress wasn't the number of technologies.

It was understanding what sits underneath them.

---

## What Changed in My Thinking

### March 1

I might have thought:

> Authentication means login/register.

### March 31

Authentication now means:

```text
Identity
Password hashing
Session lifecycle
Cookie security
OAuth
Expiration
Revocation
Origin trust
Runtime validation
Authorization boundaries
Database invariants
Failure handling
```

---

I might have thought:

> Prisma is how we use PostgreSQL.

Now:

```text
Prisma
   ↓
generates/executes database operations
   ↓
PostgreSQL still has
   ↓
indexes
transactions
constraints
locks
query plans
concurrency
```

---

I might have thought:

> If TypeScript compiles, my input is safe.

Now:

```text
TypeScript
    ↓
development-time guarantees

Zod
    ↓
runtime boundary guarantees
```

---

# Bugs & Failures Encountered / Simulated This Month

These are exactly the kinds of situations I want the devlog to preserve rather than hiding behind a clean final implementation:

| Problem                                                   | Root lesson                                             |
| --------------------------------------------------------- | ------------------------------------------------------- |
| Environment variable missing after startup                | Validate configuration before boot                      |
| Docker DB reachable internally but not from expected host | Understand container networking                         |
| Database disappeared after recreating container           | Persistent storage requires volumes                     |
| Password hash accidentally included in user object        | Explicitly define public responses                      |
| Duplicate registration race                               | DB constraints enforce invariants                       |
| JWT payload readable                                      | Signed doesn't mean encrypted                           |
| Cookie not persisting                                     | Cookie/CORS/security attributes matter                  |
| Express request typing problem                            | Extend request context correctly                        |
| Logout didn't truly revoke JWT                            | Stateless authentication has revocation tradeoffs       |
| Migration/schema disagreement                             | Migration history matters                               |
| N+1 query explosion                                       | ORM convenience can hide expensive DB behavior          |
| OAuth redirect mismatch                                   | OAuth configuration must exactly match callbacks        |
| Duplicate identity/account-linking question               | OAuth creates identity-management edge cases            |
| Double login submission                                   | UI must model request state                             |
| Protected page flicker                                    | Auth decisions should happen before sensitive rendering |
| Missing/untrusted Origin                                  | Understand security controls before disabling them      |
| Inconsistent API errors                                   | Errors are part of the API contract                     |
| Query params weren't actual numbers                       | TypeScript doesn't validate runtime data                |
| Git hooks blocked commits                                 | Quality gates are supposed to block bad states          |

---

# Technical Debt Register — March 31

Not everything should be solved immediately.

These items should intentionally follow us into later months.

### TD-001 — Health vs readiness

Current health checking is simplistic.

Eventually separate process liveness from dependency readiness.

---

### TD-002 — Authentication observability

Authentication failures currently need better structured logging.

We'll revisit logging and observability later.

---

### TD-003 — Session/security edge cases

Review:

```text
CSRF
cookie policy
trusted origins
session expiration
account linking
multi-device sessions
```

before production launch.

---

### TD-004 — Database indexes

Current indexes are based largely on expected query patterns.

Re-evaluate them once real analytics/query patterns exist.

This should return during the July database-index audit.

---

### TD-005 — Error taxonomy

Create stable machine-readable application error codes rather than relying solely on messages.

---

### TD-006 — Seed safety

Development database reset/seed tooling must never be able to accidentally target production.

---

### TD-007 — Integration testing

Authentication has been manually tested heavily, but automated integration coverage is still limited.

Testing expands in future roadmap stages.

---

### TD-008 — Authorization ownership

When Link CRUD arrives in April, every operation must verify resource ownership server-side.

Frontend restrictions are not sufficient.

---

# Month 1 Interview Story Bank

By the end of March I already have several useful engineering stories.

### Story 1 — Why I built auth twice

> I implemented JWT/password authentication manually before integrating Better Auth. That allowed me to understand exactly what the library was abstracting and helped me debug sessions, cookies and OAuth instead of treating the library as a black box.

### Story 2 — Race conditions

> I deliberately simulated concurrent operations and learned why application-level checks cannot enforce database invariants. That changed how I approached uniqueness and transactions.

### Story 3 — N+1

> I intentionally created an N+1 query and observed how innocent application code could generate more than 100 database queries. I then changed the query strategy and reduced the database round trips.

### Story 4 — OAuth

> OAuth initially failed because of redirect/configuration mismatch. Instead of randomly changing configuration, I traced the redirect sequence through the Network tab and learned the actual authorization flow.

### Story 5 — Runtime validation

> I learned that TypeScript doesn't protect HTTP boundaries because request data exists at runtime after TypeScript's types are gone. That led me to validate body, query and route parameters explicitly with Zod.

---

# March Final Status

```text
╔══════════════════════════════════════════╗
║          LINKFLOW — MONTH ONE            ║
╠══════════════════════════════════════════╣
║ Monorepo                        ✅       ║
║ Next.js                         ✅       ║
║ Express                         ✅       ║
║ Environment validation          ✅       ║
║ Docker                          ✅       ║
║ PostgreSQL fundamentals         ✅       ║
║ Raw SQL                         ✅       ║
║ Indexes                         ✅       ║
║ Transactions                    ✅       ║
║ Race-condition fundamentals     ✅       ║
║ Raw authentication              ✅       ║
║ bcrypt                          ✅       ║
║ JWT                             ✅       ║
║ Cookies                         ✅       ║
║ Prisma                          ✅       ║
║ Migrations                      ✅       ║
║ N+1 understanding               ✅       ║
║ Better Auth                     ✅       ║
║ Google OAuth                    ✅       ║
║ GitHub OAuth                    ✅       ║
║ Session management              ✅       ║
║ Frontend authentication         ✅       ║
║ Protected pages                 ✅       ║
║ Shared TypeScript contracts     ✅       ║
║ Global error handling           ✅       ║
║ Zod validation                  ✅       ║
║ API versioning                  ✅       ║
║ Environment separation          ✅       ║
║ Git quality gates               ✅       ║
║ Production code reading         ✅       ║
╚══════════════════════════════════════════╝
```

## Month 1 complete — March 1 → March 31, 2026

The biggest result isn't that LinkFlow can authenticate a user.

It's that authentication, databases and API architecture are starting to stop looking like magic.

We deliberately went:

```text
Raw SQL      → Prisma

Raw Auth     → Better Auth

Manual JWT   → Session management

Simple code  → Error + validation boundaries

Tutorial thinking → "What happens when this fails?"
```

And that last transition is the one we need to preserve for the remaining five months.

**April changes the question.**

March was:

> **Can I build a trustworthy foundation?**

April becomes:

> **Can I build real product behavior on top of it without destroying that foundation?**
