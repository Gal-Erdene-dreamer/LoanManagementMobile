import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
// import AsyncStorage from '@react-native-async-storage/async-storage'

export const useConfigStore = create()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (payload) => set({ theme: !!payload }),
    }),
    {
      name: 'config-storage',
      // storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
