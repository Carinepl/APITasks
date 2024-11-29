
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/in-memory/InMemoryTaskRepository";
import { Task } from "../entities/Task";
import { FindTaskById } from "./FindTasksById";
import { randomUUID } from "node:crypto";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { TaskType } from "../entities/TaskType";
import { TaskStatus } from "../entities/TaskStatus";


let repository: InMemoryTaskRepository;
let sut: FindTaskById;

const mockedId = randomUUID();

describe("FindTaskById", () => {
  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    sut = new FindTaskById(repository);

    const mockedTask = Task.build({
      id: mockedId,
      summary: "Test task",
      description: "Test description",
      status:TaskStatus.TODO,
      type: TaskType.BUG, 
      assignee: "",
      reporter: "Test reporter",
      createdAt: new Date(),
    })
    repository.tasks.push(mockedTask);
  });

  it("should return a task with a specific id", async () => {
    const task = await sut.execute(mockedId);

    expect(task).not.toBeUndefined();
    expect(task.getId()).toBe(mockedId);
  })

  it("should throw an error if the task does not exist", async () => {
    const id = 'non-existent-id';

    await expect(sut.execute(id)).rejects.toBeInstanceOf(ResourceNotFoundException);
  });
});