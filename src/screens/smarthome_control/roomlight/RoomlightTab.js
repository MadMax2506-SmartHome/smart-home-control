import React, {Component} from 'react';
import { Text, View } from 'react-native';

// Tab-Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import Light_control from "./Light_control.js"

// Global
import STYLE from '../../../res/style.js'

export default class Roomlight_tab extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.data.mqtt.get_roomlight_device();

    this.tab_navigation = {
      options: null,
      static_tabs: {
        keyboard: null,
        bed_wall: null,
        bed_side: null,
      },
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
        name="KeyboardLightTab"
        children={({navigation}) =>
          <Light_control
            light={this.data.get_subdivision()["keyboard"]}
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
        name="BedWallLightTab"
        children={({navigation}) =>
          <Light_control
            light={this.data.get_subdivision()["bed-wall"]}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: "Wand"
        }}
      />
    );

    this.tab_navigation.static_tabs.bed_side = (
      <Tab.Screen
        name="BedSideLightTab"
        children={({navigation}) =>
          <Light_control
            light={this.data.get_subdivision()["bed-side"]}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: "seitlich"
        }}
      />
    );
  }

  render() {
    if(this.props.navigation_tab.isFocused()) {
      this.set_tab_navigation()
    }

    return (
      <Tab.Navigator initialRouteName="KeyboardLightTab" tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.keyboard}
        {this.tab_navigation.static_tabs.bed_wall}
        {this.tab_navigation.static_tabs.bed_side}
      </Tab.Navigator>
    );
  }
};
