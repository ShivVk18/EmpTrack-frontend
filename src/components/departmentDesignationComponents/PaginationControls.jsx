import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const PaginationControls = ({ pagination, setPage }) => {
  const { page, totalPages } = pagination;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; 
    
    if (totalPages <= showPages) {
     
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      
      let start = Math.max(1, page - 2);
      let end = Math.min(totalPages, start + showPages - 1);
      
     
      if (end === totalPages) {
        start = Math.max(1, totalPages - showPages + 1);
      }
      
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('start-ellipsis');
        }
      }
      
     
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
     
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('end-ellipsis');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setPage(page - 1)}
              className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          
          {pageNumbers.map((pageNum, index) => (
            <PaginationItem key={`page-${pageNum}-${index}`}>
              {pageNum === 'start-ellipsis' || pageNum === 'end-ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => setPage(pageNum)}
                  isActive={page === pageNum}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setPage(page + 1)}
              className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      
    </div>
  );
};