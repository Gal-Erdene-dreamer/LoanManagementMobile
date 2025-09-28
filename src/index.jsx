/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import tw from 'twrnc'
import RootNavigation from './screens'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { paperTheme } from './theme'
import { useUserStore } from './store'
import { SplashView } from './components/SplashView'

function App() {
  const isHydrated = useUserStore(state => state.isHydrated)
  useEffect(() => {
    SystemNavigationBar.stickyImmersive()
  }, [])

  if (!isHydrated) {
    return <SplashView />
  }

  return (
    <PaperProvider theme={paperTheme} settings={{ rippleEffectEnabled: true }}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </PaperProvider>
  )
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets()

  return (
    <SafeAreaView style={[tw`flex-1`]}>
      <GestureHandlerRootView>
        <RootNavigation />
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default App
