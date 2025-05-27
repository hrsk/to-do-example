import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {TasksState} from "../App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

//инициализационный стэйт для тасок
const initialState: TasksState = {}

//action creators
export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTask')
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, builder => {
    builder.addCase(createTodolistAC, (state, action) => {
        //присваиваем создаваемому тудулисту значение пустого массива
        state[action.payload.todolistId] = []
    })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTaskAC, (state, action) => {
            //с помощью мутирующего метода массива .push добавляем объект новой таски
            state[action.payload.todolistId].push({id: nanoid(), title: action.payload.title, isDone: false })
        })
        .addCase(deleteTaskAC, (state, action) => {
            // с помощью метода findIndex находим индекс таски, которую требуется удалить
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            // проверяем на равенство -1
            if (index !== -1) {
                // если не равно, с помощью метода .splice удаляем таску
                state[action.payload.todolistId].splice(index, 1)
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            // с помощью метода массива .find находим по id нужную таску
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)

            if (task) {
                // если таска существует, изменяем ее статус
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            // с помощью метода массива .find находим по id нужную таску

            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)

            if (task) {
                // если таска существует, изменяем ее название
                task.title = action.payload.title
            }
        })
})

