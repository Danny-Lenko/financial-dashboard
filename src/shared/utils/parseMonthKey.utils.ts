export const parseMonthKey = (key: string) => {
  const [year, month] = key.split('-');
  return {
    year: parseInt(year),
    month: parseInt(month),
    key,
  };
};
