import React, { Component } from 'react';
import {View} from 'react-native';

// SplashScreen
import SplashScreen from 'react-native-splash-screen'

import { Feature, User, Mqtt, Nas } from "../res/data/Data.js"
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
  }

  async load_data() {
    await this.feature.load_data();
    await this.user.load_data();
    await this.mqtt.load_data();
  }

  render() {
    return (
      <View>
        <Wait/>
      </View>
    );
  }

  async load_mqtt() {
    // check if mqtt brocker is available
    this.mqtt.init_devices();

    // wait for the check -> with timeout
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
      while(this.mqtt.has_data_loaded() == false) {
        await new Promise((resolve) => setTimeout(() => { resolve('result') }, TIMEOUT_MS));
      }
    } else {
      TOAST.notification("Timeout! \nDer MQTT-Brocker wurde nicht erreicht.");
    }
  }

  async UNSAFE_componentWillMount() {
    // load data
    await this.load_data();

    // set timeout
    await new Promise((resolve) => setTimeout(() => { resolve('result') }, TIMEOUT_MS));

    // hide splash screen
    SplashScreen.hide();

    // load data from mqtt server
    if(this.feature.get_data()["is_smart_home_control_active"]) {
      await this.load_mqtt();
    }

    // go to home
    var data = {
      feature: this.feature,
      user: this.user,
      mqtt: this.mqtt,
    };
    this.props.navigation.navigate("HomeScreen", { data: data })
  }
}
