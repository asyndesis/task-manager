import { useState } from "react";

// Enums
export const PRIORITY = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
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

  const addTask = (title, priority = PRIORITY.MEDIUM) => {
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

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return { tasks, addTask, toggleTask, deleteTask, stats };
};
