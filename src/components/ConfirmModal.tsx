import "../App.css";

type Props = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="btn-delete" onClick={onConfirm}>
            Delete
          </button>
          <button onClick={onCancel} className="btn-change">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
