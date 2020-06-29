import React, {Component} from 'react';
import { StatusBar, Button } from "react-native"

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderControlRight from './header/ControlRight.js';
import HeaderControlRightHome from './header/ControlRightHome.js';

import Home from '../home/HomeScreen.js'
import Connect from '../home/connect/ConnectScreen.js'
import Menu from '../home/menu/MenuScreen.js'

import Roomlight from '../roomlight/RoomlightScreen.js'
import KeyboardLight from '../roomlight/lights/KeyboardScreen.js'
import BedWallLight from '../roomlight/lights/BedWallScreen.js'
import BedSideLight from '../roomlight/lights/BedSideScreen.js'

import Settings from '../settings/SettingsScreen.js'

const Stack = createStackNavigator();

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
              headerRight: () => (<HeaderControlRightHome navigation={navigation}/>),
            })}
          />

          <Stack.Screen
            name='Connect'
            component={Connect}
            options={({ navigation }) => ({
              title: 'Smart Home',
              headerLeft: () => (null),
              headerRight: () => (null),
            })}
          />

          <Stack.Screen
            name='Menu'
            component={Menu}
            options={({ navigation }) => ({
              title: 'Smart Home',
              headerLeft: () => (null),
              headerRight: () => (<HeaderControlRight navigation={navigation}/>),
            })}
          />

          <Stack.Screen
            name='Roomlight'
            component={Roomlight}
            options={({ navigation }) => ({
              title: 'Roomlight',
              headerRight: () => (<HeaderControlRight navigation={navigation}/>),
            })}
          />
          <Stack.Screen
            name='KeyboardLight'
            component={KeyboardLight}
            options={({ navigation }) => ({
              title: 'Tastaturbeleuchtung',
              headerRight: () => (<HeaderControlRight navigation={navigation}/>),
            })}
          />
          <Stack.Screen
            name='BedWallLight'
            component={BedWallLight}
            options={({ navigation }) => ({
              title: 'Bettbeleuchtung',
              headerRight: () => (<HeaderControlRight navigation={navigation}/>),
            })}
          />
          <Stack.Screen
            name='BedSideLight'
            component={BedSideLight}
            options={({ navigation }) => ({
              title: 'Bettbeleuchtung',
              headerRight: () => (<HeaderControlRight navigation={navigation}/>),
            })}
          />

          <Stack.Screen
            name='Settings'
            component={Settings}
            options={({ navigation }) => ({
              title: 'Einstellungen',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
