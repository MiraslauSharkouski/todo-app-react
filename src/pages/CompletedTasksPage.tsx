import { useEffect, useState } from "react";
import { SortableTaskItem } from "../components/SortableTaskItem";
import { taskService } from "../services/taskService";
import type { Task } from "../types";

export const CompletedTasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const completed = taskService.getTasks().filter((task) => task.completed);
    setTasks(completed);
  }, []);

  const toggleTask = (id: string) => {
    const updatedTasks = taskService
      .getTasks()
      .map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
    taskService.saveTasks(updatedTasks);
    setTasks(updatedTasks.filter((task) => task.completed));
  };

  const deleteTask = (id: string) => {
    const updatedTasks = taskService
      .getTasks()
      .filter((task) => task.id !== id);
    taskService.saveTasks(updatedTasks);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Завершённые задачи</h1>
      <div className="items">
        {tasks.map((task) => (
          <SortableTaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};
