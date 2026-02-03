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
  // TODO: If we want validation, here:
  // - Should be using ZOD
  // - Should be using React Hook Form or similar for better feedback on errors
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const priority = formData.get("priority");

    if (title?.trim()) {
      onAdd({ title, priority });
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="title">Task Title</FieldLabel>
        <FieldContent>
          <Input
            id="title"
            name="title"
            placeholder="Enter task title..."
            required
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="priority">Priority</FieldLabel>
        <FieldContent>
          <Select name="priority" defaultValue={PRIORITY.MEDIUM}>
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
