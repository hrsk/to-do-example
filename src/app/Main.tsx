import {useAppDispatch} from "@/common/hooks"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"
import {createTodolistThunk} from "@/features/todolists/model/todolistsSlice.ts"
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"

export const Main = () => {
    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistThunk({title}))
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid container sx={{mb: "30px"}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}
