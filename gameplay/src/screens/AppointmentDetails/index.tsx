import React, { useState, useEffect } from 'react'
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Alert,
  Share,
  Platform,
} from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import BannerImg from '../../assets/banner.png'
import { theme } from '../../global/styles/theme'

import { api } from '../../services/api'

import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { ListHeader } from '../../components/ListHeader'
import { ListDivider } from '../../components/ListDivider'
import { Member, MemberProps } from '../../components/Member'
import { ButtonIcon } from '../../components/ButtonIcon'
import { AppointmentProps } from '../../components/Appointment'
import { Loading } from '../../components/Loading'

import { styles } from './styles'

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string
  name: string
  instant_invite: string
  members: MemberProps[]
}

export function AppointmentDetails() {
  const route = useRoute()
  const { guildSelected } = route.params as Params
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
  const [loading, setLoading] = useState(true)

  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite

    Share.share({
      message,
      url: widget.instant_invite,
    })
  }

  function handleOpenGuild() {
    if (!widget.instant_invite) {
      Alert.alert(
        'Verifique as configurações do servidor. Será que o Widget está habilitado?',
      )
      return
    }
    Linking.openURL(widget.instant_invite)
  }

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`,
      )

      setWidget(response.data)
    } catch (error) {
      Alert.alert(
        'Verifique as configurações do servidor. Será que o Widget está habilitado?',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuildWidget()
  }, [])

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />
          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            contentContainerStyle={{ paddingBottom: 69 }}
            style={styles.members}
          />
          {guildSelected.guild.owner && (
            <View style={styles.footer}>
              <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
            </View>
          )}
        </>
      )}
    </Background>
  )
}
