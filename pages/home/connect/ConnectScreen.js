import React, {Component} from 'react';
import { View, ToastAndroid } from 'react-native';

import LoadData from "../../../madmax_modules/loadData/LoadData.js"

import MQTT from '../mqtt/MqttHome.js'
import Speaker from '../../../madmax_modules/speaker/Speaker.js'
import DB from '../../../madmax_modules/sqlite/DB.js'
import STYLE from '../../../data/config/style.js'

export default class ConnectScreen extends Component  {
  constructor(props) {
    super(props);

		this.db = null;
    this.name = null;
		this.mqtt = {
      uri: null,
      qos: 0,
      retained: false,
    }
    this.speaker = new Speaker("de-DE", "de-de-x-nfh");

    this.state = {
      pufferTime: 2000,
    }
		this.initData();
  }

	initData() {
    this.db = new DB(this);
  }

  async setDataFromSQLite(data) {
    this.db.setData(data);

    if(this.db.checkIfDataNull()) {
      await new Promise((resolve) => setTimeout(() => { resolve('result') }, this.state.pufferTime/2));
      this.props.navigation.navigate('Home');
      ToastAndroid.show('Einstellungen sind nicht gültig!', ToastAndroid.LONG);
    } else {
      this.name     = this.db.getUser()
      this.mqtt.uri = this.db.getMqttUri();
      new MQTT(this, this.mqtt.uri);
    }
  }

  async setMqttServerToAvailable() {
    await new Promise((resolve) => setTimeout(() => { resolve('result') }, this.state.pufferTime));
    this.props.navigation.navigate("Menu", {mqtt: this.mqtt, speaker: this.speaker, name: this.name})
  }


  render() {
    return (
      <View style={STYLE.SCREEN.main}>
        <LoadData text="Verbindung zum Server wird aufgebaut" navigation={this.props.navigation}/>
      </View>
    );
  }
};
