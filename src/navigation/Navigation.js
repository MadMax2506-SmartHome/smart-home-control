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

// Allgemein
import STYLE from '../res/style.js'

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const header_smart_home = {
      title: 'Smart Home',
      headerLeft: () => (null),
    }

    const header_nas = {
      title: 'NAS',
      headerLeft: () => (null),
    }

    return(
      <NavigationContainer
        initialRouteName="FetchDataScreen"
      >
        <StatusBar
          hidden={true} barStyle="light-content"
        />
        <Stack.Navigator
          screenOptions={STYLE.NAVIGATION_HEADER}
        >
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
