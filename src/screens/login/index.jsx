import { View, Text, TouchableOpacity } from 'react-native'
import { ThemedView } from '../../components/ThemedView'
import tw from 'twrnc'
import { useUserStore } from '../../store'

function LoginScreen({}) {
  const setIsAuthenticated = useUserStore(state => state.setIsAuthenticated)
  return (
    <ThemedView style={[tw`flex-1 items-center`]}>
      <Text>AuthScreen</Text>
      <TouchableOpacity onPress={() => setIsAuthenticated(true)}>
        <Text>ksdksd</Text>
      </TouchableOpacity>
    </ThemedView>
  )
}

export default LoginScreen
