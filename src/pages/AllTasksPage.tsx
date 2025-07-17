import { useEffect, useState } from "react";
import { MultiDragTaskList as TaskList } from "../components/MultiDragTaskList";
import { AddTaskForm } from "../components/AddTaskForm";
import type { Task } from "../types";
import { taskService } from "../services/taskService";

export const AllTasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(taskService.getTasks());
  }, []);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    taskService.saveTasks(updatedTasks);
  };

  const reorderTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    taskService.saveTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Все задачи</h1>
      <AddTaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onTasksChange={reorderTasks} />
    </div>
  );
};
