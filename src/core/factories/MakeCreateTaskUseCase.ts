import { SQLiteTaskRepository } from "../repositories/databases/SQLiteTaskrepository";
import { CreateTask } from "../usecases/CreateTasks";

export abstract class MakeCreateTaskUseCase {
  public static make() {
    const repository = new SQLiteTaskRepository();
    const useCase = new CreateTask(repository);

    return useCase;
  }
}