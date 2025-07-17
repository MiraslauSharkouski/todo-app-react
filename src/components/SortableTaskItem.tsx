import type { Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../App";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const SortableTaskItem = ({ task, onToggle, onDelete }: Props) => {
  const { attributes, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="item" ref={setNodeRef} style={style} {...attributes}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {task.title}
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </div>
  );
};
