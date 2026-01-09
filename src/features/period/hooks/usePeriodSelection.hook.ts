// features/period/hooks/usePeriodSelection.ts
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActivePeriod } from '../state/period.slice';
import {
  selectActivePeriod,
  selectActivePeriodInfo,
} from '../state/period.selectors';
import { getMonthKey } from '../utils/period.utils';
import { PERIOD_VALUES } from '../constants/periods.constants';

export const usePeriodSelection = () => {
  const dispatch = useAppDispatch();
  const activePeriod = useAppSelector(selectActivePeriod);
  const periodInfo = useAppSelector(selectActivePeriodInfo);

  const pickPeriod = useCallback(
    (period: string | number) => {
      dispatch(setActivePeriod(period));
    },
    [dispatch]
  );

  const pickCustomPeriod = useCallback(
    (year: number, month: number) => {
      const key = getMonthKey(year, month);

      if (
        key === PERIOD_VALUES.THIS_MONTH ||
        key === PERIOD_VALUES.LAST_MONTH
      ) {
        dispatch(setActivePeriod(key));
        return;
      }

      dispatch(setActivePeriod(key));
    },
    [dispatch]
  );

  const isPresetPeriod = Object.values(PERIOD_VALUES).includes(
    activePeriod as string | number
  );

  return {
    activePeriod,
    periodInfo,
    isPresetPeriod,
    pickPeriod,
    pickCustomPeriod,
  };
};
