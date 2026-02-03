import { useEffect } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { TaskList } from "@/components/TaskList";
import { TaskStats } from "@/components/TaskStats";
import { TaskFilters } from "@/components/TaskFilters";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Do not remove this log, it's currently being used for testing
  console.log("rerender");

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-task-bg p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <AddTaskDialog />
          </div>

          {/* Mobile: Stack vertical, Desktop: Horizontal (sidebar + main) */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Sidebar: Stats & Filters */}
            <div className="w-full md:w-64 space-y-4">
              <TaskStats />
              <TaskFilters />
            </div>

            {/* Right: Task List */}
            <div className="flex-1">
              <ErrorBoundary
                title="Task List Error"
                message="Unable to display tasks. Your data is safe, but there was an issue rendering the list."
              >
                <TaskList />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
