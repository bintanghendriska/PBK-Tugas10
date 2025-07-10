<template>
  <div class="bantuan-container">
    <h2>Pusat Bantuan & FAQ</h2>
    <h3>Pertanyaan yang Sering Diajukan</h3>
    <ul class="faq-list">
      <li>
        <strong>Bagaimana cara menambah catatan?</strong>
        <p>Klik menu "Tambah Catatan", isi judul dan isi catatan, lalu klik "Simpan Catatan".</p>
      </li>
      <li>
        <strong>Bagaimana cara menggunakan Todo List?</strong>
        <p>Pilih menu "Todo List", tambahkan tugas baru, centang jika sudah selesai, atau edit dan hapus sesuai kebutuhan.</p>
      </li>
      <li>
        <strong>Apakah data saya aman?</strong>
        <p>Data disimpan di database lokal (JSON Server) pada komputer Anda sendiri, sehingga hanya Anda yang bisa mengaksesnya.</p>
      </li>
      <li>
        <strong>Mengapa catatan/todo saya hilang setelah refresh?</strong>
        <p>Pastikan JSON Server berjalan. Jika tidak, data tidak bisa diambil/diproses.</p>
      </li>
    </ul>
    <h3>Kontak Bantuan</h3>
    <p>Jika masih ada pertanyaan atau kendala, silakan hubungi:</p>
    <ul>
      <li>Email: <a href="mailto:support@catatanbintang.com">support@catatanbintang.com</a></li>
      <li>WhatsApp: <a href="https://wa.me/6281234567890" target="_blank">+62 812-3456-7890</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BantuanPage",
};
</script>

<style scoped>
.bantuan-container {
  max-width: 700px;
  margin: 32px auto;
  padding: 32px 28px;
  background: var(--color-bg-main);
  border-radius: 12px;
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
.bantuan-container h3 {
  margin-top: 24px;
  color: var(--color-header);
}
.faq-list {
  list-style: disc inside;
  margin-bottom: 18px;
  padding-left: 0;
}
.faq-list li {
  margin-bottom: 14px;
}
.faq-list strong {
  color: var(--color-logo);
}
.bantuan-container a {
  color: var(--color-logo);
  text-decoration: underline;
}
.bantuan-container a:hover {
  color: #2563eb;
}
</style>
