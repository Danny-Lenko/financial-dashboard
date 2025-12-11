import { useMemo } from 'react';
import type { Cashflow, CashflowAnalysis } from '@/types/cashflow.types';
import { analyzeCashflow } from '@/utils/cashflow.utils';

interface UseCashflowAnalysisParams {
  previous: Cashflow;
  current: Cashflow;
}

export default function useCashflowAnalysis({
  previous,
  current,
}: UseCashflowAnalysisParams): CashflowAnalysis {
  return useMemo(() => analyzeCashflow(previous, current), [previous, current]);
}
