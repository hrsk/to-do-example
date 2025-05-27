import {RootState} from "../app/store.ts";
import {TasksState} from "../App.tsx";

export const tasksSelector = (state: RootState): TasksState => state.tasks
