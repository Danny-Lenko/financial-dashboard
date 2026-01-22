import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActivePeriod } from '../state/period.slice';
import { selectActivePeriod } from '../state/period.selectors';
import { PERIOD_VALUES } from '../constants/periods.constants';
import type { Period } from '../types/period.types';

export const usePeriodSelection = () => {
  const dispatch = useAppDispatch();
  const activePeriod = useAppSelector(selectActivePeriod);

  const pickPeriod = useCallback(
    (period: string) => {
      dispatch(setActivePeriod(JSON.parse(period)));
    },
    [dispatch]
  );

  const isSamePeriod = (a: Period, b: Period) =>
    a.year === b.year && a.month === b.month;

  const isPresetPeriod = Object.values(PERIOD_VALUES).some((period) =>
    isSamePeriod(period, activePeriod)
  );

  return {
    activePeriod,
    isPresetPeriod,
    pickPeriod,
  };
};
