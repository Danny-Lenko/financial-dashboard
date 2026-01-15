import { styled } from '@mui/system';
import { Cell, Pie, PieChart as Chart } from 'recharts';
import { useTheme } from '@mui/material/styles';

import { getCategoryColor } from '@/features/expenses/utils/expenses.utils';
import { Box } from '@mui/material';

export const Container = styled(Box)({
  width: '100%',
  height: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
});

const ChartStyled = styled(Chart)({
  width: '100%',
  aspectRatio: '1 / 1',
});

export default function PieChart({
  data,
  isAnimationActive = true,
}: {
  data: { name: string; amount: number }[];
  isAnimationActive?: boolean;
}) {
  const theme = useTheme();

  return (
    <Container>
      <ChartStyled responsive>
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
      </ChartStyled>
    </Container>
  );
}
