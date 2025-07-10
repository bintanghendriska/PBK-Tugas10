<template>
  <div class="about-container">
    <h2>Tentang Catatan Bintang</h2>
    <p>Catatan Bintang adalah aplikasi pencatatan dan todo list sederhana berbasis web.</p>
    <p>Aplikasi ini dibuat untuk membantu kamu mencatat ide, tugas, dan daftar pekerjaan harian secara praktis.</p>
    <p><strong>Fitur Utama:</strong></p>
    <ul>
      <li>Melihat dan mengelola daftar catatan</li>
      <li>Menambah, mengedit, dan menghapus catatan</li>
      <li>Todo List: menambah, menandai selesai, edit, dan hapus todo</li>
      <li>Penyimpanan data menggunakan JSON Server (database lokal)</li>
      <li>Antarmuka modern, responsif, dan mudah digunakan</li>
    </ul>
    <p>Versi Aplikasi: 1.0.0 (Mei 2025)</p>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-container {
  max-width: 600px;
  margin: 32px auto;
  padding: 32px 28px;
  background: var(--color-bg-main);
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(34, 42, 54, 0.1);
  border: 1px solid var(--color-border);
}
.about-container h2 {
  color: var(--color-logo);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 10px;
  margin-top: 0;
  margin-bottom: 18px;
}
.about-container p {
  line-height: 1.6;
  color: var(--color-main-text);
}
.about-container ul {
  list-style-position: inside;
  padding-left: 0;
  color: var(--color-main-text);
}
.about-container strong {
  color: var(--color-logo);
}
</style>
