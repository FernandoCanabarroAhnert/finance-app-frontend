export interface ITransactionRequestDto {
    walletId: number;
    categoryId: number;
    type: number;
    description: string;
    amount: number;
}