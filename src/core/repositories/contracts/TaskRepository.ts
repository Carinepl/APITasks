import { Task } from "../../entities/Task";

export interface TaskRepository {
  findAll(): Promise<Task[]>
  findById(id: string): Promise<Task | null>
  findByType(type: string): Promise<Task[]>
  create(task: Task): Promise<void>
  update(id: Task): Promise<Task>
  delete(id: string): Promise<void>
}