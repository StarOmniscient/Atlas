"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function UserPagination({
  currentPage,
  totalPages,
}: UserPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/user?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 pb-12">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            className={`
              ${
                page === currentPage
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"
              }
              min-w-[40px] transition-all duration-300
            `}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
