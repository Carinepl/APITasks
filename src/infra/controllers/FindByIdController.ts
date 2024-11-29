import { Request, Response } from "express";
import { z } from "zod";
import { MakeFindTaskByIdUseCase } from "../../core/factories/MakeFindTaskByIdUseCase";
import { ResourceNotFoundException } from "../../core/exceptions/ResourceNotFoundException";

class FindByIdController {
  public async handle(req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string()
      })
      const { id } = paramsSchema.parse(req.params);

      const useCase = MakeFindTaskByIdUseCase.make();
      const task = await useCase.execute(id);

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

export default new FindByIdController();