// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Impor komponen view yang akan kita buat nanti
import NoteList from "../views/NoteList.vue";
import AddNotePage from "../views/AddNotePage.vue";
import AboutPage from "../views/AboutPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import BantuanPage from "../views/BantuanPage.vue";

const routes = [
  {
    path: "/",
    name: "NoteList",
    component: NoteList,
  },
  {
    path: "/add-note",
    name: "AddNote",
    component: AddNotePage,
  },
  {
    path: "/about",
    name: "AboutApp", // Sesuaikan dengan nama yang konsisten jika berbeda dari contoh sebelumnya
    component: AboutPage,
  },
  {
    path: "/todo",
    name: "TodoList",
    component: () => import("../views/TodoPage.vue"),
  },
  {
    path: "/bantuan",
    name: "Bantuan",
    component: BantuanPage,
  },
  // Rute Not Found (selalu di akhir)
  {
    path: "/:pathMatch(.*)*", // Ini menangkap semua path yang tidak cocok
    name: "NotFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Menggunakan mode history HTML5
  routes, // Sama dengan routes: routes
  linkActiveClass: "active-nav-link", // Kelas CSS untuk link yang aktif
  linkExactActiveClass: "exact-active-nav-link", // Kelas CSS untuk link yang aktif secara eksak
  scrollBehavior(to, from, savedPosition) {
    // Selalu scroll ke atas saat navigasi halaman baru
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
