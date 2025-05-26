<template>
  <div>
    <h2>Daftar Catatan Saya</h2>
    <div v-if="notes.length === 0 && !noteAddedSuccess" class="empty-notes">
      <p>Belum ada catatan. Silakan <router-link :to="{ name: 'AddNote' }">tambah catatan baru</router-link>.</p>
    </div>
    <ul v-else class="note-list">
      <li v-for="(note, index) in notes" :key="index" class="note-item">
        <h3>{{ note.title || 'Tanpa Judul' }}</h3>
        <p>{{ note.content }}</p>
      </li>
    </ul>
    <p v-if="noteAddedSuccess" class="success-message">
      Catatan baru berhasil ditambahkan!
    </p>
  </div>
</template>

<script>
export default {
  name: 'NoteListPage',
  data() {
    return {
      // Kita akan menggunakan localStorage untuk persistensi data sederhana
      notes: [],
      noteAddedSuccess: false,
    };
  },
  methods: {
    loadNotes() {
      const savedNotes = localStorage.getItem('simpleNotes');
      if (savedNotes) {
        this.notes = JSON.parse(savedNotes);
      }
    }
  },
  created() {
    this.loadNotes();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // Cek apakah ada query parameter 'noteAdded'
      if (to.query.noteAdded === 'true') {
        vm.noteAddedSuccess = true;
        vm.loadNotes(); // Muat ulang catatan untuk menampilkan yang baru

        // Hapus query parameter agar tidak muncul lagi saat refresh
        const newQuery = { ...to.query };
        delete newQuery.noteAdded;
        vm.$router.replace({ query: newQuery });

        // Sembunyikan pesan setelah beberapa detik
        setTimeout(() => {
          vm.noteAddedSuccess = false;
        }, 3000);
      } else {
        // Jika tidak ada query noteAdded, pastikan noteAddedSuccess false
        vm.noteAddedSuccess = false;
      }
    });
  },
   // Jika pengguna kembali ke halaman ini menggunakan tombol back browser setelah menambah catatan
  beforeRouteUpdate(to, from, next) {
    if (to.query.noteAdded === 'true') {
      this.noteAddedSuccess = true;
      this.loadNotes();

      const newQuery = { ...to.query };
      delete newQuery.noteAdded;
      this.$router.replace({ query: newQuery });

      setTimeout(() => {
        this.noteAddedSuccess = false;
      }, 3000);
    } else {
       this.noteAddedSuccess = false;
    }
    next();
  }
};
</script>

<style scoped>
.empty-notes {
  text-align: center;
  margin-top: 20px;
  color: #666;
}
.note-list {
  list-style-type: none;
  padding: 0;
}
.note-item {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.note-item h3 {
  margin-top: 0;
  margin-bottom: 5px;
}
.note-item p {
  margin-bottom: 0;
  white-space: pre-wrap; /* Agar line break di textarea tampil */
}
.success-message {
  color: green;
  background-color: #e6ffe6;
  padding: 10px;
  border: 1px solid green;
  border-radius: 5px;
  margin-top: 15px;
  text-align: center;
}
</style>