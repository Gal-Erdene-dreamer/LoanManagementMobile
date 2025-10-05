import { View, Text } from 'react-native'
import { ThemedView } from '../../components/ThemedView'
import { ThemedText } from '../../components/ThemedText'
import { ThemedButton } from '../../components/ui/Button'
import tw from 'twrnc'
import { Avatar, Card, TextInput } from 'react-native-paper'
import { useUserStore } from '../../store'
import { useState } from 'react'

function ProfileScreen() {
  const logout = useUserStore(state => state.logout)
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    setLoading(true)
    logout()
    setLoading(false)
  }

  return (
    <ThemedView hasHeaderTitle style={[tw`flex-1 items-center px-4 gap-4`]}>
      {/* <ThemedText style={tw`text-center text-lg`}>ProfileScreen</ThemedText> */}
      <Avatar.Icon icon={'face-woman-profile'} color="#fff" style={tw`bg-green-400`} />
      <View style={tw`w-full`}>
        <TextInput label="test" mode="outlined" style={tw``} />
      </View>
      <Card style={tw`w-full p-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-base font-bold`}>Balance</Text>
          <Text style={tw`text-base font-bold`}>$0.00</Text>
        </View>
      </Card>
      <ThemedButton loading={loading} onPress={handleLogout}>
        logout
      </ThemedButton>
    </ThemedView>
  )
}

export default ProfileScreen
