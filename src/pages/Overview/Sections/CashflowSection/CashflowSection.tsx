import useCashflowAnalysis from '@/hooks/useCashflowAnalysis';
import { lastMonthCashflow, thisMonthCashflow } from '@/mocks/cashflow.mocks';
import { CASHFLOW_CATEGORY_ORDER } from '@/constants/cashflow.constants';
import BalanceCard from './Components/CashflowCard';

function CashflowSection() {
  const cashflowAnalysis = useCashflowAnalysis({
    previos: lastMonthCashflow,
    current: thisMonthCashflow,
  });

  return (
    <section>
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
    </section>
  );
}

export default CashflowSection;
