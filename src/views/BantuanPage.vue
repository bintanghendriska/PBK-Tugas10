<template>
  <div>
    <h2>Bantuan</h2>
    <p>Halaman bantuan. Silakan hubungi admin jika membutuhkan bantuan lebih lanjut.</p>
  </div>
</template>

<script>
export default {
  name: "BantuanPage",
};
</script>

<style scoped>
.bantuan-container {
  max-width: 600px;
  margin: 32px auto;
  padding: 32px 28px;
  background: var(--color-bg-main);
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(34, 42, 54, 0.1);
  border: 1px solid var(--color-border);
  color: var(--color-main-text);
}
.bantuan-container h2 {
  color: var(--color-logo);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 10px;
  margin-top: 0;
  margin-bottom: 18px;
}
</style>
