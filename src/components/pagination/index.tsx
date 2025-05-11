import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useUrlFilters } from '@/hooks'

interface ListPaginationProps {
  total: number
  limit: number
}

export function ListPagination({ total, limit }: ListPaginationProps) {
  const { page, handlePageChange } = useUrlFilters()
  const totalPages = Math.ceil(total / limit)

  const isPrevDisabled = page === 1
  const isNextDisabled = page === totalPages || totalPages === 0

  function getPages() {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 'ellipsis', totalPages]
    }

    if (page >= totalPages - 2) {
      return [
        1,
        'ellipsis',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages]
  }

  const pages = getPages()

  const handlePageClick = (p: number | string) => {
    if (typeof p === 'number' && p !== page) handlePageChange(p)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={isPrevDisabled ? undefined : '#'}
            aria-disabled={isPrevDisabled}
            tabIndex={isPrevDisabled ? -1 : 0}
            onClick={(e) => {
              e.preventDefault()
              if (!isPrevDisabled) handlePageChange(page - 1)
            }}
            className={isPrevDisabled ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        {pages.map((p, idx) =>
          p === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href={p === page ? undefined : '#'}
                isActive={p === page}
                aria-current={p === page ? 'page' : undefined}
                tabIndex={p === page ? -1 : 0}
                onClick={(e) => {
                  e.preventDefault()
                  handlePageClick(p)
                }}
                className={p === page ? 'pointer-events-none' : ''}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href={isNextDisabled ? undefined : '#'}
            aria-disabled={isNextDisabled}
            tabIndex={isNextDisabled ? -1 : 0}
            onClick={(e) => {
              e.preventDefault()
              if (!isNextDisabled) handlePageChange(page + 1)
            }}
            className={isNextDisabled ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
