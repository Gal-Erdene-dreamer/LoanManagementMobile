import { View } from 'react-native'
import { ThemedView } from '../../components/ThemedView'
import tw from 'twrnc'
import { useUserStore } from '../../store'
import { ThemedButton } from '../../components/ui/Button'
import { Text, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { authApi } from '../../api'

function LoginScreen({}) {
  const { setIsAuthenticated, setToken } = useUserStore()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    const { data, error } = await authApi.login({ username, password })
    setLoading(false)
    if (!data) {
      console.log('error', error)
      return
    }
    setIsAuthenticated(true)
    setToken('ets12')
  }
  return (
    <ThemedView hasHeaderTitle style={[tw`flex-1 justify-center px-4 gap-4 items-center`]}>
      <TextInput
        mode="outlined"
        label={'username'}
        value={username}
        onChangeText={setUsername}
        style={tw`flex-row`}
      />
      <TextInput
        mode="outlined"
        label={'password'}
        value={password}
        onChangeText={setPassword}
        style={tw`flex-row`}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye' : 'eye-off'}
            onPress={() => setShowPassword(prev => !prev)}
          />
        }
      />
      <ThemedButton disabled={loading} onPress={login} uppercase loading={loading}>
        Login
      </ThemedButton>
    </ThemedView>
  )
}

export default LoginScreen
