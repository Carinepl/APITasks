import { randomUUID } from "node:crypto";
import { TaskData } from "./TaskData";
import { TaskStatus } from "./TaskStatus";
import { TaskType } from "./TaskType";



export class Task {
    private id: string;
    private summary: string;
    private description: string;
    private type: TaskType;
    private status: TaskStatus;
    private createdAt?: Date;
    private updatedAt?: Date;
    private assignee: string;
    private reporter: string



    private constructor(data: TaskData) {
        this.summary = data.summary;
        this.description = data.description;
        this.type = data.type;
        this.status = data.status;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt 
            this.assignee = data.assignee 
                this.reporter = data.reporter

    

        if (data.id) {
            this.id = data.id;
        } else {
            this.id = randomUUID();

        }

    }

    public static build(data: TaskData) {
        return new Task(data);
    }

    public getId(): string {
        return this.id;
    }

    public getSummary(): string {
        return this.summary;
    }
    public getDescription(): string {
        return this.description;
    }
    public getType(): TaskType {
        return this.type;
    }

    public getStatus(): string {
        return this.status;
    }

    public getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    public getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    public getAssignee(): string | undefined {
        return this.assignee;
    }

    public getReporter(): string | undefined {
        return this.reporter;
    }

    

    public setSummary(summary: string) {
        this.summary = summary;
        return this;
    }

    public setDescription(description: string) {
        this.description = description;
        return this;
    }

    public setType(type: TaskType) {
        this.type = type;
        return this;
    }

    public setStatus(status: TaskStatus) {
        this.status = status;
        return this;
    }

    public setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
        return this;
    }

    public setAssignee(assignee: string) {
        this.assignee = assignee;
        return this;
    }

    public setReporter(reporter: string) {
        this.reporter = reporter;
        return this;
    }
}


