import {useAppDispatch} from "@/common/hooks"
import {FilterButtons} from "./FilterButtons/FilterButtons"
import {createTaskThunk} from "@/features/todolists/model/tasksSlice.ts"
import {DomainTodolist} from "@/features/todolists/model/todolistsSlice.ts"
import {Tasks} from "./Tasks/Tasks"
import {TodolistTitle} from "./TodolistTitle/TodolistTitle"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskThunk({ todolistId: todolist.id, title }))
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
