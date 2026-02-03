import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskList } from "../TaskList";
import { useTaskStore } from "@/stores/taskStore";
import { FILTER } from "@/constants/taskConstants";

// Helper to reset and setup store
const setupStore = (overrides = {}) => {
  useTaskStore.setState({
    tasks: [],
    isLoading: false,
    filter: FILTER.ALL,
    searchTerm: "",
    ...overrides,
  });
};

describe("TaskList", () => {
  beforeEach(() => {
    setupStore();
  });

  it("renders loading state", () => {
    setupStore({ isLoading: true });
    render(<TaskList />);

    // Should show skeleton loaders
    expect(screen.getAllByTestId("skeleton")).toHaveLength(3);
  });

  it("renders empty state when no tasks exist", () => {
    setupStore({ tasks: [] });
    render(<TaskList />);

    expect(
      screen.getByText("No tasks yet. Add one to get started!")
    ).toBeInTheDocument();
  });

  it("renders filtered empty state when filters are active", () => {
    setupStore({
      tasks: [{ id: 1, title: "Test", completed: false, priority: "medium" }],
      filter: FILTER.COMPLETED,
    });
    render(<TaskList />);

    expect(screen.getByText("No tasks match your filters")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your search or filter")
    ).toBeInTheDocument();
  });

  it("renders filtered empty state when search is active", () => {
    setupStore({
      tasks: [{ id: 1, title: "Test", completed: false, priority: "medium" }],
      searchTerm: "nonexistent",
    });
    render(<TaskList />);

    expect(screen.getByText("No tasks match your filters")).toBeInTheDocument();
  });

  it("renders task list when tasks exist", () => {
    setupStore({
      tasks: [
        {
          id: 1,
          title: "Task 1",
          completed: false,
          priority: "high",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Task 2",
          completed: true,
          priority: "low",
          createdAt: new Date().toISOString(),
        },
      ],
    });
    render(<TaskList />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("filters tasks by status", () => {
    setupStore({
      tasks: [
        {
          id: 1,
          title: "Incomplete Task",
          completed: false,
          priority: "medium",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Completed Task",
          completed: true,
          priority: "medium",
          createdAt: new Date().toISOString(),
        },
      ],
      filter: FILTER.COMPLETED,
    });
    render(<TaskList />);

    expect(screen.queryByText("Incomplete Task")).not.toBeInTheDocument();
    expect(screen.getByText("Completed Task")).toBeInTheDocument();
  });

  it("filters tasks by search term", () => {
    setupStore({
      tasks: [
        {
          id: 1,
          title: "Buy groceries",
          completed: false,
          priority: "medium",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Walk the dog",
          completed: false,
          priority: "medium",
          createdAt: new Date().toISOString(),
        },
      ],
      searchTerm: "groceries",
    });
    render(<TaskList />);

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(screen.queryByText("Walk the dog")).not.toBeInTheDocument();
  });
});
