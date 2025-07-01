import {createSlice} from "@reduxjs/toolkit";
import {RequestStatus} from "@/common/types";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        appStatus: 'idle' as RequestStatus
    },
    reducers: create => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppStatus: create.reducer<{ isLoading: RequestStatus }>((state, action) => {
            state.appStatus = action.payload.isLoading
        })
    }),
    selectors: {
        selectThemeMode: (state): ThemeMode => state.themeMode,
        selectAppStatus: (state): RequestStatus => state.appStatus
    }
})

export const appReducer = appSlice.reducer
export const {changeThemeModeAC, setAppStatus} = appSlice.actions
export const {selectThemeMode, selectAppStatus} = appSlice.selectors

export type ThemeMode = "dark" | "light"
