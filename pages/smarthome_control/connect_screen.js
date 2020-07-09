import React, {Component} from 'react';
import { View, ToastAndroid } from 'react-native';

import LoadData from "../../madmax_modules/loadData/LoadData.js"

// Screen
import SmartHomeControl from "./control_screen.js"

// Global
import MQTT from './mqtt.js'
import STYLE from '../../data/config/style.js'

export default class ConnectScreen extends Component  {
  constructor(props) {
    super(props);

		this.db = this.props.db;
    this.mqtt = {
      uri: null,
      qos: 0,
      retained: false,
    }
    this.state = {
      pufferTime: 2000,
      mqtt_is_connected: false,
    }
  }

  init_data() {
    let uri = this.db.get_mqtt_uri()
    if(uri != this.mqtt.uri) {
      this.mqtt.uri = uri

      if(this.connection != null) {
        this.connection.disconnect()
      }
      this.connection = new MQTT(this, this.mqtt.uri);

      this.state.mqtt_is_connected = false
    }
  }

  async setMqttServerToAvailable() {
    await new Promise((resolve) => setTimeout(() => { resolve('result') }, this.state.pufferTime));
    if(this.props.navigation_tab.isFocused()) {
      this.setState({
        mqtt_is_connected: true
      })
    } else {
      this.state.mqtt_is_connected = false

      this.connection.disconnect()
      this.connection = delete this.connection
    }
  }

  abort_loading() {
    this.state.mqtt_is_connected = false

    this.connection.disconnect()
    this.connection = delete this.connection

    this.props.navigation_tab.jumpTo("Home_tab")
  }

  render() {
    if(this.props.navigation_tab.isFocused()) {
      if(this.state.mqtt_is_connected) {
        this.connection = delete this.connection
        this.props.navigation.navigate("Smart_home_control_screen", { mqtt: this.mqtt });
      } else {
        this.init_data()
      }
    }
    return (
      <View style={STYLE.SCREEN.main}>
        <LoadData text="Verbindung zum Server wird aufgebaut" abort={() => this.abort_loading()}/>
      </View>
    );
  }
};
