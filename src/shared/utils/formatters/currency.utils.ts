import type { FormatCurrency } from '@/shared/types/formatters/format-currency.types';

//  Formats an amount in USD with 2 decimal places
export const formatCurrency: FormatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatCurrencyWithSign: FormatCurrency = (
  amount,
  currency = 'USD'
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero',
  }).format(amount);
};
