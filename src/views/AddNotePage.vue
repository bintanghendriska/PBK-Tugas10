<template>
  <div>
    <h2>Tambah Catatan Baru</h2>
    <form @submit.prevent="submitNote" class="note-form">
      <div class="form-group">
        <label for="note-title">Judul (Opsional):</label>
        <input type="text" id="note-title" v-model="title" />
      </div>
      <div class="form-group">
        <label for="note-content">Isi Catatan:</label>
        <textarea id="note-content" v-model="content" rows="5" required></textarea>
      </div>
      <button type="submit" class="submit-button">Simpan Catatan</button>
    </form>
  </div>
</template>

<script>
import { useNoteStore } from "../stores/noteStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AddNotePage",
  setup() {
    const noteStore = useNoteStore();
    const title = ref("");
    const content = ref("");
    const router = useRouter();

    async function submitNote() {
      if (!content.value.trim()) {
        // Bisa tambahkan toast jika ingin
        return;
      }
      await noteStore.addNote({ title: title.value, content: content.value });
      title.value = "";
      content.value = "";
      router.push({ name: "NoteList" });
    }

    return {
      title,
      content,
      submitNote,
    };
  },
};
</script>

<style scoped>
.note-form {
  max-width: 500px;
  margin: 0 auto;
  background: var(--color-bg-main);
  padding: 32px 28px;
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(34, 42, 54, 0.1);
  border: 1px solid var(--color-border);
}
.form-group {
  margin-bottom: 18px;
}
.form-group label {
  display: block;
  margin-bottom: 7px;
  font-weight: bold;
  color: var(--color-logo);
}
.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  box-sizing: border-box;
  background: var(--color-footer-bg);
  color: var(--color-main-text);
  font-size: 1em;
  transition: background 0.2s, color 0.2s;
}
.form-group input[type="text"]::placeholder,
.form-group textarea::placeholder {
  color: var(--color-footer-text);
  opacity: 1;
}
.submit-button {
  background: var(--color-logo);
  color: #fff;
  padding: 12px 28px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.08);
  transition: background 0.2s;
}
.submit-button:hover {
  background: #2c8c6d;
}
</style>
