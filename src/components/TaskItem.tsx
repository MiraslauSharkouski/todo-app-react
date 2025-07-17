import type { Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
  isDragging: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TaskItem = ({
  task,
  isSelected,
  onSelect,
  onToggle,
  onDelete,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSelected ? 0.7 : 1,
    backgroundColor: isSelected ? "#f0f0f0" : "white",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes}>
      <span {...listeners}>☰</span>{" "}
      <input type="checkbox" checked={isSelected} onChange={onSelect} />
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
