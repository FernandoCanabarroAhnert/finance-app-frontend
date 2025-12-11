import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { formatCurrency } from "@/utils/format-currency.util";

interface BalanceReportCardProps {
    title: string;
    subtitle: string;
    icon: ReactNode;
    value: number;
}

export default function BalanceReportCard({ title, subtitle, icon, value }: BalanceReportCardProps) {
    return (
        <Card className="shadow-md">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{subtitle}</CardDescription>
                    </div>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-[2.5rem] font-bold">{formatCurrency(value)}</p>
            </CardContent>
            <CardFooter>
                <CardDescription>Tendências em todo o período</CardDescription>
            </CardFooter>
        </Card>
    )
}