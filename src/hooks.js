import { useConfigStore } from './store'
import { Colors } from './theme'

export function useThemeColor(props, colorName) {
  const theme = useConfigStore(state => state.theme)
  console.log('theme', theme)
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}
