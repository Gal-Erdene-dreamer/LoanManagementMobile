import { View, Text } from 'react-native'
import { ThemedView } from '../../components/ThemedView'
import { ThemedText } from '../../components/ThemedText'
import { ThemedButton } from '../../components/ui/Button'
import tw from 'twrnc'
import { Avatar } from 'react-native-paper'
import { useUserStore } from '../../store'

function ProfileScreen() {
  const setIsAuthenticated = useUserStore(state => state.setIsAuthenticated)
  const logout = () => {
    console.log('logout')
    setIsAuthenticated(false)
  }
  return (
    <ThemedView style={tw`flex-1`}>
      <ThemedText>ProfileScreen</ThemedText>
      <Avatar.Icon icon={'face-woman-profile'} color="red" style={tw`bg-secondary`} />
      <ThemedButton onPress={logout}>
        <Text>jsdjsdj</Text>
      </ThemedButton>
    </ThemedView>
  )
}

export default ProfileScreen
