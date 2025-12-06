import type { IWalletResponseDto } from "@/interfaces/wallet/wallet-response.dto";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { FaWallet, FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa"
import { formatCurrency } from "@/utils/format-currency.util";
import UpdateWalletDialog from "./update-wallet-dialog.component";
import { WalletService } from "@/services/wallet.service";
import toast from "react-hot-toast";
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
import type { AxiosError } from "axios";

interface IWalletCardProps {
    wallet: IWalletResponseDto;
    fetchWalletData: () => Promise<void>;
}

export default function WalletCard({ wallet, fetchWalletData }: IWalletCardProps) {

    const handleDelete = async () => {
        try {
            await WalletService.delete(wallet.id);
            toast.success("Carteira excluída com sucesso!");
            await fetchWalletData();
        }
        catch (error: AxiosError | any) {
            const BAD_REQUEST_ERROR = error.status === 400;
            if (BAD_REQUEST_ERROR) {
                toast.error("A carteira não pode ser excluída pois possui transações associadas.");
            } else {
                toast.error("Erro ao excluir a carteira. Tente novamente mais tarde.");
            }
        }
    }

    return (
        <Card className="shadow-md">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <FaWallet className="text-2xl" color={wallet.color} />
                        <div className="flex flex-col gap-1">
                            <CardTitle>{wallet.name}</CardTitle>
                            <CardDescription>Saldo atual</CardDescription>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <UpdateWalletDialog wallet={wallet} fetchWalletData={fetchWalletData} />
                        <Dialog>
                            <DialogTrigger>
                                <Button variant="destructive">Excluir</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Deletar Carteira</DialogTitle>
                                    <DialogDescription>
                                        Tem certeza que deseja deletar a carteira "{wallet.name}"? Esta ação não pode ser desfeita.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancelar</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button variant="destructive" onClick={handleDelete}>Deletar</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{formatCurrency(wallet.balance)}</p>
            </CardContent>
            <CardFooter>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <FaArrowCircleUp className="text-white" color="green" size={24} />
                        <div className="flex flex-col">
                            <span className="font-semibold">{formatCurrency(wallet.totalIncome)}</span>
                            <span className="text-sm text-gray-500">Entradas</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaArrowCircleDown className="text-white" color="red" size={24} />
                        <div className="flex flex-col">
                            <span className="font-semibold">{formatCurrency(wallet.totalExpense)}</span>
                            <span className="text-sm text-gray-500">Saídas</span>
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}