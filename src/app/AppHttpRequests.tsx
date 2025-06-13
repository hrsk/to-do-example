import {type ChangeEvent, type CSSProperties, useEffect, useState} from "react"
import Checkbox from "@mui/material/Checkbox"
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts"
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts"
import {CreateItemForm, EditableSpan} from "@/common/components"
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";
import {DomainTask, UpdateTaskModel} from "@/features/todolists/api/tasksApi.types.ts";

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

    useEffect(() => {
        todolistsApi.getTodolists().then((res) => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(todolist => {
                tasksApi.getTasks(todolist.id).then(res => {
                    setTasks((prev) => ({...prev, [todolist.id]: res.data.items}))
                })
            })
        })
    }, [])

    const createTodolist = (title: string) => {
        todolistsApi.createTodolist(title).then((res) => {
            setTodolists([res.data.data.item, ...todolists])
        })
    }

    const deleteTodolist = (id: string) => {
        todolistsApi.deleteTodolist(id).then(() => {
            setTodolists(todolists.filter((td) => td.id !== id))
        })
    }

    const changeTodolistTitle = (id: string, title: string) => {
        todolistsApi.changeTodolistTitle({id, title}).then(() => {
            setTodolists(todolists.map((todolist) => (todolist.id === id ? {...todolist, title} : todolist)))
        })
    }

    const createTask = (todolistId: string, title: string) => {
        tasksApi.createTask({todolistId, title}).then((res) => {
            setTasks({...tasks, [todolistId]: [...tasks[todolistId], res.data.data.item]})
        })
    }

    const deleteTask = (todolistId: string, taskId: string) => {
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        const todolistId = task.todoListId

        const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: e.target.checked ? 2 : 0,
        }

        tasksApi.updateTask({todolistId, taskId: task.id, model}).then(() => {
            setTasks({
                ...tasks,
                [todolistId]: tasks[todolistId].filter((t) => t.id !== task.id ? {...task, model } : task)
            })
        })
    }

    const changeTaskTitle = (task: any, title: string) => {
    }

    return (
        <div style={{margin: "20px"}}>
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map((todolist) => (
                <div key={todolist.id} style={container}>
                    <div>
                        <EditableSpan value={todolist.title}
                                      onChange={(title) => changeTodolistTitle(todolist.id, title)}/>
                        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
                    </div>
                    <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)}/>
                    {tasks[todolist.id]?.map((task: any) => (
                        <div key={task.id}>
                            <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatus(e, task)}/>
                            <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)}/>
                            <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const container: CSSProperties = {
    border: "1px solid black",
    margin: "20px 0",
    padding: "10px",
    width: "300px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
}
