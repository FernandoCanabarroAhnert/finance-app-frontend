import WalletCard from "@/components/wallet-card.component";
import useTitle from "@/hooks/use-title.hook";
import type { IPageResponse } from "@/interfaces/page/page-response.dto";
import type { IWalletResponseDto } from "@/interfaces/wallet/wallet-response.dto";
import { WalletService } from "@/services/wallet.service";
import { useEffect, useState } from "react";
import CreateWalletDialog from "@/components/create-wallet-dialog.component";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function Wallets() {
    const [walletPage, setWalletPage] = useState<IPageResponse<IWalletResponseDto>>();
    useTitle("Carteiras - Finance App");

    useEffect(() => {
        fetchWalletData();
    }, []);

    const fetchWalletData = async () => {
        const response = await WalletService.findAll();
        setWalletPage(response);
    }

    const handlePageChange = async (page: number) => {
        const response = await WalletService.findAll(page);
        setWalletPage(response);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-secondaryColor text-4xl font-bold">Carteiras</h2>
                <CreateWalletDialog fetchWalletData={fetchWalletData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {
                    walletPage && walletPage.content.map(wallet => (
                        <WalletCard key={wallet.id} wallet={wallet} fetchWalletData={fetchWalletData} />
                    ))
                }
            </div>
            {
                walletPage && walletPage.totalPages >= 1 && (
                    <div className="flex w-full items-center justify-center mt-4">
                        <Pagination>
                            <PaginationContent>
                                {
                                    walletPage.number > 0 && (
                                        <>
                                            <PaginationItem className="cursor-pointer" onClick={() => handlePageChange(walletPage.number - 1)}>
                                                <PaginationPrevious />
                                            </PaginationItem>
                                            <PaginationItem className="cursor-pointer" onClick={() => handlePageChange(walletPage.number - 1)}>
                                                <PaginationLink>{walletPage.number}</PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )
                                }
                                <PaginationItem className="cursor-pointer">
                                    <PaginationLink isActive>
                                        {walletPage.number + 1}
                                    </PaginationLink>
                                </PaginationItem>
                                {
                                    walletPage.number + 1 < walletPage.totalPages && (
                                        <>
                                            <PaginationItem className="cursor-pointer" onClick={() => handlePageChange(walletPage.number + 1)}>
                                                <PaginationLink>{walletPage.number + 2}</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="cursor-pointer" onClick={() => handlePageChange(walletPage.number + 1)}>
                                                <PaginationNext />
                                            </PaginationItem>
                                        </>
                                    )
                                }
                            </PaginationContent>
                        </Pagination>
                    </div>
                )
            }
        </div>
    )

}