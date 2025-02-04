export type TaskStatus = "pending" | "in-progress" | "completed"

export interface Task {
  id: string
  name: string
  description: string
  status: TaskStatus
}

