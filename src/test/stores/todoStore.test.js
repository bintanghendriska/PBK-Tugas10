import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTodoStore } from "../../stores/todoStore";

// Mock fetch
global.fetch = vi.fn();

describe("Todo Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("should fetch todos successfully", async () => {
    const mockTodos = [
      { id: 1, task: "Test Todo 1", done: false },
      { id: 2, task: "Test Todo 2", done: true },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    });

    const store = useTodoStore();
    await store.fetchTodos();

    expect(store.todos).toEqual(mockTodos);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  it("should handle fetch error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const store = useTodoStore();
    await store.fetchTodos();

    expect(store.error).toBe("Network error");
    expect(store.loading).toBe(false);
  });

  it("should add todo successfully", async () => {
    const newTodo = { task: "New Todo", done: false };
    const createdTodo = { id: 3, ...newTodo };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdTodo,
    });

    const store = useTodoStore();
    store.todos = [{ id: 1, task: "Existing Todo", done: false }];

    await store.addTodo("New Todo");

    expect(store.todos).toContain(createdTodo);
    expect(store.error).toBe(null);
  });

  it("should handle add todo error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const store = useTodoStore();
    await store.addTodo("Test Todo");

    expect(store.error).toBe("Gagal menambah todo");
  });

  it("should delete todo successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    const store = useTodoStore();
    store.todos = [
      { id: 1, task: "Todo 1", done: false },
      { id: 2, task: "Todo 2", done: false },
    ];

    await store.deleteTodo(1);

    expect(store.todos).toHaveLength(1);
    expect(store.todos[0].id).toBe(2);
    expect(store.error).toBe(null);
  });

  it("should edit todo successfully", async () => {
    const updatedTodo = { id: 1, task: "Updated Todo", done: false };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedTodo,
    });

    const store = useTodoStore();
    store.todos = [{ id: 1, task: "Original Todo", done: false }];

    await store.editTodo(1, "Updated Todo");

    expect(store.todos[0]).toEqual(updatedTodo);
    expect(store.error).toBe(null);
  });

  it("should toggle todo done status", async () => {
    const updatedTodo = { id: 1, task: "Test Todo", done: true };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedTodo,
    });

    const store = useTodoStore();
    store.todos = [{ id: 1, task: "Test Todo", done: false }];

    await store.toggleDone(1);

    expect(store.todos[0].done).toBe(true);
    expect(store.error).toBe(null);
  });

  it("should handle toggle error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const store = useTodoStore();
    store.todos = [{ id: 1, task: "Test Todo", done: false }];

    await store.toggleDone(1);

    expect(store.error).toBe("Gagal mengubah status todo");
  });
});
