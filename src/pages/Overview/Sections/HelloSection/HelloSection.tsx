import { Typography } from '@mui/material';
import { styled } from '@mui/system';

import PeriodButtonsStack from './Components/PeriodButtonsStack';

const Section = styled('section')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

function HelloSection() {
  return (
    <Section>
      <Typography variant="h1">Hello, Mark!</Typography>
      <PeriodButtonsStack />
    </Section>
  );
}

export default HelloSection;
