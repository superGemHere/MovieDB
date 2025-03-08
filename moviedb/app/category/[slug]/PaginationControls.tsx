"use client";

import { FC } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./PaginationControls.module.css";

const PaginationControls: FC = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const params = useParams();
   const page = searchParams.get("page") || 1;

   // Get slug from params
   const slug = params.slug;

  return (
    <div className={styles.paginationContainer}>
      <button 
      disabled={Number(page) === 1}
      onClick={() => router.push(`/category/${slug}/?page=${Number(page) - 1}`)}
      className={styles.pageButtonWrapper}>
        <ChevronLeft />
      </button>
      <span className={styles.pageNumber}>{page}</span>
      <button 
      onClick={() => router.push(`/category/${slug}/?page=${Number(page) + 1}`)}
      className={styles.pageButtonWrapper}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default PaginationControls;
