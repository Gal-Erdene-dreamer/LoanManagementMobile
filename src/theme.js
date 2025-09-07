import { DefaultTheme, DarkTheme } from '@react-navigation/native'

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
