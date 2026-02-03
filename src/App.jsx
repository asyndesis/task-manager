import { useTasks } from "@/hooks/useTasks";
import { TaskList } from "@/components/TaskList";
import { AddTaskForm } from "@/components/AddTaskForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { APP_BACKGROUND } from "@/constants/taskStyles";

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <div className={`min-h-screen bg-${APP_BACKGROUND} p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <AddTaskForm onAdd={addTask} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Task List */}
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </div>
  );
}

export default App;
