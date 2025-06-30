import {createTodolistAC, deleteTodolistAC} from "@/features/todolists/model/todolistsSlice.ts";
import {createAppSlice} from "@/common/utils/createAppSlice.ts";
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";
import {DomainTask} from "@/features/todolists/api/tasksApi.types.ts";
import {TaskStatus} from "@/common/enums";

export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {
        tasks: {} as TasksState
    },
    reducers: create => ({
        // createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
        //     const newTask: Task = {title: action.payload.title, isDone: false, id: nanoid()}
        //     state.tasks[action.payload.todolistId].unshift(newTask)
        // }),
        deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
            const tasks = state.tasks[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        }),
        changeTaskStatusAC: create.reducer<{
            todolistId: string;
            taskId: string;
            status: TaskStatus
        }>((state, action) => {
            const task = state.tasks[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.status = action.payload.status
            }
        }),
        changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
            const task = state.tasks[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        }),
        fetchTasks: create.asyncThunk(async (args: { todolistId: string }, {rejectWithValue}) => {
            try {
                const res = await tasksApi.getTasks(args.todolistId)
                return {tasks: res.data.items, todolistId: args.todolistId}
            } catch (e) {
                return rejectWithValue(e)
            }
        }, {
            fulfilled: (state, action) => {
                state.tasks[action.payload.todolistId] = action.payload.tasks
            }
        }),
        createTaskThunk: create.asyncThunk(async (args: { todolistId: string; title: string }, {rejectWithValue}) => {

            try {
                const response = await tasksApi.createTask(args)
                return {
                    task: response.data.data.item
                }
            } catch (e) {
                return rejectWithValue(e)
            }
        }, {
            fulfilled: (state, action) => {
                state.tasks[action.payload.task.todoListId].unshift(action.payload.task)
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

export const {deleteTaskAC, changeTaskTitleAC, changeTaskStatusAC, fetchTasks, createTaskThunk} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors


export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, DomainTask[]>
