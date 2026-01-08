import { styled } from '@mui/system';

import { CASHFLOW_CATEGORY_ORDER } from '@/features/cashflow/constants/cashflow.constants';
import CashflowCard from './CashflowCard';
import { useAppSelector } from '@/store/hooks';
import { selectCashflowStats } from '@/features/cashflow/state/cashflow.selectors';
import { memo } from 'react';

const Section = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
}));

function CashflowSection() {
  const stats = useAppSelector(selectCashflowStats);

  return (
    <Section>
      {CASHFLOW_CATEGORY_ORDER.map((category) => (
        <CashflowCard
          key={category}
          category={category}
          amount={stats[category].amount}
          trend={stats[category].trend}
        />
      ))}
    </Section>
  );
}

export default memo(CashflowSection);
