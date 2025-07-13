import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Toast from "../../components/Toast.vue";

describe("Toast Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders message correctly", () => {
    const message = "Test message";
    const wrapper = mount(Toast, {
      props: { message },
    });

    expect(wrapper.text()).toContain(message);
  });

  it("applies correct type class", () => {
    const wrapper = mount(Toast, {
      props: {
        message: "Test message",
        type: "success",
      },
    });

    expect(wrapper.classes()).toContain("success");
  });

  it("emits dismiss event after duration", async () => {
    const wrapper = mount(Toast, {
      props: {
        message: "Test message",
        duration: 1000,
      },
    });

    // Trigger the show method
    await wrapper.vm.show();

    // Fast-forward time
    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("dismiss")).toBeTruthy();
  });

  it("clears timer on component destroy", () => {
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");
    const wrapper = mount(Toast, {
      props: { message: "Test message" },
    });

    wrapper.unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it("shows toast when message prop changes", async () => {
    const wrapper = mount(Toast, {
      props: { message: "" },
    });

    await wrapper.setProps({ message: "New message" });

    expect(wrapper.vm.visible).toBe(true);
  });
});
