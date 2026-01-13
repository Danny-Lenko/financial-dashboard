import type { PaymentMethod } from '@/features/transactions/types/transaction.types';

export const formatPaymentMethod = (value: PaymentMethod): string =>
  value.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
