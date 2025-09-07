/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, Text, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import tw from 'twrnc'
import RootNavigation from './screens'

function App() {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
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
