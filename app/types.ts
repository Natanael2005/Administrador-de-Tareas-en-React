export type TaskStatus = "pending" | "completed"

export interface Task {
  id: string
  name: string
  description: string
  status: TaskStatus
}

