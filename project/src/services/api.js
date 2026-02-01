const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Safely parse JSON from response (avoids "Unexpected end of JSON input" when body is empty)
async function parseJson(response) {
  const text = await response.text();
  if (!text || text.trim() === '') {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid response from server');
  }
}

// User APIs
export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await parseJson(response);
  if (!response.ok) {
    throw new Error((data && data.message) || 'Registration failed');
  }
  return data;
};

export const getUserByEmail = async (email) => {
  const response = await fetch(`${API_URL}/users/email/${email}`);
  return parseJson(response);
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseJson(response);
  if (!response.ok) {
    throw new Error((data && data.message) || 'Login failed');
  }
  return data;
};

// Booking APIs
export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  const data = await parseJson(response);
  if (!response.ok) {
    throw new Error((data && data.message) || 'Booking failed');
  }
  return data;
};

export const getUserBookings = async (userId) => {
  const response = await fetch(`${API_URL}/bookings/user/${userId}`);
  const data = await parseJson(response);
  if (!response.ok) {
    throw new Error((data && data.message) || 'Failed to load bookings');
  }
  return data ?? [];
};

// Payment APIs
export const createPayment = async (paymentData) => {
  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });
  const data = await parseJson(response);
  if (!response.ok) {
    throw new Error((data && data.message) || 'Payment failed');
  }
  return data;
};

export const getPaymentByBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/payments/booking/${bookingId}`);
  return parseJson(response);
};

export const updatePaymentStatus = async (paymentId, statusData) => {
  const response = await fetch(`${API_URL}/payments/${paymentId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statusData),
  });
  const data = await parseJson(response);
  if (!response.ok) {
    throw new Error((data && data.message) || 'Update failed');
  }
  return data;
}; 