import {useState, useMemo} from 'react';
import {createTheme} from '@mui/material';

export const useThemeMode = () => {
  const getInitialMode = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    return currentHour >= 19 || currentHour < 7 ? 'dark' : 'light';
  };
  const [mode, setMode] = useState(getInitialMode());

  const toggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode,

            ...(mode === 'light' ?
            {
              // palette values for light mode
              primary: {
                main: '#070A52',
              },
              text: {
                primary: '#000000',
                secondary: '#070A52',
              },
              background: {
                default: '#F9F5F6',
                paper: '#ACBCFF',
              },
            } :
            {
              // palette values for dark mode
              primary: {
                main: '#ffffff',
              },
              text: {
                primary: '#ffffff',
                secondary: '#ffffff',
              },
              background: {
                default: '#211A2B',
                paper: '#262536',
              },
            }),
          },
          components: {
            MuiOutlinedInput: {
              'styleOverrides': {
                root: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '10px',
                  },
                  '& .MuiOutlinedInput-input': {
                    backgroundColor: mode === 'light'? '#F9F5F6' : '#211A2B',
                    borderRadius: '10px',
                  },
                },
              },
            },
          },
        }),
      [mode],
  );

  return {mode, toggleColorMode, theme};
};
