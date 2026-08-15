// import Link from "next/link"

// import type { SearchableBlogPost } from "@/lib/blog/types"

// interface BlogSearchCardProps {
//   post: SearchableBlogPost
// }

// export function BlogSearchCard({ post }: BlogSearchCardProps) {
//   return (
//     <article className='border-b pb-8'>
//       <Link href={`/blog/${post.slug}`} className='group'>
//         <h2 className='text-xl font-semibold tracking-tight transition-colors group-hover:text-muted-foreground'>
//           {post.title}
//         </h2>

//         <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
//           {post.description}
//         </p>
//       </Link>

//       <div className='mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
//         <time dateTime={post.publishedAt}>
//           {new Date(post.publishedAt).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//           })}
//         </time>

//         <span aria-hidden='true'>·</span>

//         <span>{post.readingTime.minutes} min read</span>
//       </div>

//       <div className='mt-3 flex flex-wrap gap-2'>
//         {post.tags.map((tag) => (
//           <span
//             key={tag}
//             className='rounded-full border px-2.5 py-1 text-xs text-muted-foreground'>
//             {tag}
//           </span>
//         ))}
//       </div>
//     </article>
//   )
// }

// ====================================================================

import Link from "next/link";

import type { SearchableBlogPost } from "@/lib/blog/types";

import { BlogTag } from "@/components/blog/blog-tag";

interface BlogSearchCardProps {
  post: SearchableBlogPost;
}

export function BlogSearchCard({ post }: BlogSearchCardProps) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
      </Link>

      <p className="mt-2 text-sm text-foreground/50 max-w-xl truncate">
        {post.description}
      </p>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-custom-gray">
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>

        <span aria-hidden="true">·</span>

        <span>{post.readingTime.minutes} min read</span>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <BlogTag key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
