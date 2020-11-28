import React, {Component} from 'react';
import { Text, View } from 'react-native';

// Tab-Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

// LightControl
import LightControl from "./LightControl.js"

//I18n
import I18n from '../../../i18n/i18n.js';

export default class RoomlightTab extends Component {
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
          <LightControl
            light={this.data.get_subdivision()["keyboard"]}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: I18n.t("smart_home.light.typs.keyboard")
        }}
      />
    );

    this.tab_navigation.static_tabs.bed_wall = (
      <Tab.Screen
        name="BedWallLightTab"
        children={({navigation}) =>
          <LightControl
            light={this.data.get_subdivision()["bed-wall"]}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: I18n.t("smart_home.light.typs.bed_wall")
        }}
      />
    );

    this.tab_navigation.static_tabs.bed_side = (
      <Tab.Screen
        name="BedSideLightTab"
        children={({navigation}) =>
          <LightControl
            light={this.data.get_subdivision()["bed-side"]}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: I18n.t("smart_home.light.typs.bed_side")
        }}
      />
    );
  }

  render() {
    if(this.props.navigation_tab.isFocused()) {
      this.set_tab_navigation()
    }

    return (
      <Tab.Navigator
        initialRouteName="KeyboardLightTab"
        tabBarOptions={this.tab_navigation.options}
      >
        {this.tab_navigation.static_tabs.keyboard}
        {this.tab_navigation.static_tabs.bed_wall}
        {this.tab_navigation.static_tabs.bed_side}
      </Tab.Navigator>
    );
  }
};
