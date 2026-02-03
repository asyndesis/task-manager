import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { TaskList } from "@/components/TaskList";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskStats } from "@/components/TaskStats";
import { TaskFilters } from "@/components/TaskFilters";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    stats,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
  } = useTasks();

  const handleAddTask = async (taskData) => {
    await addTask(taskData);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-task-bg p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <AddTaskForm onAdd={handleAddTask} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile: Stack vertical, Desktop: Horizontal (sidebar + main) */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar: Stats & Filters */}
          <div className="w-full md:w-64 space-y-4">
            <TaskStats stats={stats} isLoading={isLoading} />
            <TaskFilters
              filter={filter}
              onFilterChange={setFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {/* Right: Task List */}
          <div className="flex-1">
            <ErrorBoundary
              title="Task List Error"
              message="Unable to display tasks. Your data is safe, but there was an issue rendering the list."
            >
              <TaskList
                tasks={tasks}
                isLoading={isLoading}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
