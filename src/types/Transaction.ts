export type TransactionType = 'From Main' | 'Repurchased' | 'Sold' | 'stock_out' | 'stock_in'

export interface Transaction {
  date: Date;
  in: number;
  out: number;
  type: TransactionType;
  inputBy: string;
}

export interface TransactionWithTotal extends Transaction {
  currentQty: number;
} 