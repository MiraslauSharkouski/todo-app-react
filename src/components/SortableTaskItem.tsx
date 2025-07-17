import type { Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const SortableTaskItem = ({ task, onToggle, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes}>
      <span {...listeners}>☰</span> {/* Кнопка перетаскивания */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {task.title}
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: "10px" }}>
        Удалить
      </button>
    </li>
  );
};
