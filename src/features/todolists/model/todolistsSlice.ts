import {nanoid} from "@reduxjs/toolkit";
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {createAppSlice} from "@/common/utils/createAppSlice.ts";

export const todolistsSlice = createAppSlice({
    name: 'todolists',
    initialState: {
        todolists: [] as DomainTodolist[],
    },
    reducers: create => ({
        getTodolistsThunk: create.asyncThunk(async (_, thunkAPI) => {

                const {rejectWithValue} = thunkAPI

                const response = await todolistsApi.getTodolists()

                try {
                    return {todolists: response.data}
                } catch (e) {
                    return rejectWithValue(e)
                }
            }, {
                fulfilled: ((state, action) => {
                    state.todolists = action.payload.todolists.map(td => {
                        return {...td, filter: 'all'}
                    })
                })
            },
        ),
        changeTodolistTitleThunk: create.asyncThunk(async (args: {
            id: string,
            title: string
        }, thunkAPI) => {

            const {rejectWithValue} = thunkAPI

            await todolistsApi.changeTodolistTitle(args)

            try {
                return args
            } catch (e) {
                return rejectWithValue(e)
            }
        }, {
            fulfilled:
                (state, action) => {
                    const index = state.todolists.findIndex((todolist) => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state.todolists[index].title = action.payload.title
                    }
                }
        }),
        createTodolistThunk: create.asyncThunk(
            async (args: {
                title: string
            }, thunkAPI) => {

                const {rejectWithValue} = thunkAPI

                const res = await todolistsApi.createTodolist(args.title)

                try {
                    return {todolist: res.data.data.item}
                } catch (e) {
                    return rejectWithValue(e)
                }
            }, {
                fulfilled: (state, action) => {
                    state.todolists.unshift({
                        id: action.payload.todolist.id,
                        title: action.payload.todolist.title,
                        addedDate: '',
                        order: 1,
                        filter: 'all'
                    })
                }
            }
        ),
        deleteTodolistThunk: create.asyncThunk(async (args: {
            todolistId: string
        }, thunkAPI) => {

            const {rejectWithValue} = thunkAPI

            await todolistsApi.deleteTodolist(args.todolistId)

            try {
                return {todolistId: args.todolistId}
            } catch (e) {
                return rejectWithValue(e)
            }
        }, {
            fulfilled: (state, action) => {
                const index = state.todolists.findIndex((todolist) => todolist.id === action.payload.todolistId)
                if (index !== -1) {
                    state.todolists.splice(index, 1)
                }
            }
        }),
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
    getTodolistsThunk,
    createTodolistThunk,
    changeTodolistTitleThunk,
    deleteTodolistThunk,
} = todolistsSlice.actions

export const {selectTodolists} = todolistsSlice.selectors

export type DomainTodolist = Todolist & {
    filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
