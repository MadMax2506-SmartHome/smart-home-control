import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, BackHandler } from 'react-native';

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

    this.db = new DB(this);
    this.newTupel = true;
    this.state = {
      values: {
        user: {},
        mqtt: {},
        nas: {}
      },
      data_is_loaded_from_sqlite: {
        user: false,
        mqtt: false,
        nas: false,
      },
    }
  }

  set_data_from_sqlite(option, data) {
    this.db.set_data(option, data)
    let values      = this.state.values;
    values[option]  = data

    let data_is_loaded_from_sqlite      = this.state.data_is_loaded_from_sqlite
    data_is_loaded_from_sqlite[option]  = true

    this.setState({
        values: values,
        data_is_loaded_from_sqlite: data_is_loaded_from_sqlite,
    });
  }

  set_data_from_screen(option, data) {
    this.state.values[option] = data
  }

  onChangeText(category, elem, value) {
    var values = this.state.values;
    values[category][elem] = value;
    this.setState({values: values});
  }

  save_data() {
    if(!this.validData()) {

    }

    if(this.newTupel) {

    } else {

    }

    if(this.db.getMqttIpAddress() == this.state.values.mqtt.ipaddress
      && this.db.getMqttPort() == this.state.values.mqtt.port) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate("Home");
    }
  }

  validData() {
    is_valid = true
    return is_valid;
  }

  render() {
    if(!this.state.data_is_loaded_from_sqlite.user
      || !this.state.data_is_loaded_from_sqlite.mqtt
      || !this.state.data_is_loaded_from_sqlite.nas) {
      return (
        <View>
          <LoadData text="Daten werden geladen" navigation={this.props.navigation}/>
        </View>
      );
    } else {
      return (
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: { fontSize: 12 },
            indicatorStyle : {backgroundColor: "black"}
          }}
        >
          <Tab.Screen
            name="Benutzer"
            component={User_tab}
          />
          <Tab.Screen
            name="MQTT-Brocker"
            component={Mqtt_tab}
          />
          <Tab.Screen
            name="NAS"
            component={Nas_tab}
          />
        </Tab.Navigator>
      );
    }
  }
};
