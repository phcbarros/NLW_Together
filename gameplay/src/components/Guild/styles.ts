import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  title: {
    fontFamily: theme.fonts.title700,
    fontSize: 18,
    lineHeight: 23,
    color: theme.colors.heading,
    marginBottom: 4,
  },
  type: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    lineHeight: 17,
    color: theme.colors.heading,
  },
})
