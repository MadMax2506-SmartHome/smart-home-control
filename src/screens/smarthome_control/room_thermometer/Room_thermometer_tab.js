import React, {Component} from 'react';
import { Text, View } from 'react-native';

// Tab-Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import MQTT_TEMPERATURE from '../../../res/data/mqtt/Mqtt_temperature.js'

// Global
import STYLE from '../../../res/style.js'

export default class Room_thermometer_tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: 0,
      humidity: 0,
    }

    this.room_thermometer = this.props.room_thermometer

    var { mqtt_data } = this.room_thermometer
    this.mqtt         = new MQTT_TEMPERATURE(this, mqtt_data.uri, mqtt_data.qos)

    this.mqtt.delete_temperature_listener()
    this.mqtt.set_temperature_listener(mqtt_data.topic.temperature)
  }

  set_temperature_data(temperature_data) {
    this.setState({
      temperature: temperature_data["temperature"],
      humidity: temperature_data["humidity"],
    });
  }

  render() {
    var { temperature, humidity } = this.state;

    return (
      <View>
        <View>
          <Text>Temperatur</Text>
          <Text>
            {temperature} ° Celsius
          </Text>
        </View>

        <View>
          <Text>Luftfeuchtigkeit</Text>
          <Text>
            {humidity} %
          </Text>
        </View>
      </View>
    );
  }
};
