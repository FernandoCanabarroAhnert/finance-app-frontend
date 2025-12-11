export interface ITransactionResponseDto {
    id: number;
    walletId: number;
    categoryId: number;
    type: number;
    description: string;
    amount: number;
    date: Date;
}