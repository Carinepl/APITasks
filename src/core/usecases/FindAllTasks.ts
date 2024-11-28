import { TaskRepository } from "../repositories/contracts/TaskRepository";

export class FindAllTasks {
  constructor(private readonly repository: TaskRepository) {}

  public async execute() {
    const tasks = await this.repository.findAll();

    return tasks;
  }
}
