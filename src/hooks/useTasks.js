import { useState, useMemo, useEffect } from "react";
import { taskStorage } from "@/services/taskStorage";
import { PRIORITY, FILTER } from "@/constants/taskConstants";

// This function has become pretty complex, and should be refactored into a context
// Or smaller query and mutation wrapper functions.  This is fine for a demo as it's less for us to review
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState(FILTER.ALL);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulates a network request to load tasks
  // In a real application, this would be replaced with a call to an API
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      const loadedTasks = await taskStorage.getAll();
      setTasks(loadedTasks);
      setIsLoading(false);
    };
    loadTasks();
  }, []);

  const addTask = async ({ title, priority = PRIORITY.MEDIUM }) => {
    if (!title.trim()) return;
    setIsAdding(true);
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = await taskStorage.create(newTask);
    setTasks(updatedTasks);
    setIsAdding(false);
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updatedTasks = await taskStorage.update(id, {
      completed: !task.completed,
    });
    setTasks(updatedTasks);
  };

  const deleteTask = async (id) => {
    const updatedTasks = await taskStorage.delete(id);
    setTasks(updatedTasks);
  };

  const updateTask = async (id, updates) => {
    const updatedTasks = await taskStorage.update(id, updates);
    setTasks(updatedTasks);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        filter === FILTER.ALL ||
        (filter === FILTER.COMPLETED && task.completed) ||
        (filter === FILTER.INCOMPLETE && !task.completed);

      const matchesSearch =
        !searchTerm.trim() ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [tasks, filter, searchTerm]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
    };
  }, [tasks]);

  return {
    tasks: filteredTasks,
    isLoading,
    isAdding,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    stats,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
  };
};

// Re-export constants for convenience
export { PRIORITY, FILTER };
