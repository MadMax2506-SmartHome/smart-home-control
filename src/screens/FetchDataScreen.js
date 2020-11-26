import React, { Component } from 'react';
import {View} from 'react-native';

// SplashScreen
import SplashScreen from 'react-native-splash-screen'

import { Feature, User, Mqtt, Device, Nas } from "../res/data/Data.js"
import Wait from "../components/Wait.js"
import TOAST from '../components/Toast.js'

const TIMEOUT_MS = 1000;
const MAX_SPENT_TIME_MS = 5000;

export default class FetchDataScreen extends Component  {
  constructor(props) {
    super(props);

    this.feature  = new Feature();
    this.user     = new User();
    this.mqtt     = new Mqtt();
    this.nas      = new Nas();
  }

  async load_data() {
    await this.feature.load_data();
    await this.user.load_data();
    await this.mqtt.load_data();
    await this.nas.load_data();
  }

  render() {
    return (
      <View>
        <Wait/>
      </View>
    );
  }

  async UNSAFE_componentWillMount() {
    // load data
    await this.load_data();

    // set timeout
    await new Promise((resolve) => setTimeout(() => { resolve('result') }, TIMEOUT_MS));

    // hide splash screen
    SplashScreen.hide();

    // load data from mqtt server
    this.mqtt.init_devices();

    const time_start = new Date();
    while(this.mqtt.has_check_mqtt_brocker() == false) {
      const time_now    = new Date();
      const time_spent  = Math.abs((time_now.getTime() - time_start.getTime()))

      if(time_spent > MAX_SPENT_TIME_MS) {
        break;
      } else {
        await new Promise((resolve) => setTimeout(() => { resolve('result') }, TIMEOUT_MS));
      }
    }

    if(this.mqtt.has_check_mqtt_brocker() && this.mqtt.is_available()) {
      TOAST.notification("Der MQTT-Brocker konnte erreicht werden!");
    } else {
      TOAST.notification("Timeout! \nDer MQTT-Brocker konnte nicht erreicht werden!");
    }

    // go to home
    var data = {
      feature: this.feature,
      user: this.user,
      mqtt: this.mqtt,
      nas: this.nas
    };
    this.props.navigation.navigate("HomeScreen", { data: data })
  }
}
