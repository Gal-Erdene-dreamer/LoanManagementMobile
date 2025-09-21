import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { DefaultTheme as PaperTheme } from 'react-native-paper'

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
}

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
}

export const Colors = {
  light: lightTheme.colors,
  dark: darkTheme.colors,
}

export const paperTheme = {
  ...PaperTheme,
  colors: {
    ...PaperTheme.colors,
    ...DefaultTheme.colors,
  },
}
