import { useState, useMemo } from "react";
import { PAGE_SIZE } from "@/lib/utils/constants";

export function usePagination<T>(data: T[]) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, currentPage]);

  const reset = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    paginated,
    setCurrentPage,
    reset,
  };
}