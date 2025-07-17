import { useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
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

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    onTasksChange(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    onTasksChange(updatedTasks);
    setSelectedTaskIds(
      new Set([...selectedTaskIds].filter((taskId) => taskId !== id))
    );
  };

  const deleteSelectedTasks = () => {
    const updatedTasks = tasks.filter((task) => !selectedTaskIds.has(task.id));
    onTasksChange(updatedTasks);
    setSelectedTaskIds(new Set());
  };

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
              onToggle={toggleTaskCompletion}
              onDelete={deleteTask}
              isDragging={false}
            />
          ))}
        </ul>
      </SortableContext>

      {selectedTaskIds.size > 0 && (
        <button onClick={deleteSelectedTasks} style={{ color: "red" }}>
          Удалить выбранные ({selectedTaskIds.size})
        </button>
      )}
    </DndContext>
  );
};
