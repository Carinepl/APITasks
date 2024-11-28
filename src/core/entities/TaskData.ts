import { TaskStatus } from "./TaskStatus";
import { TaskType } from "./TaskType";

export interface TaskData {
  id?: string;
  summary: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  createdAt: Date;
  updatedAt?: Date;
  assignee?: string;
  reporter: string;
}