import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface IPaginatorProps {
    pageIndex: number;
    totalPages: number;
    pageItems: number;
    totalItems: number;
    handlePageChange: (page: number) => void;
}

export default function Paginator({  pageIndex, totalPages, pageItems, totalItems, handlePageChange }: IPaginatorProps) {
    return (
        <Pagination className="flex flex-col items-center gap-4">
            <p className="font-semibold">Página {pageIndex + 1} de {totalPages} | Listando {pageItems} de {totalItems} itens</p>
            <PaginationContent>
                {
                    pageIndex > 0 && (
                        <>
                            <PaginationItem className="cursor-pointer" onClick={() => handlePageChange(pageIndex - 1)}>
                                <PaginationPrevious />
                            </PaginationItem>
                            <PaginationItem className="cursor-pointer" onClick={() => handlePageChange(pageIndex - 1)}>
                                <PaginationLink>{pageIndex}</PaginationLink>
                            </PaginationItem>
                        </>
                    )
                }
                <PaginationItem className="cursor-pointer">
                    <PaginationLink isActive>
                        {pageIndex + 1}
                    </PaginationLink>
                </PaginationItem>
                {
                    pageIndex + 1 < totalPages && (
                        <>
                            <PaginationItem className="cursor-pointer" onClick={() => handlePageChange(pageIndex + 1)}>
                                <PaginationLink>{pageIndex + 2}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="cursor-pointer" onClick={() => handlePageChange(pageIndex + 1)}>
                                <PaginationNext />
                            </PaginationItem>
                        </>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}