import { SQLiteTaskRepository } from "../repositories/databases/SQLiteTaskrepository";
import { DeleteTask } from "../usecases/DeleteTasks";

export abstract class MakeDeleteTaskUseCase {
  public static make() {
    const repository = new SQLiteTaskRepository();
    const useCase = new DeleteTask(repository);

    return useCase;
  }
}