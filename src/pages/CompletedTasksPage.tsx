import { useEffect, useState } from "react";
import { TaskList } from "../components/TaskList";
import type { Task } from "../types";
import { taskService } from "../services/taskService";

export const CompletedTasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const completedTasks = taskService
      .getTasks()
      .filter((task) => task.completed);
    setTasks(completedTasks);
  }, []);

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

  return (
    <div>
      <h1>Завершённые задачи</h1>
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onReorder={function (_tasks: Task[]): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};
