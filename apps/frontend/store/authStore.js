import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../lib/api'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const res = await api.post('/auth/login', { email, password })
          const { user, token } = res.data.data
          localStorage.setItem('token', token)
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          set({ user, token, isAuthenticated: true })
          return { success: true }
        } catch (error) {
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']
        set({ user: null, token: null, isAuthenticated: false })
      }
    }),
    { name: 'auth-storage' }
  )
)

export { useAuthStore }