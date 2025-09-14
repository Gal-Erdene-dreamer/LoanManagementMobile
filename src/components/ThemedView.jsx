import { View, Text } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import tw from 'twrnc'
import { useThemeColor } from '../hooks'

export function ThemedView({
  style,
  hasHeaderTitle = false,
  lightColor,
  darkColor,
  ...otherProps
}) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  const headerHeight = useHeaderHeight()
  const paddingTop = hasHeaderTitle ? headerHeight : 0

  return <View style={[{ backgroundColor, paddingTop }, style]} {...otherProps} />
}
