import { SQLiteTaskRepository } from "../repositories/databases/SQLiteTaskrepository";
import { UpdateTask } from "../usecases/UpdateTasks";

export abstract class MakeUpdateTaskUseCase {
  public static make() {
    const repository = new SQLiteTaskRepository();
    const useCase = new UpdateTask(repository);

    return useCase;
  }
}