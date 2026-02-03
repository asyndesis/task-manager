import { useState } from "react";

// Enums
export const PRIORITY = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export const FILTER = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete",
};

export const useTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete coding test",
      priority: PRIORITY.HIGH,
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Review documentation",
      priority: PRIORITY.MEDIUM,
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Setup development environment",
      priority: PRIORITY.LOW,
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ]);
  const [filter, setFilter] = useState(FILTER.ALL);
  const [searchTerm, setSearchTerm] = useState("");

  const addTask = ({ title, priority = PRIORITY.MEDIUM }) => {
    if (!title.trim()) return;
    setTasks([
      {
        id: Date.now(),
        title,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...tasks,
    ]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filter === FILTER.COMPLETED && !task.completed) return false;
    if (filter === FILTER.INCOMPLETE && task.completed) return false;

    // Filter by search term
    if (
      searchTerm.trim() &&
      !task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return {
    tasks: filteredTasks,
    addTask,
    toggleTask,
    deleteTask,
    stats,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
  };
};
