import { getLogoUrl } from '../utils/transactions.utils';

type Props = {
  domain: string;
  size?: number;
};

// TODO: on error fallback to showInitials

export function CompanyLogo({ domain, size = 24 }: Props) {
  return (
    <img
      src={getLogoUrl(domain)}
      alt={`${domain} logo`}
      width={size}
      height={size}
      style={{ borderRadius: 6 }}
      onError={() => {}}
    />
  );
}
