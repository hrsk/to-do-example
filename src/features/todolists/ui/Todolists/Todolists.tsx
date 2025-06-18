import {useAppSelector} from "@/common/hooks/useAppSelector"
import {selectTodolists} from "@/features/todolists/model/todolists-selectors"
import {TodolistItem} from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import {useEffect} from "react";
import {fetchTodolistsTC} from "@/features/todolists/model/todolists-slice.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
        // todolistsApi.getTodolists().then(res => {
        //     dispatch(fetchTodolistsAC({todolists: res.data}))
        //     // const todolists = res.data
        //     // console.log(todolists)
        // })
    }, [])

    return (
        <>
            {todolists.map((todolist) => (
                <Grid key={todolist.id}>
                    <Paper sx={{p: "0 20px 20px 20px"}}>
                        <TodolistItem todolist={todolist}/>
                    </Paper>
                </Grid>
            ))}
        </>
    )
}
