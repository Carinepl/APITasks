import { Request, Response } from "express";
import { z } from "zod";
import { TaskStatus } from "../../core/entities/TaskStatus";
import { TaskType } from "../../core/entities/TaskType";
import { MakeCreateTaskUseCase } from "../../core/factories/MakeCreateTaskUseCase";



class CreateTaskController {
  public async handle(req: Request, res: Response) {
    try {
      const bodySchema = z.object({
        summary: z.string(),
        description: z.string(),
        type: z.nativeEnum(TaskType),
        status: z.nativeEnum(TaskStatus),
        createdAt: z.string(),
        updatedAt: z.string().optional(),
        assignee: z.string(),
        reporter: z.string(),
      });
      const body = bodySchema.parse(req.body);

      const useCase = MakeCreateTaskUseCase.make();
      await useCase.execute({
        summary: body.summary,
        description: body.description,
        type: body.type,
        status: body.status,
        createdAt: new Date(body.createdAt),
        updatedAt: body.updatedAt ? new Date(body.updatedAt) : new Date(),
        assignee: body.assignee || "defaultAssignee", 
        reporter: body.reporter,
      });

      res.status(201).json({ message: 'Task created successfully' });
      return;
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
        return;
      }

      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  }
}

export default new CreateTaskController();