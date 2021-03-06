import React from 'react'
import { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'

import { Guild, GuildProps } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'
import { Loading } from '../../components/Loading'
import { api } from '../../services/api'

import { styles } from './styles'

type Props = {
  handleGuildSelect: (guild: GuildProps) => void
}

export function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchGuilds() {
    try {
      const response = await api.get('/users/@me/guilds')

      setGuilds(response.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuilds()
  }, [])

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildSelect(item)} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          style={styles.guilds}
          contentContainerStyle={{ paddingBottom: 68 }}
          //contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
          //ListHeaderComponent={() => <ListDivider isCentered />}
        />
      )}
    </View>
  )
}

export default Guilds
