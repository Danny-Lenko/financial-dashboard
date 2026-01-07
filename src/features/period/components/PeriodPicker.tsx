import { Box, IconButton, Typography, Popover, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useState } from 'react';
import { StyledExpandableButton } from '@/components/common/PeriodButton/StyledExpandableButton';
import { MONTHS } from '@/shared/constants/months.constants';
import { useAppSelector } from '@/store/hooks';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '@/shared/constants/current-period.constants';
import { selectCashflowStartPeriod } from '@/features/cashflow/state/cashflow.selectors';

interface MonthYearPickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelect: (year: number, month: number) => void;
  initialYear?: number;
  initialMonth?: number;
}

export const PeriodPicker = ({
  open,
  anchorEl,
  onClose,
  onSelect,
  initialYear = new Date().getFullYear(),
  initialMonth = new Date().getMonth(),
}: MonthYearPickerProps) => {
  // const yearlyCashflow = useAppSelector(selectYearlyCashflowStats);

  const { year: startYear, month: startMonth } = useAppSelector(
    selectCashflowStartPeriod
  )!;

  console.log('Data start period:', { year: startYear, month: startMonth });

  const [selectedYear, setSelectedYear] = useState(initialYear);
  // const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  // const currentYear = new Date().getFullYear();
  // const currentMonth = new Date().getMonth();

  const handleMonthSelect = (monthIndex: number) => {
    // setSelectedMonth(monthIndex);
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
      <Paper sx={{ p: 2, minWidth: 300 }}>
        {/* Year selector */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
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
        </Box>

        {/* Month grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
          }}
        >
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
        </Box>
      </Paper>
    </Popover>
  );
};
export default PeriodPicker;
