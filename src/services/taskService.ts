import type { Task } from "../types";

const TASKS_KEY = "tasks";

export const taskService = {
  getTasks(): Task[] {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },
  saveTasks(tasks: Task[]) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },
};
