import { Request, Response } from "express";
import { z } from "zod";
import { MakeFindTaskByTypeUseCase } from "../../core/factories/MakeFindTaskByTypeUseCase";
import { ResourceNotFoundException } from "../../core/exceptions/ResourceNotFound";
import { TaskType } from "../../core/entities/TaskType";

class FindByTypeController {
  public async handle(req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        type: z.nativeEnum(TaskType)
      })
      const { type } = paramsSchema.parse(req.params);

      const useCase = MakeFindTaskByTypeUseCase.make();
      const task = await useCase.execute(type);

      res.status(200).json(task);
      return;
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
        return;
      }

      if (error instanceof ResourceNotFoundException) {
        res.status(404).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  }
}

export default new FindByTypeController();