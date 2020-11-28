import React, {Component} from 'react';
import { StatusBar } from "react-native"

// Navigation
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// Screens
import FetchDataScreen from '../screens/FetchDataScreen.js'

import HomeScreen from '../screens/home/HomeScreen.js'

import SmartHomeScreen from '../screens/smarthome_control/SmartHomeScreen.js'

import NasScreen from '../screens/nas_control/NasScreen.js'

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <NavigationContainer
        initialRouteName="FetchDataScreen"
      >
        <StatusBar
          hidden={true} barStyle="light-content"
        />
        <Stack.Navigator>
          <Stack.Screen
            name='FetchDataScreen'
            component={FetchDataScreen}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
          />

          <Stack.Screen
            name='SmartHomeScreen'
            component={SmartHomeScreen}
          />

          <Stack.Screen
            name='NasScreen'
            component={NasScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
