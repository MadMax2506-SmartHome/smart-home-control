import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, BackHandler } from 'react-native';

// Navigation
import Header_control_right_settings from '../navigation/header/control_right_settings.js';

// Menu
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

// Menu - Tabs
import User_tab from "./options/user_tab.js"
import Mqtt_tab from "./options/mqtt_tab.js"
import Nas_tab from "./options/nas_tab.js"

// Globales
import DB from '../../madmax_modules/sqlite/DB.js'
import STYLE from '../../data/config/style.js'

import LoadData from "../../madmax_modules/loadData/LoadData.js"

export default class SettingsScreen extends Component  {
  constructor(props) {
    super(props);

    this.db = this.props.db;
    this.state = {
      values: {
        user: this.db.get_user_data(),
        mqtt: this.db.get_mqtt_data(),
        nas: this.db.get_nas_data(),
      },
    }
  }

  set_data_from_tab(category, elem, value) {
    let values              = this.state.values
    values[category][elem]  = value

    this.setState({
      values: values
    });
  }

  save_data() {
    let { user, mqtt, nas } = this.state.values

    let is_valid = this.validData()

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

    this.props.tab_navigation.jumpTo("Home_tab")
  }

  validData() {
    var { user, mqtt, nas } = this.state.values

    var is_valid = {
      user: true,
      mqtt: true,
      nas: true,
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

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Header_control_right_settings navigation={this.props.navigation} onPress={() => this.save_data()}/>
      ),
    });

    return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
          labelStyle: { fontSize: 12 },
          indicatorStyle : {backgroundColor: "black"},
        }}
      >
        <Tab.Screen
          name="User"
          children={() => <User_tab values={this.state.values.user} style={style_tab_input} onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}/>}
          options={{
            tabBarLabel: "Benutzer"
          }}
        />
        <Tab.Screen
          name="Mqtt"
          children={() => <Mqtt_tab values={this.state.values.mqtt} style={style_tab_input} onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}/>}
          options={{
            tabBarLabel: "MQTT-Brocker"
          }}
        />
        <Tab.Screen
          name="Nas"
          children={() => <Nas_tab values={this.state.values.nas} style={style_tab_input} onChangeText={(category, elem, value) => this.set_data_from_tab(category, elem, value)}/>}
          options={{
            tabBarLabel: "Nas"
          }}
        />
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
