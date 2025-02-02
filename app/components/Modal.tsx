"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import type { Task } from "../types"

interface ModalProps {
  task: Task | null
  onClose: () => void
  onSave: (task: Task) => void
}

export const Modal: React.FC<ModalProps> = ({ task, onClose, onSave }) => {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState(task?.name || "")
  const [description, setDescription] = useState(task?.description || "")
  const [error, setError] = useState("")

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    setName(task?.name || "")
    setDescription(task?.description || "")
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("El nombre de la tarea no puede estar vacío")
      return
    }
    onSave({
      id: task?.id || Date.now().toString(),
      name,
      description,
      status: task?.status || "pending",
    })
    onClose()
  }

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{task ? "Editar Tarea" : "Nueva Tarea"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre de la tarea
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition duration-300 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return mounted ? createPortal(modalContent, document.body) : null
}

