import { Request, Response } from "express";
import { z } from "zod";
import { ResourceNotFoundException } from "../../core/exceptions/ResourceNotFound";
import { MakeDeleteTaskUseCase } from "../../core/factories/MakeDeleteTaskUseCase";
import { InvalidOperationException } from "../../core/exceptions/InvalidOperationException";

class DeleteTaskController {
  public async handle(req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string(),
      });
      const { id } = paramsSchema.parse(req.params);

      const useCase = MakeDeleteTaskUseCase.make();
      await useCase.execute(id);

      res.sendStatus(204);
      return;
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
        return;
      }

      if (error instanceof InvalidOperationException) {
        res.status(400).json({ message: error.message });
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

export default new DeleteTaskController();