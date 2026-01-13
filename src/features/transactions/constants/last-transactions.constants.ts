import type {
  Column,
  Transaction,
} from '@/features/transactions/types/transaction.types';
import { formatCurrencyWithSign } from '@/shared/utils/formatters/currency.utils';
import { formatDate } from '@/shared/utils/formatters/date.utils';
import { formatPaymentMethod } from '@/shared/utils/formatters/payment-method.utils';
import type { Formatter } from '../types/transaction.types';

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
    format: formatCurrencyWithSign as Formatter,
    padding: '14px 18px',
  },
  { id: 'menu', label: '', padding: '12px 18px' },
];

export const INCOME_SOURCES = [
  { name: 'NASA', weight: 7 },
  { name: 'SpaceX', weight: 2 },
  { name: 'Freelance Project', weight: 1 },
] as const;

export const EXPENSE_SOURCES = [
  // Entertainment
  { name: 'Netflix', category: 'Entertainment', amount: 15 },
  { name: 'Spotify', category: 'Entertainment', amount: 10 },
  { name: 'Cinema', category: 'Entertainment', amount: 35 },

  // Shopping
  { name: 'Amazon', category: 'Shopping', amount: 85 },
  { name: 'eBay', category: 'Shopping', amount: 45 },
  { name: 'Apple Store', category: 'Shopping', amount: 200 },

  // Transportation
  { name: 'Uber', category: 'Transportation', amount: 25 },
  { name: 'Shell Gas', category: 'Transportation', amount: 60 },

  // Groceries
  { name: 'Whole Foods', category: 'Groceries', amount: 120 },
  { name: 'Starbucks', category: 'Groceries', amount: 6 },
  { name: "McDonald's", category: 'Groceries', amount: 12 },

  // Charges
  { name: 'Electric Co.', category: 'Charges', amount: 150 },
  { name: 'Internet', category: 'Charges', amount: 80 },
  { name: 'Phone Bill', category: 'Charges', amount: 65 },

  // House
  { name: 'Mortgage', category: 'House', amount: 1500 },
  { name: 'Home Depot', category: 'House', amount: 95 },
  { name: 'IKEA', category: 'House', amount: 180 },
] as const;
