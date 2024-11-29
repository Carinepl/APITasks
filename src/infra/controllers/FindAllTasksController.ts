import { Request, Response } from "express";
import { MakeFindAllTasksUseCase } from "../../core/factories/MakeFindAllTasksUseCase";

class FindAllTasksController {
  public async handle(_: Request, res: Response) {
    try {
      const useCase = MakeFindAllTasksUseCase.make();
      const tasks = await useCase.execute();

      res.status(200).json(tasks);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  }
}

export default new FindAllTasksController();