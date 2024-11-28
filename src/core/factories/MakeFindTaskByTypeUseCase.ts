import { SQLiteTaskRepository } from "../repositories/databases/SQLiteTaskrepository";
import { FindTaskByType } from "../usecases/FindTaskByType";

export abstract class MakeFindTaskByTypeUseCase {
  public static make() {
    const repository = new SQLiteTaskRepository();
    const useCase = new FindTaskByType(repository);

    return useCase;
  }
}