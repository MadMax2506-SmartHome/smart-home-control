import React, {Component} from 'react';
import { StatusBar } from "react-native"

// Navigation
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// Screens
import Home_control_screen from '../screens/home/Home_control_screen.js'

import Smart_home_connect_screen from '../screens/smarthome_control/Smart_home_connect_screen.js'
import Smart_home_control_screen from '../screens/smarthome_control/Smart_home_control_screen.js'

import Nas_control_screen from '../screens/nas_control/Nas_control_screen.js'

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
      <NavigationContainer>
        <StatusBar hidden={true} barStyle="light-content"/>
        <Stack.Navigator
          screenOptions={STYLE.NAVIGATION_HEADER}
        >
          <Stack.Screen
            name='Home_control_screen'
            component={Home_control_screen}
            options={({navigation}) => header_smart_home}
          />

          <Stack.Screen
            name='Smart_home_connect_screen'
            component={Smart_home_connect_screen}
            options={({navigation}) => header_smart_home}
          />
          <Stack.Screen
            name='Smart_home_control_screen'
            component={Smart_home_control_screen}
            options={({navigation}) => header_smart_home}
          />

          <Stack.Screen
            name='Nas_control_screen'
            component={Nas_control_screen}
            options={({navigation}) => header_nas}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
