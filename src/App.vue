<template>
  <div :id="'app-container'">
    <header class="app-header">
      <div class="logo">Catatan Bintang</div>
      <button class="hamburger" @click="showNav = !showNav" aria-label="Toggle menu">
        <svg :class="{ open: showNav }" width="32" height="32" viewBox="0 0 32 32">
          <rect class="bar top" x="6" y="9" width="20" height="3" rx="1.5" />
          <rect class="bar middle" x="6" y="15" width="20" height="3" rx="1.5" />
          <rect class="bar bottom" x="6" y="21" width="20" height="3" rx="1.5" />
        </svg>
      </button>
      <nav class="app-nav" :class="{ open: showNav }">
        <router-link to="/">Daftar Catatan</router-link>
        <router-link to="/add-note">Tambah Catatan</router-link>
        <router-link to="/todo">Todo List</router-link>
        <router-link to="/bantuan">Bantuan</router-link>
        <router-link to="/about">Tentang</router-link>
      </nav>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <Toast v-if="toastMessage" :message="toastMessage" :type="toastType" @dismiss="toastMessage = ''" />

    <footer class="app-footer">
      <p>&copy; {{ currentYear }} SimpleNotes App. Dibuat dengan Vue.js.</p>
    </footer>
  </div>
</template>

<script>
import Toast from "./components/Toast.vue";
import { provide } from "vue";
export default {
  name: "App",
  components: { Toast },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      toastMessage: "",
      toastType: "info",
      showNav: false,
    };
  },
  methods: {
    showToast(message, type = "info") {
      this.toastMessage = message;
      this.toastType = type;
    },
    closeNav() {
      this.showNav = false;
    },
  },
  provide() {
    return {
      showToast: this.showToast,
    };
  },
};
</script>

<style>
:root {
  --color-bg: #e0eafc;
  --color-bg-main: #fff;
  --color-header: #222a36;
  --color-header-text: #fff;
  --color-logo: #42b983;
  --color-nav-link: #fff;
  --color-nav-link-active: #42b983;
  --color-nav-link-bg-active: #fff;
  --color-main-text: #222;
  --color-footer-bg: #f8fafc;
  --color-footer-text: #888;
  --color-border: #e0eafc;
}
/* Global Styles */
body {
  font-family: "Segoe UI", Arial, sans-serif;
  margin: 0;
  background: linear-gradient(120deg, var(--color-bg) 0%, var(--color-bg-main) 100%);
  color: var(--color-main-text);
  min-height: 100vh;
}

#app-container {
  max-width: 900px;
  margin: 30px auto 0 auto;
  padding: 0 24px;
}

.app-header {
  background: var(--color-header);
  color: var(--color-header-text);
  padding: 18px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 4px 16px rgba(34, 42, 54, 0.08);
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.7em;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--color-logo);
  text-shadow: 0 2px 8px rgba(66, 185, 131, 0.08);
}

.app-nav {
  display: flex;
  gap: 12px;
}

.app-nav a {
  color: var(--color-nav-link);
  background: transparent;
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1em;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.04);
}

.app-nav a:hover {
  background: var(--color-logo);
  color: #fff;
  box-shadow: 0 4px 16px rgba(66, 185, 131, 0.12);
}

.app-nav a.exact-active-nav-link {
  background: var(--color-nav-link-bg-active);
  color: var(--color-nav-link-active);
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.12);
}

.app-main {
  background: var(--color-bg-main);
  padding: 32px 24px;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 24px rgba(34, 42, 54, 0.1);
  min-height: 60vh;
}

.app-footer {
  text-align: center;
  margin-top: 36px;
  padding: 18px;
  font-size: 1em;
  color: var(--color-footer-text);
  border-top: 1px solid var(--color-border);
  background: var(--color-footer-bg);
  border-radius: 0 0 12px 12px;
}

.app-main h2 {
  color: var(--color-logo);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 10px;
  margin-top: 0;
  margin-bottom: 18px;
}

.hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 12px;
  z-index: 1200;
  padding: 0;
}
.hamburger svg {
  width: 32px;
  height: 32px;
  display: block;
  transition: 0.3s;
}
.hamburger .bar {
  fill: var(--color-logo);
  transition: 0.3s;
}
.hamburger svg .bar.top {
  transform-origin: 16px 10.5px;
}
.hamburger svg .bar.bottom {
  transform-origin: 16px 22.5px;
}
.hamburger svg.open .bar.top {
  transform: rotate(45deg) translate(4px, 4px);
}
.hamburger svg.open .bar.middle {
  opacity: 0;
}
.hamburger svg.open .bar.bottom {
  transform: rotate(-45deg) translate(4px, -4px);
}
.app-nav {
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  pointer-events: none;
}
.app-nav.open {
  max-height: 400px;
  opacity: 1;
  pointer-events: auto;
}
@media (min-width: 901px) {
  .app-header {
    flex-direction: row;
    align-items: center;
    padding: 22px 36px;
  }
  .app-nav {
    position: static;
    flex-direction: row;
    gap: 18px;
    background: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    max-height: 100px;
    opacity: 1;
    pointer-events: auto;
    transition: none;
  }
  .app-nav:not(.open) {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }
  .app-nav.open {
    max-height: 100px;
    opacity: 1;
    pointer-events: auto;
  }
  .app-nav a {
    display: block;
    padding: 10px 22px;
    font-size: 1.08em;
    border-radius: 8px;
    margin: 0;
    border-bottom: none;
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.04);
    transition: background 0.18s, color 0.18s;
  }
}
@media (max-width: 700px) {
  #app-container {
    padding: 0 6px;
  }
  .app-header {
    flex-direction: row;
    align-items: center;
    padding: 10px 4px;
    gap: 0;
  }
  .logo {
    font-size: 1.1em;
  }
  .app-nav {
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  .app-nav a {
    padding: 8px 10px;
    font-size: 0.98em;
  }
  .app-main {
    padding: 18px 4px;
    min-height: 40vh;
  }
  .app-footer {
    font-size: 0.95em;
    padding: 10px;
  }
}

@media (max-width: 400px) {
  .logo {
    font-size: 1em;
  }
  .app-header {
    padding: 8px 2px;
  }
  .app-main {
    padding: 8px 0;
  }
}
</style>
