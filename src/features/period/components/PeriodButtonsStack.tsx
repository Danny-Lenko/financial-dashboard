import { ToggleButton, Stack, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

import CalendarSvg from '@assets/calendar.svg?react';
import { PERIOD_BUTTONS_CONFIG } from '../constants/periods.constants';
import PeriodPicker from './PeriodPicker';
import { StyledExpandableButton } from '@/components/common/PeriodButton/StyledExpandableButton';
import { MONTHS } from '@/shared/constants/months.constants';
import { usePeriodSelection } from '../hooks/usePeriodSelection.hook';

function PeriodButtonsStack() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { activePeriod, isPresetPeriod, pickPeriod, isYearlyPeriod } =
    usePeriodSelection();

  const handlePeriodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: string
  ) => {
    if (newPeriod !== null) {
      pickPeriod(newPeriod);
    }
  };

  const getButtonLabel = () => {
    if (isPresetPeriod) {
      return 'Select period';
    }

    if (!isYearlyPeriod) {
      return `${MONTHS[activePeriod.month].slice(0, 3)}, ${activePeriod.year}`;
    }

    return `${activePeriod.year}`;
  };

  return (
    <Stack direction="row" spacing={2}>
      <ToggleButtonGroup
        value={JSON.stringify(activePeriod)}
        exclusive
        onChange={handlePeriodChange}
        aria-label="period selection"
      >
        {PERIOD_BUTTONS_CONFIG.map((button) => {
          return (
            <StyledExpandableButton
              as={ToggleButton}
              key={button.name}
              aria-label={button.label.toLowerCase()}
              value={JSON.stringify(button.value)}
            >
              {button.label}
            </StyledExpandableButton>
          );
        })}
      </ToggleButtonGroup>

      <>
        <StyledExpandableButton
          as={ToggleButton}
          aria-label="select period"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className={isPresetPeriod ? '' : 'Mui-selected'}
          value="custom-period"
        >
          <CalendarSvg width={18} height={18} />
          {getButtonLabel()}
        </StyledExpandableButton>

        <PeriodPicker
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          onSelect={pickPeriod}
        />
      </>
    </Stack>
  );
}

export default PeriodButtonsStack;
