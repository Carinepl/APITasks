
import { TaskStatus } from "../entities/TaskStatus";
import { TaskType } from "../entities/TaskType";
import { InvalidOperationException } from "../exceptions/InvalidOperationException";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { TaskRepository } from "../repositories/contracts/TaskRepository";


export interface UpdateTaskPayload {
  summary: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  assignee: string;
  reporter: string;
}

export class UpdateTask {
  constructor(private readonly repository: TaskRepository) {}

  public async execute(id: string, payload: UpdateTaskPayload) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new ResourceNotFoundException();
    }

    if (task.getStatus() === TaskStatus.DONE) {
      throw new InvalidOperationException();
    }

    task
      .setSummary(payload.summary)
      .setDescription(payload.description)
      .setType(payload.type)
      .setStatus(payload.status)
      .setAssignee(payload.assignee)
      .setReporter(payload.reporter)
      .setUpdatedAt(new Date());

    const updatedTask = await this.repository.update(task);

    return updatedTask
  }
}