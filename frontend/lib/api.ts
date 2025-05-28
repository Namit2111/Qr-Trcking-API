const API_URL = 'http://localhost:8000';

export interface User {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface SignupData {
  email: string;
  name: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const api = {
  async signup(data: SignupData): Promise<User> {
    const response = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to sign up');
    }

    return response.json();
  },

  async login(data: LoginData): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to login');
    }

    return response.json();
  },
}; 