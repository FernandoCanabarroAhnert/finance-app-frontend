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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { WalletService } from '@/services/wallet.service';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import type { IWalletResponseDto } from "@/interfaces/wallet/wallet-response.dto";

interface IUpdateWalletDialogProps {
    fetchWalletData: () => Promise<void>;
    wallet: IWalletResponseDto;
}

const updateWalletSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
    color: z.string().nonempty("A cor é obrigatória"),
});
type UpdateWalletFormData = z.infer<typeof updateWalletSchema>;

export default function UpdateWalletDialog({ fetchWalletData, wallet }: IUpdateWalletDialogProps) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<UpdateWalletFormData>({
        resolver: zodResolver(updateWalletSchema),
        mode: 'onChange',
        defaultValues: {
            name: "",
            color: "#000"
        }
    });
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (openDialog) {
            setValue("name", wallet.name);
            setValue("color", wallet.color);
        }
    }, [openDialog]);

    const handleUpdateWallet = async (data: UpdateWalletFormData) => {
        await WalletService.update(wallet.id, data);
        reset();
        setOpenDialog(false);
        toast.success("Carteira atualizada com sucesso!");
        fetchWalletData();
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
                <Button variant="outline">Editar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(handleUpdateWallet)}>
                    <DialogHeader>
                        <DialogTitle>Atualizar Carteira</DialogTitle>
                        <DialogDescription>
                            Preencha os dados para atualizar a carteira.
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
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Atualizar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}