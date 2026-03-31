import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const PaginationControls = ({ pagination, setPage }) => {
  const { page, totalPages } = pagination

  
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      let start = Math.max(1, page - 2)
      const end = Math.min(totalPages, start + showPages - 1)

      if (end === totalPages) {
        start = Math.max(1, totalPages - showPages + 1)
      }

      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push("start-ellipsis")
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push("end-ellipsis")
        }
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage)
    }
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-4 py-6">
    
      <div className="text-sm text-gray-600 font-medium">
        Page <span className="text-amber-700 font-semibold">{page}</span> of{" "}
        <span className="text-gray-900 font-semibold">{totalPages}</span>
      </div>

      {/* Pagination Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <Pagination>
          <PaginationContent className="gap-1">
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                className={`
                  relative overflow-hidden transition-all duration-200 rounded-lg px-3 py-2 text-sm font-medium
                  ${
                    page === 1
                      ? "pointer-events-none opacity-40 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : "cursor-pointer bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 hover:shadow-sm border border-gray-200 hover:border-amber-200"
                  }
                `}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Previous</span>
              </PaginationPrevious>
            </PaginationItem>

            {/* Page Numbers */}
            {pageNumbers.map((pageNum, index) => (
              <PaginationItem key={`page-${pageNum}-${index}`}>
                {pageNum === "start-ellipsis" || pageNum === "end-ellipsis" ? (
                  <PaginationEllipsis className="text-gray-400 px-2" />
                ) : (
                  <PaginationLink
                    onClick={() => handlePageChange(pageNum)}
                    isActive={page === pageNum}
                    className={`
                      relative overflow-hidden transition-all duration-200 rounded-lg min-w-[40px] h-10 flex items-center justify-center text-sm font-medium cursor-pointer
                      ${
                        page === pageNum
                          ? "bg-amber-600 text-white shadow-md hover:bg-amber-700 border-amber-600 transform scale-105"
                          : "bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-200 hover:border-amber-200 hover:shadow-sm"
                      }
                    `}
                  >
                    <span className="relative z-10">{pageNum}</span>
                    {page === pageNum && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-90" />
                    )}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={`
                  relative overflow-hidden transition-all duration-200 rounded-lg px-3 py-2 text-sm font-medium
                  ${
                    page === totalPages
                      ? "pointer-events-none opacity-40 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : "cursor-pointer bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 hover:shadow-sm border border-gray-200 hover:border-amber-200"
                  }
                `}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Quick Jump (for larger page counts) */}
      {totalPages > 10 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={page}
            onChange={(e) => {
              const newPage = Number.parseInt(e.target.value)
              if (newPage >= 1 && newPage <= totalPages) {
                handlePageChange(newPage)
              }
            }}
            className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
          />
          <span className="text-gray-500">of {totalPages}</span>
        </div>
      )}
    </div>
  )
}
