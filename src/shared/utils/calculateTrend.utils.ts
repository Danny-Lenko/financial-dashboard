export function calculateTrend(
  current: number,
  previous: number
): {
  change: number;
  changePercent: number;
} {
  const change = current - previous;
  const changePercent = previous !== 0 ? (change / previous) * 100 : 0;

  return {
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
  };
}
