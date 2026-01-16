import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActivePeriod } from '../state/period.slice';
import {
  selectActivePeriod,
  selectIsYearlyPeriod,
} from '../state/period.selectors';
import { PERIOD_VALUES } from '../constants/periods.constants';

export const usePeriodSelection = () => {
  const dispatch = useAppDispatch();
  const activePeriod = useAppSelector(selectActivePeriod);
  const isYearlyPeriod = useAppSelector(selectIsYearlyPeriod);

  const pickPeriod = useCallback(
    (period: string) => {
      dispatch(setActivePeriod(JSON.parse(period)));
    },
    [dispatch]
  );

  const isSamePeriod = (
    a: { year: number; month: number | null },
    b: { year: number; month: number }
  ) => a.year === b.year && a.month === b.month;

  const isPresetPeriod = Object.values(PERIOD_VALUES).some((period) =>
    isSamePeriod(period, activePeriod)
  );

  return {
    activePeriod,
    isPresetPeriod,
    pickPeriod,
    isYearlyPeriod,
  };
};
