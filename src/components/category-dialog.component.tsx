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
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import type { ICategoryResponseDto } from "@/interfaces/category/category-response.dto";
import { CategoryService } from "@/services/category.service";
import { FaPlus, FaEdit } from "react-icons/fa";

interface ICategoryDialogProps {
    fetchCategoryData: () => Promise<void>;
    category?: ICategoryResponseDto;
}

const categorySchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
    color: z.string().nonempty("A cor é obrigatória"),
});
type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoryDialog({ fetchCategoryData, category }: ICategoryDialogProps) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        mode: 'onChange',
        defaultValues: {
            name: "",
            color: "#000"
        }
    });
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (openDialog && category) {
            setValue("name", category.name);
            setValue("color", category.color);
        }
    }, [openDialog]);

    const handleFormSubmit = async (data: CategoryFormData) => {
        if (category) {
            await CategoryService.update(category.id, data);
            toast.success("Categoria atualizada com sucesso!");
        }
        else {
            await CategoryService.create(data);
            toast.success("Categoria criada com sucesso!");
        }
        reset();
        setOpenDialog(false);
        fetchCategoryData();
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
                {
                    category ? (
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
                        <DialogTitle>{category ? "Editar" : "Adicionar"} Categoria</DialogTitle>
                        <DialogDescription>
                            Preencha os dados para {category ? "Editar" : "adicionar"} a categoria.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 my-3">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" placeholder="Ex.: Mercado" {...register("name")} />
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
                        <Button type="submit">{category ? "Editar" : "Adicionar"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}