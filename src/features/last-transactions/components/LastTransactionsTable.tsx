import { TableBody } from '@mui/material';

import { getCellColor } from '@/features/last-transactions/utils/last-transactions.utils';
import { TABLE_COLUMNS_CONFIG } from '@/features/last-transactions/constants/last-transactions.constants';
import { TRANSACTION_DATA } from '@/features/last-transactions/mocks/last-transactions.mocks';
import {
  Table,
  TableWrapper,
  TD,
  TH,
  THead,
  TR,
} from '../styles/LastTransactionsTable.styles';
import TableMenu from './TableMenu';

const data = TRANSACTION_DATA.thisMonth.slice(-7);

function LastTransactionsTable() {
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
