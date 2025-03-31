import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Switch, Toolbar, Typography } from "@mui/material";

type Props = {
    darkMode: boolean,
    changeThemeMode: () => void
}

export default function NavBar({darkMode,changeThemeMode}: Props) {
    return (
        <AppBar position='fixed' >
            <Toolbar>
                <Typography variant="h6">GameStore</Typography>
                <Switch onClick={changeThemeMode} ></Switch>
                <IconButton>
                    {darkMode ? <DarkMode/> : <LightMode sx={{color: 'yellow'}}/>}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}