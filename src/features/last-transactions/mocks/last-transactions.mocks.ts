import type { Transaction } from '@/features/last-transactions/types/transaction.types';

export const transactionsThisMonth: Transaction[] = [
  {
    id: 'tm-1',
    name: 'Lisa Anderson',
    method: 'bank_account',
    date: '2024/04/05',
    amount: 1200.0,
  },
  {
    id: 'tm-2',
    name: 'Orlando Rodrigues',
    method: 'bank_account',
    date: '2024/04/01',
    amount: 750.0,
  },
  {
    id: 'tm-3',
    name: 'Netflix',
    method: 'credit_card',
    date: '2024/03/29',
    amount: -9.9,
  },
  {
    id: 'tm-4',
    name: 'Spotify',
    method: 'credit_card',
    date: '2024/03/29',
    amount: -19.9,
  },
  {
    id: 'tm-5',
    name: 'Carl Andrew',
    method: 'bank_account',
    date: '2024/03/27',
    amount: 400.0,
  },
  {
    id: 'tm-6',
    name: 'Carrefour Market',
    method: 'credit_card',
    date: '2024/03/26',
    amount: -64.33,
  },
  {
    id: 'tm-7',
    name: 'Amazon',
    method: 'credit_card',
    date: '2024/03/24',
    amount: -147.9,
  },
  {
    id: 'tm-8',
    name: 'Shopify',
    method: 'credit_card',
    date: '2024/03/21',
    amount: -57.98,
  },
];

export const transactionsLastMonth: Transaction[] = [
  {
    id: 'lm-1',
    name: 'David Brown',
    method: 'bank_account',
    date: '2024/03/01',
    amount: 950.0,
  },
  {
    id: 'lm-2',
    name: 'Sarah Johnson',
    method: 'bank_account',
    date: '2024/02/28',
    amount: 850.0,
  },
  {
    id: 'lm-3',
    name: 'Netflix',
    method: 'credit_card',
    date: '2024/02/29',
    amount: -9.9,
  },
  {
    id: 'lm-4',
    name: 'Uber',
    method: 'credit_card',
    date: '2024/02/27',
    amount: -45.2,
  },
  {
    id: 'lm-5',
    name: 'Whole Foods',
    method: 'credit_card',
    date: '2024/02/25',
    amount: -123.45,
  },
  {
    id: 'lm-6',
    name: 'Apple Store',
    method: 'credit_card',
    date: '2024/02/20',
    amount: -299.0,
  },
  {
    id: 'lm-7',
    name: 'Mark Williams',
    method: 'bank_account',
    date: '2024/02/15',
    amount: 600.0,
  },
  {
    id: 'lm-8',
    name: 'Shell Gas Station',
    method: 'credit_card',
    date: '2024/02/10',
    amount: -67.8,
  },
];

export const transactionsLastYear: Transaction[] = [
  {
    id: 'ly-1',
    name: 'Investment Dividend',
    method: 'bank_account',
    date: '2023/12/31',
    amount: 3500.0,
  },
  {
    id: 'ly-2',
    name: 'Year-end Bonus',
    method: 'bank_account',
    date: '2023/12/31',
    amount: 5000.0,
  },
  {
    id: 'ly-3',
    name: 'Best Buy',
    method: 'credit_card',
    date: '2023/12/25',
    amount: -899.99,
  },
  {
    id: 'ly-4',
    name: 'Target',
    method: 'credit_card',
    date: '2023/12/20',
    amount: -234.56,
  },
  {
    id: 'ly-5',
    name: 'Freelance Project',
    method: 'bank_account',
    date: '2023/11/15',
    amount: 2500.0,
  },
  {
    id: 'ly-6',
    name: 'Delta Airlines',
    method: 'credit_card',
    date: '2023/10/10',
    amount: -678.9,
  },
  {
    id: 'ly-7',
    name: 'Airbnb',
    method: 'credit_card',
    date: '2023/09/05',
    amount: -456.0,
  },
  {
    id: 'ly-8',
    name: 'Consulting Fee',
    method: 'bank_account',
    date: '2023/08/20',
    amount: 1800.0,
  },
];

export const transactionsThisYear = transactionsThisMonth;

export const TRANSACTION_DATA = {
  thisMonth: transactionsThisMonth,
  lastMonth: transactionsLastMonth,
  thisYear: transactionsThisYear,
  lastYear: transactionsLastYear,
} as const;
