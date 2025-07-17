import type { Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
  isDragging: boolean;
};

export const TaskItem = ({ task, isSelected, onSelect, isDragging }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isSelected ? "#e0e0e0" : "white",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes}>
      <span {...listeners}>☰</span>{" "}
      <input type="checkbox" checked={isSelected} onChange={onSelect} />{" "}
      {task.title}
    </li>
  );
};
