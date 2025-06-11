import {instance} from "@/common/instance/instance.ts";
import {GetTasksResponse} from "@/features/todolists/api/tasksApi.types.ts";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
}