<template>
  <div class="not-found-container">
    <h1>404</h1>
    <h2>Halaman Tidak Ditemukan</h2>
    <p>Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
    <router-link :to="{ name: 'NoteList' }" class="home-link">Kembali ke Beranda</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style scoped>
.not-found-container {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
}
.not-found-container h1 {
  font-size: 6em;
  color: #aaa;
  margin-bottom: 0;
}
.not-found-container h2 {
  font-size: 1.5em;
  color: #555;
  margin-top: 0;
}
.not-found-container p {
  color: #777;
}
.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
.home-link:hover {
  background-color: #36a46f;
}
</style>