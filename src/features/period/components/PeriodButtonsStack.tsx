import { ToggleButton, Stack, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

import CalendarSvg from '@assets/calendar.svg?react';
import type { Period } from '@/features/period/types/period.types';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '@/shared/constants/current-period.constants';
import { PERIOD_BUTTONS_CONFIG } from '../constants/periods.constants';
import { useAppDispatch } from '@/store/hooks';
import { setActivePeriod } from '@/features/period/state/period.slice';
import PeriodPicker from './PeriodPicker';
import { StyledExpandableButton } from '@/components/common/PeriodButton/StyledExpandableButton';
import { getMonthKey } from '../utils/period.utils';
import { MONTHS } from '@/shared/constants/months.constants';

const buttonGroup = PERIOD_BUTTONS_CONFIG.filter((btn) => !btn.isStandalone);
const firstButtonValue = buttonGroup[0].value;
const buttonStandalone = PERIOD_BUTTONS_CONFIG.find((btn) => btn.isStandalone);

// TODO: think about refactoring this component to maybe separate predefined periods and custom period selection
// TODO: think about refactoring to maybe move the logic to selectors & hide implementation details,
// so all the state had one source of truth (redux store) and based on that state buttons decided the "selected" state

function PeriodButtonsStack() {
  const dispatch = useAppDispatch();

  const [period, setPeriod] = useState<Period | null>(firstButtonValue);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState({
    year: CURRENT_YEAR,
    month: CURRENT_MONTH,
  });

  const handlePeriodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: Period | null
  ) => {
    console.log('Selected period:', newPeriod);
    if (newPeriod !== null) {
      setPeriod(newPeriod);
      // Only update global state for predefined periods
      if (newPeriod !== 'select-period') {
        dispatch(setActivePeriod(newPeriod));
      }
      if (newPeriod === 'this-month') {
        setSelectedDate({ year: CURRENT_YEAR, month: CURRENT_MONTH });
      }
      if (newPeriod === 'last-month') {
        const lastMonth = CURRENT_MONTH === 0 ? 11 : CURRENT_MONTH - 1;
        const year = CURRENT_MONTH === 0 ? CURRENT_YEAR - 1 : CURRENT_YEAR;
        setSelectedDate({ year, month: lastMonth });
      }
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <ToggleButtonGroup
        value={period}
        exclusive
        onChange={handlePeriodChange}
        aria-label="period selection"
      >
        {buttonGroup.map((button) => (
          <StyledExpandableButton
            as={ToggleButton}
            key={button.value}
            aria-label={button.label.toLowerCase()}
            value={button.value}
          >
            {button.label}
          </StyledExpandableButton>
        ))}
      </ToggleButtonGroup>

      {buttonStandalone && (
        <>
          <StyledExpandableButton
            as={ToggleButton}
            aria-label={buttonStandalone.label}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            value={buttonStandalone.value}
            className={period ? '' : 'Mui-selected'}
          >
            <CalendarSvg width={18} height={18} />
            {period
              ? 'Select period'
              : MONTHS[selectedDate.month].slice(0, 3) +
                ', ' +
                selectedDate.year}
          </StyledExpandableButton>

          <PeriodPicker
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            onSelect={(year, month) => {
              setSelectedDate({ year, month });
              dispatch(setActivePeriod(getMonthKey(year, month)));
              if (year === CURRENT_YEAR && month === CURRENT_MONTH) {
                return setPeriod('this-month');
              }
              if (year === CURRENT_YEAR && month === CURRENT_MONTH - 1) {
                return setPeriod('last-month');
              }
              setPeriod(null);
            }}
            initialYear={selectedDate.year}
            initialMonth={selectedDate.month}
          />
        </>
      )}
    </Stack>
  );
}

export default PeriodButtonsStack;
