export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:1198/api").replace(/\/+$/, "");
export const TOKEN_STORAGE_KEY = "search-using-api-token";

export function getSavedToken() {
    try {
        return window.localStorage.getItem(TOKEN_STORAGE_KEY) || "";
    } catch {
        return "";
    }
}

export function saveToken(token) {
    try {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
        return true;
    } catch {
        return false;
    }
}

export function clearSavedToken() {
    try {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
        // Storage may be disabled; the in-memory token state still clears.
    }
}

export async function requestJson(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, options);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(data.message || `Request failed (${response.status})`);
        error.status = response.status;
        throw error;
    }

    return data;
}
