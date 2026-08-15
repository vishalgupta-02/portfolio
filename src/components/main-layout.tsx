export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='w-full max-w-2xl mx-auto py-2'>{children}</div>
}
