import { CASHFLOW_CATEGORY_ORDER } from '@/features/cashflow/constants/cashflow.constants';
import CashflowCard from './CashflowCard';
import { useAppSelector } from '@/store/hooks';
import { selectActivePeriodCashflowWithTrend } from '@/features/cashflow/state/cashflow.selectors';
import { memo } from 'react';
import OverviewGridSection from '@/components/common/OverviewGridSection/OverviewGridSection';

function CashflowSection() {
  const stats = useAppSelector(selectActivePeriodCashflowWithTrend);

  return (
    <OverviewGridSection>
      {CASHFLOW_CATEGORY_ORDER.map((category) => (
        <CashflowCard
          key={category}
          category={category}
          amount={stats[category]}
          trend={stats.trend ? stats.trend[category] : 0}
        />
      ))}
    </OverviewGridSection>
  );
}

export default memo(CashflowSection);
