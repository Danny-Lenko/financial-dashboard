import { styled } from '@mui/system';

import { CASHFLOW_CATEGORY_ORDER } from '@/features/cashflow/constants/cashflow.constants';
import CashflowCard from './CashflowCard';
import { useAppSelector } from '@/store/hooks';
import { selectCashflowStats } from '@/features/cashflow/state/cashflow.selectors';
import { memo } from 'react';
import { selectInitialTransactions } from '@/features/data/state/data.selectors';

const Section = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
}));

function CashflowSection() {
  // const stats = useAppSelector(selectCashflowStats);

  const initialTransactions = useAppSelector(selectInitialTransactions);

  console.log('Initial Transactions:', initialTransactions);

  return (
    <Section>
      {/* {CASHFLOW_CATEGORY_ORDER.map((category) => (
        <CashflowCard
          key={category}
          category={category}
          amount={stats[category].amount}
          trend={stats[category].trend}
        />
      ))} */}
    </Section>
  );
}

export default memo(CashflowSection);
