import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useTaskStore, selectIsLoading } from "@/stores/taskStore";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";
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

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleSave = async () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== task.title) {
      const result = await updateTask(task.id, { title: trimmed });
      if (result?.success) {
        toast.success("Task updated");
      } else if (result?.success === false) {
        toast.error("Failed to update task");
      }
    }
    setIsEditing(false);
  };

  const handleToggle = async () => {
    const result = await toggleTask(task.id);
    if (result?.success) {
      toast.success(
        result.wasCompleted ? "Task completed" : "Task marked incomplete"
      );
    } else if (result?.success === false) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    const result = await deleteTask(task.id);
    if (result?.success) {
      toast.success("Task deleted");
    } else if (result?.success === false) {
      toast.error("Failed to delete task");
    }
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
        <Checkbox checked={task.completed} onCheckedChange={handleToggle} />

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
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Card>
  );
};

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
  const isLoading = useTaskStore(selectIsLoading);
  const tasks = useFilteredTasks();

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
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
