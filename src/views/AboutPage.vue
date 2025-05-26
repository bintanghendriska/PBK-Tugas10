<template>
  <div class="about-container">
    <h2>Tentang Catatan Bintang</h2>
    <p>Catatan Bintang adalah aplikasi pencatatan yang sangat sederhana.</p>
    <p>Aplikasi ini dibuat sebagai contoh implementasi Vue Router untuk tugas kuliah atau pembelajaran mandiri.</p>
    <p><strong>Fitur:</strong></p>
    <ul>
      <li>Melihat daftar catatan</li>
      <li>Menambah catatan baru</li>
      <li>Penyimpanan data menggunakan Local Storage browser</li>
    </ul>
    <p>Versi Aplikasi: 1.0.0 (Mei 2025)</p>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.about-container h2 {
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.about-container p {
  line-height: 1.6;
  color: #555;
}
.about-container ul {
  list-style-position: inside;
  padding-left: 0;
}
.about-container strong {
  color: #333;
}
</style>