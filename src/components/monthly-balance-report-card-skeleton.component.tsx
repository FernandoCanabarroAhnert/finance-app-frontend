import { Skeleton } from "./ui/skeleton";

export default function MonthlyBalanceReportCardSkeleton() {
    return (
        <div className="flex flex-col justify-between rounded-md shadow-md border border-gray-200 p-6 h-[500px]">
            <div className="space-y-2">
                <Skeleton className="h-4 w-[275px]" />
            </div>
            <div className="flex justify-evenly items-center">
                <Skeleton className="mt-6 h-4 w-[50px]" />
                <Skeleton className="mt-6 h-4 w-[50px]" />
                <Skeleton className="mt-6 h-4 w-[50px]" />
                <Skeleton className="mt-6 h-4 w-[50px]" />
                <Skeleton className="mt-6 h-4 w-[50px]" />
            </div>
        </div>
    )
}