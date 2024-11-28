import { openDb } from "../../entities/infra/databases/sqlite";
import { Task } from "../../entities/Task";
import { TaskRepository } from "../contracts/TaskRepository";

export class SQLiteTaskRepository implements TaskRepository {
  public async findAll(): Promise<Task[]> {
    const db = await openDb();

   
    const query = "SELECT * FROM tasks";
    const rawData = await db.all(query);

    const tasks = rawData.map((row: any) => Task.build({
      id: row.id,
      summary: row.summary,
      description: row.description,
      type: row.type,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      assignee: row.assignee,
      reporter: row.reporter
    }))

    return tasks;
  }

  public async findById(id: string): Promise<Task | null> {
    const db = await openDb();

  
    const query = "SELECT * FROM tasks WHERE id = ?";
    const rawData = await db.all(query, [id]);

    if (rawData.length === 0) {
      return null;
    }

    const task = Task.build({
      id: rawData[0].id,
      summary: rawData[0].summary,
      description: rawData[0].description,
      type: rawData[0].type,
      status: rawData[0].status,
      createdAt: rawData[0].created_at,
      updatedAt: rawData[0].updated_at,
      assignee: rawData[0].assignee,
      reporter: rawData[0].reporter
    });

    return task;
  }

  public async findByType(type: string): Promise<Task[]> {
    const db = await openDb();

    const query = "SELECT * FROM tasks WHERE type = ?";
    const rawData = await db.all(query, [type]);

    const tasks = rawData.map((row: any) => Task.build({
      id: row.id,
      summary: row.summary,
      description: row.description,
      type: row.type,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      assignee: row.assignee,
      reporter: row.reporter
    }));

    return tasks;
  }

  public async create(task: Task): Promise<void> {
    const db = await openDb();

   
    const query = "INSERT INTO tasks (id, summary, description, type, status, created_at, updated_at, assignee, reporter)" +
      " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await db.run(
      query,
      [task.getId(),
      task.getSummary(),
      task.getDescription(),
      task.getType(),
      task.getStatus(),
      task.getCreatedAt(),
      task.getUpdatedAt(),
      task.getAssignee(),
      task.getReporter()],
    );
  }

  public async update(task: Task): Promise<Task> {
    const db = await openDb();

    const query = "UPDATE tasks SET summary = ?, description = ?, type = ?, status = ?, updated_at = ?, assignee = ?, reporter = ? WHERE id = ?";
    await db.run(query, [
      task.getSummary(),
      task.getDescription(),
      task.getType(),
      task.getStatus(),
      task.getUpdatedAt(),
      task.getAssignee(),
      task.getReporter(),
      task.getId()
    ]);

    return task;
  }

  public async delete(id: string): Promise<void> {
    const db = await openDb();

    const query = "DELETE FROM tasks WHERE id = ?";
    await db.run(query, [id]);
  }
}