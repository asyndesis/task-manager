import {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { taskStorage } from "@/services/taskStorage";
import { PRIORITY, FILTER } from "@/constants/taskConstants";

// Separate contexts for state and actions to prevent unnecessary re-renders
export const TaskStateContext = createContext(null);
export const TaskActionsContext = createContext(null);

// Action types
const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ADDING: "SET_ADDING",
  SET_TASKS: "SET_TASKS",
  ADD_TASK: "ADD_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  SET_FILTER: "SET_FILTER",
  SET_SEARCH: "SET_SEARCH",
};

// Initial state
const initialState = {
  tasks: [],
  isLoading: true,
  isAdding: false,
  filter: FILTER.ALL,
  searchTerm: "",
};

// Reducer function
function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ACTIONS.SET_ADDING:
      return { ...state, isAdding: action.payload };

    case ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload };

    case ACTIONS.ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        ),
      };

    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };

    case ACTIONS.SET_SEARCH:
      return { ...state, searchTerm: action.payload };

    default:
      return state;
  }
}

// Provider component
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const loadedTasks = await taskStorage.getAll();
      dispatch({ type: ACTIONS.SET_TASKS, payload: loadedTasks });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    };
    loadTasks();
  }, []);

  // Actions object (memoized to prevent re-renders)
  const actions = useMemo(
    () => ({
      addTask: async ({ title, priority = PRIORITY.MEDIUM }) => {
        if (!title.trim()) return;
        dispatch({ type: ACTIONS.SET_ADDING, payload: true });

        const newTask = {
          id: Date.now(),
          title,
          priority,
          completed: false,
          createdAt: new Date().toISOString(),
        };

        // Optimistic update
        dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });

        try {
          await taskStorage.create(newTask);
        } catch (error) {
          console.error("Failed to add task:", error);
          dispatch({ type: ACTIONS.REMOVE_TASK, payload: newTask.id });
        } finally {
          dispatch({ type: ACTIONS.SET_ADDING, payload: false });
        }
      },

      toggleTask: async (id) => {
        const task = state.tasks.find((t) => t.id === id);
        if (!task) return;

        // Optimistic update
        dispatch({ type: ACTIONS.TOGGLE_TASK, payload: id });

        try {
          await taskStorage.update(id, { completed: !task.completed });
        } catch (error) {
          console.error("Failed to toggle task:", error);
          // Rollback
          dispatch({ type: ACTIONS.TOGGLE_TASK, payload: id });
        }
      },

      deleteTask: async (id) => {
        const deletedTask = state.tasks.find((t) => t.id === id);
        if (!deletedTask) return;

        // Optimistic update
        dispatch({ type: ACTIONS.REMOVE_TASK, payload: id });

        try {
          await taskStorage.delete(id);
        } catch (error) {
          console.error("Failed to delete task:", error);
          // Rollback
          dispatch({ type: ACTIONS.ADD_TASK, payload: deletedTask });
        }
      },

      updateTask: async (id, updates) => {
        const originalTask = state.tasks.find((t) => t.id === id);
        if (!originalTask) return;

        // Optimistic update
        dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id, updates } });

        try {
          await taskStorage.update(id, updates);
        } catch (error) {
          console.error("Failed to update task:", error);
          // Rollback
          dispatch({
            type: ACTIONS.UPDATE_TASK,
            payload: { id, updates: originalTask },
          });
        }
      },

      setFilter: (filter) => {
        dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
      },

      setSearchTerm: (searchTerm) => {
        dispatch({ type: ACTIONS.SET_SEARCH, payload: searchTerm });
      },
    }),
    [state.tasks] // Recompute when tasks change (needed for closures)
  );

  return (
    <TaskStateContext.Provider value={state}>
      <TaskActionsContext.Provider value={actions}>
        {children}
      </TaskActionsContext.Provider>
    </TaskStateContext.Provider>
  );
}
