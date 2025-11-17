import { useMemo } from 'react';
import type { Cashflow, CashflowAnalysis } from '@/types/cashflow.types';
import { analyzeCashflow } from '@/utils/cashflow.utils';

interface UseCashflowAnalysisParams {
  previos: Cashflow;
  current: Cashflow;
}

export default function useCashflowAnalysis({
  previos,
  current,
}: UseCashflowAnalysisParams): CashflowAnalysis {
  return useMemo(() => analyzeCashflow(previos, current), [previos, current]);
}
