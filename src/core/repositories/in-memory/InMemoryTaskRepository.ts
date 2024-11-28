import { Task } from "../../entities/Task";
import { UpdateTaskPayload } from "../../usecases/UpdateTasks";
import { TaskRepository } from "../contracts/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = [];

  public async findAll(): Promise<Task[]> {
   return await this.tasks;
  }


  public async findById(id: string): Promise<Task | null> {
    const task = await this.tasks.find((task: Task) => {
      return task.getId() === id;
    });

    if (!task) {
      return null;
    }

    return task;
  }


  public async findByType(type: string): Promise<Task[]> {
    const tasks = await this.tasks.filter((task: Task) => {
      return task.getType() === type;
    });

    return tasks;
  }


  public async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  public async update(task: Task) {
    const taskIndex = await this.tasks.findIndex((_task: Task) => {
      return _task.getId() === task.getId();
    });

    this.tasks[taskIndex] = task;

    return this.tasks[taskIndex];
  }

  public async delete(id: string): Promise<void> {
    const taskIndex = await this.tasks.findIndex((task: Task) => {
      return task.getId() === id;
    });

    this.tasks.splice(taskIndex, 1); 
  }
}