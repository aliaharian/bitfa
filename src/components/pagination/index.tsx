import { PaginationProps } from "@/components/pagination/types"

export const Pagination = ({ page, handleNext, handlePrev, className }: PaginationProps) => {
    return (
        <div className={`flex items-center gap-4 [&>button]:bg-blue-200 [&>button]:px-3 [&>button]:py-2 [&>button]:rounded-md justify-center ${className}`}>
            <button onClick={handleNext}>
                next
            </button>
            <p>page: {page}</p>
            <button className="disabled:bg-gray-200 disabled:text-gray-300" disabled={page === 1} onClick={handlePrev}>
                previous
            </button>
        </div>

    )
}