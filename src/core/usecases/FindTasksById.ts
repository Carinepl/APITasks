import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { TaskRepository } from "../repositories/contracts/TaskRepository";

export class FindTaskById {
  constructor(private readonly repository: TaskRepository) {}

  public async execute(id: string) {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new ResourceNotFoundException();
    }

    return task;
  }
}