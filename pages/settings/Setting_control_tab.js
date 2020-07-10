import React, {Component} from 'react';
import { StyleSheet } from 'react-native';

// Navigation
import Header_control_right_settings from '../navigation/header/Header_control_right_settings.js';

// Tab - Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import Feature_tab from "./tabs/Feature_tab.js"
import User_tab from "./tabs/User_tab.js"
import Mqtt_tab from "./tabs/Mqtt_tab.js"
import Nas_tab from "./tabs/Nas_tab.js"

// Allgemein
import STYLE from '../../data/config/style.js'

export default class SettingsScreen extends Component  {
  constructor(props) {
    super(props);

    this.db = this.props.db;

    this.tab_navigation = {
      options: null,
      static_tabs: {
        feature: null,
        user: null
      },
      dynamic_tabs: {
        mqtt: null,
        nas: null,
      }
    }

    this.state = {
      values: this.db.get_data()
    }

    /*this.props.navigation.setOptions({
      headerRight: () => (<Header_control_right_settings onPress={this.save_data()}/>),
    });*/
  }

  set_data_from_tab(category, elem, value) {
    let values              = this.state.values
    values[category][elem]  = value

    this.setState({
      values: values
    });
  }

  save_data() {
    let { feature, user, mqtt, nas } = this.state.values

    let is_valid = this.is_data_valid()

    if(this.db.is_feature_data_empty()) {
      this.db.insert_feature(feature)
    } else {
      this.db.update_feature(feature)
    }

    if(is_valid.user) {
      if(this.db.is_user_data_empty()) {
        this.db.insert_user(user)
      } else {
        this.db.update_user(user)
      }
    }
    if(is_valid.mqtt) {
      if(this.db.is_mqtt_data_empty()) {
        this.db.insert_mqtt(mqtt)
      } else {
        this.db.update_mqtt(mqtt)
      }
    }
    if(is_valid.nas) {
      if(this.db.is_nas_data_empty()) {
        this.db.insert_nas(nas)
      } else {
        this.db.update_nas(nas)
      }
    }

    this.props.navigation_tab.jumpTo("Home_tab")
  }

  is_data_valid() {
    var { user, mqtt, nas } = this.state.values

    var is_valid = {
      user: true,
      mqtt: true,
      nas: true
    }

    // user
    if((user.first_name == null)
      || (user.surname == null)) {
        is_valid.user = false
    }

    // mqtt
    if((mqtt.port == null || mqtt.port.length < 1 || mqtt.port.length > 4)
      || (mqtt.ipaddress == null || mqtt.ipaddress.length < 7 || mqtt.ipaddress.length > 15)) {
        is_valid.mqtt = false
    }

    // nas
    if((nas.ipaddress == null || nas.ipaddress.length < 7 || nas.ipaddress.length > 15)
      || (nas.macaddress == null || nas.macaddress.length != 12)
      || (nas.username == null)
      || (nas.password == null)) {
        is_valid.nas = false
    }

    return is_valid;
  }

  set_tab_navigation() {
    this.tab_navigation.options = {
      showLabel: true,
      labelStyle: { fontSize: 12 },
      indicatorStyle : {backgroundColor: "black"},
    }

    this.tab_navigation.static_tabs.feature = (
      <Tab.Screen
        name="Feature_tab"
        children={({navigation}) =>
          <Feature_tab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.feature}
            onValueChange={(category, elem, value) => this.set_data_from_tab(category, elem, value)}
          />
        }
        options={{
          tabBarLabel: "Features"
        }}
      />
    );

    this.tab_navigation.static_tabs.user = (
      <Tab.Screen
        name="User_tab"
        children={({navigation}) =>
          <User_tab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.user}
            style={style_tab_input}
            onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}
          />
        }
        options={{
          tabBarLabel: "Benutzer"
        }}
      />
    );

    this.tab_navigation.dynamic_tabs.mqtt = (
      <Tab.Screen
        name="Mqtt_tab"
        children={({navigation}) =>
          <Mqtt_tab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.mqtt}
            style={style_tab_input}
            onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}
          />
        }
        options={{
          tabBarLabel: "MQTT\nBrocker"
        }}
      />
    );

    this.tab_navigation.dynamic_tabs.nas = (
      <Tab.Screen
        name="Nas_tab"
        children={({navigation}) =>
          <Nas_tab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.nas}
            style={style_tab_input}
            onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}
          />
        }
        options={{
          tabBarLabel: "Nas"
        }}
      />
    );
  }

  render() {
    if(this.props.navigation_tab.isFocused()) {
      this.set_tab_navigation()
    }

    let { feature } = this.state.values
    let mqtt_tab    = feature.is_smart_home_control_active ? this.tab_navigation.dynamic_tabs.mqtt : null
    let nas_tab     = feature.is_nas_control_active ? this.tab_navigation.dynamic_tabs.nas : null;

    return (
      <Tab.Navigator initialRouteName="Feature_tab" tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.feature}
        {this.tab_navigation.static_tabs.user}
        {mqtt_tab}
        {nas_tab}
      </Tab.Navigator>
    );
  }
};

const style_tab_input = StyleSheet.create({
  inputPanel: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    justifyContent: 'center',
    width: "30%",
    marginLeft: "10%",
  },
  inputContent: {
    justifyContent: 'center',
    width: "50%",
    marginRight: "10%",
    padding: 5,
  },
  input: {
    height: 25,
    padding: 0,
    paddingLeft: 5,

    borderColor: '#000000',
    borderBottomWidth: 1,
  },
});
