import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";

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
    }),
    extraReducers: builder => {
        builder.addCase(getTodolistsThunk.fulfilled, (state, action) => {
            return {
                ...state.todolists, todolists: action.payload.todolists.map(td => {
                    return {...td, filter: 'all'}
                })
            }
        })
            .addCase(getTodolistsThunk.rejected, (_) => {
                //если ошибка
            })
        builder.addCase(changeTodolistTitleThunk.fulfilled, (state, action) => {
            const index = state.todolists.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state.todolists[index].title = action.payload.title
            }
        })
        builder.addCase(createTodolistThunk.fulfilled, (state, action) => {
            state.todolists.unshift({
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                addedDate: '',
                order: 1,
                filter: 'all'
            })
        })
        builder.addCase(deleteTodolistThunk.fulfilled, (state, action) => {
            const index = state.todolists.findIndex((todolist) => todolist.id === action.payload.todolistId)
            if (index !== -1) {
                state.todolists.splice(index, 1)
            }
        })
    },
    selectors: {
        selectTodolists: (state): DomainTodolist[] => state.todolists
    }
})

export const getTodolistsThunk = createAsyncThunk(`${todolistsSlice.name}/getTodolistsThunk`, async (_, thunkAPI) => {

    const {rejectWithValue} = thunkAPI

    const response = await todolistsApi.getTodolists()

    try {
        return {todolists: response.data}
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const changeTodolistTitleThunk = createAsyncThunk(`${todolistsSlice.name}/changeTodolistTitleThunk`, async (arg: {
    id: string,
    title: string
}, thunkAPI) => {

    const {rejectWithValue} = thunkAPI

    await todolistsApi.changeTodolistTitle(arg)

    try {
        return arg
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const createTodolistThunk = createAsyncThunk(`${todolistsSlice.name}/createTodolistThunk`, async (arg: {
    title: string
}, thunkAPI) => {

    const {rejectWithValue} = thunkAPI

    const res = await todolistsApi.createTodolist(arg.title)

    try {
        return {todolist: res.data.data.item}
    } catch (e) {
        return rejectWithValue(e)
    }
})
export const deleteTodolistThunk = createAsyncThunk(`${todolistsSlice.name}/deleteTodolistThunk`, async (arg: {
    todolistId: string
}, thunkAPI) => {

    const {rejectWithValue} = thunkAPI

    // const {todolistId} = arg

    await todolistsApi.deleteTodolist(arg.todolistId)

    try {
        return {todolistId: arg.todolistId}
    } catch (e) {
        return rejectWithValue(e)
    }
})

// export const deleteTodolistThunk = createAsyncThunk(`${todolistsSlice.name}/deleteTodolistThunk`, async (id: string, thunkAPI) => {
//
//     const {rejectWithValue} = thunkAPI
//
//     await todolistsApi.deleteTodolist(id)
//
//     try {
//         return {id}
//     } catch (e) {
//         return rejectWithValue(e)
//     }
// })

export const todolistsReducer = todolistsSlice.reducer
export const {
    deleteTodolistAC,
    createTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

export type DomainTodolist = Todolist & {
    filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
