import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/lib/api'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const res = await api.post('/auth/login', { email, password })
          const { user, token } = res.data.data
          
          // Store in localStorage
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          
          // Set axios default header
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Update state
          set({ user, token, isAuthenticated: true })
          
          console.log('Login successful. User role:', user.role) // Debug log
          return { success: true, user }
        } catch (error) {
          console.error('Login error:', error)
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete api.defaults.headers.common['Authorization']
        set({ user: null, token: null, isAuthenticated: false })
      },

      checkAuth: () => {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            set({ user, token, isAuthenticated: true })
            return true
          } catch (e) {
            console.error('Failed to parse user from localStorage:', e)
            return false
          }
        }
        return false
      }
    }),
    { name: 'auth-storage' }
  )
)

// Create Provider component
export const AuthProvider = ({ children }) => {
  // Check auth on mount
  useState(() => {
    useAuthStore.getState().checkAuth()
  })
  
  return <>{children}</>
}