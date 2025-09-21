import { Button } from 'react-native-paper'
import { useThemeColor } from '../../hooks'
import tw from 'twrnc'

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  children,
  onPress,
  labelStyle,
  ...otherProps
}) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'button')

  return (
    <Button
      style={[{ color }, style]}
      onPress={onPress}
      labelStyle={[tw`px-4`, labelStyle]}
      {...otherProps}
    >
      {children}
    </Button>
  )
}
