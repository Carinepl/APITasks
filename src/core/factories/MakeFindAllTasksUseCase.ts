import { SQLiteTaskRepository } from "../repositories/databases/SQLiteTaskrepository";
import { FindAllTasks } from "../usecases/FindAllTasks";

export abstract class MakeFindAllTasksUseCase {
  public static make() {
    const repository = new SQLiteTaskRepository();
    const useCase = new FindAllTasks(repository);

    return useCase;
  }
}