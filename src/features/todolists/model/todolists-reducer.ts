import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, todolistId: nanoid()}}
})
export const changeTodolistTitleAC = createAction<{
    todolistId: string,
    title: string
}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{
    todolistId: string,
    filter: FilterValues
}>('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            // с помощью метода .findIndex находим индекс таски, которую требуется удалить

            const index = state.findIndex(todolist => todolist.id === action.payload.id)

            // проверяем на равенство -1
            if (index !== -1) {
                // если не равно, с помощью метода .splice удаляем тудулист
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            //с помощью мутирующего метода массива .push добавляем объект нового тудулиста
            state.push({id: action.payload.todolistId, title: action.payload.title, filter: "all"})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            // с помощью метода массива .find находим по id нужный тудулист
            const todolist = state.find(td => td.id === action.payload.todolistId)

            if (todolist) {
                // если существует, изменяем его название
                todolist.title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            // с помощью метода массива .find находим по id нужный тудулист
            const todolist = state.find(td => td.id === action.payload.todolistId)

            if (todolist) {
                // если существует, изменяем его значение фильтра
                todolist.filter = action.payload.filter
            }
        })
})

//types

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

