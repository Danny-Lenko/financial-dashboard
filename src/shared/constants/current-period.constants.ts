import { getCurrentPeriod } from '@/features/period/utils/period.utils';

export const CURRENT_PERIOD = getCurrentPeriod();
export const CURRENT_YEAR = CURRENT_PERIOD.year;
export const CURRENT_MONTH = CURRENT_PERIOD.month;
