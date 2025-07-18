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
          <button onClick={onConfirm} className="btn-confirm">
            Удалить
          </button>
          <button onClick={onCancel} className="btn-cancel">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
