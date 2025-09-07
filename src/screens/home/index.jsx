import { View, Text } from 'react-native'
import { ThemedView } from '../../components/ThemedView'
import tw from 'twrnc'

function HomeScreen() {
  return (
    <ThemedView style={[tw`flex-1 items-center`]}>
      <Text>HomeScreen</Text>
    </ThemedView>
  )
}

export default HomeScreen
