// AuthService.js

// Fungsi untuk menyimpan token ke localStorage
const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token);
};

// Fungsi untuk mengambil token dari localStorage
const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

// Fungsi untuk menghapus token dari localStorage
const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
};

export {
    saveTokenToLocalStorage,
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage,
};
