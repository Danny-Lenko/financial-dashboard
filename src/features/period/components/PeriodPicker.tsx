import { useState } from 'react';
import { Box, IconButton, Typography, Popover, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/system';

import { StyledExpandableButton } from '@/components/common/PeriodButton/StyledExpandableButton';
import { MONTHS } from '@/shared/constants/months.constants';
import { useAppSelector } from '@/store/hooks';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '@/shared/constants/current-period.constants';
import { selectCashflowStartPeriod } from '@/features/cashflow/state/cashflow.selectors';
import type { MonthYearPickerProps } from '../types/period.types';

const Container = styled(Paper)(({ theme }) => {
  return {
    minWidth: 300,
    padding: theme.spacing(2),
  };
});

const YearSelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const MonthGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(1),
}));

export const PeriodPicker = ({
  open,
  anchorEl,
  onClose,
  onSelect,
  initialYear = new Date().getFullYear(),
  initialMonth = new Date().getMonth(),
}: MonthYearPickerProps) => {
  const { year: startYear, month: startMonth } = useAppSelector(
    selectCashflowStartPeriod
  )!;

  const [selectedYear, setSelectedYear] = useState(initialYear);

  const handleMonthSelect = (monthIndex: number) => {
    onSelect(selectedYear, monthIndex);
    onClose();
  };

  const isMonthDisabled = (monthIndex: number) => {
    // Disable future months
    if (selectedYear === CURRENT_YEAR && monthIndex > CURRENT_MONTH) {
      return true;
    }
    // Disable months before data start period
    if (selectedYear === startYear && monthIndex < startMonth) {
      return true;
    }
    // Disable all months if year is in the future
    return selectedYear > CURRENT_YEAR;
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      elevation={4}
    >
      <Container>
        <YearSelector>
          <IconButton
            size="small"
            onClick={() => setSelectedYear(selectedYear - 1)}
            disabled={selectedYear <= startYear} // Min year
          >
            <ChevronLeft />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {selectedYear}
          </Typography>

          <IconButton
            size="small"
            onClick={() => setSelectedYear(selectedYear + 1)}
            disabled={selectedYear >= CURRENT_YEAR}
          >
            <ChevronRight />
          </IconButton>
        </YearSelector>

        <MonthGrid>
          {MONTHS.map((month, index) => {
            const isSelected =
              selectedYear === initialYear && index === initialMonth;
            const isDisabled = isMonthDisabled(index);

            return (
              <StyledExpandableButton
                key={month}
                variant="outlined"
                onClick={() => handleMonthSelect(index)}
                disabled={isDisabled}
                className={isSelected ? 'Mui-selected' : ''}
              >
                {month.slice(0, 3)}
              </StyledExpandableButton>
            );
          })}
        </MonthGrid>
      </Container>
    </Popover>
  );
};
export default PeriodPicker;
