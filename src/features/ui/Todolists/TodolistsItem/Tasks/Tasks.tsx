import List from "@mui/material/List";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {tasksSelector} from "@/features/todolists/model/tasksSelector.ts";
import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {TaskItem} from "@/features/ui/Todolists/TodolistsItem/Tasks/TaskItem/TaskItem.tsx";

type Props = {
    todolist: Todolist
}

export const Tasks = (props: Props) => {
    const tasks = useAppSelector(tasksSelector)

    const {
        todolist: {id: todolistId, filter},
    } = props;


    const todolistTasks = tasks[todolistId]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => <TaskItem key={task.id} task={task} todolistId={todolistId}/>)}
                </List>

            )
            }
        </>

    )
}
