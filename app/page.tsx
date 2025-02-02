"use client"

import { useState, useCallback } from "react"
import { TaskList } from "./components/TaskList"
import { Modal } from "./components/Modal"
import { useLocalStorage } from "./hooks/useLocalStorage"
import type { Task, TaskStatus } from "./types"

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<TaskStatus | "all">("all")

  const filteredTasks = tasks.filter((task) => (filter === "all" ? true : task.status === filter))

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
    <div className="container mx-auto p-4 max-w-md min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Gestor de Tareas</h1>
      <div className="mb-4">
        <select
          className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value as TaskStatus | "all")}
        >
          <option value="all">Todas las tareas</option>
          <option value="pending">Tareas Pendientes</option>
          <option value="completed">Tareas Completadas</option>
        </select>
      </div>
      <TaskList tasks={filteredTasks} onEditTask={openModal} onDeleteTask={deleteTask} onUpdateStatus={updateTask} />
      <button
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        onClick={() => openModal()}
      >
        Agregar Tarea
      </button>
      {isModalOpen && <Modal task={editingTask} onClose={closeModal} onSave={editingTask ? updateTask : addTask} />}
    </div>
  )
}

