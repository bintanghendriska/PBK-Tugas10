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
export default {
  name: 'AddNotePage',
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    submitNote() {
      if (!this.content.trim()) {
        alert('Isi catatan tidak boleh kosong!');
        return;
      }

      // Ambil catatan yang sudah ada dari localStorage
      const existingNotes = JSON.parse(localStorage.getItem('simpleNotes') || '[]');
      // Tambahkan catatan baru
      existingNotes.push({ title: this.title, content: this.content });
      // Simpan kembali ke localStorage
      localStorage.setItem('simpleNotes', JSON.stringify(existingNotes));

      // Reset form
      this.title = '';
      this.content = '';

      // Redirect ke halaman daftar catatan dengan query parameter
      this.$router.push({ name: 'NoteList', query: { noteAdded: 'true' } });
    },
  },
};
</script>

<style scoped>
.note-form {
  max-width: 500px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Important for width 100% */
}
.submit-button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.submit-button:hover {
  background-color: #36a46f;
}
</style>