import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './src/Screens/HomeScreen'
import FingerPrintScreen from './src/Screens/FingerPrintScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Fingerprint">
        <Stack.Screen name="FingerPrint" component={FingerPrintScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerTransparent: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
