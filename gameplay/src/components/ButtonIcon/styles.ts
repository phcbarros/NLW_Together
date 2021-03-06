import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRightColor: theme.colors.line,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 18,
    width: 24,
  },
  title: {
    flex: 1,
    color: theme.colors.heading,
    fontSize: 15,
    fontFamily: theme.fonts.text500,
    lineHeight: 25,
    textAlign: 'center',
  },
})
