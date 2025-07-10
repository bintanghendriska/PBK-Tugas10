<template>
  <div class="todo-container">
    <h2>Todo List</h2>
    <form @submit.prevent="addNewTodo" class="todo-form">
      <input v-model="newTask" placeholder="Tambah todo baru..." />
      <button type="submit">Tambah</button>
    </form>
    <div v-if="todoStore.loading" class="todo-loading">Memuat todo...</div>
    <div v-else-if="todoStore.todos.length === 0" class="todo-empty">Belum ada todo.</div>
    <ul class="todo-list">
      <li v-for="todo in todoStore.todos" :key="todo.id" :class="{ done: todo.done }">
        <label class="checkbox-wrapper">
          <input type="checkbox" :checked="todo.done" @change="toggleDone(todo.id)" />
          <span class="custom-checkbox"></span>
        </label>
        <span v-if="editId !== todo.id" class="todo-task">{{ todo.task }}</span>
        <input v-else v-model="editTask" @keyup.enter="saveEdit(todo.id)" @blur="saveEdit(todo.id)" class="edit-input" />
        <div class="todo-actions">
          <button @click="startEdit(todo)" v-if="editId !== todo.id" class="edit-btn">Edit</button>
          <button @click="saveEdit(todo.id)" v-if="editId === todo.id" class="save-btn">Simpan</button>
          <button @click="deleteTodo(todo.id)" class="delete-btn">Hapus</button>
        </div>
      </li>
    </ul>
    <div v-if="todoStore.error" class="error">{{ todoStore.error }}</div>
  </div>
</template>

<script>
import { useTodoStore } from "../stores/todoStore";
import { ref, onMounted } from "vue";

export default {
  name: "TodoPage",
  setup() {
    const todoStore = useTodoStore();
    const newTask = ref("");
    const editId = ref(null);
    const editTask = ref("");

    onMounted(() => {
      todoStore.fetchTodos();
    });

    async function addNewTodo() {
      if (!newTask.value.trim()) return;
      await todoStore.addTodo(newTask.value);
      newTask.value = "";
    }
    function startEdit(todo) {
      editId.value = todo.id;
      editTask.value = todo.task;
    }
    async function saveEdit(id) {
      if (!editTask.value.trim()) return;
      await todoStore.editTodo(id, editTask.value);
      editId.value = null;
      editTask.value = "";
    }
    async function deleteTodo(id) {
      await todoStore.deleteTodo(id);
    }
    async function toggleDone(id) {
      await todoStore.toggleDone(id);
    }

    return {
      todoStore,
      newTask,
      addNewTodo,
      editId,
      editTask,
      startEdit,
      saveEdit,
      deleteTodo,
      toggleDone,
    };
  },
};
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 36px auto;
  padding: 36px 28px 32px 28px;
  background: var(--color-bg-main);
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(37, 99, 235, 0.1);
  border: 1px solid var(--color-border);
  color: var(--color-main-text);
}
.todo-container h2 {
  color: var(--color-logo);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 10px;
  margin-top: 0;
  margin-bottom: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}
.todo-form input {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: #f8fafc;
  color: var(--color-main-text);
  font-size: 1.08em;
  transition: border 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.todo-form input:focus {
  outline: 2px solid var(--color-logo);
  border-color: var(--color-logo);
}
.todo-form button {
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 1.08em;
  font-weight: 600;
  background: var(--color-logo);
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.08);
  transition: background 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.todo-form button:hover {
  background: #2563eb;
}
.todo-loading,
.todo-empty {
  text-align: center;
  color: var(--color-footer-text);
  margin: 18px 0;
}
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.todo-list li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
  transition: background 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.todo-list li:last-child {
  border-bottom: none;
}
.todo-list li.done .todo-task {
  text-decoration: line-through;
  color: #aaa;
  opacity: 0.7;
}
.checkbox-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.checkbox-wrapper input[type="checkbox"] {
  opacity: 0;
  width: 22px;
  height: 22px;
  margin: 0;
  cursor: pointer;
}
.custom-checkbox {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid var(--color-logo);
  background: #fff;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  transition: background 0.18s cubic-bezier(0.4, 0, 0.2, 1), border 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.checkbox-wrapper input[type="checkbox"]:checked + .custom-checkbox {
  background: var(--color-logo);
  border-color: var(--color-logo);
}
.todo-task {
  flex: 1;
  font-size: 1.08em;
  transition: color 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.edit-input {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--color-logo);
  font-size: 1.08em;
}
.todo-actions {
  display: flex;
  gap: 8px;
}
.todo-actions button {
  padding: 7px 18px;
  border-radius: 7px;
  font-size: 1em;
  font-weight: 500;
  border: none;
  transition: background 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.edit-btn {
  background: #f1f5f9;
  color: var(--color-header);
}
.edit-btn:hover {
  background: var(--color-logo);
  color: #fff;
}
.save-btn {
  background: var(--color-logo);
  color: #fff;
}
.save-btn:hover {
  background: #2563eb;
}
.delete-btn {
  background: #f87171;
  color: #fff;
}
.delete-btn:hover {
  background: #dc2626;
}
.error {
  color: #e74c3c;
  margin-top: 18px;
  text-align: center;
}
@media (max-width: 700px) {
  .todo-container {
    padding: 18px 4px 18px 4px;
  }
  .todo-form button {
    padding: 10px 16px;
    font-size: 1em;
  }
  .todo-list li {
    gap: 8px;
    padding: 10px 0;
  }
  .todo-actions button {
    padding: 6px 10px;
    font-size: 0.98em;
  }
}
</style>
