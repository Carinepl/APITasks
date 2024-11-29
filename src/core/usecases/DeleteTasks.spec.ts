import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/InMemoryTaskRepository";
import { FindAllTasks } from "./FindAllTasks";
import { Task } from "../entities/Task";
import { FindTaskById } from "./FindTasksById";
import { randomUUID } from "node:crypto";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { TaskType } from "../entities/TaskType";
import { DeleteTask } from "./DeleteTasks";
import { TaskStatus } from "../entities/TaskStatus";
import { InvalidOperationException } from "../exceptions/InvalidOperationException";



let repository: InMemoryTaskRepository;
let sut: DeleteTask;


const deletableMockedId = randomUUID();
const notDeletableMockedId = randomUUID();



describe("FindTaskById", () => {
  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    sut = new DeleteTask(repository);

    repository.tasks.push(
      Task.build({
        id: deletableMockedId,
        summary: "Test task",
        description: "Test description",
        status: TaskStatus.OPEN,
        type: TaskType.BUG, 
        assignee: "",
        reporter: "Test reporter",
        createdAt: new Date(),
      }),
      Task.build({
        id: notDeletableMockedId,
        summary: "Test task",
        description: "Test description",
        status: TaskStatus.DONE,
        type: TaskType.BUG,
        assignee: "",
        reporter: "Test reporter",
        createdAt: new Date(),
      }),
    );
  });
  

 
  it("should delete a task with a specific id", async () => {
    await sut.execute(deletableMockedId);

    expect(repository.tasks.length).toBe(1);
  })

  it("should throw an error if the task does not exist", async () => {
    const id = 'non-existent-id';

    await expect(sut.execute(id)).rejects.toBeInstanceOf(ResourceNotFoundException);
  });

  it("should throw an error if the task is already done", async () => {
    await expect(sut.execute(notDeletableMockedId)).rejects.toBeInstanceOf(InvalidOperationException);
  });
});
  