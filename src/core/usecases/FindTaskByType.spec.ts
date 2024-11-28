import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/InMemoryTaskRepository";
import { Task } from "../entities/Task";
import { TaskType } from "../entities/TaskType";
import { FindTaskByType } from "./FindTaskByType";
import { TaskStatus } from "../entities/TaskStatus";


let repository: InMemoryTaskRepository;
let sut: FindTaskByType;


describe("FindAllTasks", () => {
  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    sut = new FindTaskByType(repository);

    const mockedTask = Task.build({
      summary: "Test task",
      description: "Test description",
      status: TaskStatus.OPEN,
      type: TaskType.BUG,
      reporter: "Test reporter",
      createdAt: new Date(),
    })
    repository.tasks.push(mockedTask);
  });

  

  it("should return a list of tasks filtered by type", async () => {
    const type = TaskType.BUG;
    const tasks = await sut.execute(type);

    expect(tasks.length).toBe(1);
  })

  it("should return an empty list if no tasks are found", async () => {
    const type = TaskType.TASK;
    const tasks = await sut.execute(type);

    expect(tasks.length).toBe(0);
  });
});