import { Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import type { IChartData } from "@/interfaces/chart-data";

interface IPieChartCardProps {
    chartData: IChartData[];
    chartConfig: ChartConfig;
    title: string;
    description: string;
}

export default function PieChartCard({ chartData, chartConfig, title, description }: IPieChartCardProps) {
    return (
        <Card className="flex flex-col col-span-1 max-h-[394px]">
            <CardHeader className="flex flex-col gap-2">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="name"
                            innerRadius={60}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    Passe o mouse sobre o gráfico para ver mais detalhes.
                </div>
            </CardFooter>
        </Card>
    )
}