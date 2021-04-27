import React, {Component} from 'react';
import {View} from 'react-native';

// SplashScreen
import SplashScreen from 'react-native-splash-screen';

// Other
import {Feature, User, Mqtt, DoorOpener} from '../res/data/Data.js';
import Wait from '../components/Wait.js';
import TOAST from '../components/Toast.js';

//I18n
import I18n from '../i18n/i18n.js';

// define time
const TIMEOUT_MS = 1000;
const MAX_SPENT_TIME_MS = 5000;

export default class FetchDataScreen extends Component {
  constructor(props) {
    super(props);

    const {params} = this.props.route;

    if (params === undefined || params.data === undefined) {
      this.feature = new Feature();
      this.user = new User();
      this.mqtt = new Mqtt();
      this.door_opener = new DoorOpener();
    } else {
      var {data} = params;

      this.feature = data.feature;
      this.user = data.user;
      this.mqtt = data.mqtt;
      this.door_opener = data.door_opener;
    }
  }

  async UNSAFE_componentWillMount() {
    // load data
    await this.init_data();

    // hide splash screen
    SplashScreen.hide();

    // load data from mqtt server
    if (this.feature.get_data().is_smart_home_control_active) {
      await this.init_mqtt();
    }

    // go to home
    var data = {
      feature: this.feature,
      user: this.user,
      mqtt: this.mqtt,
      door_opener: this.door_opener,
    };
    this.props.navigation.navigate('HomeScreen', {data: data});
  }

  render() {
    return (
      <View>
        <Wait />
      </View>
    );
  }

  async init_data() {
    await this.feature.load_data();
    await this.user.load_data();
    await this.mqtt.load_data();
    await this.door_opener.load_data();
  }

  async init_mqtt() {
    // check if mqtt brocker is available
    this.mqtt.init_devices();

    // wait for the check -> with timeout
    const time_start = new Date();
    while (this.mqtt.get_if_mqtt_is_already_checked() === false) {
      if (this.time_out_error(time_start)) {
        break;
      } else {
        await new Promise(resolve =>
          setTimeout(() => {
            resolve('result');
          }, TIMEOUT_MS),
        );
      }
    }

    // check if mqtt is available
    if (
      this.mqtt.get_if_mqtt_is_already_checked() &&
      this.mqtt.get_if_mqtt_is_available()
    ) {
      // mqtt is available

      // wait for the loading of data -> with timeout
      while (this.mqtt.get_if_data_loaded() === false) {
        if (this.time_out_error(time_start)) {
          break;
        } else {
          await new Promise(resolve =>
            setTimeout(() => {
              resolve('result');
            }, TIMEOUT_MS),
          );
        }
      }
    } else {
      // mqtt is not available

      // show message
      TOAST.notification(I18n.t('home.actions.error'));
    }
  }

  time_out_error(time_start) {
    const time_now = new Date();
    const time_spent = Math.abs(time_now.getTime() - time_start.getTime());

    return time_spent > MAX_SPENT_TIME_MS;
  }
}
