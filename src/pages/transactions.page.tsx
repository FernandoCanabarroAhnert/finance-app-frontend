"use client"

import useTitle from "@/hooks/use-title.hook";
import type { IPageResponse } from "@/interfaces/page/page-response.dto";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FaTrash } from "react-icons/fa";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Paginator from "@/components/paginator.component";
import { TransactionService } from "@/services/transaction.service";
import type { ITransactionResponseDto } from "@/interfaces/transaction/transaction-response.dto";
import TransactionDialog from "@/components/transaction-dialog.component";
import { formatCurrency } from "@/utils/format-currency.util";
import { formatDate } from "@/utils/format-date.util";

export default function Transactions() {
    const [transactionPage, setTransactionPage] = useState<IPageResponse<ITransactionResponseDto>>();
    useTitle("Transações - Finance App");

    useEffect(() => {
        fetchTransactionData();
    }, []);

    const fetchTransactionData = async () => {
        const response = await TransactionService.findAll();
        setTransactionPage(response);
    }

    const handlePageChange = async (page: number) => {
        const response = await TransactionService.findAll(page);
        setTransactionPage(response);
    }

    const handleDelete = async (id: number) => {
        try {
            await TransactionService.delete(id);
            toast.success("Transação excluída com sucesso!");
            await fetchTransactionData();
        }
        catch (error: AxiosError | any) {
            toast.error("Erro ao excluir a Transação. Tente novamente mais tarde.");

        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-secondaryColor text-4xl font-bold">Transações</h2>
                <TransactionDialog fetchTransactionData={fetchTransactionData} />
            </div>
            {
                transactionPage && transactionPage.content && (
                    <div className="container mx-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead key="id">
                                        ID
                                    </TableHead>
                                    <TableHead key="wallet">
                                        Carteira
                                    </TableHead>
                                    <TableHead key="transaction">
                                        Categoria
                                    </TableHead>
                                    <TableHead key="type">
                                        Tipo
                                    </TableHead>
                                    <TableHead key="description">
                                        Descrição
                                    </TableHead>
                                    <TableHead key="amount">
                                        Valor
                                    </TableHead>
                                    <TableHead key="date">
                                        Data
                                    </TableHead>
                                    <TableHead key="actions">
                                        Ações
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    transactionPage && transactionPage.content.length > 0 && (
                                        transactionPage.content.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>{transaction.id}</TableCell>
                                                <TableCell>{transaction.walletId}</TableCell>
                                                <TableCell>{transaction.categoryId}</TableCell>
                                                <TableCell className="uppercase"
                                                    style={{ color: transaction.type === 1 ? 'green' : 'red' }}
                                                >
                                                    {transaction.type === 1 ? "Entrada" : "Saída"}
                                                </TableCell>
                                                <TableCell>{transaction.description}</TableCell>
                                                <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                                                <TableCell>{formatDate(new Date(transaction.date))}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <TransactionDialog transaction={transaction} fetchTransactionData={fetchTransactionData} />
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
                                                                    <DialogTitle>Deletar Transação</DialogTitle>
                                                                    <DialogDescription>
                                                                        Tem certeza que deseja deletar a transação? Esta ação não pode ser desfeita.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Cancelar</Button>
                                                                    </DialogClose>
                                                                    <DialogClose asChild>
                                                                        <Button variant="destructive" onClick={() => handleDelete(transaction.id)}>Deletar</Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                }
                            </TableBody>
                        </Table>
                        {
                            transactionPage && transactionPage.totalPages >= 1 && (
                                <div className="flex w-full items-center justify-center mt-4">
                                    <Paginator
                                        pageIndex={transactionPage.number}
                                        totalPages={transactionPage.totalPages}
                                        pageItems={transactionPage.numberOfElements}
                                        totalItems={transactionPage.totalElements}
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