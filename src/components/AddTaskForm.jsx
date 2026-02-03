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
import { PRIORITY } from "@/constants/taskConstants";
import { Loader2 } from "lucide-react";

export const AddTaskForm = ({ onAdd }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const priority = formData.get("priority");

    if (title?.trim()) {
      setIsSubmitting(true);
      await onAdd({ title, priority });
      setIsSubmitting(false);
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
            disabled={isSubmitting}
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="priority">Priority</FieldLabel>
        <FieldContent>
          <Select
            name="priority"
            defaultValue={PRIORITY.MEDIUM}
            disabled={isSubmitting}
          >
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          "Add Task"
        )}
      </Button>
    </form>
  );
};
