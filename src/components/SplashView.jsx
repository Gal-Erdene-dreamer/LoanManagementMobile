import { View, Text } from 'react-native'
import tw from 'twrnc'

export function SplashView() {
  return (
    <View style={tw`absolute inset-0 justify-center items-center`}>
      <Text>SplashView</Text>
    </View>
  )
}
