import { useMemo } from "react";
import {
  useTaskStore,
  selectTasks,
  selectFilter,
  selectSearchTerm,
} from "@/stores/taskStore";
import { FILTER } from "@/constants/taskConstants";

export const useFilteredTasks = () => {
  const tasks = useTaskStore(selectTasks);
  const filter = useTaskStore(selectFilter);
  const searchTerm = useTaskStore(selectSearchTerm);

  return useMemo(() => {
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
};
