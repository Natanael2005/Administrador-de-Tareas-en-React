"use client"

import type React from "react"
import type { Task } from "../types"

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onUpdateStatus: (task: Task) => void
  columnColor: string
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onUpdateStatus, columnColor }) => {
  const getNextStatus = (currentStatus: string): Task["status"] => {
    const statusFlow = {
      pending: "in-progress",
      "in-progress": "completed",
      completed: "pending",
    } as const
    return statusFlow[currentStatus as keyof typeof statusFlow]
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{task.name}</h3>
        <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-gray-600">
          ×
        </button>
      </div>

      {task.description && <p className="text-sm text-gray-600">{task.description}</p>}

      <div className="flex justify-between items-center pt-2">
        <button onClick={() => onEdit(task)} className="text-sm text-gray-600 hover:text-gray-900">
          Editar
        </button>
        <button
          onClick={() => onUpdateStatus({ ...task, status: getNextStatus(task.status) })}
          className={`text-sm px-3 py-1 rounded-full
            ${columnColor === "gray" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : ""}
            ${columnColor === "yellow" ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}
            ${columnColor === "green" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : ""}
          `}
        >
          {task.status === "pending" ? "Iniciar" : task.status === "in-progress" ? "Completar" : "Reiniciar"}
        </button>
      </div>
    </div>
  )
}

