export function getCellColor(
  columnId: string,
  value: string | number
): 'default' | 'secondary' | 'positive' | 'negative' {
  if (columnId === 'method' || columnId === 'date') {
    return 'secondary';
  }

  if (columnId === 'amount') {
    const amount = Number(value);
    return amount < 0 ? 'default' : 'positive';
  }

  return 'default';
}
