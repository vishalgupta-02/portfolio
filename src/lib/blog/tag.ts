export function createTagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
