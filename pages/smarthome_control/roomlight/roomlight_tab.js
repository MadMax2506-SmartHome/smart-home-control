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

    this.mqtt       = this.props.mqtt
    this.roomlight  = this.props.roomlight
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
          labelStyle: { fontSize: 12 },
          indicatorStyle : {backgroundColor: "black"}
        }}
      >
        <Tab.Screen
          name="Tastatur"
          children={() =>
            <Keyboard_light_tab
              value       = {this.roomlight.static_data.lights.values[0]}
              contentData = {this.roomlight.static_data}
              data        = {this.roomlight.dynamic_data[this.roomlight.static_data.lights.values[0]]}
              mqtt        = {this.mqtt}
            />
          }
        />
        <Tab.Screen
          name="Bett-Wand"
          children={() =>
            <Bed_wall_light_tab
              value       = {this.roomlight.static_data.lights.values[1]}
              contentData = {this.roomlight.static_data}
              data        = {this.roomlight.dynamic_data[this.roomlight.static_data.lights.values[1]]}
              mqtt        = {this.mqtt}
            />
          }
        />
        <Tab.Screen
          name="Bett-seitlich"
          children={() =>
            <Bed_side_light_tab
              value       = {this.roomlight.static_data.lights.values[2]}
              contentData = {this.roomlight.static_data}
              data        = {this.roomlight.dynamic_data[this.roomlight.static_data.lights.values[2]]}
              mqtt        = {this.mqtt}
            />
          }
        />
      </Tab.Navigator>
    );
  }
};
