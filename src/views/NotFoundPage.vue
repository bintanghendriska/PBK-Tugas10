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
  name: "NotFoundPage",
};
</script>

<style scoped>
.not-found-container {
  text-align: center;
  margin-top: 60px;
  padding: 32px 28px;
  background: var(--color-bg-main);
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(34, 42, 54, 0.1);
  border: 1px solid var(--color-border);
  color: var(--color-main-text);
}
.not-found-container h1 {
  font-size: 6em;
  color: var(--color-border);
  margin-bottom: 0;
}
.not-found-container h2 {
  font-size: 1.5em;
  color: var(--color-logo);
  margin-top: 0;
}
.not-found-container p {
  color: var(--color-footer-text);
}
.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 28px;
  background: var(--color-logo);
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1.1em;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.08);
  transition: background 0.2s;
}
.home-link:hover {
  background: #2c8c6d;
}
</style>
