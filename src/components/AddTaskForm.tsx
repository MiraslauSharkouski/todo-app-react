import { useState, useCallback } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export const AddTaskForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedTitle = title.trim();
      if (!trimmedTitle) return;
      onAdd(trimmedTitle);
      setTitle("");
    },
    [title, onAdd]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 100) return;
    setTitle(value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="New task"
        aria-label="New task"
        maxLength={100}
      />
      <button type="submit" disabled={!title.trim()}>
        Add
      </button>
    </form>
  );
};
