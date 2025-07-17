import type { Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../App.css";
import { useState } from "react";

type Props = {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
  isDragging: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveTitle: (id: string, newTitle: string) => void;
};

export const TaskItem = ({
  task,
  isSelected,
  onSelect,
  onToggle,
  onDelete,
  onSaveTitle,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSelected ? 0.7 : 1,
    backgroundColor: isSelected ? "#f0f0f0" : "white",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onSaveTitle(task.id, editedTitle);
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="item" ref={setNodeRef} style={style} {...attributes}>
      <span {...listeners} className="grab">
        ☰
      </span>
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span>{task.title}</span>
      )}
      <div>
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
        Опции
      </div>
      <div className="">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        Завершен
      </div>
      <div className="buttons">
        {isEditing ? null : (
          <button className="btn-change" onClick={handleEditClick}>
            Изменить
          </button>
        )}
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
};
