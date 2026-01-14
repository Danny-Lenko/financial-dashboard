import { TableBody } from '@mui/material';

import { getCellColor } from '@/features/transactions/utils/last-transactions.utils';
import { TABLE_COLUMNS_CONFIG } from '@/features/transactions/constants/last-transactions.constants';
import {
  Table,
  TableWrapper,
  TD,
  TH,
  THead,
  TR,
} from '../styles/LastTransactionsTable.styles';
import TableMenu from './TableMenu';
import { useAppSelector } from '@/store/hooks';
import { selectActivePeriodTransactions } from '../state/transactions.selectors';

function LastTransactionsTable() {
  const reduxData = useAppSelector(selectActivePeriodTransactions);

  const data = reduxData && reduxData.slice(0, 7);

  return (
    <TableWrapper>
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
                    <TD key={column.id}>
                      <TableMenu />
                    </TD>
                  );
                }

                const value = transaction[column.id];

                return (
                  <TD key={column.id} color={getCellColor(column.id, value)}>
                    {column.format ? column.format(value) : value}
                  </TD>
                );
              })}
            </TR>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}

export default LastTransactionsTable;
