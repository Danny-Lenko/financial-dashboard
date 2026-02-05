import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import type { ReactNode } from 'react';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { TRANSACTION_DETAIL_CONFIG } from '@/features/transactions/constants/last-transactions.constants';
import { selectTransactionById } from '@/features/transactions/state/transactions.selectors';
import { useAppSelector } from '@/store/hooks';

export const GridStyled = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

function GridCell({ children }: { children: ReactNode }) {
  return <GridStyled size={{ xs: 6, lg: 4 }}>{children}</GridStyled>;
}

function TransactionDetail() {
  const { id } = useParams<{ id: string }>();

  const transaction = useAppSelector(selectTransactionById(id!));

  console.log({ transaction });

  return (
    <>
      <Typography variant="h1">Transaction Details:</Typography>
      <Grid container spacing={2} rowSpacing={4} marginTop={4}>
        {TRANSACTION_DETAIL_CONFIG.map(({ field, icon: Icon, formatter }) => (
          <GridCell key={field}>
            <Icon />
            <Typography variant="h5">
              {formatter
                ? formatter(transaction ? transaction[field] : undefined)
                : transaction
                  ? transaction[field]
                  : ''}
            </Typography>
          </GridCell>
        ))}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h3">
            Description: {transaction?.description}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default TransactionDetail;
