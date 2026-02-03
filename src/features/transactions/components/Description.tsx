import { normalizeMerchantName } from '@/shared/utils/formatters/normalizeMerchantName.utils';
import { CompanyLogo } from './CompanyLogo';
import { resolveDomain } from '@/shared/utils/resolveDomain.utils';

export const Description = (value: string) => {
  if (typeof value !== 'string') return value;

  const name = normalizeMerchantName(value);
  const domain = resolveDomain(name);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <CompanyLogo domain={name + domain} />
      <span>{value}</span>
    </div>
  );
};
