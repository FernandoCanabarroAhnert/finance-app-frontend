"use client"

import BalanceReportCardSkeleton from "@/components/balance-report-card-skeleton.component";
import BalanceReportCard from "@/components/balance-report-card.component";
import type { IBalanceReportDto } from "@/interfaces/transaction/balance-report.dto";
import { TransactionService } from "@/services/transaction.service";
import { useEffect, useMemo, useState } from "react"
import { FaMoneyBill, FaArrowCircleDown, FaArrowCircleUp, FaDollarSign } from "react-icons/fa";
import {
    type ChartConfig,
} from "@/components/ui/chart"
import type { IReportDto } from "@/interfaces/report.dto";
import { CategoryService } from "@/services/category.service";
import { WalletService } from "@/services/wallet.service";
import PieChartCard from "@/components/pie-chart-card.component";

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

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import type { IMonthBalanceReportDto } from "@/interfaces/transaction/month-balance.report.dto";

const monthlyBalanceChartConfig = {
    balance: {
        label: "Saldo"
    },
} satisfies ChartConfig

export default function Dashboard() {
    const [balanceReport, setBalanceReport] = useState<IBalanceReportDto>();
    const [categoryReport, setCategoryReport] = useState<IReportDto[]>();
    const [walletReport, setWalletReport] = useState<IReportDto[]>();
    const [monthlyBalanceReportChartData, setMonthlyBalanceReportChartData] = useState<IMonthBalanceReportDto[]>();

    useEffect(() => {
        fetchBalanceReport();
        fetchCategoryReport();
        fetchWalletReport();
        fetchMonthlyBalanceReport();
    }, []);

    const categoryChartData = useMemo(() => {
        return categoryReport?.map(item => ({
            name: item.name,
            count: item.count,
            fill: item.color,
        })) || [];
    }, [categoryReport]);

    const walletChartData = useMemo(() => {
        return walletReport?.map(item => ({
            name: item.name,
            count: item.count,
            fill: item.color,
        })) || [];
    }, [walletReport]);

    const categoryChartConfig = useMemo(() => {
        return (categoryReport || []).reduce<ChartConfig>((acc, item) => {
            acc[item.name] = {
                label: item.name,
                color: item.color,
            };
            return acc;
        }, {});
    }, [categoryReport]);

    const walletChartConfig = useMemo(() => {
        return (walletReport || []).reduce<ChartConfig>((acc, item) => {
            acc[item.name] = {
                label: item.name,
                color: item.color,
            };
            return acc;
        }, {});
    }, [walletReport]);

    async function fetchBalanceReport() {
        setBalanceReport(await TransactionService.getBalanceReport());
    }

    async function fetchCategoryReport() {
        setCategoryReport(await CategoryService.getReport());
    }

    async function fetchWalletReport() {
        setWalletReport(await WalletService.getReport());
    }

    async function fetchMonthlyBalanceReport() {
        setMonthlyBalanceReportChartData(await TransactionService.getMonthlyReport());
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-secondaryColor text-4xl font-bold">Dashboard</h2>
            {
                balanceReport ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
                        <BalanceReportCard
                            key="1"
                            title="Saldo atual"
                            subtitle="Receita total"
                            icon={<FaMoneyBill size={24} color="#000" />}
                            value={balanceReport.totalBalance} />
                        <BalanceReportCard
                            key="2"
                            title="Entradas"
                            subtitle="Total recebidos"
                            icon={<FaArrowCircleUp size={24} color="#000" />}
                            value={balanceReport.totalIncomes} />
                        <BalanceReportCard
                            key="3"
                            title="Saídas"
                            subtitle="Total gastos"
                            icon={<FaArrowCircleDown size={24} color="#000" />}
                            value={balanceReport.totalExpenses} />
                        <BalanceReportCard
                            key="4"
                            title="Economia"
                            subtitle="Total economizado"
                            icon={<FaDollarSign size={24} color="#000" />}
                            value={balanceReport.totalEconomy} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6 w-full">
                        <BalanceReportCardSkeleton key="1" />
                        <BalanceReportCardSkeleton key="2" />
                        <BalanceReportCardSkeleton key="3" />
                        <BalanceReportCardSkeleton key="4" />
                    </div>
                )
            }
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
                {
                    categoryChartData && categoryChartConfig && (
                        <div className="order-1">
                            <PieChartCard
                                chartData={categoryChartData}
                                chartConfig={categoryChartConfig}
                                title="Relatório de Categorias"
                                description="Quantidade de transações por categoria" />
                        </div>
                    )
                }
                {
                    monthlyBalanceReportChartData && (
                        <Card className="order-3 2xl:order-2 lg:col-span-2">
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
                {
                    walletChartData && walletChartConfig && (
                        <div className="order-2 2xl:order-3">
                            <PieChartCard
                                chartData={walletChartData}
                                chartConfig={walletChartConfig}
                                title="Relatório de Carteiras"
                                description="Quantidade de transações por carteira" />
                        </div>
                    )
                }
            </div>
        </div>
    )
}