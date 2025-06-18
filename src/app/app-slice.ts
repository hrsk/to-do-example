// import { createAction, createReducer } from "@reduxjs/toolkit"
//
// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")
//
// const initialState = {
//   themeMode: "light" as ThemeMode,
// }
//
// export const appReducer = createReducer(initialState, (builder) => {
//   builder.addCase(changeThemeModeAC, (state, action) => {
//     state.themeMode = action.payload.themeMode
//   })
// })
//

import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
    },
    reducers: (creators) => {
        return {
            //action creators and reducer
            changeThemeModeAC: creators.reducer<{ themeMode: ThemeMode }>((state, action) => {
                state.themeMode = action.payload.themeMode
            })
        }
    },
    selectors: {
        selectThemeMode: (state): ThemeMode => state.themeMode
    }
})

export const appReducer = appSlice.reducer
export const {changeThemeModeAC} = appSlice.actions
export const { selectThemeMode } = appSlice.selectors

export type ThemeMode = "dark" | "light"
