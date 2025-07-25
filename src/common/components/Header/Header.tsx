import {changeThemeModeAC, selectAppStatus} from "@/app/appSlice.ts"
import {selectThemeMode} from "@/app/appSlice"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {containerSx} from "@/common/styles"
import {getTheme} from "@/common/theme"
import {NavButton} from "@/common/components/NavButton/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import LinearProgress from "@mui/material/LinearProgress"

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const appStatus = useAppSelector(selectAppStatus)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === "light" ? "dark" : "light"}))
    }

    return (
        <AppBar position="static" sx={{mb: "30px"}}>
            <Toolbar>
                <Container maxWidth={"lg"} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={"default"} onChange={changeMode}/>
                    </div>
                </Container>
            </Toolbar>
            {appStatus === 'loading' && <LinearProgress/>}
        </AppBar>
    )
}
