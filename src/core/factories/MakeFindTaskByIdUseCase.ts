import { SQLiteTaskRepository } from "../repositories/databases/SQLiteTaskrepository";
import { FindTaskById } from "../usecases/FindTasksById";

export abstract class MakeFindTaskByIdUseCase {
  public static make() {
    const repository = new SQLiteTaskRepository();
    const useCase = new FindTaskById(repository);

    return useCase;
  }
}