import { createContext, useContext } from "react";

export const TaskStateContext = createContext(null);

export const useTaskState = () => {
  const context = useContext(TaskStateContext);
  if (!context) {
    throw new Error("useTaskState must be used within TaskProvider");
  }
  return context;
};
