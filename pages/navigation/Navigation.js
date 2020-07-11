import React, {Component} from 'react';
import { StatusBar } from "react-native"

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Screens
import Home_control_screen from '../home/Home_control_screen.js'
import Smart_home_connect_screen from '../smarthome_control/Smart_home_connect_screen.js'
import Smart_home_control_screen from '../smarthome_control/Smart_home_control_screen.js'

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
            name='Home_control_screen'
            component={Home_control_screen}
            options={({ navigation }) => ({
              title: 'Smart Home',
              headerRight: () => (null),
            })}
          />

          <Stack.Screen
            name='Smart_home_connect_screen'
            component={Smart_home_connect_screen}
            options={({ navigation }) => ({
              title: 'Smart Home',
              headerLeft: () => (null),
            })}
          />

          <Stack.Screen
            name='Smart_home_control_screen'
            component={Smart_home_control_screen}
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
