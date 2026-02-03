import { createContext, useContext } from "react";

export const TaskDispatchContext = createContext(null);

export const useTaskDispatch = () => {
  const context = useContext(TaskDispatchContext);
  if (!context) {
    throw new Error("useTaskDispatch must be used within TaskProvider");
  }
  return context;
};
