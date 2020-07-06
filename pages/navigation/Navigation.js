import React, {Component} from 'react';
import { StatusBar, Button } from "react-native"

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Header
import Header_control_right from './header/control_right.js';
import Header_control_right_home from './header/control_right_home.js';

// Home
import Home from '../home/home_screen.js'

// Settings
import Settings from '../settings/control_screen.js'

// NAS
import Nas_control from '../nas_control/control_screen.js'
import Nas_control_connect from '../nas_control/connect_screen.js'

// SmartHome Steuerung
import Smart_home_control from '../smarthome_control/control_screen.js'
import Smart_home_control_connect from '../smarthome_control/connect_screen.js'

// SmartHome Steuerung - Roomlight
import Roomlight from '../smarthome_control/roomlight/roomlight_screen.js'
import Roomlight_keyboard_light from '../smarthome_control/roomlight/lights/keyboard_screen.js'
import Roomlight_bed_wall_light from '../smarthome_control/roomlight/lights/bed_wall_screen.js'
import Roomlight_bed_side_light from '../smarthome_control/roomlight/lights/bed_side_screen.js'

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
              headerRight: () => (<Header_control_right_home navigation={navigation}/>),
            })}
          />


          <Stack.Screen
            name='Settings'
            component={Settings}
            options={({ navigation }) => ({
              title: 'Einstellungen',
            })}
          />


          <Stack.Screen
            name='Smart_home_control'
            component={Smart_home_control}
            options={({ navigation }) => ({
              title: 'Smart Home Steuerung',
              headerLeft: () => (null),
              headerRight: () => (<Header_control_right navigation={navigation}/>),
            })}
          />
          <Stack.Screen
            name='Smart_home_control_connect'
            component={Smart_home_control_connect}
            options={({ navigation }) => ({
              title: 'Smart Home Steuerung',
              headerLeft: () => (null),
              headerRight: () => (null),
            })}
          />

          <Stack.Screen
            name='Roomlight'
            component={Roomlight}
            options={({ navigation }) => ({
              title: 'Beleuchtung',
              headerRight: () => (<Header_control_right navigation={navigation}/>),
            })}
          />
          <Stack.Screen
            name='Roomlight_keyboard_light'
            component={Roomlight_keyboard_light}
            options={({ navigation }) => ({
              title: 'Tastaturbeleuchtung',
              headerRight: () => (<Header_control_right navigation={navigation}/>),
            })}
          />
          <Stack.Screen
            name='Roomlight_bed_wall_light'
            component={Roomlight_bed_wall_light}
            options={({ navigation }) => ({
              title: 'Bettbeleuchtung',
              headerRight: () => (<Header_control_right navigation={navigation}/>),
            })}
          />
          <Stack.Screen
            name='Roomlight_bed_side_light'
            component={Roomlight_bed_side_light}
            options={({ navigation }) => ({
              title: 'Bettbeleuchtung',
              headerRight: () => (<Header_control_right navigation={navigation}/>),
            })}
          />


          <Stack.Screen
            name='Nas_control'
            component={Nas_control}
            options={({ navigation }) => ({
              title: 'NAS Steuerung',
              headerLeft: () => (null),
              headerRight: () => (<Header_control_right navigation={navigation}/>),
            })}
          />
          <Stack.Screen
            name='Nas_control_connect'
            component={Nas_control_connect}
            options={({ navigation }) => ({
              title: 'NAS Steuerung',
              headerLeft: () => (null),
              headerRight: () => (null),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
