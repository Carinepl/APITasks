import { Task } from './../entities/Task';
import { TaskStatus } from "../entities/TaskStatus";
import { InvalidOperationException } from "../exceptions/InvalidOperationException";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { TaskRepository } from "../repositories/contracts/TaskRepository";

export class DeleteTask {
  constructor(private readonly repository: TaskRepository) { }

  public async execute(id: string) {
    const task = await this.repository.findById(id);

  
    if (!task) {
      throw new ResourceNotFoundException();
    }

    if (task.getStatus() === TaskStatus.DONE) {
      throw new InvalidOperationException();
    }

    await this.repository.delete(id);
  }
}