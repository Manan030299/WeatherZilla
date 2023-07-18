import React from 'react';
import {createContext} from 'react';
import Box from '@mui/material/Box';
import {ThemeProvider} from '@mui/material/styles';
import {Toaster} from 'react-hot-toast';
import {Routing} from './Routes/Routes';
import {useThemeMode} from './hooks/useThemeMode';

export const ThemeContext = createContext();

// eslint-disable-next-line require-jsdoc
function App() {
  const {mode, theme} = useThemeMode();

  return (
    <>
      <ThemeContext.Provider value={mode}>
        <ThemeProvider theme={theme}>
          <Box className="App"
            sx={{
              fontFamily: 'Arial',
            }}
          >
            <Routing />
            <Toaster position="top-center" reverseOrder={false} />
          </Box>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
