import {useAppDispatch} from "@/common/hooks/useAppDispatch"
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan"
import {
    changeTodolistTitleTC,
    deleteTodolistAC,
    MainTodolist,
} from "@/features/todolists/model/todolists-slice.ts"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"

type Props = {
    todolist: MainTodolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id}))
    }

    // const changeTodolistTitle = (title: string) => {
    //   dispatch(changeTodolistTitleAC({ id, title }))
    // }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleTC({id, title}))
    }

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
