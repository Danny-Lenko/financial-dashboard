import { styled } from '@mui/system';

import useCashflowAnalysis from '@/hooks/useCashflowAnalysis';
import { lastMonthCashflow, thisMonthCashflow } from '@/mocks/cashflow.mocks';
import { CASHFLOW_CATEGORY_ORDER } from '@/constants/cashflow.constants';
import CashflowCard from './components/CashflowCard';
import { useAppSelector } from '@/store/hooks';

const Section = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
}));

function CashflowSection() {
  const period = useAppSelector((state) => state.period.currentPeriod);

  console.log('Current Period:', period);

  const cashflowAnalysis = useCashflowAnalysis({
    previos: lastMonthCashflow,
    current: thisMonthCashflow,
  });

  return (
    <Section>
      {CASHFLOW_CATEGORY_ORDER.map((category) => {
        const { amount, trend } = cashflowAnalysis[category];

        return (
          <CashflowCard
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
