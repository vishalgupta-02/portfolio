# Better Auth + Mongoose + MongoDB: The Hidden Dependency Trap We Solved

Today I integrated **Better Auth** into my Express application and ran into an issue that looked like a normal TypeScript error but turned out to be a dependency architecture problem.

## The Error

```text
Argument of type 'mongodb@7.5.0 Db' is not assignable to parameter of type 'mongodb@7.2.0 Db'
```

At first glance, it looked like a typing issue.

It wasn't.

## What Was Actually Happening?

My project used:

- **Mongoose 8.24.1** for application models.
- **Better Auth** with the official MongoDB adapter.

The catch?

Mongoose internally uses its own MongoDB driver, while Better Auth expects the official MongoDB driver's types.

Even though everything connected to the same MongoDB server, the `Db` objects came from different module instances. TypeScript correctly treated them as different types.

## Lesson Learned

Two libraries can use the same database but still expose incompatible types if they rely on different driver instances or versions.

Understanding the dependency graph is just as important as understanding your own code.

## The Solution

Instead of sharing Mongoose's connection with Better Auth, I separated responsibilities:

- **Mongoose** → Business models and application data.
- **Native MongoClient** → Better Auth.

Both connect to the same MongoDB instance but remain independent.

This resulted in:

- Cleaner architecture
- Better separation of concerns
- No type conflicts
- Easier maintenance
- A production-friendly authentication setup

## Key Takeaways

- Don't assume two libraries use compatible types just because they connect to the same database.
- Read dependency trees (`pnpm why`) when debugging package issues.
- Avoid hiding problems with `as any`.
- Fix architectural problems instead of suppressing compiler errors.
- Production software is built by understanding systems, not just writing code.

Sometimes the hardest bugs aren't in your business logic—they're hidden in the relationships between your dependencies.

Today wasn't just about fixing authentication. It was about learning how modern JavaScript ecosystems work under the hood.
