import React, {Component} from 'react';
import { Text, View } from "react-native"
// Icons
import FoundationIcons from 'react-native-vector-icons/Foundation';

// Tab Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Roomlight_tab from "./roomlight/Roomlight_tab.js"

// Allgemein
import STYLE from '../../data/config/style.js'

export default class Smart_home_control_screen extends Component  {
  constructor(props) {
    super(props);

    const { params } = this.props.route;

    this.devices  = params.devices
    this.data     = params.data

    this.mqtt = {
      roomlight: params.mqtt,
    }

    this.tab_navigation = {
      options: null,
      static_tabs: {
        roomlight: null,
      },
    }

    this.set_tab_navigation();
  }

  set_data() {
    this.mqtt.roomlight.topic.conf.global   = this.devices.roomlight.topic.conf
    this.mqtt.roomlight.topic.conf.light    = ""
    this.mqtt.roomlight.topic.status.global = this.devices.roomlight.topic.status
    this.mqtt.roomlight.topic.status.light  = ""
  }

  set_tab_navigation() {
    this.set_data();

    this.tab_navigation.options = {
      showLabel: true,
      labelPosition: 'below-icon',
      labelStyle: { marginBottom: 5, fontSize: 12},
      activeTintColor : {backgroundColor: "black"},
      style: {height: 60},
    }

    this.tab_navigation.static_tabs.roomlight = (
      <Tab.Screen
        name="Roomlight_tab"
        children={({navigation})=>
          <Roomlight_tab
            mqtt={this.mqtt.roomlight}
            roomlight={this.data.roomlight}
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
  }

  render() {
    return (
      <Tab.Navigator initialRouteName="Roomlight_tab" tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.roomlight}
      </Tab.Navigator>
    );
  }
};
