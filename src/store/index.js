import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
// import AsyncStorage from '@react-native-async-storage/async-storage'

export const useConfigStore = create()(
  persist(
    (set, get) => ({
      isDark: false,
      addABear: (payload) => set({ isDark: !!payload }),
    }),
    {
      name: 'config-storage',
      // storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
