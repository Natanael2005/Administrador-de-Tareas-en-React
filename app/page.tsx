"use client"

import { useState, useCallback } from "react"
import { TaskList } from "./components/TaskList"
import { Modal } from "./components/Modal"
import { useLocalStorage } from "./hooks/useLocalStorage"
import type { Task } from "./types"

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const addTask = useCallback(
    (task: Task) => {
      setTasks((prevTasks) => [...prevTasks, task])
    },
    [setTasks],
  )

  const updateTask = useCallback(
    (updatedTask: Task) => {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    },
    [setTasks],
  )

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    },
    [setTasks],
  )

  const openModal = (task?: Task) => {
    setEditingTask(task || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setEditingTask(null)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Tablero de Tareas</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          + Nueva Tarea
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        <div className="flex-1 min-w-[300px] bg-gray-200 rounded-lg p-4">
          <h2 className="font-semibold mb-4 text-gray-700 flex items-center">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
            Pendiente
          </h2>
          <TaskList
            tasks={tasks.filter((task) => task.status === "pending")}
            onEditTask={openModal}
            onDeleteTask={deleteTask}
            onUpdateStatus={updateTask}
            columnColor="gray"
          />
        </div>

        <div className="flex-1 min-w-[300px] bg-yellow-100 rounded-lg p-4">
          <h2 className="font-semibold mb-4 text-yellow-700 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            En Progreso
          </h2>
          <TaskList
            tasks={tasks.filter((task) => task.status === "in-progress")}
            onEditTask={openModal}
            onDeleteTask={deleteTask}
            onUpdateStatus={updateTask}
            columnColor="yellow"
          />
        </div>

        <div className="flex-1 min-w-[300px] bg-green-100 rounded-lg p-4">
          <h2 className="font-semibold mb-4 text-green-700 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Completado
          </h2>
          <TaskList
            tasks={tasks.filter((task) => task.status === "completed")}
            onEditTask={openModal}
            onDeleteTask={deleteTask}
            onUpdateStatus={updateTask}
            columnColor="green"
          />
        </div>
      </div>

      {isModalOpen && <Modal task={editingTask} onClose={closeModal} onSave={editingTask ? updateTask : addTask} />}
    </div>
  )
}

