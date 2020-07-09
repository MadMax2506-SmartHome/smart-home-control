import React, {Component} from 'react';
import { StatusBar, Button } from "react-native"

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Screens
import Home from '../home/control_screen.js'

import Smart_home_control_Screen from '../smarthome_control/control_screen.js'

export default class Navigation extends Component {
  render() {
    return(
      <NavigationContainer>
        <StatusBar hidden={true} barStyle="light-content"/>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#ffffff'},
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name='Home'
            component={Home}
            options={({ navigation }) => ({
              title: 'Smart Home',
              headerRight: () => (null),
            })}
          />

          <Stack.Screen
            name='Smart_home_control_Screen'
            component={Smart_home_control_Screen}
            options={({ navigation }) => ({
              title: 'Smart Home',
              headerLeft: () => (null),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
