import { useState } from "react";
import { useTaskDispatch } from "@/contexts/TaskDispatchContext";
import { AddTaskForm } from "@/components/AddTaskForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AddTaskDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addTask } = useTaskDispatch();

  const handleAddTask = async (taskData) => {
    await addTask(taskData);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <AddTaskForm onAdd={handleAddTask} />
      </DialogContent>
    </Dialog>
  );
};
