import { TaskType } from "../entities/TaskType";
import { TaskRepository } from "../repositories/contracts/TaskRepository";

export class FindTaskByType {
  constructor(private readonly repository: TaskRepository) {}

  public async execute(type: TaskType) {
    const task = await this.repository.findByType(type);

    return task;
  }
}
