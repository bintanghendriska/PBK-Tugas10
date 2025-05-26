<template>
  <div id="app-container">
    <header class="app-header">
      <div class="logo">Catatan Bintang</div>
      <nav class="app-nav">
        <router-link to="/">Daftar Catatan</router-link>
        <router-link to="/add-note">Tambah Catatan</router-link>
        <router-link to="/about">Tentang</router-link>
      </nav>
    </header>

    <main class="app-main">
      <router-view /> </main>

    <footer class="app-footer">
      <p>&copy; {{ currentYear }} SimpleNotes App. Dibuat dengan Vue.js.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style>
/* Global Styles (bisa juga ditaruh di file CSS terpisah dan diimpor) */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  background-color: #f4f4f4;
  color: #333;
  line-height: 1.6;
}

#app-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px; /* Padding agar konten tidak menempel di tepi layar kecil */
}

.app-header {
  background-color: #333;
  color: #fff;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #42b983;
  margin-bottom: 20px; /* Jarak dari header ke main content */
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
}

.app-nav a {
  color: #fff;
  margin-left: 20px;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.app-nav a:hover {
  background-color: #555;
}

/* Kelas dari router config untuk link aktif */
.app-nav a.exact-active-nav-link {
  background-color: #42b983;
  font-weight: bold;
}
/* .app-nav a.active-nav-link { /* Jika menggunakan linkActiveClass yang tidak exact */
    /* Tambahkan style jika diperlukan, biasanya exact-active sudah cukup 
} */


.app-main {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  min-height: calc(100vh - 200px); /* Contoh agar footer tidak terlalu naik */
}

.app-footer {
  text-align: center;
  margin-top: 30px;
  padding: 20px;
  font-size: 0.9em;
  color: #777;
  border-top: 1px solid #eee;
}

/* Styling umum untuk heading di dalam views */
.app-main h2 {
  color: #333;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  margin-top: 0; /* Hapus margin atas default dari h2 pertama di view */
}
</style>