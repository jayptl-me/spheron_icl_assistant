import axios from 'axios';

// Get the API base URL from environment variables or use localhost as fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create and configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout for potential YAML generation
});

// Request interceptor for handling authentication if needed later
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common error cases
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes or add global error handling
    if (error.response?.status === 429) {
      console.warn('Rate limit exceeded');
    }
    return Promise.reject(error);
  }
);

// Chat API functions
export const chatAPI = {
  // Send message to get response and optional YAML
  sendMessage: async (message: string) => {
    try {
      const response = await apiClient.post('/api/chat', { message });
      return response.data;
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    }
  }
};

export default apiClient;
