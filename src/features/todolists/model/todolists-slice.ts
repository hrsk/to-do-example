import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as MainTodolist[],
    reducers: (creators) => {
        return {
            //action creators and reducer
            deleteTodolistAC: creators.reducer<{ id: string }>((state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }),
            // createTodolistAC: creators.reducer<{ title: string, id: string }>((state, action) => {
            //     const newTodolist: Todolist = {
            //         id: action.payload.id,
            //         title: action.payload.title,
            //         filter: 'all',
            //     }
            //     // state.push({ ...action.payload, filter: "all" })
            //     state.push(newTodolist)
            // }),
            // createTodolistAC: creators.preparedReducer((title: string) => {
            //     return {payload: {title, id: nanoid()}}
            // }, (state, action) => {
            //     const newTodolist: Todolist = {
            //         id: action.payload.id,
            //         title: action.payload.title,
            //         filter: 'all',
            //     }
            //     state.push(newTodolist)
            // }),
            createTodolistAC: creators.preparedReducer((title: string) => {
                return {payload: {title, id: nanoid(), filter: 'all'} as MainTodolist}
            }, (state, action) => {
                state.push(action.payload)
            }),
            changeTodolistFilterAC: creators.reducer<{ id: string; filter: FilterValues }>((state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.filter
                }
            }),
            changeTodolistTitleAC: creators.reducer<{ id: string; title: string }>((state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            }),
            // fetchTodolistsAC: creators.reducer<{ todolists: MainTodolist[] }>((_, action) => {
            //     return action.payload.todolists.map(td => {
            //         return {...td, filter: 'all'}
            //     })
            // })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
            return action.payload.todolists.map(td => ({
                ...td, filter: 'all'
            }))
        })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            })
    }
})

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_arg, thunkAPI) => {
    //нужные функции для работы с санкой
    const {rejectWithValue} = thunkAPI

    try {
        const res = await todolistsApi.getTodolists()
        return {todolists: res.data}

        // dispatch(fetchTodolistsAC({todolists: res.data}))

    } catch (err) {
        return rejectWithValue(err)
    }

    // todolistsApi.getTodolists().then((res) => {
    //     dispatch(fetchTodolistsAC({todolists: res.data}))
    // })

})

export const changeTodolistTitleTC = createAsyncThunk(`${todolistsSlice.name}/changeTodolistTitleTC`, async (arg: {
    id: string,
    title: string
}, thunkAPI) => {
    //нужные функции для работы с санкой
    const {rejectWithValue} = thunkAPI

    try {
        await todolistsApi.changeTodolistTitle(arg)
        return arg

        // dispatch(fetchTodolistsAC({todolists: res.data}))

    } catch (err) {
        return rejectWithValue(err)
    }

    // todolistsApi.getTodolists().then((res) => {
    //     dispatch(fetchTodolistsAC({todolists: res.data}))
    // })

})


export const todolistsReducer = todolistsSlice.reducer
export const {
    deleteTodolistAC,
    createTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    // fetchTodolistsAC,
} = todolistsSlice.actions

// export const deleteTodolistAC = createAction<{ id: string }>("todolists/deleteTodolist")
// export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
//   return { payload: { title, id: nanoid() } }
// })
// export const changeTodolistTitleAC = createAction<{ id: string; title: string }>("todolists/changeTodolistTitle")
// export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValues }>(
//   "todolists/changeTodolistFilter",
// )
//
// const initialState: Todolist[] = []
//
// export const todolistsReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(deleteTodolistAC, (state, action) => {
//       const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//       if (index !== -1) {
//         state.splice(index, 1)
//       }
//     })
//     .addCase(createTodolistAC, (state, action) => {
//       state.push({ ...action.payload, filter: "all" })
//     })
//     .addCase(changeTodolistTitleAC, (state, action) => {
//       const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//       if (index !== -1) {
//         state[index].title = action.payload.title
//       }
//     })
//     .addCase(changeTodolistFilterAC, (state, action) => {
//       const todolist = state.find((todolist) => todolist.id === action.payload.id)
//       if (todolist) {
//         todolist.filter = action.payload.filter
//       }
//     })
// })

export type MainTodolist = Todolist & {
    filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
