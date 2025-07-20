import React from "react";

type Props = {
  isOpen: boolean;
  taskTitle: string;
  onClose: () => void;
  onSave: (newTitle: string) => void;
};

export const EditTaskModal = ({
  isOpen,
  taskTitle,
  onClose,
  onSave,
}: Props) => {
  const [editedTitle, setEditedTitle] = React.useState(taskTitle);

  const handleSave = () => {
    onSave(editedTitle.trim() || editedTitle);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit task</h2>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="edit-task-input"
        />
        <div className="modal-buttons">
          <button className="btn-change" onClick={handleSave}>
            Save
          </button>
          <button onClick={onClose} className="btn-delete">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
