"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import styles from "./bottomPagination.module.css";

interface PaginationProps {
  totalPages: number;
  pathName: string;
}

export default function BottomPagination({ totalPages, pathName }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    if (pathName === "search") {
      const query = searchParams.get("q") || "";
      router.push(`/search?q=${encodeURIComponent(query)}&page=${page}`);
    } else {
      const slug = params.slug;
      router.push(`/${pathName}/${slug}/?page=${page}`);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.navButton}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        aria-label="Go to first page"
      >
        <ChevronsLeft className={styles.icon} />
      </button>

      <button
        className={styles.navButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className={styles.icon} />
      </button>

      <div className={styles.pageNumbers}>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`${styles.pageNumber} ${currentPage === page ? styles.active : ""}`}
            onClick={() => handlePageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.navButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className={styles.icon} />
      </button>

      <button
        className={styles.navButton}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Go to last page"
      >
        <ChevronsRight className={styles.icon} />
      </button>
    </div>
  );
}
