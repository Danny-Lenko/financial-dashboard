import { styled } from '@mui/system';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@mui/material';

import { TABLE_COLUMNS_CONFIG } from '@/constants/last-transactions.constants';
import { TRANSACTION_DATA } from '@/mocks/last-transactions.mocks';

const data = TRANSACTION_DATA.thisMonth.slice(-7);

const THead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

const TR = styled(TableRow)(({ theme }) => ({
  '&:not(:last-child) td, &:not(:last-child) th': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  '&:first-of-type': {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

const TH = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

const TD = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  fontSize: 'calc(13rem/16)',
  fontWeight: 500,
}));

function LastTransactionsTable() {
  return (
    <div
      style={{
        margin: '0 -16px',
        overflow: 'hidden',
      }}
    >
      <Table style={{ width: '100%' }}>
        <THead>
          <TR>
            {TABLE_COLUMNS_CONFIG.map((column) => (
              <TH key={column.id}>{column.label}</TH>
            ))}
          </TR>
        </THead>
        <TableBody>
          {data.map((transaction) => (
            <TR key={transaction.id}>
              {TABLE_COLUMNS_CONFIG.map((column) => {
                if (column.id === 'menu') {
                  return (
                    <TD key={column.id} style={{ padding: column.padding }}>
                      menu
                    </TD>
                  );
                }

                const value = transaction[column.id];

                return (
                  <TD key={column.id} style={{ padding: column.padding }}>
                    {column.format ? column.format(value) : value}
                  </TD>
                );
              })}
            </TR>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LastTransactionsTable;
