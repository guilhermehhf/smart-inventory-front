import {createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useState } from "react";
import { deepOrange, deepPurple, lightBlue, orange } from '@mui/material/colors';



export function SwitchLightDark(){
    const [darkState, setDarkState] = useState(false);
    const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
    const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
    const theme = createTheme({
        palette: {
          primary:{
            main: mainPrimaryColor
          },
          secondary: {
            main: mainSecondaryColor
          }
        },
    });

    const handleThemeChange = () => {
        setDarkState(!darkState);
    };


    return(
    <div>
        <ThemeProvider theme={theme}>
            <Switch checked={darkState} onChange={handleThemeChange}/>
        </ThemeProvider>
        
    </div>
    )
}