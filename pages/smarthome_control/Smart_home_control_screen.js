import React, {Component} from 'react';

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
    console.log("init global");
    const { params } = this.props.route;

    this.mqtt     = params.mqtt
    this.devices  = params.devices
    this.data     = params.data

    this.mqtt_roomlight = {
      uri: this.mqtt.uri,
      connection: this.mqtt.connection.data,
      topic: {
        globalConf: this.devices.roomlight.topic.conf,
        lightConf: "",
        globalStatus: this.devices.roomlight.topic.status,
        lightStatus: "",
      },
      qos: this.mqtt.qos,
      retained: this.mqtt.retained,
    };

    this.tab_navigation = {
      options: null,
      static_tabs: {
        roomlight: null,
      },
    }

    this.set_tab_navigation()
  }

  set_tab_navigation() {
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
        children={({navigation})=> <Roomlight_tab mqtt={this.mqtt_roomlight} roomlight={this.data.roomlight} navigation={this.props.navigation} navigation_tab={navigation}/>}
        options={() => ({
          tabBarLabel: "Beleuchtung",
          tabBarIcon: props => (<FoundationIcons name="lightbulb" size={30} color={props.color}/>)
        })}
      />
    );
  }

  render() {
    this.set_tab_navigation()

    return (
      <Tab.Navigator initialRouteName={"Roomlight_tab"} tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.roomlight}
      </Tab.Navigator>
    );
  }
};
