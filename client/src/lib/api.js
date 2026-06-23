import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// --- Token management (localStorage for persistence across tabs/refreshes) ---
const TOKEN_KEY = 'verve_admin_token';

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Helper to get cookie by name (fallback for local dev)
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Attach Bearer token if available (primary auth method)
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Attach CSRF token as fallback (for cookie-based auth in local dev)
    const csrfToken = getCookie('csrf_token');
    if (csrfToken) {
      config.headers['x-csrf-token'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Something went wrong';
    console.error('[API Error]', message);

    // If we get 401, clear the stored token (session expired / invalid)
    if (error.response?.status === 401) {
      clearAuthToken();
    }

    return Promise.reject(error);
  }
);

export default api;

