import { PaymentMethod } from '@/features/transactions/types/transaction.types';

export function formatPaymentMethod(method: PaymentMethod): string {
  switch (method) {
    case PaymentMethod.BankAccount:
      return 'Bank Account';
    case PaymentMethod.CreditCard:
      return 'Credit Card';
    case PaymentMethod.DebitCard:
      return 'Debit Card';
    case PaymentMethod.Cash:
      return 'Cash';
    default:
      return 'Unknown';
  }
}
