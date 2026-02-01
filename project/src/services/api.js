const API_URL = import.meta.env.VITE_API_URL;

// User APIs
export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
};

export const getUserByEmail = async (email) => {
  const response = await fetch(`${API_URL}/api/users/email/${email}`);
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
};

// Booking APIs
export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  return response.json();
};

export const getUserBookings = async (userId) => {
  const response = await fetch(`${API_URL}/api/bookings/user/${userId}`);
  return response.json();
};

// Payment APIs
export const createPayment = async (paymentData) => {
  const response = await fetch(`${API_URL}/api/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  return response.json();
};

export const getPaymentByBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/payments/booking/${bookingId}`);
  return response.json();
};

export const updatePaymentStatus = async (paymentId, statusData) => {
  const response = await fetch(
    `${API_URL}/api/payments/${paymentId}/status`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statusData),
    }
  );
  return response.json();
};
