import { Skeleton } from "./ui/skeleton";

export default function BalanceReportCardSkeleton() {
    return (
        <div className="flex flex-col gap-6 rounded-md shadow-md border border-gray-200 p-6 h-[230px]">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[150px]" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="mt-2 h-[40px] w-[200px]" />
            <Skeleton className="mt-6 h-4 w-[188px]" />
        </div>
    )
}