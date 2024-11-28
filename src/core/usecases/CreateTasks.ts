import { TaskType } from "../entities/TaskType";
import { Task } from "../entities/Task";
import { InvalidPropertiesException } from "../exceptions/InvalidPropertiesException";
import { TaskRepository } from "../repositories/contracts/TaskRepository";
import { TaskStatus } from "../entities/TaskStatus";



export interface CreateTasksPayload {
    id?: string;
    summary: string;
    description: string;
    type: TaskType;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    assignee: string;
    reporter: string;
}

export class CreateTask {
    
    constructor(private readonly repository: TaskRepository) {}
  
    public async execute(payload: CreateTasksPayload) {

      
      if (!payload.summary || !payload.description || !payload.reporter) {
        throw new InvalidPropertiesException();
      }
  
      const newTask = Task.build({
        id: payload.id,
        summary: payload.summary,
        description: payload.description,
        type: payload.type,
        status: payload.status,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        assignee: payload.assignee,
        reporter: payload.reporter,
      });
  
      this.repository.create(newTask);
    }
  }