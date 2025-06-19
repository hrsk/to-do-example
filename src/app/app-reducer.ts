import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode
    },
    selectors: {selectThemeMode: (state): ThemeMode => state.themeMode},
    reducers: (creators) => ({
        changeThemeModeAC: creators.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        })
    }),
})

export const {changeThemeModeAC} = appSlice.actions
export const {selectThemeMode} = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
