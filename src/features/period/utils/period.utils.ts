export function getMonthKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}

export const getPreviousMonth = (year: number, month: number) => {
  if (month === 0) {
    return { year: year - 1, month: 11 };
  }
  return { year, month: month - 1 };
};

const getRealDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(), // 0-indexed
  };
};

export const getCurrentPeriod = () => {
  const envYear = import.meta.env.VITE_CURRENT_YEAR;
  const envMonth = import.meta.env.VITE_CURRENT_MONTH;

  if (envYear && envMonth !== undefined && envMonth !== '') {
    return {
      year: parseInt(envYear, 10),
      month: parseInt(envMonth, 10),
    };
  }

  return getRealDate();
};
