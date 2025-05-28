import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {changeTodolistFilterAC, FilterValues, Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {containerSx} from "@/common/styles/container.styles.ts";

type Props = {
    todolist: Todolist
}
export const FilterButtons = (props: Props) => {

    const {todolist: {id: todolistId, filter}} = props

    const dispatch = useAppDispatch()


    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterHandler('all')}>
                All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterHandler('active')}>
                Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterHandler('completed')}>
                Completed
            </Button>
        </Box>
    )
}
