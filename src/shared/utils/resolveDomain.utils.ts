import { MERCHANT_DOMAIN_MAP } from '@/features/transactions/constants/last-transactions.constants';
import { normalizeMerchantName } from './formatters/normalizeMerchantName.utils';

export function resolveDomain(name: string): string {
  const key = normalizeMerchantName(name);
  return MERCHANT_DOMAIN_MAP[key] ?? '.com';
}
