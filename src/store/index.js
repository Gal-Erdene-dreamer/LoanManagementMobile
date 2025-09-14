import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useConfigStore = create()(
  persist(
    set => ({
      theme: 'light',
      setTheme: payload => set({ theme: !!payload }),
    }),
    {
      name: 'config-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export const useUserStore = create()(
  persist(
    set => ({
      isAuthenticated: false,
      setIsAuthenticated: payload => set({ isAuthenticated: !!payload }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
