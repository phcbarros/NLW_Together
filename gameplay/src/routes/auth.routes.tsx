import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../screens/Home'
import { SignIn } from '../screens/Signin'

const Stack = createStackNavigator()

export function AuthRoutes() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}
