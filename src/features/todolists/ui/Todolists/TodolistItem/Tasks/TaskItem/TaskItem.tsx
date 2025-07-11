import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan"
import {useAppDispatch} from "@/common/hooks"
import {
    updateTaskThunk,
    deleteTaskThunk,
} from "@/features/todolists/model/tasksSlice.ts"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type {ChangeEvent} from "react"
import {getListItemSx} from "./TaskItem.styles"
import {DomainTask} from "@/features/todolists/api/tasksApi.types.ts";
import {TaskStatus} from "@/common/enums";

type Props = {
    task: DomainTask
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskThunk({todolistId, taskId: task.id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        dispatch(updateTaskThunk({todolistId, taskId: task.id, updateModel: {...task, status: newStatusValue}}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskThunk({todolistId, taskId: task.id, updateModel: {...task, title}}))
    }

    return (
        <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
            <div>
                <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
