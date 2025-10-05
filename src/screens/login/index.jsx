import { View } from 'react-native'
import { ThemedView } from '../../components/ThemedView'
import tw from 'twrnc'
import { useUserStore } from '../../store'
import { ThemedButton } from '../../components/ui/Button'
import { Text, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { authApi } from '../../api'
import { SafeAreaView } from 'react-native-safe-area-context'

function LoginScreen({}) {
  const login = useUserStore(state => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('admin@gmail.com')
  const [password, setPassword] = useState('test1234')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const { data, error } = await authApi.login({ username, password })
    setLoading(false)
    if (!data) {
      console.log('error', error)
      return
    }
    console.log('data', data)
    login()
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
      <ThemedButton disabled={loading} onPress={handleLogin} loading={loading}>
        Login
      </ThemedButton>
    </ThemedView>
  )
}

export default LoginScreen
