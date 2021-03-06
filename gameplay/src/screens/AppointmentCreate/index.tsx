import React, { useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'

import { theme } from '../../global/styles/theme'
import { Header } from '../../components/Header'
import { CategorySelect } from '../../components/CaterorySelect'
import { GuildIcon } from '../../components/GuildIcon'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { Background } from '../../components/Background'
import { ModalView } from '../../components/ModalView'
import { GuildProps } from '../../components/Guild'
import { Guilds } from '../Guilds'
import { COLLECTION_APPOINTMENTS } from '../../configs/database'
import { AppointmentProps } from '../../components/Appointment'

import { styles } from './styles'

export function AppointmentCreate() {
  const navigation = useNavigation()
  const [category, setCategory] = useState('')
  const [openGuildsModal, setOpenGuildsModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [description, setDescription] = useState('')

  function handleOpenGuilds() {
    setOpenGuildsModal(true)
  }

  function handleCloseGuilds() {
    setOpenGuildsModal(false)
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect)
    setOpenGuildsModal(false)
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId)
  }

  async function handleSave() {
    if (
      !validate({
        category,
        guild,
        day,
        month,
        hour,
        minute,
      })
    )
      return

    const newAppointment: AppointmentProps = {
      id: uuid.v4() as string,
      guild,
      category,
      date: `${day}/${month} ??s ${hour}:${minute}h`,
      description,
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const appointments = storage ? JSON.parse(storage) : []

    AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment]),
    )

    navigation.navigate('Home')
  }

  function validate(data: {
    category: string
    guild: GuildProps
    day: string
    month: string
    hour: string
    minute: string
  }) {
    return Object.values(data).filter((value) => value).length === 6
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Background>
        <ScrollView>
          <Header title="Agendar partida" />
          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}>
            Categoria
          </Text>
          <CategorySelect
            hasCheckBox
            categorySelected={category}
            setCategory={handleCategorySelect}
          />
          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  size={18}
                  color={theme.colors.heading}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e m??s
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    value={day}
                    //onChangeText={(text) => handleSetData(text, Fields.day)}
                    onChangeText={setDay}
                  />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput
                    maxLength={2}
                    value={month}
                    //onChangeText={(text) => handleSetData(text, Fields.month)}
                    onChangeText={setMonth}
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    value={hour}
                    //onChangeText={(text) => handleSetData(text, Fields.hour)}
                    onChangeText={setHour}
                  />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput
                    maxLength={2}
                    value={minute}
                    //onChangeText={(text) => handleSetData(text, Fields.minute)}
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descri????o</Text>
              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              value={description}
              //onChangeText={(text) => handleSetData(text, Fields.description)}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  )
}
