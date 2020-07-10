import React, {Component} from 'react';

// Tab-Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import Keyboard_light_tab from "./lights/Keyboard_light_tab.js"
import Bed_wall_light_tab from "./lights/Bed_wall_light_tab.js"
import Bed_side_light_tab from "./lights/Bed_side_light_tab.js"

// Global
import STYLE from '../../../data/config/style.js'

export default class Roomlight_tab extends Component {
  constructor(props) {
    super(props);
    console.log("init roomlight");
    this.tab_navigation = {
      options: null,
      static_tabs: {
        keyboard: null,
        bed_wall: null,
        bed_side: null,
      },
    }

    this.roomlight = {
      keyboard: {
        data: null,
        mqtt: null,
      },
      bedWall: {
        data: null,
        mqtt: null,
      },
      bedSide: {
        data: null,
        mqtt: null,
      }
    }
  }

  set_data() {
    let { roomlight } = this.props
    let { mqtt }      = this.props

    let light_names = roomlight.static.lights.values

    let light_name  = null
    let light_data  = null
    let light_mqtt  = null

    for(var i = 0; i < light_names.length; i++) {
      light_data  = roomlight
      light_mqtt  = mqtt
      light_name  = light_names[i]

      light_data.dynamic = light_data.dynamic[light_name]

      light_mqtt.connection         = light_mqtt.connection.data
  		light_mqtt.topic.lightStatus  = light_mqtt.topic.globalStatus + light_data.static.lights.topics[light_name];
  		light_mqtt.topic.lightConf    = light_mqtt.topic.globalConf + light_data.static.lights.topics[light_name];

      this.roomlight[light_name].data = light_data
      this.roomlight[light_name].mqtt = light_mqtt
    }
  }

  set_tab_navigation() {
    this.tab_navigation.options = {
      showLabel: true,
      labelStyle: { fontSize: 12 },
      indicatorStyle : {backgroundColor: "black"}
    }

    this.tab_navigation.static_tabs.keyboard = (
      <Tab.Screen
        name="Keyboard_light_tab"
        children={({navigation}) =>
          <Keyboard_light_tab
            mqtt={this.roomlight.keyboard.mqtt}
            data={this.roomlight.keyboard.data}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: "Tastatur"
        }}
      />
    );

    this.tab_navigation.static_tabs.bed_wall = (
      <Tab.Screen
        name="Bed_wall_light_tab"
        children={({navigation}) =>
          <Bed_wall_light_tab
            mqtt={this.roomlight.bedWall.mqtt}
            data={this.roomlight.bedWall.data}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: "Wand"
        }}
      />
    );

    /*this.tab_navigation.static_tabs.bed_side = (
      <Tab.Screen
        name="Bed_side_light_tab"
        children={({navigation}) =>
          <Bed_side_light_tab
            mqtt={this.roomlight.bed_side.mqtt}
            data={this.roomlight.bed_side.data}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: "seitlich"
        }}
      />
    );*/
  }

  render() {
    if(this.props.navigation_tab.isFocused()) {
      this.set_data();
      this.set_tab_navigation()
    }

    return (
      <Tab.Navigator initialRouteName={"Keyboard_light_tab"} tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.keyboard}
        {this.tab_navigation.static_tabs.bed_wall}
      </Tab.Navigator>
    );
  }
};
