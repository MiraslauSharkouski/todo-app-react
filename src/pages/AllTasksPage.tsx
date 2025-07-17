import { useEffect, useState } from "react";
import { MultiDragTaskList } from "../components/MultipleDragTaskList";
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

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    taskService.saveTasks(updatedTasks);
  };

  return (
    <div>
      <h1>All tasks</h1>
      <AddTaskForm onAdd={addTask} />
      <MultiDragTaskList tasks={tasks} onTasksChange={updateTasks} />
    </div>
  );
};
