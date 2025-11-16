// Data untuk Dashboard
const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

// Data untuk List Data Produk
let products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 },
];

// --- FUNGSI UTAMA ---
document.addEventListener('DOMContentLoaded', () => {
    // Logika Halaman Login (index.html)
    if (document.body.classList.contains('login-page')) {
        handleLogin();
    }

    // Logika Halaman Dashboard (dashboard.html)
    if (document.body.classList.contains('dashboard-page')) {
        displayDashboardSummary();
    }

    // Logika Halaman Produk (products.html)
    if (document.body.classList.contains('products-page')) {
        renderProductTable(products);
    }
});

// --- FUNGSI LOGIN ---
function handleLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim(); // Ini adalah NIM

        // 1. Validasi tidak boleh kosong
        if (email === "" || password === "") {
            alert("Email dan Password (NIM) tidak boleh kosong!");
            return;
        }

        // 2. Simulasikan Login Berhasil
        alert("Login berhasil!");

        // 3. Redirect ke dashboard.html
        window.location.href = "dashboard.html";
    });
}

// --- FUNGSI DASHBOARD ---
function displayDashboardSummary() {
    // Fungsi untuk memformat angka menjadi Rupiah (Rp)
    const formatRupiah = (number) => {
        // Menggunakan Intl.NumberFormat untuk format Rp 12.500.000
        return "Rp " + new Intl.NumberFormat('id-ID').format(number);
    };

    // Ambil elemen DOM
    const totalProductsEl = document.querySelector('#cardTotalProducts .data-value');
    const totalSalesEl = document.querySelector('#cardTotalSales .data-value');
    const totalRevenueEl = document.querySelector('#cardTotalRevenue .data-value');

    // Tampilkan data
    totalProductsEl.textContent = summary.totalProducts;
    totalSalesEl.textContent = summary.totalSales;
    totalRevenueEl.textContent = formatRupiah(summary.totalRevenue);
}

// --- FUNGSI PRODUK ---
function renderProductTable(data) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = ''; // Kosongkan tabel

    // Gunakan forEach() untuk mengiterasi data produk
    data.forEach((product, index) => {
        const row = tableBody.insertRow();
        row.dataset.id = product.id;

        // Fungsi untuk memformat harga
        const formatPrice = (number) => new Intl.NumberFormat('id-ID').format(number);

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${formatPrice(product.price)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn-action edit" onclick="editProduct('${product.name}')">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn-action delete" data-id="${product.id}" onclick="deleteProduct(this)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
    });
}

// Fungsi Aksi Edit
function editProduct(name) {
    alert(`Edit produk (${name})`); // Tampilkan alert sesuai spesifikasi
}

// Fungsi Aksi Delete
function deleteProduct(deleteButton) {
    // Konfirmasi hapus
    if (confirm("Yakin hapus produk ini?")) {
        const idToDelete = parseInt(deleteButton.getAttribute('data-id'));

        // Hapus data dari array products
        products = products.filter(product => product.id !== idToDelete);

        // Render ulang tabel agar nomor urut (No) diperbarui
        renderProductTable(products);
    }
}
