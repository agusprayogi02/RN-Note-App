import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './src/Screens/HomeScreen'
import TambahScreen from './src/Screens/TambahScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tambah" component={TambahScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
