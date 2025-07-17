import { useEffect } from "react";

type Props = {
  message: string;
  onUndo: () => void;
  duration?: number;
  onClose: () => void;
};

export const UndoNotification = ({
  message,
  onUndo,
  duration = 5000,
  onClose,
}: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="undo-notification">
      <span>{message}</span>
      <button onClick={onUndo}>Cancel</button>
    </div>
  );
};
