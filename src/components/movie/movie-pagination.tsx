'use client'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link";
interface MoviePaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    baseUrl: string; // Base URL for pagination links
    className?: string;
}

const MoviePagination = ({ 
    currentPage, 
    totalPages, 
    totalItems, 
    itemsPerPage, 
    baseUrl,
    className = ""
}: MoviePaginationProps) => {
    
    // Function to generate pagination numbers with ellipsis
    const generatePaginationNumbers = () => {
        const pages: (number | string)[] = [];
        
        if (totalPages <= 7) {
            // If 7 pages or less, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (currentPage > 4) {
                pages.push('...');
            }
            
            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }
            
            if (currentPage < totalPages - 3) {
                pages.push('...');
            }
            
            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const paginationNumbers = generatePaginationNumbers();
    
    // Calculate displayed items info
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    if (totalPages <= 1) return null;

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Page Info */}
            <div className="text-center text-gray-400 text-sm">
                Hiển thị {startItem}-{endItem} trong số {totalItems} kết quả (Trang {currentPage}/{totalPages})
            </div>
            
            {/* Pagination Component */}
            <div className="flex justify-center">
                <Pagination>
                    <PaginationContent>
                        {/* Previous Button */}
                        {currentPage > 1 && (
                            <PaginationItem>
                                <Link  href={`${baseUrl}?trang=${currentPage - 1}`}>
                                    <PaginationPrevious/>
                                </Link>
                            </PaginationItem>
                        )}

                        {/* Page Numbers */}
                        {paginationNumbers.map((pageNum, index) => (
                            <PaginationItem key={index}>
                                {pageNum === '...' ? (
                                    <PaginationEllipsis />
                                ) : (
                                     <Link href={`${baseUrl}?trang=${pageNum}`}>
                                    <PaginationLink
                                        isActive={pageNum === currentPage}
                                        className={pageNum === currentPage ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' : 'hover:bg-gray-700'}
                                    >
                                            {pageNum}
                                    </PaginationLink>
                                         </Link>
                                )}
                            </PaginationItem>
                        ))}

                        {/* Next Button */}
                        {currentPage < totalPages && (
                            <PaginationItem>
                                <Link  href={`${baseUrl}?trang=${currentPage + 1}`}>
                                      <PaginationNext />
                                </Link>
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default MoviePagination;