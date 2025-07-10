<template>
  <div>
    <h2>Daftar Catatan Saya</h2>
    <div class="toolbar">
      <input v-model="search" placeholder="Cari catatan..." />
      <select v-model="sortBy">
        <option value="">Urutkan</option>
        <option value="title">Judul</option>
        <option value="created">Tanggal</option>
      </select>
    </div>
    <div v-if="noteStore.loading" class="empty-notes">
      <p>Memuat catatan...</p>
    </div>
    <div v-else-if="notesFiltered.length === 0 && !noteAddedSuccess" class="empty-notes">
      <p>Belum ada catatan. Silakan <router-link :to="{ name: 'AddNote' }" class="custom-link">tambah catatan baru</router-link>.</p>
    </div>
    <transition-group name="note-fade" tag="ul" class="note-list">
      <li v-for="(note, index) in notesFiltered" :key="note.id" class="note-item">
        <h3>{{ note.title || "Tanpa Judul" }}</h3>
        <p>{{ note.content }}</p>
        <div class="note-actions">
          <button @click="editNote(index)">Edit</button>
          <button @click="confirmDelete(index)">Hapus</button>
        </div>
      </li>
    </transition-group>
    <div v-if="showEdit" class="edit-modal">
      <div class="modal-content">
        <h3>Edit Catatan</h3>
        <input v-model="editTitle" placeholder="Judul" />
        <textarea v-model="editContent" rows="4"></textarea>
        <div class="modal-actions">
          <button @click="saveEdit">Simpan</button>
          <button @click="cancelEdit">Batal</button>
        </div>
      </div>
    </div>
    <div v-if="showConfirm" class="confirm-modal">
      <div class="modal-content">
        <p>Yakin ingin menghapus catatan ini?</p>
        <div class="modal-actions">
          <button @click="deleteNote">Ya, Hapus</button>
          <button @click="showConfirm = false">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNoteStore } from "../stores/noteStore";
import { storeToRefs } from "pinia";
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NoteListPage",
  setup() {
    const noteStore = useNoteStore();
    const { notes, loading, error } = storeToRefs(noteStore);
    const search = ref("");
    const sortBy = ref("");
    const noteAddedSuccess = ref(false);
    const showEdit = ref(false);
    const editIndex = ref(null);
    const editTitle = ref("");
    const editContent = ref("");
    const showConfirm = ref(false);
    const deleteIndex = ref(null);
    const router = useRouter();

    onMounted(() => {
      noteStore.fetchNotes();
    });

    const notesFiltered = computed(() => {
      let filtered = notes.value.filter((note) => (note.title || "").toLowerCase().includes(search.value.toLowerCase()) || (note.content || "").toLowerCase().includes(search.value.toLowerCase()));
      if (sortBy.value === "title") {
        filtered = filtered.slice().sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      }
      // Tidak ada sort by created karena JSON Server tidak punya field created
      return filtered;
    });

    function editNote(index) {
      editIndex.value = index;
      editTitle.value = notesFiltered.value[index].title;
      editContent.value = notesFiltered.value[index].content;
      showEdit.value = true;
    }
    async function saveEdit() {
      if (!editContent.value.trim()) {
        // Bisa tambahkan toast jika ingin
        return;
      }
      const note = notesFiltered.value[editIndex.value];
      await noteStore.editNote(note.id, { ...note, title: editTitle.value, content: editContent.value });
      showEdit.value = false;
      editIndex.value = null;
      editTitle.value = "";
      editContent.value = "";
    }
    function cancelEdit() {
      showEdit.value = false;
      editIndex.value = null;
      editTitle.value = "";
      editContent.value = "";
    }
    function confirmDelete(index) {
      showConfirm.value = true;
      deleteIndex.value = index;
    }
    async function deleteNote() {
      const note = notesFiltered.value[deleteIndex.value];
      await noteStore.deleteNote(note.id);
      showConfirm.value = false;
      deleteIndex.value = null;
    }

    return {
      noteStore,
      notesFiltered,
      search,
      sortBy,
      noteAddedSuccess,
      showEdit,
      editIndex,
      editTitle,
      editContent,
      showConfirm,
      deleteIndex,
      editNote,
      saveEdit,
      cancelEdit,
      confirmDelete,
      deleteNote,
    };
  },
};
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}
.toolbar input {
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-main);
  color: var(--color-main-text);
  transition: background 0.2s, color 0.2s;
}
.toolbar select,
.toolbar button {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background: var(--color-footer-bg);
  color: var(--color-main-text);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.toolbar select:focus,
.toolbar input:focus {
  outline: 2px solid var(--color-logo);
}
.empty-notes {
  text-align: center;
  margin-top: 20px;
  color: var(--color-footer-text);
}
.custom-link {
  color: var(--color-logo);
  text-decoration: underline;
  transition: color 0.2s;
}
.custom-link:hover {
  color: #2c8c6d;
}
.note-list {
  list-style-type: none;
  padding: 0;
}
.note-item {
  background-color: var(--color-footer-bg);
  border: 1px solid var(--color-border);
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  position: relative;
  transition: box-shadow 0.3s, transform 0.3s, background 0.2s;
}
.note-item:hover {
  box-shadow: 0 4px 16px rgba(66, 185, 131, 0.1);
  transform: translateY(-2px) scale(1.01);
}
.note-fade-enter-active,
.note-fade-leave-active {
  transition: all 0.4s;
}
.note-fade-enter,
.note-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.note-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
}
.note-actions button {
  background: var(--color-logo);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 0.95em;
  transition: background 0.2s;
}
.note-actions button:hover {
  background: #2c8c6d;
}
.edit-modal,
.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: var(--color-bg-main);
  color: var(--color-main-text);
  padding: 24px 32px;
  border-radius: 8px;
  min-width: 320px;
  box-shadow: 0 4px 24px rgba(34, 42, 54, 0.18);
}
.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;
  justify-content: flex-end;
}
</style>
