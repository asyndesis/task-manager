const STORAGE_KEY = "task-manager-tasks";
const SIMULATED_DELAY = 300; // ms - simulate network latency

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
};

const saveToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
};

// API-like interface that operates on the full task list
// When migrating to a real API, replace these with fetch calls
export const taskStorage = {
  getAll: async () => {
    await delay(SIMULATED_DELAY);
    return loadFromStorage();
  },

  create: async (task) => {
    await delay(SIMULATED_DELAY);
    const tasks = loadFromStorage();
    const newTasks = [task, ...tasks];
    saveToStorage(newTasks);
    return newTasks;
  },

  update: async (id, updates) => {
    await delay(SIMULATED_DELAY);
    const tasks = loadFromStorage();
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    );
    saveToStorage(newTasks);
    return newTasks;
  },

  delete: async (id) => {
    await delay(SIMULATED_DELAY);
    const tasks = loadFromStorage();
    const newTasks = tasks.filter((task) => task.id !== id);
    saveToStorage(newTasks);
    return newTasks;
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear tasks:", error);
    }
  },
};
