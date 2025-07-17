import { useState, useEffect } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskItem } from "./TaskItem";
import type { Task } from "../types";

type Props = {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
};

export const MultiDragTaskList = ({ tasks, onTasksChange }: Props) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(
    new Set()
  );
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]); // Хранилище удалённых задач
  const [showUndo, setShowUndo] = useState(false); // Показывать ли кнопку "Отменить"

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    const movedTasks = arrayMove(tasks, oldIndex, newIndex);
    onTasksChange(movedTasks);
    setSelectedTaskIds(new Set([active.id as string]));
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedTaskIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedTaskIds(newSet);
  };

  const isDragging = (id: string) => selectedTaskIds.has(id);

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    onTasksChange(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    const updatedTasks = tasks.filter((task) => task.id !== id);
    onTasksChange(updatedTasks);
    setDeletedTasks([taskToDelete]);
    setShowUndo(true);

    // Снимаем выделение
    if (selectedTaskIds.has(id)) {
      const newSet = new Set(selectedTaskIds);
      newSet.delete(id);
      setSelectedTaskIds(newSet);
    }
  };

  const deleteSelectedTasks = () => {
    const tasksToDelete = tasks.filter((task) => selectedTaskIds.has(task.id));
    const updatedTasks = tasks.filter((task) => !selectedTaskIds.has(task.id));

    onTasksChange(updatedTasks);
    setDeletedTasks([...tasksToDelete]);
    setShowUndo(true);
    setSelectedTaskIds(new Set());
  };

  const markSelectedAsCompleted = () => {
    const updatedTasks = tasks.map((task) =>
      selectedTaskIds.has(task.id) ? { ...task, completed: true } : task
    );
    onTasksChange(updatedTasks);
    setSelectedTaskIds(new Set());
  };

  const toggleSelectedTasksStatus = () => {
    const updatedTasks = tasks.map((task) =>
      selectedTaskIds.has(task.id)
        ? { ...task, completed: !task.completed }
        : task
    );
    onTasksChange(updatedTasks);
    setSelectedTaskIds(new Set());
  };

  const undoDelete = () => {
    if (deletedTasks.length === 0) return;

    const restoredTasks = [...deletedTasks];
    const updatedTasks = [...tasks, ...restoredTasks];
    onTasksChange(updatedTasks);
    setDeletedTasks([]);
    setShowUndo(false);
  };

  // Скрыть кнопку через 5 секунд
  useEffect(() => {
    if (showUndo) {
      const timer = setTimeout(() => {
        setShowUndo(false);
        setDeletedTasks([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showUndo]);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedTaskIds.has(task.id)}
              onSelect={() => toggleSelection(task.id)}
              isDragging={isDragging(task.id)}
              onToggle={toggleTaskCompletion}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      </SortableContext>

      {selectedTaskIds.size > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={markSelectedAsCompleted}
            style={{ marginRight: "10px" }}
          >
            Отметить как выполненные ({selectedTaskIds.size})
          </button>
          <button
            onClick={toggleSelectedTasksStatus}
            style={{ marginRight: "10px" }}
          >
            Инвертировать статус ({selectedTaskIds.size})
          </button>
          <button onClick={deleteSelectedTasks} style={{ color: "red" }}>
            Удалить выбранные
          </button>
        </div>
      )}

      {showUndo && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={undoDelete} style={{ color: "green" }}>
            ⏪ Отменить удаление
          </button>
        </div>
      )}
    </DndContext>
  );
};
