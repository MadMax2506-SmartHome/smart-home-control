import React, {Component} from 'react';
import { Text, View } from "react-native"
// Icons
import FoundationIcons from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

// Tab Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import RoomlightTab from "./roomlight/RoomlightTab.js"
import RoomThermometerTab from "./RoomThermometerTab.js"

// Allgemein
import STYLE from '../../res/style.js'

export default class SmartHomeScreen extends Component  {
  constructor(props) {
    super(props);

    const {params} = this.props.route;
    this.data = params.data;

    this.tab_navigation = {
      options: null,
      static_tabs: {
        exit: null,
      },
      dynamic_tabs: {
        room_thermometer: null,
        roomlight: null,
      }
    }

    this.set_tab_navigation(params);
  }

  set_tab_navigation(params) {
    this.tab_navigation.options = {
      showLabel: true,
      labelPosition: 'below-icon',
      labelStyle: { marginBottom: 5, fontSize: 12},
      activeTintColor : {backgroundColor: "black"},
      style: {height: 60},
    }

    this.tab_navigation.dynamic_tabs.room_thermometer = (
      <Tab.Screen
        name="RoomThermometerTab"
        children={({navigation})=>
          <RoomThermometerTab
            data={this.data}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={() => ({
          tabBarLabel: "Temperatur",
          tabBarIcon: props => (<FontAwesome5Icons name="temperature-high" size={30} color={props.color}/>)
        })}
      />
    );

    this.tab_navigation.dynamic_tabs.roomlight = (
      <Tab.Screen
        name="RoomlightTab"
        children={({navigation})=>
          <RoomlightTab
            data={this.data}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={() => ({
          tabBarLabel: "Beleuchtung",
          tabBarIcon: props => (<FoundationIcons name="lightbulb" size={30} color={props.color}/>)
        })}
      />
    );

    this.tab_navigation.static_tabs.exit = (
      <Tab.Screen
        name="Exit_tab"
        children={({navigation})=> null}
        options={() => ({
          tabBarLabel: "Verlassen",
          tabBarIcon: props => (<MaterialIcons name="exit-to-app" size={30} color={props.color}/>)
        })}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            this.props.navigation.navigate("HomeScreen")
          }
        }}
      />
    );
  }

  render() {
    var {mqtt} = this.data;

    return (
      <Tab.Navigator initialRouteName="Room_thermometer_tab" tabBarOptions={this.tab_navigation.options}>
        {mqtt.get_room_thermometer_device() == null ? null : this.tab_navigation.dynamic_tabs.room_thermometer}
        {mqtt.get_roomlight_device() == null ? null : this.tab_navigation.dynamic_tabs.roomlight}
        {this.tab_navigation.static_tabs.exit}
      </Tab.Navigator>
    );
  }
};
