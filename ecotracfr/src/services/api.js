// src/services/api.js
const BASE_URL = 'http://localhost:8080';

// =====================
// AUTH HELPERS
// =====================
export const getAuthToken = () => localStorage.getItem('token');

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// =====================
// GENERIC FETCH WRAPPER
// =====================
const fetchAPI = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred';

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {}

    const isAuthError = (response.status === 401 || response.status === 403) && token;

    if (isAuthError) {
      const authError = new Error(errorMessage);
      authError.status = response.status;
      authError.isAuthError = true;
      throw authError;
    }

    throw new Error(errorMessage);
  }

  return response.json();
};

// =====================
// AUTH API
// =====================
export const authAPI = {
  register: (userData) =>
    fetchAPI('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (email, password) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// =====================
// WORKSHOP API (PUBLIC + ADMIN)
// =====================
export const workshopAPI = {
  // PUBLIC
  getAll: () => fetchAPI('/workshops'),
  getById: (id) => fetchAPI(`/workshops/${id}`),

  // ADMIN (JWT REQUIRED)
  create: (workshopData) =>
    fetchAPI('/workshops', {
      method: 'POST',
      body: JSON.stringify(workshopData),
    }),

  update: (id, workshopData) =>
    fetchAPI(`/workshops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workshopData),
    }),

  remove: (id) =>
    fetchAPI(`/workshops/${id}`, {
      method: 'DELETE',
    }),
};

// =====================
// ENROLLMENT API
// =====================
export const enrollmentAPI = {
  enroll: (userId, workshopId) =>
    fetchAPI(`/enroll/${userId}/enroll/${workshopId}`, {
      method: 'POST',
    }),

  confirm: (razorpayOrderId, razorpayPaymentId, razorpaySignature) =>
    fetchAPI('/enroll/confirm', {
      method: 'POST',
      body: JSON.stringify({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      }),
    }),
};

// =====================
// ADMIN API
// =====================
export const adminAPI = {
  // WorkShop Management
  createWorkshop: (workshopData) =>
    fetchAPI('/admin/workshops', {
      method: 'POST',
      body: JSON.stringify(workshopData),
    }),

  updateWorkshop: (id, workshopData) =>
    fetchAPI(`/admin/workshops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workshopData),
    }),

  deleteWorkshop: (id) =>
    fetchAPI(`/admin/workshops/${id}`, {
      method: 'DELETE',
    }),

  // Get all enrollments
  getAllEnrollments: () => fetchAPI('/admin/enrollments'),

  // Get all users
  getAllUsers: () => fetchAPI('/admin/users'),
};
