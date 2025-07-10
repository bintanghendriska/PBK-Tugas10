<template>
  <div class="todo-container">
    <h2>Todo List</h2>
    <form @submit.prevent="addNewTodo" class="todo-form">
      <input v-model="newTask" placeholder="Tambah todo baru..." />
      <button type="submit">Tambah</button>
    </form>
    <div v-if="todoStore.loading">Memuat todo...</div>
    <div v-else-if="todoStore.todos.length === 0">Belum ada todo.</div>
    <ul class="todo-list">
      <li v-for="todo in todoStore.todos" :key="todo.id" :class="{ done: todo.done }">
        <input type="checkbox" :checked="todo.done" @change="toggleDone(todo.id)" />
        <span v-if="editId !== todo.id">{{ todo.task }}</span>
        <input v-else v-model="editTask" @keyup.enter="saveEdit(todo.id)" @blur="saveEdit(todo.id)" />
        <button @click="startEdit(todo)" v-if="editId !== todo.id">Edit</button>
        <button @click="saveEdit(todo.id)" v-if="editId === todo.id">Simpan</button>
        <button @click="deleteTodo(todo.id)">Hapus</button>
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
  margin: 32px auto;
  padding: 32px 28px;
  background: var(--color-bg-main);
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(34, 42, 54, 0.1);
  border: 1px solid var(--color-border);
  color: var(--color-main-text);
}
.todo-container h2 {
  color: var(--color-logo);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 10px;
  margin-top: 0;
  margin-bottom: 18px;
}
.todo-form {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}
.todo-form input {
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-main);
  color: var(--color-main-text);
}
.todo-list {
  list-style: none;
  padding: 0;
}
.todo-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
}
.todo-list li.done span {
  text-decoration: line-through;
  color: #aaa;
}
.todo-list button {
  background: var(--color-logo);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 0.95em;
  transition: background 0.2s;
}
.todo-list button:hover {
  background: #2c8c6d;
}
.error {
  color: #e74c3c;
  margin-top: 12px;
}
</style>
