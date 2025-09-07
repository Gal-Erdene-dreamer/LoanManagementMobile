import { View, Text } from 'react-native'
import tw from 'twrnc'
import { useThemeColor } from '../hooks'

export function ThemedView({ style, lightColor, darkColor, ...otherProps }) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}
