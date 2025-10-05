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
      token: null,
      setToken: token => set({ token }),
      user: null,
      setUser: user => set({ user }),
      isHydrated: false,
      setIsHydrated: value => set({ isHydrated: !!value }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: state => () => {
        return state.setIsHydrated(true)
      },
    }
  )
)

export const useNetworkStore = create()(
  persist(
    set => ({
      isConnected: false,
      setIsConnected: p => set({ isConnected: !!p }),
    }),
    {
      name: 'network-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
