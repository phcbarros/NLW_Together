import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from '../global/styles/theme'

import { Home } from '../screens/Home'
import { SignIn } from '../screens/Signin'
import { AppointmentDetails } from '../screens/AppointmentDetails'
import { AppointmentCreate } from '../screens/AppointmentCreate'

const Stack = createStackNavigator()

export function AuthRoutes() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
        },
      }}>
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen name="AppointmentCreate" component={AppointmentCreate} />
    </Stack.Navigator>
  )
}
