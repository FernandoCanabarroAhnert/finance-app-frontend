import { NumericFormat } from 'react-number-format';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { Button } from './ui/button';
import { FaPlus } from 'react-icons/fa';
import { WalletService } from '@/services/wallet.service';
import toast from 'react-hot-toast';

interface ICreateWalletDialogProps {
    fetchWalletData: () => Promise<void>;
}

const createWalletSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
    color: z.string().nonempty("A cor é obrigatória"),
    initialBalance: z.number()
});
type CreateWalletFormData = z.infer<typeof createWalletSchema>;

export default function CreateWalletDialog({ fetchWalletData }: ICreateWalletDialogProps) {
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<CreateWalletFormData>({
        resolver: zodResolver(createWalletSchema),
        mode: 'onChange',
        defaultValues: {
            name: "",
            color: "#000",
            initialBalance: 0
        }
    });
    const [openDialog, setOpenDialog] = useState(false);

    const handleCreateWallet = async (data: CreateWalletFormData) => {
        await WalletService.create(data);
        reset();
        setOpenDialog(false);
        toast.success("Carteira criada com sucesso!");
        fetchWalletData();
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger>
                        <Button type="button" className="bg-contrastColor text-white hover:bg-contrastColor/80">
                            <FaPlus />
                            Adicionar
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Adicionar carteira</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(handleCreateWallet)}>
                    <DialogHeader>
                        <DialogTitle>Adicionar Carteira</DialogTitle>
                        <DialogDescription>
                            Preencha os dados para adicionar uma nova carteira.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 my-3">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" placeholder="Ex.: Nubank" {...register("name")} />
                            {
                                errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>
                            }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="color">Cor</Label>
                            <Input id="color" type="color" {...register("color")} />
                            {
                                errors.color && <span className="text-red-600 text-sm">{errors.color.message}</span>
                            }
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="initialBalance">Valor Inicial</Label>

                            <Controller
                                name="initialBalance"
                                control={control}
                                rules={{ required: "Informe um valor" }}
                                render={({ field }) => (
                                    <NumericFormat
                                        id="initialBalance"
                                        defaultValue={0}
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
                            {
                                errors.initialBalance && <span className="text-red-600 text-sm">{errors.initialBalance.message}</span>
                            }
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Adicionar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}