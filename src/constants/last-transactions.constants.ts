import type { PaymentMethod, Transaction } from '@/types/transaction.types';

type Formatter = (value: string | number | PaymentMethod) => string;

export interface Column<T> {
  id: keyof T | 'menu';
  label: string;
  format?: Formatter;
  padding: string;
}

const formatPaymentMethod = (value: PaymentMethod): string =>
  value.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const formatDate = (value: string): string => {
  const dateObject = new Date(value);
  return dateObject.toLocaleDateString('en-CA').replace(/-/g, '/');
};

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

export const TABLE_COLUMNS_CONFIG: Column<Transaction>[] = [
  { id: 'name', label: 'Description', padding: '12px 18px' },
  {
    id: 'method',
    label: 'Method',
    format: formatPaymentMethod as Formatter,
    padding: '12px 18px',
  },
  {
    id: 'date',
    label: 'Date',
    format: formatDate as Formatter,
    padding: '12px 18px',
  },
  {
    id: 'amount',
    label: 'Amount',
    format: formatCurrency as Formatter,
    padding: '12px 18px',
  },
  { id: 'menu', label: '', padding: '12px 18px' },
];
