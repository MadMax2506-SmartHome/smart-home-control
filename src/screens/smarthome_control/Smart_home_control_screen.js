import React, {Component} from 'react';
import { Text, View } from "react-native"
// Icons
import FoundationIcons from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

// Tab Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Roomlight_tab from "./roomlight/Roomlight_tab.js"
import Room_thermometer_tab from "./room_thermometer/Room_thermometer_tab.js"

// Allgemein
import STYLE from '../../res/style.js'

export default class Smart_home_control_screen extends Component  {
  constructor(props) {
    super(props);

    const {params} = this.props.route;

    this.devices  = params.devices
    this.mqtt     = params.mqtt

    this.tab_navigation = {
      options: null,
      static_tabs: {
        roomlight: null,
        room_thermometer: null,
        exit: null,
      },
    }

    this.set_tab_navigation(params);
  }

  set_roomlight_data(params) {
    var roomlight = params.data.roomlight

    var global_topic = {
      status: this.devices.roomlight.topic.status,
      conf: this.devices.roomlight.topic.conf,
    }

    this.roomlight  = {
      data: {
        keyboard: null,
        bed_wall: null,
        bed_side: null,
      },
      topic: {
        global: global_topic,
        keyboard: null,
        bed_wall: null,
        bed_side: null,
      },
    }

    var light_names = roomlight.static.lights.values
    for(var light_name of light_names) {
      var light_data = {
        dynamic: roomlight.dynamic[light_name],
        static:  roomlight.static,
      }

      var light_topic = {
        status: global_topic.status + roomlight.static.lights.topics[light_name],
        conf: global_topic.conf + roomlight.static.lights.topics[light_name],
      }

      this.roomlight.data[light_name]   = light_data
      this.roomlight.topic[light_name]  = light_topic
    }
  }

  set_room_thermometer_data(params) {
    var room_thermometer = params.data.room_thermometer
    console.log(room_thermometer);
    this.room_thermometer = [];
  }

  set_tab_navigation(params) {
    this.set_roomlight_data(params);
    this.set_room_thermometer_data(params);

    this.tab_navigation.options = {
      showLabel: true,
      labelPosition: 'below-icon',
      labelStyle: { marginBottom: 5, fontSize: 12},
      activeTintColor : {backgroundColor: "black"},
      style: {height: 60},
    }

    this.tab_navigation.static_tabs.room_thermometer = (
      <Tab.Screen
        name="Room_thermometer_tab"
        children={({navigation})=>
          <Room_thermometer_tab
            mqtt={this.mqtt}
            room_thermometer={this.room_thermometer}
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

    this.tab_navigation.static_tabs.roomlight = (
      <Tab.Screen
        name="Roomlight_tab"
        children={({navigation})=>
          <Roomlight_tab
            mqtt={this.mqtt}
            roomlight={this.roomlight}
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
            this.props.navigation.navigate("Home_control_screen")
          }
        }}
      />
    );
  }

  render() {
    return (
      <Tab.Navigator initialRouteName="Room_thermometer_tab" tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.room_thermometer}
        {this.tab_navigation.static_tabs.roomlight}
        {this.tab_navigation.static_tabs.exit}
      </Tab.Navigator>
    );
  }
};
