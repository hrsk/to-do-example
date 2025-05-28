import {RootState} from "../../../app/store.ts";
import {TasksState} from "@/features/todolists/model/tasks-reducer.ts";

export const tasksSelector = (state: RootState): TasksState => state.tasks
