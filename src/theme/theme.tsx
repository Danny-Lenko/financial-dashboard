import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { typography } from './typography';

const theme = createTheme({
  cssVariables: true,
  palette: {
    ...colors,
  },
  typography: {
    ...typography,
  },
});

export default theme;
