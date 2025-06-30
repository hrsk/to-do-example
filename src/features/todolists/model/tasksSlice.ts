import {createTodolistAC, deleteTodolistAC} from "@/features/todolists/model/todolistsSlice.ts";
import {createAppSlice} from "@/common/utils/createAppSlice.ts";
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";
import {DomainTask, UpdateTaskModel} from "@/features/todolists/api/tasksApi.types.ts";

export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {
        tasks: {} as TasksState
    },
    reducers: create => ({
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
        deleteTaskThunk: create.asyncThunk(async (args: { todolistId: string, taskId: string }, {rejectWithValue}) => {
            try {
                await tasksApi.deleteTask(args)
                return {task: {}, todolistId: args.todolistId, taskId: args.taskId}
            } catch (e) {
                return rejectWithValue(e)
            }
        }, {
            fulfilled: (state, action) => {
                const tasks = state.tasks[action.payload.todolistId]
                const index = tasks.findIndex((task) => task.id === action.payload.taskId)
                if (index !== -1) {
                    tasks.splice(index, 1)
                }
            }
        }),
        updateTaskThunk: create.asyncThunk(async (args: {
            todolistId: string,
            taskId: string,
            updateModel: UpdateTaskModel
        }, {rejectWithValue}) => {

            try {
                const updateTaskModel: UpdateTaskModel = {...args.updateModel}

                const res = await tasksApi.updateTask({
                    todolistId: args.todolistId,
                    taskId: args.taskId,
                    model: updateTaskModel
                })
                return {task: res.data.data.item}
            } catch (e) {
                return rejectWithValue(e)
            }
        }, {
            fulfilled:
                (state, action) => {
                    const task = state.tasks[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
                    if (task) {
                        task.title = action.payload.task.title
                    }
                    if (task) {
                        task.status = action.payload.task.status
                    }
                }
        })
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

export const {
    fetchTasks,
    createTaskThunk,
    deleteTaskThunk,
    updateTaskThunk
} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
