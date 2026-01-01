// src/api/api.js

// const BASE_URL = "http://localhost:5000/api";
// export const IMAGE_URL = "http://localhost:5000";
const BASE_URL = "https://cart-backend-s1wz.onrender.com/api";
export const IMAGE_URL = "https://cart-backend-s1wz.onrender.com";

/**
 * Generic request helper
 */
async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API request failed");
  }

  return response.json();
}

/**
 * HTTP methods
 */
export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (endpoint, body) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
};
