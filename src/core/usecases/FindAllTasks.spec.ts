import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/InMemoryTaskRepository";
import { FindAllTasks } from "./FindAllTasks";
import { Task } from "../entities/Task";
import { TaskType } from "../entities/TaskType";
import { TaskStatus } from "../entities/TaskStatus";



let repository: InMemoryTaskRepository;
let sut: FindAllTasks;



describe("FindAllTasks", () => {
  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    sut = new FindAllTasks(repository);



    const mockedTask = Task.build({
      summary: "Test task",
      description: "Test description",
      status: TaskStatus.OPEN,
      type: TaskType.BUG,
      assignee: "",
      reporter: "Test reporter",
      createdAt: new Date(),
    })
    repository.tasks.push(mockedTask);
  });


  it("should return all tasks", async () => {
    const tasks = await sut.execute();

    expect(tasks.length).toBe(1);
  })
});