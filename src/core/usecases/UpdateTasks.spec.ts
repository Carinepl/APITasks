import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryTaskRepository } from '../repositories/in-memory/InMemoryTaskRepository';
import { UpdateTask, UpdateTaskPayload } from './UpdateTasks';
import { randomUUID } from 'node:crypto';
import { Task } from '../entities/Task';
import { TaskType } from '../entities/TaskType';
import { TaskStatus } from '../entities/TaskStatus';
import { ResourceNotFoundException } from '../exceptions/ResourceNotFoundException';
import { InvalidOperationException } from '../exceptions/InvalidOperationException';

let repository: InMemoryTaskRepository;
let sut: UpdateTask;

const enabledUpdateId = randomUUID();
const notEnabledUpdateId = randomUUID();

describe("UpdateTask", () => {
  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    sut = new UpdateTask(repository);

    repository.tasks.push(
      Task.build({
        id: enabledUpdateId,
        summary: "Test task",
        description: "Test description",
        status: TaskStatus.OPEN,
        type: TaskType.BUG, 
        assignee: "",
        reporter: "Test reporter",
        createdAt: new Date(),
      }),
      Task.build({
        id: notEnabledUpdateId,
        summary: "Test task",
        description: "Test description",
        status: TaskStatus.DONE,
        type: TaskType.BUG, 
        assignee: "",
        reporter: "Test reporter",
        createdAt: new Date(),
      }),
    );
  })


  it("should update a task with a specific id", async () => {
    const payload: UpdateTaskPayload = {
      summary: "Updated task",
      description: "Updated description",
      type: TaskType.BUG,
      status: TaskStatus.IN_PROGRESS,
      assignee: "Updated assignee",
      reporter: "Updated reporter",
    }

    const updateTask = await sut.execute(enabledUpdateId, payload)

    expect(updateTask.getSummary()).toBe(payload.summary);
    expect(updateTask.getDescription()).toBe(payload.description);
    expect(updateTask.getType()).toBe(payload.type);
    expect(updateTask.getStatus()).toBe(payload.status);
    expect(updateTask.getAssignee()).toBe(payload.assignee);
    expect(updateTask.getReporter()).toBe(payload.reporter);
  });


  it("should not update a task with a specific id if it is already done", async () => {
    const invalidId = 'invalid-id';
    const payload: UpdateTaskPayload = {
      summary: "Updated task",
      description: "Updated description",
      type: TaskType.BUG,
      status: TaskStatus.IN_PROGRESS,
      assignee: "Updated assignee",
      reporter: "Updated reporter",
    }

    await expect(sut.execute(invalidId, payload)).rejects.toBeInstanceOf(ResourceNotFoundException);
  });

  it("should not update a task with a specific id if it is already done", async () => {
    const payload: UpdateTaskPayload = {
      summary: "Updated task",
      description: "Updated description",
      type: TaskType.BUG,
      status: TaskStatus.IN_PROGRESS,
      assignee: "Updated assignee",
      reporter: "Updated reporter",
    }

    await expect(sut.execute(notEnabledUpdateId, payload)).rejects.toBeInstanceOf(InvalidOperationException);
  });
})