import axios from 'axios'

// Use environment variable for API URL, fallback to relative path for local development
const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api'

const api = axios.create({
  baseURL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('API Request:', config.method.toUpperCase(), config.url) // Helpful for debugging
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.config?.url, error.response?.data)
    
    // Handle 401 unauthorized errors (token expired)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // Optionally redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export { api }