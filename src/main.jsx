import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { TaskProvider } from "./contexts/TaskProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      title="Application Error"
      message="The application encountered an unexpected error. Please refresh the page."
      onReset={() => window.location.reload()}
    >
      <TaskProvider>
        <App />
      </TaskProvider>
    </ErrorBoundary>
  </StrictMode>
);
