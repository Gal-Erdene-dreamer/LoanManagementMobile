import { View } from 'react-native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useTheme } from '@react-navigation/native'
import tw from 'twrnc'
import { useConfigStore, useNetworkStore, useUserStore } from '../store'
import { lightTheme, darkTheme } from '../theme'
import HomeScreen from './home'
import ProfileScreen from './profile'
import LoginScreen from './login'
import { useEffect, useRef } from 'react'
import NetInfo from '@react-native-community/netinfo'
import ToastManager, { Toast } from 'toastify-react-native'
import { CustomToast } from '../components/CustomToast'
import { Icon, Text } from 'react-native-paper'
import { BlurView } from '@react-native-community/blur'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const ICONS = {
  Home: 'home',
  Profile: 'account',
  Wallet: 'wallet',
}

const CustomTabIcon = ({ routeName, color, focused, size }) => {
  const iconName = ICONS[routeName]
  return (
    <View style={tw`justify-center items-center`}>
      <Icon source={iconName} size={size} color={color} />
    </View>
  )
}

function HomeTabs() {
  const { colors } = useTheme()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => (
          <CustomTabIcon routeName={route.name} color={color} focused={focused} size={size} />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.border,
        tabBarBackground: () => (
          <BlurView
            style={tw`absolute inset-0`}
            blurType="light"
            blurAmount={25}
            reducedTransparencyFallbackColor="white"
          />
        ),
        tabBarHideOnKeyboard: true,
        headerShown: true,
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 16, fontWeight: 'bold' },
        headerStyle: { height: 'auto' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Tab.Screen
        name="Wallet"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
        }}
      />
    </Tab.Navigator>
  )
}

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerShown: true,
        autoHideHomeIndicator: true,
        headerTitleStyle: tw`text-lg`,
        headerStyle: { height: 'auto' },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerShown: false,
        headerTitleStyle: tw`text-lg`,
        headerStyle: { height: 'auto' },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  )
}

const toastConfig = {
  custom: CustomToast,
  // customError: CustomError,
}

function RootNavigation() {
  const theme = useConfigStore(state => state.theme)
  const isAuthenticated = useUserStore(state => state.isAuthenticated)
  const setIsConnected = useNetworkStore(state => state.setIsConnected)
  const isConnectedBefore = useRef(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state)
      setIsConnected(state.isConnected)
      if (!state.isConnected) {
        // show toast
        Toast.show({
          type: 'custom',
          text1: 'Интернет холболт саллаа!⚠️',
          position: 'bottom',
          autoHide: false,
          props: { color: 'red' },
        })
        isConnectedBefore.current = true
        return
      }
      if (isConnectedBefore.current) {
        // show network resetted
        Toast.show({
          type: 'custom',
          text1: 'Интернет холболт сэргэлээ!🥳',
          position: 'bottom',
          visibilityTime: 2000,
        })
        // for guarantee
        isConnectedBefore.current = false
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const isDark = theme === 'dark'

  return (
    <NavigationContainer theme={isDark ? darkTheme : lightTheme}>
      {isAuthenticated ? <RootStack /> : <AuthStack />}
      <ToastManager
        config={toastConfig}
        theme={isDark ? 'dark' : 'light'}
        showProgressBar={true}
        showCloseIcon={true}
        animationStyle="fade"
      />
    </NavigationContainer>
  )
}

export default RootNavigation
