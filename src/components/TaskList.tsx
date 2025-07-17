import type { Task } from "../types";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TaskList = ({ tasks, onToggle, onDelete }: Props) => {
  if (tasks.length === 0) {
    return <p>Нет задач</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          {task.title}
          <button
            onClick={() => onDelete(task.id)}
            style={{ marginLeft: "10px" }}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
};
