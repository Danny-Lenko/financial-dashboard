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
  shape: {
    borderRadius: 8,
  },
});

export default theme;
