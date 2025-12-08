import type { Column, Formatter } from '@/types/transaction-table.types';
import type { Transaction } from '@/types/transaction.types';
import { formatCurrencyWithSign } from '@/utils/formatters/currency.utils';
import { formatDate } from '@/utils/formatters/date.utils';
import { formatPaymentMethod } from '@/utils/formatters/payment-method.utils';

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
