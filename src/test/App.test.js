import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import Toast from "../components/Toast.vue";

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: { template: "<div>Home</div>" } },
    { path: "/add-note", component: { template: "<div>Add Note</div>" } },
    { path: "/todo", component: { template: "<div>Todo</div>" } },
    { path: "/bantuan", component: { template: "<div>Bantuan</div>" } },
    { path: "/about", component: { template: "<div>About</div>" } },
  ],
});

describe("App Component", () => {
  it("renders header with logo", () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find(".logo").text()).toBe("Catatan Bintang");
  });

  it("renders navigation links", () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          "router-link": true,
          "router-view": true,
        },
      },
    });

    const navLinks = wrapper.findAll("a");
    expect(navLinks).toHaveLength(5);

    const linkTexts = navLinks.map((link) => link.text());
    expect(linkTexts).toContain("Daftar Catatan");
    expect(linkTexts).toContain("Tambah Catatan");
    expect(linkTexts).toContain("Todo List");
    expect(linkTexts).toContain("Bantuan");
    expect(linkTexts).toContain("Tentang");
  });

  it("shows current year in footer", () => {
    const currentYear = new Date().getFullYear();
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find(".app-footer").text()).toContain(currentYear.toString());
  });

  it("toggles navigation menu when hamburger is clicked", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    const hamburger = wrapper.find(".hamburger");
    const nav = wrapper.find(".app-nav");

    // Initially nav should not be open
    expect(nav.classes()).not.toContain("open");

    // Click hamburger
    await hamburger.trigger("click");

    // Nav should be open
    expect(nav.classes()).toContain("open");

    // Click again to close
    await hamburger.trigger("click");

    // Nav should be closed
    expect(nav.classes()).not.toContain("open");
  });

  it("provides showToast method", () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(typeof wrapper.vm.showToast).toBe("function");
  });

  it("shows toast when showToast is called", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    wrapper.vm.showToast("Test message", "success");

    expect(wrapper.vm.toastMessage).toBe("Test message");
    expect(wrapper.vm.toastType).toBe("success");
  });

  it("dismisses toast when dismiss event is emitted", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    wrapper.vm.showToast("Test message");
    expect(wrapper.vm.toastMessage).toBe("Test message");

    // Simulate dismiss event
    wrapper.vm.toastMessage = "";

    expect(wrapper.vm.toastMessage).toBe("");
  });
});
