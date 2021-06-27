import React, { useState, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Appointment, AppointmentProps } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CaterorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Profile } from '../../components/Profile'
import { Background } from '../../components/Background'
import { Loading } from '../../components/Loading'
import { styles } from './styles'

import { COLLECTION_APPOINTMENTS } from '../../configs/database'

export function Home() {
  const navigation = useNavigation()
  const [category, setCategory] = useState('')
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])
  const [loading, setLoading] = useState(true)

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', {
      guildSelected,
    })
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    try {
      const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
      const storage: AppointmentProps[] = response ? JSON.parse(response) : []

      if (category) {
        setAppointments(storage.filter((item) => item.category === category))
      } else {
        setAppointments(storage)
      }
    } catch (error) {
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments()
    }, [category]),
  )

  return (
    <Background>
      <View style={styles.header}>
        <Profile></Profile>
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }} // respiro quando rolar a lista até o final
          />
        </>
      )}
    </Background>
  )
}
