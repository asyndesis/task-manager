import { useContext } from "react";
import { TaskStateContext, TaskActionsContext } from "./TaskContext";
import { FILTER } from "@/constants/taskConstants";

// Hook to use task state (components only re-render when selected state changes)
export function useTaskState(selector) {
  const state = useContext(TaskStateContext);
  if (state === null) {
    throw new Error("useTaskState must be used within TaskProvider");
  }

  // If no selector provided, return full state
  if (!selector) return state;

  // Use selector to pick specific state
  return selector(state);
}

// Hook to use task actions (never causes re-renders)
export function useTaskActions() {
  const actions = useContext(TaskActionsContext);
  if (actions === null) {
    throw new Error("useTaskActions must be used within TaskProvider");
  }
  return actions;
}

// Convenience hook that returns derived state (filtered tasks, stats)
export function useFilteredTasks() {
  return useTaskState((state) => {
    const filteredTasks = state.tasks.filter((task) => {
      const matchesStatus =
        state.filter === FILTER.ALL ||
        (state.filter === FILTER.COMPLETED && task.completed) ||
        (state.filter === FILTER.INCOMPLETE && !task.completed);

      const matchesSearch =
        !state.searchTerm.trim() ||
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    return filteredTasks;
  });
}

// Convenience hook for stats
export function useTaskStats() {
  return useTaskState((state) => ({
    total: state.tasks.length,
    completed: state.tasks.filter((t) => t.completed).length,
  }));
}
