export const staticRoutes = [
  {
    path: "",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/projects",
    priority: 0.95,
    changeFrequency: "weekly",
  },
  {
    path: "/work",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/blog",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/postmortems",
    priority: 0.9,
    changeFrequency: "weekly",
  },
] as const

