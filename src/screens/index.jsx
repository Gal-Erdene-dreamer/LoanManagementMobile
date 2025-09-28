import { View } from 'react-native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { HouseIcon, UserIcon } from 'lucide-react-native'
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

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const ICONS = {
  Home: HouseIcon,
  Profile: UserIcon,
}

const CustomTabIcon = ({ routeName, color, focused, size }) => {
  console.log('hoem', routeName)
  const IconComponent = ICONS[routeName]
  return (
    <View style={tw`justify-center items-center`}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: focused ? '#3b82f6' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent size={size} color={focused ? 'white' : color} />
      </View>
    </View>
  )
}

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => (
          <CustomTabIcon routeName={route.name} color={color} focused={focused} size={size} />
        ),
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          paddingBottom: 0,
          paddingTop: 8,
          height: 60,
          borderRadius: 50,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          marginHorizontal: 16,
          marginBottom: 0,
        },
        tabBarLabel: () => null,
        headerShown: true,
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 16, fontWeight: 'bold' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: '',
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
        headerMode: 'screen',
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerShown: true,
        autoHideHomeIndicator: true,
        headerTitleStyle: { fontSize: 16, fontWeight: 'bold' },
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
        headerMode: 'float',
        headerTitleAlign: 'left',
        headerTransparent: true,
        headerShown: false,
        headerTitleStyle: { fontSize: 16, fontWeight: 'bold' },
        headerStyle: { height: 'auto' },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={
          {
            /* headerShown: true */
          }
        }
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
