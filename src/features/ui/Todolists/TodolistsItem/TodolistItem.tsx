import {CreateItemForm} from '../../../../common/components/CreateItemForm/CreateItemForm.tsx'
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Tasks} from './Tasks/Tasks.tsx'
import {TodolistTitle} from "@/features/ui/Todolists/TodolistsItem/TodolistTitle/TodolistTitle.tsx";
import {FilterButtons} from "@/features/ui/Todolists/FilterButtons/FilterButtons.tsx";

type Props = {
    todolist: Todolist
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id: todolistId},
    } = props

    const dispatch = useAppDispatch()


    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={props.todolist}/>
            <CreateItemForm onCreateItem={createTaskHandler}/>

            <Tasks todolist={props.todolist}/>
            <FilterButtons todolist={props.todolist}/>
        </div>
    )
}
