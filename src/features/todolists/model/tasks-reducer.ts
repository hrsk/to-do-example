import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";
import {DomainTask} from "@/features/todolists/api/tasksApi.types.ts";
import {TaskPriority, TaskStatus} from "@/common/enums";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {tasks: {} as TasksState},
    reducers: (creators) => ({
        deleteTaskAC: creators.reducer<{ todolistId: string; taskId: string }>((state, action) => {
            const tasks = state.tasks[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        }),
        createTaskAC: creators.reducer<{ todolistId: string; title: string }>((state, action) => {
            const newTask: DomainTask = {
                title: action.payload.title,
                status: TaskStatus.New,
                id: nanoid(),
                startDate: '',
                todoListId: action.payload.todolistId,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriority.Hi
            }
            state.tasks[action.payload.todolistId].unshift(newTask)
        }),
        changeTaskStatusAC: creators.reducer<{
            todolistId: string;
            taskId: string;
            status: TaskStatus
        }>((state, action) => {
            const task = state.tasks[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.status = action.payload.status
            }
        }),
        changeTaskTitleAC: creators.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
            const task = state.tasks[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        }),
    }),
    selectors: {
        selectTasks: (state): TasksState => state.tasks
    },
    extraReducers: (builder) => {
        builder.addCase(createTodolistAC, (state, action) => {
            state.tasks[action.payload.id] = []
        })
            .addCase(deleteTodolistAC, (state, action) => {
                delete state.tasks[action.payload.id]
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks[action.payload.todolistId] = action.payload.tasks
            })
    }
})


export const fetchTasks = createAsyncThunk(`${[tasksSlice.name]}/fetchTasks`, async (todolistId: string, thunkAPI) => {

    const {rejectWithValue} = thunkAPI
    try {
        const res = await tasksApi.getTasks(todolistId)

        return {tasks: res.data.items, todolistId}
    } catch (err) {
        return rejectWithValue(err)
    }
})


export const {deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC} = tasksSlice.actions
export const {selectTasks} = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, DomainTask[]>
