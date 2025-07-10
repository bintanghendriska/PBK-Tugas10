import { defineStore } from "pinia";

const API_URL = "http://localhost:3001/notes";

export const useNoteStore = defineStore("note", {
  state: () => ({
    notes: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchNotes() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Gagal mengambil data catatan");
        this.notes = await res.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addNote(note) {
      this.error = null;
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
        if (!res.ok) throw new Error("Gagal menambah catatan");
        const newNote = await res.json();
        this.notes.push(newNote);
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteNote(id) {
      this.error = null;
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Gagal menghapus catatan");
        this.notes = this.notes.filter((note) => note.id !== id);
      } catch (err) {
        this.error = err.message;
      }
    },
    async editNote(id, newNote) {
      this.error = null;
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNote),
        });
        if (!res.ok) throw new Error("Gagal mengedit catatan");
        const updated = await res.json();
        const idx = this.notes.findIndex((note) => note.id === id);
        if (idx !== -1) this.notes[idx] = updated;
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
