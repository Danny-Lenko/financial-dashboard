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

const buttonGroup = PERIOD_BUTTONS_CONFIG.filter((btn) => !btn.isStandalone);
const firstButtonValue = buttonGroup[0].value;
const buttonStandalone = PERIOD_BUTTONS_CONFIG.find((btn) => btn.isStandalone);

function PeriodButtonsStack() {
  const dispatch = useAppDispatch();

  const [period, setPeriod] = useState<Period>(firstButtonValue);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState({
    year: CURRENT_YEAR,
    month: CURRENT_MONTH,
  });

  const handlePeriodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: Period | null
  ) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
      // TEMPO Only update global state for predefined periods
      if (newPeriod !== 'select-period') {
        dispatch(setActivePeriod(newPeriod));
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
            // onChange={handlePeriodChange}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            value={buttonStandalone.value}
          >
            <CalendarSvg width={18} height={18} />
            Select period
          </StyledExpandableButton>

          <PeriodPicker
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            onSelect={(year, month) => {
              setSelectedDate({ year, month });
              // Fetch data for selected period
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
