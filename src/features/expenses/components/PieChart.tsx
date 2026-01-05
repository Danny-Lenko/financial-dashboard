import { Cell, Pie, PieChart as Chart } from 'recharts';
import { useTheme } from '@mui/material/styles';

import { thisMonthExpensesMock } from '@/features/expenses/mocks/expenses.mocks';
import { getCategoryColor } from '@/features/expenses/utils/expenses.utils';

const data = thisMonthExpensesMock.categories as {
  name: string;
  amount: number;
}[];

export default function PieChart({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const theme = useTheme();

  return (
    <Chart
      style={{
        width: '80%',
        maxWidth: '500px',
        maxHeight: '80vh',
        aspectRatio: 1,
        margin: '0 auto',
      }}
      responsive
    >
      <Pie
        data={data}
        dataKey="amount"
        isAnimationActive={isAnimationActive}
        outerRadius={120}
        innerRadius={60}
        stroke="none"
        startAngle={90} // start from top
        endAngle={-270} // circle clockwise
      >
        {data.map((entry) => (
          <Cell
            key={`cell-${entry.name}`}
            fill={getCategoryColor(entry.name, theme)}
          />
        ))}
      </Pie>
    </Chart>
  );
}
