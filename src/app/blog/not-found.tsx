import Link from "next/link"

export default function BlogNotFound() {
  return (
    <main className='mx-auto max-w-3xl px-6 py-24'>
      <h1 className='text-3xl font-bold tracking-tight'>Article not found</h1>

      <p className='mt-4 text-muted-foreground'>
        The article you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        href='/blog'
        className='mt-8 inline-block font-medium underline underline-offset-4'>
        Back to blog
      </Link>
    </main>
  )
}
