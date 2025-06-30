import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {DomainTodolist} from "@/features/todolists/model/todolistsSlice.ts"
import {TaskItem} from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {fetchTasks, selectTasks} from "@/features/todolists/model/tasksSlice.ts";
import {useEffect} from "react";
import {TaskStatus} from "@/common/enums";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasks({todolistId: todolist.id}))
    }, []);

    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === "active") {
        filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.InProgress)
    }
    if (filter === "completed") {
        filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
    }

    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks?.map((task) => (
                        <TaskItem key={task.id} task={task} todolistId={id}/>
                    ))}
                </List>
            )}
        </>
    )
}
