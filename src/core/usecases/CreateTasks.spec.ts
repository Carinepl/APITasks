import { beforeEach, describe, expect , it } from "vitest";
import { InMemoryTaskRepository} from "../repositories/in-memory/InMemoryTaskRepository";
import { CreateTask, CreateTasksPayload } from "./CreateTasks";
import { InvalidPropertiesException } from "../exceptions/InvalidPropertiesException";
import { TaskType } from "../entities/TaskType";
import { TaskStatus } from "../entities/TaskStatus";

let sut: CreateTask;
let repository: InMemoryTaskRepository;

describe("CreateTask", () => {
    beforeEach(() => {
        repository = new InMemoryTaskRepository();
        sut = new CreateTask(repository);
    });

     it("should create a task", async () => {
    const payload: CreateTasksPayload = {
      summary: "Summary",
      description: "Description",
      type: TaskType.TASK,
      status: TaskStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
      reporter: "Reporter",
      assignee: "assignee",
    }

    await sut.execute(payload);



    expect(repository.tasks.length).toBe(1);
  })


  it("should throw an exception if summary is missing", async () => {
    const invalidPayload: CreateTasksPayload = {
      summary: "",
      description: "Description",
      type: TaskType.TASK,
      status: TaskStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
      reporter: "Reporter",
      assignee: "assignee",
    }

    await expect(sut.execute(invalidPayload)).rejects.toBeInstanceOf(InvalidPropertiesException);
  });

  
  it("should throw an exception if description is missing", async () => {
    const invalidPayload: CreateTasksPayload = {
      summary: "Summary",
      description: "",
      type: TaskType.TASK,
      status: TaskStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
      reporter: "Reporter",
      assignee: "assignee",
    }

    await expect(sut.execute(invalidPayload)).rejects.toBeInstanceOf(InvalidPropertiesException);
  });

  
  it("should throw an exception if reporter is missing", async () => {
    const invalidPayload: CreateTasksPayload = {
      summary: "Summary",
      description: "Description",
      type: TaskType.TASK,
      status: TaskStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
      reporter: "",
      assignee: "assignee",
    }

    await expect(sut.execute(invalidPayload)).rejects.toBeInstanceOf(InvalidPropertiesException);
  });
});
