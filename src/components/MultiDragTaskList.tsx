import { useState } from "react";
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
import type { Task } from "../types";
import { TaskItem } from "./TaskItem";

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
    setSelectedTaskIds(new Set([active.id as string])); // reset selection
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedTaskIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedTaskIds(newSet);
  };

  const isDragging = (id: string) => selectedTaskIds.has(id);

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
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
