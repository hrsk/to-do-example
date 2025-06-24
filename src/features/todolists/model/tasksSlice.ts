import {createSlice, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "@/features/todolists/model/todolistsSlice.ts";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: {} as TasksState
    },
    reducers: create => ({
        createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
            const newTask: Task = {title: action.payload.title, isDone: false, id: nanoid()}
            state.tasks[action.payload.todolistId].unshift(newTask)
        }),
        deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
            const tasks = state.tasks[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        }),
        changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
            const task = state.tasks[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        }),
        changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
            const task = state.tasks[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(deleteTodolistAC, (state, action) => {
            delete state.tasks[action.payload.id]
        })
            .addCase(createTodolistAC, (state, action) => {
                state.tasks[action.payload.id] = []
            })
    },
    selectors: {
        selectTasks: (state): TasksState => state.tasks
    }
})

export const {deleteTaskAC, createTaskAC, changeTaskTitleAC, changeTaskStatusAC} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors


export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, Task[]>
