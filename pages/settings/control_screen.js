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
        user: {
          first_name: null,
          surname: null
        },
        mqtt: {
          typ: "mqtt",
          ipaddress: null,
          port: null,
        },
        nas: {
          ipaddress: null,
          macaddress: null,
          username: null,
          password: null,
        }
      },
      data_is_loaded_from_sqlite: {
        user: false,
        mqtt: false,
        nas: false,
      },
    }
  }

  set_data_from_sqlite(category, data) {
    this.db.set_data(category, data)

    let values = this.state.values
    if(data != null) {
      values[category] = data
    }

    let data_is_loaded_from_sqlite      = this.state.data_is_loaded_from_sqlite
    data_is_loaded_from_sqlite[category]  = true

    this.setState({
      values: values,
      data_is_loaded_from_sqlite: data_is_loaded_from_sqlite,
    });
  }

  set_data() {
    let values = this.state.values

    // user
    values.user.first_name  = this.db.get_first_name()
    values.user.surname     = this.db.get_surname()

    // mqtt
    values.mqtt.ipaddress = this.db.get_mqtt_ipaddress()
    values.mqtt.port      = this.db.get_mqtt_port()

    // nas
    values.nas.ipaddress  = this.db.get_nas_ipaddress()
    values.nas.macaddress = this.db.get_nas_macaddress()
    values.nas.username   = this.db.get_nas_username()
    values.nas.password   = this.db.get_nas_password()

    this.state.values = values
  }

  onChangeText(category, elem, value) {
    this.state.values[category][elem] = value
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
      //this.set_data()

      return (
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: { fontSize: 12 },
            indicatorStyle : {backgroundColor: "black"}
          }}
        >
          <Tab.Screen
            name="Benutzer"
            children={() => <User_tab values={this.state.values.user} style={style_tab_input} onChangeText={(category, elem, value) => this.onChangeText(category, elem, value)}/>}
          />
          <Tab.Screen
            name="MQTT-Brocker"
            children={() => <Mqtt_tab values={this.state.values.mqtt} style={style_tab_input} onChangeText={(category, elem, value) => this.onChangeText(category, elem, value)}/>}
          />
          <Tab.Screen
            name="NAS"
            children={() => <Nas_tab values={this.state.values.nas} style={style_tab_input} onChangeText={(category, elem, value) => this.onChangeText(category, elem, value)}/>}
          />
        </Tab.Navigator>
      );
    }
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
