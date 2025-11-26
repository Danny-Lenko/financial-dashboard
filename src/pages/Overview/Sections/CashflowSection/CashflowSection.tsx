import { styled } from '@mui/system';

import useCashflowAnalysis from '@/hooks/useCashflowAnalysis';
import { lastMonthCashflow, thisMonthCashflow } from '@/mocks/cashflow.mocks';
import { CASHFLOW_CATEGORY_ORDER } from '@/constants/cashflow.constants';
import BalanceCard from './components/CashflowCard';

const Section = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
}));

function CashflowSection() {
  const cashflowAnalysis = useCashflowAnalysis({
    previos: lastMonthCashflow,
    current: thisMonthCashflow,
  });

  return (
    <Section>
      {CASHFLOW_CATEGORY_ORDER.map((category) => {
        const { amount, trend } = cashflowAnalysis[category];

        return (
          <BalanceCard
            key={category}
            category={category}
            amount={amount}
            trend={trend}
          />
        );
      })}
    </Section>
  );
}

export default CashflowSection;
