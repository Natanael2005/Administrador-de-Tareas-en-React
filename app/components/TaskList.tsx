"use client"

import type React from "react"
import type { Task } from "../types"
import { TaskItem } from "./TaskItem"

interface TaskListProps {
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (id: string) => void
  onUpdateStatus: (task: Task) => void
  columnColor: string
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask, onUpdateStatus, columnColor }) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onUpdateStatus={onUpdateStatus}
          columnColor={columnColor}
        />
      ))}
    </div>
  )
}

