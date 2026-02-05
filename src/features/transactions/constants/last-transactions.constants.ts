import type {
  Column,
  Transaction,
  TransactionDetailConfig,
} from '@/features/transactions/types/transaction.types';
import { formatCurrencyWithSign } from '@/shared/utils/formatters/currency.utils';
import { formatDate } from '@/shared/utils/formatters/date.utils';
import { formatPaymentMethod } from '@/shared/utils/formatters/payment-method.utils';
import type { Formatter } from '../types/transaction.types';
import { Description } from '../components/Description';

import IsoIcon from '@mui/icons-material/Iso';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

export const TABLE_COLUMNS_CONFIG: Column<Transaction>[] = [
  {
    id: 'name',
    label: 'Description',
    format: Description as Formatter,
    padding: '12px 18px',
  },
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

export const TRANSACTION_DETAIL_CONFIG: TransactionDetailConfig[] = [
  { field: 'type', icon: IsoIcon },
  { field: 'name', icon: StorefrontIcon },
  { field: 'amount', icon: PaidIcon },
  { field: 'date', icon: CalendarMonthIcon },
  { field: 'method', icon: CreditCardIcon },
  { field: 'category', icon: DonutSmallIcon },
];

export const INCOME_SOURCES = [
  { name: 'NASA', weight: 7 },
  { name: 'Tom Cruiser', weight: 3 },
] as const;

export const EXPENSE_SOURCES = [
  // Entertainment
  { name: 'Netflix', category: 'Entertainment', amount: 15 },
  { name: 'Spotify', category: 'Entertainment', amount: 10 },

  // Shopping
  { name: 'Amazon', category: 'Shopping', amount: 85 },
  { name: 'eBay', category: 'Shopping', amount: 45 },
  { name: 'Stone Island', category: 'Shopping', amount: 500 },
  { name: 'Fred Perry', category: 'Shopping', amount: 50 },
  { name: 'Apple Store', category: 'Shopping', amount: 400 },

  // Transportation
  { name: 'Uber', category: 'Transportation', amount: 25 },
  { name: 'Shell', category: 'Transportation', amount: 60 },

  // Groceries
  { name: 'Whole Foods', category: 'Groceries', amount: 120 },
  { name: 'Starbucks', category: 'Groceries', amount: 6 },
  { name: "McDonald's", category: 'Groceries', amount: 12 },
  { name: 'Target', category: 'Groceries', amount: 80 },

  // Charges
  { name: 'General Electric', category: 'Charges', amount: 150 },
  { name: 'Vodafone', category: 'Charges', amount: 65 },

  // House
  { name: 'Mortgage', category: 'House', amount: 1500 },
  { name: 'Home Depot', category: 'House', amount: 95 },
  { name: 'IKEA', category: 'House', amount: 180 },
] as const;

export const MERCHANT_DOMAIN_MAP: Record<string, string> = {
  nasa: '.gov',
};
