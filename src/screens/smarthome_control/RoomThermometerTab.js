import React, {Component} from 'react';
import { Text, View } from 'react-native';

import { StyleMain } from '../../res/style/style.js'

export default class RoomThermometerTab extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.data

    var { mqtt } =  this.data;
    var room_thermometer = mqtt.get_room_thermometer_device();
    room_thermometer.register_update_function(() => this.refresh_temperature())
  }

  refresh_temperature() {
    this.setState({});
  }

  render() {
    var { mqtt } =  this.data;
    var room_thermometer = mqtt.get_room_thermometer_device();

    var humidity    = room_thermometer.get_humidity();
    var temperature = room_thermometer.get_temperature();

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
