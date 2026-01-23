import { useEffect, useState } from 'react';
import { IconButton, Typography, Popover } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { StyledExpandableButton } from '@/components/common/PeriodButton/StyledExpandableButton';
import { MONTHS } from '@/shared/constants/months.constants';
import { useAppSelector } from '@/store/hooks';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '@/shared/constants/current-period.constants';
import type { MonthYearPickerProps } from '../types/period.types';
import {
  Container,
  MonthGrid,
  YearSelector,
} from '../styles/PeriodPicker.styles';
import {
  selectActivePeriod,
  selectStartingPeriod,
} from '../state/period.selectors';

export const PeriodPicker = ({
  open,
  anchorEl,
  onClose,
  onSelect,
}: MonthYearPickerProps) => {
  const activePeriod = useAppSelector(selectActivePeriod);
  const startingPeriod = useAppSelector(selectStartingPeriod);

  const initialYear = !activePeriod.isYearly ? activePeriod.year : CURRENT_YEAR;
  const [selectedYear, setSelectedYear] = useState(initialYear);

  useEffect(() => {
    if (open && !activePeriod.isYearly) {
      setSelectedYear(activePeriod.year);
    }
  }, [open, activePeriod]);

  const handleMonthSelect = (monthIndex: number) => {
    onSelect(JSON.stringify({ year: selectedYear, month: monthIndex }));
    onClose();
  };

  const isMonthDisabled = (monthIndex: number) => {
    // Disable future months
    if (selectedYear === CURRENT_YEAR && monthIndex > CURRENT_MONTH) {
      return true;
    }
    // Disable months before data start period
    if (
      selectedYear === startingPeriod.year &&
      monthIndex < startingPeriod.month
    ) {
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
            disabled={selectedYear <= startingPeriod.year} // Min year
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
              !activePeriod.isYearly &&
              selectedYear === activePeriod.year &&
              index === activePeriod.month;
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
