"use client"

import useTitle from "@/hooks/use-title.hook";
import type { IPageResponse } from "@/interfaces/page/page-response.dto";
import { useEffect, useState } from "react";
import type { ICategoryResponseDto } from "@/interfaces/category/category-response.dto";
import { CategoryService } from "@/services/category.service";
import CategoryDialog from "@/components/category-dialog.component";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { type ColumnDef } from "@tanstack/react-table"
import { FaTrash } from "react-icons/fa";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Paginator from "@/components/paginator.component";

export const columns: ColumnDef<ICategoryResponseDto>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "color",
        header: "Cor",
    }
]

export default function Categories() {
    const [categoryPage, setCategoryPage] = useState<IPageResponse<ICategoryResponseDto>>();
    useTitle("Categorias - Finance App");

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const fetchCategoryData = async () => {
        const response = await CategoryService.findAll();
        setCategoryPage(response);
    }

    const handlePageChange = async (page: number) => {
        const response = await CategoryService.findAll(page);
        setCategoryPage(response);
    }

    const handleDelete = async (id: number) => {
        try {
            await CategoryService.delete(id);
            toast.success("Categoria excluída com sucesso!");
            await fetchCategoryData();
        }
        catch (error: AxiosError | any) {
            const BAD_REQUEST_ERROR = error.status === 400;
            if (BAD_REQUEST_ERROR) {
                toast.error("A categoria não pode ser excluída pois possui transações associadas.");
            } else {
                toast.error("Erro ao excluir a categoria. Tente novamente mais tarde.");
            }

        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-secondaryColor text-4xl font-bold">Categorias</h2>
                <CategoryDialog fetchCategoryData={fetchCategoryData} />
            </div>
            {
                categoryPage && categoryPage.content && (
                    <div className="container mx-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead key="id">
                                        ID
                                    </TableHead>
                                    <TableHead key="name">
                                        Nome
                                    </TableHead>
                                    <TableHead key="color">
                                        Cor
                                    </TableHead>
                                    <TableHead key="actions">
                                        Ações
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    categoryPage && categoryPage.content.length > 0 ? (
                                        categoryPage.content.map((category) => (
                                            <TableRow key={category.id}>
                                                <TableCell>{category.id}</TableCell>
                                                <TableCell>{category.name}</TableCell>
                                                <TableCell>
                                                    <div className="h-8 w-8 rounded-full" style={{ backgroundColor: category.color }}></div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <CategoryDialog category={category} fetchCategoryData={fetchCategoryData} />
                                                        <Dialog>
                                                            <DialogTrigger>
                                                                <button type="button"
                                                                    className="bg-red-600 text-white hover:bg-red-600/80 flex items-center justify-center p-2 rounded-md"
                                                                >
                                                                    <FaTrash color="#fff" size={16} />
                                                                </button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Deletar Categoria</DialogTitle>
                                                                    <DialogDescription>
                                                                        Tem certeza que deseja deletar a categoria "{category.name}"? Esta ação não pode ser desfeita.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Cancelar</Button>
                                                                    </DialogClose>
                                                                    <DialogClose asChild>
                                                                        <Button variant="destructive" onClick={() => handleDelete(category.id)}>Deletar</Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                        : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )
                                }
                            </TableBody>
                        </Table>
                        {
                            categoryPage && categoryPage.totalPages >= 1 && (
                                <div className="flex w-full items-center justify-center mt-4">
                                    <Paginator 
                                        pageIndex={categoryPage.number} 
                                        totalPages={categoryPage.totalPages} 
                                        pageItems={categoryPage.numberOfElements}
                                        totalItems={categoryPage.totalElements}
                                        handlePageChange={handlePageChange}
                                    />
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )

}