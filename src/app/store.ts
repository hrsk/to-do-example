import {configureStore} from "@reduxjs/toolkit"
import {appReducer, appSlice} from "./appSlice.ts"
import {tasksReducer, tasksSlice} from "@/features/todolists/model/tasksSlice.ts"
import {todolistsReducer, todolistsSlice} from "@/features/todolists/model/todolistsSlice.ts"

// объединение reducer'ов с помощью combineReducers
// const rootReducer = combineReducers({
//   [tasksSlice.name]: tasksReducer,
//   [todolistsSlice.name]: todolistsReducer,
//   [appSlice.name]: appReducer,
// })

// создание store
export const store = configureStore({
    reducer: {
        [tasksSlice.name]: tasksReducer,
        [todolistsSlice.name]: todolistsReducer,
        [appSlice.name]: appReducer,
    },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
