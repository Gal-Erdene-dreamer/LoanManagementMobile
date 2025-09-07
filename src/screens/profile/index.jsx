import { View, Text } from 'react-native'
import { ThemedView } from '../../components/ThemedView'
import tw from 'twrnc'

function ProfileScreen() {
  return (
    <ThemedView style={tw`flex-1`}>
      <Text>ProfileScreen</Text>
    </ThemedView>
  )
}

export default ProfileScreen
