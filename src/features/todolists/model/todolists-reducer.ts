import {nanoid} from "@reduxjs/toolkit";
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {createAppSlice} from "@/common/utils/createAppSlice.ts";

export const todolistsSlice = createAppSlice({
    name: 'todolists',
    initialState: [] as TodolistDomain[],
    selectors: {
        selectTodolists: (state): TodolistDomain[] => state
    },
    reducers: (creators) => ({
        fetchTodolistsTC: creators.asyncThunk(
            async (_arg, thunkAPI) => {
                try {
                    const res = await todolistsApi.getTodolists()
                    return {todolists: res.data}
                } catch (e) {
                    return thunkAPI.rejectWithValue(e)
                }
            }, {
                fulfilled: (_state, action) => {
                    return action.payload.todolists.map(td => {
                        return {...td, filter: 'all'}
                    })
                },
            }
        ),
        deleteTodolistAC: creators.reducer<{ id: string }>((state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        }),
        createTodolistAC: creators.preparedReducer(
            (title: string) => ({payload: {title, id: nanoid()}}),
            (state, action) => {
                state.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    addedDate: '',
                    order: 0,
                    filter: "all"
                })
            }
        ),
        changeTodolistTitleAC: creators.reducer<{ id: string; title: string }>((state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        }),
        changeTodolistFilterAC: creators.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
    }),
    // extraReducers: (builder) => {
    //     builder.addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
    //         return action.payload.todolists.map(td => {
    //             return {...td, filter: 'all'}
    //         })
    //     })
    // },
})

// export const fetchTodolistsTC = createAsyncThunk(`${[todolistsSlice.name]}/fetchTodolistsTC`, async (_arg, thunkAPI) => {
//     try {
//         const res = await todolistsApi.getTodolists()
//         return {todolists: res.data}
//     } catch (e) {
//         return thunkAPI.rejectWithValue(e)
//     }
// })

export const todolistsReducer = todolistsSlice.reducer
export const {selectTodolists} = todolistsSlice.selectors
export const {
    deleteTodolistAC,
    createTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    fetchTodolistsTC,
} = todolistsSlice.actions

// export type Todolist = {
//     id: string
//     title: string
//     filter: FilterValues
// }

export type TodolistDomain = Todolist & { filter: FilterValues }

export type FilterValues = "all" | "active" | "completed"
