# Simple Notes App

Aplikasi catatan sederhana yang dibangun dengan Vue.js 3, Vite, dan Pinia untuk state management. Aplikasi ini memungkinkan pengguna untuk membuat, mengelola, dan mengorganisir catatan serta todo list dengan antarmuka yang responsif dan user-friendly.

## 🚀 Fitur Utama

### 📝 Manajemen Catatan

- **Buat Catatan Baru**: Tambahkan catatan dengan judul dan konten
- **Lihat Daftar Catatan**: Tampilkan semua catatan dalam format yang rapi
- **Edit Catatan**: Modifikasi catatan yang sudah ada
- **Hapus Catatan**: Hapus catatan yang tidak diperlukan
- **Pencarian**: Cari catatan berdasarkan judul atau konten

### ✅ Todo List

- **Tambah Todo**: Buat item todo baru
- **Tandai Selesai**: Toggle status selesai/belum selesai
- **Edit Todo**: Modifikasi teks todo
- **Hapus Todo**: Hapus item todo yang tidak diperlukan
- **Filter Status**: Tampilkan todo berdasarkan status

### 🎨 Antarmuka Pengguna

- **Responsive Design**: Berfungsi optimal di desktop, tablet, dan mobile
- **Modern UI**: Desain yang clean dan modern dengan gradient background
- **Toast Notifications**: Feedback visual untuk aksi pengguna
- **Navigation**: Menu navigasi yang mudah digunakan
- **Loading States**: Indikator loading untuk operasi async

## 🛠️ Teknologi yang Digunakan

### Frontend

- **Vue.js 3**: Framework JavaScript progresif
- **Vite**: Build tool yang cepat
- **Vue Router**: Client-side routing
- **Pinia**: State management yang modern
- **CSS3**: Styling dengan CSS custom properties

### Backend & Data

- **JSON Server**: Mock REST API untuk development
- **Local Storage**: Penyimpanan data sementara

### Testing

- **Vitest**: Unit testing framework
- **Vue Test Utils**: Testing utilities untuk Vue
- **jsdom**: DOM environment untuk testing

## 📁 Struktur Project

```
simple-notes-app/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images dan assets
│   ├── components/        # Vue components
│   │   └── Toast.vue     # Toast notification component
│   ├── router/           # Vue router configuration
│   │   └── index.js
│   ├── stores/           # Pinia stores
│   │   ├── noteStore.js  # State management untuk notes
│   │   └── todoStore.js  # State management untuk todos
│   ├── test/             # Test files
│   │   ├── setup.js      # Global test setup
│   │   ├── App.test.js   # Tests untuk App component
│   │   ├── components/   # Component tests
│   │   └── stores/       # Store tests
│   ├── views/            # Page components
│   │   ├── NoteList.vue  # Halaman daftar catatan
│   │   ├── AddNotePage.vue # Halaman tambah catatan
│   │   ├── TodoPage.vue  # Halaman todo list
│   │   ├── AboutPage.vue # Halaman tentang
│   │   └── BantuanPage.vue # Halaman bantuan
│   ├── App.vue           # Root component
│   ├── main.js           # Entry point
│   └── style.css         # Global styles
├── db.json               # JSON Server database
├── package.json          # Dependencies dan scripts
├── vite.config.js        # Vite configuration
├── vitest.config.js      # Vitest configuration
└── TESTING.md           # Dokumentasi testing
```

## 🚀 Cara Menjalankan Project

### Prerequisites

- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Installation

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd simple-notes-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Jalankan development server**

   ```bash
   npm run dev
   ```

4. **Jalankan JSON Server (di terminal terpisah)**

   ```bash
   npm run json-server
   ```

5. **Buka browser**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001

## 🧪 Testing

### Menjalankan Tests

```bash
# Semua tests (watch mode)
npm test

# Tests sekali jalan
npm run test:run

# Tests dengan UI
npm run test:ui
```

### Coverage Testing

- **Components**: App.vue, Toast.vue
- **Stores**: noteStore.js, todoStore.js
- **User Interactions**: Navigation, form submissions, CRUD operations

## 📱 Pages & Routes

### `/` - Daftar Catatan

- Menampilkan semua catatan
- Fitur pencarian
- Aksi edit dan hapus

### `/add-note` - Tambah Catatan

- Form untuk membuat catatan baru
- Validasi input
- Redirect ke daftar setelah berhasil

### `/todo` - Todo List

- Manajemen todo items
- Toggle status selesai
- Filter berdasarkan status

### `/bantuan` - Bantuan

- Panduan penggunaan aplikasi
- FAQ dan troubleshooting

### `/about` - Tentang

- Informasi tentang aplikasi
- Teknologi yang digunakan

## 🎨 Design System

### Color Palette

- **Primary**: #42b983 (Vue Green)
- **Background**: #e0eafc (Light Blue)
- **Header**: #222a36 (Dark Gray)
- **Text**: #222 (Dark Gray)
- **Success**: #42b983 (Green)
- **Error**: #e74c3c (Red)
- **Info**: #3498db (Blue)

### Typography

- **Font Family**: Segoe UI, Arial, sans-serif
- **Responsive**: Font size menyesuaikan screen size

### Components

- **Cards**: Rounded corners dengan shadow
- **Buttons**: Hover effects dan transitions
- **Forms**: Clean input styling
- **Navigation**: Responsive hamburger menu

## 🔧 Configuration

### Environment Variables

- `VITE_API_URL`: URL untuk API (default: http://localhost:3001)

### Build Configuration

- **Vite**: Optimized build untuk production
- **Vue**: Composition API dengan script setup
- **Router**: History mode dengan fallback

## 🚀 Deployment

### Build untuk Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Project ini dibuat untuk keperluan pembelajaran dan sebagai tugas Akhir Semester 4

## 👨‍💻 Developer

**Bintang Hendriska Valen** - Mahasiswa Kelas 4G

---

**Note**: Aplikasi ini menggunakan JSON Server sebagai mock API. Untuk production, ganti dengan backend yang sesuai.
