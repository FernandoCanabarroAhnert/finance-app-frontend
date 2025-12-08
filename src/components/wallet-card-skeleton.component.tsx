import { Skeleton } from "./ui/skeleton";

export default function WalletCardSkeleton() {
    return (
        <div className="flex flex-col gap-6 rounded-md shadow-md border border-gray-200 p-6 h-[274px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-[40px] w-[70px] rounded-sm" />
                    <Skeleton className="h-[40px] w-[70px] rounded-sm" />
                </div>
            </div>
            <Skeleton className="h-[40px] w-[180px]" />
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[80px]" />
                        <Skeleton className="h-4 w-[50px]" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[80px]" />
                        <Skeleton className="h-4 w-[50px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}