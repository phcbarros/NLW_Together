import React from 'react'
import { View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../../global/styles/theme'

import { styles } from './styles'

type Props = {
  urlImage: string
}

export function Avatar({ urlImage }: Props) {
  const { secondary50, secondary70 } = theme.colors
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary70]}>
        <Image style={styles.avatar} source={{ uri: urlImage }} />
      </LinearGradient>
    </View>
  )
}
