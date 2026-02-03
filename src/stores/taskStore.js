import { create } from "zustand";
import { taskStorage } from "@/services/taskStorage";
import { PRIORITY, FILTER } from "@/constants/taskConstants";

export const useTaskStore = create((set, get) => ({
  // State
  tasks: [],
  isLoading: true,
  isAdding: false,
  filter: FILTER.ALL,
  searchTerm: "",
  isAddDialogOpen: false,

  // Actions
  openAddDialog: () => set({ isAddDialogOpen: true }),
  closeAddDialog: () => set({ isAddDialogOpen: false }),

  loadTasks: async () => {
    set({ isLoading: true });
    const loadedTasks = await taskStorage.getAll();
    set({ tasks: loadedTasks, isLoading: false });
  },

  addTask: async ({ title, priority = PRIORITY.MEDIUM }) => {
    if (!title.trim()) return;

    set({ isAdding: true });
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // Optimistic update
    set((state) => ({ tasks: [newTask, ...state.tasks] }));

    try {
      await taskStorage.create(newTask);
      set({ isAddDialogOpen: false });
      return { success: true, task: newTask };
    } catch (error) {
      console.error("Failed to add task:", error);
      // Rollback on error
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== newTask.id),
      }));
      return { success: false, error };
    } finally {
      set({ isAdding: false });
    }
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));

    try {
      await taskStorage.update(id, { completed: !task.completed });
      return { success: true, wasCompleted: !task.completed };
    } catch (error) {
      console.error("Failed to toggle task:", error);
      // Rollback on error
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, completed: task.completed } : t
        ),
      }));
      return { success: false, error };
    }
  },

  deleteTask: async (id) => {
    const deletedTask = get().tasks.find((t) => t.id === id);
    if (!deletedTask) return;

    // Optimistic update
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));

    try {
      await taskStorage.delete(id);
      return { success: true };
    } catch (error) {
      console.error("Failed to delete task:", error);
      // Rollback on error
      set((state) => ({
        tasks: [...state.tasks, deletedTask].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      }));
      return { success: false, error };
    }
  },

  updateTask: async (id, updates) => {
    const originalTask = get().tasks.find((t) => t.id === id);
    if (!originalTask) return;

    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));

    try {
      await taskStorage.update(id, updates);
      return { success: true };
    } catch (error) {
      console.error("Failed to update task:", error);
      // Rollback on error
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? originalTask : t)),
      }));
      return { success: false, error };
    }
  },

  setFilter: (filter) => set({ filter }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));

// Selectors
export const selectTasks = (state) => state.tasks;
export const selectIsLoading = (state) => state.isLoading;
export const selectFilter = (state) => state.filter;
export const selectSearchTerm = (state) => state.searchTerm;
export const selectIsAddDialogOpen = (state) => state.isAddDialogOpen;
export const selectHasActiveFilters = (state) =>
  state.filter !== FILTER.ALL || state.searchTerm.trim() !== "";
