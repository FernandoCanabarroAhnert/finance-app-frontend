import type { ChartConfig } from "./ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import type { IMonthBalanceReportDto } from "@/interfaces/transaction/month-balance.report.dto";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const monthlyBalanceChartConfig = {
    balance: {
        label: "Saldo"
    },
} satisfies ChartConfig

interface IMonthlyBalanceReportCardProps {
    monthlyBalanceReportChartData: IMonthBalanceReportDto[];
}

export default function MonthlyBalanceReportCard({ monthlyBalanceReportChartData }: IMonthlyBalanceReportCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Relatório de Saldo Mensal</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={monthlyBalanceChartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={monthlyBalanceReportChartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="balance"
                            type="linear"
                            stroke="#F5BE0C"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}