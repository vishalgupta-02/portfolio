# The MongoDB Transaction Error That Wasn't Actually About Transactions

I recently ran into one of the most confusing MongoDB errors I've seen:

```text
MongoServerError:
Transaction numbers are only allowed on a replica set member or mongos
```

At first glance, the solution seems obvious.

MongoDB transactions require a replica set.

So naturally, I started checking everything.

## Step 1 — Verify the Replica Set

I initialized a replica set:

```bash
rs.initiate()
```

Verified it:

```bash
rs.status()
```

Everything looked healthy.

I also updated my connection string:

```text
mongodb://localhost:27017/mydb?replicaSet=rs0
```

Still the exact same error.

---

## Step 2 — Suspect Better Auth

Since Better Auth uses MongoDB transactions internally, I assumed it was creating sessions incorrectly.

I investigated:

- startSession()
- withTransaction()
- retryWrites
- MongoDB Driver
- Mongoose

Nothing looked wrong.

---

## Step 3 — Verify the Driver

The MongoDB driver showed inconsistent topology information.

Sometimes it discovered the replica set.

Sometimes it didn't.

That inconsistency suggested the issue wasn't in my code.

It was environmental.

---

# The Real Problem

I had two MongoDB instances running.

One:

- Windows MongoDB Service

The other:

- MongoDB running inside Docker

Both were exposing port **27017**.

Depending on which instance the driver reached, my application would either:

- connect to the replica set
- or connect to the standalone server

The error message made it look like transactions were broken.

In reality, my application wasn't consistently talking to the same MongoDB instance.

---

# The Fix

I decided to use Docker as the single source of truth.

Stopped the Windows service:

```bash
net stop MongoDB
```

Disabled it:

```bash
sc config MongoDB start= disabled
```

Kept only the Docker container running.

Immediately everything worked.

- Better Auth
- MongoDB Transactions
- Replica Set Discovery
- Mongoose
- Authentication

---

# Why Docker Was the Better Choice

Using only Docker gave me:

- One MongoDB instance to manage
- A reproducible development environment
- Easy database resets
- Consistent replica set configuration
- No hidden Windows services interfering

---

# The Biggest Lesson

Infrastructure bugs often disguise themselves as application bugs.

The stack trace kept pointing toward transactions.

The real issue was that two databases were silently competing for the same port.

Sometimes the fastest way to fix your code...

is to stop looking at your code.

---

## Takeaway

If you're seeing:

```text
Transaction numbers are only allowed on a replica set member or mongos
```

don't stop after checking your replica set.

Also verify:

- Is another MongoDB instance already running?
- Is Windows MongoDB Service enabled?
- Are Docker and Windows sharing the same port?
- Which MongoDB instance is your application actually connecting to?

That single check might save you hours of debugging.

---

### Things I have ran while fixing the issue above

Microsoft Windows [Version 10.0.26200.8875]
(c) Microsoft Corporation. All rights reserved.

C:\Users\codem>netstat -ano | findstr :27017
TCP 0.0.0.0:27017 0.0.0.0:0 LISTENING 11316
TCP 127.0.0.1:27017 0.0.0.0:0 LISTENING 5212
TCP 127.0.0.1:27017 127.0.0.1:49830 ESTABLISHED 5212
TCP 127.0.0.1:27017 127.0.0.1:51465 ESTABLISHED 5212
TCP 127.0.0.1:27017 127.0.0.1:51466 ESTABLISHED 5212
TCP 127.0.0.1:27017 127.0.0.1:51467 ESTABLISHED 5212
TCP 127.0.0.1:27017 127.0.0.1:51468 ESTABLISHED 5212
TCP 127.0.0.1:27017 127.0.0.1:51469 ESTABLISHED 5212
TCP 127.0.0.1:27017 127.0.0.1:51470 ESTABLISHED 5212
TCP 127.0.0.1:27017 127.0.0.1:51471 ESTABLISHED 5212
TCP 127.0.0.1:49830 127.0.0.1:27017 ESTABLISHED 2544
TCP 127.0.0.1:51465 127.0.0.1:27017 ESTABLISHED 2544
TCP 127.0.0.1:51466 127.0.0.1:27017 ESTABLISHED 2544
TCP 127.0.0.1:51467 127.0.0.1:27017 ESTABLISHED 2544
TCP 127.0.0.1:51468 127.0.0.1:27017 ESTABLISHED 2544
TCP 127.0.0.1:51469 127.0.0.1:27017 ESTABLISHED 2544
TCP 127.0.0.1:51470 127.0.0.1:27017 ESTABLISHED 2544
TCP 127.0.0.1:51471 127.0.0.1:27017 ESTABLISHED 2544
TCP [::]:27017 [::]:0 LISTENING 11316

C:\Users\codem>tasklist /FI "PID eq 11316"

Image Name PID Session Name Session# Mem Usage
========================= ======== ================ =========== ============
com.docker.backend.exe 11316 Console 3 1,54,548 K

C:\Users\codem>docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
ebc9037f5629 redis:8-alpine "docker-entrypoint.s…" 17 minutes ago Up 17 minutes (healthy) 0.0.0.0:6381->6379/tcp, [::]:6381->6379/tcp analytics-redis
aae341405ab7 mongo:8 "docker-entrypoint.s…" 17 minutes ago Up 17 minutes (healthy) 0.0.0.0:27017->27017/tcp, [::]:27017->27017/tcp analytics-mongodb
105727a8f5f5 postgres:16-alpine "docker-entrypoint.s…" 5 weeks ago Up 26 hours (healthy) 0.0.0.0:5433->5432/tcp, [::]:5433->5432/tcp postgres_db
49cd8e84d064 redis:7-alpine "docker-entrypoint.s…" 5 weeks ago Up 26 hours (healthy) 0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp redis_cache

C:\Users\codem>docker port aae341405ab7
27017/tcp -> 0.0.0.0:27017
27017/tcp -> [::]:27017

C:\Users\codem>tasklist /FI "PID eq 11316"

Image Name PID Session Name Session# Mem Usage
========================= ======== ================ =========== ============
com.docker.backend.exe 11316 Console 3 1,55,916 K

C:\Users\codem>tasklist /FI "PID eq 5212"

Image Name PID Session Name Session# Mem Usage
========================= ======== ================ =========== ============
mongod.exe 5212 Services 0 56,628 K

C:\Users\codem>sc query MongoDB

SERVICE_NAME: MongoDB
TYPE : 10 WIN32_OWN_PROCESS
STATE : 4 RUNNING
(STOPPABLE, NOT_PAUSABLE, ACCEPTS_PRESHUTDOWN)
WIN32_EXIT_CODE : 0 (0x0)
SERVICE_EXIT_CODE : 0 (0x0)
CHECKPOINT : 0x0
WAIT_HINT : 0x0

C:\Users\codem>corepack enable

C:\Users\codem>corepack use pnpm@latest
Installing pnpm@11.15.1 in the project...

✓ Lockfile passes supply-chain policies (verified 11d ago)
Already up to date
Done in 3.4s using pnpm v11.15.1
