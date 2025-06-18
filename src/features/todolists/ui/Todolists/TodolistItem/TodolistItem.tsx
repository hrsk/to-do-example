import {useAppDispatch} from "@/common/hooks/useAppDispatch"
import {FilterButtons} from "./FilterButtons/FilterButtons"
import {createTaskAC} from "@/features/todolists/model/tasks-slice.ts"
import type {MainTodolist} from "@/features/todolists/model/todolists-slice.ts"
import {Tasks} from "./Tasks/Tasks"
import {TodolistTitle} from "./TodolistTitle/TodolistTitle"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"

type Props = {
  todolist: MainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
