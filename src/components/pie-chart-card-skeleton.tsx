import { Skeleton } from "./ui/skeleton";

export default function PieChartCardSkeleton() {
    return (
        <div className="flex flex-col gap-6 rounded-md shadow-md border border-gray-200 p-6 max-h-[394px]">
            <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex justify-center">
                <Skeleton className="h-[200px] w-[200px] rounded-full" />
            </div>
            <div className="flex justify-center">
                <Skeleton className="mt-6 h-4 w-[300px]" />
            </div>
        </div>
    )
}