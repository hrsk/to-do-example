import {createSlice, nanoid} from "@reduxjs/toolkit";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: {
        todolists: [] as Todolist[],
    },
    reducers: create => ({
        createTodolistAC: create.preparedReducer(
            (title: string) => {
                const todolistId = nanoid()
                return {payload: {title, id: todolistId}}
            },
            (state, action) => {
                state.todolists.unshift({...action.payload, filter: 'all'})
            }),
        deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
            const index = state.todolists.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state.todolists.splice(index, 1)
            }
        }),
        changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
            const index = state.todolists.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state.todolists[index].title = action.payload.title
            }
        }),
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.todolists.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
    }),
    selectors: {
        selectTodolists: (state): Todolist[] => state.todolists
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const {
    deleteTodolistAC,
    createTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
