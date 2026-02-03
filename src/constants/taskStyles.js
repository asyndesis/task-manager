import { PRIORITY } from "@/hooks/useTasks";

export const TASK_PRIORITY_CLASSES = {
  [PRIORITY.HIGH]: "text-task-high border-task-high",
  [PRIORITY.MEDIUM]: "text-task-medium border-task-medium",
  [PRIORITY.LOW]: "text-task-low border-task-low",
};

export const TASK_TEXT_COMPLETED = "line-through text-task-completed";
export const TASK_TEXT_ACTIVE = "text-gray-900";
