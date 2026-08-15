import Link from "next/link";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

function getPageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogPagination({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
}: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-8 flex items-center justify-between border-t pt-2"
    >
      <div>
        {hasPreviousPage && (
          <Link
            href={getPageHref(currentPage - 1)}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Previous
          </Link>
        )}
      </div>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <div>
        {hasNextPage && (
          <Link
            href={getPageHref(currentPage + 1)}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Next →
          </Link>
        )}
      </div>
    </nav>
  );
}
