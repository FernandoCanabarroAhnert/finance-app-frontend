import { NumericFormat } from 'react-number-format';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { FaEdit, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { TransactionService } from '@/services/transaction.service';
import type { ITransactionResponseDto } from '@/interfaces/transaction/transaction-response.dto';
import type { ISelectDto } from '@/interfaces/select.dto';
import { WalletService } from '@/services/wallet.service';
import { CategoryService } from '@/services/category.service';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from './ui/textarea';
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

interface ITransactionDialogProps {
    transaction?: ITransactionResponseDto;
    fetchTransactionData: () => Promise<void>;
}

const transactionSchema = z.object({
    walletId: z.string().nonempty("A Carteira é obrigatória"),
    categoryId: z.string().nonempty("A Categoria é obrigatória"),
    type: z.string().nonempty("O tipo é obrigatório"),
    description: z.string().nonempty("A descrição é obrigatória"),
    amount: z.number().positive("O valor deve ser positivo"),
});
type TransactionFormData = z.infer<typeof transactionSchema>;

export default function TransactionDialog({ transaction, fetchTransactionData }: ITransactionDialogProps) {
    const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        mode: 'onChange',
        defaultValues: {
            type: '1',
            walletId: '',
            categoryId: '',
            description: '',
            amount: 0,
        }
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [userWallets, setUserWallets] = useState<ISelectDto[]>();
    const [userCategories, setUserCategories] = useState<ISelectDto[]>();

    useEffect(() => {
        if (openDialog) {
            if (transaction) {
                setValue("walletId", transaction.walletId.toString());
                setValue("categoryId", transaction.categoryId.toString());
                setValue("type", transaction.type.toString());
                setValue("description", transaction.description);
                setValue("amount", transaction.amount);
            }
            fetchUserWallets();
            fetchUserCategories();
        }

    }, [openDialog]);

    const fetchUserWallets = async () => {
        const response = await WalletService.findSelect();
        setUserWallets(response);
    }

    const fetchUserCategories = async () => {
        const response = await CategoryService.findSelect();
        setUserCategories(response);
    }

    const handleFormSubmit = async (data: TransactionFormData) => {
        const mappedData = {
            ...data,
            walletId: Number(data.walletId),
            categoryId: Number(data.categoryId),
            type: Number(data.type),
        }
        console.log(mappedData)
        if (transaction) {
            await TransactionService.update(transaction.id, mappedData);
            toast.success("Transação atualizada com sucesso!");
        }
        else {
            await TransactionService.create(mappedData);
            toast.success("Transação criada com sucesso!");
        }
        reset();
        setOpenDialog(false);
        fetchTransactionData();
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
                {
                    transaction ? (
                        <button type="button" className="bg-blue-600 text-white hover:bg-blue-600/80 flex items-center justify-center p-2 rounded-md">
                            <FaEdit color="#fff" size={16} />
                        </button>
                    )
                        : (
                            <Button type="button" className="bg-contrastColor text-white hover:bg-contrastColor/80">
                                <FaPlus />
                                Adicionar
                            </Button>
                        )
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DialogHeader>
                        <DialogTitle>{ transaction ? "Editar" : "Adicionar" } Transação</DialogTitle>
                        <DialogDescription>
                            Preencha os dados para { transaction ? "editar a" : "adicionar uma nova" } transação.
                        </DialogDescription>
                    </DialogHeader>
                    {
                        userWallets && userCategories && (
                            <div className="grid gap-4 my-3">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Carteira</Label>
                                    <Controller
                                        name="walletId"
                                        control={control}
                                        rules={{ required: "A Carteira é obrigatória" }}
                                        render={({ field }) => (
                                            <>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Selecione a Carteira" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Carteiras</SelectLabel>
                                                            {userWallets.map(wallet => (
                                                                <SelectItem key={wallet.id} value={wallet.id.toString()}>
                                                                    {wallet.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                {errors.walletId && (
                                                    <span className="text-red-600 text-sm">{errors.walletId.message}</span>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Categoria</Label>
                                    <Controller
                                        name="categoryId"
                                        control={control}
                                        rules={{ required: "A Categoria é obrigatória" }}
                                        render={({ field }) => (
                                            <>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Selecione a Categoria" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Categorias</SelectLabel>
                                                            {userCategories.map(cat => (
                                                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                                                    {cat.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                {errors.categoryId && (
                                                    <span className="text-red-600 text-sm">{errors.categoryId.message}</span>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="amount">Valor</Label>

                                    <Controller
                                        name="amount"
                                        control={control}
                                        rules={{ required: "Informe um valor" }}
                                        render={({ field }) => (
                                            <NumericFormat
                                                id="amount"
                                                placeholder="R$ 1500,00"
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                decimalScale={2}
                                                prefix="R$ "
                                                allowNegative={false}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                value={field.value}
                                                onValueChange={(values) => {
                                                    field.onChange(values.floatValue ?? 0);
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.amount && (
                                        <span className="text-red-600 text-sm">
                                            {errors.amount.message}
                                        </span>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="type">Tipo</Label>
                                    <Controller
                                        name="type"
                                        control={control}
                                        rules={{ required: "O tipo é obrigatório" }}
                                        render={({ field }) => (
                                            <>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <RadioGroupItem value="1" id="income" />
                                                        <Label htmlFor="income">Entrada</Label>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <RadioGroupItem value="2" id="expense" />
                                                        <Label htmlFor="expense">Saída</Label>
                                                    </div>
                                                </RadioGroup>
                                                {errors.type && (
                                                    <span className="text-red-600 text-sm">{errors.type.message}</span>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Descrição</Label>
                                    <Textarea id="description" {...register("description")} />
                                    {
                                        errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>
                                    }
                                </div>
                            </div>
                        )
                    }
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">{ transaction ? "Editar" : "Adicionar" }</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}