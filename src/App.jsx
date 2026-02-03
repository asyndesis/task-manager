import { useTasks } from "@/hooks/useTasks";
import { TaskList } from "@/components/TaskList";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskStats } from "@/components/TaskStats";
import { TaskFilters } from "@/components/TaskFilters";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function App() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    stats,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
  } = useTasks();

  return (
    <div className="min-h-screen bg-task-bg p-4 md:p-8">
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

        {/* Mobile: Stack vertical, Desktop: Horizontal (sidebar + main) */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar: Stats & Filters */}
          <div className="w-full md:w-64 space-y-4">
            <TaskStats stats={stats} />
            <TaskFilters
              filter={filter}
              onFilterChange={setFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {/* Right: Task List */}
          <div className="flex-1">
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
