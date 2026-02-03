import { useTaskStore, selectIsAddDialogOpen } from "@/stores/taskStore";
import { AddTaskForm } from "@/components/AddTaskForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const AddTaskDialog = () => {
  const isLoading = useTaskStore((state) => state.isLoading);
  const isAdding = useTaskStore((state) => state.isAdding);
  const isDialogOpen = useTaskStore(selectIsAddDialogOpen);
  const openAddDialog = useTaskStore((state) => state.openAddDialog);
  const closeAddDialog = useTaskStore((state) => state.closeAddDialog);
  const addTask = useTaskStore((state) => state.addTask);

  const handleAddTask = async (taskData) => {
    const result = await addTask(taskData);
    if (result.success) {
      toast.success("Task created", {
        description: result.task.title,
      });
    } else {
      toast.error("Failed to create task", {
        description: "Please try again",
      });
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => (open ? openAddDialog() : closeAddDialog())}
    >
      <DialogTrigger asChild>
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Loading...
            </>
          ) : (
            "Add Task"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <AddTaskForm onAdd={handleAddTask} isSubmitting={isAdding} />
      </DialogContent>
    </Dialog>
  );
};
