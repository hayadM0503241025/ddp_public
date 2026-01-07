import axios from 'axios';

// SOP: Alamat dinamis dari Vercel Environment Variables
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"; 

export const api = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': '69420' // Bypass layar biru Ngrok
    }
});

// FUNGSI PINTAR GAMBAR: Otomatis merubah alamat mengikuti link API yang aktif
export const getStorageUrl = (path: any) => {
    if (!path) return "/img/placeholder.png"; 
    
    // Jika data adalah array (multiple), ambil yang pertama
    let targetPath = Array.isArray(path) ? path[0] : path;

    if (typeof targetPath !== 'string') return "/img/placeholder.png";
    
    const cleanPath = targetPath.replace('public/', '');
    
    // Inovasi: Mengubah /api menjadi /storage pada link aktif (Ngrok atau Localhost)
    const storageBase = BASE_URL.replace('/api', '/storage');
    
    return `${storageBase}/${cleanPath}`;
};