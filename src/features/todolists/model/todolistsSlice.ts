import {createSlice, nanoid} from "@reduxjs/toolkit";
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: {
        todolists: [] as DomainTodolist[],
    },
    reducers: create => ({
        createTodolistAC: create.preparedReducer(
            (title: string) => {
                const todolistId = nanoid()
                return {payload: {title, id: todolistId}}
            },
            (state, action) => {
                state.todolists.unshift({...action.payload, addedDate: '', order: 1, filter: 'all'})
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
        setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((state, action) => {
            return {
                ...state.todolists, todolists: action.payload.todolists.map(td => {
                    return {...td, filter: 'all'}
                })
            }
        }),
    }),
    selectors: {
        selectTodolists: (state): DomainTodolist[] => state.todolists
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const {
    deleteTodolistAC,
    createTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

export type DomainTodolist = Todolist & {
    filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
