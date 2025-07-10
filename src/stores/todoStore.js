import { defineStore } from "pinia";

const API_URL = "http://localhost:3001/todos";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTodos() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Gagal mengambil data todo");
        this.todos = await res.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addTodo(task) {
      this.error = null;
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task, done: false }),
        });
        if (!res.ok) throw new Error("Gagal menambah todo");
        const newTodo = await res.json();
        this.todos.push(newTodo);
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteTodo(id) {
      this.error = null;
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Gagal menghapus todo");
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (err) {
        this.error = err.message;
      }
    },
    async editTodo(id, newTask) {
      this.error = null;
      try {
        const todo = this.todos.find((t) => t.id === id);
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...todo, task: newTask }),
        });
        if (!res.ok) throw new Error("Gagal mengedit todo");
        const updated = await res.json();
        const idx = this.todos.findIndex((t) => t.id === id);
        if (idx !== -1) this.todos[idx] = updated;
      } catch (err) {
        this.error = err.message;
      }
    },
    async toggleDone(id) {
      this.error = null;
      try {
        const todo = this.todos.find((t) => t.id === id);
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ done: !todo.done }),
        });
        if (!res.ok) throw new Error("Gagal mengubah status todo");
        const updated = await res.json();
        const idx = this.todos.findIndex((t) => t.id === id);
        if (idx !== -1) this.todos[idx] = updated;
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
