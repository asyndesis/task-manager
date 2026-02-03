import { useState } from "react";
import { useTaskState } from "@/contexts/TaskStateContext";
import { useTaskDispatch } from "@/contexts/TaskDispatchContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TASK_PRIORITY_CLASSES,
  TASK_TEXT_COMPLETED,
  TASK_TEXT_ACTIVE,
} from "@/constants/taskConstants";
import { Pencil, Check, X, Trash2 } from "lucide-react";

const TaskItemActions = ({ isEditing, onEdit, onSave, onCancel, onDelete }) => {
  if (isEditing) {
    return (
      <>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={onSave}
              className="text-green-600 hover:bg-green-50"
            >
              <Check className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={onCancel}
              className="text-gray-600 hover:bg-gray-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Cancel</TooltipContent>
        </Tooltip>
      </>
    );
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={onEdit}
            className="text-gray-600 hover:bg-gray-50"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={onDelete}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </>
  );
};

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== task.title) {
      onUpdate(task.id, { title: trimmed });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  const textClasses = task.completed ? TASK_TEXT_COMPLETED : TASK_TEXT_ACTIVE;

  return (
    <Card className="p-3">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
        />

        <div className="flex-1 min-h-[36px] flex items-center">
          {isEditing ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-9"
              autoFocus
            />
          ) : (
            <div className={textClasses}>{task.title}</div>
          )}
        </div>

        <Badge
          variant="outline"
          className={TASK_PRIORITY_CLASSES[task.priority]}
        >
          {task.priority.toUpperCase()}
        </Badge>

        <div className="flex gap-1">
          <TaskItemActions
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={() => onDelete(task.id)}
          />
        </div>
      </div>
    </Card>
  );
};

import { Skeleton } from "@/components/ui/skeleton";

const TaskListSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="p-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 flex-1" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </Card>
    ))}
  </div>
);

export const TaskList = () => {
  const { tasks, isLoading } = useTaskState();
  const { toggleTask, deleteTask, updateTask } = useTaskDispatch();

  if (isLoading) {
    return <TaskListSkeleton />;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No tasks yet. Add one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      ))}
    </div>
  );
};
