"use client"

import type React from "react"
import type { Task } from "../types"

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onUpdateStatus: (task: Task) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onUpdateStatus }) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col items-center space-y-3 transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="w-full text-center">
        <h3
          className={`font-semibold text-lg ${task.status === "completed" ? "line-through text-gray-500" : "text-gray-800"}`}
        >
          {task.name}
        </h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 w-full">
        <button
          onClick={() => onUpdateStatus({ ...task, status: task.status === "pending" ? "completed" : "pending" })}
          className={`px-3 py-1 rounded-md ${task.status === "pending" ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"} text-white font-medium text-sm transition duration-300 ease-in-out`}
        >
          {task.status === "pending" ? "Completar" : "Reabrir"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm rounded-md transition duration-300 ease-in-out"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-medium text-sm rounded-md transition duration-300 ease-in-out"
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}

