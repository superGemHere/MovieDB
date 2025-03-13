"use client";

import { FC } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./PaginationControls.module.css";

interface PaginationControlsProps {
  pathName: string;
  maxPageCount: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  pathName,
  maxPageCount,
}) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const params = useParams();
   const page = searchParams.get("page") || 1;
   

   const handlePreviousClick = () => {
     const newPage = Number(page) - 1;
     if (pathName === "search") {
       const query = searchParams.get("q") || "";
       router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
     } else {
       const slug = params.slug;
       router.push(`/${pathName}/${slug}/?page=${newPage}`);
     }
   };

   const handleNextClick = () => {
     const newPage = Number(page) + 1;
     if (pathName === "search") {
       const query = searchParams.get("q") || "";
       router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
     } else {
       const slug = params.slug;
       router.push(`/${pathName}/${slug}/?page=${newPage}`);
     }
   };

  return (
    <div className={styles.paginationContainer}>
      <button 
      disabled={Number(page) === 1}
      onClick={handlePreviousClick}
      className={styles.pageButtonWrapper}>
        <ChevronLeft />
      </button>
      <span className={styles.pageNumber}>{page}</span>
      <button 
      disabled={Number(page) === maxPageCount}
      onClick={handleNextClick}
      className={styles.pageButtonWrapper}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default PaginationControls;
