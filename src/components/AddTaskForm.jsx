import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { PRIORITY } from "@/hooks/useTasks";

export const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(PRIORITY.MEDIUM);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, priority);
      setTitle("");
      setPriority(PRIORITY.MEDIUM);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="title">Task Title</FieldLabel>
        <FieldContent>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="priority">Priority</FieldLabel>
        <FieldContent>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger id="priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PRIORITY.HIGH}>High</SelectItem>
              <SelectItem value={PRIORITY.MEDIUM}>Medium</SelectItem>
              <SelectItem value={PRIORITY.LOW}>Low</SelectItem>
            </SelectContent>
          </Select>
        </FieldContent>
      </Field>

      <Button type="submit" className="w-full">
        Add Task
      </Button>
    </form>
  );
};
