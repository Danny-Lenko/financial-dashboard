export type PaymentMethod = 'bank_account' | 'credit_card';

export interface Transaction {
  id: string;
  name: string; // Netflix, Orlando Rodrigues, Amazon
  method: PaymentMethod;
  date: string;
  amount: number; // +750.00 or -9.90
}
