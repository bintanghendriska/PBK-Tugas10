import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Toast from "../../components/Toast.vue";

describe("Toast Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders message correctly", async () => {
    const message = "Test message";
    const wrapper = mount(Toast, {
      props: { message },
    });

    // Trigger the show method to make toast visible
    await wrapper.vm.show();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain(message);
  });

  it("applies correct type class", async () => {
    const wrapper = mount(Toast, {
      props: {
        message: "Test message",
        type: "success",
      },
    });

    // Trigger the show method to make toast visible
    await wrapper.vm.show();
    await wrapper.vm.$nextTick();

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

  it("clears timer on component destroy", async () => {
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");
    const wrapper = mount(Toast, {
      props: { message: "Test message" },
    });

    // Trigger show to create a timer
    await wrapper.vm.show();
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
