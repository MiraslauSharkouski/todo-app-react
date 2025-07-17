import type { Task } from "../types";

const TASKS_KEY = "tasks";
const DELETED_TASKS_KEY = "deletedTasks";

export const taskService = {
  getTasks(): Task[] {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  saveTasks(tasks: Task[]) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  getDeletedTasks(): Task[] {
    const deletedTasks = localStorage.getItem(DELETED_TASKS_KEY);
    return deletedTasks ? JSON.parse(deletedTasks) : [];
  },

  saveDeletedTasks(deletedTasks: Task[]) {
    localStorage.setItem(DELETED_TASKS_KEY, JSON.stringify(deletedTasks));
  },
};
