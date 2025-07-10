<template>
  <transition name="toast-fade">
    <div v-if="visible" :class="['toast', type]">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: String,
    type: {
      type: String,
      default: "info",
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    message(newVal) {
      if (newVal) this.show();
    },
  },
  methods: {
    show() {
      this.visible = true;
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.visible = false;
        this.$emit("dismiss");
      }, this.duration);
    },
  },
  beforeDestroy() {
    clearTimeout(this._timer);
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 30px;
  right: 30px;
  min-width: 220px;
  padding: 16px 28px;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1em;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 9999;
  opacity: 0.95;
  transition: all 0.3s;
}
.toast.success {
  background: #42b983;
}
.toast.error {
  background: #e74c3c;
}
.toast.info {
  background: #3498db;
}
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.toast-fade-enter,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
