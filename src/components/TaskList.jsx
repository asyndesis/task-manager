import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  TASK_PRIORITY_CLASSES,
  TASK_TEXT_COMPLETED,
  TASK_TEXT_ACTIVE,
} from "@/constants/taskStyles";

export const TaskList = ({ tasks, onToggle, onDelete }) => {
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
        <Card key={task.id} className="p-3">
          <div className="flex items-center gap-3">
            {/* Checkbox */}
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggle(task.id)}
            />

            {/* Task Title */}
            <div
              className={`flex-1 ${
                task.completed ? TASK_TEXT_COMPLETED : TASK_TEXT_ACTIVE
              }`}
            >
              {task.title}
            </div>

            {/* Priority Badge */}
            <Badge
              variant="outline"
              className={TASK_PRIORITY_CLASSES[task.priority]}
            >
              {task.priority.toUpperCase()}
            </Badge>

            {/* Delete Button */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
