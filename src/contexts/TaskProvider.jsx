import { useState, useMemo, useEffect, useCallback } from "react";
import { TaskStateContext } from "./TaskStateContext";
import { TaskDispatchContext } from "./TaskDispatchContext";
import { taskStorage } from "@/services/taskStorage";
import { PRIORITY, FILTER } from "@/constants/taskConstants";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState(FILTER.ALL);
  const [searchTerm, setSearchTerm] = useState("");

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      const loadedTasks = await taskStorage.getAll();
      setTasks(loadedTasks);
      setIsLoading(false);
    };
    loadTasks();
  }, []);

  // Action functions with useCallback for stable references
  const addTask = useCallback(async ({ title, priority = PRIORITY.MEDIUM }) => {
    if (!title.trim()) return;
    setIsAdding(true);
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);

    try {
      await taskStorage.create(newTask);
    } catch (error) {
      console.error("Failed to add task:", error);
      setTasks((prev) => prev.filter((t) => t.id !== newTask.id));
    } finally {
      setIsAdding(false);
    }
  }, []);

  const toggleTask = useCallback(async (id) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task) return prev;

      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );

      // Async storage update
      taskStorage.update(id, { completed: !task.completed }).catch((error) => {
        console.error("Failed to toggle task:", error);
        setTasks(prev);
      });

      return updated;
    });
  }, []);

  const deleteTask = useCallback(async (id) => {
    setTasks((prev) => {
      const deletedTask = prev.find((t) => t.id === id);
      if (!deletedTask) return prev;

      const filtered = prev.filter((t) => t.id !== id);

      // Async storage update
      taskStorage.delete(id).catch((error) => {
        console.error("Failed to delete task:", error);
        setTasks(prev);
      });

      return filtered;
    });
  }, []);

  const updateTask = useCallback(async (id, updates) => {
    setTasks((prev) => {
      const originalTask = prev.find((t) => t.id === id);
      if (!originalTask) return prev;

      const updated = prev.map((t) => (t.id === id ? { ...t, ...updates } : t));

      // Async storage update
      taskStorage.update(id, updates).catch((error) => {
        console.error("Failed to update task:", error);
        setTasks(prev);
      });

      return updated;
    });
  }, []);

  // Dispatch value - completely stable, never changes
  const dispatch = useMemo(
    () => ({
      addTask,
      toggleTask,
      deleteTask,
      updateTask,
      setFilter,
      setSearchTerm,
    }),
    [addTask, toggleTask, deleteTask, updateTask]
  );

  // Filtered tasks
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

  // Stats
  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
    };
  }, [tasks]);

  // State value
  const state = useMemo(
    () => ({
      tasks: filteredTasks,
      isLoading,
      isAdding,
      stats,
      filter,
      searchTerm,
    }),
    [filteredTasks, isLoading, isAdding, stats, filter, searchTerm]
  );

  return (
    <TaskDispatchContext.Provider value={dispatch}>
      <TaskStateContext.Provider value={state}>
        {children}
      </TaskStateContext.Provider>
    </TaskDispatchContext.Provider>
  );
};
