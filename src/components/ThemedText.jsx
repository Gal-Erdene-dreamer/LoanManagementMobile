import { Text } from 'react-native'
import tw from 'twrnc'
import { useThemeColor } from '../hooks'

const TEXT_TYPES = {
  small: tw`text-xs`,
  default: tw`text-sm`,
  base: tw`text-base`,
  subtitle: tw`text-lg font-bold`,
  title: tw`text-3xl font-bold`,
}

export function ThemedText({ style, lightColor, darkColor, type = 'default', ...otherProps }) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <Text style={[{ color }, TEXT_TYPES[type], style]} {...otherProps} />
}
