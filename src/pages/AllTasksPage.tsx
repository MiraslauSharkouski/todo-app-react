import { useEffect, useState } from "react";
import { TaskList } from "../components/TaskList";
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

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    taskService.saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
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
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onReorder={reorderTasks}
      />
    </div>
  );
};
