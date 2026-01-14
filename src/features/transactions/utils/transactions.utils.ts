import type { Transaction } from '../types/transaction.types';

// Aggregates yearly transactions (top-20 by amount)
export function calcTopTransactionsByAmount(
  monthlyTransactions: Transaction[][]
): Transaction[] {
  const allTransactions = monthlyTransactions.flat();

  const sorted = allTransactions.sort(
    (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
  );

  return sorted.slice(0, 20);
}

export function getLogoUrl(domain: string): string {
  return `https://img.logo.dev/${domain}?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}`;
}
