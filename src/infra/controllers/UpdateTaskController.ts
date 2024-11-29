import { Request, Response } from "express";
import { z } from "zod";
import { TaskStatus } from "../../core/entities/TaskStatus";
import { TaskType } from "../../core/entities/TaskType";
import { MakeUpdateTaskUseCase } from "../../core/factories/MakeUpdateTaskUseCase";
import { ResourceNotFoundException } from "../../core/exceptions/ResourceNotFoundException";
import { InvalidOperationException } from "../../core/exceptions/InvalidOperationException";

class UpdateTaskController {
  public async handle(req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string(),
      });
      const bodySchema = z.object({
        summary: z.string(),
        description: z.string(),
        type: z.nativeEnum(TaskType),
        status: z.nativeEnum(TaskStatus),
        assignee: z.string(),
        reporter: z.string(),
      });
      const { id } = paramsSchema.parse(req.params);
      const body = bodySchema.parse(req.body);

      const useCase = MakeUpdateTaskUseCase.make();
      const updatedTask = await useCase.execute(
        id,
        {
          summary: body.summary,
          description: body.description,
          type: body.type,
          status: body.status,
          assignee: body.assignee,
          reporter: body.reporter,
        },
      );

      res.status(200).json(updatedTask);
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

export default new UpdateTaskController();