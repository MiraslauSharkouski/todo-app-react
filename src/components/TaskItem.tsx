import type { Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../App.css";
import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { EditTaskModal } from "./EditTaskModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveTitle = (newTitle: string) => {
    if (newTitle && newTitle !== task.title) {
      onSaveTitle(task.id, newTitle);
    }
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

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
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
        Options
      </div>
      <div className="">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        Completed
      </div>
      <div className="buttons">
        {isEditing ? null : (
          <button className="btn-change" onClick={handleEditClick}>
            Change
          </button>
        )}
        <button className="btn-delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this task?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <EditTaskModal
        isOpen={isEditModalOpen}
        taskTitle={task.title}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveTitle}
      />
    </div>
  );
};
